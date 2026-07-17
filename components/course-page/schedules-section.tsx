"use client";

import { useState } from "react";
import { Clock, Globe, Calendar, ChevronDown } from "lucide-react";
import { usePricing } from "@/components/pricing-provider";
import type { CourseSchedule } from "@/lib/content";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

export function SchedulesSection({ schedules, fallbackPriceUsd, courseSlug }: { schedules: CourseSchedule[]; fallbackPriceUsd: number; courseSlug?: string }) {
  const { format } = usePricing();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const toggleFilter = (f: string) => {
    setSelectedMonth(null);
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const fmtDate = (d: Date) => d.toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });

  const now = new Date();
  const displaySchedules = schedules.filter((s) => {
    if (selectedMonth) return s.startDate.getMonth() === MONTHS.indexOf(selectedMonth);
    if (activeFilters.length === 0) return true;
    return activeFilters.every((f) => {
      if (f === "This Month") return s.startDate.getMonth() === now.getMonth() && s.startDate.getFullYear() === now.getFullYear();
      if (f === "Next Month") {
        const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return s.startDate.getMonth() === next.getMonth() && s.startDate.getFullYear() === next.getFullYear();
      }
      if (f === "Weekend") return isWeekend(s.startDate);
      if (f === "Weekday") return !isWeekend(s.startDate);
      return true;
    });
  });

  return (
    <section id="schedules" className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Explore Our Schedules</div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-8 break-words leading-tight">Schedules</h2>

      <div className="mb-6 text-[13px] font-semibold text-gray-500">{displaySchedules.length} Results</div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {["This Month", "Next Month", "Weekend", "Weekday"].map((f) => {
          const isActive = activeFilters.includes(f);
          return (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              aria-pressed={isActive}
              className={`h-10 px-4 rounded-full border text-[13px] font-semibold transition-colors ${
                isActive
                  ? "border-[#1FA8A8] bg-[#e0f2f1] text-[#0E7C7C]"
                  : "border-gray-200 text-gray-600 hover:border-[#1FA8A8] hover:text-[#0E7C7C] bg-white"
              }`}
            >
              {f}
            </button>
          );
        })}

        {/* Month Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            aria-expanded={isMonthOpen}
            aria-haspopup="listbox"
            className={`h-10 px-4 rounded-full border text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
              selectedMonth || isMonthOpen ? "border-[#1FA8A8] text-[#0E7C7C] bg-[#e0f2f1]" : "border-gray-200 text-gray-600 hover:border-[#1FA8A8] hover:text-[#0E7C7C] bg-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> {selectedMonth || "Month"} <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isMonthOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 max-h-60 overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-2">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedMonth(m === selectedMonth ? null : m);
                    setIsMonthOpen(false);
                    setActiveFilters([]);
                  }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 transition-colors ${selectedMonth === m ? "font-bold text-[#0E7C7C]" : "text-gray-600 font-medium"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {displaySchedules.map((s, i) => {
          const price = s.priceUsd || fallbackPriceUsd;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-8 items-center hover:border-[#1FA8A8]/50 transition-colors">
              {/* Info */}
              <div>
                <h3 className="text-[15px] lg:text-[18px] font-black text-[#082032] mb-1 lg:mb-2 leading-tight">{fmtDate(s.startDate)} - {fmtDate(s.endDate)}</h3>
                {s.timeLabel && (
                  <div className="flex items-center gap-3 text-[12px] lg:text-[13px] text-gray-500 mb-2 lg:mb-3">
                    {/* timeLabel often already carries the timezone ("09:00 AM - 06:00 PM IST") */}
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.timeLabel}{s.timezone && !s.timeLabel.includes(s.timezone) ? ` ${s.timezone}` : ""}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-[12px] lg:text-[13px] font-semibold text-gray-700">
                  <span className="flex items-center gap-1 text-[#0E7C7C]">
                    <Globe className="w-3.5 h-3.5" /> {s.mode}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>{isWeekend(s.startDate) ? "Weekend Batch" : "Weekday Batch"}</span>
                  {typeof s.seatsLeft === "number" && s.seatsLeft > 0 && s.seatsLeft <= 6 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-orange-600">{s.seatsLeft} seats left</span>
                    </>
                  )}
                </div>
              </div>

              {/* Price & Action */}
              <div className="text-left lg:text-right flex flex-col justify-center min-w-0 lg:min-w-[200px] mt-2 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                {s.discountPct ? (
                  <div className="text-[10px] lg:text-[11px] font-bold text-red-500 mb-1 lg:mb-1.5 flex items-center justify-start lg:justify-end gap-2">
                    <span className="px-1.5 py-0.5 bg-red-500 text-white rounded leading-none">{s.discountPct}% OFF</span>
                  </div>
                ) : null}
                <div className="text-[18px] lg:text-[22px] font-black text-[#082032] flex items-center justify-start lg:justify-end gap-2 mb-3 lg:mb-4">
                  {format(price * (1 - (s.discountPct ?? 0) / 100))}
                  {s.discountPct ? <span className="text-[12px] lg:text-[14px] font-semibold text-gray-500 line-through">{format(price)}</span> : null}
                </div>
                <a href={courseSlug ? `/register?course=${courseSlug}` : "#enquire"} className="w-full h-9 lg:h-11 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] flex items-center justify-center transition-colors text-[13px] lg:text-[14px]">
                  Enroll Now
                </a>
              </div>
            </div>
          );
        })}
        {displaySchedules.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-semibold border border-dashed border-gray-300 rounded-xl">
            {schedules.length === 0
              ? "New batch dates are being finalized — enquire and we'll confirm the next start date."
              : "No schedules found matching your criteria."}
          </div>
        )}
      </div>
    </section>
  );
}
