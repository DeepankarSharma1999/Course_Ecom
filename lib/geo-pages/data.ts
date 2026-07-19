// File-based data layer for the programmatic geo landing pages (/{course}/{country}/{city}).
// Distinct from the legacy DB-driven geo variants (lib/content.ts getCountries/getCities),
// which stay noindex. This layer is the only source of truth for the new pages.
import fs from "fs";
import path from "path";

// Which courses get geo landing pages. Add a slug here + nothing else.
export const GEO_COURSES = ["pmp-certification-training", "csm-certification-training"] as const;

export type BatchDate = { startDate: string; endDate: string; days: string };
export type BatchTrack = {
  id: string;
  tz: string;        // IANA home timezone of the track
  label: string;     // human tz label shown next to home times, e.g. "IST"
  start: string;     // "09:00" wall time in tz
  end: string;       // "18:00"
  batches: BatchDate[];
};

export type SalaryEntry = { role: string; amount: string; source: string; sourceUrl: string; sourceDate: string };
export type GeoFaq = { q: string; a: string };

export type GeoCountry = {
  name: string;
  iso: string;           // lowercase, doubles as URL slug
  currency: string;
  priceDisplay: string;  // display string, e.g. "₹45,000" — TODO until supplied
  examCost: { member: string; nonMember: string; source: string };
  salaryCountry: SalaryEntry[];
  intro: string;
  faq: GeoFaq[];
  cities: string[];      // city slugs
  releaseWeek: number;
};

export type GeoCity = {
  name: string;
  slug: string;
  country: string;       // iso
  timezone: string;      // IANA
  salary: SalaryEntry[];
  employers: string[];
  industries: string;
  intro: string;
  faq: GeoFaq[];
  meta: { title: string; description: string };
  releaseWeek: number;
};

const ROOT = path.join(process.cwd(), "data", "geo");

// ponytail: module-level cache — geo data only changes with a deploy/rebuild.
let _tracks: BatchTrack[] | null = null;
let _countries: GeoCountry[] | null = null;
let _cities: GeoCity[] | null = null;

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf8")) as T;
}

export function getBatchTracks(): BatchTrack[] {
  return (_tracks ??= readJson<BatchTrack[]>(path.join(ROOT, "batch-tracks.json")));
}

export function getGeoCountries(): GeoCountry[] {
  if (!_countries) {
    const dir = path.join(ROOT, "countries");
    _countries = fs.readdirSync(dir).filter((f) => f.endsWith(".json"))
      .map((f) => readJson<GeoCountry>(path.join(dir, f)));
  }
  return _countries;
}

export function getGeoCities(): GeoCity[] {
  if (!_cities) {
    const dir = path.join(ROOT, "cities");
    _cities = fs.readdirSync(dir).flatMap((country) => {
      const cdir = path.join(dir, country);
      if (!fs.statSync(cdir).isDirectory()) return [];
      return fs.readdirSync(cdir).filter((f) => f.endsWith(".json"))
        .map((f) => ({ ...readJson<Omit<GeoCity, "country">>(path.join(cdir, f)), country }));
    });
  }
  return _cities;
}

export function getGeoCountry(iso: string): GeoCountry | undefined {
  return getGeoCountries().find((c) => c.iso === iso);
}

export function getGeoCity(countryIso: string, slug: string): GeoCity | undefined {
  return getGeoCities().find((c) => c.country === countryIso && c.slug === slug);
}

export function isGeoCourse(slug: string): boolean {
  return (GEO_COURSES as readonly string[]).includes(slug);
}
