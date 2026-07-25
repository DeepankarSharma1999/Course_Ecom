import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();

async function main() {
  const blogs = await p.blog.findMany({ select: { slug: true, relatedCourseSlugs: true, content: true } });
  const courses = new Set((await p.course.findMany({ select: { slug: true } })).map((c) => c.slug));
  let bad = 0;
  for (const b of blogs) {
    for (const s of b.relatedCourseSlugs)
      if (!courses.has(s)) { console.log("MISSING related:", b.slug, "->", s); bad++; }
    // validate in-content course/info links
    const hrefs = [...b.content.matchAll(/href="\/([^"]+)"/g)].map((m) => m[1]);
    for (const h of hrefs) {
      if (h.startsWith("info/")) {
        if (!courses.has(h.slice(5))) { console.log("BAD info link:", b.slug, "->", h); bad++; }
      } else if (h.startsWith("blog/")) {
        // cross-post link; check against blog slugs later
      } else if (!courses.has(h)) {
        console.log("CHECK non-course link:", b.slug, "->", h); // may be a marketing page
      }
    }
  }
  const blogSlugs = new Set(blogs.map((b) => b.slug));
  for (const b of blogs) {
    const hrefs = [...b.content.matchAll(/href="\/blog\/([^"]+)"/g)].map((m) => m[1]);
    for (const h of hrefs) if (!blogSlugs.has(h)) { console.log("BAD blog link:", b.slug, "->", h); bad++; }
  }
  console.log(bad === 0 ? "All hard links valid." : `${bad} problems found.`);
}
main().finally(() => p.$disconnect());
