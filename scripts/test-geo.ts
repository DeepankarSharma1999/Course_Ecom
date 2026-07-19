// Self-check for the timezone engine + fit check (npm run test:geo).
// Assert-based, no framework — fails loudly if the conversion logic breaks.
import assert from "assert";
import { getBatchTracks, type BatchTrack } from "../lib/geo-pages/data";
import { convertSession, fitCheck, zonedToUtc, sessionFits } from "../lib/geo-pages/timezone";

const tracks = getBatchTracks();
const asia = tracks.find((t) => t.id === "asia")!;
assert(asia, "asia track exists");

// 09:00 IST on 2026-08-01 is 03:30 UTC.
assert.strictEqual(zonedToUtc("2026-08-01", "09:00", "Asia/Kolkata").toISOString(), "2026-08-01T03:30:00.000Z");

// --- pure conversion math (independent of how many tracks exist) ---
const b0 = asia.batches[0];
// IST 09:00–18:00 -> Singapore (+2:30): 11:30–20:30, fits 07:00–22:00.
const sg = convertSession(asia, b0, "Asia/Singapore");
assert.strictEqual(sg.localLabel, "11:30 AM – 08:30 PM SGT");
assert(sessionFits(sg), "Singapore should fit the asia track");

// IST 09:00–18:00 -> Chicago: overnight, crosses midnight, must NOT fit.
const dalOnAsia = convertSession(asia, b0, "America/Chicago");
assert(dalOnAsia.crossesMidnight, "IST session lands overnight in Chicago");
assert(!sessionFits(dalOnAsia), "Chicago should not fit the asia track");

// --- fitCheck with a SINGLE asia track: Singapore fit, Dallas off-hours ---
const asiaOnly: BatchTrack[] = [asia];
assert.strictEqual(fitCheck(asiaOnly, "Asia/Singapore").status, "fit");
assert.strictEqual(fitCheck(asiaOnly, "America/Chicago").status, "off-hours");

// --- fitCheck with the full regional track set: every region now fits ---
const americas = tracks.find((t) => t.id === "americas");
const apac = tracks.find((t) => t.id === "apac");
const emea = tracks.find((t) => t.id === "emea");
assert(americas && apac && emea, "regional tracks exist");
for (const [tz, id] of [
  ["America/Chicago", "americas"], ["America/Los_Angeles", "americas"],
  ["Europe/London", "emea"], ["Asia/Riyadh", "emea"],
  ["Australia/Sydney", "apac"], ["Asia/Kolkata", "asia"],
] as const) {
  const f = fitCheck(tracks, tz);
  assert.strictEqual(f.status, "fit", `${tz} should fit with all tracks`);
  assert.strictEqual(f.track.id, id, `${tz} should pick the ${id} track`);
}

// Every rendered label carries a timezone token.
assert(/IST/.test(convertSession(asia, b0, "Asia/Kolkata").homeLabel));
assert(/[A-Z]{2,}|GMT/.test(dalOnAsia.localLabel), "local label must include a tz label");

console.log("test-geo: all assertions passed");
