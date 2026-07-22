// Per-course FAQ generator.
//
// Modeled on how StarAgile, SimpliAxis and KnowledgeHut structure their course
// FAQ sections: a handful of universal questions (delivery, audience,
// prerequisites, certificate, reschedule) tailored per course, plus
// certification-family questions (awarding body, exam format, PDUs/renewal,
// membership) that differ by credential. Detection is slug/title based because
// `accreditedBy` and `level` are uniform placeholders in the catalog.
//
// Location (GEO) support: buildCourseFaqs accepts an optional location so the
// city/country variant pages get StarAgile-style density — the location woven
// into nearly every question/answer with rotated keyword variants ("CSM
// training in Delhi", "CSM course in Delhi") plus location-only FAQs (weekend
// batches, other cities with internal links). Without a location the output is
// the neutral set stored in the DB by scripts/seed-course-faqs.ts and used as
// the static fallback in content.ts.

import { baseCourseTitle } from "./utils";
import { COURSES as SEED_COURSES } from "./seed-data";

export type FaqItem = { q: string; a: string };
export type SiblingCity = { name: string; href: string };
export type GeoFaqOptions = { location?: string | null; siblingCities?: SiblingCity[] };

type CourseLike = {
  slug: string;
  title: string;
  shortTitle?: string;
  category: { slug: string; name: string };
  durationLabel?: string;
  examIncluded?: boolean;
  whoShouldAttend?: string[];
  prerequisites?: string[];
};

type Family =
  | "scrum-alliance"
  | "scrum-org"
  | "safe"
  | "pmi"
  | "prince2"
  | "itil"
  | "icagile"
  | "iiba"
  | "six-sigma"
  | "devops-institute"
  | "aws"
  | "microsoft"
  | "iso"
  | "cissp"
  | "pci"
  | "gen-ai"
  | "microcredential"
  | "tech"
  | "business"
  | "generic";

const has = (s: string, ...needles: string[]) => needles.some((n) => s.includes(n));

function detectFamily(c: CourseLike): Family {
  const slug = c.slug.toLowerCase();
  const title = c.title.toLowerCase();
  const t = `${slug} ${title}`;
  const cat = c.category.slug;

  // Certification bodies — most specific first.
  if (
    /\b(csm|cspo|a-csm|a-cspo|csd|a-csd|csp-po|csp-sm|cal-|casp)\b/.test(slug) ||
    has(title, "certified scrum", "certified agile leader", "scrum@scale", "agile scaling practitioner")
  )
    return "scrum-alliance";
  if (
    /\b(psm|pspo|psd|psk|pal|pspbm|aps)\b/.test(slug) ||
    has(title, "professional scrum", "applying professional", "professional agile leadership")
  )
    return "scrum-org";
  if (cat === "safe" || has(t, "safe®", "leading safe", "scaled agile")) return "safe";
  if (/\b(pmp|capm|pmi-acp|pgmp|pfmp|cpmai)\b/.test(slug) || has(title, "pmi-", "project management professional", "portfolio management professional", "program management professional"))
    return "pmi";
  if (has(t, "prince2")) return "prince2";
  if (has(t, "itil")) return "itil";
  if (has(t, "icagile") || /\bicp-/.test(slug)) return "icagile";
  if (/\b(cbap|ccba|ecba|iiba)\b/.test(slug) || has(title, "business analysis")) return "iiba";
  if (has(t, "six sigma", "six-sigma")) return "six-sigma";
  if (/\b(devsecops|ctf|cdef)\b/.test(slug) || has(t, "devops foundation", "continuous testing", "continuous delivery ecosystem"))
    return "devops-institute";
  if (has(t, "aws")) return "aws";
  if (/\baz-\d/.test(slug) || has(t, "azure", "power bi", "microsoft")) return "microsoft";
  if (has(t, "iso-iec", "iso/iec", "42001")) return "iso";
  if (has(t, "cissp")) return "cissp";
  if (has(t, "pci dss", "pci-dss")) return "pci";

  // Broad content types.
  if (cat === "microcredentials" || cat === "on-demand-microcredentials" || has(t, "microcredential", "micro-credential", "micro credential"))
    return "microcredential";
  if (cat === "generative-ai" || has(t, "generative ai", "gen ai", "agentic ai", "prompt engineering", "artificial intelligence", " ai ", "machine learning", "claude", "no-code ai"))
    return "gen-ai";
  if (cat === "technology" || cat === "cloud-computing" || cat === "data-science" || has(t, "python", "react", "angular", "django", "docker", "kubernetes", "blockchain", "jira", "primavera", "power bi"))
    return "tech";
  if (cat === "business" || has(t, "conflict management", "change management", "design thinking", "business case"))
    return "business";

  return "generic";
}

