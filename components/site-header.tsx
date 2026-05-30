"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Award, BookOpen, ChevronDown, ChevronRight, Download, FileText,
  GitCompare, GraduationCap, Info, Menu, MessageCircle, Phone, Search, X,
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
  const C = (name && (Lucide as any)[name]) || BookOpen;
  return <C className={className} />;
}

function CategoryMegaMenu({
  categories,
  featured,
  onNavigate,
}: {
  categories: NavCategory[];
  featured: FeaturedCourse[];
  onNavigate: () => void;
}) {
  const [hoveredCat, setHoveredCat] = useState<string | null>(categories[0]?.slug ?? null);
  const active = categories.find((c) => c.slug === hoveredCat) || categories[0];

  return (
    <div className="bg-white border border-ink-100 rounded-2xl shadow-card-lg w-[920px] overflow-hidden">
      <div className="grid grid-cols-12">
        {/* Categories list */}
        <div className="col-span-4 bg-ink-50/60 py-2 max-h-[520px] overflow-y-auto">
          {categories.map((cat) => {
            const isActive = active?.slug === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onMouseEnter={() => setHoveredCat(cat.slug)}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${isActive ? "bg-white text-brand-700 font-semibold border-l-2 border-brand-600" : "text-ink-700 hover:bg-white border-l-2 border-transparent"
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg grid place-items-center ${isActive ? "bg-brand-100 text-brand-700" : "bg-white text-ink-500"}`}>
                  <Icon name={cat.icon} className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{cat.name}</div>
                </div>
                <span className="text-xs text-ink-400">{cat.courses.length}</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
              </Link>
            );
          })}
        </div>

        {/* Active category courses */}
        <div className="col-span-5 p-6 border-r border-ink-100">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-ink-500">{active?.name}</div>
              {active?.tagline && <div className="text-sm text-ink-700">{active.tagline}</div>}
            </div>
            <Link href={`/category/${active?.slug}`} onClick={onNavigate} className="text-xs text-brand-600 hover:underline">
              View all →
            </Link>
          </div>
          <ul className="space-y-1.5">
            {active?.courses.slice(0, 12).map((course) => (
              <li key={course.slug}>
                <Link
                  href={`/${course.slug}`}
                  onClick={onNavigate}
                  className="block py-1.5 px-2 -mx-2 text-sm text-ink-700 hover:text-brand-600 hover:bg-brand-50/40 rounded-md"
                >
                  {course.title}
                </Link>
              </li>
            ))}
            {!active?.courses.length && <li className="text-sm text-ink-400">Coming soon.</li>}
          </ul>
        </div>

        {/* Featured */}
        <div className="col-span-3 p-6 bg-gradient-to-br from-brand-50/40 to-white">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-3">Popular Right Now</div>
          <ul className="space-y-2 mb-5">
            {featured.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  onClick={onNavigate}
                  className="block group"
                >
                  <div className="text-sm font-medium text-ink-800 group-hover:text-brand-700 leading-snug">{c.title}</div>
                  <div className="text-[11px] text-ink-500">{c.category}</div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/courses"
            onClick={onNavigate}
            className="block text-center bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-lg"
          >
            Browse all courses
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourcesDropdown({ onNavigate }: { onNavigate: () => void }) {
  const items = [
    { href: "/compare", icon: GitCompare, label: "Compare Courses", hint: "Side-by-side comparison" },
    { href: "/trainers", icon: GraduationCap, label: "Our Trainers", hint: "Meet our accredited experts" },
    { href: "/about", icon: Info, label: "About Us", hint: "Who we are" },
    { href: "/enquire", icon: MessageCircle, label: "Contact Sales", hint: "Talk to an advisor" },
  ];
  return (
    <div className="bg-white border border-ink-100 rounded-2xl shadow-card-lg w-72 p-2 overflow-hidden">
      {items.map((it) => {
        const I = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            onClick={onNavigate}
            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-ink-50"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0">
              <I className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-ink-900">{it.label}</div>
              <div className="text-xs text-ink-500">{it.hint}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function SiteHeader({
  currency = "INR",
  brandName = "Ulearnsystems",
  logoUrl = null,
  tagline = "Training & Certifications",
  phone = "",
  whatsappNumber = null,
  topBarMessages = [],
  navCategories = [],
  featuredCourses = [],
}: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"courses" | "resources" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimer = useRef<number | undefined>(undefined);

  function openSoft(name: "courses" | "resources") {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  }
  function closeSoft() {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  }

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors ${isActive(href) ? "text-brand-700" : "text-ink-700 hover:text-brand-600"
        }`}
    >
      {label}
      {isActive(href) && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand-600 rounded-full" />}
    </Link>
  );

  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hi ${brandName}, I'd like to know more about your courses.`)}`
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-ink-100">
      {/* Top bar */}
      <div className="bg-brand-950 text-brand-100 text-xs">
        <div className="container-tight flex items-center justify-between py-2 gap-4">
          <div className="hidden md:flex items-center gap-4 min-w-0">
            {topBarMessages.slice(0, 2).map((m, i) => (
              <span key={i} className="flex items-center gap-4 whitespace-nowrap">
                {i > 0 && <span className="text-brand-400">·</span>}
                <span className="truncate">{m}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto whitespace-nowrap">
            {phone && (
              <a href={`tel:${phone}`} className="hidden lg:inline-flex items-center gap-1.5 hover:text-white">
                <Phone className="w-3 h-3" /> {phone}
              </a>
            )}
            {waHref && (
              <a href={waHref} target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-1.5 hover:text-white">
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </a>
            )}
            <CurrencySwitcher current={currency} />
            <Link href="/admin" className="hover:text-white">Login</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-tight flex items-center gap-3 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-12 w-auto object-contain" />
          ) : (
            <>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">
                {brandName.charAt(0)}
              </div>
              <div className="leading-tight">
                <div className="font-bold text-lg text-ink-900">{brandName}</div>
                <div className="text-[10px] uppercase tracking-widest text-brand-600">{tagline}</div>
              </div>
            </>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-0 ml-6">
          {/* All Courses mega-menu */}
          <div className="relative" onMouseEnter={() => openSoft("courses")} onMouseLeave={closeSoft}>
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${openMenu === "courses" || pathname.startsWith("/courses") || pathname.startsWith("/category")
                  ? "text-brand-700"
                  : "text-ink-700 hover:text-brand-600"
                }`}
              onClick={() => setOpenMenu(openMenu === "courses" ? null : "courses")}
              aria-haspopup="true"
              aria-expanded={openMenu === "courses"}
            >
              All Courses <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === "courses" ? "rotate-180" : ""}`} />
            </button>
            {openMenu === "courses" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2">
                <CategoryMegaMenu
                  categories={navCategories}
                  featured={featuredCourses}
                  onNavigate={() => setOpenMenu(null)}
                />
              </div>
            )}
          </div>

          {navLink("/courses", "Schedules")}
          {navLink("/trainers", "Trainers")}
          {navLink("/corporate", "For Business")}

          {/* Resources dropdown */}
          <div className="relative" onMouseEnter={() => openSoft("resources")} onMouseLeave={closeSoft}>
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${openMenu === "resources" ? "text-brand-700" : "text-ink-700 hover:text-brand-600"
                }`}
              onClick={() => setOpenMenu(openMenu === "resources" ? null : "resources")}
              aria-haspopup="true"
              aria-expanded={openMenu === "resources"}
            >
              Resources <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === "resources" ? "rotate-180" : ""}`} />
            </button>
            {openMenu === "resources" && (
              <div className="absolute right-0 top-full pt-2">
                <ResourcesDropdown onNavigate={() => setOpenMenu(null)} />
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 text-ink-600 hover:text-brand-600 rounded-lg hover:bg-ink-50"
            aria-label="Search courses"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/enquire" className="btn-primary hidden md:inline-flex">Enquire Now</Link>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-ink-700" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute top-full inset-x-0 bg-white border-b border-ink-200 shadow-card-lg">
          <div className="container-tight py-4">
            <form action="/courses" method="get" className="flex items-center gap-3">
              <Search className="w-5 h-5 text-ink-400" />
              <input
                type="text" name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certifications, e.g. SAFe Scrum Master…"
                className="flex-1 text-base bg-transparent outline-none placeholder:text-ink-400"
                autoFocus
              />
              <button type="submit" className="btn-primary">Search</button>
              <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 text-ink-500 hover:text-ink-800" aria-label="Close search">
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="text-ink-500">Try:</span>
              {featuredCourses.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="px-2.5 py-1 rounded-full bg-ink-100 hover:bg-brand-50 hover:text-brand-700 text-ink-700">
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <div className="container-tight py-4 flex items-center justify-between border-b border-ink-100">
            <Link href="/" onClick={() => setMobileOpen(false)} className="font-bold text-lg">{brandName}</Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="w-6 h-6" /></button>
          </div>
          <div className="container-tight py-6 space-y-6">
            <Link href="/enquire" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">Enquire Now</Link>

            {navCategories.map((cat) => (
              <details key={cat.slug} className="border-b border-ink-100 pb-3">
                <summary className="flex items-center justify-between py-2 font-semibold text-ink-900 cursor-pointer list-none">
                  <span className="flex items-center gap-2">
                    <Icon name={cat.icon} className="w-4 h-4 text-brand-600" /> {cat.name}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </summary>
                <ul className="pl-6 pt-1 space-y-1">
                  {cat.courses.map((course) => (
                    <li key={course.slug}>
                      <Link href={`/${course.slug}`} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-ink-700">
                        {course.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-brand-600 font-medium">
                      View all in {cat.name} →
                    </Link>
                  </li>
                </ul>
              </details>
            ))}

            <div className="space-y-1 pt-2">
              <Link href="/courses" onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800 font-medium">All Courses & Schedules</Link>
              <Link href="/trainers" onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800 font-medium">Trainers</Link>
              <Link href="/corporate" onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800 font-medium">For Business</Link>
              <Link href="/compare" onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800 font-medium">Compare Courses</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800 font-medium">About Us</Link>
            </div>

            <div className="pt-4 border-t border-ink-100 space-y-3 text-sm">
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-2 text-ink-700">
                  <Phone className="w-4 h-4 text-brand-600" /> {phone}
                </a>
              )}
              {waHref && (
                <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-600">
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
