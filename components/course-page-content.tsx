import Link from "next/link";
import Image from "next/image";
import {
  Award, BookOpen, Calendar, CheckCircle2, Clock, FileCheck, Headphones, Repeat,
  Star, Users, ArrowRight, MapPin, Globe, Tag, AlarmClock, Shield,
} from "lucide-react";
import * as Lucide from "lucide-react";
import { type CourseContent, type FaqItem, findCity, findCountry, CITIES_IN, COURSES } from "@/lib/seed-data";
import { LeadForm } from "@/components/lead-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { BrochureButton } from "@/components/brochure-button";
import { type CurrencyCode, type CurrencyConfig, formatInCurrency } from "@/lib/currency";
import { AccreditationSection } from "@/components/course-page/accreditation-section";
import { DemandSection } from "@/components/course-page/demand-section";
import { CertificateSection } from "@/components/course-page/certificate-section";
import { ReviewsSection } from "@/components/course-page/reviews-section";
import { InstructorsSection } from "@/components/course-page/instructors-section";
import { CurriculumSection } from "@/components/course-page/curriculum-section";
import { FaqSection } from "@/components/course-page/faq-section";
import { isSectionHidden, type CourseSectionKey } from "@/lib/course-sections";
import { AdvisorBanner } from "@/components/course-page/advisor-banner";
import { ArticlesSection } from "@/components/course-page/articles-section";
import { SchedulesSection } from "@/components/course-page/schedules-section";
import { RelatedCoursesSection } from "@/components/course-page/related-courses-section";

// ... inside the file ...
// We need to carefully replace the existing blocks.

type Schedule = {
  mode: string;
  startDate: Date;
  endDate: Date;
  timeLabel?: string;
  priceUsd: number;
  discountPct?: number;
  seatsLeft?: number;
  isFilling?: boolean;
};

function generateSchedules(course: CourseContent): Schedule[] {
  const out: Schedule[] = [];
  const now = new Date();
  for (let m = 0; m < 12; m++) {
    for (let i = 1; i <= 2; i++) {
      const start = new Date(now.getFullYear(), now.getMonth() + m, i * 10);
      const end = new Date(start); end.setDate(start.getDate() + 1);
      out.push({
        mode: "Live Online Classroom",
        startDate: start, endDate: end,
        timeLabel: "09:00 AM - 06:00 PM",
        priceUsd: course.basePriceUsd,
        discountPct: (m + i) % 3 === 0 ? 15 : 10,
        seatsLeft: 12 - ((m + i) % 5),
        isFilling: m === 0,
      });
    }
  }
  return out;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });
}

