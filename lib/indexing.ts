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

// noindex,follow — keeps link equity flowing while a page sits out of the index.
export const NOINDEX = { index: false, follow: true } as const;
