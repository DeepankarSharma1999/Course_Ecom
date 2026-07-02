// Assign each course a relevant, near-unique hero image from a curated, topical
// Unsplash pool (no API key). Downloads+verifies candidate ids (prunes 404s),
// then round-robins images within each topic bucket so repeats are minimised.
// Output: lib/course-image-map.ts  (slug -> /images/vendor/unsplash/<id>.jpg)
//
// Usage: node scripts/assign-course-images.mjs
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const DIR = "public/images/vendor/unsplash";
mkdirSync(DIR, { recursive: true });

// Curated candidate ids grouped by topic. Best-effort topical grouping of common
// Unsplash stock; unverified ids are pruned on download so buckets self-heal.
const POOL = {
  scrum: ["photo-1551434678-e076c223a692", "photo-1552581234-26160f608093", "photo-1531403009284-440f080d1e12", "photo-1517245386807-bb43f82c33c4", "photo-1600880292203-757bb62b4baf", "photo-1542626991-cbc4e32524cc", "photo-1543269865-cbf427effbad", "photo-1515378791036-0648a3ef77b2", "photo-1521791136064-7986c2920216", "photo-1573164574572-cb89e39749b4", "photo-1556761175-5973dc0f32e7"],
  kanban: ["photo-1531482615713-2afd69097998", "photo-1542744173-8e7e53415bb0", "photo-1517048676732-d65bc937f952", "photo-1484480974693-6ca0a78fb36b", "photo-1611224885990-ab7363d1f2a9"],
  safe: ["photo-1542744094-3a31f272c490", "photo-1556761175-5973dc0f32e7", "photo-1523240795612-9a054b0db644", "photo-1431540015161-0bf868a2d407", "photo-1497366216548-37526070297c", "photo-1497366811353-6870744d04b2", "photo-1604328698692-f76ea9498e76", "photo-1556761175-b413da4baf72"],
  leadership: ["photo-1560250097-0b93528c311a", "photo-1573496359142-b8d87734a5a2", "photo-1556155092-490a1ba16284", "photo-1551836022-d5d88e9218df", "photo-1507679799987-c73779587ccf", "photo-1573497620053-ea5300f94f21", "photo-1542744173-8e7e53415bb0"],
  coaching: ["photo-1522202176988-66273c2fd55f", "photo-1577896851231-70ef18881754", "photo-1543269664-56d93c1b41a6", "photo-1503676260728-1c00da094a0b", "photo-1524178232363-1fb2b075b655"],
  project: ["photo-1454165804606-c3d57bc86b40", "photo-1521737604893-d14cc237f11d", "photo-1517048676732-d65bc937f952", "photo-1484480974693-6ca0a78fb36b", "photo-1486406146926-c627a92ad1ab", "photo-1542435503-956c469947f6", "photo-1507120410856-1f35574c3b45"],
  prince2: ["photo-1450101499163-c8848c66ca85", "photo-1568667256549-094345857637", "photo-1507003211169-0a1dd7228f2d"],
  devops: ["photo-1518770660439-4636190af475", "photo-1504384308090-c894fdcc538d", "photo-1593642702821-c8da6771f0c6", "photo-1667372393119-3d4c48d07fc9", "photo-1605379399642-870262d3d051", "photo-1607799279861-4dd421887fb3"],
  cloud: ["photo-1591453089816-0fbb971b454c", "photo-1544197150-b99a580bb7a8", "photo-1451187580459-43490279c0fa", "photo-1558494949-ef010cbdcc31", "photo-1597852074816-d933c7d2b988"],
  ai: ["photo-1620712943543-bcc4688e7485", "photo-1535378917042-10a22c95931a", "photo-1485827404703-89b55fcc595e", "photo-1526374965328-7f61d4dc18c5", "photo-1555255707-c07966088b7b"],
  genai: ["photo-1677442136019-21780ecad995", "photo-1677756119517-756a188d2d94", "photo-1696258686454-60082b2c33c8", "photo-1712002641088-9d76f9080889", "photo-1701002666771-92d4a0c4b9a3"],
  data: ["photo-1551288049-bebda4e38f71", "photo-1460925895917-afdab827c52f", "photo-1553877522-43269d4ea984", "photo-1559136555-9303baea8ebd", "photo-1556742049-0cfed4f6a45d", "photo-1543286386-2e659306cd6c", "photo-1504868584819-f8e8b4b6d7e3"],
  quality: ["photo-1581092160562-40aa08e78837", "photo-1581092918056-0c4c3acd3789", "photo-1565793298595-6a879b1d9492", "photo-1567789884554-0b844b597180"],
  itil: ["photo-1556745757-8d76bdb6984b", "photo-1486312338219-ce68d2c6f44d", "photo-1521737711867-e3b97375f902"],
  security: ["photo-1550751827-4bd374c3f58b", "photo-1563986768609-322da13575f3", "photo-1526374965328-7f61d4dc18c5"],
  analysis: ["photo-1454165804606-c3d57bc86b40", "photo-1551288049-bebda4e38f71", "photo-1460925895917-afdab827c52f", "photo-1543286386-2e659306cd6c"],
  design: ["photo-1531403009284-440f080d1e12", "photo-1561070791-2526d30994b5", "photo-1558655146-9f40138edfeb"],
  programming: ["photo-1488590528505-98d2b5aba04b", "photo-1573164713988-8665fc963095", "photo-1581091226825-a6a2a5aee158", "photo-1497032628192-86f99bcd76bc", "photo-1461749280684-dccba630e2f6", "photo-1498050108023-c5249f4df085", "photo-1555066931-4365d14bab8c"],
  blockchain: ["photo-1639762681485-074b7f938ba0", "photo-1621416894569-0f39ed31d247", "photo-1518546305927-5a555bb7020d"],
  business: ["photo-1524178232363-1fb2b075b655", "photo-1522071820081-009f0129c71c", "photo-1549465220-1a8b9238cd48", "photo-1573497019940-1c28c88b4f3e", "photo-1521737711867-e3b97375f902", "photo-1486406146926-c627a92ad1ab"],
  default: ["photo-1501504905252-473c47e087f8", "photo-1507003211169-0a1dd7228f2d", "photo-1524178232363-1fb2b075b655", "photo-1517245386807-bb43f82c33c4"],
};

