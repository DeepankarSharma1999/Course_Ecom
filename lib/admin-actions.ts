"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { COURSE_SECTIONS } from "@/lib/course-sections";
import { COUNTRIES } from "@/lib/seed-data";

// A section is hidden when its show/hide checkbox (section_<key>) is unticked.
function hiddenSectionsFrom(formData: FormData): string[] {
  return COURSE_SECTIONS.filter((s) => !formData.get(`section_${s.key}`)).map((s) => s.key);
}

// Per-course content overrides for instructors/reviews. Only non-empty keys are kept.
function pageSectionsFrom(formData: FormData) {
  const out: Record<string, unknown> = {};
  const arr = (k: string) => { const v = toJson(formData.get(k)); if (Array.isArray(v) && v.length) return v; };
  const obj = (k: string) => { const v = toJson(formData.get(k)); if (v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length) return v; };
  const instructors = arr("ps_instructors");
  const reviews = arr("ps_reviews");
  const reviewStats = arr("ps_reviewstats");
  const certificate = obj("ps_certificate");
  const accreditation = obj("ps_accreditation");
  const demand = obj("ps_demand");
  if (instructors) out.instructors = instructors;
  if (reviews) out.reviews = reviews;
  if (reviewStats) out.reviewStats = reviewStats;
  if (certificate) out.certificate = certificate;
  if (accreditation) out.accreditation = accreditation;
  if (demand) out.demand = demand;
  return Object.keys(out).length ? out : undefined;
}

async function requireAdmin() {
  const u = await getCurrentUser();
  if (!u) redirect("/admin/login");
  return u;
}

