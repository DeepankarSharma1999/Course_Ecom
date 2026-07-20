import type { CourseContent } from "@/lib/seed-data";
import type { CourseSchedule } from "@/lib/content";
import { SITE } from "@/lib/utils";

// Verified official profiles (FIX-14/15/16) — used for Organization sameAs and
// linked from the site footer. Add Google Business Profile and partner-body
// directory entries (Scrum Alliance/PMI/…) here as they come online (FIX-03).
export const ORG_PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/simplilead-consulting-services-llc" },
  { label: "Trustpilot", href: "https://www.trustpilot.com/review/simplilead.com" },
  { label: "The Training Marketplace", href: "https://thetm.com/training-provider/simplilead-consulting-services" },
] as const;

export const ORG_SAME_AS: string[] = ORG_PROFILES.map((p) => p.href);

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
