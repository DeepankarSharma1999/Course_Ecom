import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { INFO_PAGES } from "@/lib/info-content";
import { stripBrandSuffix, SITE, baseCourseTitle } from "@/lib/utils";
import { getAllCourses, getCourseBySlug } from "@/lib/content";
import { buildCourseGuide, isGuideEligible, isGuideListed } from "@/lib/course-guide";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import AnimatedContent from "./animated-content";
import CourseGuideContent from "./course-guide-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

// Placeholder info pages hidden until they carry real content.
const HIDDEN = new Set(["tutorials", "interview-questions", "course-info", "blogs"]);

// Static info pages plus one certification guide per eligible course.
export async function generateStaticParams() {
  const staticSlugs = Object.keys(INFO_PAGES).filter((slug) => !HIDDEN.has(slug));
  const courses = await getAllCourses();
  const guideSlugs = courses.filter(isGuideListed).map((c) => c.slug);
  return [...staticSlugs, ...guideSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = INFO_PAGES[slug];
  if (content) {
    return {
      // Stored titles carry "| SimpliLEAD"; the layout template re-appends it (FIX-04).
      title: stripBrandSuffix(content.title),
      description: content.description,
      keywords: content.keywords,
      alternates: { canonical: `/info/${slug}` },
    };
  }

  const course = await getCourseBySlug(slug);
  if (course && isGuideEligible(course)) {
    const guide = buildCourseGuide(course);
    return {
      title: guide.title,
      description: guide.description,
      alternates: { canonical: `/info/${slug}` },
      openGraph: {
        title: `${guide.title} | ${SITE.name}`,
        description: guide.description,
        url: `${SITE.url}/info/${slug}`,
        images: course.heroImage ? [course.heroImage] : [],
      },
    };
  }

  return { title: "Page Not Found" };
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const content = INFO_PAGES[slug];

  if (content && !HIDDEN.has(slug)) {
    return <AnimatedContent content={content} slug={slug} />;
  }

  const course = await getCourseBySlug(slug);
  if (!course || !isGuideEligible(course)) {
    notFound();
  }

  const guide = buildCourseGuide(course);

  // Related guides: siblings from the same category.
  const all = await getAllCourses();
  const related = all
    .filter((c) => c.category.slug === course.category.slug && c.slug !== course.slug && isGuideListed(c))
    .slice(0, 3)
    .map((c) => ({ slug: c.slug, name: baseCourseTitle(c.title) }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      mainEntityOfPage: `${SITE.url}/info/${slug}`,
      ...(course.heroImage ? { image: course.heroImage } : {}),
    },
    faqJsonLd(guide.faqs),
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: "Courses", url: `${SITE.url}/courses` },
      { name: `${guide.name} Guide`, url: `${SITE.url}/info/${slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <CourseGuideContent guide={guide} course={course} related={related} />
    </>
  );
}
