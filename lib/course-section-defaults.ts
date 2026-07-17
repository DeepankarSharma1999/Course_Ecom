// Default content for the otherwise-hardcoded course-page sections.
// A course's pageSections JSON overrides these per course (see admin form).
// Shapes are intentionally simple so they edit cleanly as JSON in the admin.

export type Instructor = { name: string; role: string; desc: string; exp?: string; companies?: string[]; image?: string };
export type Review = { title: string; content: string; author: string; role?: string; source?: string };
export type Certificate = { heading?: string; body?: string; image?: string };
export type Accreditation = { heading?: string; intro?: string; more?: string[] };
export type ReviewStat = { label: string; rating: string; count: string };

// FIX-02: the default review stats/reviews/instructors/salary tiers were
// fabricated (invented reviewers; Google/Facebook/SwitchUp counts copied from a
// competitor; "illustrative" salary figures). Defaults are now empty — these
// sections render only what the admin enters per course, and nothing otherwise.
// TODO(owner): with real, permissioned reviews and real market data, populate
// per course via Admin > Courses > Sections.
export const DEFAULT_REVIEW_STATS: ReviewStat[] = [];
export type DemandTier = { prefix: string; salary: { min: string; avg: string; max: string }; companies: string[]; demand: { percent: string; text: string } };
export type Demand = { role?: string; tiers?: DemandTier[] };

export const DEFAULT_DEMAND_TIERS: DemandTier[] = [];

export const DEFAULT_INSTRUCTORS: Instructor[] = [];

export const DEFAULT_REVIEWS: Review[] = [];

// Certificate/accreditation defaults are derived from the course rather than fixed
// constants. Shared so the public sections and the admin form show the same text.
export function defaultCertificate(course: { slug: string; shortTitle: string }): Required<Omit<Certificate, "image">> {
  const certName = course.slug.includes("csm") ? "CSM" : course.shortTitle;
  return {
    heading: `Earn the Coveted ${certName} Credential`,
    body: `Earning the ${course.shortTitle} certification goes beyond acquiring a new skill—it's validation of your mastery. This certification isn't just a certificate; it's a testament to your dedication and expertise. It unlocks a realm of opportunities in your professional journey, signaling to employers and peers that you possess the knowledge and commitment to excel in guiding projects with agility and efficiency. You also get access to the global community and free resources.`,
  };
}

export function defaultAccreditation(course: { accreditedBy?: string | null }): Required<Accreditation> {
  const body = course.accreditedBy || "Scrum Alliance";
  return {
    heading: `Simplilead is a ${body} Licensed Training Partner (LTP)`,
    intro: `As a ${body} Licensed Training Partner (LTP), Simplilead is officially authorized to deliver trainings based on the world's most prestigious agile curriculum.`,
    more: [
      "This isn't just a partnership — it's a promise of quality, credibility, and career transformation.",
      "Every training is led by a certified trainer, every course meets rigorous global standards, and every certificate you earn is recognized by employers worldwide.",
      "From hands-on workshops and real-world simulations to access to a thriving global community, learners get far more than a certification.",
    ],
  };
}

// Per-course override bag. Add new section keys here as they become editable.
export type PageSections = {
  instructors?: Instructor[];
  reviews?: Review[];
  certificate?: Certificate;
  accreditation?: Accreditation;
  demand?: Demand;
  reviewStats?: ReviewStat[];
};
