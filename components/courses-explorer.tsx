"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { type CurrencyCode, convertFromInr } from "@/lib/currency";

type Course = any;
type Category = { slug: string; name: string };

const SORTS = [
  { value: "featured", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "popular", label: "Most Reviewed" },
];

export function CoursesExplorer({ courses, categories, currency = "INR" }: { courses: Course[]; categories: Category[]; currency?: CurrencyCode }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");
  const [examOnly, setExamOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...courses];
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter((c) =>
        [c.title, c.shortTitle, c.summary, c.category?.name]
          .filter(Boolean)
          .some((v: string) => v.toLowerCase().includes(s))
      );
    }
    if (cat) list = list.filter((c) => c.category?.slug === cat);
    if (examOnly) list = list.filter((c) => c.examIncluded);
    if (maxPrice !== "" && maxPrice > 0) {
      list = list.filter((c) => convertFromInr(c.basePriceInr ?? 0, currency) <= maxPrice);
    }

    switch (sort) {
      case "rating": list.sort((a, b) => (b.ratingAvg ?? 0) - (a.ratingAvg ?? 0)); break;
      case "price-low": list.sort((a, b) => (a.basePriceInr ?? 0) - (b.basePriceInr ?? 0)); break;
      case "price-high": list.sort((a, b) => (b.basePriceInr ?? 0) - (a.basePriceInr ?? 0)); break;
      case "popular": list.sort((a, b) => (b.ratingCount ?? 0) - (a.ratingCount ?? 0)); break;
    }
    return list;
  }, [courses, q, cat, examOnly, maxPrice, sort]);

  const hasFilters = q || cat || examOnly || maxPrice !== "" || sort !== "featured";

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* Filters sidebar */}
      <aside className={`${showFilters ? "fixed inset-0 z-40 bg-white p-4 overflow-y-auto" : "hidden"} lg:block lg:static lg:p-0`}>
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <div className="font-semibold">Filters</div>
          <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
        </div>
        <div className="card p-5 space-y-5 sticky top-24">
          <div>
            <label className="text-xs font-bold uppercase text-ink-500 mb-2 block">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses…"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-ink-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-ink-500 mb-2 block">Category</label>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              <button onClick={() => setCat("")} className={`block w-full text-left text-sm px-3 py-1.5 rounded ${!cat ? "bg-brand-50 text-brand-700 font-semibold" : "text-ink-700 hover:bg-ink-50"}`}>All</button>
              {categories.map((c) => (
                <button key={c.slug} onClick={() => setCat(c.slug)} className={`block w-full text-left text-sm px-3 py-1.5 rounded ${cat === c.slug ? "bg-brand-50 text-brand-700 font-semibold" : "text-ink-700 hover:bg-ink-50"}`}>{c.name}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-ink-500 mb-2 block">Max Price ({currency})</label>
            <input
              type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 30000"
              className="w-full px-3 py-2 rounded-lg border border-ink-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={examOnly} onChange={(e) => setExamOnly(e.target.checked)} className="rounded border-ink-300 text-brand-600" />
            Exam fee included
          </label>

          {hasFilters && (
            <button onClick={() => { setQ(""); setCat(""); setExamOnly(false); setMaxPrice(""); setSort("featured"); }} className="text-sm text-brand-600 hover:underline">Clear all filters</button>
          )}
        </div>
      </aside>

      <div>
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <div className="text-sm text-ink-600">
            Showing <span className="font-semibold text-ink-900">{filtered.length}</span> of {courses.length} courses
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(true)} className="lg:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-ink-200 text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-1.5 rounded-lg border border-ink-200 text-sm focus:border-brand-500 outline-none">
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-ink-500 mb-3">No courses match your filters.</div>
            <Link href="/courses" className="text-brand-600 hover:underline text-sm">Reset filters</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((c: any) => <CourseCard key={c.slug} course={c} currency={currency} />)}
          </div>
        )}
      </div>
    </div>
  );
}
