// Content adapter: reads from DB first, falls back to static seed-data when DB is unavailable.
// This lets the public site keep working without Postgres while the admin writes through the DB.

import { cache } from "react";
import { prisma } from "./prisma";
import { resolveHeroImage } from "./course-images";
import { baseCourseTitle, stripBrandSuffix } from "./utils";
import { buildCourseFaqs } from "./course-faqs";
import {
  COURSES as RAW_STATIC_COURSES,
  CATEGORIES as STATIC_CATEGORIES,
  COUNTRIES as STATIC_COUNTRIES,
  CITIES_IN as STATIC_CITIES,
  TESTIMONIALS as STATIC_TESTIMONIALS,
  type CourseContent,
} from "./seed-data";

export { STATIC_COUNTRIES as COUNTRIES, STATIC_CITIES as CITIES_IN };

// Static fallback courses with per-course hero images (the seed data shares one image).
const STATIC_COURSES: CourseContent[] = RAW_STATIC_COURSES.map((c) => ({
  ...c,
  // Seed `shortTitle` was truncated to 50 chars; derive the clean base name
  // from the full title so downstream sections never render "...Certif".
  shortTitle: baseCourseTitle(c.title),
  seoTitle: stripBrandSuffix(c.seoTitle) ?? c.title,
  heroImage: resolveHeroImage(c.heroImage, c.slug, c.category?.name),
  // Fill FAQs for courses that ship none, so the DB-down fallback still renders them.
  faqs: c.faqs?.length ? c.faqs : buildCourseFaqs(c),
}));

// Mirror of baseNameOf() in scripts/generate-course-content.ts — how the stored
// `description` prose derived the course name it interpolates.
const baseNameOf = (s: string) =>
  s.replace(/[®™℠]/g, "").replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+(Certification Training|Certification|Training|Course)$/i, "")
    .replace(/\s+/g, " ").trim();

function dbCourseToContent(c: any): CourseContent {
  // ponytail: heal descriptions generated from the 50-char-truncated shortTitle
  // (e.g. "...Developer Certification Tra"). No-op once content is regenerated
  // by the fixed scripts/generate-course-content.ts. Real fix: re-run db:deploy.
  let description = c.description;
  if (c.shortTitle && typeof description === "string") {
    const baked = baseNameOf(c.shortTitle);
    // Clean name must be fully de-suffixed (baseCourseTitle strips *stacked*
    // suffixes) — baseNameOf alone leaves "X Certification Training" on titles
    // like "X Certification Training Course", which would wrongly rewrite prose.
    const clean = baseNameOf(baseCourseTitle(c.title));
    if (baked && baked !== clean && description.includes(baked)) {
      description = description.split(baked).join(clean);
    }
  }
  return {
    slug: c.slug,
    title: c.title,
    shortTitle: baseCourseTitle(c.title),
    subtitle: c.subtitle ?? "",
    summary: c.summary,
    description,
    category: c.category ? { slug: c.category.slug, name: c.category.name } : { slug: "", name: "" },
    durationLabel: c.durationLabel ?? "",
    level: c.level ?? "",
    accreditedBy: c.accreditedBy ?? "",
    basePriceInr: c.basePriceInr ?? 0,
    basePriceUsd: c.basePriceUsd ?? 0,
    examIncluded: !!c.examIncluded,
    ratingAvg: c.ratingAvg ?? 4.8,
    ratingCount: c.ratingCount ?? 0,
    heroImage: resolveHeroImage(c.heroImage, c.slug, c.category?.slug ?? c.category?.name),
    keyFeatures: (c.keyFeatures as any) ?? [],
    learningOutcomes: (c.learningOutcomes as any) ?? [],
    whoShouldAttend: (c.whoShouldAttend as any) ?? [],
    prerequisites: (c.prerequisites as any) ?? [],
    curriculum: (c.curriculum as any) ?? [],
    whyChooseUs: (c.whyChooseUs as any) ?? [],
    hiddenSections: (c.hiddenSections as any) ?? [],
    pageSections: (c.pageSections as any) ?? null,
    faqs: c.faqs?.length
      ? c.faqs.map((f: any) => ({ q: f.question, a: f.answer }))
      : buildCourseFaqs({
          slug: c.slug,
          title: c.title,
          shortTitle: c.shortTitle,
          category: c.category ? { slug: c.category.slug, name: c.category.name } : { slug: "", name: "" },
          durationLabel: c.durationLabel ?? undefined,
          examIncluded: !!c.examIncluded,
          whoShouldAttend: (c.whoShouldAttend as any) ?? [],
          prerequisites: (c.prerequisites as any) ?? [],
        }),
    // Stored seoTitles carry "| Simplilead"; the layout template re-appends it (FIX-04).
    seoTitle: stripBrandSuffix(c.seoTitle) ?? c.title,
    seoDescription: c.seoDescription ?? c.summary,
    seoKeywords: c.seoKeywords ?? "",
  };
}