// title-keyword -> bucket (first match wins; order specific -> general)
const RULES = [
  [/safe|scaled|spc|rte|popm|sasm|art\b|lean portfolio|aspc/, "safe"],
  [/kanban/, "kanban"],
  [/scrum|sprint|csm|cspo|psm|pspo|csd|psd|backlog/, "scrum"],
  [/coach|facilitat|icp-acc|icp-atf|mentor/, "coaching"],
  [/leader|executive|manager|cal |pal-|agile leadership/, "leadership"],
  [/prince2/, "prince2"],
  [/pmp|capm|pgmp|pfmp|project management|primavera|disciplined agile|cpmai|program management|portfolio management/, "project"],
  [/devops|docker|kubernetes|ci\/cd|continuous (delivery|testing)|devsecops|site reliab/, "devops"],
  [/aws|azure|cloud|az-\d|finops|solutions architect/, "cloud"],
  [/agentic|generative|gen ai|\bgenai\b|prompt|llm|claude|openai/, "genai"],
  [/\bai\b|artificial intelligence|machine learning|\bml\b|neural/, "ai"],
  [/data scien|python|django|analytics|power bi/, "data"],
  [/six sigma|lean|quality|root cause|iso-iec|iso /, "quality"],
  [/itil|service management|service desk/, "itil"],
  [/cissp|security|pci dss|cyber|governance/, "security"],
  [/business analy|cbap|ccba|ecba|iiba|requirements/, "analysis"],
  [/design thinking|ux|user experience/, "design"],
  [/blockchain|crypto|web3/, "blockchain"],
  [/react|angular|node|javascript|programming|developer|software (developer|engineer)|bdd|tdd/, "programming"],
  [/business|change management|conflict|business case/, "business"],
];

const CATEGORY_BUCKET = {
  agile: "scrum", safe: "safe", project: "project", business: "business",
  "generative-ai": "genai", "data-science": "data", quality: "quality",
  service: "itil", devops: "devops", "cloud-computing": "cloud",
  technology: "programming", others: "business", microcredentials: "coaching",
  "on-demand-microcredentials": "coaching",
};

function bucketFor(title, categorySlug) {
  const s = title.toLowerCase();
  for (const [re, b] of RULES) if (re.test(s)) return b;
  return CATEGORY_BUCKET[categorySlug] || "default";
}

const heroPath = (id) => `/images/vendor/unsplash/${id}.jpg`;

// 1) Download + verify every candidate id; drop dead ones from the pool.
const allIds = [...new Set(Object.values(POOL).flat())];
const dead = new Set();
let dl = 0, reuse = 0;
for (const id of allIds) {
  const f = path.join(DIR, `${id}.jpg`);
  if (existsSync(f)) { reuse++; continue; }
  await new Promise((r) => setTimeout(r, 250));
  try {
    const res = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) throw new Error("too small / not an image");
    writeFileSync(f, buf);
    dl++;
  } catch (e) {
    dead.add(id);
    console.warn(`  ✗ ${id} (${e.message}) — dropped`);
  }
}
const clean = {};
for (const [b, ids] of Object.entries(POOL)) {
  clean[b] = ids.filter((id) => !dead.has(id));
  if (clean[b].length === 0) clean[b] = POOL.default.filter((id) => !dead.has(id));
}
console.log(`Pool: downloaded ${dl}, reused ${reuse}, dead ${dead.size}, usable ${allIds.length - dead.size}`);

// 2) Group courses by bucket, round-robin assign for max spread.
const prisma = new PrismaClient();
const courses = await prisma.course.findMany({ include: { category: true } });
await prisma.$disconnect();

const byBucket = {};
for (const c of courses.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const b = bucketFor(c.title, c.category?.slug);
  (byBucket[b] ||= []).push(c.slug);
}

const map = {};
for (const [b, slugs] of Object.entries(byBucket)) {
  const ids = clean[b];
  slugs.forEach((slug, i) => { map[slug] = heroPath(ids[i % ids.length]); });
}

// 3) Report per-category distinct-image counts (uniqueness check).
const catOf = Object.fromEntries(courses.map((c) => [c.slug, c.category?.slug]));
const perCat = {};
for (const [slug, img] of Object.entries(map)) {
  const cat = catOf[slug] || "?";
  (perCat[cat] ||= { imgs: new Set(), n: 0 });
  perCat[cat].imgs.add(img); perCat[cat].n++;
}
console.log("\nCategory  distinct/total images:");
for (const [cat, v] of Object.entries(perCat).sort((a, b) => b[1].n - a[1].n))
  console.log(`  ${cat.padEnd(28)} ${v.imgs.size}/${v.n}`);

// 4) Write the map module.
const entries = Object.entries(map).sort().map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");
writeFileSync("lib/course-image-map.ts",
`// AUTO-GENERATED by scripts/assign-course-images.mjs — do not edit by hand.
// Maps each course slug to a curated, topical, locally-hosted hero image.
export const COURSE_IMAGE_MAP: Record<string, string> = {\n${entries}\n};\n`);
console.log(`\nWrote lib/course-image-map.ts (${Object.keys(map).length} courses).`);
