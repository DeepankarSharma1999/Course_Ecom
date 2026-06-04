"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown, ChevronRight, Menu, Search, X, Phone,
} from "lucide-react";
import * as Lucide from "lucide-react";
import { CurrencySwitcher } from "@/components/currency-switcher";

type NavCategory = {
  slug: string;
  name: string;
  tagline?: string | null;
  icon?: string | null;
  courses: { slug: string; title: string }[];
};

type FeaturedCourse = { slug: string; title: string; category: string };

type Props = {
  currency?: string;
  brandName?: string;
  logoUrl?: string | null;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string | null;
  topBarMessages?: string[];
  navCategories?: NavCategory[];
  featuredCourses?: FeaturedCourse[];
};

function Icon({ name, className }: { name?: string | null; className?: string }) {
  const C = (name && (Lucide as any)[name]) || Lucide.BookOpen;
  return <C className={className} />;
}

export function SiteHeader({
  currency = "USD",
  brandName = "ULearnSystems",
  logoUrl = null,
  phone = "+91 80 4710 6633",
  navCategories = [],
}: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"courses" | "resources" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimer = useRef<number | undefined>(undefined);

  function openSoft(name: "courses" | "resources") {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  }
  function closeSoft() {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  }

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const navLink = (href: string, label: string, isNew = false) => (
    <Link
      href={href}
      className={`relative px-4 py-6 text-[15px] font-semibold transition-colors flex items-center h-full text-foreground/80 hover:text-primary`}
    >
      {isNew && (
        <span className="absolute top-3 right-0 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full leading-none font-bold">
          New
        </span>
      )}
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-border/50 font-sans transition-all duration-300">
      {/* Top Banner (Bakrid Sale) */}
      <div className="bg-foreground text-background text-[13px] py-2 relative overflow-hidden hidden md:block">
        <div className="container-tight flex items-center justify-between relative z-10">
          <div className="font-semibold text-muted-foreground/80">26th-31st May</div>
          <div className="font-bold flex items-center gap-2 text-primary-foreground">
            Special Offer &ndash; Enroll Before It Ends
          </div>
          <div className="w-24" /> {/* Spacer to center the text */}
        </div>
      </div>

      {/* Main nav */}
      <div className="container-tight flex items-center h-[80px] justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt={brandName} className="h-12 md:h-16 w-auto object-contain" />
        </Link>

        {/* All Courses Dropdown & Search (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-2xl gap-3 ml-8">
          <div className="relative h-full flex items-center" onMouseEnter={() => openSoft("courses")} onMouseLeave={closeSoft}>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border/50 rounded-full text-sm font-semibold text-foreground bg-secondary/50 hover:bg-secondary hover:border-primary/30 transition-all">
              <Menu className="w-4 h-4 text-primary" /> All Courses <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            {openMenu === "courses" && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-[800px] z-50">
                <div className="bg-card border border-border/50 shadow-2xl rounded-2xl flex overflow-hidden">
                  <div className="w-1/3 bg-secondary/30 py-4 border-r border-border/50 min-h-[300px]">
                    {navCategories.map(cat => (
                      <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setOpenMenu(null)} className="block px-6 py-3 text-sm font-semibold text-foreground/80 hover:bg-white hover:text-primary transition-colors">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="w-2/3 p-6 grid grid-cols-2 gap-x-6 gap-y-4 bg-card">
                    {navCategories[0]?.courses.slice(0, 10).map(c => (
                      <Link key={c.slug} href={`/${c.slug}`} onClick={() => setOpenMenu(null)} className="text-sm font-medium text-muted-foreground hover:text-primary truncate block transition-colors">
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <form action="/courses" method="get" className="flex-1 relative group">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            <input
              type="text" name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full pl-11 pr-4 py-2.5 border border-border/50 rounded-full text-sm bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </form>
        </div>

        {/* Right Navigation */}
        <nav className="hidden lg:flex items-center h-full gap-2">
          {navLink("/combo-courses", "Combo Courses", true)}

          <div className="relative flex items-center h-full" onMouseEnter={() => openSoft("resources")} onMouseLeave={closeSoft}>
            <button className="flex items-center gap-1 px-4 text-[15px] font-semibold text-foreground/80 hover:text-primary transition-colors">
              Resources <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            {openMenu === "resources" && (
              <div className="absolute right-0 top-full pt-2 z-50">
                <div className="bg-card border border-border/50 shadow-2xl rounded-2xl w-56 py-2 overflow-hidden">
                  <Link href="/free-course" className="block px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">Free Course</Link>
                  <Link href="/practice-tests" className="block px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">Practice Test</Link>
                  <Link href="/webinars" className="block px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">Webinars</Link>
                  <Link href="/resources" className="block px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">Blogs</Link>
                  <Link href="/trainers" className="block px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">Trainers</Link>
                </div>
              </div>
            )}
          </div>

          {navLink("/corporate", "Corporate")}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5 ml-auto">
          {phone && (
            <a href={`tel:${phone}`} className="hidden xl:block text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5 fill-current" />
            </a>
          )}

          <Link href="/admin" className="hidden lg:block font-bold text-sm text-foreground hover:text-primary whitespace-nowrap transition-colors">
            Sign In
          </Link>

          <button className="relative p-2 text-foreground/80 hover:text-primary transition-colors bg-secondary rounded-full">
            <Lucide.ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-foreground/80 hover:text-primary bg-secondary rounded-full">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-background lg:hidden overflow-y-auto">
          <div className="p-4 flex items-center justify-between border-b border-border/50 bg-card">
            <img src="/logo.png" alt={brandName} className="h-20 w-auto object-contain" />
            <button onClick={() => setMobileOpen(false)} className="p-2 bg-secondary rounded-full text-foreground/80"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-6 space-y-4">
            <form action="/courses" method="get" className="relative mb-6">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" name="q" placeholder="What do you want to learn today?" className="w-full pl-11 pr-4 py-3.5 border border-border/50 rounded-full text-sm bg-secondary focus:outline-none focus:border-primary" />
            </form>
            <Link href="/courses" className="py-4 font-semibold text-foreground border-b border-border/50 flex justify-between items-center">All Courses <ChevronRight className="w-4 h-4 opacity-50" /></Link>
            <Link href="/combo-courses" className="py-4 font-semibold text-foreground border-b border-border/50 flex justify-between items-center">
              <span className="flex items-center gap-2">Combo Courses <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">New</span></span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
            <Link href="/resources" className="py-4 font-semibold text-foreground border-b border-border/50 flex justify-between items-center">Resources <ChevronRight className="w-4 h-4 opacity-50" /></Link>
            <Link href="/corporate" className="py-4 font-semibold text-foreground border-b border-border/50 flex justify-between items-center">Corporate <ChevronRight className="w-4 h-4 opacity-50" /></Link>
          </div>
        </div>
      )}
    </header>
  );
}

