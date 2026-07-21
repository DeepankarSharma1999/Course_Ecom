import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/content";
import { INDEXED_COURSE_SLUGS } from "@/lib/indexing";
import { INFO_PAGES } from "@/lib/info-content";
import { SITE } from "@/lib/utils";
import { COUNTRIES, CITIES_IN } from "@/lib/seed-data";
import { GEO_COURSES, getGeoCountries } from "@/lib/geo-pages/data";
import { isCityIndexable, isCountryIndexable } from "@/lib/geo-pages/gate";

// FIX-06: the sitemap lists ONLY pages meant for the index — the allowlisted
// courses plus core/static pages. Noindexed pages (the ~185 remaining courses
// and their country/city variants) are deliberately absent.
// Country/city variants (/{country}/{course}[/{city}]) of the ALLOWLISTED
// courses are indexable and listed: their localized FAQs, headings, currency
// and schedules meet the FIX-19 uniqueness bar.
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

  return [
    url("", 1),
    ...CORE_ROUTES.slice(1).map((p) => url(p, 0.8)),
    ...MARKETING_ROUTES.map((p) => url(p, 0.6, "monthly")),
    ...Object.keys(INFO_PAGES).filter((s) => !HIDDEN_INFO.has(s)).map((s) => url(`/info/${s}`, 0.4, "monthly")),
    ...categories.map((c: { slug: string }) => url(`/category/${c.slug}`, 0.8)),
    ...INDEXED_COURSE_SLUGS.map((s) => url(`/${s}`, 0.9)),
    // Country + city variants of allowlisted courses (cities are India-only today).
    ...INDEXED_COURSE_SLUGS.flatMap((s) => [
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