// Card/listing fields only. The big JSON blobs (curriculum, pageSections,
// learningOutcomes…) and FAQs are course-detail-only — pulling them for every
// listing/footer render was the bulk of Neon egress. Detail pages use
// getCourseBySlug (full row) instead.
const LIST_SELECT = {
  slug: true, title: true, shortTitle: true, summary: true,
  durationLabel: true, level: true, accreditedBy: true,
  basePriceInr: true, basePriceUsd: true, examIncluded: true,
  ratingAvg: true, ratingCount: true, heroImage: true,
  category: { select: { slug: true, name: true } },
} as const;

function listRowToContent(c: any): CourseContent {
  return {
    slug: c.slug, title: c.title, shortTitle: baseCourseTitle(c.title),
    subtitle: "", summary: c.summary, description: "",
    category: c.category ? { slug: c.category.slug, name: c.category.name } : { slug: "", name: "" },
    durationLabel: c.durationLabel ?? "", level: c.level ?? "", accreditedBy: c.accreditedBy ?? "",
    basePriceInr: c.basePriceInr ?? 0, basePriceUsd: c.basePriceUsd ?? 0,
    examIncluded: !!c.examIncluded, ratingAvg: c.ratingAvg ?? 4.8, ratingCount: c.ratingCount ?? 0,
    heroImage: resolveHeroImage(c.heroImage, c.slug, c.category?.slug ?? c.category?.name),
    keyFeatures: [], learningOutcomes: [], whoShouldAttend: [], prerequisites: [],
    curriculum: [], whyChooseUs: [], hiddenSections: [], pageSections: null,
    faqs: [], seoTitle: c.title, seoDescription: c.summary, seoKeywords: "",
  };
}

// cache(): dedupes the layout + footer + page calls within one render into a single query.
export const getAllCourses = cache(async (): Promise<CourseContent[]> => {
  try {
    const rows = await prisma.course.findMany({
      where: { isPublished: true },
      select: LIST_SELECT,
      orderBy: { isFeatured: "desc" },
    });
    if (rows.length === 0) return STATIC_COURSES;
    return rows.map(listRowToContent);
  } catch {
    return STATIC_COURSES;
  }
});

export const getCourseBySlug = cache(async (slug: string): Promise<CourseContent | null> => {
  try {
    const c = await prisma.course.findUnique({
      where: { slug },
      include: { category: true, faqs: { orderBy: { order: "asc" } } },
    });
    if (c && c.isPublished) return dbCourseToContent(c);
  } catch {
    /* fall through */
  }
  return STATIC_COURSES.find((c) => c.slug === slug) ?? null;
});

// Real upcoming batches for a course (FIX-02/FIX-15): the course page used to
// invent schedules at render time; it now shows only what the admin scheduled.
export type CourseSchedule = {
  mode: string;
  startDate: Date;
  endDate: Date;
  timeLabel?: string;
  timezone?: string;
  priceUsd: number;
  discountPct?: number;
  seatsLeft?: number;
  isFilling: boolean;
};

