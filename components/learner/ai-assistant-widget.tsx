"use client";

import { Send, Sparkles } from "lucide-react";
import { useLearnerAuth } from "@/components/learner-auth-provider";

export function AiAssistantWidget() {
  const { user } = useLearnerAuth();
  
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-primary" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-[16px] font-bold text-ink-900 mb-1">
          Good afternoon, {user?.name?.split(' ')[0] || ''}.
        </h3>
        <p className="text-[18px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-500 leading-tight mb-2">
          What would you like to know?
        </p>
        <p className="text-[12px] text-ink-500">
          Comprehensive learning assistance for all needs
        </p>
      </div>

      <div className="relative group">
        <input 
          type="text" 
          placeholder="Ask anything..." 
          className="w-full pl-4 pr-10 py-3 rounded-xl border border-ink-200 bg-ink-50 text-[13px] focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-ink-900"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-ink-400 hover:text-primary transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
