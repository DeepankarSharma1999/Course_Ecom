// FIX-02: the single source of truth for every marketing statistic on the site.
//
// HARD RULE: a number goes here ONLY when the business can evidence it
// (LMS/enrollment records, invoices, public third-party review profiles).
// `null` means the stat does not render anywhere — components must skip it.
// The previous values were template fabrications (some digit-identical to
// KnowledgeHut's live review counts), which in a YMYL category is both a
// ranking and a legal liability.
//
// TODO(owner): fill in real values below as they become verifiable, e.g.
// learnersTrained: "400+ professionals trained since 2024".
export const VERIFIED_STATS = {
  /** Was "500,000+" / "5,00,000+ professionals trained worldwide". */
  learnersTrained: null as string | null,
  /** Was "450,000+ Alumni". */
  alumniNetwork: null as string | null,
  /** Was "4,500+ companies" / "1,000+ enterprises". */
  companiesTrained: null as string | null,
  /** Was "5000+ Hiring Partners". */
  hiringPartners: null as string | null,
  /** Was "4.8/5" — only once public review profiles exist (FIX-14). */
  reviewRating: null as string | null,
  /** Was "12,500+ Reviews" — only once public review profiles exist (FIX-14). */
  reviewCount: null as string | null,
  /** Was "98%" / "99% Pass Rate". */
  passRate: null as string | null,
  /** Was "750+ Expert Trainers" / "1,500+ Industry Experts". */
  trainerCount: null as string | null,
  /** Was "50+" / "100+ nations". */
  countriesServed: null as string | null,
};