function toInt(v: FormDataEntryValue | null) {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}
function toFloat(v: FormDataEntryValue | null) {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function toBool(v: FormDataEntryValue | null) { return v === "on" || v === "true"; }
function toStr(v: FormDataEntryValue | null) { return v == null ? null : String(v).trim() || null; }
function toJson(v: FormDataEntryValue | null) {
  const s = v == null ? "" : String(v).trim();
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

function revalidatePublic() {
  revalidatePath("/", "layout");
}

import { CITIES_IN } from "@/lib/content";

// =========== COURSES ============
export async function createCourse(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") || "").trim();
  if (!slug) throw new Error("Slug is required");
  const categorySlug = toStr(formData.get("categorySlug"));
  const category = categorySlug ? await prisma.category.findUnique({ where: { slug: categorySlug } }) : null;

  const course = await prisma.course.create({
    data: {
      slug,
      title: String(formData.get("title") || ""),
      shortTitle: toStr(formData.get("shortTitle")),
      subtitle: toStr(formData.get("subtitle")),
      summary: String(formData.get("summary") || ""),
      description: String(formData.get("description") || ""),
      durationLabel: toStr(formData.get("durationLabel")),
      durationHours: toInt(formData.get("durationHours")),
      level: toStr(formData.get("level")),
      accreditedBy: toStr(formData.get("accreditedBy")),
      basePriceInr: toInt(formData.get("basePriceInr")),
      basePriceUsd: toInt(formData.get("basePriceUsd")),
      heroImage: toStr(formData.get("heroImage")),
      thumbnailImage: toStr(formData.get("thumbnailImage")),
      brochureUrl: toStr(formData.get("brochureUrl")),
      meetingUrl: toStr(formData.get("meetingUrl")),
      examIncluded: toBool(formData.get("examIncluded")),
      pduCredits: toInt(formData.get("pduCredits")),
      ratingAvg: toFloat(formData.get("ratingAvg")) ?? 4.8,
      ratingCount: toInt(formData.get("ratingCount")) ?? 0,
      isFeatured: toBool(formData.get("isFeatured")),
      isPublished: toBool(formData.get("isPublished")),
      hiddenSections: hiddenSectionsFrom(formData),
      pageSections: pageSectionsFrom(formData),
      categoryId: category?.id,
      keyFeatures: toJson(formData.get("keyFeatures")) ?? undefined,
      learningOutcomes: toJson(formData.get("learningOutcomes")) ?? undefined,
      whoShouldAttend: toJson(formData.get("whoShouldAttend")) ?? undefined,
      prerequisites: toJson(formData.get("prerequisites")) ?? undefined,
      curriculum: toJson(formData.get("curriculum")) ?? undefined,
      whyChooseUs: toJson(formData.get("whyChooseUs")) ?? undefined,
      seoTitle: toStr(formData.get("seoTitle")),
      seoDescription: toStr(formData.get("seoDescription")),
      seoKeywords: toStr(formData.get("seoKeywords")),
    },
  });

  // Auto-generate variants for CITIES_IN
  const shortTitle = course.shortTitle || course.title;
  const variantData = CITIES_IN.map(city => ({
    courseId: course.id,
    countryCode: "IN",
    countrySlug: "in",
    citySlug: city.slug,
    countryName: "India",
    cityName: city.name,
    currency: "INR",
    priceLocal: course.basePriceInr || 0,
    heroHeadline: `${shortTitle} Training in ${city.name}`,
    heroSubheadline: `${course.subtitle || ""} Join thousands of learners in ${city.name}.`.trim(),
    seoTitle: `${shortTitle} Certification Training in ${city.name} | Simplilead`,
    seoDescription: `${course.summary || ""} Live online & classroom batches available in ${city.name}.`.trim(),
    isPublished: true,
  }));

  if (variantData.length > 0) {
    await prisma.coursePageVariant.createMany({ data: variantData });
  }

  revalidatePublic();
  redirect(`/admin/courses/${course.id}/edit`);
}

export async function updateCourse(id: string, formData: FormData) {
  await requireAdmin();
  const categorySlug = toStr(formData.get("categorySlug"));
  const category = categorySlug ? await prisma.category.findUnique({ where: { slug: categorySlug } }) : null;

  await prisma.course.update({
    where: { id },
    data: {
      slug: String(formData.get("slug") || ""),
      title: String(formData.get("title") || ""),
      shortTitle: toStr(formData.get("shortTitle")),
      subtitle: toStr(formData.get("subtitle")),
      summary: String(formData.get("summary") || ""),
      description: String(formData.get("description") || ""),
      durationLabel: toStr(formData.get("durationLabel")),
      durationHours: toInt(formData.get("durationHours")),
      level: toStr(formData.get("level")),
      accreditedBy: toStr(formData.get("accreditedBy")),
      basePriceInr: toInt(formData.get("basePriceInr")),
      basePriceUsd: toInt(formData.get("basePriceUsd")),
      heroImage: toStr(formData.get("heroImage")),
      thumbnailImage: toStr(formData.get("thumbnailImage")),
      brochureUrl: toStr(formData.get("brochureUrl")),
      meetingUrl: toStr(formData.get("meetingUrl")),
      examIncluded: toBool(formData.get("examIncluded")),
      pduCredits: toInt(formData.get("pduCredits")),
      ratingAvg: toFloat(formData.get("ratingAvg")) ?? 4.8,
      ratingCount: toInt(formData.get("ratingCount")) ?? 0,
      isFeatured: toBool(formData.get("isFeatured")),
      isPublished: toBool(formData.get("isPublished")),
      hiddenSections: hiddenSectionsFrom(formData),
      pageSections: pageSectionsFrom(formData),
      categoryId: category?.id ?? null,
      keyFeatures: toJson(formData.get("keyFeatures")) ?? undefined,
      learningOutcomes: toJson(formData.get("learningOutcomes")) ?? undefined,
      whoShouldAttend: toJson(formData.get("whoShouldAttend")) ?? undefined,
      prerequisites: toJson(formData.get("prerequisites")) ?? undefined,
      curriculum: toJson(formData.get("curriculum")) ?? undefined,
      whyChooseUs: toJson(formData.get("whyChooseUs")) ?? undefined,
      seoTitle: toStr(formData.get("seoTitle")),
      seoDescription: toStr(formData.get("seoDescription")),
      seoKeywords: toStr(formData.get("seoKeywords")),
    },
  });
  revalidatePublic();
  redirect(`/admin/courses/${id}/edit?saved=1`);
}

export async function deleteCourse(id: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/courses");
}

export async function bulkDeleteCourses(formData: FormData) {
  await requireAdmin();
  const ids = formData.getAll("ids").map(String).filter(Boolean);
  if (ids.length) await prisma.course.deleteMany({ where: { id: { in: ids } } });
  revalidatePublic();
  redirect("/admin/courses");
}

export async function toggleCoursePublished(id: string) {
  await requireAdmin();
  const c = await prisma.course.findUnique({ where: { id } });
  if (!c) return;
  await prisma.course.update({ where: { id }, data: { isPublished: !c.isPublished } });
  revalidatePublic();
  revalidatePath("/admin/courses");
}

export async function duplicateCourse(id: string) {
  await requireAdmin();
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      category: true,
      faqs: true,
      schedules: true,
      pageVariants: true,
      trainers: true,
    },
  });

  if (!course) throw new Error("Course not found");

  const newSlug = `${course.slug}-copy-${Date.now()}`;
  const newTitle = `[Copy] ${course.title}`;

  const clonedCourse = await prisma.course.create({
    data: {
      slug: newSlug,
      title: newTitle,
      shortTitle: course.shortTitle ? `[Copy] ${course.shortTitle}` : null,
      subtitle: course.subtitle,
      summary: course.summary,
      description: course.description,
      durationLabel: course.durationLabel,
      durationHours: course.durationHours,
      level: course.level,
      accreditedBy: course.accreditedBy,
      basePriceInr: course.basePriceInr,
      basePriceUsd: course.basePriceUsd,
      heroImage: course.heroImage,
      thumbnailImage: course.thumbnailImage,
      brochureUrl: course.brochureUrl,
      examIncluded: course.examIncluded,
      pduCredits: course.pduCredits,
      ratingAvg: course.ratingAvg,
      ratingCount: course.ratingCount,
      isFeatured: false,
      isPublished: false, // Do not publish copies automatically
      categoryId: course.categoryId,
      keyFeatures: course.keyFeatures as any,
      learningOutcomes: course.learningOutcomes as any,
      whoShouldAttend: course.whoShouldAttend as any,
      prerequisites: course.prerequisites as any,
      curriculum: course.curriculum as any,
      whyChooseUs: course.whyChooseUs as any,
      seoTitle: course.seoTitle,
      seoDescription: course.seoDescription,
      seoKeywords: course.seoKeywords,
    },
  });

  // Clone FAQs
  if (course.faqs.length > 0) {
    await prisma.fAQ.createMany({
      data: course.faqs.map(f => ({
        courseId: clonedCourse.id,
        scope: f.scope,
        question: f.question,
        answer: f.answer,
        order: f.order,
      }))
    });
  }

  // Clone Schedules
  if (course.schedules.length > 0) {
    await prisma.schedule.createMany({
      data: course.schedules.map(s => ({
        courseId: clonedCourse.id,
        countrySlug: s.countrySlug,
        citySlug: s.citySlug,
        mode: s.mode,
        startDate: s.startDate,
        endDate: s.endDate,
        timezone: s.timezone,
        timeLabel: s.timeLabel,
        priceInr: s.priceInr,
        priceUsd: s.priceUsd,
        discountPct: s.discountPct,
        seatsLeft: s.seatsLeft,
        isFilling: s.isFilling,
      }))
    });
  }

  // Clone Variants
  if (course.pageVariants.length > 0) {
    await prisma.coursePageVariant.createMany({
      data: course.pageVariants.map(v => ({
        courseId: clonedCourse.id,
        countryCode: v.countryCode,
        countrySlug: v.countrySlug,
        citySlug: v.citySlug,
        countryName: v.countryName,
        cityName: v.cityName,
        currency: v.currency,
        priceLocal: v.priceLocal,
        heroHeadline: v.heroHeadline,
        heroSubheadline: v.heroSubheadline,
        localContext: v.localContext,
        seoTitle: v.seoTitle,
        seoDescription: v.seoDescription,
        isPublished: v.isPublished,
      }))
    });
  }

  // Clone Trainers
  if (course.trainers.length > 0) {
    await prisma.courseTrainer.createMany({
      data: course.trainers.map(t => ({
        courseId: clonedCourse.id,
        trainerId: t.trainerId,
      }))
    });
  }

  revalidatePublic();
  redirect("/admin/courses");
}

