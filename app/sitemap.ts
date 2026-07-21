import type { MetadataRoute } from "next";
import { getCategories, getAllCourses } from "@/lib/content";
import { INFO_PAGES } from "@/lib/info-content";
import { SITE } from "@/lib/utils";
import { COUNTRIES, CITIES_IN } from "@/lib/seed-data";
import { GEO_COURSES, getGeoCountries } from "@/lib/geo-pages/data";
import { isCityIndexable, isCountryIndexable } from "@/lib/geo-pages/gate";

// GEO-12: full indexation — every published course plus its country/city
// variants (/{country}/{course}[/{city}]) is listed; variants carry localized
// FAQs/headings/currency/schedules (see lib/indexing.ts for the history and
// the re-gate lever).
// Geo landing pages (/{course}/{country}[/{city}]) appear ONLY once they pass
// the publishing gate (no TODOs, fit-check, sourced salaries, unique intro)
// AND their releaseWeek <= RELEASE_WEEK — pacing new pages into the index.

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
  const courseSlugs = (await getAllCourses()).map((c) => c.slug);

  return [
    url("", 1),
    ...CORE_ROUTES.slice(1).map((p) => url(p, 0.8)),
    ...MARKETING_ROUTES.map((p) => url(p, 0.6, "monthly")),
    ...Object.keys(INFO_PAGES).filter((s) => !HIDDEN_INFO.has(s)).map((s) => url(`/info/${s}`, 0.4, "monthly")),
    ...categories.map((c: { slug: string }) => url(`/category/${c.slug}`, 0.8)),
    ...courseSlugs.map((s) => url(`/${s}`, 0.9)),
    // Country + city variants of every course (cities are India-only today).
    ...courseSlugs.flatMap((s) => [
      ...COUNTRIES.map((co: { slug: string }) => url(`/${co.slug}/${s}`, 0.5, "monthly")),
      ...CITIES_IN.map((ct: { slug: string }) => url(`/in/${s}/${ct.slug}`, 0.6, "monthly")),
    ]),
    ...GEO_COURSES.flatMap((course) =>
      getGeoCountries().flatMap((co) => [
        ...(isCountryIndexable(co.iso) ? [url(`/${course}/${co.iso}`, 0.7)] : []),
        ...co.cities.filter((ct) => isCityIndexable(co.iso, ct)).map((ct) => url(`/${course}/${co.iso}/${ct}`, 0.7)),
      ])),
  ];
}
