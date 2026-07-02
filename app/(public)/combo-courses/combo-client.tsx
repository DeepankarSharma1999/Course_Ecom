"use client";

import { Share2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePricing } from "@/components/pricing-provider";

type ComboCourseProps = {
  courses: any[];
};

// ponytail: combos come from the admin Combos section (category "combo-courses").
// No classification tabs — one grid of everything.
export function ComboCoursesClient({ courses }: ComboCourseProps) {
  const { format } = usePricing();
  return (
    <div className="py-16 bg-ink-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ink-900">Unbeatable Saving Combo Schedule</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => {
            // USD base; show a ~16% "original" strike for the saving badge.
            const basePrice = course.basePriceUsd || 899;
            const originalPrice = Math.round(basePrice * 1.19);
            const discount = originalPrice - basePrice;

            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-ink-100 overflow-hidden relative group hover:shadow-md transition-shadow flex flex-col">
                
                {/* Trending Ribbon */}
                <div className="absolute top-4 -left-10 bg-primary text-primary-foreground text-[10px] font-bold py-1 px-10 -rotate-45 shadow-sm uppercase tracking-wider">
                  Trending
                </div>

                {/* Share Icon */}
                <button aria-label="Share this combo" className="absolute top-4 right-4 grid h-9 w-9 place-items-center text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>

                <div className="p-6 flex-1 flex flex-col items-center text-center">
                  
                  {/* Icons Mockup */}
                  <div className="flex items-center gap-4 mb-6 mt-8">
                    <div className="w-16 h-16 bg-white border border-border/50 rounded-xl shadow-sm flex items-center justify-center font-bold text-foreground">
                      {course.title.split(' ')[0].substring(0,4)}
                    </div>
                    <div className="text-muted-foreground font-bold text-xl">+</div>
                    <div className="w-16 h-16 bg-white border border-border/50 rounded-xl shadow-sm flex items-center justify-center font-bold text-foreground">
                      a
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground mb-4 line-clamp-3 min-h-[4rem]">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-center gap-4 text-xs text-primary mb-6">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {((course.slug || course.title).split("").reduce((acc: number, ch: string) => acc + ch.charCodeAt(0), 0) % 5) + 4}k enrolled
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                       Live Classroom
                    </span>
                  </div>

                  <div className="mt-auto w-full">
                    <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                      <span className="font-bold text-xl text-foreground">
                        {format(basePrice)}
                      </span>
                      <span className="text-muted-foreground line-through text-sm">
                        {format(originalPrice)}
                      </span>
                      <span className="bg-secondary text-primary text-[11px] font-bold px-2 py-1 rounded">
                        Save {format(discount)}
                      </span>
                    </div>

                    <Link 
                      href={`/${course.slug}`}
                      className="block w-full text-center bg-primary hover:opacity-90 text-primary-foreground font-bold py-3 rounded-md transition-colors"
                    >
                      ENROLL NOW
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          
          {courses.length === 0 && (
            <div className="col-span-full py-12 text-center text-ink-500">
              No combo courses available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
