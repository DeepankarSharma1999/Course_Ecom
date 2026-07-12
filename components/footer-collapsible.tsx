"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Mobile-only accordion: collapsed with a chevron on small screens, always open
// on md+ (the chevron disappears and the button becomes a plain heading).
export function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between md:pointer-events-none md:cursor-default"
      >
        <h3 className="font-bold text-brand-950 text-[15px] mb-4">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-brand-700 md:hidden transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`${open ? "block" : "hidden"} md:block`}>{children}</div>
    </div>
  );
}

// Long legal text collapsed to a preview with a Read more… toggle.
export function ReadMore({ children, collapsedHeight = 120 }: { children: React.ReactNode; collapsedHeight?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className="relative overflow-hidden transition-[max-height]"
        style={{ maxHeight: open ? "none" : collapsedHeight }}
      >
        {children}
        {!open && <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent" />}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 text-[12px] font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-600"
      >
        {open ? "Read less" : "Read more…"}
      </button>
    </div>
  );
}
