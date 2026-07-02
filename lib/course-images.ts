// Gives every course a distinct, topic-appropriate hero image instead of the single
// shared placeholder that all ~130 courses used. All images are Unsplash (Unsplash
// Licence — free commercial use, no attribution required) and on the host already
// allow-listed in next.config.mjs. See IMAGE-ATTRIBUTIONS.md.
//
// ponytail: deterministic theme + slug-hash pick. Worst case is a less-on-topic image,
// never a crash — resolveHeroImage always returns a valid pool URL and never the dup.

import { COURSE_IMAGE_MAP } from "./course-image-map";

// Images are hosted locally under public/images/vendor/unsplash/ (downloaded once via
// scripts/localize-images.mjs) so the site never fetches from an external host at runtime.
const U = (id: string) => `/images/vendor/unsplash/${id}.jpg`;

// The one image every course shared before this change.
const DUP = "photo-1552664730-d307ca884978";

const THEMES = {
  agile: [
    U("photo-1531482615713-2afd69097998"),
    U("photo-1542744173-8e7e53415bb0"),
    U("photo-1600880292203-757bb62b4baf"),
    U("photo-1517245386807-bb43f82c33c4"),
  ],
  project: [
    U("photo-1454165804606-c3d57bc86b40"),
    U("photo-1556761175-5973dc0f32e7"),
    U("photo-1521737604893-d14cc237f11d"),
    U("photo-1497032628192-86f99bcd76bc"),
  ],
  devops: [
    U("photo-1518770660439-4636190af475"),
    U("photo-1504384308090-c894fdcc538d"),
    U("photo-1551288049-bebda4e38f71"),
    U("photo-1488590528505-98d2b5aba04b"),
  ],
  ai: [
    U("photo-1488590528505-98d2b5aba04b"),
    U("photo-1551288049-bebda4e38f71"),
    U("photo-1518770660439-4636190af475"),
    U("photo-1504384308090-c894fdcc538d"),
  ],
  business: [
    U("photo-1497032628192-86f99bcd76bc"),
    U("photo-1521737604893-d14cc237f11d"),
    U("photo-1556761175-5973dc0f32e7"),
    U("photo-1454165804606-c3d57bc86b40"),
  ],
  default: [
    U("photo-1524178232363-1fb2b075b655"),
    U("photo-1573496359142-b8d87734a5a2"),
    U("photo-1522071820081-009f0129c71c"),
    U("photo-1523240795612-9a054b0db644"),
    U("photo-1501504905252-473c47e087f8"),
  ],
} as const;

type Theme = keyof typeof THEMES;

function themeFor(text: string): Theme {
  const s = text.toLowerCase();
  if (/safe|scrum|agile|kanban|sprint|csm|cspo|popm|less|scaled|rte|spc/.test(s)) return "agile";
  if (/pmp|prince2|project|program|portfolio|pgmp|capm|pmi-/.test(s)) return "project";
  if (/devops|cloud|aws|azure|docker|kubernetes|sre|reliab|terraform|ci\/cd|platform/.test(s)) return "devops";
  if (/\bai\b|gen ai|machine learn|data scien|\bml\b|analytics|llm|prompt|agentic/.test(s)) return "ai";
  if (/business|leader|product|management|strategy|coach|design think/.test(s)) return "business";
  return "default";
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Returns a stable hero image for a course. Keeps a genuinely custom image;
 * replaces an empty value or the old shared placeholder with a topic-matched one.
 */
export function resolveHeroImage(current: string | null | undefined, slug: string, category?: string): string {
  // Keep a genuinely custom image (e.g. the bespoke course PNGs); ignore the old shared
  // placeholder and any prior theme-pool path so the curated per-course map can take over.
  if (current && !current.includes(DUP) && !current.includes("/vendor/unsplash/")) return current;
  if (COURSE_IMAGE_MAP[slug]) return COURSE_IMAGE_MAP[slug];
  const pool = THEMES[themeFor(`${category ?? ""} ${slug}`)];
  return pool[hash(slug) % pool.length];
}
