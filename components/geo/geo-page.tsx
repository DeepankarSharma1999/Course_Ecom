// Server components for the programmatic geo landing pages:
// /{course}/{country} (hub) and /{course}/{country}/{city}.
// Section ORDER on the city page is SEO-driven and fixed — do not reorder.
// Styling follows the site's existing tokens (.section/.container-tight/.card/…).
import Link from "next/link";
import { AlarmClock, ExternalLink, MapPin } from "lucide-react";
import { CurriculumSection } from "@/components/course-page/curriculum-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { LeadModalButton } from "@/components/lead-modal-button";
import type { CourseContent } from "@/lib/seed-data";
import { SITE, baseCourseTitle, composeCourseTitle } from "@/lib/utils";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getBatchTracks, getGeoCities, getGeoCountries, type BatchTrack, type GeoCity, type GeoCountry, type SalaryEntry } from "@/lib/geo-pages/data";
import { convertSession, fitCheck, type FitResult } from "@/lib/geo-pages/timezone";
import { geoCourseJsonLd } from "@/lib/geo-pages/schema";
import { hasTodo, isCountryIndexable } from "@/lib/geo-pages/gate";

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));

function JsonLd({ data }: { data: object[] }) {
  return <>{data.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}</>;
}

function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1
              ? <span aria-current="page" className="font-semibold text-foreground">{it.name}</span>
              : <Link href={it.href} className="hover:text-primary underline-offset-4 hover:underline">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function OffHoursBanner({ cityName, fit, courseSlug, courseName }: { cityName: string; fit: FitResult; courseSlug: string; courseName: string }) {
  return (
    <div className="card flex flex-col gap-4 border-amber-300/70 bg-amber-50 p-5 sm:flex-row sm:items-center" role="note">
      <AlarmClock className="h-6 w-6 shrink-0 text-amber-700" aria-hidden />
      <p className="flex-1 text-sm leading-6 text-amber-900">
        Live classes currently run on our {fit.track.id === "asia" ? "Asia" : fit.track.id} schedule — in {cityName} that&apos;s{" "}
        <strong className="font-bold">{fit.session.localLabel}</strong>. Join anyway, or register interest for batches in your region&apos;s hours.
      </p>
      <LeadModalButton
        courseSlug={courseSlug}
        source={`geo-offhours-${courseSlug}`}
        title={`Register interest — ${cityName} hours`}
        subtitle={`Tell us you want ${courseName} batches that suit ${cityName} local time and we'll notify you first.`}
        ctaLabel="Register interest"
        className="btn-outline whitespace-nowrap"
      >
        Register interest
      </LeadModalButton>
    </div>
  );
}

