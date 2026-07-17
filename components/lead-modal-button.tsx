"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

/**
 * A button that opens a modal lead form. Every course-page CTA that captures an
 * enquiry (brochure, quote) routes through here so none of them can drift back
 * into being decorative markup.
 */
export function LeadModalButton({
  courseSlug, source, title, subtitle, ctaLabel, brochure, className, children,
}: {
  courseSlug: string;
  /** Tags the lead in the admin, e.g. "brochure-<slug>" / "quote-<slug>". */
  source: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  /** Brochure mode: hides the message box and returns the course's PDF on submit. */
  brochure?: boolean;
  /** Replaces the default styling outright — callers own the look. */
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] bg-ink-900/70 grid place-items-center px-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-card-lg w-full max-w-md overflow-hidden">
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-ink-100">
              <X className="w-4 h-4 text-ink-700" />
            </button>
            <div className="p-6">
              {/* LeadForm's inline variant drops its own title/subtitle, so render them here. */}
              <h3 className="text-lg font-bold text-ink-900 pr-8">{title}</h3>
              <p className="text-sm text-ink-500 mb-4">{subtitle}</p>
              <LeadForm
                variant="inline"
                source={source}
                courseSlug={courseSlug}
                brochureCourseSlug={brochure ? courseSlug : undefined}
                ctaLabel={ctaLabel}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