// "2 Days | Live Classes" -> "2 days"; falls back gracefully.
function durationPhrase(label?: string): string {
  const m = label?.match(/^(\d+)\s*Day/i);
  if (!m) return "the scheduled";
  const n = Number(m[1]);
  return `${n} ${n === 1 ? "day" : "days"}`;
}

function listSentence(items: string[] | undefined, fallback: string): string {
  const clean = (items ?? []).map((s) => s.trim()).filter(Boolean);
  if (clean.length === 0) return fallback;
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, and ${clean[clean.length - 1]}`;
}

// Body/exam label per family, for phrasing the awarding-body and certificate FAQs.
const BODY: Partial<Record<Family, string>> = {
  "scrum-alliance": "Scrum Alliance",
  "scrum-org": "Scrum.org",
  safe: "Scaled Agile, Inc.",
  pmi: "the Project Management Institute (PMI)",
  prince2: "PeopleCert (on behalf of AXELOS)",
  itil: "PeopleCert (on behalf of AXELOS)",
  icagile: "ICAgile",
  iiba: "the International Institute of Business Analysis (IIBA)",
  "six-sigma": "an accredited Lean Six Sigma certification body",
  "devops-institute": "PeopleCert DevOps Institute",
  aws: "Amazon Web Services (AWS)",
  microsoft: "Microsoft",
  iso: "PECB",
  cissp: "ISC2",
};

function name(c: CourseLike): string {
  // Seed `shortTitle` is truncated to 50 chars ("...Traini"); derive a clean
  // base name from the full title, matching how the rest of the site names courses.
  return baseCourseTitle(c.title) || c.title;
}

// ---------- SEO keyword variants ----------

export type CourseKeywords = { base: string; acr: string; pool: string[] };

/**
 * Keyword variants for a course, StarAgile-style: the acronym from the title's
 * parens ("Certified Scrum Master (CSM®)" -> "CSM") drives short variants
 * ("CSM training", "CSM course") that rotate through questions/answers so the
 * phrasing varies naturally instead of repeating the full formal name.
 */
export function courseKeywords(c: CourseLike): CourseKeywords {
  const base = name(c);
  const m = c.title.match(/\(([^)]{2,20})\)/);
  const raw = m?.[1]?.replace(/[®™℠]/g, "").trim() ?? "";
  // Acronym-ish only: short, mostly uppercase tokens ("CSM", "PSM I", "PMI-ACP").
  const acr = /^[A-Z0-9][A-Za-z0-9 .&-]{0,14}$/.test(raw) && /[A-Z]{2}/.test(raw) ? raw : base;
  const pool = [
    `${acr} certification training`,
    `${acr} training`,
    `${acr} course`,
    `${acr} certification`,
  ];
  if (acr !== base) pool.push(`${base} certification`);
  return { base, acr, pool: [...new Set(pool)] };
}

// Deterministic rotation through the keyword pool by FAQ position.
const rot = (pool: string[], i: number) => pool[i % pool.length];

// Country names that read wrong without an article ("in United States").
const NEEDS_THE = new Set(["United States", "United Kingdom", "United Arab Emirates", "Netherlands", "Philippines"]);
const locDisplay = (loc: string) => (NEEDS_THE.has(loc) ? `the ${loc}` : loc);

// Localize a family-FAQ question: append " in {loc}" unless it's already there
// or the phrasing would break ("Does this certification expire in Delhi?" is
// the acceptable StarAgile-style edge; "as tools change in Delhi?" is not).
function locQ(q: string, loc: string): string {
  if (q.includes(loc)) return q;
  if (/(change|expire|roadmap|policy)\?$/i.test(q)) return q;
  return q.replace(/\?$/, ` in ${loc}?`);
}

// Rotated location sentence appended to family-FAQ answers.
function locA(a: string, loc: string, kw: string, i: number): string {
  if (a.includes(loc)) return a;
  const suffixes = [
    ` This applies equally to ${kw} learners in ${loc}.`,
    ` The process is the same for every ${kw} batch in ${loc}.`,
    ` Participants in ${loc} taking the ${kw} follow the same steps.`,
    ` This holds for all ${kw} cohorts in ${loc}.`,
  ];
  return a + suffixes[i % suffixes.length];
}

// ---------- FAQ builders ----------

function baseFaqs(c: CourseLike, loc?: string): FaqItem[] {
  const n = name(c);
  const dur = durationPhrase(c.durationLabel);
  const audience = listSentence(
    c.whoShouldAttend,
    "professionals looking to build in-demand, job-ready skills and validate them with a recognised credential"
  );
  const prereq = listSentence(c.prerequisites, "");
  const { pool } = courseKeywords(c);

  if (loc) {
    const prereqA = prereq
      ? `You should have ${prereq.charAt(0).toLowerCase() + prereq.slice(1)}. Beyond that, there are no formal prerequisites for the ${rot(pool, 3)} in ${loc} — our trainers take you from fundamentals to applied skills.`
      : `There are no strict prerequisites for the ${rot(pool, 3)} in ${loc}. A basic familiarity with the subject area helps, but the trainer covers the fundamentals before moving to advanced, applied topics.`;
    return [
      {
        q: `How is the ${n} training delivered in ${loc}?`,
        a: `The ${rot(pool, 0)} in ${loc} is delivered as live, instructor-led online classes over ${dur} that you can join from anywhere in ${loc}, in small interactive batches with hands-on exercises and real-world examples. You also get session recordings, courseware, and post-class support. Weekday and weekend ${rot(pool, 1)} batches run on ${loc}-friendly timings, and corporate/in-house delivery in ${loc} can be arranged.`,
      },
      {
        q: `Can I take the ${rot(pool, 2)} online in ${loc}?`,
        a: `Yes. The ${rot(pool, 0)} is available as live online classes across ${loc}, alongside classroom batches in select locations. Both formats cover the same syllabus and prepare you for the ${rot(pool, 3)}.`,
      },
      {
        q: `Who should attend the ${rot(pool, 2)} in ${loc}?`,
        a: `The ${rot(pool, 1)} in ${loc} is ideal for ${audience}.`,
      },
      { q: `What are the prerequisites for the ${rot(pool, 1)} in ${loc}?`, a: prereqA },
    ];
  }

  const faqs: FaqItem[] = [
    {
      q: `How is the ${n} training delivered?`,
      a: `The ${n} certification training is delivered as live, instructor-led online classes over ${dur}, in small interactive batches with hands-on exercises and real-world examples. You also get session recordings, courseware, and post-class support. Weekday and weekend ${n} batches are available, and corporate/in-house delivery can be arranged.`,
    },
    {
      q: `Can I take the ${n} course online?`,
      a: `Yes. The ${n} certification training is available as live online classes you can join from anywhere, alongside classroom batches in select locations. Both formats cover the same syllabus and prepare you for the ${n} certification.`,
    },
    {
      q: `Who should attend the ${n} course?`,
      a: `The ${n} training course is ideal for ${audience}.`,
    },
  ];

  faqs.push({
    q: `What are the prerequisites for the ${n} certification?`,
    a: prereq
      ? `You should have ${prereq.charAt(0).toLowerCase() + prereq.slice(1)}. Beyond that, there are no formal prerequisites for the ${n} training — our trainers take you from fundamentals to applied skills.`
      : `There are no strict prerequisites for the ${n} certification training. A basic familiarity with the subject area helps, but the trainer covers the fundamentals before moving to advanced, applied topics.`,
  });

  return faqs;
}

// Location-only FAQs for city/country variant pages.
function geoFaqs(c: CourseLike, loc: string, siblingCities?: SiblingCity[]): FaqItem[] {
  const { pool } = courseKeywords(c);
  const out: FaqItem[] = [
    {
      q: `Do you offer ${rot(pool, 0)} in ${loc}?`,
      a: `Yes. We run the ${rot(pool, 1)} in ${loc} as live online batches you can join from anywhere in ${loc}, with classroom sessions in select cities. Timings are aligned to ${loc} working hours, and pricing is shown in your local currency.`,
    },
    {
      q: `Is the ${rot(pool, 3)} recognised by employers in ${loc}?`,
      a: `Absolutely. The ${rot(pool, 3)} is globally recognised and valued by employers across ${loc}, so it strengthens your CV and career prospects locally and internationally.`,
    },
    {
      q: `Are there weekend batches for the ${rot(pool, 2)} in ${loc}?`,
      a: `Yes. Alongside weekday cohorts, we schedule weekend ${rot(pool, 1)} batches timed for ${loc} so working professionals can complete the ${rot(pool, 2)} without taking leave. Check the schedules section above for the next ${loc}-friendly dates.`,
    },
  ];
  if (siblingCities?.length) {
    const links = siblingCities
      .slice(0, 10)
      .map((s) => `<a href="${s.href}" class="text-brand-600 hover:underline">${rot(pool, 1)} in ${s.name}</a>`)
      .join(", ");
    out.push({
      q: `Which other cities offer the ${rot(pool, 2)} besides ${loc}?`,
      a: `The same ${rot(pool, 0)} runs across major cities: ${links}. Every location follows the same curriculum, certification process, and pricing.`,
    });
  }
  return out;
}

function tailFaqs(c: CourseLike, loc?: string): FaqItem[] {
  const n = name(c);
  const { pool } = courseKeywords(c);
  if (loc) {
    return [
      {
        q: `Do you offer group or corporate ${rot(pool, 1)} in ${loc}?`,
        a: `Yes. We run private ${rot(pool, 2)} cohorts for teams in ${loc} with tailored scheduling, and offer group discounts for three or more participants. Contact us for a corporate/in-house quote in ${loc}.`,
      },
      {
        q: `What is the rescheduling and refund policy for the ${rot(pool, 2)} in ${loc}?`,
        a: `You can reschedule to a later ${loc} batch at no extra cost with advance notice. Refunds are handled per our published cancellation policy — reach out to support and we'll help you switch dates or process a refund.`,
      },
    ];
  }
  return [
    {
      q: `Do you offer group or corporate training for ${n}?`,
      a: `Yes. We run private cohorts for teams with tailored scheduling, and offer group discounts for three or more participants. Contact us for a corporate/in-house quote.`,
    },
    {
      q: `What is your rescheduling and refund policy?`,
      a: `You can reschedule to a later batch at no extra cost with advance notice. Refunds are handled per our published cancellation policy — reach out to support and we'll help you switch dates or process a refund.`,
    },
  ];
}