function BatchTable({ track, cityTz, courseSlug, courseName }: { track: BatchTrack; cityTz?: string; courseSlug: string; courseName: string }) {
  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-secondary/60 text-xs font-bold uppercase tracking-wide text-foreground">
              <th scope="col" className="px-5 py-3.5">Batch dates</th>
              <th scope="col" className="px-5 py-3.5">Days</th>
              <th scope="col" className="px-5 py-3.5">Time ({track.label})</th>
              {cityTz && <th scope="col" className="px-5 py-3.5">Your local time</th>}
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Enroll</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {track.batches.map((b) => {
              const s = convertSession(track, b, cityTz ?? track.tz);
              return (
                <tr key={b.startDate} className="hover:bg-secondary/40">
                  <td className="px-5 py-4 font-semibold tabular-nums text-foreground">{fmtDate(b.startDate)} – {fmtDate(b.endDate)}</td>
                  <td className="px-5 py-4">{b.days}</td>
                  <td className="px-5 py-4 tabular-nums">{s.homeLabel}</td>
                  {cityTz && <td className="px-5 py-4 tabular-nums font-medium text-foreground">{s.localLabel}</td>}
                  <td className="px-5 py-4 text-right">
                    <LeadModalButton
                      courseSlug={courseSlug}
                      source={`geo-batch-${courseSlug}`}
                      title={`Enroll — ${courseName}`}
                      subtitle={`Batch ${fmtDate(b.startDate)} – ${fmtDate(b.endDate)} (${s.homeLabel}). We'll confirm your seat by email.`}
                      ctaLabel="Request enrollment"
                      className="btn-primary !px-4 !py-2 text-xs"
                    >
                      Enroll
                    </LeadModalButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border/60 bg-secondary/40 px-5 py-3 text-xs text-muted-foreground">
        All batches are live online classes taught on the {track.label} schedule; times shown{cityTz ? " in your local timezone are exact conversions" : " include the timezone"}.
      </p>
    </div>
  );
}

function SalarySection({ heading, entries }: { heading: string; entries: SalaryEntry[] }) {
  const real = entries.filter((e) => !hasTodo(e));
  if (!real.length) return null;
  return (
    <section className="space-y-4">
      <h2 className="h2">{heading}</h2>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/60 text-xs font-bold uppercase tracking-wide text-foreground">
                <th scope="col" className="px-5 py-3.5">Role</th>
                <th scope="col" className="px-5 py-3.5">Typical salary</th>
                <th scope="col" className="px-5 py-3.5">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {real.map((e) => (
                <tr key={e.role}>
                  <td className="px-5 py-4 font-semibold text-foreground">{e.role}</td>
                  <td className="px-5 py-4 tabular-nums">{e.amount}</td>
                  <td className="px-5 py-4">
                    <a href={e.sourceUrl} target="_blank" rel="nofollow noopener" className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline">
                      {e.source} ({e.sourceDate})<ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ExamCostSection({ country, courseName }: { country: GeoCountry; courseName: string }) {
  const { examCost } = country;
  if (hasTodo(examCost)) return null;
  return (
    <section className="space-y-4">
      <h2 className="h2">{courseName} exam cost in {country.name}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <div className="section-eyebrow">Member</div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-foreground">{examCost.member}</div>
        </div>
        <div className="card p-6">
          <div className="section-eyebrow">Non-member</div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-foreground">{examCost.nonMember}</div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Source: <a href={examCost.source} target="_blank" rel="nofollow noopener" className="text-primary underline-offset-4 hover:underline">{examCost.source}</a>
      </p>
    </section>
  );
}

function CityLinks({ course, country, current }: { course: CourseContent; country: GeoCountry; current?: string }) {
  const cities = getGeoCities().filter((c) => c.country === country.iso && c.slug !== current);
  if (!cities.length && !current) return null;
  return (
    <section className="space-y-4">
      <h2 className="h3">{baseCourseTitle(course.shortTitle)} training in other locations</h2>
      <ul className="flex flex-wrap gap-2.5">
        {current && (
          <li>
            <Link href={`/${course.slug}/${country.iso}`} className="badge bg-primary/10 text-primary hover:bg-primary/20 min-h-[44px]">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> All of {country.name}
            </Link>
          </li>
        )}
        {cities.map((c) => (
          <li key={c.slug}>
            <Link href={`/${course.slug}/${country.iso}/${c.slug}`} className="badge hover:bg-secondary/70 min-h-[44px]">{c.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Hero({ title, subtitle, priceLine }: { title: string; subtitle: string; priceLine?: string }) {
  return (
    <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
      <div className="container-tight py-14 md:py-16">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-brand-100">{subtitle}</p>
        {priceLine && <p className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold">{priceLine}</p>}
      </div>
    </section>
  );
}

// ---------- CITY PAGE ----------
export function GeoCityPage({ course, country, city }: { course: CourseContent; country: GeoCountry; city: GeoCity }) {
  const tracks = getBatchTracks();
  const fit = fitCheck(tracks, city.timezone);
  const courseName = baseCourseTitle(course.shortTitle);
  const h1 = composeCourseTitle(course.title, { city: city.name });
  const url = `${SITE.url}/${course.slug}/${country.iso}/${city.slug}`;
  const next = fit.track.batches[0];
  const price = !hasTodo(country.priceDisplay) ? `${country.priceDisplay} · live online` : undefined;
  const realFaqs = city.faq.filter((f) => !hasTodo(f));

  const jsonLd: object[] = [
    geoCourseJsonLd(course, url, country, fit.track, city.name),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: courseName, url: `${SITE.url}/${course.slug}` },
      { name: country.name, url: `${SITE.url}/${course.slug}/${country.iso}` },
      { name: city.name, url },
    ]),
  ];
  if (realFaqs.length) jsonLd.push(faqJsonLd(realFaqs));

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero
        title={h1}
        subtitle={`Next live online batch: ${fmtDate(next.startDate)} (${next.days}) — ${fit.session.localLabel} in ${city.name}.`}
        priceLine={price}
      />
      <div className="container-tight section space-y-12 md:space-y-16">
        {fit.status === "off-hours" && <OffHoursBanner cityName={city.name} fit={fit} courseSlug={course.slug} courseName={courseName} />}

        <section className="space-y-4">
          <h2 className="h2">Upcoming {courseName} batches for {city.name}</h2>
          <BatchTable track={fit.track} cityTz={city.timezone} courseSlug={course.slug} courseName={courseName} />
        </section>

        {!hasTodo(city.intro) && (
          <section className="max-w-3xl space-y-4">
            <h2 className="h2">Why take {courseName} training in {city.name}?</h2>
            <p className="lead whitespace-pre-line">{city.intro}</p>
            {!hasTodo(city.industries) && <p className="text-muted-foreground leading-7">{city.industries}</p>}
            {city.employers.some((e) => !hasTodo(e)) && (
              <p className="text-muted-foreground leading-7">
                Certified professionals in {city.name} work at employers such as {city.employers.filter((e) => !hasTodo(e)).join(", ")}.
              </p>
            )}
          </section>
        )}

        <SalarySection heading={`${courseName} salaries in ${city.name}`} entries={city.salary} />
        <ExamCostSection country={country} courseName={courseName} />

        <section className="space-y-4">
          <CurriculumSection course={course} />
        </section>

        {realFaqs.length > 0 && (
          <section className="max-w-3xl space-y-4">
            <h2 className="h2">{courseName} in {city.name} — FAQs</h2>
            <FaqAccordion items={realFaqs} />
          </section>
        )}

        <Breadcrumb items={[
          { name: "Home", href: "/" },
          { name: courseName, href: `/${course.slug}` },
          { name: country.name, href: `/${course.slug}/${country.iso}` },
          { name: city.name, href: `/${course.slug}/${country.iso}/${city.slug}` },
        ]} />

        <CityLinks course={course} country={country} current={city.slug} />
      </div>
    </>
  );
}

// ---------- COUNTRY HUB ----------
export function GeoCountryHub({ course, country }: { course: CourseContent; country: GeoCountry }) {
  const tracks = getBatchTracks();
  const track = tracks[0];
  const courseName = baseCourseTitle(course.shortTitle);
  const h1 = composeCourseTitle(course.title, { country: country.name });
  const url = `${SITE.url}/${course.slug}/${country.iso}`;
  const price = !hasTodo(country.priceDisplay) ? `${country.priceDisplay} · live online` : undefined;
  const realFaqs = country.faq.filter((f) => !hasTodo(f));

  const jsonLd: object[] = [
    geoCourseJsonLd(course, url, country, track),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: courseName, url: `${SITE.url}/${course.slug}` },
      { name: country.name, url },
    ]),
  ];
  if (realFaqs.length) jsonLd.push(faqJsonLd(realFaqs));

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero
        title={h1}
        subtitle={`Live online ${courseName} batches on the ${track.label} schedule, open to learners across ${country.name}.`}
        priceLine={price}
      />
      <div className="container-tight section space-y-12 md:space-y-16">
        <section className="space-y-4">
          <h2 className="h2">Upcoming {courseName} batches</h2>
          <BatchTable track={track} courseSlug={course.slug} courseName={courseName} />
        </section>

        {!hasTodo(country.intro) && (
          <section className="max-w-3xl space-y-4">
            <h2 className="h2">{courseName} certification in {country.name}</h2>
            <p className="lead whitespace-pre-line">{country.intro}</p>
          </section>
        )}

        <SalarySection heading={`${courseName} salaries in ${country.name}`} entries={country.salaryCountry} />
        <ExamCostSection country={country} courseName={courseName} />

        {realFaqs.length > 0 && (
          <section className="max-w-3xl space-y-4">
            <h2 className="h2">{courseName} in {country.name} — FAQs</h2>
            <FaqAccordion items={realFaqs} />
          </section>
        )}

        <Breadcrumb items={[
          { name: "Home", href: "/" },
          { name: courseName, href: `/${course.slug}` },
          { name: country.name, href: `/${course.slug}/${country.iso}` },
        ]} />

        <section className="space-y-4">
          <h2 className="h3">Choose your city</h2>
          <ul className="flex flex-wrap gap-2.5">
            {getGeoCities().filter((c) => c.country === country.iso).map((c) => (
              <li key={c.slug}>
                <Link href={`/${course.slug}/${country.iso}/${c.slug}`} className="badge hover:bg-secondary/70 min-h-[44px]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden /> {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${course.slug}`} className="badge bg-primary/10 text-primary hover:bg-primary/20 min-h-[44px]">
                {courseName} course overview
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

// "Available in" block for the parent course page — lists ONLY indexable hubs
// so the course page never links into noindex drafts.
export function GeoAvailableIn({ courseSlug }: { courseSlug: string }) {
  const hubs = getGeoCountries().filter((c) => isCountryIndexable(c.iso));
  if (!hubs.length) return null;
  return (
    <section className="section border-t border-border/60">
      <div className="container-tight space-y-4">
        <h2 className="h2">Available in</h2>
        <ul className="flex flex-wrap gap-2.5">
          {hubs.map((c) => (
            <li key={c.iso}>
              <Link href={`/${courseSlug}/${c.iso}`} className="badge hover:bg-secondary/70 min-h-[44px]">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
