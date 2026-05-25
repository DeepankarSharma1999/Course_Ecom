import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CoursePageContent } from "@/components/course-page-content";
import { TrainerSection } from "@/components/trainer-section";
import { StickyCta } from "@/components/sticky-cta";
import { CourseCountrySwitcher } from "@/components/course-country-switcher";
import { formatPrice } from "@/lib/utils";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/utils";
import { CITIES_IN, COUNTRIES, findCountry, findCity, getAllCourses, getCourseBySlug, getCourseVariant } from "@/lib/content";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.flatMap((c) => CITIES_IN.map((city) => ({ slug: "in", course: c.slug, city: city.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; course: string; city: string }> }): Promise<Metadata> {
  const { slug, course, city } = await params;
  const c = await getCourseBySlug(course); const co = findCountry(slug); const ct = findCity(city);
  if (!c || !co || !ct) return {};
  const variant = await getCourseVariant(course, slug, city);
  const title = variant?.seoTitle || `${c.shortTitle} Certification Training in ${ct.name} | Course_Ecom`;
  const description = variant?.seoDescription || `Become a certified ${c.shortTitle} in ${ct.name}. ${c.summary} Weekend & weekday batches available.`;
  return {
    title, description, keywords: `${c.seoKeywords}, ${c.shortTitle} ${ct.name}, ${c.shortTitle} training in ${ct.name}`,
    alternates: { canonical: `/${slug}/${course}/${city}` },
    openGraph: { title, description, images: c.heroImage ? [c.heroImage] : [], url: `${SITE.url}/${slug}/${course}/${city}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string; course: string; city: string }> }) {
  const { slug, course, city } = await params;
  const c = await getCourseBySlug(course); const co = findCountry(slug); const ct = findCity(city);
  if (!c || !co || !ct) notFound();

  const jsonLd = [
    courseJsonLd(c, { country: co.name, city: ct.name }),
    faqJsonLd(c.faqs),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: co.name, url: `${SITE.url}/${slug}` },
      { name: c.shortTitle, url: `${SITE.url}/${slug}/${course}` },
      { name: `${c.shortTitle} in ${ct.name}`, url: `${SITE.url}/${slug}/${course}/${city}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <CoursePageContent course={c} countrySlug={slug} citySlug={city} />
      <TrainerSection courseSlug={c.slug} />
      <StickyCta courseTitle={c.shortTitle} priceLabel={c.basePriceInr ? formatPrice(c.basePriceInr, "INR") : undefined} />
      <CourseCountrySwitcher courseSlug={c.slug} currentCountrySlug={slug} countries={COUNTRIES} />
    </>
  );
}
