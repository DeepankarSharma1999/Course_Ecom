"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { CATEGORIES, COURSES } from "@/lib/seed-data";
import { CurrencySwitcher } from "@/components/currency-switcher";

export function SiteHeader({
  currency = "INR",
  brandName = "Course_Ecom",
  tagline = "Training & Certifications",
  phone = "+91 80 4710 6633",
  topBarMessages = [],
}: {
  currency?: string;
  brandName?: string;
  tagline?: string;
  phone?: string;
  topBarMessages?: string[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-ink-100">
      <div className="bg-brand-950 text-brand-100 text-xs">
        <div className="container-tight flex items-center justify-between py-2">
          <div className="hidden sm:flex items-center gap-4">
            {topBarMessages.map((m, i) => (
              <span key={i} className="flex items-center gap-4">
                {i > 0 && <span className="text-brand-300">|</span>}
                <span>{m}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href={`tel:${phone}`} className="hidden md:inline-flex items-center gap-1 hover:text-white">
              <Phone className="w-3 h-3" /> {phone}
            </a>
            <Link href="/corporate" className="hover:text-white">Corporate Training</Link>
            <CurrencySwitcher current={currency} />
            <Link href="/admin" className="hover:text-white">Login</Link>
          </div>
        </div>
      </div>

      <div className="container-tight flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">{brandName.charAt(0)}</div>
          <div className="leading-tight">
            <div className="font-bold text-lg text-ink-900">{brandName}</div>
            <div className="text-[10px] uppercase tracking-widest text-brand-600">{tagline}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-ink-700">
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 hover:text-brand-600">
              All Courses <ChevronDown className="w-4 h-4" />
            </button>
            {megaOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[860px]">
                <div className="bg-white border border-ink-100 rounded-2xl shadow-card-lg p-6 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs font-bold uppercase text-ink-500 mb-3">Categories</div>
                    <ul className="space-y-2">
                      {CATEGORIES.map((cat) => (
                        <li key={cat.slug}>
                          <Link href={`/category/${cat.slug}`} className="block text-sm text-ink-700 hover:text-brand-600">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-bold uppercase text-ink-500 mb-3">Top Courses</div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {COURSES.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/${c.slug}`} className="block text-sm text-ink-700 hover:text-brand-600">
                            {c.shortTitle}
                          </Link>
                        </li>
                      ))}
                      <li><Link href="/courses" className="block text-sm font-semibold text-brand-600 hover:underline">View all courses →</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/category/safe" className="px-3 py-2 hover:text-brand-600">SAFe</Link>
          <Link href="/category/agile-scrum" className="px-3 py-2 hover:text-brand-600">Agile</Link>
          <Link href="/category/project-management" className="px-3 py-2 hover:text-brand-600">PM</Link>
          <Link href="/category/devops" className="px-3 py-2 hover:text-brand-600">DevOps</Link>
          <Link href="/trainers" className="px-3 py-2 hover:text-brand-600">Trainers</Link>
          <Link href="/corporate" className="px-3 py-2 hover:text-brand-600">Corporate</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden md:inline-flex p-2 text-ink-600 hover:text-brand-600" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/enquire" className="btn-primary hidden md:inline-flex">Enquire Now</Link>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-ink-700" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <div className="container-tight py-4 flex items-center justify-between border-b border-ink-100">
            <div className="font-bold text-lg">Course_Ecom</div>
            <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="w-6 h-6" /></button>
          </div>
          <div className="container-tight py-6 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase text-ink-500 mb-2">Categories</div>
              <ul className="space-y-1">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}><Link href={`/category/${c.slug}`} onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-ink-500 mb-2">Top Courses</div>
              <ul className="space-y-1">
                {COURSES.map((c) => (
                  <li key={c.slug}><Link href={`/${c.slug}`} onClick={() => setMobileOpen(false)} className="block py-2 text-ink-800">{c.shortTitle}</Link></li>
                ))}
              </ul>
            </div>
            <Link href="/enquire" onClick={() => setMobileOpen(false)} className="btn-primary w-full">Enquire Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
