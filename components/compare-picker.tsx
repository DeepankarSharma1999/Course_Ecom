"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ComparePicker({ courses }: { courses: { slug: string; title: string }[] }) {
  const [a, setA] = useState(courses[0]?.slug ?? "");
  const [b, setB] = useState(courses[1]?.slug ?? "");
  const router = useRouter();
  const canGo = a && b && a !== b;
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr_auto] gap-3 items-end">
      <label>
        <div className="text-xs font-bold uppercase text-ink-500 mb-1">Course A</div>
        <select value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm">
          {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
      </label>
      <div className="text-center text-ink-400 font-bold pb-2 hidden md:block">vs</div>
      <label>
        <div className="text-xs font-bold uppercase text-ink-500 mb-1">Course B</div>
        <select value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm">
          {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
      </label>
      <button
        disabled={!canGo}
        onClick={() => router.push(`/compare/${a}-vs-${b}`)}
        className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
      >
        Compare
      </button>
    </div>
  );
}
