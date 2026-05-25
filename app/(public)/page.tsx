import Link from "next/link";
import Image from "next/image";
import * as Lucide from "lucide-react";
import { ArrowRight, Star, BookOpen } from "lucide-react";
import { getAllCourses, getCategories, getTestimonials } from "@/lib/content";
import { getHomeContent, getSiteSettings, getGlobalFaqs } from "@/lib/site-content";
import { CourseCard } from "@/components/course-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { LeadForm } from "@/components/lead-form";
import { StatsBar } from "@/components/stats-bar";
import { getDisplayCurrency } from "@/lib/geo";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const h = await getHomeContent();
  return {
    title: h.seoTitle ?? undefined,
    description: h.seoDescription ?? undefined,
  };
}

function Icon({ name, className }: { name: string | undefined; className?: string }) {
  const C = (name && (Lucide as any)[name]) || BookOpen;
  return <C className={className} />;
}

export default async function HomePage() {
  const [COURSES, CATEGORIES, TESTIMONIALS, h, s, faqs, currency] = await Promise.all([
    getAllCourses(),
    getCategories(),
    getTestimonials(),
    getHomeContent(),
    getSiteSettings(),
    getGlobalFaqs(),
    getDisplayCurrency(),
  ]);
  const featuredCourses = COURSES.slice(0, 6);
  const heroStats = (h.heroStats as { value: string; label: string }[] | null) || [];
  const whyUsItems = (h.whyUsItems as { icon: string; title: string; body: string }[] | null) || [];
  const accreditationLogos = (s.accreditationLogos as { name: string; logoUrl?: string }[] | null) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="container-tight relative grid lg:grid-cols-2 gap-10 py-16 lg:py-24 items-center">
          <div>
            {h.heroBadgeText && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                {h.heroBadgeText}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5">
              {h.heroHeadline} <span className="text-accent-500">{h.heroHeadlineHighlight}</span> {h.heroHeadlineSuffix}
            </h1>
            <p className="text-lg text-brand-100 mb-7 max-w-xl">{h.heroSubheading}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href={h.heroCtaPrimaryLink} className="btn-accent">
                {h.heroCtaPrimaryText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={h.heroCtaSecondaryLink} className="btn bg-white/10 hover:bg-white/20 border border-white/30 text-white">
                {h.heroCtaSecondaryText}
              </Link>
            </div>
            {heroStats.length > 0 && (
              <div className="grid grid-cols-3 gap-5 max-w-md">
                {heroStats.map((x) => (
                  <div key={x.label} className="border-l-2 border-accent-500 pl-3">
                    <div className="text-2xl font-bold text-white">{x.value}</div>
                    <div className="text-xs text-brand-200">{x.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:pl-8">
            <LeadForm
              variant="card"
              title={h.heroFormTitle}
              subtitle={h.heroFormSubtitle}
              source="home-hero"
            />
          </div>
        </div>
      </section>

      {/* Accreditation strip */}
      {accreditationLogos.length > 0 && (
        <section className="border-y border-ink-100 bg-white">
          <div className="container-tight py-8">
            <div className="text-center text-xs font-semibold uppercase tracking-widest text-ink-500 mb-5">
              {h.accreditationTitle}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ink-400 font-semibold">
              {accreditationLogos.map((l, i) => (
                l.logoUrl
                  ? <img key={i} src={l.logoUrl} alt={l.name} className="h-7 object-contain" />
                  : <span key={i} className="text-lg">{l.name}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="section bg-ink-50/40">
        <div className="container-tight">
          <div className="text-center mb-10">
            <div className="badge mb-3">{h.categoriesBadge}</div>
            <h2 className="h2 mb-3">{h.categoriesTitle}</h2>
            <p className="lead max-w-2xl mx-auto">{h.categoriesSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="card p-5 hover:shadow-card-lg hover:-translate-y-0.5 transition-all group">
                <div className="w-11 h-11 rounded-lg bg-brand-50 grid place-items-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon name={cat.icon || "BookOpen"} className="w-5 h-5" />
                </div>
                <div className="font-semibold text-ink-900 mb-1">{cat.name}</div>
                <div className="text-sm text-ink-500">{cat.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="section">
        <div className="container-tight">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="badge mb-3">{h.coursesBadge}</div>
              <h2 className="h2">{h.coursesTitle}</h2>
            </div>
            <Link href="/courses" className="btn-outline">View All Courses <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((c) => <CourseCard key={c.slug} course={c} currency={currency} />)}
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Why choose us */}
      {whyUsItems.length > 0 && (
        <section className="section">
          <div className="container-tight grid lg:grid-cols-2 gap-12 items-center">
            {h.whyUsImage && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg">
                <Image src={h.whyUsImage} alt="Why MindClick" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            )}
            <div>
              <div className="badge mb-3">{h.whyUsBadge}</div>
              <h2 className="h2 mb-4">{h.whyUsTitle}</h2>
              <p className="lead mb-7">{h.whyUsSubtitle}</p>
              <div className="space-y-4">
                {whyUsItems.map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0"><Icon name={f.icon} className="w-5 h-5" /></div>
                    <div>
                      <div className="font-semibold text-ink-900">{f.title}</div>
                      <div className="text-sm text-ink-600">{f.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="section bg-ink-50/40">
        <div className="container-tight">
          <div className="text-center mb-10">
            <div className="badge mb-3">{h.testimonialsBadge}</div>
            <h2 className="h2 mb-3">{h.testimonialsTitle}</h2>
            <p className="lead">{h.testimonialsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 6).map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <p className="text-ink-700 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-ink-900 text-sm">{t.name}</div>
                    <div className="text-xs text-ink-500">{t.role}{t.company ? `, ${t.company}` : ""}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-tight max-w-3xl">
          <div className="text-center mb-10">
            <div className="badge mb-3">{h.faqBadge}</div>
            <h2 className="h2 mb-3">{h.faqTitle}</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container-tight py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="h2 text-white mb-3">{h.ctaTitle}</h2>
            <p className="text-brand-100 text-lg">{h.ctaSubtitle}</p>
          </div>
          <div className="flex md:justify-end gap-3 flex-wrap">
            <Link href={h.ctaPrimaryLink} className="btn-accent">{h.ctaPrimaryText} <ArrowRight className="w-4 h-4" /></Link>
            <Link href={h.ctaSecondaryLink} className="btn bg-white text-brand-700 hover:bg-brand-50">{h.ctaSecondaryText}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
