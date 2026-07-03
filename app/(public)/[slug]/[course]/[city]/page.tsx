import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { CoursePageContent } from "@/components/course-page-content";
import { TrainerSection } from "@/components/trainer-section";
import { StickyCta } from "@/components/sticky-cta";
import { baseCourseTitle, composeCourseTitle, SITE, stripBrandSuffix } from "@/lib/utils";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getCities, getCityBySlug, getCourseBySlug, getCourseVariant } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";
import { formatInCurrency } from "@/lib/currency";

export const dynamicParams = true;
export const revalidate = 60;

// Render on demand (dynamicParams + revalidate below). Pre-building every
// country×course×city combo is tens of thousands of pages — it times out the
// build and hammers the DB. First visit generates + caches the page instead.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; course: string; city: string }> }): Promise<Metadata> {
  const { slug, course, city } = await params;
  const c = await getCourseBySlug(course); const ct = await getCityBySlug(city);
  // City must exist and belong to the country in the URL, else no useful metadata.
  if (!c || !ct || ct.country.slug !== slug) return {};
  const variant = await getCourseVariant(course, slug, city);
  const base = baseCourseTitle(c.shortTitle);
  const title = stripBrandSuffix(variant?.seoTitle) || composeCourseTitle(c.shortTitle, { city: ct.name });
  const description = variant?.seoDescription || `Become a certified ${base} in ${ct.name}. ${c.summary} Weekend & weekday batches available.`;
  return {
    title, description, keywords: `${c.seoKeywords}, ${base} ${ct.name}, ${base} training in ${ct.name}`,
    alternates: { canonical: `/${slug}/${course}/${city}` },
    openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}/${slug}/${course}/${city}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; course: string; city: string }> }) {
  const { slug, course, city } = await params;
  const [c, ct, currency, currencyCfg] = await Promise.all([getCourseBySlug(course), getCityBySlug(city), getDisplayCurrency(), getCurrencyConfig()]);
  if (!c || !ct) notFound();
  // City belongs to exactly one country. If the URL names a different country
  // (e.g. /uk/.../hyderabad), redirect to the city's real country page.
  if (ct.country.slug !== slug) redirect(`/${ct.country.slug}/${course}/${city}`);
  const co = ct.country;
  const cities = (await getCities()).filter((x) => x.country.slug === co.slug).map((x) => ({ slug: x.slug, name: x.name }));

  const jsonLd = [
    courseJsonLd(c, { country: co.name, city: ct.name }),
    faqJsonLd(c.faqs),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: co.name, url: `${SITE.url}/${slug}` },
      { name: baseCourseTitle(c.shortTitle), url: `${SITE.url}/${slug}/${course}` },
      { name: `${baseCourseTitle(c.shortTitle)} in ${ct.name}`, url: `${SITE.url}/${slug}/${course}/${city}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <CoursePageContent course={c} countrySlug={slug} citySlug={city} countryName={co.name} cityName={ct.name} cities={cities} currency={currency} currencies={currencyCfg.currencies} />
      <TrainerSection courseSlug={c.slug} />
      <StickyCta courseTitle={c.shortTitle} priceLabel={c.basePriceUsd ? formatInCurrency(c.basePriceUsd, currency, currencyCfg.currencies) : undefined} />
    </>
  );
}
