// Phase 2 audit: what the DB actually holds per course (guides read DB first).
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.course.findMany({
    where: { isPublished: true, category: { isNot: { slug: "combo-courses" } } },
    select: {
      slug: true,
      description: true,
      curriculum: true,
      learningOutcomes: true,
      prerequisites: true,
      whoShouldAttend: true,
      faqs: { select: { id: true } },
      category: { select: { slug: true } },
    },
  });

  const bucket = { full: 0, noCurriculum: [] as string[], thinDesc: [] as string[], noFaqs: [] as string[] };
  for (const r of rows) {
    const cur = Array.isArray(r.curriculum) ? (r.curriculum as unknown[]).length : 0;
    const desc = (r.description || "").length;
    if (cur === 0) bucket.noCurriculum.push(`${r.slug} [${r.category?.slug ?? "none"}]`);
    if (desc < 400) bucket.thinDesc.push(`${r.slug} (${desc} chars)`);
    if (r.faqs.length === 0) bucket.noFaqs.push(r.slug);
    if (cur > 0 && desc >= 400 && r.faqs.length > 0) bucket.full++;
  }

  console.log(`published non-combo: ${rows.length}`);
  console.log(`full (curriculum + desc + faqs): ${bucket.full}`);
  console.log(`\nno curriculum (${bucket.noCurriculum.length}):`);
  bucket.noCurriculum.forEach((s) => console.log("  " + s));
  console.log(`\nthin description <400 chars (${bucket.thinDesc.length}):`);
  bucket.thinDesc.forEach((s) => console.log("  " + s));
  console.log(`\nno faqs (${bucket.noFaqs.length}):`);
  bucket.noFaqs.forEach((s) => console.log("  " + s));
}

main().finally(() => prisma.$disconnect());
