"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown, ChevronRight, Menu, Search, X, Phone,
} from "lucide-react";
import * as Lucide from "lucide-react";
import { CurrencySwitcher } from "@/components/currency-switcher";
import { useLearnerAuth } from "@/components/learner-auth-provider";
import { LearnerDropdown } from "@/components/learner-dropdown";

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
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  
  const { isLoggedIn, openModal } = useLearnerAuth();

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
          <div className="relative h-full flex items-center group" onMouseEnter={() => openSoft("courses")} onMouseLeave={closeSoft}>
            <button className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-md text-[14px] font-semibold text-foreground bg-white hover:bg-gray-50 hover:border-primary/30 transition-all shadow-sm">
              <Menu className="w-4 h-4" /> All Courses <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            {openMenu === "courses" && (
              <div className="absolute left-0 top-[calc(100%)] w-[950px] z-50 pt-2">
                <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg border border-gray-200 flex h-[480px] overflow-hidden">
                  
                  {/* Left Column: Categories */}
                  <div className="w-[260px] shrink-0 border-r border-gray-100 flex flex-col bg-white">
                    <div className="px-6 py-4 border-b border-gray-100 font-bold text-[#082032] text-[15px]">
                      Categories
                    </div>
                    <div className="overflow-y-auto flex-1 py-2 custom-scrollbar">
                      {navCategories.map((cat, i) => {
                        const isActive = activeCategorySlug ? activeCategorySlug === cat.slug : i === 0;
                        return (
                          <div 
                            key={cat.slug} 
                            onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                            className={`px-6 py-3.5 text-[13px] font-bold cursor-pointer flex items-center justify-between transition-colors ${isActive ? 'bg-gray-100 text-[#082032]' : 'text-[#082032] hover:bg-gray-50'}`}
                          >
                            <span className="uppercase">{cat.name}</span>
                            {isActive && <ChevronRight className="w-4 h-4" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Middle Column: Courses */}
                  <div className="flex-1 border-r border-gray-100 flex flex-col bg-white">
                    {(() => {
                      const activeCat = activeCategorySlug 
                        ? navCategories.find(c => c.slug === activeCategorySlug) 
                        : navCategories[0];
                      
                      if (!activeCat) return <div className="p-6">No categories found</div>;
                      
                      return (
                        <>
                          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="font-bold text-[#082032] text-[15px] uppercase">
                              {activeCat.name} ({activeCat.courses.length} Courses)
                            </div>
                            <Link href={`/category/${activeCat.slug}`} className="text-[13px] text-[#0a66c2] font-semibold underline hover:text-[#004182]">
                              View all Courses
                            </Link>
                          </div>
                          <div className="overflow-y-auto flex-1 p-6 space-y-6">
                            {activeCat.courses.slice(0, 10).map((c, i) => (
                              <Link key={c.slug} href={`/${c.slug}`} onClick={() => setOpenMenu(null)} className="flex items-start gap-4 group/course">
                                <div className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] text-center leading-none">ITIL</div>
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                                    <h4 className="text-[14px] font-bold text-[#082032] leading-tight group-hover/course:text-primary transition-colors">
                                      {c.title}
                                    </h4>
                                    {i === 0 && <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wide">Popular</span>}
                                    {i === 1 && <span className="bg-[#1c4b79] text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wide">Trending</span>}
                                  </div>
                                  <div className="text-[12px] text-gray-500">
                                    {i % 2 === 0 ? "2 Days" : "Beginner"} | Live Classes
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Right Column: Issuing Bodies */}
                  <div className="w-[280px] shrink-0 bg-white flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100 font-bold text-[#082032] text-[15px]">
                      Credential Issuing Bodies
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-[10px]">PC</span>
                        </div>
                        <div className="text-[13px] font-bold text-[#082032]">PeopleCert ATO</div>
                      </div>
                    </div>
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

          {isLoggedIn ? (
            <LearnerDropdown />
          ) : (
            <button 
              onClick={openModal}
              className="hidden lg:block font-bold text-sm text-foreground hover:text-primary whitespace-nowrap transition-colors"
            >
              Sign In
            </button>
          )}

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

