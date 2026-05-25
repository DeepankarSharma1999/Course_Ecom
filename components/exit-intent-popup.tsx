"use client";

import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

const STORAGE_KEY = "mc_exit_popup_dismissed_until";
const SUPPRESS_DAYS = 7;
const MOBILE_SCROLL_PCT = 0.6;
const DELAY_MS_BEFORE_ARM = 8000;

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && Number(raw) > Date.now()) return;
    } catch { /* ignore */ }

    let armed = false;
    const armTimer = window.setTimeout(() => { armed = true; }, DELAY_MS_BEFORE_ARM);

    function onMouseLeave(e: MouseEvent) {
      if (!armed) return;
      if (e.clientY <= 0) trigger();
    }
    function onScroll() {
      if (!armed) return;
      const sc = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (sc > MOBILE_SCROLL_PCT) trigger();
    }
    function trigger() {
      setShow(true);
      cleanup();
    }
    function cleanup() {
      document.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(armTimer);
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) window.addEventListener("scroll", onScroll, { passive: true });
    else document.addEventListener("mouseout", onMouseLeave);

    return cleanup;
  }, []);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000));
    } catch { /* ignore */ }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-ink-900/60 grid place-items-center px-4" onClick={dismiss}>
      <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-card-lg w-full max-w-2xl overflow-hidden grid md:grid-cols-2 animate-in fade-in zoom-in-95">
        <button onClick={dismiss} aria-label="Close" className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white">
          <X className="w-4 h-4 text-ink-700" />
        </button>
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white p-8 hidden md:flex md:flex-col md:justify-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-500 mb-3">
            <Gift className="w-4 h-4" /> Limited Time
          </div>
          <div className="text-3xl font-bold mb-2">Save 15% on your next certification</div>
          <p className="text-brand-100 text-sm">Get an exclusive discount code in your inbox — valid on any live online or classroom batch this quarter.</p>
        </div>
        <div className="p-6">
          <div className="md:hidden mb-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-600 mb-2"><Gift className="w-4 h-4" /> Limited Time</div>
            <div className="text-xl font-bold text-ink-900 mb-1">Save 15% on certification</div>
          </div>
          <LeadForm
            variant="inline"
            title="Claim Your 15% Off"
            subtitle="Quick — takes 30 seconds."
            source="exit-intent"
          />
        </div>
      </div>
    </div>
  );
}
