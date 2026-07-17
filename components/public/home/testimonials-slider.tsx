"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// FIX-02: renders ONLY admin-entered testimonials (Admin > Testimonials).
// The old hardcoded set of invented people/quotes is gone; with no rows the
// section renders nothing.
export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating: number;
  course?: string;
  photo?: string;
};

export function TestimonialsSlider({ content, testimonials = [] }: { content?: any; testimonials?: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tBadge = content?.testimonialsBadge || "Learner Stories";
  const tTitle = content?.testimonialsTitle || "What Our Learners Say";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  if (testimonials.length === 0) return null;

  const handlePrev = () => setActiveIndex((c) => (c > 0 ? c - 1 : maxIndex));
  const handleNext = () => setActiveIndex((c) => (c < maxIndex ? c + 1 : 0));

  return (
    <section className="section bg-[#f8fcfc] font-sans py-24 overflow-hidden">
      <div className="container-tight max-w-[1200px]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">{tBadge}</div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight">{tTitle}</h2>
        </div>

        <div className="overflow-visible w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (isMobile ? 100 : 33.333)}%)` }}
          >
            {testimonials.map((t, index) => (
              <div key={index} className="w-full md:w-1/3 shrink-0 px-3">
                <article className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 flex flex-col relative pt-10 h-full">
                  <div className="absolute -top-2 left-6 text-gray-100 font-serif text-[80px] leading-none pointer-events-none">
                    &ldquo;
                  </div>

                  <div className="relative z-10 flex-1">
                    {t.course && <h3 className="text-[16px] font-bold text-[#082032] mb-3">{t.course}</h3>}

                    <div className="flex text-[#facc15] mb-6" aria-label={`${t.rating} star rating`}>
                      {Array.from({ length: Math.min(5, Math.max(0, t.rating)) }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-[13px] leading-relaxed text-gray-500 font-medium mb-8">
                      {t.quote}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-gray-200 pt-6">
                    <div className="flex items-center gap-3">
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} className="h-10 w-10 rounded-full object-cover border border-gray-100" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#e0f2f1] border border-gray-100 flex items-center justify-center text-[#1FA8A8] font-bold">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-[13px] font-bold text-[#082032] leading-tight">{t.name}</div>
                        <div className="text-[11px] font-medium text-gray-500 mt-0.5">{[t.role, t.company].filter(Boolean).join(" · ")}</div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > itemsPerView && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={handlePrev} aria-label="Previous testimonial" className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors bg-white shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={handleNext} aria-label="Next testimonial" className="w-11 h-11 rounded-full border border-[#082032] flex items-center justify-center text-[#082032] hover:bg-[#082032] hover:text-white transition-colors bg-white shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
