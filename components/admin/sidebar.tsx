"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calendar, FileText, FolderTree, GraduationCap, Home, HelpCircle, Inbox, LayoutDashboard, MessageSquareQuote, Newspaper, Settings, Users, Layers, Coins, MapPin, UserCheck } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: Home, exact: true },
  { href: "/admin/home-content", label: "Home Page", icon: LayoutDashboard },
  { href: "/admin/site-pages", label: "Site Pages", icon: FileText },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/combo-courses", label: "Combo Courses", icon: Layers },
  { href: "/admin/schedules", label: "Schedules", icon: Calendar },
  { href: "/admin/trainers", label: "Trainers", icon: GraduationCap },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/locations", label: "Locations", icon: MapPin },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/global-faqs", label: "Global FAQs", icon: HelpCircle },
  { href: "/admin/registrations", label: "Registrations", icon: UserCheck },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/currency", label: "Currency & Pricing", icon: Coins },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { href: "/admin/users", label: "Admin Users", icon: Users },
];

export function AdminSidebar({ brandName = "Simplilead", logoUrl = null }: { brandName?: string; logoUrl?: string | null }) {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 bg-ink-900 text-ink-200 min-h-screen sticky top-0">
      <div className="p-4 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="w-10 h-auto object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-brand-500 grid place-items-center text-white font-bold">
              {brandName.charAt(0)}
            </div>
          )}
          <div className="leading-tight">
            <div className="font-bold text-white text-sm">{brandName}</div>
            <div className="text-[10px] uppercase tracking-widest text-brand-300">Admin</div>
          </div>
        </Link>
      </div>
      <nav className="p-3 space-y-1">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active ? "bg-brand-600 text-white" : "text-ink-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 mt-auto absolute bottom-0 left-0 right-0">
        <Link href="/" className="block text-xs text-ink-400 hover:text-white px-3 py-2">← View public site</Link>
      </div>
    </aside>
  );
}
