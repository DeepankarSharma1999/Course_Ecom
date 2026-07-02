// Extracts (course-slug -> seal-badge URL) pairs from simpliaxis's /ajaxGetMenuCourses payload.
// Usage: node parse-menu-badges.js <menu.json> <pairs.txt>
const fs = require("fs");
const [, , inPath, outPath] = process.argv;
const h = JSON.parse(fs.readFileSync(inPath, "utf8")).data;
// Split on each course anchor (they carry data-sub-course), then take the first
// storage image inside that item. Splitting avoids one match swallowing the next href.
const anchorRe = /href="https:\/\/www\.simpliaxis\.com\/(?:in\/)?([a-z0-9-]+)"\s+data-sub-course=/gi;
const hits = [];
let m;
while ((m = anchorRe.exec(h))) hits.push({ slug: m[1], at: m.index });
const seen = {};
hits.forEach((hit, k) => {
  const chunk = h.slice(hit.at, hits[k + 1] ? hits[k + 1].at : hit.at + 600);
  const img = (chunk.match(/<img src="(https:\/\/www\.simpliaxis\.com\/storage\/images\/[^"]+)"/) || [])[1];
  if (img && !seen[hit.slug]) seen[hit.slug] = img;
});
fs.writeFileSync(outPath, Object.entries(seen).map(([s, u]) => `${s}\t${u}`).join("\n"));
console.error("menu pairs:", Object.keys(seen).length);
