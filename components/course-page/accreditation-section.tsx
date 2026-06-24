"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function AccreditationSection({ course }: { course: CourseContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="scroll-mt-24 pt-8 border-t border-gray-100 pb-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-8 overflow-hidden">
        <h2 className="text-[20px] md:text-[24px] font-bold text-[#082032] mb-4 break-words leading-tight">
          ULearnSystems is a {course.accreditedBy || "Scrum Alliance"} Licensed Training Partner (LTP)
        </h2>
        
        <p className="font-bold text-[#082032] text-[14px] md:text-[15px] mb-6 break-words">
          Two-Year Professional Membership | Authorized Curriculum | Certified Trainers | Global Recognition | Hands-On Practice | Career Tools | Premium Resources
        </p>
        
        <div className="space-y-4 text-[14px] text-[#475569] leading-relaxed">
          <p>
            As a {course.accreditedBy || "Scrum Alliance"} Licensed Training Partner (LTP), ULearnSystems is officially authorized to deliver trainings based on the world's most prestigious agile curriculum.
          </p>

          {isExpanded && (
            <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-500">
              <p>
                This isn't just a partnership it's a promise of quality, credibility, and career transformation.
              </p>
              <p>
                Every training is led by a Certified Scrum Trainer (CST), every course meets rigorous global standards, and every certificate you earn is recognized by employers worldwide.
              </p>
              <p>
                From hands-on workshops and real-world simulations to access to a thriving global agile community learners get far more than a certification.
              </p>
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
