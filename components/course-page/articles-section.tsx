"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function ArticlesSection({ course }: { course: CourseContent }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 374; // 350px card + 24px gap
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const articles = [
    {
      title: "CSM, PSM, SSM, SASM - What Scrum Master Course Do I...",
      desc: "Scrum adoption is growing very fast and companies are looking for well...",
      views: "13774 views",
      date: "May 2024",
      bg: "bg-orange-100",
      image: "/images/articles/article_thumb_1_1781964920607.png"
    },
    {
      title: "Certified Scrum Master (CSM) Future: Trends & Predictions",
      desc: "A scrum master is a professional who uses lightweight Agile project...",
      views: "6407 views",
      date: "November 2023",
      bg: "bg-blue-100",
      image: "/images/articles/article_thumb_2_1781964933185.png"
    },
    {
      title: "What are the Major Differences Between CSM vs SAFe...",
      desc: "Today businesses are complex, and business environments are extremely...",
      views: "14720 views",
      date: "May 2024",
      bg: "bg-purple-100",
      image: "/images/articles/article_thumb_3_1781964947383.png"
    }
  ];

  return (
    <section className="scroll-mt-24 pt-12 pb-12 border-t border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="max-w-3xl overflow-hidden">
          <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2 break-words">
            RECOMMENDED BLOGS FOR {course.shortTitle.toUpperCase()}
          </div>
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-4 break-words leading-tight">Expert Articles on {course.shortTitle}</h2>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-2xl">
            Looking to learn more about the {course.shortTitle} role and how it is making an impact in the leading organizations across the world? Read about our curated list of articles written based on actual events and projects in the real world.
          </p>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <button onClick={() => scroll("left")} aria-label="Scroll left" className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} aria-label="Scroll right" className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-800">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 snap-x">
        {articles.map((article, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl border border-gray-200 p-4 shadow-sm snap-start flex flex-col hover:shadow-md transition-shadow">
            
            {/* Article Thumbnail Image */}
            <div className={`relative w-full h-40 rounded-xl mb-4 overflow-hidden ${article.bg}`}>
               <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 300px, 350px" className="object-cover" />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-[#e0f2f1] text-[#1FA8A8] rounded-full text-[11px] font-bold">
                {article.views}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                {article.date}
              </span>
            </div>

            <h3 className="font-bold text-[#082032] text-[16px] mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-[13px] text-gray-500 mb-6 line-clamp-2 flex-1">{article.desc}</p>
            
            <Link href="#" className="text-[13px] font-bold text-[#082032] underline text-left w-max hover:text-[#1FA8A8] transition-colors">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
