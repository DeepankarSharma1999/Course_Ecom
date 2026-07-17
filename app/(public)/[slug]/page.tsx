import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { CoursePageContent } from "@/components/course-page-content";
import { StickyCta } from "@/components/sticky-cta";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { SITE, baseCourseTitle, composeCourseTitle } from "@/lib/utils";
import { isCourseIndexed, NOINDEX } from "@/lib/indexing";
import { getAllCourses, getCourseBySlug, getCountryBySlug, getCityBySlug, getCourseSchedules } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";
import { formatInCurrency } from "@/lib/currency";

export const dynamicParams = true;
export const revalidate = 60;

// Pre-build only the canonical course pages (~200). Country/city landing pages
// render on demand (dynamicParams) to keep the build fast and DB reads low.
export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (course) {
    // Compose from the full `title`; the stored seoTitle was built from the
    // 50-char-truncated shortTitle (and already carries a brand suffix that the
    // layout template would double).
    const composed = composeCourseTitle(course.title);
    return {
      title: composed,
      description: course.seoDescription,
      keywords: course.seoKeywords,
      // Only allowlisted courses are indexed (FIX-06); the rest stay live but
      // noindex until they earn unique content.
      robots: isCourseIndexed(slug) ? undefined : NOINDEX,
      alternates: { canonical: `/${slug}` },
      openGraph: { title: `${composed} | ${SITE.name}`, description: course.seoDescription, images: course.heroImage ? [course.heroImage] : [], url: `${SITE.url}/${slug}` },
    };
  }
  const country = await getCountryBySlug(slug);
  if (country) {
    return {
      title: `Certification Training in ${country.name}`,
      description: `Globally accredited certification training in ${country.name}. Live online & classroom batches in major cities.`,
      robots: NOINDEX,
      alternates: { canonical: `/${slug}` },
    };
  }
  const city = await getCityBySlug(slug);
  if (city) {
    return {
      title: `Certification Training in ${city.name}`,
      description: `Globally accredited certification training in ${city.name}, ${city.country.name}. Live online & classroom batches.`,
      robots: NOINDEX,
      alternates: { canonical: `/${slug}` },
    };
  }
  return {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [course, currency, currencyCfg] = await Promise.all([getCourseBySlug(slug), getDisplayCurrency(), getCurrencyConfig()]);
  if (course) {
    const schedules = await getCourseSchedules(slug);
    const jsonLd = [
      courseJsonLd(course),
      faqJsonLd(course.faqs),
      breadcrumbJsonLd([
        { name: "Home", url: SITE.url },
        { name: course.category.name, url: `${SITE.url}/category/${course.category.slug}` },
        { name: baseCourseTitle(course.title), url: `${SITE.url}/${course.slug}` },
      ]),
    ];
    return (
      <>
        {jsonLd.map((d, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
        ))}
        <CoursePageContent course={course} schedules={schedules} currency={currency} currencies={currencyCfg.currencies} />
        <StickyCta courseTitle={baseCourseTitle(course.title)} priceLabel={course.basePriceUsd ? formatInCurrency(course.basePriceUsd, currency, currencyCfg.currencies) : undefined} />
      </>
    );
  }

  const country = await getCountryBySlug(slug);
  if (country) {
    const all = await getAllCourses();
    return (
      <>
        <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
          <div className="container-tight py-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Certification Training in {country.name}</h1>
            <p className="text-brand-100 text-lg max-w-2xl">Live online & classroom certification training across {country.name}.</p>
          </div>
        </section>
        <section className="section">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {all.map((c) => <CourseCard key={c.slug} course={c} country={country.slug} currency={currency} currencies={currencyCfg.currencies} />)}
            </div>
          </div>
        </section>
      </>
    );
  }

  // City landing page — behaves like the country page but scoped to one city.
  // Course links point at /{country}/{course}/{city}.
  const city = await getCityBySlug(slug);
  if (city) {
    const all = await getAllCourses();
    return (
      <>
        <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
          <div className="container-tight py-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Certification Training in {city.name}</h1>
            <p className="text-brand-100 text-lg max-w-2xl">Live online & classroom certification training in {city.name}, {city.country.name}.</p>
          </div>
        </section>
        <section className="section">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {all.map((c) => <CourseCard key={c.slug} course={c} country={city.country.slug} city={city.slug} currency={currency} currencies={currencyCfg.currencies} />)}
            </div>
          </div>
        </section>
      </>
    );
  }

  // Check if it's a dynamic universal page
  const { getPageBySlug } = await import("@/lib/page-actions");
  const customPage = await getPageBySlug(slug, false);
  
  if (customPage) {
    return (
      <main className="min-h-screen bg-ink-50 pt-10 pb-20">
        <div className="container-tight bg-white p-10 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-4xl font-extrabold text-ink-900 mb-8 pb-6 border-b border-ink-100">{customPage.title}</h1>
          <div 
            className="prose prose-ink max-w-none"
            dangerouslySetInnerHTML={{ __html: customPage.content }}
          />
        </div>
      </main>
    );
  }

  notFound();
}
