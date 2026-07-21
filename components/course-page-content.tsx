import Link from "next/link";
import Image from "next/image";
import {
  Award, BookOpen, Calendar, CheckCircle2, Clock, FileCheck, Headphones, Repeat,
  Star, Users, ArrowRight, MapPin, Globe, Tag, AlarmClock, Shield,
} from "lucide-react";
import * as Lucide from "lucide-react";
import { type CourseContent, type FaqItem, findCity, findCountry, CITIES_IN, COURSES } from "@/lib/seed-data";
import type { CourseSchedule } from "@/lib/content";
import { LeadForm } from "@/components/lead-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { LeadModalButton } from "@/components/lead-modal-button";
import { type CurrencyCode, type CurrencyConfig, formatInCurrency } from "@/lib/currency";
import { AccreditationSection } from "@/components/course-page/accreditation-section";
import { DemandSection } from "@/components/course-page/demand-section";
import { CertificateSection } from "@/components/course-page/certificate-section";
import { ReviewsSection } from "@/components/course-page/reviews-section";
import { InstructorsSection } from "@/components/course-page/instructors-section";
import { CurriculumSection } from "@/components/course-page/curriculum-section";
import { FaqSection } from "@/components/course-page/faq-section";
import { isSectionHidden, type CourseSectionKey } from "@/lib/course-sections";
import { baseCourseTitle } from "@/lib/utils";
import { AdvisorBanner } from "@/components/course-page/advisor-banner";
import { ArticlesSection } from "@/components/course-page/articles-section";
import { SchedulesSection } from "@/components/course-page/schedules-section";
import { RelatedCoursesSection } from "@/components/course-page/related-courses-section";

// Hosts whitelisted in next.config.mjs remotePatterns; local paths always optimize.
function isOptimizableImage(src?: string) {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    return ["images.unsplash.com", "images.pexels.com", "cdn.jsdelivr.net"].includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });
}

