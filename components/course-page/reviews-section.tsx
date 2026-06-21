"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 374; // 350px card + 24px gap
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const reviews = [
    {
      title: "User-friendly and interactive",
      content: "I completed my CSM training and certification through ULearnSystems last week. It was a great learning experience. The Scrum Trainer was highly experienced.",
      author: "Anandamoorthy",
      role: "Project Leader",
      source: "Google"
    },
    {
      title: "Informative sessions",
      content: "I recently wrapped up my CSM training and certification with ULearnSystems, and I must say it was an excellent learning journey. Our trainer was fantastic.",
      author: "Hitesh Prajapati",
      role: "Product Manager",
      source: "Google"
    },
    {
      title: "A great learning experience",
      content: "I completed my CSM training and certification through ULearnSystems, and it was a great learning experience. The Scrum Trainer was very knowledgeable and patient.",
      author: "Rupali Bhosale",
      role: "Developer",
      source: "Google"
    }
  ];

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100 pb-10 overflow-hidden">
      <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2 break-words">
        CSM CERTIFICATION COURSE REVIEWS
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-8 break-words leading-tight">Our Learners Love Us</h2>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex bg-white rounded-full border border-gray-200 p-1">
          <button className="px-5 py-2 rounded-full bg-[#f0f7f7] text-[#1FA8A8] font-bold text-[14px]">
            All Reviews
          </button>
          <button className="px-5 py-2 rounded-full text-gray-500 font-bold text-[14px] flex items-center gap-2 hover:bg-gray-50 transition-colors">
            Google
          </button>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-800">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 snap-x">
        {reviews.map((r, i) => (
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
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold mx-auto">G</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate Stats */}
      <div className="mt-6 bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-sm divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:flex-1 py-3 md:py-0 md:px-4 first:pt-0 last:pb-0 md:first:pl-2 md:last:pr-2">
          <div className="text-[15px] md:text-xl font-bold text-gray-800 md:mb-1">Google</div>
          <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-[14px]">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">4.8/5</span>
            <span className="text-gray-500 text-[11px] md:text-[12px]">
               <span className="hidden md:inline">• </span>6,028 <span className="hidden sm:inline">Reviews</span>
            </span>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:flex-1 py-3 md:py-0 md:px-4 first:pt-0 last:pb-0 md:first:pl-2 md:last:pr-2">
          <div className="text-[15px] md:text-xl font-bold text-blue-600 md:mb-1">facebook</div>
          <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-[14px]">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">4.7/5</span>
            <span className="text-gray-500 text-[11px] md:text-[12px]">
               <span className="hidden md:inline">• </span>991 <span className="hidden sm:inline">Reviews</span>
            </span>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:flex-1 py-3 md:py-0 md:px-4 first:pt-0 last:pb-0 md:first:pl-2 md:last:pr-2">
          <div className="text-[15px] md:text-xl font-bold text-red-600 md:mb-1">switchup</div>
          <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-[14px]">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">4.9/5</span>
            <span className="text-gray-500 text-[11px] md:text-[12px]">
               <span className="hidden md:inline">• </span>228 <span className="hidden sm:inline">Reviews</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
