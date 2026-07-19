// JSON-LD for geo pages. Same honesty rules as lib/structured-data.ts:
// no AggregateRating/Review anywhere, no fabricated fields — omit instead.
import type { CourseContent } from "@/lib/seed-data";
import { SITE } from "@/lib/utils";
import { upcomingBatches, type BatchTrack, type GeoCountry } from "./data";
import { hasTodo } from "./gate";

export function geoCourseJsonLd(
  course: CourseContent,
  url: string,
  country: GeoCountry,
  track: BatchTrack,
  cityName?: string,
) {
  // Offers only once real per-course pricing exists — omit while TODO.
  const price = country.pricing[course.slug];
  const hasPrice = !!price && !hasTodo(price) && price.amount > 0;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seoDescription || course.summary,
    url,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    ...(hasPrice
      ? {
          offers: {
            "@type": "Offer",
            category: "Training",
            price: price.amount,
            priceCurrency: price.currency,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    hasCourseInstance: upcomingBatches(track, 12).map((b) => ({
      "@type": "CourseInstance",
      courseMode: "Online",
      startDate: b.startDate,
      endDate: b.endDate,
      ...(cityName ? { location: `${cityName}, ${country.name}` } : {}),
    })),
  };
}
