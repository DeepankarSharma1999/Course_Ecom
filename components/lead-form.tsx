"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";

type Props = {
  variant?: "card" | "inline" | "sidebar";
  courseSlug?: string;
  countrySlug?: string;
  citySlug?: string;
  title?: string;
  subtitle?: string;
  source?: string;
  /** Brochure mode — submitting returns a download link. */
  brochureCourseSlug?: string;
  ctaLabel?: string;
  /** Prefill for a logged-in learner so they don't retype what we already know. */
  defaultName?: string;
  defaultEmail?: string;
};

type Utm = { source?: string; medium?: string; campaign?: string; term?: string; content?: string; referrer?: string; landingPath?: string };

function getStoredUtm(): Utm {
  try {
    const sp = new URLSearchParams(window.location.search);
    const fromUrl: Utm = {
      source: sp.get("utm_source") ?? undefined,
      medium: sp.get("utm_medium") ?? undefined,
      campaign: sp.get("utm_campaign") ?? undefined,
      term: sp.get("utm_term") ?? undefined,
      content: sp.get("utm_content") ?? undefined,
    };
    // Persist first-touch UTMs for 30 days
    if (fromUrl.source || fromUrl.campaign) {
      const stored = { ...fromUrl, _t: Date.now() };
      try { localStorage.setItem("mc_utm", JSON.stringify(stored)); } catch {}
    }
    let utm = fromUrl;
    if (!utm.source && !utm.campaign) {
      try {
        const raw = localStorage.getItem("mc_utm");
        if (raw) {
          const obj = JSON.parse(raw);
          if (Date.now() - (obj._t || 0) < 30 * 24 * 60 * 60 * 1000) {
            utm = { source: obj.source, medium: obj.medium, campaign: obj.campaign, term: obj.term, content: obj.content };
          }
        }
      } catch {}
    }
    return {
      ...utm,
      referrer: document.referrer || undefined,
      landingPath: window.location.pathname + window.location.search,
    };
  } catch { return {}; }
}

export function LeadForm({
  variant = "card",
  courseSlug,
  countrySlug,
  citySlug,
  title = "Get Course Details",
  subtitle = "Schedules, pricing & exclusive offers — straight to your inbox.",
  source = "course-page",
  brochureCourseSlug,
  ctaLabel,
  defaultName,
  defaultEmail,
}: Props) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [brochureUrl, setBrochureUrl] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading"); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const utm = getStoredUtm();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, courseSlug, countrySlug, citySlug, source, brochureCourseSlug, utm }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || "Something went wrong");
      if (body.brochureUrl) setBrochureUrl(body.brochureUrl);
      setState("success");
    } catch (err: any) {
      setError(err.message);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={variant !== "inline" ? "card p-8" : ""}>
        <div className="flex flex-col items-center text-center py-6">
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
          <h3 className="h3 mb-2">Thank you!</h3>
          {brochureUrl ? (
            <>
              <p className="text-ink-600 mb-4">Your brochure is ready. A training advisor will also reach out shortly.</p>
              <a href={brochureUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <Download className="w-4 h-4" /> Download Brochure
              </a>
            </>
          ) : (
            <p className="text-ink-600">A training advisor will reach out shortly. We&rsquo;ve also sent a confirmation to your inbox.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={variant !== "inline" ? "card p-6" : ""}>
      {variant !== "inline" && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-ink-900">{title}</h3>
          <p className="text-sm text-ink-500">{subtitle}</p>
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3" autoComplete="on">
        {/* Honeypot: hidden from humans, bots tend to fill all fields */}
        <input
          type="text" name="company_website" tabIndex={-1} autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
        />
        <input name="name" required defaultValue={defaultName} placeholder="Full name *" aria-label="Full name" className="input w-full" autoComplete="name" />
        <input name="email" type="email" required defaultValue={defaultEmail} placeholder="Work email *" aria-label="Work email" className="input w-full" autoComplete="email" />
        <div className="flex gap-2">
          <select name="countryCode" defaultValue="+91" aria-label="Country code" className="input w-28">
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
            <option value="+65">+65</option>
            <option value="+971">+971</option>
          </select>
          <input name="phone" required placeholder="Phone *" aria-label="Phone number" className="input flex-1 min-w-0" autoComplete="tel" inputMode="tel" />
        </div>
        {!brochureCourseSlug && <textarea name="message" placeholder="Tell us about your training need (optional)" aria-label="Your training need" rows={2} className="input w-full" />}
        <label className="flex items-start gap-2 text-xs text-ink-500">
          <input name="consentMarketing" type="checkbox" defaultChecked className="mt-0.5" />
          <span>I agree to receive course information and updates.</span>
        </label>
        <button type="submit" disabled={state === "loading"} className="btn-primary w-full">
          {state === "loading"
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
            : (ctaLabel || (brochureCourseSlug ? "Send me the brochure" : "Request a Callback"))}
        </button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
      <style jsx>{`
        .input {
          border: 1px solid rgb(229 231 235);
          border-radius: 0.5rem;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          background: white;
          color: rgb(31 41 55);
          outline: none;
        }
        .input:focus { border-color: rgb(53 99 255); box-shadow: 0 0 0 3px rgba(53,99,255,.1); }
      `}</style>
    </div>
  );
}