export const getCourseSchedules = cache(async (courseSlug: string): Promise<CourseSchedule[]> => {
  try {
    const rows = await prisma.schedule.findMany({
      where: { course: { slug: courseSlug }, startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 24,
    });
    return rows.map((r) => ({
      mode: r.mode,
      startDate: r.startDate,
      endDate: r.endDate,
      timeLabel: r.timeLabel ?? undefined,
      timezone: r.timezone ?? undefined,
      priceUsd: r.priceUsd ?? 0,
      discountPct: r.discountPct ?? undefined,
      seatsLeft: r.seatsLeft ?? undefined,
      isFilling: r.isFilling,
    }));
  } catch {
    return [];
  }
});

export async function getCourseVariant(courseSlug: string, countrySlug: string, citySlug?: string) {
  try {
    const c = await prisma.course.findUnique({ where: { slug: courseSlug } });
    if (!c) return null;
    return await prisma.coursePageVariant.findFirst({
      where: { courseId: c.id, countrySlug, citySlug: citySlug ?? null, isPublished: true },
    });
  } catch {
    return null;
  }
}

export async function getCategories() {
  try {
    const rows = await prisma.category.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return STATIC_CATEGORIES.map((c) => ({ ...c, image: "" }));
    // ponytail: image fetched via raw SQL — the running Prisma client may predate
    // the Category.image column; the raw read works either way.
    let images = new Map<string, string | null>();
    try {
      const r = await prisma.$queryRaw<{ slug: string; image: string | null }[]>`SELECT "slug", "image" FROM "Category"`;
      images = new Map(r.map((x) => [x.slug, x.image]));
    } catch { /* column not migrated yet */ }
    return rows.map((c) => ({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline ?? "",
      icon: c.icon ?? "",
      image: images.get(c.slug) ?? (c as any).image ?? "",
    }));
  } catch {
    return STATIC_CATEGORIES.map((c) => ({ ...c, image: "" }));
  }
}

export async function getTestimonials() {
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" }, take: 12 });
    if (rows.length === 0) return STATIC_TESTIMONIALS;
    return rows.map((t) => ({
      name: t.name, role: t.role ?? "", company: t.company ?? "", quote: t.quote, rating: t.rating,
      course: t.course ?? "", photo: t.photo ?? "",
    }));
  } catch {
    return STATIC_TESTIMONIALS;
  }
}

export async function getSchedulesForCourse(courseSlug: string, citySlug?: string) {
  try {
    const c = await prisma.course.findUnique({ where: { slug: courseSlug } });
    if (!c) return [];
    const where: any = { courseId: c.id, startDate: { gte: new Date() } };
    if (citySlug) where.citySlug = citySlug;
    return await prisma.schedule.findMany({ where, orderBy: { startDate: "asc" }, take: 8 });
  } catch {
    return [];
  }
}

// ---- Sync static helpers (legacy consumers: schedule form, variant autogen) ----
export function findCountry(slug: string) {
  return STATIC_COUNTRIES.find((c) => c.slug === slug);
}
export function findCity(slug: string) {
  return STATIC_CITIES.find((c) => c.slug === slug);
}

// ---- DB-backed locations (admin-managed). Static arrays are the cold-start
// fallback only: once the Country/City tables have rows, the DB is authoritative
// so admin add/edit/delete actually takes effect. ----
export type CountryRec = { slug: string; name: string; code?: string; currency?: string };
export type CityRec = { slug: string; name: string; country: { slug: string; name: string } };

export async function getCountries(): Promise<CountryRec[]> {
  try {
    const rows = await prisma.country.findMany({ where: { enabled: true }, orderBy: [{ order: "asc" }, { name: "asc" }] });
    if (rows.length) return rows.map((c) => ({ slug: c.slug, name: c.name, code: c.code ?? undefined, currency: c.currency ?? undefined }));
  } catch { /* fall through */ }
  return STATIC_COUNTRIES.map((c) => ({ slug: c.slug, name: c.name, code: c.code, currency: c.currency }));
}

export const getCities = cache(async (): Promise<CityRec[]> => {
  try {
    const rows = await prisma.city.findMany({ where: { enabled: true }, include: { country: true }, orderBy: [{ order: "asc" }, { name: "asc" }] });
    if (rows.length) return rows.map((c) => ({ slug: c.slug, name: c.name, country: { slug: c.country.slug, name: c.country.name } }));
  } catch { /* fall through */ }
  // Static fallback: the only seeded static cities are Indian.
  return STATIC_CITIES.map((c) => ({ slug: c.slug, name: c.name, country: { slug: "in", name: "India" } }));
});

export async function getCountryBySlug(slug: string): Promise<CountryRec | null> {
  return (await getCountries()).find((c) => c.slug === slug) ?? null;
}
export async function getCityBySlug(slug: string): Promise<CityRec | null> {
  return (await getCities()).find((c) => c.slug === slug) ?? null;
}
