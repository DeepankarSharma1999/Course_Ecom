"use client";

import { Search, Calendar } from "lucide-react";
import Link from "next/link";
import { LearnerDropdown } from "@/components/learner-dropdown";

export function LearnerTopbar() {
  return (
    <header className="h-20 bg-white border-b border-ink-100 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search — submits to the real course catalog */}
      <div className="flex-1 max-w-xl">
        <form action="/courses" className="relative group">
          <Search className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            name="q"
            placeholder="Search courses…"
            aria-label="Search courses"
            className="w-full pl-11 pr-4 py-2.5 border border-ink-200 rounded-xl text-[14px] bg-ink-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-ink-900 placeholder:text-ink-400 font-medium"
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-auto">
        <Link
          href="/webinars"
          className="hidden lg:flex items-center gap-2 text-[13px] font-bold text-ink-600 hover:text-primary transition-colors"
        >
          <Calendar className="w-4 h-4" /> Webinars
        </Link>

        {/* User Dropdown */}
        <div className="pl-2">
          <LearnerDropdown />
        </div>
      </div>
    </header>
  );
}
