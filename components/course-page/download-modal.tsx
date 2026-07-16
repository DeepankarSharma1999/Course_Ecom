"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

type Account = { name: string | null; email: string } | null;

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  /** Scopes the lead to this course and returns its brochure on submit. */
  courseSlug: string;
  /** Tags the lead in the admin (e.g. "syllabus-<slug>"). */
  source: string;
  ctaLabel?: string;
};

export function DownloadModal({ isOpen, onClose, title, subtitle, courseSlug, source, ctaLabel }: DownloadModalProps) {
  // undefined = still checking for a session; null = signed out.
  const [account, setAccount] = useState<Account | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prefill from the learner session so a signed-in user doesn't retype what we know.
  // Signed out, the form is the prompt — either way submitting records the lead.
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setAccount(undefined);
    fetch("/api/learner/me")
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setAccount(d?.user ?? null); })
      .catch(() => { if (!cancelled) setAccount(null); });
    return () => { cancelled = true; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#082032]/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      onClick={onClose}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row relative" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left side: Illustration */}
        <div className="bg-[#fbfcfc] hidden md:flex w-2/5 p-8 flex-col items-center justify-center border-r border-gray-100">
           <div className="w-full max-w-[200px] aspect-square relative">
              <div className="absolute inset-0 bg-[#e0f2f1] rounded-full opacity-50 blur-2xl"></div>
              <div className="relative z-10 w-full h-full border-4 border-white shadow-xl bg-[#f0f7f7] rounded-xl flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/courses/guide_modal_illustration_1781964394583.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded shadow text-[8px] font-bold text-[#082032]">Career switch</div>
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-[8px] font-bold text-[#082032]">Salary Hike</div>
              </div>
           </div>
        </div>

        {/* Right side: Form */}
        <div className="flex-1 p-8 md:p-10">
          <h3 id="download-modal-title" className="text-2xl font-bold text-[#082032] mb-2">{title}</h3>
          <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">{subtitle}</p>

          {account === undefined ? (
            <div className="flex items-center gap-2 py-10 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </div>
          ) : (
            <LeadForm
              variant="inline"
              source={source}
              courseSlug={courseSlug}
              brochureCourseSlug={courseSlug}
              ctaLabel={ctaLabel || "Send it to me"}
              defaultName={account?.name ?? undefined}
              defaultEmail={account?.email}
            />
          )}

          <p className="text-[11px] text-gray-500 text-center pt-4 leading-relaxed">
            By tapping submit, you agree to Simplilead <a href="/info/privacy-policy-and-disclaimer" className="font-bold text-[#082032] hover:underline">Privacy Policy</a> and <a href="/info/terms-and-conditions" className="font-bold text-[#082032] hover:underline">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </div>
  );
}
