"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function InstructorsSection({ course }: { course: CourseContent }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 374; // 350px card + 24px gap
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const instructors = [
    {
      name: "Naveen Nanjundappa",
      role: "Certified Scrum Trainer (CST)",
      desc: "Naveen works with organisations and teams that struggle to accomplish everything they want to in product and people development.",
      exp: "20+",
      companies: ["NOKIA", "wipro"]
    },
    {
      name: "Taghi Paksima",
      role: "Enterprise and Leadership Agility...",
      desc: "Taghi, a Certified Scrum Trainer and Enterprise Agile Coach, boasts two decades of experience in the software/IT industry.",
      exp: "24+",
      companies: ["Microsoft", "Scrum Alliance"]
    },
    {
      name: "Raj Kasturi",
      role: "Certified Scrum Trainer (CST)",
      desc: "Raj Kasturi is a seasoned Agile Coach with 30 years of global application delivery and leadership experience.",
      exp: "30+",
      companies: ["Bank of America"]
    }
  ];

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
        OUR SUPPORT SYSTEM FOR {course.shortTitle.toUpperCase()} TRAINING
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-8 break-words leading-tight">Meet the Team That's Invested in Your Success</h2>
      
      <div className="flex items-center justify-between mb-8">
        <button className="px-5 py-2 rounded-full bg-[#1FA8A8] text-white font-bold text-[14px] flex items-center gap-2">
          <User className="w-4 h-4" /> Instructors
        </button>
        
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
        {instructors.map((inst, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm snap-start flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-[#082032] text-[16px]">{inst.name}</h3>
                <p className="text-[12px] text-gray-500 line-clamp-1">{inst.role}</p>
              </div>
            </div>
            
            <p className="text-[13px] text-gray-600 mb-6 leading-relaxed flex-1">
              {inst.desc}
            </p>
            
            <div className="flex items-center gap-4 mb-6 opacity-60">
              {inst.companies.map((company, j) => (
                <div key={j} className="text-[12px] font-bold text-gray-400">{company}</div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 border-dashed">
              <span className="text-[12px] text-gray-500">Experience: <span className="font-semibold">{inst.exp} Years</span></span>
              <div className="w-6 h-6 bg-[#0a66c2] text-white rounded-sm flex items-center justify-center text-[12px] font-bold">in</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
