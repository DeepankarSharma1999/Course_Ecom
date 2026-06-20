"use client";

import { X, Image as ImageIcon, Check, ChevronDown } from "lucide-react";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
};

export function DownloadModal({ isOpen, onClose, title, subtitle }: DownloadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#082032]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left side: Illustration */}
        <div className="bg-[#fbfcfc] hidden md:flex w-2/5 p-8 flex-col items-center justify-center border-r border-gray-100">
           <div className="w-full max-w-[200px] aspect-square relative">
              {/* Decorative placeholder for the illustration */}
              <div className="absolute inset-0 bg-[#e0f2f1] rounded-full opacity-50 blur-2xl"></div>
              <div className="relative z-10 w-full h-full border-4 border-white shadow-xl bg-[#f0f7f7] rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/images/courses/guide_modal_illustration_1781964394583.png" alt="Download Guide" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded shadow text-[8px] font-bold text-[#082032]">Career switch</div>
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-[8px] font-bold text-[#082032]">Salary Hike</div>
              </div>
           </div>
        </div>

        {/* Right side: Form */}
        <div className="flex-1 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-[#082032] mb-2">{title}</h3>
          <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
            {subtitle}
          </p>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            
            {/* Phone Field */}
            <div className="flex rounded-[4px] border border-gray-300 overflow-hidden focus-within:border-[#1FA8A8] focus-within:ring-1 focus-within:ring-[#1FA8A8]">
              <div className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-300">
                <span className="text-[18px]">🇮🇳</span>
                <span className="text-[14px] text-gray-600 font-medium">+91</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number *" 
                required
                className="flex-1 px-4 py-3 text-[14px] outline-none"
              />
            </div>

            {/* Email Field */}
            <div className="rounded-[4px] border border-gray-300 overflow-hidden focus-within:border-[#1FA8A8] focus-within:ring-1 focus-within:ring-[#1FA8A8]">
              <input 
                type="email" 
                placeholder="Email *" 
                required
                className="w-full px-4 py-3 text-[14px] outline-none"
              />
            </div>

            {/* WhatsApp Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded-[3px] border border-[#1FA8A8] bg-[#1FA8A8] flex items-center justify-center text-white shrink-0">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <span className="text-[13px] text-[#1FA8A8]">I want to receive updates directly on Whatsapp</span>
            </label>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full h-12 bg-[#e2ecec] hover:bg-[#d0dfdf] text-[#082032] font-bold rounded-[4px] transition-colors mt-2"
            >
              Get OTP
            </button>

            <p className="text-[11px] text-gray-500 text-center pt-2 leading-relaxed">
              By tapping submit, you agree to ULearnSystems <a href="#" className="font-bold text-[#082032] hover:underline">Privacy Policy</a> and <a href="#" className="font-bold text-[#082032] hover:underline">Terms & Conditions</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
