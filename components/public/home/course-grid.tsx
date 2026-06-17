"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Search, Download } from "lucide-react";
import { useState } from "react";
import type { CategoryContent, CourseContent } from "@/lib/seed-data";
import { formatInCurrency, type CurrencyCode } from "@/lib/currency";

export function CourseGrid({
  courses,
  categories,
  currency,
}: {
  courses: CourseContent[];
  categories: CategoryContent[];
  currency: CurrencyCode;
}) {
  const tabs = ["All Courses", ...categories.slice(0, 7).map((c) => c.name)];
  const [activeTab, setActiveTab] = useState("All Courses");

  const filteredCourses =
    activeTab === "All Courses" ? courses : courses.filter((course) => course.category.name === activeTab);

  return (
    <section className="section bg-white font-sans pt-10 pb-24">
      <div className="container-tight max-w-[1200px]">
        <div className="mx-auto mb-10 text-center">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#4a7298] mb-2">Find the course right for your goals</div>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#082032] tracking-tight">
            Explore From Over 400+ Courses
          </h2>
        </div>

        {/* Custom Tab Bar */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <div className="flex items-center max-w-full overflow-x-auto border border-primary/30 rounded-md p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 text-[13px] font-bold whitespace-nowrap transition-colors rounded-sm ${
                    active ? "text-primary bg-[#E9F4F4]" : "text-gray-600 hover:text-[#082032] hover:bg-gray-50"
                  }`}
                >
                  {tab}
                  {active && (
                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-t-sm" />
                  )}
                </button>
              );
            })}
          </div>
          <button className="hidden md:flex items-center justify-center w-11 h-11 border border-gray-200 rounded-md text-gray-500 hover:text-primary transition-colors shrink-0">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.slice(0, 6).map((course, index) => (
            <CourseDiscoveryCard key={course.slug} course={course} currency={currency} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseDiscoveryCard({ course, currency, index }: { course: CourseContent; currency: CurrencyCode; index: number }) {
  // Mock some tag logic for the UI reference
  const isRecommended = index === 0 || index === 1 || index === 2;
  const isTrending = index === 3 || index === 4;

  const compareAtPriceInr = "compareAtPriceInr" in course
    ? (course as CourseContent & { compareAtPriceInr?: number }).compareAtPriceInr
    : undefined;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
      
      {/* Top Image Section */}
      <div className="relative h-[200px] w-full bg-gray-100 overflow-hidden">
        {course.heroImage ? (
          <Image
            src={course.heroImage}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        
        {/* Floating Tags */}
        {isRecommended && (
          <div className="absolute top-0 right-0 bg-[#4e6bf2] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wide z-10 shadow-sm">
            Recommended
          </div>
        )}
        {isTrending && (
          <div className="absolute top-0 right-0 bg-[#ef4444] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wide z-10 shadow-sm">
            Trending
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-[11px] text-gray-400 font-medium mb-3">Live Classroom / Classroom</div>
        
        <h3 className="text-[18px] font-bold text-[#082032] leading-snug mb-6 flex-1 hover:text-primary transition-colors cursor-pointer">
          <Link href={`/${course.slug}`}>{course.shortTitle || course.title}</Link>
        </h3>

        <div className="flex items-end justify-between mt-auto mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500">
              <Clock className="w-4 h-4 text-primary" /> {course.durationLabel || "16 Hrs"}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500">
              <Users className="w-4 h-4 text-primary" /> {((course.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 314) % 90000 + 10000).toLocaleString()} Enrolled
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-gray-500 font-medium mb-0.5">Start from</div>
            <div className="text-[18px] font-bold text-[#082032] leading-none">
              {formatInCurrency(course.basePriceInr, currency).replace(".00", "")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <Link 
            href={`/${course.slug}`} 
            className="flex-1 text-center py-2.5 border border-[#082032] text-[#082032] rounded text-[13px] font-bold hover:bg-gray-50 transition-colors"
          >
            View Certification
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#082032] text-white rounded text-[13px] font-bold hover:bg-black transition-colors">
            <Download className="w-4 h-4" /> Curriculum
          </button>
        </div>
      </div>
    </article>
  );
}
