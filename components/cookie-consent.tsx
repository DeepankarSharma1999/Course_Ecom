"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

// Cookie consent banner: shown until the visitor accepts or declines.
// The choice is kept in localStorage; declining means non-essential
// cookies/scripts should not be loaded (strictly necessary ones still work).
const KEY = "cookie-consent"; // "accepted" | "declined"

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch { /* storage blocked: leave banner hidden rather than nag every load */ }
  }, []);

  function choose(value: "accepted" | "declined") {
    try { localStorage.setItem(KEY, value); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed bottom-0 inset-x-0 z-[90] p-3 md:p-4">
      <div className="mx-auto max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="shrink-0 w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center">
            <Cookie className="w-5 h-5 text-brand-600" />
          </span>
          <p className="text-[13px] leading-relaxed text-gray-600">
            We use cookies to keep the site working, remember your preferences, and improve your experience.
            See our <Link href="/cookies-policy" className="text-brand-700 font-semibold underline">Cookies Policy</Link> for details.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => choose("declined")}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-gray-300 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="flex-1 md:flex-none px-5 py-2 rounded-lg bg-[#082032] hover:bg-black text-white text-[13px] font-bold transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
