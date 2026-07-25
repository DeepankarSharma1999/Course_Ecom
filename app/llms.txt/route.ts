// llms.txt (https://llmstxt.org) — a machine-readable site guide for AI answer
// engines (ChatGPT, Claude, Perplexity, Copilot). Lists every published course
// with its canonical URL so answer engines can cite course pages directly.
import { getAllCourses } from "@/lib/content";
import { SITE, baseCourseTitle } from "@/lib/utils";
import { GEO_COURSES, getGeoCountries, getGeoCities } from "@/lib/geo-pages/data";
import { isCityIndexable, isCountryIndexable } from "@/lib/geo-pages/gate";

export const revalidate = 3600;

export async function GET() {
  const courses = await getAllCourses();

  const byCategory = new Map<string, { name: string; lines: string[] }>();
  for (const c of courses) {
    const cat = c.category?.name || "Other";
    if (!byCategory.has(cat)) byCategory.set(cat, { name: cat, lines: [] });
    byCategory.get(cat)!.lines.push(
      `- [${baseCourseTitle(c.title)}](${SITE.url}/${c.slug}): ${c.durationLabel || "Live"} instructor-led certification training${c.basePriceUsd ? `, from US$${c.basePriceUsd}` : ""}`
    );
  }

  const sections = [...byCategory.values()]
    .map((s) => `## ${s.name}\n\n${s.lines.join("\n")}`)
    .join("\n\n");

  // Released geo pages only — kept in lockstep with the sitemap's publishing
  // gate so LLMs are never pointed at noindex drafts.
  const geoLines = GEO_COURSES.flatMap((course) => {
    const courseName = baseCourseTitle(courses.find((c) => c.slug === course)?.title ?? course);
    return getGeoCountries().flatMap((co) => [
      ...(isCountryIndexable(co.iso)
        ? [`- [${courseName} in ${co.name}](${SITE.url}/${course}/${co.iso}): live online batches, local pricing and exam cost`]
        : []),
      ...getGeoCities()
        .filter((ct) => ct.country === co.iso && isCityIndexable(co.iso, ct.slug))
        .map((ct) => `- [${courseName} in ${ct.name}](${SITE.url}/${course}/${co.iso}/${ct.slug}): batch dates in ${ct.name} local time, sourced salaries, city FAQs`),
    ]);
  });
  const geoSection = geoLines.length ? `\n\n## Locations\n\n${geoLines.join("\n")}` : "";

  const body = `# ${SITE.name}

> ${SITE.name} (${SITE.url}) is a global certification training provider: live, instructor-led courses in Agile, Scrum, SAFe, project management, business analysis, DevOps, cloud, data science, and generative/agentic AI, with certification exam preparation, weekend and weekday batches across timezones, and city pages for major locations in India and worldwide.

Key pages: [All courses](${SITE.url}/courses) · [Combo courses](${SITE.url}/combo-courses) · [Corporate training](${SITE.url}/corporate-training) · [Contact](${SITE.url}/enquire)

Location pages follow the pattern ${SITE.url}/{course-slug}/{country-code}/{city} (e.g. ${SITE.url}/pmp-certification-training/in/bangalore) — released pages are listed under Locations below. (Older /{country}/{course-slug} URLs are legacy variants; prefer the pattern above.)

Every course also has a certification guide at ${SITE.url}/info/{course-slug} covering syllabus, eligibility, exam format, pass marks, cost and renewal (e.g. ${SITE.url}/info/csm-certification-training).

${sections}${geoSection}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
