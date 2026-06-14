"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Clock, User, FileText, Gift, ClipboardList, BookOpen, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { useLearnerAuth } from "./learner-auth-provider";

export function LearnerDropdown() {
  const { user, logout } = useLearnerAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/home" },
    { icon: Users, label: "Referrals", href: "/home/referrals" },
    { icon: Clock, label: "Redeem History", href: "/home/redeem-history" },
    { icon: User, label: "Profile", href: "/home/profile" },
    { icon: FileText, label: "Purchase History", href: "/home/purchases" },
    { icon: Gift, label: "Gift Card", href: "/home/gifts" },
    { icon: ClipboardList, label: "Practice Tests", href: "/home/practice-tests" },
    { icon: BookOpen, label: "LMS", href: "/home/lms" },
    { icon: HelpCircle, label: "Help and Support", href: "/home/support" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-ink-100 p-1.5 pr-2 rounded-full transition-colors border border-transparent hover:border-ink-200"
      >
        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-primary/10" />
        <ChevronDown className={`w-4 h-4 text-ink-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-ink-100 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="py-2">
            {menuItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="h-px bg-ink-100 my-2"></div>
            
            <div className="px-4 py-2">
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex justify-center items-center gap-2 bg-[#082032] hover:bg-[#0a2b42] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
