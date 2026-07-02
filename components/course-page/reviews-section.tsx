"use client";

import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";
import { DEFAULT_REVIEWS, DEFAULT_REVIEW_STATS } from "@/lib/course-section-defaults";

export function ReviewsSection({ course }: { course?: CourseContent }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All Reviews");

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 374; // 350px card + 24px gap
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // Per-course override from admin, else the shared defaults.
  const reviews = course?.pageSections?.reviews?.length
    ? course.pageSections.reviews
    : DEFAULT_REVIEWS;
  const stats = course?.pageSections?.reviewStats?.length
    ? course.pageSections.reviewStats
    : DEFAULT_REVIEW_STATS;

  const filteredReviews = reviews.filter(r => activeFilter === "All Reviews" || r.source === activeFilter);

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100 pb-10 overflow-hidden">
      <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2 break-words">
        CSM CERTIFICATION COURSE REVIEWS
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-8 break-words leading-tight">Our Learners Love Us</h2>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-wrap bg-white rounded-full border border-gray-200 p-1 hide-scrollbar overflow-x-auto">
          {["All Reviews", "Google", "LinkedIn", "SwitchUp"].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-bold text-[14px] whitespace-nowrap transition-colors ${activeFilter === filter ? "bg-[#f0f7f7] text-[#1FA8A8]" : "text-gray-500 hover:bg-gray-50"}`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} aria-label="Scroll left" className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} aria-label="Scroll right" className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-800">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 snap-x">
        {filteredReviews.map((r, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm snap-start relative">
            <div className="text-[60px] text-gray-100 font-serif absolute top-2 left-4 leading-none select-none">"</div>
            <div className="relative z-10">
              <h3 className="font-bold text-[#082032] text-[16px] mb-2">{r.title}</h3>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[14px] text-gray-600 mb-4 line-clamp-4 leading-relaxed h-[84px]">
                {r.content}
              </p>
              <button className="text-[13px] font-bold text-[#082032] underline mb-6">Read More</button>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 border-dashed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e0f2f1] rounded-full flex items-center justify-center text-[#1FA8A8] font-bold text-lg">
                    {r.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#082032] text-[14px]">{r.author}</div>
                    <div className="text-[12px] text-gray-500">{r.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 mb-1">Read on</div>
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold mx-auto text-gray-600">
                    {(r.source ?? "?").charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate Stats — editable per course (course.pageSections.reviewStats) */}
      <div className="mt-6 bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-sm divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:flex-1 py-3 md:py-0 md:px-4 first:pt-0 last:pb-0 md:first:pl-2 md:last:pr-2">
            <div className="text-[15px] md:text-xl font-bold text-gray-800 md:mb-1">{s.label}</div>
            <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-[14px]">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{s.rating}</span>
              <span className="text-gray-500 text-[11px] md:text-[12px]">
                <span className="hidden md:inline">• </span>{s.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
