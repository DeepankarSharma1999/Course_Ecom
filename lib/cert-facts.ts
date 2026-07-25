// Verified certification-body facts, keyed by the family detector in
// course-faqs.ts. Sources: official body sites (Scaled Agile support docs,
// Scrum Alliance, Scrum.org, PMI ECO 2026, PeopleCert, IIBA handbooks),
// verified July 2026. Facts we could not verify from an authoritative source
// are omitted rather than guessed — the guide simply skips that line.
//
// `body` also fixes the "Global Certification Body" placeholder in seed data
// at render time for guide pages.

import type { Family } from "./course-faqs";

export type CertFacts = {
  body: string;
  bodyShort: string;
  /** Certification awarded on course completion — no separate exam. */
  noExam?: true;
  exam?: {
    questions?: string;
    duration?: string;
    passMark?: string;
    format?: string;
    delivery?: string;
  };
  validity?: string;
  renewal?: string;
  note?: string;
};

export const CERT_FACTS: Partial<Record<Family, CertFacts>> = {
  "scrum-alliance": {
    body: "Scrum Alliance",
    bodyShort: "Scrum Alliance",
    exam: {
      questions: "50 multiple-choice and true/false questions (CSM level)",
      duration: "60 minutes",
      passMark: "74% (37 of 50 correct)",
      format: "Online, taken after completing the mandatory instructor-led course",
      delivery: "Two free attempts included within 90 days of the course",
    },
    validity: "2 years",
    renewal: "Earn 20 Scrum Education Units (SEUs) and pay a US$100 renewal fee every 2 years",
  },
  "scrum-org": {
    body: "Scrum.org",
    bodyShort: "Scrum.org",
    exam: {
      questions: "80 questions (multiple choice, multiple answer, true/false) at level I",
      duration: "60 minutes",
      passMark: "85%",
      format: "Online, open to anyone — no mandatory course attendance",
      delivery: "Password-based online assessment via Scrum.org",
    },
    validity: "Lifetime",
    renewal: "No renewal fees or continuing education required — Scrum.org certifications never expire",
  },
  safe: {
    body: "Scaled Agile",
    bodyShort: "Scaled Agile",
    exam: {
      questions: "45 multiple-choice and multiple-select questions (most SAFe 6.0 exams)",
      duration: "90 minutes",
      passMark: "Varies by exam (typically 73–80%)",
      format: "Scenario-based questions taken online via the SAFe Community Platform",
      delivery: "First attempt included with course registration (within 30 days of course completion)",
    },
    validity: "1 year",
    renewal: "US$295 annual renewal (varies by certification) via the SAFe Community Platform, plus continuing education",
  },
  pmi: {
    body: "Project Management Institute (PMI)",
    bodyShort: "PMI",
    exam: {
      questions: "180 questions (PMP) — multiple-choice, multiple-response, drag-and-drop and scenario-based",
      duration: "230 minutes with two 10-minute breaks (PMP)",
      format: "Based on the current PMI Examination Content Outline (updated July 2026, aligned to PMBOK Guide)",
      delivery: "Pearson VUE test centre or online proctored",
    },
    validity: "3 years",
    renewal: "Earn 60 PDUs per 3-year CCR cycle (minimum 35 Education PDUs) and pay the PMI renewal fee",
    note: "PMP eligibility: 4-year degree with 36 months of project experience, or secondary diploma with 60 months — plus 35 contact hours of project management education (this course fulfils the 35 hours).",
  },
  prince2: {
    body: "PeopleCert (on behalf of AXELOS)",
    bodyShort: "PeopleCert",
    exam: {
      questions: "Foundation: 60 multiple-choice questions. Practitioner: 70 objective-test questions",
      duration: "Foundation: 60 minutes (closed book). Practitioner: 150 minutes (open book — official PRINCE2 manual only)",
      passMark: "60% at both levels",
      delivery: "PeopleCert online proctored exam",
    },
    validity: "3 years",
    renewal: "Renew via CPD points with a PeopleCert Plus subscription, or retake the exam",
  },
  itil: {
    body: "PeopleCert (on behalf of AXELOS)",
    bodyShort: "PeopleCert",
    exam: {
      questions: "40 multiple-choice questions (ITIL 4 Foundation)",
      duration: "60 minutes, closed book",
      passMark: "65% (26 of 40 correct)",
      delivery: "PeopleCert online proctored exam",
    },
    validity: "3 years",
    renewal: "Renew via CPD points with a PeopleCert Plus subscription, or retake the exam",
  },
  icagile: {
    body: "ICAgile (International Consortium for Agile)",
    bodyShort: "ICAgile",
    noExam: true,
    exam: {
      format: "No exam — certification is awarded on active participation and completion of in-class assessments set by the accredited training provider",
    },
    validity: "Lifetime",
    renewal: "No renewal fees or continuing education requirements",
  },
  iiba: {
    body: "International Institute of Business Analysis (IIBA)",
    bodyShort: "IIBA",
    exam: {
      questions: "CBAP: 120 case-study and scenario-based questions. CCBA: 130 questions. ECBA: 50 questions",
      duration: "CBAP: 3.5 hours. CCBA: 3 hours. ECBA: 1 hour",
      format: "Based on the BABOK Guide v3",
      delivery: "Online proctored via PSI or at a PSI test centre",
    },
    validity: "3 years (ECBA does not expire)",
    renewal: "CBAP/CCBA: earn 60 CDUs per 3-year cycle",
    note: "CBAP requires 7,500 hours of business analysis work experience in the last 10 years; CCBA requires 3,750 hours. Both require 35 hours of professional development (this course contributes).",
  },
  "six-sigma": {
    body: "Accredited Six Sigma certification body",
    bodyShort: "Six Sigma",
    exam: {
      format: "Exam format varies by belt level and certifying body (IASSC/ASQ-aligned curricula)",
    },
  },
  // ponytail: remaining families (gen-ai, microcredential, tech, business, generic)
  // are in-house/vendor programmes with no external exam body — the guide's exam
  // section falls back to course-completion wording for these.
};

export function certFactsFor(family: Family): CertFacts | null {
  return CERT_FACTS[family] ?? null;
}

/** Render-time fix for the uniform "Global Certification Body" placeholder. */
export function awardingBody(family: Family, fallback: string): string {
  const f = CERT_FACTS[family];
  if (f) return f.body;
  return fallback === "Global Certification Body" ? "SimpliLEAD (course completion certificate)" : fallback;
}
