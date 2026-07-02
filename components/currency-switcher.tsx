"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { DEFAULT_CURRENCIES, type CurrencyConfig } from "@/lib/currency";

export function CurrencySwitcher({ current, currencies }: { current: string; currencies?: CurrencyConfig[] }) {
  const list = (currencies && currencies.length ? currencies : DEFAULT_CURRENCIES).map((c) => ({
    code: c.code,
    label: `${c.code} ${c.symbol}`,
  }));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 hover:text-white">
        <Globe className="w-3.5 h-3.5" /> {current} <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 max-h-80 overflow-y-auto bg-white text-ink-800 rounded-lg shadow-card-lg border border-ink-100 w-44 z-50">
          {list.map((c) => (
            <form key={c.code} action="/api/currency" method="post">
              <input type="hidden" name="from" value={typeof window !== "undefined" ? window.location.pathname + window.location.search : "/"} />
              <button name="currency" value={c.code} className={`w-full text-left px-3 py-2 text-sm hover:bg-ink-50 ${current === c.code ? "font-semibold text-brand-700" : ""}`}>
                {c.label}
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