function familyFaqs(c: CourseLike, fam: Family): FaqItem[] {
  const n = name(c);
  const body = BODY[fam];
  const out: FaqItem[] = [];

  const awardingBodyFaq = () =>
    body
      ? { q: `Who awards the ${n} certification?`, a: `The credential is awarded by ${body}. SimpliLEAD delivers the training and prepares you for the assessment.` }
      : null;

  switch (fam) {
    case "scrum-alliance":
      out.push(
        { q: `Who awards this certification?`, a: `The certification is issued by Scrum Alliance, one of the most widely recognised Scrum certification bodies. The course is delivered by SimpliLEAD's experienced Scrum trainers.` },
        { q: `Is the certification exam fee included?`, a: `Yes. The course fee includes the certification attempt and a two-year Scrum Alliance membership. After completing the ${durationPhrase(c.durationLabel)} of training you receive access to take the assessment online.` },
        { q: `Do I earn SEUs or PDUs?`, a: `Yes. Attending qualifies for Scrum Education Units (SEUs) with Scrum Alliance and PDUs with PMI, which count toward renewing your Agile and project-management credentials.` },
        { q: `How do I maintain the certification?`, a: `Scrum Alliance certifications are renewed every two years by earning SEUs and paying a renewal fee. We share guidance on the simplest ways to earn the units you need.` },
      );
      break;
    case "scrum-org":
      out.push(
        { q: `Who awards this certification?`, a: `The assessment is provided by Scrum.org, founded by Scrum co-creator Ken Schwaber. SimpliLEAD's trainers prepare you to pass it with confidence.` },
        { q: `Does this certification expire?`, a: `No. Scrum.org certifications are lifelong — there is no renewal fee and no expiry, so the credential stays valid once earned.` },
        { q: `Is the assessment included, and what is the format?`, a: `The course includes preparation and guidance for the online Scrum.org assessment, which is multiple-choice and taken remotely at your convenience. You'll practise with mock questions modelled on the real exam.` },
        { q: `What passing standard should I expect?`, a: `Scrum.org assessments are rigorous (typically around an 85% pass mark), so our sessions focus on deep understanding of the Scrum framework rather than memorisation.` },
      );
      break;
    case "safe":
      out.push(
        { q: `Who awards the SAFe certification?`, a: `The credential is issued by Scaled Agile, Inc., the body behind the Scaled Agile Framework (SAFe). The course is delivered by SimpliLEAD's certified SAFe Program Consultants (SPCs).` },
        { q: `Is the exam and SAFe Studio membership included?`, a: `Yes. The course includes the official certification exam attempt and a one-year SAFe Studio membership with access to digital courseware, the exam, and member resources.` },
        { q: `What is the exam format?`, a: `The certification exam is taken online after the ${durationPhrase(c.durationLabel)} of training. It is multiple-choice, time-boxed, and can be attempted from home within the access window.` },
        { q: `How do I renew a SAFe certification?`, a: `SAFe certifications are renewed annually through Scaled Agile for a small fee, which keeps your digital badge and Studio access active. We explain the renewal steps at the end of the course.` },
      );
      break;
    case "pmi":
      out.push(
        { q: `Who awards this certification?`, a: `The credential is awarded by the Project Management Institute (PMI). SimpliLEAD provides the PMI-required training and full exam preparation.` },
        { q: `Does this course meet PMI's contact-hour / PDU requirement?`, a: `Yes. The training provides the formal contact hours (PDUs) PMI requires as part of eligibility, and you receive a certificate confirming them.` },
        { q: `Is the exam fee included?`, a: `The PMI exam is booked and paid directly with PMI, as PMI administers it through their own testing partner. Your course covers the required training, practice questions, and exam-day strategy so you're fully prepared.` },
        { q: `What are the eligibility requirements?`, a: `Requirements vary by credential — typically a mix of a degree, documented project experience, and formal project-management education. Our team helps you confirm eligibility and prepare your PMI application.` },
        { q: `How is the certification renewed?`, a: `PMI credentials are maintained on a three-year cycle by earning PDUs through continued learning and professional activity. We share a practical plan for keeping yours current.` },
      );
      break;
    case "prince2":
      out.push(
        { q: `Who awards PRINCE2 certification?`, a: `PRINCE2 is a globally recognised project-management method owned by PeopleCert (on behalf of AXELOS). The course is delivered by SimpliLEAD's experienced PRINCE2 practitioners.` },
        { q: `Is the exam included?`, a: `Yes. The course includes the official PRINCE2 exam(s) for this level, taken online with remote proctoring, plus the digital manual and practice papers.` },
        { q: `What is the exam format?`, a: `Foundation is multiple-choice; Practitioner is objective-testing (scenario-based, open book with the official manual). We run full mock exams so you know exactly what to expect.` },
        { q: `Does the certification expire?`, a: `PRINCE2 Foundation does not expire. Practitioner is kept current through PeopleCert's membership/renewal options, which we explain during the course.` },
      );
      break;
    case "itil":
      out.push(
        { q: `Who awards ITIL certification?`, a: `ITIL is the world's most widely adopted IT service management framework, awarded by PeopleCert (on behalf of AXELOS). SimpliLEAD's trainers are seasoned ITSM practitioners.` },
        { q: `Is the exam included?`, a: `Yes. The course fee includes the official ITIL Foundation exam, taken online with remote proctoring, along with the digital courseware and sample papers.` },
        { q: `What is the exam format?`, a: `The Foundation exam is 40 multiple-choice questions with a 65% pass mark, completed in 60 minutes. We cover every exam area and run practice tests before you sit it.` },
        { q: `Do I need prior experience?`, a: `No prior ITSM experience is required for Foundation. A general awareness of IT services is helpful but the trainer builds up from first principles.` },
      );
      break;
    case "icagile":
      out.push(
        { q: `Who awards this certification?`, a: `The certification is issued by ICAgile (International Consortium for Agile). The course is delivered by SimpliLEAD's ICAgile-authorised instructors.` },
        { q: `Is there an exam?`, a: `No. ICAgile certifications are earned through full attendance and active participation in the ${durationPhrase(c.durationLabel)} of learning — there is no separate exam to sit.` },
        { q: `Does the certification expire?`, a: `No. ICAgile certifications do not expire and require no renewal fees, so the credential remains valid once you've earned it.` },
        { q: `How does this fit the ICAgile learning roadmap?`, a: `It sits on ICAgile's learning tracks and can be combined with related certifications to progress toward expert-level designations. We'll help you plan the next step.` },
      );
      break;
    case "iiba":
      out.push(
        { q: `Who awards this certification?`, a: `The credential is awarded by the International Institute of Business Analysis (IIBA), aligned to the BABOK® Guide. SimpliLEAD provides the training and exam preparation.` },
        { q: `Does this course provide Professional Development / contact hours?`, a: `Yes. The training supplies the professional development hours IIBA requires toward eligibility, confirmed by a certificate of completion.` },
        { q: `Is the exam fee included?`, a: `The IIBA exam is scheduled and paid directly with IIBA. Your course covers the full BABOK-aligned syllabus, practice questions, and exam technique so you're ready to pass.` },
        { q: `What are the eligibility requirements?`, a: `They differ by level (ECBA, CCBA, CBAP) based on business-analysis experience and training hours. Our team helps you pick the right level and prepare your application.` },
      );
      break;
    case "six-sigma":
      out.push(
        { q: `Who recognises this Six Sigma certification?`, a: `The belt certification follows the globally accepted Lean Six Sigma body of knowledge and is recognised across manufacturing, IT, healthcare, and services. The course is delivered by SimpliLEAD's certified Master Black Belt practitioners.` },
        { q: `Is the certification exam included?`, a: `Yes. The course includes the certification assessment for this belt level, taken online, along with templates, datasets, and practice questions.` },
        { q: `Do I need a lower belt first?`, a: `Not necessarily — Yellow and Green Belt have no strict prerequisite. Black Belt candidates benefit from prior Green Belt knowledge or project experience, which the trainer accounts for.` },
        { q: `Will I work on a real project?`, a: `Yes. You apply DMAIC to hands-on case studies and datasets so you leave able to run improvement projects, not just pass a test.` },
      );
      break;
    case "devops-institute":
      out.push(
        { q: `Who awards this certification?`, a: `The credential is issued by PeopleCert DevOps Institute, a leading authority on DevOps and continuous-delivery certifications. SimpliLEAD's trainers are practising DevOps engineers.` },
        { q: `Is the exam included?`, a: `Yes. The course fee includes the official certification exam, taken online with remote proctoring, plus the digital courseware and sample papers.` },
        { q: `What is the exam format?`, a: `It is a multiple-choice exam taken after the ${durationPhrase(c.durationLabel)} of training. We run practice tests covering every exam objective before you sit it.` },
        { q: `Do I need hands-on DevOps experience?`, a: `No. The foundation-level content is accessible to anyone in software delivery; practical familiarity helps but the trainer builds concepts from the ground up.` },
      );
      break;
    case "aws":
      out.push(
        awardingBodyFaq()!,
        { q: `Is the AWS exam fee included?`, a: `The official AWS certification exam is booked and paid directly with AWS through Pearson VUE. Your course delivers full exam preparation — hands-on labs, practice questions, and exam strategy.` },
        { q: `What is the exam format?`, a: `AWS exams are multiple-choice and multiple-response, taken online or at a test centre. We map every exam domain to hands-on practice so you're confident on exam day.` },
        { q: `Do I get hands-on AWS practice?`, a: `Yes. The course is lab-driven — you work directly in the AWS console and CLI on realistic scenarios rather than only watching demos.` },
      );
      break;
    case "microsoft":
      out.push(
        awardingBodyFaq()!,
        { q: `Is the Microsoft exam fee included?`, a: `The official Microsoft certification exam is scheduled and paid directly with Microsoft through Pearson VUE. Your course provides complete preparation with hands-on labs and practice questions.` },
        { q: `What is the exam format?`, a: `Microsoft role-based exams mix multiple-choice, case studies, and scenario questions, taken online or at a test centre. We cover each skill area measured on the exam.` },
        { q: `Do I get hands-on Azure practice?`, a: `Yes. You work in the Azure portal and with the tooling throughout, so you build practical skills alongside exam readiness.` },
      );
      break;
    case "iso":
      out.push(
        { q: `Who awards this certification?`, a: `The Lead Implementer credential is issued through PECB against the ISO/IEC standard. SimpliLEAD's trainers are certified implementers.` },
        { q: `Is the exam included?`, a: `Yes. The course includes the certification exam, taken online, along with the implementation toolkit and practice questions.` },
        { q: `What is the exam format?`, a: `It is a scenario-based exam that tests your ability to plan and run a management-system implementation. We work through realistic case studies to prepare you.` },
        { q: `Who should take this course?`, a: `It suits managers, consultants, and practitioners responsible for implementing or auditing the standard within their organisation.` },
      );
      break;
    case "cissp":
      out.push(
        awardingBodyFaq()!,
        { q: `Is the CISSP exam fee included?`, a: `The official CISSP exam is booked and paid directly with ISC2 through Pearson VUE. Your course delivers full coverage of all eight CISSP domains with practice questions and exam strategy.` },
        { q: `What are the requirements to be certified?`, a: `CISSP requires passing the exam plus five years of cumulative paid work experience across the security domains. We explain the endorsement process and how to count your experience.` },
        { q: `What is the exam format?`, a: `CISSP uses computerised adaptive testing (CAT) with multiple-choice and advanced item types. Our sessions cover every domain weighted as it appears on the exam.` },
      );
      break;
    case "pci":
      out.push(
        { q: `What does this PCI DSS course cover?`, a: `It covers the Payment Card Industry Data Security Standard — the twelve requirements, scoping, compliance validation, and how to protect cardholder data. SimpliLEAD's trainers are practising security professionals.` },
        { q: `Who should attend?`, a: `It suits security, compliance, and IT professionals responsible for handling payment-card data or preparing their organisation for a PCI DSS assessment.` },
        { q: `Do I receive a certificate?`, a: `Yes. You receive a SimpliLEAD certificate of completion confirming your PCI DSS training, which supports internal compliance and audit readiness.` },
      );
      break;
    case "gen-ai":
      out.push(
        { q: `Is this course hands-on?`, a: `Yes. It's built around practical exercises — you work with real AI tools, prompts, and workflows rather than only theory, and leave with artifacts you can reuse at work.` },
        { q: `Do I need to know how to code?`, a: `${/\b(engineering|developer|software|sdlc|architect|django|python)\b/.test(`${c.slug} ${c.title}`.toLowerCase()) ? "Comfort with basic programming helps, as parts of the course are technical, but we introduce the tooling step by step." : "No. The course focuses on applying AI tools and techniques effectively; no programming background is required."}` },
        { q: `What do I get on completion?`, a: `You receive a SimpliLEAD certificate of completion and a set of practical templates, prompts, and reference material to apply immediately in your role.` },
        { q: `Will the skills stay relevant as tools change?`, a: `Yes. We teach durable patterns — how to direct AI systems, evaluate output, and design workflows — so the skills transfer across whichever models and tools your team adopts.` },
      );
      break;
    case "tech":
      out.push(
        { q: `Is this a hands-on, practical course?`, a: `Yes. You build working examples throughout with guided coding exercises and a project, so you leave able to apply the skills on real work, not just recall concepts.` },
        { q: `Do I need a technical background?`, a: `Basic programming familiarity helps for the technical modules, but the trainer covers the fundamentals first and builds up to advanced topics, so motivated beginners can keep pace.` },
        { q: `What do I receive on completion?`, a: `You receive a SimpliLEAD certificate of completion plus the exercise code and reference material to keep building on after the course.` },
        { q: `Do you offer support after the sessions?`, a: `Yes. You get access to session recordings and post-class support to help you apply what you learned and clear any doubts.` },
      );
      break;
    case "business":
      out.push(
        { q: `What will I be able to do after this course?`, a: `You'll leave with practical, immediately usable techniques and frameworks for ${n.toLowerCase().replace(/ training| course/g, "")}, practised through real-world scenarios and role-plays rather than theory alone.` },
        { q: `Is this course interactive?`, a: `Yes. It runs as live, facilitated sessions with discussions, exercises, and case studies so you practise the skills, not just learn about them.` },
        { q: `Do I receive a certificate?`, a: `Yes. You receive a SimpliLEAD certificate of completion recognising the professional-development hours you've earned.` },
      );
      break;
    case "microcredential":
      out.push(
        { q: `What is a micro-credential?`, a: `A micro-credential is a focused, short-format certification that validates a specific, job-ready skill. It's a fast, practical way to prove capability in ${n.toLowerCase().replace(/ microcredential| micro-credential| course| training/gi, "")}.` },
        { q: `Is there an exam?`, a: `There's no heavy exam — the credential is earned through participation and applied exercises across the ${durationPhrase(c.durationLabel)} of learning, and you receive a shareable digital badge/certificate.` },
        { q: `How long does it take?`, a: `It's designed to be completed in ${durationPhrase(c.durationLabel)}, so you can build and prove a targeted skill without a lengthy time commitment.` },
        { q: `Does it expire?`, a: `No. The credential doesn't expire, and it stacks well with related courses to build a broader, recognised skill profile.` },
      );
      break;
    default:
      out.push(
        { q: `Do I receive a certificate for ${n}?`, a: `Yes. You receive a SimpliLEAD certificate of completion recognising the skills and professional-development hours you've earned.` },
        { q: `Is this course practical or theory-heavy?`, a: `It's practical and applied — the trainer uses real-world examples and exercises so you can put the skills to work straight after the course.` },
      );
  }
  return out.filter(Boolean);
}

