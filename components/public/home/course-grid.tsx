"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Clock, Star } from "lucide-react";
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
    <section className="section bg-[#E9F4F4] font-sans">
      <div className="container-tight">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-eyebrow mb-3">Course Discovery</div>
          <h2 className="h2">Professional certification training for every career stage</h2>
          <p className="lead mt-4">
            Explore expert-led programs built around globally recognised frameworks, practical workshops, and exam-focused outcomes.
          </p>
        </div>

        <div role="tablist" aria-label="Course categories" className="mb-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max min-w-full gap-2 rounded-2xl border border-[#082032]/10 bg-white p-2 shadow-[0_8px_24px_rgba(8,32,50,0.05)] md:min-w-0">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-[40px] whitespace-nowrap rounded-xl px-4 text-sm font-extrabold transition-colors ${
                    active ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.slice(0, 6).map((course, index) => (
            <CourseDiscoveryCard key={course.slug} course={course} currency={currency} featured={index < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseDiscoveryCard({ course, currency, featured }: { course: CourseContent; currency: CurrencyCode; featured: boolean }) {
  const compareAtPriceInr = "compareAtPriceInr" in course
    ? (course as CourseContent & { compareAtPriceInr?: number }).compareAtPriceInr
    : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#082032]/10 bg-white shadow-[0_8px_24px_rgba(8,32,50,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(8,32,50,0.09)]">
      <Link href={`/${course.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-secondary">
        {course.heroImage ? (
          <Image
            src={course.heroImage}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#082032] shadow-sm">
          {course.category.name}
        </div>
        {featured && <div className="accent-badge absolute right-4 top-4">Popular</div>}
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex items-center gap-3 text-xs font-bold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-primary" />
            {course.accreditedBy || "Certified program"}
          </span>
        </div>

        <h3 className="mb-3 line-clamp-2 min-h-14 text-lg font-black leading-snug text-[#082032] group-hover:text-primary">
          <Link href={`/${course.slug}`} className="inline-flex min-h-[32px] items-center">{course.shortTitle || course.title}</Link>
        </h3>

        <p className="mb-5 line-clamp-2 text-sm leading-6 text-muted-foreground">{course.summary}</p>

        <div className="mb-5 flex flex-wrap gap-3 text-sm font-bold text-[#5D6D7E]">
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-[#E23B3B] text-[#E23B3B]" />
            {course.ratingAvg} ({course.ratingCount.toLocaleString()})
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {course.durationLabel}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#082032]/8 pt-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Starts from</div>
            <div className="mt-1 text-xl font-black text-[#082032]">{formatInCurrency(course.basePriceInr, currency).replace(".00", "")}</div>
            {compareAtPriceInr ? (
              <div className="text-xs font-semibold text-muted-foreground line-through">
                {formatInCurrency(compareAtPriceInr, currency).replace(".00", "")}
              </div>
            ) : null}
          </div>
          <Link href={`/${course.slug}`} className="btn-primary min-h-[44px] rounded-xl px-4 py-2 text-xs">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
