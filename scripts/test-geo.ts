// Self-check for the timezone engine + fit check (npm run test:geo).
// Assert-based, no framework — fails loudly if the conversion logic breaks.
import assert from "assert";
import { getBatchTracks } from "../lib/geo-pages/data";
import { convertSession, fitCheck, zonedToUtc, sessionFits } from "../lib/geo-pages/timezone";

const tracks = getBatchTracks();
const asia = tracks.find((t) => t.id === "asia")!;
assert(asia, "asia track exists");

// 09:00 IST on 2026-08-01 is 03:30 UTC.
assert.strictEqual(zonedToUtc("2026-08-01", "09:00", "Asia/Kolkata").toISOString(), "2026-08-01T03:30:00.000Z");

// IST 09:00–18:00 -> Singapore (+2:30): 11:30–20:30, fits 07:00–22:00.
const sg = convertSession(asia, asia.batches[0], "Asia/Singapore");
assert.strictEqual(sg.localLabel, "11:30 AM – 08:30 PM SGT");
assert(sessionFits(sg), "Singapore should fit");
assert.strictEqual(fitCheck(tracks, "Asia/Singapore").status, "fit");

// IST 09:00–18:00 -> Dallas (CDT, -10:30): 10:30 PM (prev day) – 7:30 AM. Off-hours.
const dal = convertSession(asia, asia.batches[0], "America/Chicago");
assert(dal.crossesMidnight, "Dallas session crosses midnight");
assert(!sessionFits(dal), "Dallas should not fit");
assert.strictEqual(fitCheck(tracks, "America/Chicago").status, "off-hours");

// Home track always fits itself, and every label carries a timezone.
assert.strictEqual(fitCheck(tracks, "Asia/Kolkata").status, "fit");
assert(/IST/.test(convertSession(asia, asia.batches[0], "Asia/Kolkata").homeLabel));
assert(/[A-Z]{2,}|GMT/.test(dal.localLabel), "local label must include a tz label");

console.log("test-geo: all assertions passed");
