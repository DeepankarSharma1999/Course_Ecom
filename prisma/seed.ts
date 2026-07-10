import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { COURSES, CATEGORIES, CITIES_IN, COUNTRIES, GLOBAL_FAQS, TESTIMONIALS, TRAINERS } from "../lib/seed-data";
import { SITE_DEFAULTS, HOME_DEFAULTS, SIMPLE_PAGE_DEFAULTS } from "../lib/site-content";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@course-ecom.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, isActive: true, role: "admin" },
    create: { email: adminEmail, passwordHash, name: "Administrator", role: "admin" },
  });
  console.log(`  -> ${adminEmail} (password: ${adminPassword})`);

  // Demo learner account (always ensured, like the admin above).
  const demoHash = await bcrypt.hash("demo1234", 10);
  await prisma.learner.upsert({
    where: { email: "demo@simplilead.com" },
    update: { passwordHash: demoHash, name: "Demo Learner" },
    create: { email: "demo@simplilead.com", name: "Demo Learner", passwordHash: demoHash },
  });
  console.log("  -> demo@simplilead.com (password: demo1234)");

  // On a fresh DB we seed everything. On a re-run we still ensure categories and
  // any *missing* courses exist (backfill), but skip existing courses and the
  // destructive global re-seeds below so admin edits / generated content survive.
  const firstSeed = (await prisma.course.count()) === 0;

  console.log("Seeding categories...");
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, tagline: cat.tagline, icon: cat.icon },
      create: { slug: cat.slug, name: cat.name, tagline: cat.tagline, icon: cat.icon },
    });
  }

  // Countries & cities: create-if-missing so admin edits/deletes are never
  // clobbered on re-seed, but a fresh (or partially seeded) DB gets backfilled.
  console.log("Seeding countries...");
  for (const [i, co] of COUNTRIES.entries()) {
    if (await prisma.country.findUnique({ where: { slug: co.slug }, select: { id: true } })) continue;
    await prisma.country.create({ data: { slug: co.slug, code: co.code, name: co.name, currency: co.currency, order: i } });
  }

  console.log("Seeding cities...");
  // Indian cities from seed-data plus a starter set of major cities per country.
  const CITIES: { slug: string; name: string; country: string }[] = [
    ...CITIES_IN.map((c) => ({ ...c, country: "in" })),
    { slug: "london", name: "London", country: "uk" },
    { slug: "manchester", name: "Manchester", country: "uk" },
    { slug: "birmingham", name: "Birmingham", country: "uk" },
    { slug: "new-york", name: "New York", country: "us" },
    { slug: "san-francisco", name: "San Francisco", country: "us" },
    { slug: "chicago", name: "Chicago", country: "us" },
    { slug: "dubai", name: "Dubai", country: "ae" },
    { slug: "abu-dhabi", name: "Abu Dhabi", country: "ae" },
    { slug: "singapore", name: "Singapore", country: "sg" },
    { slug: "sydney", name: "Sydney", country: "au" },
    { slug: "melbourne", name: "Melbourne", country: "au" },
    { slug: "toronto", name: "Toronto", country: "ca" },
    { slug: "vancouver", name: "Vancouver", country: "ca" },
  ];
  for (const [i, ct] of CITIES.entries()) {
    if (await prisma.city.findUnique({ where: { slug: ct.slug }, select: { id: true } })) continue;
    const country = await prisma.country.findUnique({ where: { slug: ct.country }, select: { id: true } });
    if (country) await prisma.city.create({ data: { slug: ct.slug, name: ct.name, countryId: country.id, order: i } });
  }

  console.log("Seeding courses...");
  // Fast path: count how many of *these* seed slugs already exist (one query).
  // If all present, skip the per-course scan so steady-state builds do no work.
  // Counting by slug avoids combos/other courses masking a missing seed course.
  const seededCount = await prisma.course.count({ where: { slug: { in: COURSES.map((c) => c.slug) } } });
  for (const c of (seededCount >= COURSES.length ? [] : COURSES)) {
    // Skip courses that already exist — preserves admin edits & generated content.
    // Missing courses still get created (backfill after a partial seed).
    if (await prisma.course.findUnique({ where: { slug: c.slug }, select: { id: true } })) continue;

    const category = await prisma.category.findUnique({ where: { slug: c.category.slug } });
    const course = await prisma.course.create({
      data: {
        slug: c.slug,
        title: c.title,
        shortTitle: c.shortTitle,
        subtitle: c.subtitle,
        summary: c.summary,
        description: c.description,
        durationLabel: c.durationLabel,
        level: c.level,
        accreditedBy: c.accreditedBy,
        basePriceInr: c.basePriceInr,
        basePriceUsd: c.basePriceUsd,
        heroImage: c.heroImage,
        examIncluded: c.examIncluded,
        ratingAvg: c.ratingAvg,
        ratingCount: c.ratingCount,
        isFeatured: true,
        categoryId: category?.id,
        keyFeatures: c.keyFeatures as any,
        learningOutcomes: c.learningOutcomes as any,
        whoShouldAttend: c.whoShouldAttend as any,
        prerequisites: c.prerequisites as any,
        curriculum: c.curriculum as any,
        whyChooseUs: c.whyChooseUs as any,
        seoTitle: c.seoTitle,
        seoDescription: c.seoDescription,
        seoKeywords: c.seoKeywords,
      },
    });

    await prisma.fAQ.deleteMany({ where: { courseId: course.id } });
    for (const [i, f] of c.faqs.entries()) {
      await prisma.fAQ.create({
        data: { courseId: course.id, question: f.q, answer: f.a, order: i },
      });
    }

    // Variant for India - Delhi
    await prisma.coursePageVariant.upsert({
      where: { courseId_countrySlug_citySlug: { courseId: course.id, countrySlug: "in", citySlug: "delhi" } },
      update: {
        countryCode: "IN", countryName: "India", cityName: "Delhi", currency: "INR", priceLocal: c.basePriceInr,
        heroHeadline: `${c.shortTitle} Training in Delhi`,
        heroSubheadline: `${c.subtitle} Join 5,000+ learners in Delhi-NCR who advanced their careers with Simplilead.`,
        seoTitle: `${c.shortTitle.replace(/\s+(Certification Training|Certification|Training)$/i, "").trim()} Certification Training in Delhi | Simplilead`,
        seoDescription: `${c.seoDescription} Live online & classroom batches available in Delhi.`,
      },
      create: {
        courseId: course.id, countryCode: "IN", countrySlug: "in", citySlug: "delhi",
        countryName: "India", cityName: "Delhi", currency: "INR", priceLocal: c.basePriceInr,
        heroHeadline: `${c.shortTitle} Training in Delhi`,
        heroSubheadline: `${c.subtitle} Join 5,000+ learners in Delhi-NCR who advanced their careers with Simplilead.`,
        seoTitle: `${c.shortTitle.replace(/\s+(Certification Training|Certification|Training)$/i, "").trim()} Certification Training in Delhi | Simplilead`,
        seoDescription: `${c.seoDescription} Live online & classroom batches available in Delhi.`,
      },
    });

    // Generate sample schedules for next 90 days
    await prisma.schedule.deleteMany({ where: { courseId: course.id } });
    const now = new Date();
    for (let i = 1; i <= 6; i++) {
      const start = new Date(now); start.setDate(now.getDate() + i * 14);
      const end = new Date(start); end.setDate(start.getDate() + 1);
      await prisma.schedule.create({
        data: {
          courseId: course.id,
          countrySlug: "in", citySlug: "delhi",
          mode: i % 2 === 0 ? "Classroom" : "Live Online",
          startDate: start, endDate: end,
          timezone: "IST", timeLabel: "09:00 AM - 06:00 PM IST",
          priceInr: c.basePriceInr, priceUsd: c.basePriceUsd,
          discountPct: i % 3 === 0 ? 15 : 10,
          seatsLeft: 12 - i, isFilling: i <= 2,
        },
      });
    }
  }

  if (firstSeed) {
    console.log("Seeding global FAQs...");
    await prisma.fAQ.deleteMany({ where: { scope: "global" } });
    for (const [i, f] of GLOBAL_FAQS.entries()) {
      await prisma.fAQ.create({ data: { scope: "global", question: f.q, answer: f.a, order: i } });
    }
  }

  console.log("Seeding trainers...");
  for (const t of TRAINERS) {
    const trainer = await prisma.trainer.upsert({
      where: { slug: t.slug },
      update: {
        name: t.name, title: t.title, bio: t.bio, photo: t.photo,
        rating: t.rating, reviews: t.reviews, experienceYears: t.experienceYears,
        expertise: t.expertise as any, certifications: t.certifications as any,
        linkedinUrl: t.linkedinUrl, isFeatured: t.isFeatured, isActive: true,
      },
      create: {
        slug: t.slug, name: t.name, title: t.title, bio: t.bio, photo: t.photo,
        rating: t.rating, reviews: t.reviews, experienceYears: t.experienceYears,
        expertise: t.expertise as any, certifications: t.certifications as any,
        linkedinUrl: t.linkedinUrl, isFeatured: t.isFeatured, isActive: true,
      },
    });
    // assign to courses
    await prisma.courseTrainer.deleteMany({ where: { trainerId: trainer.id } });
    for (const courseSlug of t.assignedCourses) {
      const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
      if (course) await prisma.courseTrainer.create({ data: { trainerId: trainer.id, courseId: course.id } });
    }
  }

  if (firstSeed) {
    console.log("Seeding testimonials...");
    await prisma.testimonial.deleteMany();
    for (const t of TESTIMONIALS) {
      await prisma.testimonial.create({
        data: { name: t.name, role: t.role, company: t.company, quote: t.quote, rating: t.rating, course: t.course },
      });
    }
  }

  console.log("Seeding SiteSettings...");
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...SITE_DEFAULTS, topBarMessages: SITE_DEFAULTS.topBarMessages as any, accreditationLogos: SITE_DEFAULTS.accreditationLogos as any, socialLinks: SITE_DEFAULTS.socialLinks as any, footerColumns: SITE_DEFAULTS.footerColumns as any },
  });

  console.log("Seeding HomePageContent...");
  await prisma.homePageContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...HOME_DEFAULTS, heroStats: HOME_DEFAULTS.heroStats as any, whyUsItems: HOME_DEFAULTS.whyUsItems as any },
  });

  console.log("Seeding SimplePages...");
  for (const slug of Object.keys(SIMPLE_PAGE_DEFAULTS)) {
    const p = SIMPLE_PAGE_DEFAULTS[slug];
    await prisma.simplePage.upsert({ where: { slug }, update: {}, create: p });
  }

  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
