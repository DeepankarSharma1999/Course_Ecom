"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, LogIn } from "lucide-react";
import { useLearnerAuth } from "@/components/learner-auth-provider";

type Props = {
  groups: { category: string; courses: { slug: string; title: string }[] }[];
  preselected?: string;
};

// Registration needs a learner account (the confirmed course lands in their
// dashboard), so signed-out visitors get the sign-in modal first.
export function RegisterForm({ groups, preselected }: Props) {
  const { isLoggedIn, user, openModal } = useLearnerAuth();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="card p-8 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">
        <LogIn className="w-10 h-10 text-brand-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-ink-900 mb-1">Sign in to register</h3>
        <p className="text-sm text-ink-500 mb-5">
          Your registration is linked to your learner account so the course can appear in your dashboard once confirmed.
        </p>
        <button onClick={openModal} className="btn-primary">Sign in or create an account</button>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading"); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const res = await fetch("/api/learner/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: data.courseSlug }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error || "Something went wrong. Please try again.");
      // Contact details go to the leads inbox so the team can reach out.
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.name || data.name,
          email: user?.email,
          phone: data.phone,
          countryCode: data.countryCode,
          message: data.message,
          courseSlug: data.courseSlug,
          source: "Course Registration",
        }),
      }).catch(() => {});
      setState("success");
    } catch (err: any) {
      setError(err.message);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center text-center py-4">
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
          <h3 className="text-xl font-bold text-ink-900 mb-2">Registration received!</h3>
          <p className="text-ink-600 mb-4 text-sm">
            Our team will confirm your participation shortly. Once confirmed, the course will appear in your dashboard.
          </p>
          <Link href="/home/purchases" className="btn-primary">View my registrations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1">Course *</label>
          <select name="courseSlug" required defaultValue={preselected || ""} className="input w-full">
            <option value="" disabled>Select a course…</option>
            {groups.map((g) => (
              <optgroup key={g.category} label={g.category}>
                {g.courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1">Full name *</label>
          <input name="name" required defaultValue={user?.name} className="input w-full" autoComplete="name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1">Email</label>
          <input value={user?.email ?? ""} disabled className="input w-full bg-gray-50 text-gray-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1">Phone *</label>
          <div className="flex gap-2">
            <select name="countryCode" defaultValue="+91" aria-label="Country code" className="input w-28">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
              <option value="+65">+65</option>
              <option value="+971">+971</option>
            </select>
            <input name="phone" required placeholder="Phone" className="input flex-1 min-w-0" autoComplete="tel" inputMode="tel" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1">Anything we should know? (optional)</label>
          <textarea name="message" rows={2} className="input w-full" placeholder="Preferred batch, questions, team size…" />
        </div>
        <button type="submit" disabled={state === "loading"} className="btn-primary w-full">
          {state === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit registration"}
        </button>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <p className="text-xs text-ink-500 text-center">
          No payment is taken now — our team confirms your seat and shares payment options.
        </p>
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
        .input:focus { border-color: rgb(13 148 136); box-shadow: 0 0 0 3px rgba(13,148,136,.1); }
      `}</style>
    </div>
  );
}
