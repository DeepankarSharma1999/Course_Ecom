"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, Clock, Gift, BookOpen,
  HelpCircle, PhoneCall
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Users, label: "Referral", href: "/home/referral" },
  { icon: Clock, label: "Purchase History", href: "/home/purchases" },
  { icon: Gift, label: "Gift Card", href: "/home/gifts" },
  { icon: BookOpen, label: "LMS", href: "/home/lms" },
  { icon: HelpCircle, label: "Help & Support", href: "/home/support" },
];

export function LearnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-screen bg-ink-50 flex flex-col fixed left-0 top-0 border-r border-ink-200 z-50">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 bg-white border-b border-ink-200">
        <Link href="/home" className="flex items-center">
          <img src="/logo.png" alt="ULearnSystems" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-medium text-[14px] ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-primary" : "text-ink-500"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Contact Advisor Card */}
      <div className="p-6 mt-auto">
        <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-ink-200 relative overflow-hidden">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <PhoneCall className="w-7 h-7 text-primary" />
          </div>
          <p className="text-[13px] text-ink-600 font-medium mb-4 leading-snug">
            Do you have any problem<br />while using ULearnSystems?
          </p>
          <button className="w-full bg-primary hover:bg-[#0f6b6b] text-white text-[13px] font-bold py-2.5 rounded-lg transition-colors shadow-sm shadow-primary/20">
            Contact Our Advisor
          </button>
        </div>
      </div>
    </aside>
  );
}
