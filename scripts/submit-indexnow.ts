// Submit every indexable URL to IndexNow (Bing/Copilot, Seznam, Naver, Yandex).
// Re-runnable — IndexNow dedupes server-side; run after each deploy that adds
// or changes pages. The key file must be live at {SITE}/{KEY}.txt (it's in
// public/), so run this AFTER the deploy is up.
// Run: npx tsx scripts/submit-indexnow.ts
import { COURSES, COUNTRIES, CITIES_IN } from "../lib/seed-data";

const SITE = "https://www.simplilead.training";
const HOST = "www.simplilead.training";
const KEY = "d82e876c8c7c4fb9a79160d1c6a0c5d7";

const CORE = ["", "/courses", "/combo-courses", "/corporate-training", "/about", "/enquire", "/resources", "/compare"];

async function main() {
  const slugs = COURSES.map((c) => c.slug);
  const urls = [
    ...CORE.map((p) => `${SITE}${p}`),
    ...slugs.map((s) => `${SITE}/${s}`),
    ...slugs.flatMap((s) => [
      ...COUNTRIES.map((co) => `${SITE}/${co.slug}/${s}`),
      ...CITIES_IN.map((ct) => `${SITE}/in/${s}/${ct.slug}`),
    ]),
  ];
  console.log(`submitting ${urls.length} urls to IndexNow…`);

  // IndexNow accepts up to 10,000 URLs per POST.
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
    });
    console.log(`batch ${i / 10000 + 1}: ${batch.length} urls -> HTTP ${res.status} ${res.statusText}`);
    if (!res.ok) console.log(await res.text());
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