export function CoursePageContent({
  course,
  schedules = [],
  countrySlug,
  citySlug,
  countryName: countryNameProp,
  cityName: cityNameProp,
  cities,
  currency = "USD",
  currencies,
}: {
  course: CourseContent;
  schedules?: CourseSchedule[];
  countrySlug?: string;
  citySlug?: string;
  countryName?: string;
  cityName?: string;
  cities?: { slug: string; name: string }[];
  currency?: CurrencyCode;
  currencies?: CurrencyConfig[];
}) {
  const format = (usd: number) => formatInCurrency(usd, currency, currencies);
  // Prefer resolved names/cities passed by the server page (DB-backed); fall back
  // to the static seed list for the bare /[course] page which passes none.
  const countryName = countryNameProp ?? (countrySlug ? findCountry(countrySlug)?.name : undefined);
  const cityName = cityNameProp ?? (citySlug ? findCity(citySlug)?.name : undefined);
  const otherCities = cities ?? CITIES_IN;
  const locationLabel = cityName && countryName ? `${cityName}, ${countryName}` : countryName;

  const show = (k: CourseSectionKey) => !isSectionHidden(course.hiddenSections, k);

  // Derive from the full `title` — `shortTitle` was truncated to 50 chars at seed
  // time ("...(PSM I) Certif"), so it can't be cleanly de-suffixed.
  const baseTitle = baseCourseTitle(course.title);
  // Location for titles: city if we have one, else the country (country pages),
  // else nothing (bare /[course] page).
  const locationName = cityName ?? countryName;
  const heroTitle = locationName
    ? `${baseTitle} Certification Training in ${locationName}`
    : `${baseTitle} Certification Training`;
  const breadcrumbLabel = locationName ? `${baseTitle} Training in ${locationName}` : baseTitle;
  const featuresHeading = locationName
    ? `Key Features of ${baseTitle} Training in ${locationName}`
    : `Key Features of ${baseTitle} Certification Training`;

  const nextBatch = schedules[0];
  const nextBatchPrice = nextBatch ? (nextBatch.priceUsd || course.basePriceUsd) : course.basePriceUsd;

  // Hero bullets come from the course's own keyFeatures (FIX-02) — the old
  // hardcoded list claimed "16 PDUs", exam fees etc. on every course.
  const heroBullets = (course.keyFeatures ?? []).slice(0, 5);

  return (
    <div className="bg-[#ffffff] min-h-screen">
      {/* Light Hero Section */}
      <section className="bg-[#fcfdfd] pt-8 pb-16 relative border-b border-gray-100">
        <div className="container-tight relative z-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 text-[12px] text-gray-500 mb-6 items-center font-medium">
            <Link href="/" className="hover:text-[#082032] transition-colors">Home</Link>
            <span className="text-gray-300">›</span>
            <Link href={`/category/${course.category.slug}`} className="hover:text-[#082032] transition-colors">{course.category.name}</Link>
            <span className="text-gray-300">›</span>
            {countryName && (
              <>
                <Link href={`/${countrySlug}`} className="hover:text-[#082032] transition-colors">{countryName}</Link>
                <span className="text-gray-300">›</span>
              </>
            )}
            <span className="text-gray-500 line-clamp-1">{breadcrumbLabel}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Content */}
            <div className="flex-1 max-w-3xl overflow-hidden">
              <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3 break-words">
                {baseTitle} CERTIFICATION TRAINING
              </div>

              <h1 className="text-3xl md:text-[42px] font-bold leading-[1.2] mb-4 text-[#082032]">
                {heroTitle}
              </h1>
              
              <p className="text-[18px] text-[#475569] leading-relaxed mb-6 font-medium">
                {cityName ? `${course.subtitle} Join ${cityName}'s leading certification training provider.` : course.subtitle}
              </p>

              {/* Facts Row — real course attributes only (FIX-02) */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-[13px] font-bold text-[#082032]">
                {course.durationLabel && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0E7C7C]" />
                    <span>{course.durationLabel}</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0E7C7C]" />
                    <span>{course.level}</span>
                  </div>
                )}
                {course.examIncluded && (
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#0E7C7C]" />
                    <span>Exam Included</span>
                  </div>
                )}
              </div>

              {/* Bullet Points — per-course keyFeatures; nothing renders when unset */}
              {heroBullets.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {heroBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-[#475569] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{bullet.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-4 items-center">
                <a href="#schedules" className="h-12 px-8 bg-transparent border-2 border-[#082032] hover:bg-gray-50 text-[#082032] font-bold rounded-[4px] flex items-center gap-2 transition-colors">
                  View Schedules
                </a>
                <LeadModalButton
                  courseSlug={course.slug}
                  source={`brochure-${course.slug}`}
                  title="Get the Course Brochure"
                  subtitle="Enter your details — we'll send you the full curriculum, pricing and upcoming batches."
                  ctaLabel="Send me the brochure"
                  brochure
                  className="h-12 px-8 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] transition-colors flex items-center gap-2"
                >
                  <Lucide.Download className="w-4 h-4" /> Download Brochure
                </LeadModalButton>
              </div>

              <div className="mt-4 text-[13px] text-gray-500 font-medium">
                Want to Train Your Team?{" "}
                <LeadModalButton
                  courseSlug={course.slug}
                  source={`quote-${course.slug}`}
                  title={`Get a Quote for ${course.shortTitle}`}
                  subtitle="Tell us about your team and we'll come back with pricing for a private or group cohort."
                  ctaLabel="Request a quote"
                  className="text-[#0E7C7C] hover:underline font-bold"
                >
                  Get a Quote
                </LeadModalButton>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[480px] shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative bg-gray-100 aspect-[4/3] flex items-center justify-center border border-gray-200">
                <div className="absolute inset-0 bg-[#082032]/5 z-10"></div>
                {/* next/image (priority) for local/known hosts — the page's LCP element (FIX-08);
                    raw img fallback because course.heroImage is admin free-text and
                    next/image throws on unconfigured hosts. */}
                {isOptimizableImage(course.heroImage) ? (
                  <Image src={course.heroImage} alt={course.title} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.heroImage} alt={course.title} loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute top-4 right-4 bg-white rounded-lg px-2 py-1 shadow text-[10px] font-bold flex items-center gap-1 z-20">
                  <Award className="w-3 h-3 text-yellow-500" /> Global Certification
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between px-4 py-3 bg-[#fff9eb] border border-[#fde68a] rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[8px] font-bold border border-gray-200">LTP</div>
                  <span className="text-[12px] font-bold text-[#92400e]">Licensed Training Partner</span>
                </div>
                <button aria-label="Share this course" className="text-gray-500 hover:text-gray-800">
                  <Lucide.Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Secondary Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] w-full">
        <div className="container-tight flex items-center justify-between gap-2">
          <nav className="flex items-center overflow-x-auto hide-scrollbar flex-1 min-w-0">
            {[
              { id: "overview", label: "Overview" },
              { id: "curriculum", label: "Curriculum" },
              { id: "schedules", label: "Schedules" },
              { id: "faq", label: "FAQ" },
            ].filter((link) => show(link.id as CourseSectionKey)).map((link, i) => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className={`px-4 md:px-5 py-4 text-[13px] md:text-[14px] font-bold whitespace-nowrap transition-colors border-b-[3px] ${i === 0 ? "text-[#0E7C7C] border-[#1FA8A8]" : "text-gray-600 hover:text-[#0E7C7C] border-transparent hover:border-[#1FA8A8]"}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Mobile Enquire CTA (only visible on mobile sticky) */}
          <div className="lg:hidden shrink-0 py-2 pl-2">
            <a href="#enquire" className="px-4 py-2 bg-[#082032] text-white text-[12px] font-bold rounded-[4px] whitespace-nowrap">
              Enroll
            </a>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="container-tight py-10 flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="flex-1 space-y-16 min-w-0 w-full max-w-full overflow-x-hidden">

          {/* Overview — per-course SEO content (HTML stored in course.description). */}
          {show("overview") && course.description && course.description.trim().startsWith("<") && (
            <section id="overview" className="scroll-mt-24">
              <div
                className="course-prose max-w-none"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </section>
          )}

          {/* Certificate Section */}
          {show("certificate") && <CertificateSection course={course} />}

          {/* Accreditation / LTP Section */}
          {show("accreditation") && <AccreditationSection course={course} />}

          {/* Reviews */}
          {show("reviews") && <ReviewsSection course={course} />}

          {/* Instructors */}
          {/* Instructors section intentionally not rendered: trainer names are not shown on public pages (only the homepage trainers strip remains). */}

          {/* Curriculum Accordion — per-course modules (generator fills course.curriculum) */}
          {show("curriculum") && <CurriculumSection course={course} />}

          {/* Demand & Roles — industry-recognised job roles derived per course */}
          {show("demand") && <DemandSection course={course} />}

          {/* Schedules Table — real upcoming DB batches */}
          {show("schedules") && <SchedulesSection schedules={schedules} fallbackPriceUsd={course.basePriceUsd} courseSlug={course.slug} />}

          {/* Advisor Banner */}
          <AdvisorBanner courseSlug={course.slug} countrySlug={countrySlug} citySlug={citySlug} />

          {/* Articles Section */}
          {show("articles") && <ArticlesSection course={course} />}

          {/* FAQ */}
          {show("faq") && <FaqSection faqs={course.faqs} shortTitle={course.shortTitle} location={locationName} />}
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <aside className="w-full lg:w-[350px] shrink-0 space-y-6 lg:sticky lg:top-[100px] z-30 pb-10">
          
          {/* Next Batch Card — real data only (FIX-02): renders from the first
              upcoming DB schedule, or a price+enquire card when none exist. */}
          <div className="bg-white rounded-xl border border-[#1FA8A8]/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
            <div className="p-5 bg-[#fef9f2] border-b border-[#1FA8A8]/20 flex items-center justify-between">
              <h3 className="font-bold text-[#082032] text-[16px]">{nextBatch?.isFilling ? "Fast Filling Schedule" : "Next Batch"}</h3>
            </div>

            {nextBatch ? (
              <div className="p-5 border-b border-gray-100">
                {nextBatch.discountPct ? (
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-red-500 text-white rounded text-[10px] font-bold">{nextBatch.discountPct}% OFF</span>
                  </div>
                ) : null}
                <h4 className="font-black text-[#082032] text-[16px] mb-1">{fmtDate(nextBatch.startDate)} - {fmtDate(nextBatch.endDate)}</h4>
                {nextBatch.timeLabel && (
                  <div className="text-[12px] text-gray-500 mb-4">
                    {nextBatch.timeLabel}{nextBatch.timezone && !nextBatch.timeLabel.includes(nextBatch.timezone) ? ` ${nextBatch.timezone}` : ""}
                  </div>
                )}

                <div className="flex items-center gap-2 text-[12px] text-gray-600 font-semibold mb-3">
                  <Globe className="w-3.5 h-3.5 text-[#0E7C7C]" /> {nextBatch.mode} <span className="text-gray-300">•</span>{" "}
                  {[0, 6].includes(nextBatch.startDate.getDay()) ? "Weekend Batch" : "Weekday Batch"}
                </div>
              </div>
            ) : (
              <div className="p-5 border-b border-gray-100 text-[13px] text-gray-600">
                New batch dates are being finalized. Enquire and we&apos;ll confirm the next start date.
              </div>
            )}

            {/* Pricing Footer */}
            <div className="p-5 bg-[#fbfdfd] space-y-4">
              <div className="text-[20px] font-black text-[#082032] flex items-center gap-2">
                {format(nextBatchPrice * (1 - (nextBatch?.discountPct ?? 0) / 100))}
                {nextBatch?.discountPct ? (
                  <span className="text-[13px] font-semibold text-gray-500 line-through">{format(nextBatchPrice)}</span>
                ) : null}
              </div>

              <Link href={`/register?course=${course.slug}`} className="w-full h-11 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] flex items-center justify-center transition-colors text-[14px]">
                Enroll Now
              </Link>
              <div className="text-center pt-1">
                <a href="#schedules" className="text-[12px] font-bold text-[#0E7C7C] hover:underline flex items-center justify-center gap-1">View all Schedules <Lucide.ChevronRight className="w-3 h-3" /></a>
              </div>
            </div>
          </div>

          {/* Brochure Sidebar Box */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <h3 className="font-bold text-[#082032] text-[15px] leading-snug">Discover Your Path with {course.shortTitle} Training</h3>
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Lucide.Map className="w-5 h-5" />
              </div>
            </div>
            <LeadModalButton
              courseSlug={course.slug}
              source={`brochure-${course.slug}`}
              title="Get the Course Brochure"
              subtitle="Enter your details — we'll send you the full curriculum, pricing and upcoming batches."
              ctaLabel="Send me the brochure"
              brochure
              className="w-full h-11 border border-[#082032] text-[#082032] hover:bg-gray-50 font-bold rounded-[4px] flex items-center justify-center transition-colors text-[14px]"
            >
              Download Brochure
            </LeadModalButton>
          </div>

          {/* Lead Form Widget (for mobile or bottom of sidebar) */}
          <div id="enquire" className="scroll-mt-24 mt-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="p-6 bg-[#f8fcfc] border-b border-gray-100">
                <h3 className="text-[18px] font-bold text-[#082032] mb-1">Request a Callback</h3>
                <p className="text-[13px] text-gray-500">Get pricing & schedules{cityName ? ` for ${cityName}` : ""}.</p>
              </div>
              <div className="p-6">
                <LeadForm
                  variant="sidebar"
                  courseSlug={course.slug}
                  countrySlug={countrySlug}
                  citySlug={citySlug}
                  source={`course-${course.slug}${citySlug ? `-${citySlug}` : ""}`}
                />
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* Full Width Bottom Sections */}
      <div className="container-tight pb-20">
        {/* Related Courses Componentized */}
        <RelatedCoursesSection course={course} />

        {/* Tags Section */}
        <section className="pt-16">
          <h3 className="text-[22px] font-bold text-[#082032] mb-6">Simplilead Trending Courses</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {COURSES.filter(c => c.slug !== course.slug).slice(0, 8).map(c => (
              <Link 
                key={c.slug} 
                href={`/${c.slug}`}
                className="px-3 py-2 bg-gray-50 border border-gray-200 text-[12px] font-semibold text-gray-500 rounded hover:border-[#1FA8A8] hover:text-[#0E7C7C] transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>

          <h3 className="text-[22px] font-bold text-[#082032] mb-6">Find {course.shortTitle} Courses in Other Top Cities</h3>
          <div className="flex flex-wrap gap-2">
            {otherCities.map(c => {
              if (c.slug === citySlug) return null;
              return (
                <Link
                  key={c.slug}
                  href={`/${countrySlug || 'in'}/${course.slug}/${c.slug}`}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 text-[12px] font-semibold text-gray-500 rounded hover:border-[#1FA8A8] hover:text-[#0E7C7C] transition-colors"
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </section>
      </div>

    </div>
  );
}
