import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getCategories, getAllCourses } from "@/lib/content";
import { getPageContent } from "@/lib/page-content";
import { INFO_PAGES } from "@/lib/info-content";
import { SITE } from "@/lib/utils";
import { GEO_COURSES, getGeoCountries } from "@/lib/geo-pages/data";
import { isCityIndexable, isCountryIndexable } from "@/lib/geo-pages/gate";
import { isGuideListed } from "@/lib/course-guide";

// GEO-12: full indexation — every published course plus its country/city
// variants (/{country}/{course}[/{city}]) is listed; variants carry localized
// FAQs/headings/currency/schedules (see lib/indexing.ts for the history and
// the re-gate lever).
// Geo landing pages (/{course}/{country}[/{city}]) appear ONLY once they pass
// the publishing gate (no TODOs, fit-check, sourced salaries, unique intro)
// AND their releaseWeek <= RELEASE_WEEK — pacing new pages into the index.

// Mirrors HIDDEN in app/(public)/info/[slug]/page.tsx (those routes 404).
const HIDDEN_INFO = new Set(["tutorials", "interview-questions", "course-info", "blogs"]);

const CORE_ROUTES = ["", "/courses", "/combo-courses", "/corporate-training", "/about", "/enquire", "/blog", "/compare"];

const MARKETING_ROUTES = [
  "/business-agility", "/safe-implementation", "/lean-portfolio-management", "/value-stream",
  "/design-thinking-workshops", "/product-coaching", "/product-development-training",
  "/project-to-product", "/devops-cultural-transformation", "/tech-business-management",
  "/practice-tests", "/self-paced", "/refer-earn",
];

// Deploy-time constant for routes with no per-item timestamp — a stable value
// beats per-request `new Date()`, which changed on every crawl and taught
// Google to ignore lastmod entirely.
const BUILD_DATE = new Date();

// Geo data files carry their real content age in the filesystem.
function geoFileDate(rel: string): Date {
  try { return fs.statSync(path.join(process.cwd(), "data", "geo", rel)).mtime; }
  catch { return BUILD_DATE; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const url = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly", lastModified: Date = BUILD_DATE) =>
    ({ url: `${base}${path}`, lastModified, changeFrequency, priority });

  const categories = await getCategories();
  const courses = await getAllCourses();
  const courseSlugs = courses.map((c) => c.slug);
  const guideSlugs = courses.filter(isGuideListed).map((c) => c.slug);
  let blogs: { slug: string; updatedAt: Date }[] = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    blogs = await prisma.blog.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } });
  } catch { /* DB unavailable — omit blog posts */ }
  let comparePairs: { a: string; b: string }[] = [];
  try {
    const c = await getPageContent("compare");
    comparePairs = ((c as Record<string, unknown>).suggested as { a: string; b: string }[]) ?? [];
  } catch { /* content unavailable — omit compare pairs */ }

  return [
    url("", 1),
    ...CORE_ROUTES.slice(1).map((p) => url(p, 0.8)),
    ...MARKETING_ROUTES.map((p) => url(p, 0.6, "monthly")),
    ...Object.keys(INFO_PAGES).filter((s) => !HIDDEN_INFO.has(s)).map((s) => url(`/info/${s}`, 0.4, "monthly")),
    ...categories.map((c: { slug: string }) => url(`/category/${c.slug}`, 0.8)),
    ...courseSlugs.map((s) => url(`/${s}`, 0.9)),
    // Certification guides (/info/<course-slug>) — informational long-tail layer.
    ...guideSlugs.map((s) => url(`/info/${s}`, 0.7)),
    // Published blog posts — real updatedAt as lastmod.
    ...blogs.map((b) => url(`/blog/${b.slug}`, 0.6, "weekly", b.updatedAt)),
    // Curated comparison pages only — never the full ~42k combinatorial set.
    ...comparePairs.map(({ a, b }) => url(`/compare/${a}-vs-${b}`, 0.5, "monthly")),
    // Legacy /{country}/{course}[/{city}] variants removed (SEO-AUDIT 2026-07):
    // they are noindex (lib/indexing.ts isVariantIndexed) — the gated geo pages
    // below are the only geo surface in the sitemap.
    ...GEO_COURSES.flatMap((course) =>
      getGeoCountries().flatMap((co) => [
        ...(isCountryIndexable(co.iso) ? [url(`/${course}/${co.iso}`, 0.7, "weekly", geoFileDate(`countries/${co.iso}.json`))] : []),
        ...co.cities.filter((ct) => isCityIndexable(co.iso, ct))
          .map((ct) => url(`/${course}/${co.iso}/${ct}`, 0.7, "weekly", geoFileDate(`cities/${co.iso}/${ct}.json`))),
      ])),
  ];
}
