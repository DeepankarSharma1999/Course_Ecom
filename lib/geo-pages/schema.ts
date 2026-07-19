// JSON-LD for geo pages. Same honesty rules as lib/structured-data.ts:
// no AggregateRating/Review anywhere, no fabricated fields — omit instead.
import type { CourseContent } from "@/lib/seed-data";
import { SITE } from "@/lib/utils";
import type { BatchTrack, GeoCountry } from "./data";
import { hasTodo } from "./gate";

export function geoCourseJsonLd(
  course: CourseContent,
  url: string,
  country: GeoCountry,
  track: BatchTrack,
  cityName?: string,
) {
  // Offers only once real pricing exists — priceDisplay is a display string
  // ("₹45,000"); extract the numeric part, omit offers if TODO or unparseable.
  const priceNum = hasTodo(country.priceDisplay)
    ? NaN
    : Number(country.priceDisplay.replace(/[^0-9.]/g, ""));
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seoDescription || course.summary,
    url,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    ...(Number.isFinite(priceNum) && priceNum > 0
      ? {
          offers: {
            "@type": "Offer",
            category: "Training",
            price: priceNum,
            priceCurrency: country.currency,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    hasCourseInstance: track.batches.slice(0, 12).map((b) => ({
      "@type": "CourseInstance",
      courseMode: "Online",
      startDate: b.startDate,
      endDate: b.endDate,
      ...(cityName ? { location: `${cityName}, ${country.name}` } : {}),
    })),
  };
}
