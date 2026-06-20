"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function SecretSauceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 374; // 350px card + 24px gap
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const items = [
    {
      title: "Experiential learning",
      subtitle: "with games, role-plays, simulations, and case studies",
      features: ["Games", "Role-Plays", "Simulations", "Case-Studies"],
      bgColor: "bg-[#f8fdfdf]",
      image: "/images/courses/feature_experiential_1781964406598.png"
    },
    {
      title: "Mock Tests",
      subtitle: "4+ Tests",
      features: [],
      bgColor: "bg-[#f0fdf4]",
      image: "/images/courses/feature_mock_tests_1781964418747.png"
    },
    {
      title: "Educational Units",
      subtitle: "Earn 16 SEUs and 16 PDUs",
      features: [],
      bgColor: "bg-[#f8fafc]",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Lifetime Access",
      subtitle: "To course materials and updates",
      features: [],
      bgColor: "bg-[#fffbeb]",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="scroll-mt-24 pt-12">
      <h2 className="text-[28px] md:text-[32px] font-bold text-[#082032] mb-8 text-center">
        Our Secret Sauce for Exam and Career Success
      </h2>
      
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-800">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 snap-x">
        {items.map((item, i) => (
          <div 
            key={i} 
            className={`min-w-[300px] md:min-w-[350px] rounded-2xl border border-gray-200 overflow-hidden shadow-sm snap-start flex flex-col relative ${item.bgColor}`}
          >
            <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[10px] font-bold border border-gray-200 shadow-sm z-10">
              LTP
            </div>
            
            <div className="p-6 pb-0 z-10 relative">
              <h3 className="font-bold text-[#082032] text-xl mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{item.subtitle}</p>
              
              {item.features.length > 0 && (
                <div className="flex flex-col gap-2">
                  {item.features.map(f => (
                    <div key={f} className="bg-[#082032] text-white rounded-full px-3 py-1.5 text-xs font-bold inline-flex items-center gap-2 w-max">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> {f}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mock Image Placeholder aligned to bottom right */}
            <div className="mt-8 flex justify-end px-4 pb-4">
              <div className="w-48 h-32 bg-white rounded-lg shadow-md border border-gray-100 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300 font-bold">Image</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
