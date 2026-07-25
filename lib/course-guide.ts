// Builds the /info/<course-slug> certification guide from course data plus
// verified certification-body facts (cert-facts.ts). Every section derives
// from course-specific data so the ~200 generated pages stay substantively
// unique. Question-form H2s target long-tail queries and AI-answer citation.

import type { CourseContent, CurriculumModule, FaqItem } from "./seed-data";
import { detectFamily, buildCourseFaqs, type Family } from "./course-faqs";
import { certFactsFor, awardingBody, type CertFacts } from "./cert-facts";
import { baseCourseTitle } from "./utils";

export type GuideSection = {
  id: string;
  heading: string;
  /** Rich course description that already contains HTML markup. */
  html?: string;
  paragraphs?: string[];
  bullets?: string[];
  modules?: CurriculumModule[];
  facts?: { label: string; value: string }[];
};

export type CourseGuide = {
  slug: string;
  courseSlug: string;
  name: string; // base course title, no brand
  title: string; // <title> without brand suffix
  description: string; // meta description
  family: Family;
  body: string; // awarding body display name
  sections: GuideSection[];
  faqs: FaqItem[];
};

// List rows from getAllCourses carry empty outcomes/curriculum (LIST_SELECT
// egress optimization), so listing contexts (sitemap, static params, related
// guides) can only gate on category. The content gate below runs on the full
// row in the guide page itself.
export function isGuideListed(c: Pick<CourseContent, "category">): boolean {
  return c.category.slug !== "combo-courses";
}

export function isGuideEligible(c: CourseContent): boolean {
  if (!isGuideListed(c)) return false;
  // Publish gate: a guide needs real substance beyond the template.
  return (c.learningOutcomes?.length ?? 0) > 0 || (c.curriculum?.length ?? 0) > 0;
}

const sentence = (s: string) => (/[.!?]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`);

function examSection(c: CourseContent, name: string, facts: CertFacts | null): GuideSection | null {
  if (!facts?.exam) {
    if (!c.examIncluded) return null;
    return {
      id: "exam",
      heading: `How do you get certified after the ${name} course?`,
      paragraphs: [
        `${name} is assessed through the course itself: complete the live sessions and the included assessment to earn your certificate. There is no separate third-party exam to book.`,
      ],
    };
  }
  const e = facts.exam;
  const rows: { label: string; value: string }[] = [];
  if (e.questions) rows.push({ label: "Questions", value: e.questions });
  if (e.duration) rows.push({ label: "Duration", value: e.duration });
  if (e.passMark) rows.push({ label: "Pass mark", value: e.passMark });
  if (e.format) rows.push({ label: "Format", value: e.format });
  if (e.delivery) rows.push({ label: "Delivery", value: e.delivery });
  if (facts.validity) rows.push({ label: "Certification validity", value: facts.validity });
  if (facts.renewal) rows.push({ label: "Renewal", value: facts.renewal });
  return {
    id: "exam",
    heading: facts.noExam ? `How do you get certified after the ${name} course?` : `What is the ${name} exam format?`,
    paragraphs: [
      facts.noExam
        ? `The credential is awarded by ${facts.body} on completion of the accredited course — there is no separate exam to book, and certification is included with this course.`
        : `The credential is awarded by ${facts.body}.${c.examIncluded ? " The exam fee is included with this course." : ""}`,
      ...(facts.note ? [facts.note] : []),
    ],
    facts: rows,
  };
}

export function buildCourseGuide(c: CourseContent): CourseGuide {
  const family = detectFamily(c);
  const facts = certFactsFor(family);
  const name = baseCourseTitle(c.title);
  const body = awardingBody(family, c.accreditedBy);

  const sections: GuideSection[] = [];

  // "2 Days | Live Classes" → "2 days" for prose interpolation.
  const duration = c.durationLabel.split("|")[0].trim().toLowerCase();
  const desc = c.description || c.summary;
  const descIsHtml = /<\w+[^>]*>/.test(desc);

  sections.push({
    id: "overview",
    heading: `What is the ${name} course?`,
    // Embedded h2s would compete with the guide's own question H2s — demote to h3.
    ...(descIsHtml ? { html: desc.replace(/<(\/?)h2([^>]*)>/g, "<$1h3$2>") } : {}),
    paragraphs: [
      ...(descIsHtml ? [] : [sentence(desc)]),
      `The programme runs for ${duration} of live, instructor-led training${facts ? ` and leads to a credential awarded by ${facts.body}` : ""}. ${
        facts?.noExam
          ? "Certification is awarded on course completion — there is no separate exam."
          : c.examIncluded
            ? "The certification exam fee is included in the course price."
            : "Certification assessment details are covered below."
      }`,
    ],
  });

  if (c.whoShouldAttend?.length) {
    sections.push({
      id: "who-should-attend",
      heading: `Who should take the ${name} course?`,
      paragraphs: [`${name} training is designed for professionals who want to apply it in their current or next role, including:`],
      bullets: c.whoShouldAttend,
    });
  }

  if (c.prerequisites?.length) {
    sections.push({
      id: "prerequisites",
      heading: `What are the prerequisites for ${name}?`,
      bullets: c.prerequisites,
    });
  }

  if (c.learningOutcomes?.length) {
    sections.push({
      id: "learning-outcomes",
      heading: `What will you learn in the ${name} course?`,
      paragraphs: [`By the end of the training you will be able to:`],
      bullets: c.learningOutcomes,
    });
  }

  if (c.curriculum?.length) {
    sections.push({
      id: "syllabus",
      heading: `What is the ${name} syllabus?`,
      paragraphs: [`The curriculum is delivered over ${duration} and covers ${c.curriculum.length} modules:`],
      modules: c.curriculum,
    });
  }

  const exam = examSection(c, name, facts);
  if (exam) sections.push(exam);

  sections.push({
    id: "cost",
    heading: `How much does the ${name} course cost?`,
    paragraphs: [
      `${name} training with SimpliLEAD costs ₹${c.basePriceInr.toLocaleString("en-IN")} (US$${c.basePriceUsd.toLocaleString("en-US")})${
        c.examIncluded ? ", inclusive of the certification exam fee" : ""
      }. Pricing covers ${duration} of live training, courseware and post-class support. Check the course page for current schedules, offers and local-currency pricing.`,
    ],
  });

  // FAQs: stored ones if present, else the family-aware generated set.
  const faqs = c.faqs?.length ? c.faqs : buildCourseFaqs(c);

  return {
    slug: c.slug,
    courseSlug: c.slug,
    name,
    title: `${name} Guide: Syllabus, Eligibility, Exam & Cost`,
    description: `Complete ${name} guide — who should attend, prerequisites, syllabus, ${facts?.exam ? "exam format, pass mark, " : ""}certification cost and renewal. Updated ${new Date().getFullYear()}.`,
    family,
    body,
    sections,
    faqs,
  };
}
