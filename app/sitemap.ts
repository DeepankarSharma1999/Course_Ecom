import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/content";
import { INDEXED_COURSE_SLUGS } from "@/lib/indexing";
import { INFO_PAGES } from "@/lib/info-content";
import { SITE } from "@/lib/utils";

// FIX-06: the sitemap lists ONLY pages meant for the index — the allowlisted
// courses plus core/static pages. Noindexed pages (the ~185 remaining courses
// and every country/city variant) are deliberately absent.

// Mirrors HIDDEN in app/(public)/info/[slug]/page.tsx (those routes 404).
const HIDDEN_INFO = new Set(["tutorials", "interview-questions", "course-info"]);

const CORE_ROUTES = ["", "/courses", "/combo-courses", "/corporate-training", "/about", "/enquire", "/resources", "/compare"];

const MARKETING_ROUTES = [
  "/business-agility", "/safe-implementation", "/lean-portfolio-management", "/value-stream",
  "/design-thinking-workshops", "/product-coaching", "/product-development-training",
  "/project-to-product", "/devops-cultural-transformation", "/tech-business-management",
  "/practice-tests", "/self-paced", "/refer-earn",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();
  const url = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") =>
    ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });

  const categories = await getCategories();

  return [
    url("", 1),
    ...CORE_ROUTES.slice(1).map((p) => url(p, 0.8)),
    ...MARKETING_ROUTES.map((p) => url(p, 0.6, "monthly")),
    ...Object.keys(INFO_PAGES).filter((s) => !HIDDEN_INFO.has(s)).map((s) => url(`/info/${s}`, 0.4, "monthly")),
    ...categories.map((c: { slug: string }) => url(`/category/${c.slug}`, 0.8)),
    ...INDEXED_COURSE_SLUGS.map((s) => url(`/${s}`, 0.9)),
  ];
}
