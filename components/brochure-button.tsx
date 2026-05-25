"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

export function BrochureButton({ courseSlug, className = "" }: { courseSlug: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 text-white px-4 py-2.5 font-semibold text-sm hover:bg-white/20 ${className}`}
      >
        <Download className="w-4 h-4" /> Download Brochure
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] bg-ink-900/70 grid place-items-center px-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-card-lg w-full max-w-md overflow-hidden">
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-ink-100">
              <X className="w-4 h-4 text-ink-700" />
            </button>
            <div className="p-6">
              <LeadForm
                variant="inline"
                title="Get the Course Brochure"
                subtitle="Enter your details — we'll send you the full curriculum, pricing and upcoming batches."
                source={`brochure-${courseSlug}`}
                brochureCourseSlug={courseSlug}
                courseSlug={courseSlug}
                ctaLabel="Send me the brochure"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