function dedupe(faqs: FaqItem[]): FaqItem[] {
  const seen = new Set<string>();
  return faqs.filter((f) => {
    const k = f.q.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Build a full FAQ set (family + universal), deduped, for one course.
 * With `location`, every section is localized (StarAgile-style density):
 * base/tail FAQs use location-native templates with rotated keyword variants,
 * family FAQs get the location appended to questions/answers, and
 * location-only FAQs (offered-in, recognised-in, weekend batches, other
 * cities) are inserted after the opening questions.
 */
export function buildCourseFaqs(c: CourseLike, opts?: GeoFaqOptions): FaqItem[] {
  const fam = detectFamily(c);
  const rawLoc = opts?.location?.trim() || undefined;
  const loc = rawLoc ? locDisplay(rawLoc) : undefined;
  let family = familyFaqs(c, fam);
  if (loc) {
    const { pool } = courseKeywords(c);
    family = family.map((f, i) => ({ q: locQ(f.q, loc), a: locA(f.a, loc, rot(pool, i), i) }));
  }
  const geo = loc ? geoFaqs(c, loc, opts?.siblingCities) : [];
  const base = baseFaqs(c, loc);
  // Geo block right after the opening delivery/online questions, so location
  // keywords appear high in the section (and in the JSON-LD) without
  // displacing the core answers.
  return dedupe([...base.slice(0, 2), ...geo, ...base.slice(2), ...family, ...tailFaqs(c, loc)]);
}

// Courses whose FAQs are hand-authored in seed-data; localization appends the
// geo block instead of regenerating their prose.
let handAuthored: Set<string> | null = null;
function isHandAuthored(slug: string): boolean {
  handAuthored ??= new Set(SEED_COURSES.filter((x) => (x.faqs?.length ?? 0) > 0).map((x) => x.slug));
  return handAuthored.has(slug);
}

/**
 * Localize a course's FAQs for a city/country variant page. Stored FAQs stay
 * location-neutral; pages call this at render time with the resolved location
 * so questions carry dynamic GEO keywords (the same set feeds the FAQ
 * JSON-LD). Generated courses are re-generated with full localization;
 * hand-authored courses keep their prose and gain the location-only block.
 * No-op without a location.
 */
export function localizeCourseFaqs(course: CourseLike & { faqs: FaqItem[] }, opts: GeoFaqOptions): FaqItem[] {
  const loc = opts.location?.trim();
  if (!loc) return course.faqs;
  if (isHandAuthored(course.slug)) {
    const faqs = course.faqs ?? [];
    return dedupe([...faqs.slice(0, 2), ...geoFaqs(course, locDisplay(loc), opts.siblingCities), ...faqs.slice(2)]);
  }
  return buildCourseFaqs(course, opts);
}
