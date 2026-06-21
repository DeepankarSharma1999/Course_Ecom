"use client";

import { Presentation, UserCheck, Briefcase, Globe, Award, Ticket } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function AdvantageSection({ course }: { course: CourseContent }) {
  const isCSM = course.slug.includes("csm");

  const advantages = [
    {
      icon: <Presentation className="w-6 h-6 text-[#1FA8A8]" />,
      title: "Comprehensive Exam Prep",
      description: "Hone your CSM exam readiness and bolster your confidence by practicing with four meticulously crafted high-quality mock exams."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[#1FA8A8]" />,
      title: "Elite Panel of CSTs",
      description: "Get trained by Scrum Alliance accredited and experienced CSTs with more than a decade's experience as Scrum practitioners."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#1FA8A8]" />,
      title: "Effortless Certification Renewal",
      description: "Earn 20 SEUs upon completion of our complimentary Agile and Scrum course worth $300 for seamless certification renewal."
    },
    {
      icon: <Globe className="w-6 h-6 text-[#1FA8A8]" />,
      title: "Comprehensive Job Support",
      description: "Benefit from comprehensive job support, including LinkedIn assistance, AI-resume builder and more."
    },
    {
      icon: <Award className="w-6 h-6 text-[#1FA8A8]" />,
      title: "Global LTP of Scrum Alliance",
      description: "We are a Scrum Alliance Licensed Training Partner(LTP), having trained over 250,000 Agile professionals."
    },
    {
      icon: <Ticket className="w-6 h-6 text-[#1FA8A8]" />,
      title: "Mentorship by Industry Experts",
      description: "Get mentored by Scrum Alliance accredited professionals and get real-world tips and industry-proven techniques."
    }
  ];

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
        Why ULearnSystems for {isCSM ? "CSM" : course.shortTitle} Certification Training
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-10 break-words leading-tight">The ULearnSystems Advantage</h2>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {advantages.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-[#f0f7f7] flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 bg-[#1FA8A8]/10 rounded-lg blur-[2px]"></div>
              <div className="relative z-10">{item.icon}</div>
            </div>
            <h3 className="font-bold text-[#082032] text-[18px] mb-2">{item.title}</h3>
            <p className="text-[14px] text-[#475569] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
