"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MessageCircle, Phone } from "lucide-react";

export function StickyCta({ courseTitle, priceLabel, enquireHref = "/enquire", schedulesHref = "#schedules" }: {
  courseTitle: string;
  priceLabel?: string;
  enquireHref?: string;
  schedulesHref?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"} lg:hidden`}
      role="region"
      aria-label="Course actions"
    >
      <div className="bg-white border-t border-ink-200 shadow-card-lg px-4 py-3 flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-ink-500 truncate">{courseTitle}</div>
          {priceLabel && <div className="text-sm font-bold text-brand-700">{priceLabel}</div>}
        </div>
        <a href="tel:+971585232875" className="p-2.5 rounded-lg bg-emerald-500 text-white" aria-label="Call us">
          <Phone className="w-4 h-4" />
        </a>
        <a href={schedulesHref} className="px-3 py-2.5 rounded-lg bg-ink-100 text-ink-800 text-sm font-semibold inline-flex items-center gap-1">
          <Calendar className="w-4 h-4" /> Dates
        </a>
        <Link href={enquireHref} className="px-3 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold inline-flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> Enquire
        </Link>
      </div>
    </div>
  );
}
