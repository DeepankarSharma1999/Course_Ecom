"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Share2, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function ComboOfferCard({ course }: { course: any }) {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative border border-primary/20">
      <div className="absolute top-4 left-4 bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-sm">
        Trending
      </div>
      <button className="absolute top-4 right-4 text-ink-500 hover:text-primary transition-colors z-10">
        <Share2 className="w-4 h-4" />
      </button>

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
          <span>{course.ratingCount || 73}k enrolled</span>
          <span>•</span>
          <span>Live Classroom</span>
        </p>

        <div className="flex items-end justify-center gap-2 mb-6">
          <span className="text-xl font-extrabold text-ink-900">{formatPrice(course.basePriceInr || 20499, "INR")}</span>
          <span className="text-[13px] text-ink-400 line-through pb-0.5">{formatPrice((course.basePriceInr || 20499) * 1.2, "INR")}</span>
        </div>

        <button className="w-full max-w-[240px] bg-primary hover:bg-[#0f6b6b] text-white font-bold py-3 rounded-xl transition-colors text-[14px] shadow-sm shadow-primary/20">
          ENROLL NOW
        </button>
      </div>
    </div>
  );
}

export function FreeCourseCard({ course }: { course: any }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className="relative h-[160px]">
        <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-sm">
          FREE
        </div>
        <img src={course.heroImage || "/images/vendor/unsplash/photo-1531482615713-2afd69097998.jpg"} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5 flex flex-col h-[140px]">
        <h4 className="font-bold text-[14px] text-ink-900 leading-snug mb-auto line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h4>
        <div className="flex items-center gap-1.5 text-[11px] text-ink-500 mb-4 font-medium">
          <span className="w-4 h-4 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">✓</span>
          Completion Certificate
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-ink-100">
          <Link href={`/${course.slug}`} className="text-[12px] font-bold text-ink-600 hover:text-ink-900">View Course</Link>
          <button className="text-[12px] font-bold text-primary hover:text-[#0f6b6b]">Enroll Now</button>
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[18px] font-extrabold text-ink-900">{title}</h2>
      <div className="flex gap-2">
        <button className="w-8 h-8 rounded-full border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors text-ink-400 hover:text-ink-900">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors text-ink-400 hover:text-ink-900">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
