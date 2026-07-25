// Indexation policy for course pages and their country/city variants.
//
// History: FIX-06 (2026) noindexed the thin long tail after 206 near-identical
// pages drew a scaled-content/doorway suppression, keeping a 19-course
// allowlist. As of GEO-12 the owner chose full indexation: every course page
// now carries unique generated content (per-family FAQs, localized GEO
// variants, per-course pricing/schedules), and all courses + variants are
// indexable and sitemapped.
//
// If Google Search Console shows a sitewide impressions drop after this
// change, re-gate by restoring an allowlist here — every robots decision and
// the sitemap flow through isCourseIndexed().
export function isCourseIndexed(_slug: string) {
  return true;
}

// SEO-AUDIT 2026-07: legacy geo VARIANTS (/{country}/{course}[/{city}]) are
// noindexed again — ~2,060 near-identical pages with no quality gate recreated
// the FIX-06 doorway footprint, while the NEW gated geo pages
// (/{course}/{country}[/{city}], lib/geo-pages/gate.ts) release paced, unique
// content. Base course pages stay fully indexed (GEO-12 unchanged). To re-open
// legacy variants, gate them through real quality checks first — don't just
// flip this to true.
export function isVariantIndexed(_courseSlug: string) {
  return false;
}

// noindex,follow — keeps link equity flowing while a page sits out of the index.
export const NOINDEX = { index: false, follow: true } as const;
