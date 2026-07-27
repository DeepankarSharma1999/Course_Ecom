// Branded 1200x630 blog hero generator (SVG -> sharp -> PNG). Used by the
// admin saveBlog action and scripts/generate-blog-images.ts so every post —
// seeded or admin-created — gets the same image treatment automatically.
// ponytail: writes into public/images/blog, which persists on a node server
// but not on serverless filesystems — if the write fails we return null and
// the post falls back to the site logo in schema/OG.
import * as fs from "fs";
import * as path from "path";

type Palette = { from: string; to: string; accent: string; label: string };
const PALETTES: Record<string, Palette> = {
  "Agile & Scrum": { from: "#0B5E5E", to: "#1FA8A8", accent: "#FDE047", label: "AGILE & SCRUM" },
  SAFe: { from: "#1E3A8A", to: "#4676F5", accent: "#93C5FD", label: "SAFe" },
  "Project Management": { from: "#92400E", to: "#F59E0B", accent: "#FEF3C7", label: "PROJECT MANAGEMENT" },
  "Product Management": { from: "#4C1D95", to: "#8B5CF6", accent: "#DDD6FE", label: "PRODUCT MANAGEMENT" },
  "Generative AI": { from: "#0F172A", to: "#0891B2", accent: "#67E8F9", label: "GENERATIVE AI" },
};
const DEFAULT_PALETTE: Palette = { from: "#082032", to: "#0E7C7C", accent: "#7DE3E3", label: "SIMPLILEAD BLOG" };

export const BLOG_CATEGORIES = Object.keys(PALETTES);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrapTitle(title: string, maxChars = 26, maxLines = 4): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\W*\w+$/, "") + "…";
  }
  return lines;
}

export function buildHeroSvg(title: string, category: string | null, readMins: number | null): string {
  const p = (category && PALETTES[category]) || DEFAULT_PALETTE;
  const lines = wrapTitle(title);
  const fontSize = lines.length >= 4 ? 52 : 58;
  const lineHeight = fontSize * 1.22;
  const titleBlockH = lines.length * lineHeight;
  const titleY = (630 - titleBlockH) / 2 + fontSize * 0.35 + 30;

  const titleSpans = lines
    .map((l, i) => `<tspan x="80" y="${(titleY + i * lineHeight).toFixed(0)}">${esc(l)}</tspan>`)
    .join("");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.from}"/>
      <stop offset="1" stop-color="${p.to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#ffffff" opacity="0.10"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <circle cx="1080" cy="540" r="260" fill="#ffffff" opacity="0.06"/>
  <circle cx="1140" cy="90" r="150" fill="${p.accent}" opacity="0.14"/>
  <circle cx="60" cy="600" r="110" fill="#000000" opacity="0.10"/>
  <rect x="80" y="86" rx="17" ry="17" width="${p.label.length * 12 + 48}" height="34"
        fill="#ffffff" opacity="0.16"/>
  <text x="104" y="109" font-family="Segoe UI, Arial, sans-serif" font-size="16"
        font-weight="700" letter-spacing="2.5" fill="#ffffff">${esc(p.label)}</text>
  <text font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" font-weight="800"
        fill="#ffffff">${titleSpans}</text>
  <rect x="80" y="520" width="56" height="5" rx="2.5" fill="${p.accent}"/>
  <text x="80" y="562" font-family="Segoe UI, Arial, sans-serif" font-size="22"
        font-weight="700" fill="#ffffff" opacity="0.95">SimpliLEAD</text>
  <text x="228" y="562" font-family="Segoe UI, Arial, sans-serif" font-size="22"
        fill="#ffffff" opacity="0.6">Blog${readMins ? ` · ${readMins} min read` : ""}</text>
</svg>`;
}

/** Render and save the hero PNG; returns the public path or null on failure. */
export async function generateBlogHero(
  slug: string,
  title: string,
  category: string | null,
  readMins: number | null
): Promise<string | null> {
  try {
    const sharp = (await import("sharp")).default;
    const outDir = path.join(process.cwd(), "public", "images", "blog");
    fs.mkdirSync(outDir, { recursive: true });
    const svg = buildHeroSvg(title, category, readMins);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}.png`));
    return `/images/blog/${slug}.png`;
  } catch {
    return null;
  }
}
