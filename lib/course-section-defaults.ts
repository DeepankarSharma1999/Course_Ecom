// Default content for the otherwise-hardcoded course-page sections.
// A course's pageSections JSON overrides these per course (see admin form).
// Shapes are intentionally simple so they edit cleanly as JSON in the admin.

export type Instructor = { name: string; role: string; desc: string; exp?: string; companies?: string[]; image?: string };
export type Review = { title: string; content: string; author: string; role?: string; source?: string };
export type Certificate = { heading?: string; body?: string; image?: string };
export type Accreditation = { heading?: string; intro?: string; more?: string[] };
export type ReviewStat = { label: string; rating: string; count: string };

export const DEFAULT_REVIEW_STATS: ReviewStat[] = [
  { label: "Google", rating: "4.8/5", count: "6,028 Reviews" },
  { label: "facebook", rating: "4.7/5", count: "991 Reviews" },
  { label: "switchup", rating: "4.9/5", count: "228 Reviews" },
];
export type DemandTier = { prefix: string; salary: { min: string; avg: string; max: string }; companies: string[]; demand: { percent: string; text: string } };
export type Demand = { role?: string; tiers?: DemandTier[] };

// Default salary/company tiers for the Demand section (illustrative figures).
export const DEFAULT_DEMAND_TIERS: DemandTier[] = [
  { prefix: "", salary: { min: "₹9L", avg: "₹15L", max: "₹20L" }, companies: ["Coca-Cola", "Amazon", "Sapient", "HSBC", "Walmart", "Accenture"], demand: { percent: "87%", text: "of employers prefer certified professionals" } },
  { prefix: "Senior ", salary: { min: "₹14L", avg: "₹22L", max: "₹30L" }, companies: ["Microsoft", "IBM", "Deloitte", "TCS", "Infosys", "Wipro"], demand: { percent: "92%", text: "of organizations are scaling these skills" } },
  { prefix: "Lead ", salary: { min: "₹20L", avg: "₹35L", max: "₹50L" }, companies: ["Google", "Meta", "Apple", "Netflix", "Uber", "Airbnb"], demand: { percent: "95%", text: "growth in leadership-level demand" } },
];

export const DEFAULT_INSTRUCTORS: Instructor[] = [
  { name: "Naveen Nanjundappa", role: "Certified Scrum Trainer (CST)", desc: "Naveen works with organisations and teams that struggle to accomplish everything they want to in product and people development.", exp: "20+", companies: ["NOKIA", "Wipro"] },
  { name: "Taghi Paksima", role: "Enterprise & Leadership Agility Coach", desc: "Taghi, a Certified Scrum Trainer and Enterprise Agile Coach, boasts two decades of experience in the software/IT industry.", exp: "24+", companies: ["Microsoft", "Scrum Alliance"] },
  { name: "Raj Kasturi", role: "Certified Scrum Trainer (CST)", desc: "Raj Kasturi is a seasoned Agile Coach with 30 years of global application delivery and leadership experience.", exp: "30+", companies: ["Bank of America"] },
];

export const DEFAULT_REVIEWS: Review[] = [
  { title: "User-friendly and interactive", content: "A great learning experience. The trainer was highly experienced and the sessions were engaging throughout.", author: "Anandamoorthy", role: "Project Leader", source: "Google" },
  { title: "Informative sessions", content: "An excellent learning journey — the trainer was fantastic and explained every concept clearly with real examples.", author: "Hitesh Prajapati", role: "Product Manager", source: "Google" },
  { title: "A great learning experience", content: "The trainer was very knowledgeable and patient, and the hands-on activities made the concepts stick.", author: "Rupali Bhosale", role: "Developer", source: "Google" },
  { title: "Excellent curriculum and mentors", content: "The content was top notch and the mentorship I received was invaluable for my career growth. Highly recommended.", author: "Priya Sharma", role: "Agile Coach", source: "LinkedIn" },
  { title: "Practical and applicable", content: "Unlike other theoretical courses, this one gave me tools I could use the very next morning with my team.", author: "David Chen", role: "Engineering Manager", source: "LinkedIn" },
];

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
