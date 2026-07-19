// Timezone engine for geo pages. Pure Intl — no date libs.
// Converts a batch track's wall-clock schedule into any city's IANA timezone.
// HARD RULE: every rendered time carries a timezone label.
import type { BatchDate, BatchTrack } from "./data";

// Offset (ms) of `tz` from UTC at instant `at`.
function tzOffset(tz: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(at);
  const p: Record<string, string> = {};
  for (const x of parts) if (x.type !== "literal") p[x.type] = x.value;
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  return asUtc - at.getTime();
}

// "2026-08-01" + "09:00" in `tz` -> UTC instant (two-pass to settle DST edges).
export function zonedToUtc(dateISO: string, time: string, tz: string): Date {
  const [y, mo, d] = dateISO.split("-").map(Number);
  const [h, m] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, m);
  const utc = guess - tzOffset(tz, new Date(guess));
  return new Date(guess - tzOffset(tz, new Date(utc)));
}

// Fixed-offset zones get their conventional abbreviation; DST zones fall back
// to Intl "short" (correct CDT/CST etc. for the US, honest GMT+X elsewhere).
const TZ_ABBR: Record<string, string> = {
  "Asia/Kolkata": "IST", "Asia/Singapore": "SGT", "Asia/Dubai": "GST",
  "Asia/Riyadh": "AST", "Asia/Qatar": "AST", "Asia/Kuwait": "AST", "Asia/Muscat": "GST",
  "Asia/Bahrain": "AST", "Asia/Kuala_Lumpur": "MYT", "Asia/Jakarta": "WIB",
  "Asia/Manila": "PHT", "Asia/Bangkok": "ICT", "Asia/Hong_Kong": "HKT",
  "Asia/Dhaka": "BST", "Asia/Colombo": "IST",
  "Africa/Johannesburg": "SAST", "Africa/Lagos": "WAT", "Africa/Nairobi": "EAT",
  "America/Phoenix": "MST", "America/Mexico_City": "CST", "America/Sao_Paulo": "BRT",
};

export function tzLabel(tz: string, at: Date): string {
  if (TZ_ABBR[tz]) return TZ_ABBR[tz];
  const part = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
    .formatToParts(at).find((x) => x.type === "timeZoneName");
  return part?.value ?? "UTC";
}

function fmtTime(d: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: true }).format(d);
}

function localDay(d: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, dateStyle: "short" }).format(d);
}

function localMinutes(d: Date, tz: string): number {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, hour: "2-digit", minute: "2-digit" })
    .formatToParts(d);
  const get = (t: string) => +(p.find((x) => x.type === t)?.value ?? 0);
  return (get("hour") % 24) * 60 + get("minute");
}

export type ConvertedSession = {
  homeLabel: string;   // "09:00 AM – 06:00 PM IST"
  localLabel: string;  // "11:30 AM – 08:30 PM SGT" (+ "(next day)" when shifted)
  localStartMin: number;
  localEndMin: number;
  crossesMidnight: boolean;
};

// Convert one track session (first day of the batch) into a city timezone.
export function convertSession(track: BatchTrack, batch: BatchDate, cityTz: string): ConvertedSession {
  const startUtc = zonedToUtc(batch.startDate, track.start, track.tz);
  const endUtc = zonedToUtc(batch.startDate, track.end, track.tz);
  const homeLabel = `${fmtTime(startUtc, track.tz)} – ${fmtTime(endUtc, track.tz)} ${track.label}`;
  const label = tzLabel(cityTz, startUtc);
  const startMin = localMinutes(startUtc, cityTz);
  const endMin = localMinutes(endUtc, cityTz);
  const crossesMidnight = localDay(startUtc, cityTz) !== localDay(endUtc, cityTz);
  const homeDay = localDay(startUtc, track.tz);
  const startDay = localDay(startUtc, cityTz);
  const shift = startDay < homeDay ? " (prev day)" : startDay > homeDay ? " (next day)" : "";
  return {
    homeLabel,
    localLabel: `${fmtTime(startUtc, cityTz)} – ${fmtTime(endUtc, cityTz)} ${label}${shift}`,
    localStartMin: startMin,
    localEndMin: endMin,
    crossesMidnight,
  };
}

export type FitResult = { status: "fit" | "off-hours"; track: BatchTrack; session: ConvertedSession };

const FIT_START = 7 * 60;  // 07:00 local
const FIT_END = 22 * 60;   // 22:00 local

export function sessionFits(s: ConvertedSession): boolean {
  return !s.crossesMidnight && s.localStartMin >= FIT_START && s.localEndMin <= FIT_END;
}

// Best track for a city: first track whose full session lands inside 07:00–22:00
// local. None fit -> "off-hours" with the first track (for honest converted display).
// ponytail: fit is judged on each track's next batch; per-batch DST drift across a
// track's future batches is ignored — re-evaluate per batch if it ever matters.
export function fitCheck(tracks: BatchTrack[], cityTz: string): FitResult {
  let fallback: FitResult | null = null;
  for (const track of tracks) {
    const batch = track.batches[0];
    if (!batch) continue;
    const session = convertSession(track, batch, cityTz);
    if (sessionFits(session)) return { status: "fit", track, session };
    fallback ??= { status: "off-hours", track, session };
  }
  if (!fallback) throw new Error("batch-tracks.json has no batches");
  return fallback;
}
