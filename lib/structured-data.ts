import type { CourseContent } from "@/lib/seed-data";
import type { CourseSchedule } from "@/lib/content";
import { SITE } from "@/lib/utils";

// TODO(owner): fill with the official profile URLs as they come online —
// Google Business Profile, Trustpilot, LinkedIn company page, and partner-body
// directory entries (Scrum Alliance/PMI/…) once FIX-03/FIX-14 are resolved.
// Empty array => sameAs is omitted from the Organization schema.
export const ORG_SAME_AS: string[] = [];

// Site-wide Organization schema (FIX-15). No ratings, no invented data.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
    },
    ...(ORG_SAME_AS.length ? { sameAs: ORG_SAME_AS } : {}),
  };
}

// Course + CourseInstance built from the REAL batch rows shown on the page.
// HARD RULE (FIX-15): no AggregateRating / Review schema until real, public
// third-party reviews exist (FIX-14) — fake rating markup invites a manual action.
export function courseJsonLd(course: CourseContent, location?: { country?: string; city?: string }, schedules: CourseSchedule[] = []) {
  const locationName = location?.city ? `${location.city}, ${location.country || "India"}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seoDescription || course.summary,
    url: `${SITE.url}/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    offers: {
      "@type": "Offer",
      category: "Training",
      price: course.basePriceInr,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    ...(schedules.length
      ? {
          hasCourseInstance: schedules.slice(0, 12).map((s) => ({
            "@type": "CourseInstance",
            courseMode: /online/i.test(s.mode) ? "Online" : "Onsite",
            startDate: s.startDate.toISOString().slice(0, 10),
            endDate: s.endDate.toISOString().slice(0, 10),
            ...(locationName ? { location: locationName } : {}),
          })),
        }
      : {}),
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
