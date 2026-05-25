"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/seed-data";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink-100 border border-ink-100 rounded-2xl bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-ink-50/60"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-ink-900 pr-6">{it.q}</span>
              <ChevronDown className={`w-5 h-5 text-ink-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 -mt-1 text-ink-600 leading-relaxed">{it.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
