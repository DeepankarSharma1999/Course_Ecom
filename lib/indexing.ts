// FIX-06: which course pages are allowed into the Google index + sitemap.
// The other ~185 course pages stay live for direct traffic but carry
// noindex until they earn unique content — the 206 near-identical pages
// were a scaled-content/doorway footprint that suppressed the whole domain.
// Country/city course variants inherit this allowlist: variants of an indexed
// course are indexable (localized FAQs/headings meet the FIX-19 quality bar);
// variants of noindexed courses stay noindex.
//
// Edit this list to promote/demote a course; slugs must match Course.slug.
export const INDEXED_COURSE_SLUGS: string[] = [
  // Agile & Scrum
  "csm-certification-training",
  "cspo-certification-training",
  "a-csm-certification-training",
  "agile-and-scrum-training",
  "pmi-acp-certification-training",
  // Project & Business
  "pmp-certification-training",
  "prince2-foundation-practitioner-course",
  "capm-certification-training",
  "cbap-certification-training",
  "change-management-training",
  // DevOps & Cloud
  "devops-foundation-certification",
  "docker-kubernetes-certification",
  "aws-sysops-administrator-certification-training",
  "aws-devops-engineer-certification-training",
  "cloud-computing-with-aws-course",
  // Quality & Service
  "lean-six-sigma-yellow-belt-certification",
  "lean-six-sigma-green-belt-certification",
  "itil-foundation-certification",
  "root-cause-analysis-training",
];

export function isCourseIndexed(slug: string) {
  return INDEXED_COURSE_SLUGS.includes(slug);
}

// noindex,follow — keeps link equity flowing while the page sits out of the index.
export const NOINDEX = { index: false, follow: true } as const;
