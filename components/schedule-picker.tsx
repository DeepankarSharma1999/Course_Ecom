"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

// Consultation slot picker (Spoclearn-style): month calendar + time buttons.
// Purely presentational — the chosen slot rides along in the parent <form> via
// the two hidden inputs, and the API folds it into the lead's message.
// ponytail: hand-rolled month grid (~40 lines) instead of a date-picker dep.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// 30-min consultation slots, learner's local time.
const SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"];
const MAX_DAYS_AHEAD = 60;

// Local-date key. NOT toISOString(): that renders local midnight in UTC, which
// shifts the date back a day for every timezone east of UTC (IST picked 22 → sent 21).
const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function SchedulePicker() {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");

  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const max = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + MAX_DAYS_AHEAD); return d; }, [today]);

  // Leading blanks so day 1 lands on its weekday column.
  const cells: (Date | null)[] = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const out: (Date | null)[] = Array(first.getDay()).fill(null);
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= days; i++) out.push(new Date(view.getFullYear(), view.getMonth(), i));
    return out;
  }, [view]);

  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= max;

  return (
    <div className="space-y-3">
      {/* Selected slot travels with the surrounding form. */}
      <input type="hidden" name="preferredDate" value={date ? dayKey(date) : ""} />
      <input type="hidden" name="preferredTime" value={date && time ? `${time} (${tz})` : ""} />

      <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        <Calendar className="h-4 w-4 text-primary" /> Pick a date
      </div>
      <div className="rounded-xl border border-gray-200 p-3">
        <div className="mb-2 flex items-center justify-between">
          <button type="button" onClick={() => canPrev && setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            disabled={!canPrev} aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-bold text-ink-900">{MONTHS[view.getMonth()]} {view.getFullYear()}</div>
          <button type="button" onClick={() => canNext && setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
            disabled={!canNext} aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-[11px] font-bold uppercase text-gray-400">
          {DOW.map((d) => <div key={d} className="py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 text-center">
          {cells.map((d, i) => {
            if (!d) return <div key={`b${i}`} />;
            const disabled = d < today || d > max;
            const selected = !!date && dayKey(d) === dayKey(date);
            return (
              <button key={dayKey(d)} type="button" disabled={disabled}
                onClick={() => setDate(d)}
                aria-pressed={selected}
                className={`mx-auto my-0.5 grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold transition-colors ${
                  selected ? "bg-primary text-white"
                  : disabled ? "text-gray-300"
                  : "text-ink-700 hover:bg-primary/10"}`}>
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        <Clock className="h-4 w-4 text-primary" /> Pick a time
        <span className="font-normal text-xs text-gray-400">({tz})</span>
      </div>
      {date ? (
        <div className="grid grid-cols-4 gap-1.5">
          {SLOTS.map((s) => (
            <button key={s} type="button" onClick={() => setTime(s)}
              aria-pressed={time === s}
              className={`rounded-lg border px-1 py-1.5 text-[12px] font-semibold transition-colors ${
                time === s ? "border-primary bg-primary text-white" : "border-gray-200 text-ink-700 hover:border-primary/50"}`}>
              {s}
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 py-4 text-center text-xs text-gray-400">
          Awaiting date selection
        </div>
      )}
    </div>
  );
}
