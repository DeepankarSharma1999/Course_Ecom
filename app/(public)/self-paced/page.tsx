import { getAllCourses, getCategories } from "@/lib/content";
import { getDisplayCurrency } from "@/lib/geo";
import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { TrustedCompanies } from "@/components/public/home/trusted-companies";
import { DynamicIcon } from "@/components/public/dynamic-icon";
import { getPageContent } from "@/lib/page-content";

const CourseGrid = dynamic(() => import("@/components/public/home/course-grid").then(m => m.CourseGrid));

const SLUG = "self-paced";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: "/self-paced" } };
}

export default async function SelfPacedPage() {
  const [COURSES, CATEGORIES, currency, c] = await Promise.all([
    getAllCourses(),
    getCategories(),
    getDisplayCurrency(),
    getPageContent(SLUG),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#082032] via-[#0b2b44] to-brand-950 text-white pb-20 pt-24 md:pt-32">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-300 via-transparent to-transparent"></div>
        <div className="container-tight relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-sm font-semibold text-brand-300 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
            {c.heroBadge}
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
            {c.heroHeading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-teal-100">{c.heroHeadingHighlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
            {c.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#explore-courses" className="btn-primary px-8 py-4 text-lg">
              {c.heroCtaText}
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <div className="bg-brand-50/50 py-10">
        <div className="container-tight text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">{c.trustedLabel}</p>
          <TrustedCompanies />
        </div>
      </div>

      {/* Why Self-Paced Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{c.whyTitle}</h2>
            <p className="text-lg text-slate-600">
              {c.whySubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {c.features.map((feature: any, idx: number) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-brand-100/50 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <DynamicIcon name={feature.icon} className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Explorer */}
      <section id="explore-courses" className="scroll-mt-20">
        <div className="bg-brand-950 py-16 text-white">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">{c.browseTitle}</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">{c.browseSubtitle}</p>
          </div>
        </div>
        <CourseGrid courses={COURSES} categories={CATEGORIES} currency={currency} />
      </section>
    </>
  );
}
