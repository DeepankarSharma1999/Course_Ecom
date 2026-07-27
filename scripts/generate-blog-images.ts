// Backfills branded hero images for published blog posts (see lib/blog-hero.ts —
// the same generator the admin saveBlog action uses). Pass --force to regenerate.
// Run: npx tsx scripts/generate-blog-images.ts [--force]
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { generateBlogHero } from "../lib/blog-hero";

const prisma = new PrismaClient();
const FORCE = process.argv.includes("--force");

async function main() {
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    select: { id: true, slug: true, title: true, category: true, readMins: true, heroImage: true },
  });

  let generated = 0, skipped = 0, failed = 0;
  for (const b of blogs) {
    const publicPath = `/images/blog/${b.slug}.png`;
    const file = path.join(process.cwd(), "public", publicPath);
    if (!FORCE && b.heroImage === publicPath && fs.existsSync(file)) { skipped++; continue; }
    const result = await generateBlogHero(b.slug, b.title, b.category, b.readMins);
    if (result) {
      await prisma.blog.update({ where: { id: b.id }, data: { heroImage: result } });
      generated++;
    } else {
      failed++;
    }
  }
  console.log(`Hero images: ${generated} generated, ${skipped} up to date${failed ? `, ${failed} failed` : ""}.`);
}

main().finally(() => prisma.$disconnect());
