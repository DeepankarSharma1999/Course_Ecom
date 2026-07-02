// Extracts per-category "Credential Issuing Bodies" (logo + name) from the
// /ajaxGetMenuCourses payload. Emits TSV rows: <categoryName>\t<bodyName>\t<logoUrl>
// Usage: node parse-issuers.js <menu.json> <out.tsv>
const fs = require("fs");
const [, , inPath, outPath] = process.argv;
const h = JSON.parse(fs.readFileSync(inPath, "utf8")).data;

// Map content index K -> category name (the middle column header carries "<span class=me-2>NAME").
const idxToName = {};
for (const m of h.matchAll(/courses-content-(\d+)[\s\S]{0,200}?<span class="me-2">([^<]+)<\/span>/gi)) {
  idxToName[m[1]] = m[2].trim();
}

// Each right-column panel: accreditation-content-K ... rows of (logo img, name div).
const rows = [];
const panelRe = /accreditation-content-(\d+)"[^>]*>([\s\S]*?)(?=accreditation-content-\d+"|courses-content-\d+"|$)/gi;
for (const p of h.matchAll(panelRe)) {
  const name = idxToName[p[1]];
  if (!name) continue;
  const body = p[2];
  const bodyRe = /<img src="(https:\/\/www\.simpliaxis\.com\/storage\/images\/[^"]+)"[\s\S]{0,160}?sdt2co1">([^<]+)</gi;
  for (const b of body.matchAll(bodyRe)) {
    rows.push(`${name}\t${b[2].trim()}\t${b[1]}`);
  }
}
fs.writeFileSync(outPath, rows.join("\n"));
console.error("issuer rows:", rows.length);
