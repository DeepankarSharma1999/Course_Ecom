"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronDown, Check } from "lucide-react";

type Country = { slug: string; name: string; code: string };

export function CourseCountrySwitcher({
  courseSlug,
  currentCountrySlug,
  countries,
}: {
  courseSlug: string;
  currentCountrySlug?: string;
  countries: Country[];
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = currentCountrySlug
    ? countries.find((c) => c.slug === currentCountrySlug)
    : null;
  const currentLabel = current?.name ?? "Global";

  function switchTo(slug: string | null) {
    setOpen(false);
    const target = slug ? `/${slug}/${courseSlug}` : `/${courseSlug}`;
    router.push(target);
  }

  const filtered = filter.trim()
    ? countries.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
    : countries;

  return (
    <div ref={ref} className="hidden lg:block fixed bottom-5 right-5 z-40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 shadow-card-lg px-4 py-2.5 text-sm font-medium text-ink-800 hover:border-brand-300 hover:text-brand-700"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <MapPin className="w-4 h-4 text-brand-600" />
        <span>{currentLabel}</span>
        <ChevronDown className={`w-4 h-4 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute bottom-full right-0 mb-2 w-72 max-h-[60vh] overflow-hidden flex flex-col bg-white border border-ink-200 rounded-xl shadow-card-lg"
        >
          <div className="p-3 border-b border-ink-100">
            <div className="text-xs font-bold uppercase text-ink-500 mb-2">Choose your country</div>
            <input
              autoFocus
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search countries…"
              className="w-full px-3 py-1.5 rounded-lg border border-ink-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
            />
          </div>
          <div className="overflow-y-auto py-1">
            <button
              onClick={() => switchTo(null)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-ink-50 flex items-center justify-between ${!current ? "font-semibold text-brand-700 bg-brand-50/40" : "text-ink-700"}`}
            >
              <span className="flex items-center gap-2">🌍 Global (no region)</span>
              {!current && <Check className="w-4 h-4" />}
            </button>
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-sm text-ink-500 text-center">No matches.</div>
            )}
            {filtered.map((c) => {
              const active = c.slug === currentCountrySlug;
              return (
                <button
                  key={c.slug}
                  onClick={() => switchTo(c.slug)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-ink-50 flex items-center justify-between ${active ? "font-semibold text-brand-700 bg-brand-50/40" : "text-ink-700"}`}
                >
                  <span>{c.name}</span>
                  {active && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
