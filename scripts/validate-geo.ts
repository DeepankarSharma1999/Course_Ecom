// Geo publishing-gate validator. `npm run validate:geo` for the report;
// `--ci` (run inside `npm run build`) exits 1 on structural errors or
// duplicate non-TODO intros, but NOT on drafts (TODO content is expected).
import { getBatchTracks, getGeoCities, getGeoCountries } from "../lib/geo-pages/data";
import { cityGate, countryGate, citySchema, countrySchema, hasTodo, introSimilarity, RELEASE_WEEK } from "../lib/geo-pages/gate";

const ci = process.argv.includes("--ci");
let hardErrors = 0;

// 1. Structural validation (zod) — malformed files always fail.
for (const c of getGeoCountries()) {
  const r = countrySchema.safeParse(c);
  if (!r.success) { hardErrors++; console.error(`✗ countries/${c.iso}.json: ${r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`); }
}
for (const c of getGeoCities()) {
  const r = citySchema.safeParse(c);
  if (!r.success) { hardErrors++; console.error(`✗ cities/${c.country}/${c.slug}.json: ${r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`); }
}
// Every city listed by a country must have a file, and vice versa.
const cityKeys = new Set(getGeoCities().map((c) => `${c.country}/${c.slug}`));
for (const co of getGeoCountries()) for (const s of co.cities) {
  if (!cityKeys.has(`${co.iso}/${s}`)) { hardErrors++; console.error(`✗ countries/${co.iso}.json lists city "${s}" with no cities/${co.iso}/${s}.json`); }
}

// 2. Duplicate intros among FILLED cities fail the build (>60% trigram overlap).
const filled = getGeoCities().filter((c) => !hasTodo(c.intro));
for (let i = 0; i < filled.length; i++) for (let j = i + 1; j < filled.length; j++) {
  const sim = introSimilarity(filled[i].intro, filled[j].intro);
  if (sim > 0.6) { hardErrors++; console.error(`✗ intros ${Math.round(sim * 100)}% similar: ${filled[i].country}/${filled[i].slug} vs ${filled[j].country}/${filled[j].slug}`); }
}

// 3. Gate report.
console.log(`\nRELEASE_WEEK=${RELEASE_WEEK} — tracks: ${getBatchTracks().map((t) => t.id).join(", ")}\n`);
let indexable = 0;
for (const co of getGeoCountries()) {
  const g = countryGate(co);
  if (g.indexable) { indexable++; console.log(`✓ INDEXABLE  country ${co.iso}`); }
  else if (!ci) console.log(`· draft      country ${co.iso}: ${g.reasons.join(" | ")}`);
  for (const s of co.cities) {
    const city = getGeoCities().find((c) => c.country === co.iso && c.slug === s);
    if (!city) continue;
    const cg = cityGate(city, co);
    if (cg.indexable) { indexable++; console.log(`✓ INDEXABLE  city    ${co.iso}/${s}`); }
    else if (!ci) console.log(`· draft      city    ${co.iso}/${s}: ${cg.reasons.join(" | ")}`);
  }
}
console.log(`\n${indexable} indexable page-location(s), ${getGeoCountries().length} countries, ${getGeoCities().length} cities.`);

if (hardErrors) { console.error(`\n${hardErrors} hard error(s).`); process.exit(1); }
