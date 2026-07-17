import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePageContent } from "@/components/course-page-content";
import { baseCourseTitle, composeCourseTitle, SITE, stripBrandSuffix } from "@/lib/utils";
import { NOINDEX } from "@/lib/indexing";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getCourseBySlug, getCountryBySlug, getCities, getCourseVariant } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";

// Per-request (currency via cookies/headers) and ~10k country×course combos —
// render dynamically on each request rather than pre-building or caching.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; course: string }> }): Promise<Metadata> {
  const { slug, course } = await params;
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
  const [c, co, currency, currencyCfg] = await Promise.all([getCourseBySlug(course), getCountryBySlug(slug), getDisplayCurrency(), getCurrencyConfig()]);
  if (!c || !co) notFound();
  const cities = (await getCities()).filter((x) => x.country.slug === co.slug).map((x) => ({ slug: x.slug, name: x.name }));

  const jsonLd = [
    courseJsonLd(c, { country: co.name }),
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
      <CoursePageContent course={c} countrySlug={slug} countryName={co.name} cities={cities} currency={currency} currencies={currencyCfg.currencies} />
    </>
  );
}
