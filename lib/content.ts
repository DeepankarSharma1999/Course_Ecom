// Content adapter: reads from DB first, falls back to static seed-data when DB is unavailable.
// This lets the public site keep working without Postgres while the admin writes through the DB.

import { prisma } from "./prisma";
import { resolveHeroImage } from "./course-images";
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
  heroImage: resolveHeroImage(c.heroImage, c.slug, c.category?.name),
}));

function dbCourseToContent(c: any): CourseContent {
  return {
    slug: c.slug,
    title: c.title,
    shortTitle: c.shortTitle ?? c.title,
    subtitle: c.subtitle ?? "",
    summary: c.summary,
    description: c.description,
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
    faqs: (c.faqs ?? []).map((f: any) => ({ q: f.question, a: f.answer })),
    seoTitle: c.seoTitle ?? c.title,
    seoDescription: c.seoDescription ?? c.summary,
    seoKeywords: c.seoKeywords ?? "",
  };
}

export async function getAllCourses(): Promise<CourseContent[]> {
  try {
    const rows = await prisma.course.findMany({
      where: { isPublished: true },
      include: { category: true, faqs: { orderBy: { order: "asc" } } },
      orderBy: { isFeatured: "desc" },
    });
    if (rows.length === 0) return STATIC_COURSES;
    return rows.map(dbCourseToContent);
  } catch {
    return STATIC_COURSES;
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseContent | null> {
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
}

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
    if (rows.length === 0) return STATIC_CATEGORIES;
    return rows.map((c) => ({ slug: c.slug, name: c.name, tagline: c.tagline ?? "", icon: c.icon ?? "" }));
  } catch {
    return STATIC_CATEGORIES;
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

export function findCountry(slug: string) {
  return STATIC_COUNTRIES.find((c) => c.slug === slug);
}
export function findCity(slug: string) {
  return STATIC_CITIES.find((c) => c.slug === slug);
}