// =========== SCHEDULES ============
export async function createSchedule(courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.schedule.create({
    data: {
      courseId,
      countrySlug: toStr(formData.get("countrySlug")),
      citySlug: toStr(formData.get("citySlug")),
      mode: String(formData.get("mode") || "Live Online"),
      startDate: new Date(String(formData.get("startDate"))),
      endDate: new Date(String(formData.get("endDate"))),
      timezone: toStr(formData.get("timezone")),
      timeLabel: toStr(formData.get("timeLabel")),
      priceInr: toInt(formData.get("priceInr")),
      priceUsd: toInt(formData.get("priceUsd")),
      discountPct: toInt(formData.get("discountPct")),
      seatsLeft: toInt(formData.get("seatsLeft")),
      isFilling: toBool(formData.get("isFilling")),
    },
  });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/schedules`);
}

// Generate a recurring set of schedules across many courses in one go.
// Cadence: `count` batches, each `intervalDays` apart, starting `startDate`,
// each running `durationDays`. Scope: all published courses, or one category.
export async function bulkCreateSchedules(formData: FormData) {
  await requireAdmin();

  const categorySlug = toStr(formData.get("categorySlug")); // empty => all courses
  const count = Math.min(Math.max(toInt(formData.get("count")) ?? 4, 1), 52);
  const intervalDays = Math.max(toInt(formData.get("intervalDays")) ?? 7, 1);
  const durationDays = Math.max(toInt(formData.get("durationDays")) ?? 2, 1);
  const start = new Date(String(formData.get("startDate")));
  if (isNaN(start.getTime())) redirect(`/admin/schedules/bulk?error=date`);

  const mode = String(formData.get("mode") || "Live Online");
  const timeLabel = toStr(formData.get("timeLabel"));
  const timezone = toStr(formData.get("timezone"));
  const allLocations = toBool(formData.get("allLocations"));
  const countrySlug = toStr(formData.get("countrySlug"));
  const citySlug = toStr(formData.get("citySlug"));
  const priceInr = toInt(formData.get("priceInr"));
  const priceUsd = toInt(formData.get("priceUsd"));
  const discountPct = toInt(formData.get("discountPct"));
  const seatsLeft = toInt(formData.get("seatsLeft"));
  const isFilling = toBool(formData.get("isFilling"));

  const replaceFuture = toBool(formData.get("replaceFuture"));

  const courses = await prisma.course.findMany({
    where: { isPublished: true, ...(categorySlug ? { category: { slug: categorySlug } } : {}) },
    select: { id: true },
  });
  const courseIds = courses.map((c) => c.id);

  // Optionally wipe upcoming batches for these courses before adding the new set.
  if (replaceFuture) {
    await prisma.schedule.deleteMany({
      where: { courseId: { in: courseIds }, startDate: { gte: new Date() } },
    });
  }

  // "All locations" fans out across every country (plus India's cities) instead of the one slug pair typed above.
  const locations = allLocations
    ? [
        ...COUNTRIES.map((c) => ({ countrySlug: c.slug, citySlug: null as string | null })),
        ...CITIES_IN.map((city) => ({ countrySlug: "in", citySlug: city.slug as string | null })),
      ]
    : [{ countrySlug, citySlug }];

  const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);
  const rows = courses.flatMap((c) =>
    locations.flatMap((loc) =>
      Array.from({ length: count }, (_, i) => {
        const s = addDays(start, i * intervalDays);
        return {
          courseId: c.id, countrySlug: loc.countrySlug, citySlug: loc.citySlug, mode,
          startDate: s, endDate: addDays(s, durationDays - 1),
          timezone, timeLabel, priceInr, priceUsd, discountPct, seatsLeft, isFilling,
        };
      })
    )
  );

  await prisma.schedule.createMany({ data: rows });
  revalidatePublic();
  redirect(`/admin/schedules?added=${rows.length}`);
}

export async function deleteSchedule(id: string, courseId: string) {
  await requireAdmin();
  await prisma.schedule.delete({ where: { id } });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/schedules`);
}

