"use client";

import { Search, MessageSquare, Bot, Book, Calendar, Bell, ShoppingCart } from "lucide-react";
import { LearnerDropdown } from "@/components/learner-dropdown";
import { LearnerAuthProvider } from "@/components/learner-auth-provider";

export function LearnerTopbar() {
  return (
    <LearnerAuthProvider>
      <header className="h-20 bg-white border-b border-ink-100 flex items-center justify-between px-8 sticky top-0 z-40">
        
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="What you want to search today?"
              className="w-full pl-11 pr-4 py-2.5 border border-ink-200 rounded-xl text-[14px] bg-ink-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-ink-900 placeholder:text-ink-400 font-medium"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Quick Links */}
          <div className="hidden lg:flex items-center gap-5 mr-4 border-r border-ink-100 pr-6">
            <button className="flex items-center gap-2 text-[13px] font-bold text-ink-600 hover:text-primary transition-colors">
              <MessageSquare className="w-4 h-4" /> Forum
            </button>
            <button className="flex items-center gap-2 text-[13px] font-bold text-ink-600 hover:text-primary transition-colors">
              <Bot className="w-4 h-4" /> ULearnGPT
            </button>
            <button className="flex items-center gap-2 text-[13px] font-bold text-ink-600 hover:text-primary transition-colors">
              <Book className="w-4 h-4" /> Materials
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-ink-500 hover:text-primary hover:bg-ink-50 rounded-full transition-colors relative">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 text-ink-500 hover:text-primary hover:bg-ink-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-ink-500 hover:text-primary hover:bg-ink-50 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* User Dropdown */}
          <div className="pl-2">
            <LearnerDropdown />
          </div>
        </div>
      </header>
    </LearnerAuthProvider>
  );
}
