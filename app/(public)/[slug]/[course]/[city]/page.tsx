import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { CoursePageContent } from "@/components/course-page-content";
import { StickyCta } from "@/components/sticky-cta";
import { baseCourseTitle, composeCourseTitle, SITE, stripBrandSuffix } from "@/lib/utils";
import { NOINDEX } from "@/lib/indexing";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getCities, getCityBySlug, getCourseBySlug, getCourseVariant, getCourseSchedules } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";
import { formatInCurrency } from "@/lib/currency";
import { GEO_COURSES, getGeoCities, getGeoCity, getGeoCountry, isGeoCourse } from "@/lib/geo-pages/data";
import { isCityIndexable } from "@/lib/geo-pages/gate";
import { GeoCityPage } from "@/components/geo/geo-page";

// Two shapes share this segment:
//   /{country}/{course}/{city} — legacy DB geo variant (noindex, request-time render)
//   /{course}/{country}/{city} — NEW file-based city page (static, gated indexing)
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return GEO_COURSES.flatMap((c) =>
    getGeoCities().map((ct) => ({ slug: c, course: ct.country, city: ct.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; course: string; city: string }> }): Promise<Metadata> {
  const { slug, course, city } = await params;
  // NEW geo city page: /{course}/{country}/{city}
  if (isGeoCourse(slug) && getGeoCity(course, city)) {
    const geoCity = getGeoCity(course, city)!;
    const geoCountry = getGeoCountry(course)!;
    const c = await getCourseBySlug(slug);
    if (!c) return {};
    const todo = (s: string) => s.includes("TODO");
    const title = !todo(geoCity.meta.title) ? geoCity.meta.title : composeCourseTitle(c.title, { city: geoCity.name });
    const description = !todo(geoCity.meta.description)
      ? geoCity.meta.description
      : `Live online ${baseCourseTitle(c.shortTitle)} certification training for ${geoCity.name}, ${geoCountry.name} — batch dates in your local time, salaries and exam cost.`;
    const path = `/${slug}/${course}/${city}`;
    return {
      title, description,
      robots: isCityIndexable(course, city) ? undefined : NOINDEX,
      alternates: { canonical: path },
      openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}${path}` },
    };
  }
  const c = await getCourseBySlug(course); const ct = await getCityBySlug(city);
  // City must exist and belong to the country in the URL, else no useful metadata.
  if (!c || !ct || ct.country.slug !== slug) return {};
  const variant = await getCourseVariant(course, slug, city);
  const base = baseCourseTitle(c.title);
  const title = stripBrandSuffix(variant?.seoTitle) || composeCourseTitle(c.shortTitle, { city: ct.name });
  const description = variant?.seoDescription || `Become a certified ${base} in ${ct.name}. ${c.summary} Weekend & weekday batches available.`;
  return {
    title, description, keywords: `${c.seoKeywords}, ${base} ${ct.name}, ${base} training in ${ct.name}`,
    // Geo variants are noindex until they meet the FIX-19 uniqueness bar.
    robots: NOINDEX,
    alternates: { canonical: `/${slug}/${course}/${city}` },
    openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}/${slug}/${course}/${city}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; course: string; city: string }> }) {
  const { slug, course, city } = await params;
  // NEW geo city page (checked first — fs-based).
  if (isGeoCourse(slug) && getGeoCity(course, city)) {
    const c = await getCourseBySlug(slug);
    if (!c) notFound();
    return <GeoCityPage course={c} country={getGeoCountry(course)!} city={getGeoCity(course, city)!} />;
  }
  const [c, ct, currency, currencyCfg] = await Promise.all([getCourseBySlug(course), getCityBySlug(city), getDisplayCurrency(), getCurrencyConfig()]);
  if (!c || !ct) notFound();
  // City belongs to exactly one country. If the URL names a different country
  // (e.g. /uk/.../hyderabad), redirect to the city's real country page.
  if (ct.country.slug !== slug) redirect(`/${ct.country.slug}/${course}/${city}`);
  const co = ct.country;
  const cities = (await getCities()).filter((x) => x.country.slug === co.slug).map((x) => ({ slug: x.slug, name: x.name }));

  const schedules = await getCourseSchedules(course);

  const jsonLd = [
    courseJsonLd(c, { country: co.name, city: ct.name }, schedules),
    faqJsonLd(c.faqs),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: co.name, url: `${SITE.url}/${slug}` },
      { name: baseCourseTitle(c.title), url: `${SITE.url}/${slug}/${course}` },
      { name: `${baseCourseTitle(c.title)} in ${ct.name}`, url: `${SITE.url}/${slug}/${course}/${city}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <CoursePageContent course={c} countrySlug={slug} citySlug={city} countryName={co.name} cityName={ct.name} cities={cities} schedules={schedules} currency={currency} currencies={currencyCfg.currencies} />
      <StickyCta courseTitle={c.shortTitle} priceLabel={c.basePriceUsd ? formatInCurrency(c.basePriceUsd, currency, currencyCfg.currencies) : undefined} />
    </>
  );
}