// =========== FAQs ============
export async function createFaq(courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.fAQ.create({
    data: {
      courseId,
      scope: "course",
      question: String(formData.get("question") || ""),
      answer: String(formData.get("answer") || ""),
      order: toInt(formData.get("order")) ?? 0,
    },
  });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/faqs`);
}

export async function updateFaq(id: string, courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.fAQ.update({
    where: { id },
    data: {
      question: String(formData.get("question") || ""),
      answer: String(formData.get("answer") || ""),
      order: toInt(formData.get("order")) ?? 0,
    },
  });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/faqs`);
}

export async function deleteFaq(id: string, courseId: string) {
  await requireAdmin();
  await prisma.fAQ.delete({ where: { id } });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/faqs`);
}

// =========== VARIANTS ============
export async function createVariant(courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.coursePageVariant.create({
    data: {
      courseId,
      countryCode: toStr(formData.get("countryCode")),
      countrySlug: toStr(formData.get("countrySlug")),
      citySlug: toStr(formData.get("citySlug")),
      countryName: toStr(formData.get("countryName")),
      cityName: toStr(formData.get("cityName")),
      currency: String(formData.get("currency") || "INR"),
      priceLocal: toInt(formData.get("priceLocal")),
      heroHeadline: toStr(formData.get("heroHeadline")),
      heroSubheadline: toStr(formData.get("heroSubheadline")),
      localContext: toStr(formData.get("localContext")),
      seoTitle: toStr(formData.get("seoTitle")),
      seoDescription: toStr(formData.get("seoDescription")),
      isPublished: toBool(formData.get("isPublished")),
      hiddenSections: hiddenSectionsFrom(formData),
      pageSections: pageSectionsFrom(formData),
    },
  });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/variants`);
}

