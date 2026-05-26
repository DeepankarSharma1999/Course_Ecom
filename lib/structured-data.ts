import type { CourseContent } from "@/lib/seed-data";
import { SITE } from "@/lib/utils";

export function courseJsonLd(course: CourseContent, location?: { country?: string; city?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seoDescription || course.summary,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.ratingAvg.toString(),
      reviewCount: course.ratingCount.toString(),
      bestRating: "5",
    },
    offers: {
      "@type": "Offer",
      category: "Training",
      price: course.basePriceInr,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Blended",
      location: location?.city ? `${location.city}, ${location.country || "India"}` : "Online",
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
