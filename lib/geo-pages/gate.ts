// Publishing gate for geo pages. A page is indexable ONLY when it passes every
// check here AND its releaseWeek has been reached. Everything else renders as a
// noindex draft. Shared by the pages, the sitemap, and scripts/validate-geo.ts.
import { z } from "zod";
import { getBatchTracks, getGeoCities, getGeoCountries, type GeoCity, type GeoCountry } from "./data";
import { fitCheck } from "./timezone";

export const hasTodo = (v: unknown): boolean =>
  typeof v === "string" ? v.includes("TODO") :
  Array.isArray(v) ? v.some(hasTodo) :
  v && typeof v === "object" ? Object.values(v).some(hasTodo) : false;

const salarySchema = z.object({
  role: z.string().min(1),
  amount: z.string().min(1),
  source: z.string().min(1),
  sourceUrl: z.string(),
  sourceDate: z.string(),
});
const faqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

export const countrySchema = z.object({
  name: z.string().min(1),
  iso: z.string().length(2),
  currency: z.string().min(3),
  priceDisplay: z.string().min(1),
  examCost: z.object({ member: z.string(), nonMember: z.string(), source: z.string() }),
  salaryCountry: z.array(salarySchema),
  intro: z.string().min(1),
  faq: z.array(faqSchema),
  cities: z.array(z.string()),
  releaseWeek: z.number().int().min(0),
});

export const citySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  timezone: z.string().min(1),
  salary: z.array(salarySchema),
  employers: z.array(z.string()),
  industries: z.string(),
  intro: z.string().min(1),
  faq: z.array(faqSchema),
  meta: z.object({ title: z.string(), description: z.string() }),
  releaseWeek: z.number().int().min(0),
});

export const RELEASE_WEEK = Number(process.env.RELEASE_WEEK ?? 0);

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

// Word-trigram Jaccard similarity — cheap duplicate-intro detector.
function trigrams(s: string): Set<string> {
  const w = s.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + 2 < w.length; i++) out.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`);
  return out;
}
export function introSimilarity(a: string, b: string): number {
  const A = trigrams(a), B = trigrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

function salaryFresh(entries: { sourceUrl: string; sourceDate: string }[]): boolean {
  const cutoff = Date.now() - 365 * 24 * 3600 * 1000;
  return entries.length > 0 && entries.every((s) =>
    /^https?:\/\//.test(s.sourceUrl) && !isNaN(Date.parse(s.sourceDate)) && Date.parse(s.sourceDate) >= cutoff);
}

export type GateResult = { indexable: boolean; released: boolean; reasons: string[] };

// Content-complete (ignores releaseWeek). `indexable` = complete AND released.
export function cityGate(city: GeoCity, country: GeoCountry): GateResult {
  const reasons: string[] = [];
  if (hasTodo(city)) reasons.push("TODO values remain in city file");
  if (hasTodo(country.priceDisplay) || hasTodo(country.examCost)) reasons.push("country pricing still TODO");
  const fit = fitCheck(getBatchTracks(), city.timezone);
  if (fit.status !== "fit") reasons.push(`off-hours (local ${fit.session.localLabel})`);
  if (!salaryFresh(city.salary)) reasons.push("salary entries missing, without sourceUrl, or sourceDate older than 12 months");
  const wc = wordCount(city.intro);
  if (wc < 120 || wc > 180) reasons.push(`intro is ${wc} words (need 120–180)`);
  if (city.faq.length < 4) reasons.push(`only ${city.faq.length} FAQs (need >=4)`);
  // Duplicate-intro check against every other non-TODO city intro.
  if (!hasTodo(city.intro)) {
    for (const other of getGeoCities()) {
      if (other === city || (other.slug === city.slug && other.country === city.country) || hasTodo(other.intro)) continue;
      const sim = introSimilarity(city.intro, other.intro);
      if (sim > 0.6) reasons.push(`intro ${Math.round(sim * 100)}% similar to ${other.country}/${other.slug}`);
    }
  }
  const released = city.releaseWeek <= RELEASE_WEEK;
  if (!released) reasons.push(`releaseWeek ${city.releaseWeek} > RELEASE_WEEK ${RELEASE_WEEK}`);
  return { indexable: reasons.length === 0, released, reasons };
}

// Country hub: same bar minus city-specific fields (fit check, meta, employers).
export function countryGate(country: GeoCountry): GateResult {
  const reasons: string[] = [];
  if (hasTodo(country.priceDisplay) || hasTodo(country.examCost)) reasons.push("pricing still TODO");
  if (hasTodo(country.intro)) reasons.push("intro still TODO");
  if (hasTodo(country.salaryCountry) || !salaryFresh(country.salaryCountry))
    reasons.push("salary entries missing, TODO, without sourceUrl, or sourceDate older than 12 months");
  const wc = wordCount(country.intro);
  if (wc < 120 || wc > 180) reasons.push(`intro is ${wc} words (need 120–180)`);
  if (hasTodo(country.faq) || country.faq.length < 1) reasons.push("FAQs missing or TODO");
  const released = country.releaseWeek <= RELEASE_WEEK;
  if (!released) reasons.push(`releaseWeek ${country.releaseWeek} > RELEASE_WEEK ${RELEASE_WEEK}`);
  return { indexable: reasons.length === 0, released, reasons };
}

export function isCityIndexable(countryIso: string, citySlug: string): boolean {
  const country = getGeoCountries().find((c) => c.iso === countryIso);
  const city = getGeoCities().find((c) => c.country === countryIso && c.slug === citySlug);
  if (!country || !city) return false;
  return cityGate(city, country).indexable;
}

export function isCountryIndexable(countryIso: string): boolean {
  const country = getGeoCountries().find((c) => c.iso === countryIso);
  return !!country && countryGate(country).indexable;
}
