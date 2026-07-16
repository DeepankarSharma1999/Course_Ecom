"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";
import { defaultAccreditation } from "@/lib/course-section-defaults";

export function AccreditationSection({ course }: { course: CourseContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Per-course override from admin, else computed defaults.
  const body = course.accreditedBy || "Scrum Alliance";
  const acc = course.pageSections?.accreditation;
  const fallback = defaultAccreditation(course);
  const heading = acc?.heading || fallback.heading;
  const intro = acc?.intro || fallback.intro;
  const more = acc?.more?.length ? acc.more : fallback.more;

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-8 overflow-hidden">
        <h2 className="text-[20px] md:text-[24px] font-bold text-[#082032] mb-4 break-words leading-tight">{heading}</h2>

        <p className="font-bold text-[#082032] text-[14px] md:text-[15px] mb-6 break-words">
          Two-Year Professional Membership | Authorized Curriculum | Certified Trainers | Global Recognition | Hands-On Practice | Career Tools | Premium Resources
        </p>

        <div className="space-y-4 text-[14px] text-[#475569] leading-relaxed">
          <p>{intro}</p>

          {isExpanded && (
            <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-500">
              {more.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="mt-6 text-[#082032] font-bold flex items-center gap-1 cursor-pointer transition-colors hover:text-[#1FA8A8]"
        >
          {isExpanded ? (
            <span className="border-b border-[#082032] hover:border-[#1FA8A8] pb-0.5">Read Less <ChevronUp className="w-4 h-4 inline" /></span>
          ) : (
            <span className="border-b border-[#082032] hover:border-[#1FA8A8] pb-0.5">Read More <ChevronDown className="w-4 h-4 inline" /></span>
          )}
        </button>
      </div>
    </section>
  );
}
