"use client";

import { useState } from "react";
import { Copy, Check, Mail, MessageCircle, Linkedin, Twitter } from "lucide-react";

export function ReferralLinkCard({ link, learnerName }: { link: string; learnerName: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Clipboard API can be unavailable (http, permissions) — fall back.
      const ta = document.createElement("textarea");
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const message = encodeURIComponent(`Hi! I've been learning with ULearnSystems — use my link to get a discount on globally accredited certification courses: ${link}`);
  const shares = [
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/?text=${message}` },
    { icon: Mail, label: "Email", href: `mailto:?subject=${encodeURIComponent("A discount on certification training for you")}&body=${message}` },
    { icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}` },
    { icon: Twitter, label: "X", href: `https://twitter.com/intent/tweet?text=${message}` },
  ];

  return (
    <div className="bg-gradient-to-br from-primary to-[#0f6b6b] rounded-2xl p-8 text-white shadow-md">
      <h2 className="text-[20px] font-extrabold mb-1">Your personal referral link</h2>
      <p className="text-white/80 text-[13px] mb-6">Hi {learnerName} — anyone who signs up through this link is credited to you.</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-[13px] font-mono truncate select-all">
          {link}
        </div>
        <button
          onClick={copy}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-primary font-bold text-[14px] px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
        >
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy link</>}
        </button>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <span className="text-[12px] font-bold uppercase tracking-wider text-white/70">Share via</span>
        {shares.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share via ${s.label}`}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
