"use client";

import { useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
};

export function DownloadModal({ isOpen, onClose, title, subtitle }: DownloadModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

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
          <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
            {subtitle}
          </p>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onClose(); }}>

            {/* Phone Field */}
            <div>
              <label htmlFor="dm-phone" className="sr-only">Phone number</label>
              <div className="flex rounded-[4px] border border-gray-300 overflow-hidden focus-within:border-[#1FA8A8] focus-within:ring-1 focus-within:ring-[#1FA8A8]">
                <div className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-300">
                  <span className="text-[18px]" aria-hidden="true">🇮🇳</span>
                  <span className="text-[14px] text-gray-600 font-medium">+91</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  id="dm-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Phone Number *"
                  required
                  className="flex-1 px-4 py-3 text-[16px] outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="dm-email" className="sr-only">Email address</label>
              <div className="rounded-[4px] border border-gray-300 overflow-hidden focus-within:border-[#1FA8A8] focus-within:ring-1 focus-within:ring-[#1FA8A8]">
                <input
                  id="dm-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email *"
                  required
                  className="w-full px-4 py-3 text-[16px] outline-none"
                />
              </div>
            </div>

            {/* WhatsApp Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="relative flex items-center justify-center">
                <input type="checkbox" defaultChecked className="peer h-4 w-4 appearance-none rounded-[3px] border border-[#1FA8A8] checked:bg-[#1FA8A8] cursor-pointer" />
                <Check className="pointer-events-none absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
              </span>
              <span className="text-[13px] text-[#1FA8A8]">I want to receive updates directly on Whatsapp</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] transition-colors mt-2"
            >
              Get OTP
            </button>

            <p className="text-[11px] text-gray-500 text-center pt-2 leading-relaxed">
              By tapping submit, you agree to ULearnSystems <a href="/info/privacy-policy-and-disclaimer" className="font-bold text-[#082032] hover:underline">Privacy Policy</a> and <a href="/info/terms-and-conditions" className="font-bold text-[#082032] hover:underline">Terms &amp; Conditions</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
