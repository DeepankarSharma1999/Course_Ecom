// llms.txt (https://llmstxt.org) — a machine-readable site guide for AI answer
// engines (ChatGPT, Claude, Perplexity, Copilot). Lists every published course
// with its canonical URL so answer engines can cite course pages directly.
import { getAllCourses } from "@/lib/content";
import { SITE, baseCourseTitle } from "@/lib/utils";

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

  const body = `# ${SITE.name}

> ${SITE.name} (${SITE.url}) is a global certification training provider: live, instructor-led courses in Agile, Scrum, SAFe, project management, business analysis, DevOps, cloud, data science, and generative/agentic AI, with certification exam preparation, weekend and weekday batches across timezones, and city pages for major locations in India and worldwide.

Key pages: [All courses](${SITE.url}/courses) · [Combo courses](${SITE.url}/combo-courses) · [Corporate training](${SITE.url}/corporate-training) · [Contact](${SITE.url}/enquire)

City/country pages follow the patterns ${SITE.url}/{country}/{course-slug} and ${SITE.url}/in/{course-slug}/{city} (e.g. ${SITE.url}/in/csm-certification-training/delhi).

${sections}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
