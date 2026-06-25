"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown, ChevronRight, Menu, Search, X,
} from "lucide-react";
import * as Lucide from "lucide-react";
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
  nav?: {
    aiCourses?: { name: string; href: string }[];
    enterpriseAgile?: { name: string; href: string }[];
    enterpriseProduct?: { name: string; href: string }[];
    resources?: { name: string; href: string; arrow?: boolean }[];
  };
};

export function SiteHeader({
  brandName = "ULearnSystems",
  navCategories = [],
  nav = {},
}: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"courses" | "ai-courses" | "enterprise" | "resources" | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<"agile" | "product" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  
  const { isLoggedIn, openModal } = useLearnerAuth();

  function openSoft(name: "courses" | "ai-courses" | "enterprise" | "resources") {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  }
  function closeSoft() {
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu(null);
      setOpenSubMenu(null);
    }, 120);
  }

  useEffect(() => {
    setOpenMenu(null);
    setOpenSubMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8fcfc] border-b border-gray-200 font-sans transition-all duration-300">
      {/* Top Banner (Promo Sale) */}
      <div className="bg-gradient-to-r from-[#082032] via-[#0d5c5c] to-[#082032] text-white text-[13px] py-2.5 relative overflow-hidden hidden md:block shadow-md">
        {/* Subtle moving background overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_5s_linear_infinite]" style={{ transform: "skewX(-20deg)" }} />

        <div className="container-tight flex items-center justify-between relative z-10 font-sans group cursor-pointer">
          <div className="flex items-center gap-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-1 font-black text-[14px] rounded-lg shadow-sm flex items-center gap-2">
              <span className="animate-pulse text-amber-400">⚡</span> FLASH <span className="font-medium text-xs uppercase text-white/80">SALE</span>
            </span>
            <span className="font-bold text-white/90 text-[14px] tracking-wide">Limited Time Offer</span>
          </div>
          
          <div className="font-black text-lg flex items-center gap-2 text-white uppercase tracking-wider drop-shadow-sm">
            Master New Skills with ULearnSystems 
            <span className="text-2xl ml-1 leading-none font-bold group-hover:translate-x-2 transition-transform duration-300">&#8594;</span>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-1.5 border border-white/10">
              <div className="text-right">
                <span className="block text-white/70 text-[9px] font-bold uppercase tracking-widest mb-0.5 leading-none">USE CODE</span>
                <span className="block text-[#1FA8A8] font-black text-[12px] leading-none">FLAT 10% OFF</span>
              </div>
              <span className="text-amber-400 font-black text-[16px] tracking-widest bg-amber-400/10 px-2 py-0.5 rounded ml-1">
                ULEARN10
              </span>
            </div>
            <span className="font-bold text-white/80 text-[13px] uppercase tracking-wider">Ends Soon!</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-tight flex items-center h-[72px] justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt={brandName} className="h-[44px] w-auto object-contain" />
        </Link>

        {/* All Courses Dropdown & Search (Desktop) */}
        <div className="hidden lg:flex items-center ml-6 flex-1">
          <div className="relative h-[42px] flex items-center group" onMouseEnter={() => openSoft("courses")} onMouseLeave={closeSoft}>
            <button aria-haspopup="true" aria-expanded={openMenu === "courses"} onClick={() => setOpenMenu(openMenu === "courses" ? null : "courses")} className="h-full flex items-center justify-between gap-3 px-4 border border-[#CBD5E1] rounded-[6px] text-[14px] font-bold text-[#1E293B] bg-white transition-all w-[150px]">
              <span className="flex items-center gap-2.5"><Menu className="w-4 h-4 text-[#64748b]" /> All Courses</span> <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
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

          <form action="/courses" method="get" className="relative ml-3 w-full max-w-[380px] h-[42px]">
            <Search className="w-4 h-4 text-[#7E93A8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text" name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What you want to learn today?"
              className="w-full h-full pl-[38px] pr-4 py-2 border border-[#CBD5E1] rounded-[6px] text-[14px] bg-white focus:outline-none focus:border-[#94A3B8] transition-all text-[#1E293B] placeholder-[#94A3B8]"
            />
          </form>
        </div>

        {/* Right Navigation */}
        <nav className="hidden xl:flex items-center h-full ml-auto">
          
          {/* AI Courses */}
          <div className={`relative flex items-center h-full px-4 border-b-2 transition-colors ${openMenu === "ai-courses" ? "bg-gray-50 border-[#1FA8A8]" : "border-transparent"}`} onMouseEnter={() => openSoft("ai-courses")} onMouseLeave={closeSoft}>
            <Link href="/ai-courses" className="flex items-center gap-1 text-[14px] font-semibold text-[#082032] hover:text-[#1FA8A8] transition-colors">
              AI Courses <Lucide.ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === "ai-courses" ? "text-[#1FA8A8] rotate-180" : "text-[#94A3B8]"}`} strokeWidth={2} />
            </Link>
            {openMenu === "ai-courses" && (
              <div className="absolute left-0 top-[72px] pt-1 z-50">
                <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg w-[320px] overflow-hidden py-2 flex flex-col">
                  {(nav.aiCourses ?? []).map((link, i) => (
                    <Link key={i} href={link.href} className="px-5 py-3 text-[13px] font-medium text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8] transition-colors border-b border-gray-50 last:border-0">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center h-full px-4 border-b-2 border-transparent">
            <Link href="/self-paced" className="flex items-center gap-1 text-[14px] font-semibold text-[#082032] hover:text-[#1FA8A8] transition-colors">
              Self-Paced
            </Link>
          </div>

          {/* Enterprise */}
          <div className={`relative flex items-center h-full px-4 border-b-2 transition-colors ${openMenu === "enterprise" ? "bg-gray-50 border-[#1FA8A8]" : "border-transparent"}`} onMouseEnter={() => openSoft("enterprise")} onMouseLeave={closeSoft}>
            <Link href="/corporate-training" className="flex items-center gap-1 text-[14px] font-semibold text-[#082032] hover:text-[#1FA8A8] transition-colors">
              Enterprise <Lucide.ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === "enterprise" ? "text-[#1FA8A8] rotate-180" : "text-[#94A3B8]"}`} strokeWidth={2} />
            </Link>
            {openMenu === "enterprise" && (
              <div className="absolute left-0 top-[72px] pt-1 z-50">
                <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg w-[260px] py-2 flex flex-col">
                  <Link href="/corporate-training" className="px-5 py-3 text-[13px] font-medium text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8] transition-colors border-b border-gray-50" onMouseEnter={() => setOpenSubMenu(null)}>
                    Corporate Training
                  </Link>
                  
                  <div className="relative group" onMouseEnter={() => setOpenSubMenu("agile")}>
                    <Link href="/agile-solutions" className={`px-5 py-3 text-[13px] font-medium transition-colors border-b border-gray-50 flex justify-between items-center ${openSubMenu === "agile" ? "bg-[#082032] text-white" : "text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8]"}`}>
                      Agile Solutions 
                      {openSubMenu === "agile" ? <Lucide.ChevronLeft className="w-3.5 h-3.5 text-white" /> : <Lucide.ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1FA8A8]" />}
                    </Link>
                    {openSubMenu === "agile" && (
                      <div className="absolute left-[-270px] top-[-10px] w-[270px] pr-2">
                        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg overflow-hidden py-2 flex flex-col">
                          {(nav.enterpriseAgile ?? []).map((item, idx) => (
                            <Link key={idx} href={item.href} className="px-5 py-3 text-[13px] font-medium text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8] transition-colors border-b border-gray-50 last:border-0">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative group" onMouseEnter={() => setOpenSubMenu("product")}>
                    <Link href="/product-building" className={`px-5 py-3 text-[13px] font-medium transition-colors flex justify-between items-center ${openSubMenu === "product" ? "bg-[#082032] text-white" : "text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8]"}`}>
                      Product Building 
                      {openSubMenu === "product" ? <Lucide.ChevronLeft className="w-3.5 h-3.5 text-white" /> : <Lucide.ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1FA8A8]" />}
                    </Link>
                    {openSubMenu === "product" && (
                      <div className="absolute left-[-270px] top-[-10px] w-[270px] pr-2">
                        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg overflow-hidden py-2 flex flex-col">
                          {(nav.enterpriseProduct ?? []).map((item, idx) => (
                            <Link key={idx} href={item.href} className="px-5 py-3 text-[13px] font-medium text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8] transition-colors border-b border-gray-50 last:border-0">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>

          <div className="flex items-center h-full px-4 border-b-2 border-transparent">
            <Link href="/refer-earn" className="flex items-center gap-1 text-[14px] font-semibold text-[#082032] hover:text-[#1FA8A8] transition-colors">
              Refer & Earn
            </Link>
          </div>

          {/* Resources */}
          <div className={`relative flex items-center h-full px-4 border-b-2 transition-colors ${openMenu === "resources" ? "bg-gray-50 border-[#1FA8A8]" : "border-transparent"}`} onMouseEnter={() => openSoft("resources")} onMouseLeave={closeSoft}>
            <Link href="/resources" className="flex items-center gap-1 text-[14px] font-semibold text-[#082032] hover:text-[#1FA8A8] transition-colors">
              Resources <Lucide.ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === "resources" ? "text-[#1FA8A8] rotate-180" : "text-[#94A3B8]"}`} strokeWidth={2} />
            </Link>
            {openMenu === "resources" && (
              <div className="absolute right-0 top-[72px] pt-1 z-50">
                <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg w-[260px] overflow-hidden py-2 flex flex-col">
                  {(nav.resources ?? []).map((link, i) => (
                    <Link key={i} href={link.href} className="px-5 py-3 text-[13px] font-medium text-[#082032] hover:bg-gray-50 hover:text-[#1FA8A8] transition-colors border-b border-gray-50 last:border-0 flex justify-between items-center group">
                      {link.name}
                      {link.arrow && <Lucide.ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1FA8A8]" />}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 ml-6">
          {isLoggedIn ? (
            <LearnerDropdown />
          ) : (
            <button 
              onClick={openModal}
              className="hidden lg:block font-bold text-[14px] text-white bg-[#0B1221] hover:bg-black h-[42px] px-6 rounded-[6px] transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
          )}

          <button aria-label="Cart (0 items)" className="relative grid h-11 w-11 place-items-center text-foreground/80 hover:text-primary transition-colors bg-secondary rounded-full lg:hidden">
            <Lucide.ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <button aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)} className="lg:hidden grid h-11 w-11 place-items-center text-foreground/80 hover:text-primary bg-secondary rounded-full">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-background lg:hidden overflow-y-auto">
          <div className="p-4 flex items-center justify-between border-b border-border/50 bg-card">
            <img src="/logo.png" alt={brandName} className="h-20 w-auto object-contain" />
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="grid h-11 w-11 place-items-center bg-secondary rounded-full text-foreground/80"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-6 space-y-1">
            <form action="/courses" method="get" className="relative mb-6">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" name="q" aria-label="Search courses" placeholder="What do you want to learn today?" className="w-full pl-11 pr-4 py-3.5 border border-border/50 rounded-full text-base bg-secondary focus:outline-none focus:border-primary" />
            </form>
            {[
              { href: "/courses", label: "All Courses" },
              { href: "/ai-courses", label: "AI Courses" },
              { href: "/combo-courses", label: "Combo Courses", isNew: true },
              { href: "/self-paced", label: "Self-Paced" },
              { href: "/corporate-training", label: "Enterprise" },
              { href: "/refer-earn", label: "Refer & Earn" },
              { href: "/resources", label: "Resources" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="min-h-[52px] py-4 font-semibold text-foreground border-b border-border/50 flex justify-between items-center">
                <span className="flex items-center gap-2">{item.label}{item.isNew && <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">New</span>}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
            {!isLoggedIn && (
              <button onClick={() => { setMobileOpen(false); openModal(); }} className="btn-primary mt-6 w-full">Sign In</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

