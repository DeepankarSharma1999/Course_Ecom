// One-shot: download external image URLs referenced in source into public/images/vendor/<host>/
// and rewrite the references to local paths. Skips dynamic ${...} URLs and generated-avatar
// services (pravatar/dicebear). Re-runnable — already-downloaded files are skipped.
//
// Usage: node scripts/localize-images.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "images", "vendor");

// host -> short subfolder name
const SUBFOLDER = {
  "images.unsplash.com": "unsplash",
  "images.pexels.com": "pexels",
  "upload.wikimedia.org": "wikimedia",
  "assets.aceternity.com": "aceternity",
  "unpkg.com": "unpkg",
  "cdn.worldvectorlogo.com": "worldvectorlogo",
  "www.transparenttextures.com": "textures",
};
const SKIP_HOSTS = new Set(["i.pravatar.cc", "api.dicebear.com"]); // generated, not real assets

// Find candidate source files (tracked .ts/.tsx under lib app components)
const files = execSync('git ls-files lib app components', { cwd: ROOT })
  .toString().split(/\r?\n/).filter((f) => /\.(ts|tsx)$/.test(f));

// Matches image URLs with an extension, OR any unsplash/pexels URL (extension-less, query ok).
const URL_RE = /https?:\/\/[^\s"'`)]+\.(?:png|jpe?g|webp|svg|gif|avif)(?:\?[^\s"'`)]*)?|https?:\/\/images\.(?:unsplash|pexels)\.com\/[^\s"'`)]+/gi;

function localFor(url) {
  const u = new URL(url);
  if (SKIP_HOSTS.has(u.hostname)) return null;
  const sub = SUBFOLDER[u.hostname] || u.hostname.replace(/[^a-z0-9]+/gi, "-");
  let base = path.basename(u.pathname) || "img";
  // unsplash paths are bare photo ids -> give them an extension
  if (u.hostname === "images.unsplash.com" && !/\.\w+$/.test(base)) base += ".jpg";
  base = base.replace(/[^a-z0-9._-]+/gi, "_");
  return { rel: `/images/vendor/${sub}/${base}`, abs: path.join(OUT_DIR, sub, base) };
}

// 1) Collect distinct static URLs across all files
const urls = new Set();
const fileText = new Map();
for (const f of files) {
  const text = readFileSync(path.join(ROOT, f), "utf8");
  fileText.set(f, text);
  for (const m of text.matchAll(URL_RE)) {
    const url = m[0];
    if (url.includes("${")) continue; // dynamic template literal
    urls.add(url);
  }
}

// 2) Download each distinct URL once
const map = new Map(); // url -> rel local path
let downloaded = 0, skipped = 0, failed = 0;
for (const url of urls) {
  const loc = localFor(url);
  if (!loc) { skipped++; continue; }
  map.set(url, loc.rel);
  if (existsSync(loc.abs)) continue;
  mkdirSync(path.dirname(loc.abs), { recursive: true });
  await new Promise((r) => setTimeout(r, 800)); // throttle: be polite, dodge HTTP 429
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(loc.abs, buf);
    downloaded++;
    console.log(`  ↓ ${url}\n    -> ${loc.rel} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    failed++;
    console.warn(`  ✗ ${url}  (${e.message}) — left as-is`);
    map.delete(url); // don't rewrite what we couldn't fetch
  }
}

// 3) Rewrite references in source files
let rewritten = 0;
for (const [f, text] of fileText) {
  let out = text;
  for (const [url, rel] of map) out = out.split(url).join(rel);
  if (out !== text) {
    writeFileSync(path.join(ROOT, f), out);
    rewritten++;
  }
}

console.log(`\nDownloaded ${downloaded}, reused ${urls.size - downloaded - failed - skipped}, skipped(generated) ${skipped}, failed ${failed}.`);
console.log(`Rewrote ${rewritten} source files.`);
