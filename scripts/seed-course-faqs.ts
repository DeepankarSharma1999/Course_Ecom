// Generate and store location-neutral FAQs for every course. Re-runnable: it
// refreshes generated FAQs but preserves the hand-authored ones (courses that
// ship their own faqs in lib/seed-data). GEO/location keywords are added at
// render time by localizeCourseFaqs, not stored here.
// Run: npx tsx scripts/seed-course-faqs.ts
import { PrismaClient } from "@prisma/client";
import { buildCourseFaqs } from "../lib/course-faqs";
import { COURSES } from "../lib/seed-data";

const prisma = new PrismaClient();

const HAND_AUTHORED = new Set(COURSES.filter((c) => (c.faqs?.length ?? 0) > 0).map((c) => c.slug));

async function main() {
  const courses = await prisma.course.findMany({ include: { category: true } });

  let refreshed = 0;
  let preserved = 0;
  for (const c of courses) {
    if (HAND_AUTHORED.has(c.slug)) {
      preserved++;
      continue;
    }
    const faqs = buildCourseFaqs({
      slug: c.slug,
      title: c.title,
      shortTitle: c.shortTitle ?? undefined,
      category: c.category ? { slug: c.category.slug, name: c.category.name } : { slug: "", name: "" },
      durationLabel: c.durationLabel ?? undefined,
      examIncluded: !!c.examIncluded,
      whoShouldAttend: (c.whoShouldAttend as string[]) ?? [],
      prerequisites: (c.prerequisites as string[]) ?? [],
    });
    await prisma.$transaction([
      prisma.fAQ.deleteMany({ where: { courseId: c.id, scope: "course" } }),
      prisma.fAQ.createMany({
        data: faqs.map((f, i) => ({ courseId: c.id, scope: "course", question: f.q, answer: f.a, order: i })),
      }),
    ]);
    refreshed++;
  }

  console.log(`FAQs refreshed: ${refreshed} | hand-authored preserved: ${preserved}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