export async function updateVariant(id: string, courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.coursePageVariant.update({
    where: { id },
    data: {
      countryCode: toStr(formData.get("countryCode")),
      countrySlug: toStr(formData.get("countrySlug")),
      citySlug: toStr(formData.get("citySlug")),
      countryName: toStr(formData.get("countryName")),
      cityName: toStr(formData.get("cityName")),
      currency: String(formData.get("currency") || "INR"),
      priceLocal: toInt(formData.get("priceLocal")),
      heroHeadline: toStr(formData.get("heroHeadline")),
      heroSubheadline: toStr(formData.get("heroSubheadline")),
      localContext: toStr(formData.get("localContext")),
      seoTitle: toStr(formData.get("seoTitle")),
      seoDescription: toStr(formData.get("seoDescription")),
      isPublished: toBool(formData.get("isPublished")),
      hiddenSections: hiddenSectionsFrom(formData),
      pageSections: pageSectionsFrom(formData),
    },
  });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/variants`);
}

export async function deleteVariant(id: string, courseId: string) {
  await requireAdmin();
  await prisma.coursePageVariant.delete({ where: { id } });
  revalidatePublic();
  redirect(`/admin/courses/${courseId}/variants`);
}

// =========== CATEGORIES ============
export async function saveCategory(id: string | null, formData: FormData) {
  await requireAdmin();
  const data = {
    slug: String(formData.get("slug") || ""),
    name: String(formData.get("name") || ""),
    tagline: toStr(formData.get("tagline")),
    icon: toStr(formData.get("icon")),
    order: toInt(formData.get("order")) ?? 0,
  };
  if (id) await prisma.category.update({ where: { id }, data });
  else await prisma.category.create({ data });
  // ponytail: image via raw SQL — the running Prisma client may predate the
  // Category.image column. Harmless (1 extra query) once the client is regenerated.
  try {
    const image = toStr(formData.get("image"));
    await prisma.$executeRaw`UPDATE "Category" SET "image" = ${image} WHERE "slug" = ${data.slug}`;
  } catch { /* column not migrated yet — image simply not persisted */ }
  revalidatePublic();
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/categories");
}

// =========== BLOGS ============
export async function saveBlog(id: string | null, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const slugIn = String(formData.get("slug") || "").trim().toLowerCase();
  const data = {
    title,
    slug: slugIn || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    category: toStr(formData.get("category")),
    excerpt: toStr(formData.get("excerpt")),
    content: String(formData.get("content") || ""),
    readMins: toInt(formData.get("readMins")),
    isPublished: toBool(formData.get("isPublished")),
  };
  if (id) await prisma.blog.update({ where: { id }, data });
  else await prisma.blog.create({ data });
  revalidatePublic();
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  await requireAdmin();
  await prisma.blog.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/blogs");
}

// =========== LOCATIONS (countries & cities) ============
export async function saveCountry(id: string | null, formData: FormData) {
  await requireAdmin();
  const data = {
    slug: String(formData.get("slug") || "").trim().toLowerCase(),
    name: String(formData.get("name") || "").trim(),
    code: toStr(formData.get("code")),
    currency: toStr(formData.get("currency")),
    enabled: toBool(formData.get("enabled")),
    order: toInt(formData.get("order")) ?? 0,
  };
  if (id) await prisma.country.update({ where: { id }, data });
  else await prisma.country.create({ data });
  revalidatePublic();
  redirect("/admin/locations");
}

export async function deleteCountry(id: string) {
  await requireAdmin();
  await prisma.country.delete({ where: { id } }); // cascades to its cities
  revalidatePublic();
  redirect("/admin/locations");
}

export async function saveCity(id: string | null, formData: FormData) {
  await requireAdmin();
  const data = {
    slug: String(formData.get("slug") || "").trim().toLowerCase(),
    name: String(formData.get("name") || "").trim(),
    countryId: String(formData.get("countryId") || ""),
    enabled: toBool(formData.get("enabled")),
    order: toInt(formData.get("order")) ?? 0,
  };
  if (id) await prisma.city.update({ where: { id }, data });
  else await prisma.city.create({ data });
  revalidatePublic();
  redirect("/admin/locations");
}

export async function deleteCity(id: string) {
  await requireAdmin();
  await prisma.city.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/locations");
}

// =========== TESTIMONIALS ============
export async function saveTestimonial(id: string | null, formData: FormData) {
  await requireAdmin();
  const data = {
    name: String(formData.get("name") || ""),
    role: toStr(formData.get("role")),
    company: toStr(formData.get("company")),
    quote: String(formData.get("quote") || ""),
    rating: toInt(formData.get("rating")) ?? 5,
    photo: toStr(formData.get("photo")),
    course: toStr(formData.get("course")),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePublic();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/testimonials");
}

// =========== LEADS ============
export async function updateLeadStatus(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.lead.update({
    where: { id },
    data: {
      status: String(formData.get("status") || "new"),
      notes: toStr(formData.get("notes")),
    },
  });
  redirect(`/admin/leads/${id}`);
}

export async function deleteLead(id: string) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id } });
  redirect("/admin/leads");
}

// =========== SITE SETTINGS ============
export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      brandName: String(formData.get("brandName") || ""),
      tagline: String(formData.get("tagline") || ""),
      logoUrl: toStr(formData.get("logoUrl")),
      faviconUrl: toStr(formData.get("faviconUrl")),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      whatsappNumber: toStr(formData.get("whatsappNumber")),
      address: toStr(formData.get("address")),
      topBarMessages: toJson(formData.get("topBarMessages")) ?? undefined,
      accreditationLogos: toJson(formData.get("accreditationLogos")) ?? undefined,
      socialLinks: toJson(formData.get("socialLinks")) ?? undefined,
      footerAbout: toStr(formData.get("footerAbout")),
      footerColumns: toJson(formData.get("footerColumns")) ?? undefined,
      copyrightText: String(formData.get("copyrightText") || ""),
      announcementText: toStr(formData.get("announcementText")),
      announcementLink: toStr(formData.get("announcementLink")),
      announcementEnabled: toBool(formData.get("announcementEnabled")),
      defaultSeoTitle: toStr(formData.get("defaultSeoTitle")),
      defaultSeoDescription: toStr(formData.get("defaultSeoDescription")),
    },
    create: {
      id: "singleton",
      brandName: String(formData.get("brandName") || "Simplilead"),
      tagline: String(formData.get("tagline") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      copyrightText: String(formData.get("copyrightText") || ""),
    },
  });
  revalidatePublic();
  redirect("/admin/site-settings?saved=1");
}

// =========== CURRENCY / PRICING ============
// Inputs are keyed per currency code: perUsd_<CODE>, premium_<CODE>, enabled_<CODE>.
export async function saveCurrencySettings(formData: FormData) {
  await requireAdmin();
  const { DEFAULT_CURRENCIES } = await import("@/lib/currency");
  const config = DEFAULT_CURRENCIES.map((c) => {
    const perUsd = parseFloat(String(formData.get(`perUsd_${c.code}`) ?? ""));
    const premiumPct = parseFloat(String(formData.get(`premium_${c.code}`) ?? ""));
    return {
      code: c.code,
      label: c.label,
      symbol: c.symbol,
      locale: c.locale,
      perUsd: Number.isFinite(perUsd) ? perUsd : c.perUsd,
      premiumPct: Number.isFinite(premiumPct) ? premiumPct : 0,
      enabled: toBool(formData.get(`enabled_${c.code}`)),
    };
  });
  const defaultCurrency = String(formData.get("defaultCurrency") || "USD");
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: { defaultCurrency, currencyConfig: config },
    create: { id: "singleton", defaultCurrency, currencyConfig: config },
  });
  revalidatePublic();
  redirect("/admin/currency?saved=1");
}

// =========== HOME PAGE CONTENT ============
export async function saveHomeContent(formData: FormData) {
  await requireAdmin();
  const text = (k: string) => String(formData.get(k) || "");
  const opt  = (k: string) => toStr(formData.get(k));
  await prisma.homePageContent.upsert({
    where: { id: "singleton" },
    update: {
      heroBadgeText: text("heroBadgeText"),
      heroHeadline: text("heroHeadline"),
      heroHeadlineHighlight: text("heroHeadlineHighlight"),
      heroHeadlineSuffix: text("heroHeadlineSuffix"),
      heroSubheading: text("heroSubheading"),
      heroCtaPrimaryText: text("heroCtaPrimaryText"),
      heroCtaPrimaryLink: text("heroCtaPrimaryLink"),
      heroCtaSecondaryText: text("heroCtaSecondaryText"),
      heroCtaSecondaryLink: text("heroCtaSecondaryLink"),
      heroStats: toJson(formData.get("heroStats")) ?? undefined,
      heroFormTitle: text("heroFormTitle"),
      heroFormSubtitle: text("heroFormSubtitle"),
      accreditationTitle: text("accreditationTitle"),
      categoriesBadge: text("categoriesBadge"),
      categoriesTitle: text("categoriesTitle"),
      categoriesSubtitle: text("categoriesSubtitle"),
      coursesBadge: text("coursesBadge"),
      coursesTitle: text("coursesTitle"),
      whyUsBadge: text("whyUsBadge"),
      whyUsTitle: text("whyUsTitle"),
      whyUsSubtitle: text("whyUsSubtitle"),
      whyUsImage: opt("whyUsImage"),
      whyUsItems: toJson(formData.get("whyUsItems")) ?? undefined,
      testimonialsBadge: text("testimonialsBadge"),
      testimonialsTitle: text("testimonialsTitle"),
      testimonialsSubtitle: text("testimonialsSubtitle"),
      faqBadge: text("faqBadge"),
      faqTitle: text("faqTitle"),
      ctaTitle: text("ctaTitle"),
      ctaSubtitle: text("ctaSubtitle"),
      ctaPrimaryText: text("ctaPrimaryText"),
      ctaPrimaryLink: text("ctaPrimaryLink"),
      ctaSecondaryText: text("ctaSecondaryText"),
      ctaSecondaryLink: text("ctaSecondaryLink"),
      seoTitle: opt("seoTitle"),
      seoDescription: opt("seoDescription"),
      partnerLogos: toJson(formData.get("partnerLogos")) ?? undefined,
      businessSectors: toJson(formData.get("businessSectors")) ?? undefined,
      pedagogyTitle: text("pedagogyTitle"),
      pedagogySteps: toJson(formData.get("pedagogySteps")) ?? undefined,
      accoladesTitle: text("accoladesTitle"),
      accolades: toJson(formData.get("accolades")) ?? undefined,
      reachBadge: text("reachBadge"),
      reachTitle: text("reachTitle"),
      reachSubtitle: text("reachSubtitle"),
      reachStats: toJson(formData.get("reachStats")) ?? undefined,
    },
    create: { id: "singleton", heroSubheading: text("heroSubheading") || "", categoriesSubtitle: text("categoriesSubtitle") || "", whyUsSubtitle: text("whyUsSubtitle") || "", ctaSubtitle: text("ctaSubtitle") || "" },
  });
  revalidatePublic();
  redirect("/admin/home-content?saved=1");
}

// Persist home-section order + visibility (JSON [{key,hidden}] built by the editor).
export async function saveHomeSections(formData: FormData) {
  await requireAdmin();
  const sections = toJson(formData.get("sections"));
  await prisma.homePageContent.upsert({
    where: { id: "singleton" },
    update: { sections: sections ?? undefined },
    create: { id: "singleton", heroSubheading: "", categoriesSubtitle: "", whyUsSubtitle: "", ctaSubtitle: "", sections: sections ?? undefined },
  });
  revalidatePublic();
  redirect("/admin/home-content?saved=1");
}

// =========== SIMPLE PAGES ============
export async function saveSimplePage(slug: string, formData: FormData) {
  await requireAdmin();
  const data = {
    title: String(formData.get("title") || ""),
    heroBadge: toStr(formData.get("heroBadge")),
    heroHeadline: toStr(formData.get("heroHeadline")),
    heroSubheading: toStr(formData.get("heroSubheading")),
    body: toStr(formData.get("body")),
    showLeadForm: toBool(formData.get("showLeadForm")),
    leadFormTitle: toStr(formData.get("leadFormTitle")),
    leadFormSubtitle: toStr(formData.get("leadFormSubtitle")),
    ctaText: toStr(formData.get("ctaText")),
    ctaLink: toStr(formData.get("ctaLink")),
    seoTitle: toStr(formData.get("seoTitle")),
    seoDescription: toStr(formData.get("seoDescription")),
    isPublished: toBool(formData.get("isPublished")),
  };
  const newSlug = String(formData.get("slug") || slug).trim();
  await prisma.simplePage.upsert({
    where: { slug },
    update: { ...data, slug: newSlug },
    create: { ...data, slug: newSlug },
  });
  revalidatePublic();
  redirect(`/admin/pages/${newSlug}/edit?saved=1`);
}

export async function createSimplePage(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") || "").trim();
  if (!slug) throw new Error("Slug required");
  await prisma.simplePage.create({
    data: {
      slug,
      title: String(formData.get("title") || slug),
      heroHeadline: String(formData.get("title") || slug),
      isPublished: true,
    },
  });
  revalidatePublic();
  redirect(`/admin/pages/${slug}/edit`);
}

export async function deleteSimplePage(slug: string) {
  await requireAdmin();
  await prisma.simplePage.delete({ where: { slug } });
  revalidatePublic();
  redirect("/admin/pages");
}

// =========== GLOBAL FAQS ============
export async function createGlobalFaq(formData: FormData) {
  await requireAdmin();
  await prisma.fAQ.create({
    data: {
      scope: "global",
      question: String(formData.get("question") || ""),
      answer: String(formData.get("answer") || ""),
      order: toInt(formData.get("order")) ?? 0,
    },
  });
  revalidatePublic();
  redirect("/admin/global-faqs");
}

export async function updateGlobalFaq(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.fAQ.update({
    where: { id },
    data: {
      question: String(formData.get("question") || ""),
      answer: String(formData.get("answer") || ""),
      order: toInt(formData.get("order")) ?? 0,
    },
  });
  revalidatePublic();
  redirect("/admin/global-faqs");
}

export async function deleteGlobalFaq(id: string) {
  await requireAdmin();
  await prisma.fAQ.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/global-faqs");
}

// =========== TRAINERS ============
function parseList(v: FormDataEntryValue | null): string[] | null {
  const s = v == null ? "" : String(v).trim();
  if (!s) return null;
  // accept JSON array or comma-separated
  if (s.startsWith("[")) {
    try { return JSON.parse(s); } catch { /* fallthrough */ }
  }
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

export async function saveTrainer(id: string | null, formData: FormData) {
  await requireAdmin();
  const data = {
    slug: String(formData.get("slug") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    title: toStr(formData.get("title")),
    bio: toStr(formData.get("bio")),
    photo: toStr(formData.get("photo")),
    rating: toFloat(formData.get("rating")),
    reviews: toInt(formData.get("reviews")),
    experienceYears: toInt(formData.get("experienceYears")),
    expertise: parseList(formData.get("expertise")) as any,
    certifications: parseList(formData.get("certifications")) as any,
    linkedinUrl: toStr(formData.get("linkedinUrl")),
    isFeatured: toBool(formData.get("isFeatured")),
    isActive: toBool(formData.get("isActive")),
  };
  let trainer;
  if (id) trainer = await prisma.trainer.update({ where: { id }, data });
  else trainer = await prisma.trainer.create({ data });

  const courseIds = formData.getAll("courseIds").map(String).filter(Boolean);
  await prisma.courseTrainer.deleteMany({ where: { trainerId: trainer.id } });
  for (const cId of courseIds) {
    await prisma.courseTrainer.create({ data: { trainerId: trainer.id, courseId: cId } });
  }
  revalidatePublic();
  redirect("/admin/trainers");
}

export async function deleteTrainer(id: string) {
  await requireAdmin();
  await prisma.trainer.delete({ where: { id } });
  revalidatePublic();
  redirect("/admin/trainers");
}

// =========== ADMIN USERS ============
export async function createAdminUser(formData: FormData) {
  await requireAdmin();
  const password = String(formData.get("password") || "");
  if (password.length < 6) throw new Error("Password must be at least 6 characters");
  await prisma.adminUser.create({
    data: {
      email: String(formData.get("email") || "").toLowerCase().trim(),
      name: toStr(formData.get("name")),
      role: String(formData.get("role") || "editor"),
      passwordHash: await hashPassword(password),
    },
  });
  redirect("/admin/users");
}

export async function toggleAdminUser(id: string) {
  await requireAdmin();
  const u = await prisma.adminUser.findUnique({ where: { id } });
  if (!u) return;
  await prisma.adminUser.update({ where: { id }, data: { isActive: !u.isActive } });
  redirect("/admin/users");
}

export async function resetAdminPassword(id: string, formData: FormData) {
  await requireAdmin();
  const password = String(formData.get("password") || "");
  if (password.length < 6) throw new Error("Password must be at least 6 characters");
  await prisma.adminUser.update({ where: { id }, data: { passwordHash: await hashPassword(password) } });
  redirect("/admin/users");
}
