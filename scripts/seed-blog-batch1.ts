// Seeds blog batch 1 (30 articles) — idempotent upsert by slug.
// Run: npx tsx scripts/seed-blog-batch1.ts
import { PrismaClient } from "@prisma/client";
import { AUTHOR } from "./blog-content/types";
import { SCRUM_POSTS } from "./blog-content/batch1-scrum";
import { AGILE2_POSTS } from "./blog-content/batch1-agile2";
import { SAFE_POSTS } from "./blog-content/batch1-safe";
import { PM_POSTS } from "./blog-content/batch1-pm";
import { PRODUCT_POSTS } from "./blog-content/batch1-product";

const prisma = new PrismaClient();
const ALL = [...SCRUM_POSTS, ...AGILE2_POSTS, ...SAFE_POSTS, ...PM_POSTS, ...PRODUCT_POSTS];

async function main() {
  const now = Date.now();
  let created = 0, updated = 0;
  for (const [i, p] of ALL.entries()) {
    // Stagger publishedAt by a few hours so the listing has a natural order.
    const publishedAt = new Date(now - i * 3 * 60 * 60 * 1000);
    const data = {
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
      content: p.content.trim(),
      readMins: p.readMins,
      author: AUTHOR,
      tags: p.tags,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      relatedCourseSlugs: p.relatedCourseSlugs,
      isPublished: true,
    };
    const existing = await prisma.blog.findUnique({ where: { slug: p.slug }, select: { id: true } });
    if (existing) {
      await prisma.blog.update({ where: { slug: p.slug }, data });
      updated++;
    } else {
      await prisma.blog.create({ data: { slug: p.slug, publishedAt, ...data } });
      created++;
    }
  }
  console.log(`Batch 1 seeded: ${created} created, ${updated} updated, ${ALL.length} total.`);

  // Sanity: no duplicate slugs in the batch
  const slugs = new Set(ALL.map((p) => p.slug));
  if (slugs.size !== ALL.length) console.warn("WARNING: duplicate slugs in batch!");
}

main().finally(() => prisma.$disconnect());
