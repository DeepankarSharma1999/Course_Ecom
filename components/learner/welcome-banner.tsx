"use client";

import Link from "next/link";
import { useLearnerAuth } from "@/components/learner-auth-provider";

export function WelcomeBanner({ enrolledCount = 0 }: { enrolledCount?: number }) {
  const { user } = useLearnerAuth();

  return (
    <div className="bg-gradient-to-r from-[#e0f2fe] to-[#bae6fd] rounded-2xl p-6 relative overflow-hidden h-[180px] flex items-center border border-[#7dd3fc]/50">
      {/* Decorative elements */}
      <div className="absolute top-4 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] opacity-20 blur-xl"></div>
      <div className="absolute bottom-4 left-1/2 w-24 h-24 rounded-full bg-white/40 blur-2xl"></div>

      <div className="flex items-center gap-6 relative z-10 w-full max-w-xl">
        {/* Enrollment count badge — a count, not a progress percentage */}
        <div className="w-24 h-24 rounded-full bg-white/70 border-4 border-[#0284c7]/40 flex flex-col items-center justify-center shrink-0">
          <span className="text-[22px] font-black text-[#0c4a6e] leading-none">{enrolledCount}</span>
          <span className="text-[8px] font-bold text-[#0c4a6e]/70 uppercase tracking-wide mt-0.5">Courses</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#0c4a6e]/70 uppercase tracking-wide mb-1">
            {enrolledCount > 0 ? `${enrolledCount} course${enrolledCount > 1 ? "s" : ""} enrolled` : "No enrollments yet"}
          </p>
          <h2 className="text-[22px] font-extrabold text-[#0c4a6e] leading-tight mb-3 tracking-tight">
            Welcome, {user?.name || "Learner"}
          </h2>
          <Link
            href={enrolledCount > 0 ? "/home/lms" : "/courses"}
            className="inline-block bg-white/60 hover:bg-white text-[#0369a1] text-[13px] font-bold px-4 py-1.5 rounded-lg border border-[#38bdf8]/30 transition-all"
          >
            {enrolledCount > 0 ? "Continue learning" : "Find your first course"}
          </Link>
        </div>
      </div>

      {/* Graduation Image Placeholder */}
      <div className="absolute right-0 bottom-0 h-[110%] w-[35%] flex items-end justify-end pointer-events-none origin-bottom-right">
        <div className="w-full h-[90%] bg-gradient-to-t from-white/20 to-transparent flex items-center justify-center rounded-tl-[100px]">
          <span className="text-[60px]">🎓</span>
        </div>
      </div>
    </div>
  );
}
