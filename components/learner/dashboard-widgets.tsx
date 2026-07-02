"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function ComboOfferCard({ course }: { course: any }) {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative border border-primary/20">
      <div className="absolute top-4 left-4 bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-sm">
        Trending
      </div>

      {/* Image Side */}
      <div className="w-full md:w-2/5 relative">
        <img src={course.heroImage || "/images/vendor/unsplash/photo-1573496359142-b8d87734a5a2.jpg"} alt={course.title} className="w-full h-[180px] object-cover rounded-xl shadow-sm border border-white/50" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-3/5 flex flex-col justify-center text-center items-center">
        <h3 className="text-[15px] font-bold text-ink-900 leading-snug mb-2 max-w-[280px]">
          {course.title}
        </h3>
        <p className="text-[12px] text-ink-500 mb-4 flex items-center gap-2">
          <span className="flex items-center text-[#eab308]"><Star className="w-3 h-3 fill-current" /> {course.ratingAvg || 4.8}</span>
          <span>•</span>
          <span>Live Classroom</span>
        </p>

        <div className="flex items-end justify-center gap-2 mb-6">
          <span className="text-xl font-extrabold text-ink-900">{formatPrice(course.basePriceUsd || 249, "USD")}</span>
          <span className="text-[13px] text-ink-400 line-through pb-0.5">{formatPrice((course.basePriceUsd || 249) * 1.2, "USD")}</span>
        </div>

        <Link
          href={`/${course.slug}`}
          className="w-full max-w-[240px] text-center bg-primary hover:bg-[#0f6b6b] text-white font-bold py-3 rounded-xl transition-colors text-[14px] shadow-sm shadow-primary/20"
        >
          ENROLL NOW
        </Link>
      </div>
    </div>
  );
}

// ponytail: FreeCourseCard removed — all courses are live instructor-led; enrollments
// come from the enroll API (/api/learner/enroll) after purchase, not free self-serve.

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[18px] font-extrabold text-ink-900">{title}</h2>
    </div>
  );
}
