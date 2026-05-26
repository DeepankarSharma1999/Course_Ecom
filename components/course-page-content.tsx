import Link from "next/link";
import Image from "next/image";
import {
  Award, BookOpen, Calendar, CheckCircle2, Clock, FileCheck, Headphones, Repeat,
  Star, Users, ArrowRight, MapPin, Globe, Tag, AlarmClock, Shield,
} from "lucide-react";
import * as Lucide from "lucide-react";
import { type CourseContent, type FaqItem, findCity, findCountry } from "@/lib/seed-data";
import { LeadForm } from "@/components/lead-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { BrochureButton } from "@/components/brochure-button";
import { formatPrice } from "@/lib/utils";

type Schedule = {
  mode: string;
  startDate: Date;
  endDate: Date;
  timeLabel?: string;
  priceInr: number;
  discountPct?: number;
  seatsLeft?: number;
  isFilling?: boolean;
};

function generateSchedules(course: CourseContent): Schedule[] {
  const out: Schedule[] = [];
  const now = new Date();
  for (let i = 1; i <= 6; i++) {
    const start = new Date(now); start.setDate(now.getDate() + i * 14);
    const end = new Date(start); end.setDate(start.getDate() + 1);
    out.push({
      mode: i % 2 === 0 ? "Classroom" : "Live Online",
      startDate: start, endDate: end,
      timeLabel: "09:00 AM - 06:00 PM",
      priceInr: course.basePriceInr,
      discountPct: i % 3 === 0 ? 15 : 10,
      seatsLeft: 12 - i,
      isFilling: i <= 2,
    });
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
}: {
  course: CourseContent;
  countrySlug?: string;
  citySlug?: string;
}) {
  const country = countrySlug ? findCountry(countrySlug) : null;
  const city = citySlug ? findCity(citySlug) : null;
  const locationLabel = city?.name && country?.name ? `${city.name}, ${country.name}` : country?.name;

  // Normalize the short title so we don't end up with "X Certification Certification Training"
  // when the seeded shortTitle already ends with "Certification" or "Training".
  const baseTitle = course.shortTitle.replace(/\s+(Certification Training|Certification|Training)$/i, "").trim();
  const heroTitle = city
    ? `${baseTitle} Certification Training in ${city.name}`
    : `${baseTitle} Certification Training`;
  const breadcrumbLabel = city ? `${baseTitle} Training in ${city.name}` : baseTitle;
  const featuresHeading = city
    ? `Key Features of ${baseTitle} Training in ${city.name}`
    : `Key Features of ${baseTitle} Certification Training`;

  const schedules = generateSchedules(course);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-ink-50/60 border-b border-ink-100">
        <div className="container-tight py-3 text-xs text-ink-500 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href={`/category/${course.category.slug}`} className="hover:text-brand-600">{course.category.name}</Link>
          <span>/</span>
          {country && (<><Link href={`/${countrySlug}`} className="hover:text-brand-600">{country.name}</Link><span>/</span></>)}
          <span className="text-ink-700 line-clamp-1">{breadcrumbLabel}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="container-tight grid lg:grid-cols-[1fr_400px] gap-10 py-12 lg:py-16 items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge bg-white/10 text-white border border-white/20">{course.category.name}</span>
              <span className="badge bg-white/10 text-white border border-white/20">{course.accreditedBy}</span>
              {city && <span className="badge bg-accent-500/20 text-accent-500 border border-accent-500/30"><MapPin className="w-3 h-3" />{city.name}</span>}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
              {heroTitle}
            </h1>
            <p className="text-lg text-brand-100 mb-6 max-w-2xl">
              {city ? `${course.subtitle} Join ${city.name}'s leading certification training provider.` : course.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-5 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(course.ratingAvg) ? "fill-accent-500 text-accent-500" : "text-white/30"}`} />
                ))}
                <span className="ml-1 text-sm font-semibold">{course.ratingAvg}</span>
                <span className="ml-1 text-sm text-brand-200">({course.ratingCount.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-brand-200"><Users className="w-4 h-4" />25,000+ trained</div>
              <div className="flex items-center gap-1.5 text-sm text-brand-200"><Clock className="w-4 h-4" />{course.durationLabel}</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#schedules" className="btn-accent">View Schedules <ArrowRight className="w-4 h-4" /></a>
              <BrochureButton courseSlug={course.slug} />
            </div>
          </div>
          <div id="enquire" className="lg:sticky lg:top-24">
            <LeadForm
              variant="card"
              courseSlug={course.slug}
              countrySlug={countrySlug}
              citySlug={citySlug}
              title="Request a Callback"
              subtitle={`Get pricing & schedules${city ? ` for ${city.name}` : ""}.`}
              source={`course-${course.slug}${citySlug ? `-${citySlug}` : ""}`}
            />
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-white border-b border-ink-100">
        <div className="container-tight py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Duration", value: course.durationLabel },
            { icon: Award, label: "Certification", value: course.accreditedBy },
            { icon: BookOpen, label: "Level", value: course.level },
            { icon: Tag, label: "Starting From", value: formatPrice(course.basePriceInr) },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0"><f.icon className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-ink-500">{f.label}</div>
                <div className="font-semibold text-ink-900 text-sm">{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key features */}
      <section className="section">
        <div className="container-tight">
          <div className="mb-8">
            <div className="badge mb-3">Course Highlights</div>
            <h2 className="h2">{featuresHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {course.keyFeatures.map((kf, i) => {
              const Icon = (Lucide as any)[kf.icon] || CheckCircle2;
              return (
                <div key={i} className="card p-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 grid place-items-center mb-3"><Icon className="w-5 h-5" /></div>
                  <div className="text-sm font-semibold text-ink-900 leading-snug">{kf.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section bg-ink-50/40">
        <div className="container-tight grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="badge mb-3">Course Overview</div>
            <h2 className="h2 mb-4">About the {course.shortTitle} Course{city ? ` in ${city.name}` : ""}</h2>
            <p className="text-ink-700 leading-relaxed mb-6">{course.description}</p>
            {city && (
              <p className="text-ink-700 leading-relaxed">
                {course.shortTitle} certification is in strong demand across {city.name} and the wider {country?.name} market.
                Course_Ecom delivers weekend and weekday batches in {city.name} — both classroom (subject to venue availability) and live online — led by accredited
                trainers with deep industry experience.
              </p>
            )}
          </div>
          <aside className="card p-6 h-fit sticky top-24">
            <h3 className="font-bold text-ink-900 mb-4">Course Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3"><dt className="text-ink-500">Duration</dt><dd className="font-semibold text-ink-900 text-right">{course.durationLabel}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-ink-500">Level</dt><dd className="font-semibold text-ink-900 text-right">{course.level}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-ink-500">Accreditation</dt><dd className="font-semibold text-ink-900 text-right">{course.accreditedBy}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-ink-500">Mode</dt><dd className="font-semibold text-ink-900 text-right">Live Online / Classroom</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-ink-500">Exam Fee</dt><dd className="font-semibold text-green-600 text-right">{course.examIncluded ? "Included" : "Extra"}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-ink-500">Language</dt><dd className="font-semibold text-ink-900 text-right">English</dd></div>
            </dl>
            <a href="#schedules" className="btn-primary w-full mt-5">See Upcoming Batches</a>
          </aside>
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="section">
        <div className="container-tight grid lg:grid-cols-2 gap-12">
          <div>
            <div className="badge mb-3">What You&apos;ll Learn</div>
            <h2 className="h2 mb-6">Learning Outcomes</h2>
            <ul className="space-y-3">
              {course.learningOutcomes.map((lo, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-ink-700">{lo}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="badge mb-3">Audience</div>
            <h2 className="h2 mb-6">Who Should Attend</h2>
            <ul className="space-y-3 mb-8">
              {course.whoShouldAttend.map((w, i) => (
                <li key={i} className="flex gap-3"><Users className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" /><span className="text-ink-700">{w}</span></li>
              ))}
            </ul>
            <h3 className="h3 mb-3">Prerequisites</h3>
            <ul className="space-y-2">
              {course.prerequisites.map((p, i) => (
                <li key={i} className="text-sm text-ink-600">• {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Schedules */}
      <section id="schedules" className="section bg-ink-50/40">
        <div className="container-tight">
          <div className="text-center mb-10">
            <div className="badge mb-3">Upcoming Batches</div>
            <h2 className="h2 mb-3">{course.shortTitle} Schedule{city ? ` in ${city.name}` : ""}</h2>
            <p className="lead">Flexible weekend and weekday batches — live online and classroom (where available).</p>
          </div>
          <div className="card overflow-hidden">
            <div className="hidden md:grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_140px] gap-4 bg-ink-50 px-5 py-3 text-xs font-bold uppercase text-ink-500">
              <div>Date</div><div>Mode</div><div>Time</div><div>Price</div><div></div>
            </div>
            {schedules.map((s, i) => (
              <div key={i} className="grid md:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_140px] gap-4 px-5 py-4 border-t border-ink-100 items-center">
                <div>
                  <div className="font-semibold text-ink-900">{fmtDate(s.startDate)} – {fmtDate(s.endDate)}</div>
                  <div className="text-xs text-ink-500">{s.timeLabel}</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {s.mode === "Live Online" ? <Globe className="w-4 h-4 text-brand-600" /> : <MapPin className="w-4 h-4 text-brand-600" />}
                  <span>{s.mode}</span>
                </div>
                <div className="text-sm text-ink-600">{s.timeLabel}</div>
                <div>
                  <div className="font-bold text-ink-900">{formatPrice(s.priceInr * (1 - (s.discountPct ?? 0) / 100))}</div>
                  {s.discountPct ? <div className="text-xs text-ink-500"><span className="line-through">{formatPrice(s.priceInr)}</span> <span className="text-green-600 font-semibold">-{s.discountPct}%</span></div> : null}
                </div>
                <div className="flex md:justify-end">
                  <a href="#enquire" className="btn-primary w-full md:w-auto">Enroll</a>
                </div>
                {s.isFilling && (
                  <div className="md:col-span-5 -mt-2 text-xs text-accent-600 font-semibold flex items-center gap-1">
                    <AlarmClock className="w-3.5 h-3.5" /> Filling fast — only {s.seatsLeft} seats left
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-ink-500">
            Can&apos;t find a suitable batch? <a href="#enquire" className="text-brand-600 font-semibold hover:underline">Request a custom schedule</a>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section">
        <div className="container-tight">
          <div className="mb-8">
            <div className="badge mb-3">Curriculum</div>
            <h2 className="h2">{course.shortTitle} Course Curriculum</h2>
            <p className="lead mt-2">Aligned with the latest {course.accreditedBy} certification syllabus.</p>
          </div>
          <div className="space-y-3">
            {course.curriculum.map((m, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 grid place-items-center text-sm font-bold">{i + 1}</span>
                    <span className="font-semibold text-ink-900">{m.title}</span>
                  </div>
                  <span className="text-ink-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <ul className="mt-4 pl-11 space-y-2">
                  {m.topics.map((t, j) => (
                    <li key={j} className="flex gap-2 text-sm text-ink-600"><CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />{t}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-ink-50/40">
        <div className="container-tight">
          <div className="text-center mb-10">
            <div className="badge mb-3">Why Course_Ecom</div>
            <h2 className="h2">Why Choose Course_Ecom for {course.shortTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {course.whyChooseUs.map((w, i) => (
              <div key={i} className="card p-6">
                <Shield className="w-8 h-8 text-brand-600 mb-3" />
                <h3 className="font-semibold text-ink-900 mb-2">{w.title}</h3>
                <p className="text-sm text-ink-600">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-tight max-w-3xl">
          <div className="text-center mb-10">
            <div className="badge mb-3">FAQ</div>
            <h2 className="h2 mb-3">Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={course.faqs as FaqItem[]} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container-tight py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="h2 text-white mb-3">Ready to enroll in {course.shortTitle}{city ? ` in ${city.name}` : ""}?</h2>
            <p className="text-brand-100 text-lg">Talk to an advisor. Get the next batch dates, payment options and exclusive offers.</p>
          </div>
          <div className="flex md:justify-end gap-3 flex-wrap">
            <a href="#enquire" className="btn-accent">Enquire Now <ArrowRight className="w-4 h-4" /></a>
            <Link href="/corporate" className="btn bg-white text-brand-700 hover:bg-brand-50">Corporate Training</Link>
          </div>
        </div>
      </section>
    </>
  );
}
