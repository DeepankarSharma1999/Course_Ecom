"use client";

import { useRef } from "react";
import { Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function RelatedCoursesSection({ course }: { course: CourseContent }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 374; // 350px card + 24px gap
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-12 border-t border-gray-100">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
        RECOMMENDED COURSES FOR {course.shortTitle.toUpperCase()}
      </div>
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] break-words leading-tight">Learners Also Enrolled For</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} aria-label="Scroll left" className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} aria-label="Scroll right" className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 snap-x">
        {[
          { title: "Gen AI for Scrum Masters", enrolled: "3,624", hours: "16", next: "June 26, 2026", badge: "" },
          { title: "Implementing SAFe® 6.0 with SPC Certification", enrolled: "34,807", hours: "32", next: "June 18, 2026", badge: "" },
          { title: "SAFe® 6.0 Product Owner/Product Manager...", enrolled: "36,702", hours: "16", next: "June 20, 2026", badge: "Best Seller" },
          { title: "Certified Scrum Product Owner (CSPO)", enrolled: "42,105", hours: "16", next: "July 01, 2026", badge: "Trending" },
        ].map((c, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[350px] rounded-2xl border border-gray-200 bg-[#fcfdfd] overflow-hidden flex flex-col relative snap-start">
            {c.badge && (
              <div className="absolute top-4 right-4 bg-[#1FA8A8] text-white text-[10px] font-bold px-2 py-1 rounded">
                {c.badge}
              </div>
            )}
            <div className="p-6 pb-4 flex-1">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-[10px] font-bold rounded">Live Online Classroom</span>
                {i === 1 && <span className="px-2 py-1 bg-gray-200 text-gray-700 text-[10px] font-bold rounded">Classroom</span>}
              </div>
              <h3 className="font-bold text-[#082032] text-[18px] mb-6">{c.title}</h3>
              <div className="flex items-center gap-6 text-[13px] text-[#0E7C7C] font-bold">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {c.enrolled} Enrolled</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.hours} Hours</span>
              </div>
            </div>
            <div className="bg-gray-100/50 p-4 border-t border-gray-200 text-[12px] font-semibold text-gray-600">
              Next Schedule starts at <span className="text-[#082032]">{c.next}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