export function CoursePageContent({
  course,
  countrySlug,
  citySlug,
  countryName: countryNameProp,
  cityName: cityNameProp,
  cities,
  currency = "USD",
  currencies,
}: {
  course: CourseContent;
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

  const baseTitle = course.shortTitle.replace(/\s+(Certification Training|Certification|Training)$/i, "").trim();
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

  const schedules = generateSchedules(course);

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
            <span className="text-gray-400 line-clamp-1">{breadcrumbLabel}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Content */}
            <div className="flex-1 max-w-3xl overflow-hidden">
              <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3 break-words">
                {course.shortTitle} CERTIFICATION TRAINING
              </div>

              <h1 className="text-3xl md:text-[42px] font-bold leading-[1.2] mb-4 text-[#082032]">
                {heroTitle}
              </h1>
              
              <p className="text-[18px] text-[#475569] leading-relaxed mb-6 font-medium">
                {cityName ? `${course.subtitle} Join ${cityName}'s leading certification training provider.` : course.subtitle}
              </p>

              {/* Metrics Row */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-[13px] font-bold text-[#082032]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
                        <Users className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <span>144,000+ Enrolled</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-black">G</span>
                  <span>4.8/5</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-black">f</span>
                  <span>4.7/5</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-black">s</span>
                  <span>4.9/5</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-8">
                {[
                  "Master Agile practices with 16 hours of live instructor-led certification training",
                  "Earn 16 PDUs and 16 SEUs while preparing with 4 mock exams and real-world simulations",
                  "Learn from top Agile Alliance-certified trainers and gain access to curated resources",
                  "Gear up to ace your exam (fee included) and join the thriving global community",
                  "Enjoy a 2-year membership and advance your career with certification"
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#475569] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 items-center">
                <a href="#schedules" className="h-12 px-8 bg-transparent border-2 border-[#082032] hover:bg-gray-50 text-[#082032] font-bold rounded-[4px] flex items-center gap-2 transition-colors">
                  View Schedules
                </a>
                <button className="h-12 px-8 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] transition-colors flex items-center gap-2">
                  <Lucide.Download className="w-4 h-4" /> Download Brochure
                </button>
              </div>
              
              <div className="mt-4 text-[13px] text-gray-500 font-medium">
                Want to Train Your Team? <a href="#" className="text-[#1FA8A8] hover:underline font-bold">Get a Quote</a>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[480px] shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative bg-gray-100 aspect-[4/3] flex items-center justify-center border border-gray-200">
                <div className="absolute inset-0 bg-[#082032]/5 z-10"></div>
                {/* ponytail: raw img — course.heroImage is admin free-text; next/image throws on unconfigured hosts. Migrate if uploads are constrained to known hosts. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.heroImage} alt={course.title} loading="eager" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white rounded-lg px-2 py-1 shadow text-[10px] font-bold flex items-center gap-1 z-20">
                  <Award className="w-3 h-3 text-yellow-500" /> Global Certification
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between px-4 py-3 bg-[#fff9eb] border border-[#fde68a] rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[8px] font-bold border border-gray-200">LTP</div>
                  <span className="text-[12px] font-bold text-[#92400e]">Licensed Training Partner</span>
                </div>
                <button className="text-gray-500 hover:text-gray-800">
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
                className={`px-4 md:px-5 py-4 text-[13px] md:text-[14px] font-bold whitespace-nowrap transition-colors border-b-[3px] ${i === 0 ? "text-[#1FA8A8] border-[#1FA8A8]" : "text-gray-600 hover:text-[#1FA8A8] border-transparent hover:border-[#1FA8A8]"}`}
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
          {show("instructors") && <InstructorsSection course={course} />}

          {/* Curriculum Accordion — per-course modules (generator fills course.curriculum) */}
          {show("curriculum") && <CurriculumSection course={course} />}

          {/* Demand & Roles — industry-recognised job roles derived per course */}
          {show("demand") && <DemandSection course={course} />}

          {/* Schedules Table (Redesigned & Componentized) */}
          {show("schedules") && <SchedulesSection schedules={schedules} currency={currency} />}

          {/* Advisor Banner */}
          <AdvisorBanner />

          {/* Articles Section */}
          {show("articles") && <ArticlesSection course={course} />}

          {/* FAQ */}
          {show("faq") && <FaqSection faqs={course.faqs} shortTitle={course.shortTitle} />}
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <aside className="w-full lg:w-[350px] shrink-0 space-y-6 lg:sticky lg:top-[100px] z-30 pb-10">
          
          {/* Fast Filling Schedule Card */}
          <div className="bg-white rounded-xl border border-[#1FA8A8]/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
            <div className="p-5 bg-[#fef9f2] border-b border-[#1FA8A8]/20 flex items-center justify-between">
              <h3 className="font-bold text-[#082032] text-[16px]">Fast Filling Schedule</h3>
            </div>
            
            {/* The main schedule body */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-[10px] font-bold flex items-center gap-1"><Lucide.Sun className="w-3 h-3" /> Afternoon</span>
                <span className="px-2 py-0.5 bg-red-500 text-white rounded text-[10px] font-bold">30% OFF</span>
              </div>
              <h4 className="font-black text-[#082032] text-[16px] mb-1">{fmtDate(schedules[0]?.startDate || new Date())} - {fmtDate(schedules[0]?.endDate || new Date())}</h4>
              <div className="text-[12px] text-gray-500 mb-4">{schedules[0]?.timeLabel} IST</div>
              
              <div className="flex items-center gap-2 text-[12px] text-gray-600 font-semibold mb-3">
                <Globe className="w-3.5 h-3.5 text-[#1FA8A8]" /> {schedules[0]?.mode} <span className="text-gray-300">•</span> Weekend Batch
              </div>
              <div className="flex items-center gap-2 text-[12px] text-gray-600 font-semibold">
                <Users className="w-3.5 h-3.5 text-[#1FA8A8]" /> Govind Abkari
              </div>
            </div>
            
            {/* Pricing Footer */}
            <div className="p-5 bg-[#fbfdfd] space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[20px] font-black text-[#082032] flex items-center gap-2">
                    {format(course.basePriceUsd * 0.7)}
                    <span className="text-[13px] font-semibold text-gray-400 line-through">{format(course.basePriceUsd)}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">As low as {format(course.basePriceUsd * 0.7 / 12)}/month <Lucide.Info className="w-3 h-3 inline" /></div>
                </div>
                {/* Quantity Input */}
                <div className="flex items-center border border-gray-200 rounded px-1.5 py-0.5 bg-white">
                  <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#082032]">-</button>
                  <span className="w-6 text-center text-[13px] font-bold">1</span>
                  <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#082032]">+</button>
                </div>
              </div>
              
              <a href="#enquire" className="w-full h-11 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] flex items-center justify-center transition-colors text-[14px]">
                Enroll Now
              </a>
              <div className="text-center pt-1">
                <a href="#schedules" className="text-[12px] font-bold text-[#1FA8A8] hover:underline flex items-center justify-center gap-1">View all Schedules <Lucide.ChevronRight className="w-3 h-3" /></a>
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
            <button className="w-full h-11 border border-[#082032] text-[#082032] hover:bg-gray-50 font-bold rounded-[4px] flex items-center justify-center transition-colors text-[14px]">
              Download Brochure
            </button>
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
          <h3 className="text-[22px] font-bold text-[#082032] mb-6">ULearnSystems Trending Courses</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {COURSES.filter(c => c.slug !== course.slug).slice(0, 8).map(c => (
              <Link 
                key={c.slug} 
                href={`/${c.slug}`}
                className="px-3 py-2 bg-gray-50 border border-gray-200 text-[12px] font-semibold text-gray-500 rounded hover:border-[#1FA8A8] hover:text-[#1FA8A8] transition-colors"
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
                  className="px-3 py-2 bg-gray-50 border border-gray-200 text-[12px] font-semibold text-gray-500 rounded hover:border-[#1FA8A8] hover:text-[#1FA8A8] transition-colors"
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
