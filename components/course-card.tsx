import Link from "next/link";
import Image from "next/image";
import { Clock, Star, Award } from "lucide-react";
import type { CourseContent } from "@/lib/seed-data";
import { formatInCurrency, type CurrencyCode, type CurrencyConfig } from "@/lib/currency";

export function CourseCard({ course, country, city, currency = "USD", currencies }: { course: CourseContent; country?: string; city?: string; currency?: CurrencyCode; currencies?: CurrencyConfig[] }) {
  const href = [country, course.slug, city].filter(Boolean).join("/");
  return (
    <Link
      href={`/${href}`}
      className="card overflow-hidden hover:shadow-card-lg transition-all hover:-translate-y-0.5 group flex flex-col"
    >
      <div className="relative aspect-[16/9] bg-ink-100 overflow-hidden">
        <Image
          src={course.heroImage}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/95 text-brand-700 shadow">{course.category.name}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-ink-900 leading-snug line-clamp-2 mb-2 group-hover:text-brand-600">
          {course.shortTitle} Certification Training
        </h3>
        <div className="flex items-center gap-3 text-xs text-ink-500 mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.durationLabel}</span>
          <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {course.accreditedBy}</span>
        </div>
        <p className="text-sm text-ink-600 line-clamp-2 mb-4">{course.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink-100">
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
            <span className="font-semibold text-ink-900">{course.ratingAvg}</span>
            <span className="text-ink-500">({course.ratingCount.toLocaleString()})</span>
          </div>
          <div className="text-brand-600 font-bold">{formatInCurrency(course.basePriceUsd, currency, currencies)}</div>
        </div>
      </div>
    </Link>
  );
}
