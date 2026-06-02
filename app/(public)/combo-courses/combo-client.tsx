"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Share2, TrendingUp } from "lucide-react";
import Link from "next/link";

type ComboCourseProps = {
  courses: any[];
};

export function ComboCoursesClient({ courses }: ComboCourseProps) {
  const [activeTab, setActiveTab] = useState("Other Combo");

  const tabs = ["Other Combo", "PMI Combo", "Scaled Agile Combo", "Scrum Alliance Combo"];

  // Categorize
  const categorized: Record<string, any[]> = {
    "PMI Combo": courses.filter(c => c.title.includes("PMP") || c.title.includes("PMI") || c.title.includes("CAPM")),
    "Scaled Agile Combo": courses.filter(c => c.title.includes("SAFe") || c.title.includes("SSM") || c.title.includes("POPM") || c.title.includes("RTE") || c.title.includes("SPC") || c.title.includes("LPM")),
    "Scrum Alliance Combo": courses.filter(c => c.title.includes("CSM") || c.title.includes("CSPO") || c.title.includes("CSD") || c.title.includes("A-CSM") || c.title.includes("A-CSPO") || c.title.includes("CSP-SM")),
  };

  const categorizedIds = new Set([
    ...categorized["PMI Combo"].map(c => c.id),
    ...categorized["Scaled Agile Combo"].map(c => c.id),
    ...categorized["Scrum Alliance Combo"].map(c => c.id),
  ]);

  categorized["Other Combo"] = courses.filter(c => !categorizedIds.has(c.id));

  const currentCourses = categorized[activeTab] || [];

  return (
    <div className="py-16 bg-ink-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ink-900 mb-8">Unbeatable Saving Combo Schedule</h1>
          
          <div className="flex justify-center border-b border-ink-200">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map(course => {
            // Dummy discounts matching screenshot
            const basePrice = course.basePriceInr || 70999;
            const originalPrice = basePrice + 13400;
            const discount = originalPrice - basePrice;

            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-ink-100 overflow-hidden relative group hover:shadow-md transition-shadow flex flex-col">
                
                {/* Trending Ribbon */}
                <div className="absolute top-4 -left-10 bg-primary text-primary-foreground text-[10px] font-bold py-1 px-10 -rotate-45 shadow-sm uppercase tracking-wider">
                  Trending
                </div>

                {/* Share Icon */}
                <button className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors">
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
                      {Math.floor(Math.random() * 5 + 4)}k enrolled
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                       Live Classroom
                    </span>
                  </div>

                  <div className="mt-auto w-full">
                    <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                      <span className="font-bold text-xl text-foreground">
                        {formatPrice(basePrice, "INR")}
                      </span>
                      <span className="text-muted-foreground line-through text-sm">
                        {formatPrice(originalPrice, "INR")}
                      </span>
                      <span className="bg-secondary text-primary text-[11px] font-bold px-2 py-1 rounded">
                        % {formatPrice(discount, "INR").replace('₹', '')} off
                      </span>
                    </div>

                    <Link 
                      href={`/combo-courses/${course.slug}`} 
                      className="block w-full text-center bg-primary hover:opacity-90 text-primary-foreground font-bold py-3 rounded-md transition-colors"
                    >
                      ENROLL NOW
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          
          {currentCourses.length === 0 && (
            <div className="col-span-full py-12 text-center text-ink-500">
              No combo courses found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
