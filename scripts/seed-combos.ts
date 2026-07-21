// Idempotent combo-course seeder. Combos are ordinary courses in the
// "combo-courses" category, managed from admin > Combo Courses.
// Run: docker exec mindclick-web npx tsx scripts/seed-combos.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COMBOS = [
  {
    slug: "leading-safe-pmp-combo",
    title: "Leading SAFe Certification Training & PMP Certification Training",
    shortTitle: "Leading SAFe & PMP Combo",
    priceInr: 70999,
    priceUsd: 1295,
  },
  {
    slug: "ssm-pmp-combo",
    title: "SSM Certification Training & PMP Certification Training",
    shortTitle: "SSM & PMP Combo",
    priceInr: 70999,
    priceUsd: 1495,
  },
  {
    slug: "csm-cspo-combo",
    title: "CSM Certification Training & CSPO Certification Training",
    shortTitle: "CSM & CSPO Combo",
    priceInr: 54999,
    priceUsd: 699,
  },
  {
    slug: "pmp-pmi-acp-combo",
    title: "PMP Certification Training & PMI-ACP Certification Training",
    shortTitle: "PMP & PMI-ACP Combo",
    priceInr: 64999,
    priceUsd: 1595,
  },
  {
    slug: "applied-agentic-ai-engineering",
    title: "Applied Agentic & Agentic AI Engineering",
    shortTitle: "Applied Agentic AI Combo",
    priceInr: 72999,
    priceUsd: 929,
  },
  {
    slug: "safe-popm-cspo-combo",
    title: "SAFe POPM Certification Training & CSPO Certification Training",
    shortTitle: "SAFe POPM & CSPO Combo",
    priceInr: 62999,
    priceUsd: 799,
  },
];

const FEATURES = [
  "Two globally recognised certifications in one bundle",
  "Live instructor-led sessions",
  "Certification-focused learning plan",
  "Exam preparation support",
];

async function main() {
  const cat = await prisma.category.upsert({
    where: { slug: "combo-courses" },
    update: { name: "Combo Courses" },
    create: { slug: "combo-courses", name: "Combo Courses", tagline: "Bundled certification combos", icon: "Layers" },
  });

  for (const c of COMBOS) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        shortTitle: c.shortTitle,
        basePriceInr: c.priceInr,
        basePriceUsd: c.priceUsd,
        categoryId: cat.id,
        isPublished: true,
        isFeatured: c.slug === "applied-agentic-ai-engineering",
      },
      create: {
        slug: c.slug,
        title: c.title,
        shortTitle: c.shortTitle,
        subtitle: "Save more by bundling two complementary certifications.",
        summary: `${c.shortTitle} — a curated bundle covering two complementary credentials at a combined discounted price.`,
        description: `The ${c.shortTitle} bundles two of our most popular certification trainings into a single structured learning path. Ideal for professionals who want a clear route across complementary skills and credentials, delivered by expert instructors with full exam-prep support.`,
        basePriceInr: c.priceInr,
        basePriceUsd: c.priceUsd,
        categoryId: cat.id,
        isPublished: true,
        isFeatured: c.slug === "applied-agentic-ai-engineering",
        keyFeatures: FEATURES,
      },
    });
    console.log("upserted combo:", c.slug);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
