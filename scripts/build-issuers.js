// Downloads issuing-body logos and writes lib/issuer-manifest.json keyed by
// normalized category name (so our slugs match simpliaxis category labels).
// Usage: node build-issuers.js <issuers.tsv>
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public/images/courses/issuers");
const MANIFEST = path.join(ROOT, "lib/issuer-manifest.json");
fs.mkdirSync(OUT, { recursive: true });

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const rows = fs.readFileSync(process.argv[2], "utf8").split("\n").filter(Boolean);

(async () => {
  const manifest = {};
  for (const line of rows) {
    const [cat, name, url] = line.split("\t");
    const file = url.split("/").pop();
    const dest = path.join(OUT, file);
    if (!fs.existsSync(dest)) {
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) { console.error("FAIL", url, r.status); continue; }
      fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    }
    (manifest[norm(cat)] ??= []).push({ name, logo: `/images/courses/issuers/${file}` });
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.error("categories with issuers:", Object.keys(manifest).length);
})();
