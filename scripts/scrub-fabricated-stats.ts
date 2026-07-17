// FIX-02: scrub fabricated statistics from the live DB (code defaults only
// apply when a row is missing — these singletons exist, so they must be fixed
// in place). Prints every change; run with:
//   npx tsx --env-file=.env scripts/scrub-fabricated-stats.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fake people seeded by prisma/seed.ts — deleted only on an exact name+company match.
const SEEDED_FAKE_TESTIMONIALS = [
  { name: "Anita Sharma", company: "Infosys" },
  { name: "Rohit Verma", company: "Wipro" },
  { name: "Sandeep Iyer", company: "TCS" },
  { name: "Priya Menon", company: "HCL" },
  { name: "Karthik Reddy", company: "Mindtree" },
];

const log = (...args: unknown[]) => console.log("[scrub]", ...args);

async function main() {
  // --- SiteSettings singleton ---------------------------------------------
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (settings) {
    const topBar = ((settings.topBarMessages as string[]) || []).filter((m) => !/[\d,]{4,}\+/.test(m));
    if (topBar.length === 0) topBar.push("Globally accredited certification training");
    const footerAbout = /500,000|5,00,000/.test(settings.footerAbout ?? "")
      ? "Simplilead is a global certification training provider, helping professionals advance their careers with globally accredited programs."
      : settings.footerAbout;
    const defaultSeoDescription = /500,000|5,00,000/.test(settings.defaultSeoDescription ?? "")
      ? "Simplilead delivers globally recognized certification training in Agile, Scrum, SAFe, DevOps, Project Management, Quality, IT Service Management, and more."
      : settings.defaultSeoDescription;
    log("SiteSettings.topBarMessages:", settings.topBarMessages, "->", topBar);
    log("SiteSettings.footerAbout:", settings.footerAbout, "->", footerAbout);
    await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: { topBarMessages: topBar, footerAbout, defaultSeoDescription },
    });
  }

  // --- HomePageContent singleton ------------------------------------------
  const home = await prisma.homePageContent.findUnique({ where: { id: "singleton" } });
  if (home) {
    const data: Record<string, unknown> = {};
    if (/[\d,]+\+ learners/i.test(home.heroBadgeText ?? "")) {
      data.heroBadgeText = "Globally accredited certification training";
      log("HomePageContent.heroBadgeText:", home.heroBadgeText, "->", data.heroBadgeText);
    }
    const stats = (home.heroStats as { value: string; label: string }[]) || [];
    const honest = stats.filter((s) => !/rating|pass rate/i.test(s.label));
    if (honest.length !== stats.length) {
      data.heroStats = honest;
      log("HomePageContent.heroStats:", stats, "->", honest);
    }
    if (/500,000|5,00,000/.test(home.seoDescription ?? "")) {
      data.seoDescription =
        "Simplilead offers expert-led certification training in Agile, Scrum, SAFe, DevOps, PMP, and IT Service Management — live online, classroom and corporate programs.";
      log("HomePageContent.seoDescription scrubbed");
    }
    if (/[\d,]+\+ (professionals|learners|enterprises)/i.test(home.heroSubheading ?? "")) {
      data.heroSubheading =
        "Live instructor-led, classroom and corporate training in Agile, SAFe, DevOps, Project Management, IT Service Management, Quality and emerging technologies — by accredited trainers.";
      log("HomePageContent.heroSubheading scrubbed");
    }
    if (/\d+\+ Courses/i.test(home.coursesTitle ?? "")) {
      data.coursesTitle = "Explore Our Certification Courses";
      log("HomePageContent.coursesTitle:", home.coursesTitle, "->", data.coursesTitle);
    }
    // Fabricated press/awards/reach data, if the admin row carries any.
    for (const key of ["accolades", "spotlightArticles", "reachStats"] as const) {
      if (Array.isArray((home as any)[key]) && ((home as any)[key] as unknown[]).length > 0) {
        data[key] = [];
        log(`HomePageContent.${key} cleared:`, JSON.stringify((home as any)[key]));
      }
    }
    if (Object.keys(data).length) await prisma.homePageContent.update({ where: { id: "singleton" }, data });
  }

  // --- Course ratings + variant copy --------------------------------------
  const ratings = await prisma.course.updateMany({ where: { ratingCount: { gt: 0 } }, data: { ratingCount: 0 } });
  log(`Course.ratingCount zeroed on ${ratings.count} rows (random 1200–2200 seeds)`);

  const variants = await prisma.$executeRaw`
    UPDATE "CoursePageVariant"
    SET "heroSubheadline" = REPLACE("heroSubheadline", 'Join thousands of learners in', 'Live online & classroom batches in'),
        "seoTitle" = REGEXP_REPLACE("seoTitle", '\s*\|\s*Simplilead\s*$', '')
    WHERE "heroSubheadline" LIKE '%Join thousands of learners%' OR "seoTitle" ~ '\|\s*Simplilead\s*$'`;
  log(`CoursePageVariant rows updated: ${variants}`);

  // --- Seeded fake testimonials (exact match only; rows printed for recovery) --
  for (const t of SEEDED_FAKE_TESTIMONIALS) {
    const rows = await prisma.testimonial.findMany({ where: { name: t.name, company: t.company } });
    for (const row of rows) {
      log("Deleting seeded fake testimonial:", JSON.stringify(row));
      await prisma.testimonial.delete({ where: { id: row.id } });
    }
  }
  const remaining = await prisma.testimonial.count();
  log(`Testimonials remaining (assumed real / admin-entered): ${remaining}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
