"use client";

import { useLearnerAuth } from "@/components/learner-auth-provider";

export function WelcomeBanner() {
  const { user } = useLearnerAuth();
  
  // Dummy data for completion
  const completionPercentage = 35;
  
  return (
    <div className="bg-gradient-to-r from-[#e0f2fe] to-[#bae6fd] rounded-2xl p-6 relative overflow-hidden h-[180px] flex items-center border border-[#7dd3fc]/50">
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] opacity-20 blur-xl"></div>
      <div className="absolute bottom-4 left-1/2 w-24 h-24 rounded-full bg-white/40 blur-2xl"></div>
      
      <div className="flex items-center gap-6 relative z-10 w-full max-w-xl">
        
        {/* Radial Progress */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-white" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-[#0284c7]" strokeWidth="8"
              strokeDasharray="283" strokeDashoffset={283 - (283 * completionPercentage) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-[#0c4a6e] leading-none mb-0.5">{completionPercentage}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#0c4a6e]/70 uppercase tracking-wide mb-1">{completionPercentage}% Complete</p>
          <h2 className="text-[22px] font-extrabold text-[#0c4a6e] leading-tight mb-3 tracking-tight">
            Welcome, {user?.name || "Learner"}
          </h2>
          <button className="bg-white/60 hover:bg-white text-[#0369a1] text-[13px] font-bold px-4 py-1.5 rounded-lg border border-[#38bdf8]/30 transition-all">
            Complete your profile
          </button>
        </div>
      </div>

      {/* Graduation Image Placeholder */}
      <div className="absolute right-0 bottom-0 h-[110%] w-[35%] flex items-end justify-end pointer-events-none origin-bottom-right">
        {/* Placeholder for the 3D graduation cap and books illustration */}
        <div className="w-full h-[90%] bg-gradient-to-t from-white/20 to-transparent flex items-center justify-center rounded-tl-[100px]">
          <span className="text-[60px]">🎓</span>
        </div>
      </div>
    </div>
  );
}
