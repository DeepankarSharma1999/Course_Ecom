import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { CoursePageContent } from "@/components/course-page-content";
import { TrainerSection } from "@/components/trainer-section";
import { StickyCta } from "@/components/sticky-cta";
import { courseJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/utils";
import { COUNTRIES, getAllCourses, getCourseBySlug, findCountry } from "@/lib/content";
import { getDisplayCurrency } from "@/lib/geo";
import { formatInCurrency } from "@/lib/currency";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return [
    ...courses.map((c) => ({ slug: c.slug })),
    ...COUNTRIES.map((co) => ({ slug: co.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (course) {
    return {
      title: course.seoTitle,
      description: course.seoDescription,
      keywords: course.seoKeywords,
      alternates: { canonical: `/${slug}` },
      openGraph: { title: course.seoTitle, description: course.seoDescription, images: course.heroImage ? [course.heroImage] : [], url: `${SITE.url}/${slug}` },
    };
  }
  const country = findCountry(slug);
  if (country) {
    return {
      title: `Certification Training in ${country.name}`,
      description: `Globally accredited certification training in ${country.name}. Live online & classroom batches in major cities.`,
      alternates: { canonical: `/${slug}` },
    };
  }
  return {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [course, currency] = await Promise.all([getCourseBySlug(slug), getDisplayCurrency()]);
  if (course) {
    const jsonLd = [
      courseJsonLd(course),
      faqJsonLd(course.faqs),
      breadcrumbJsonLd([
        { name: "Home", url: SITE.url },
        { name: course.category.name, url: `${SITE.url}/category/${course.category.slug}` },
        { name: course.shortTitle, url: `${SITE.url}/${course.slug}` },
      ]),
    ];
    return (
      <>
        {jsonLd.map((d, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
        ))}
        <CoursePageContent course={course} currency={currency} />
        <TrainerSection courseSlug={course.slug} />
        <StickyCta courseTitle={course.shortTitle} priceLabel={course.basePriceInr ? formatInCurrency(course.basePriceInr, currency) : undefined} />
      </>
    );
  }

  const country = findCountry(slug);
  if (country) {
    const all = await getAllCourses();
    return (
      <>
        <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
          <div className="container-tight py-14">
            <div className="text-sm text-brand-200 mb-2">Country</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Certification Training in {country.name}</h1>
            <p className="text-brand-100 text-lg max-w-2xl">Live online & classroom certification training across {country.name}.</p>
          </div>
        </section>
        <section className="section">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {all.map((c) => <CourseCard key={c.slug} course={c} country={country.slug} currency={currency} />)}
            </div>
          </div>
        </section>
      </>
    );
  }

  notFound();
}
