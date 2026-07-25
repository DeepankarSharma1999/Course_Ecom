// Course-level deep content for the geo pages (exam guide, skills, roles,
// benefits, city guide…). Written ONCE per course in data/geo/courses/{slug}.json
// and rendered on every hub/city page with {slot} placeholders filled from the
// page's country/city data — mirroring how StarAgile/KnowledgeHut reuse course
// copy across their city pages while the localized sections stay unique.
import fs from "fs";
import path from "path";

export type GuideSection = { h: string; p: string[] };
export type TitledItem = { title: string; body: string };
export type VsRow = { aspect: string; a: string; b: string };

export type GeoCourseContent = {
  slug: string;
  fullName: string;        // "Project Management Professional"
  acr: string;             // "PMP"
  certBody: string;        // "Project Management Institute (PMI)"
  certBodyUrl: string;
  // Real partnership claim already published in the site footer/accreditation
  // page — surfaced as a hero trust badge. Never invent one here.
  partnerBadge?: string;
  skills: string[];
  roles: TitledItem[];
  benefits: TitledItem[];
  whoShouldAttend: string[];
  prerequisites: string[];
  whyUs: TitledItem[];
  examGuide: GuideSection[];   // course-level exam & certification guide
  examFaqs: { q: string; a: string }[]; // course-level exam FAQ block (StarAgile's 2nd FAQ section)
  cityGuide: GuideSection[];   // Sprintzeal-style H2 question sections, {city} slots
  vs: { title: string; intro: string; aLabel: string; bLabel: string; rows: VsRow[] };
};

const DIR = path.join(process.cwd(), "data", "geo", "courses");
const cache = new Map<string, GeoCourseContent | null>();

export function getGeoCourseContent(slug: string): GeoCourseContent | null {
  if (!cache.has(slug)) {
    const p = path.join(DIR, `${slug}.json`);
    cache.set(slug, fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as GeoCourseContent) : null);
  }
  return cache.get(slug)!;
}

export type SlotValues = {
  city?: string;       // falls back to country name on hub pages
  country: string;
  price?: string;      // "US$1,295"
  days?: string;       // "2"
  examMember?: string;
  examNonMember?: string;
  acr?: string;        // filled in by the rendering component from course content
  fullName?: string;
};

// Fill {city}/{country}/{price}/… placeholders. Unresolved money slots keep the
// sentence honest by degrading to the country-agnostic phrasing check below.
export function fillSlots(s: string, v: SlotValues): string {
  return s
    .replaceAll("{acr}", v.acr ?? "")
    .replaceAll("{fullName}", v.fullName ?? "")
    .replaceAll("{city}", v.city ?? v.country)
    .replaceAll("{country}", v.country)
    .replaceAll("{price}", v.price ?? "the listed course fee")
    .replaceAll("{days}", v.days ?? "2")
    .replaceAll("{examMember}", v.examMember ?? "the member rate")
    .replaceAll("{examNonMember}", v.examNonMember ?? "the non-member rate");
}
