import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePageContent } from "@/components/course-page-content";
import { TrainerSection } from "@/components/trainer-section";
import { baseCourseTitle, composeCourseTitle, SITE, stripBrandSuffix } from "@/lib/utils";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { COUNTRIES, getAllCourses, getCourseBySlug, findCountry, getCourseVariant } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return COUNTRIES.flatMap((country) => courses.map((c) => ({ slug: country.slug, course: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; course: string }> }): Promise<Metadata> {
  const { slug, course } = await params;
  const c = await getCourseBySlug(course); const co = findCountry(slug);
  if (!c || !co) return {};
  const variant = await getCourseVariant(course, slug);
  const title = stripBrandSuffix(variant?.seoTitle) || composeCourseTitle(c.shortTitle, { country: co.name });
  const description = variant?.seoDescription || `${c.seoDescription} Now available across ${co.name} — live online & classroom batches.`;
  return {
    title, description, keywords: c.seoKeywords,
    alternates: { canonical: `/${slug}/${course}` },
    openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}/${slug}/${course}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; course: string }> }) {
  const { slug, course } = await params;
  const [c, currency, currencyCfg] = await Promise.all([getCourseBySlug(course), getDisplayCurrency(), getCurrencyConfig()]);
  const co = findCountry(slug);
  if (!c || !co) notFound();

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
      <CoursePageContent course={c} countrySlug={slug} currency={currency} currencies={currencyCfg.currencies} />
      <TrainerSection courseSlug={c.slug} />
    </>
  );
}
