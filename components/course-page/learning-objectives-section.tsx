"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function LearningObjectivesSection({ course }: { course: CourseContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const objectives = [
    { title: "Scrum Theory", desc: "Understand Scrum principles and their application in agile product development cycles. Learn about the benefits of an iterative approach and the dangers of partial implementation." },
    { title: "The Scrum Team", desc: "Illustrate the interaction between the Product Owner, Developers, and Scrum Master in delivering Increments within a Sprint with Agile." },
    { title: "Scrum Events and Activities", desc: "Understand the benefits of timeboxing, sprint purpose and duration, key Scrum events and Agile Product Backlog refinement." },
    { title: "Scrum Artifacts and Commitments", desc: "Learn about Agile artifacts (Backlog, Sprint Backlog, Increment) and their roles in iterative development, goal setting." },
    { title: "The Team", desc: "Understand the three Scrum Roles: development team builds, PO owns backlog (prioritizes), Scrum Master coaches and protects process." },
    { title: "Scrum Events and Activities", desc: "Learn to plan sprints, review work, reflect and adapt. Delve into daily Scrum Events/Practices and Definition of Done (DoD)." },
    { title: "Scrum Master Core Competencies", desc: "Learn the role of the Scrum Master in facilitating the needs of the Scrum Team and organization, including facilitating group decision-making." },
    { title: "Service to the Team, PO, and Org", desc: "Identify the Scrum Master's role in leading the Scrum Team, managing technical debt, supporting the Product Owner and more." }
  ];

  const displayCount = isExpanded ? objectives.length : 4;

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100 pb-8">
      <div className="bg-[#fcfdfd] rounded-3xl p-8 md:p-12 border border-[#e2ecec]">
        <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
          WHAT YOU WILL LEARN IN {course.shortTitle.toUpperCase()} CERTIFICATION
        </div>
        <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-10 break-words leading-tight">Learning Objectives</h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {objectives.slice(0, displayCount).map((obj, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full border-2 border-[#1FA8A8] flex items-center justify-center text-[#1FA8A8] font-bold shrink-0 mt-1">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-[#082032] text-[18px] mb-2">{obj.title}</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center border-t border-gray-200 pt-6">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[13px] font-bold text-[#082032] hover:text-[#1FA8A8] transition-colors flex items-center justify-center gap-1"
          >
            {isExpanded ? "View less" : "View more"} 
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
