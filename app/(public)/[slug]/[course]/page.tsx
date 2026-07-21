import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePageContent } from "@/components/course-page-content";
import { baseCourseTitle, composeCourseTitle, SITE, stripBrandSuffix } from "@/lib/utils";
import { NOINDEX } from "@/lib/indexing";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { localizeCourseFaqs } from "@/lib/course-faqs";
import { getCourseBySlug, getCountryBySlug, getCities, getCourseVariant, getCourseSchedules } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";
import { GEO_COURSES, getGeoCountries, getGeoCountry, isGeoCourse } from "@/lib/geo-pages/data";
import { isCountryIndexable } from "@/lib/geo-pages/gate";
import { GeoCountryHub } from "@/components/geo/geo-page";

// This segment serves two shapes:
//   /{country}/{course}       — legacy DB geo variant (always noindex, dynamic:
//                               currency comes from cookies/headers at request time)
//   /{course}/{country}       — NEW file-based country hub (static, gated indexing)
// Geo hubs are pre-built via generateStaticParams; legacy URLs render on demand.
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return GEO_COURSES.flatMap((c) => getGeoCountries().map((co) => ({ slug: c, course: co.iso })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; course: string }> }): Promise<Metadata> {
  const { slug, course } = await params;
  // NEW geo country hub: /{course}/{country}
  if (isGeoCourse(slug) && getGeoCountry(course)) {
    const geoCountry = getGeoCountry(course)!;
    const c = await getCourseBySlug(slug);
    if (!c) return {};
    const title = composeCourseTitle(c.title, { country: geoCountry.name });
    const description = `Live online ${baseCourseTitle(c.shortTitle)} certification training for ${geoCountry.name} — upcoming batch dates, local pricing and exam cost.`;
    const path = `/${slug}/${course}`;
    return {
      title, description,
      robots: isCountryIndexable(course) ? undefined : NOINDEX,
      alternates: { canonical: path },
      openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}${path}` },
    };
  }
  const c = await getCourseBySlug(course); const co = await getCountryBySlug(slug);
  if (!c || !co) return {};
  const variant = await getCourseVariant(course, slug);
  const title = stripBrandSuffix(variant?.seoTitle) || composeCourseTitle(c.shortTitle, { country: co.name });
  const description = variant?.seoDescription || `${c.seoDescription} Now available across ${co.name} — live online & classroom batches.`;
  return {
    title, description, keywords: c.seoKeywords,
    // Geo variants are noindex until they meet the FIX-19 uniqueness bar.
    robots: NOINDEX,
    alternates: { canonical: `/${slug}/${course}` },
    openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}/${slug}/${course}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; course: string }> }) {
  const { slug, course } = await params;
  // NEW geo country hub (checked first — pure fs, no DB/dynamic APIs beyond the course read).
  if (isGeoCourse(slug) && getGeoCountry(course)) {
    const c = await getCourseBySlug(slug);
    if (!c) notFound();
    return <GeoCountryHub course={c} country={getGeoCountry(course)!} />;
  }
  const [c, co, currency, currencyCfg] = await Promise.all([getCourseBySlug(course), getCountryBySlug(slug), getDisplayCurrency(), getCurrencyConfig()]);
  if (!c || !co) notFound();
  // Inject GEO keywords into the FAQs for this country variant (feeds both the
  // rendered FAQ section and the FAQ JSON-LD below).
  c.faqs = localizeCourseFaqs(c.faqs, co.name, c.title);
  const cities = (await getCities()).filter((x) => x.country.slug === co.slug).map((x) => ({ slug: x.slug, name: x.name }));

  const schedules = await getCourseSchedules(course);

  const jsonLd = [
    courseJsonLd(c, { country: co.name }, schedules),
    faqJsonLd(c.faqs),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: co.name, url: `${SITE.url}/${slug}` },
      { name: baseCourseTitle(c.shortTitle), url: `${SITE.url}/${slug}/${course}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <CoursePageContent course={c} countrySlug={slug} countryName={co.name} cities={cities} schedules={schedules} currency={currency} currencies={currencyCfg.currencies} />
    </>
  );
}
