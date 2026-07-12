// One-time migration: set the real certification body (accreditedBy) per course and,
// where we have the body's actual sample certificate in public/certificates/, set
// pageSections.certificate.image. Courses without a match become "Simplilead"
// (self-issued) and use the branded fallback in certificate-section.tsx.
// Run inside the web container: docker exec mindclick-web node scripts/assign-certificates.js
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const p = new PrismaClient();

// [slug regex, accreditedBy, certificate image key (optional)]
const RULES = [
  [/^csm-certification/, "Scrum Alliance", "csm"],
  [/^a-csm-certification/, "Scrum Alliance", "a-csm"],
  [/^cspo-certification/, "Scrum Alliance", "cspo"],
  [/^(a-cspo|csd|a-csd)-certification/, "Scrum Alliance"],
  [/^certified-scrum-professional/, "Scrum Alliance"],
  [/^cal-(i|ii)-certification/, "Scrum Alliance"],
  [/^agile-coaching-skills-certified-facilitator/, "Scrum Alliance"],
  [/^certified-agile-skills-scaling/, "Scrum Alliance"],

  [/^psm-certification$/, "Scrum.org", "psm"],
  [/^(psm|pspo|psd|pspbm)-/, "Scrum.org"],
  [/^professional-scrum-kanban/, "Scrum.org"],
  [/^professional-agile-leadership/, "Scrum.org"],
  [/^applying-professional-scrum/, "Scrum.org"],
  [/^applying-professional-kanban/, "ProKanban.org"],

  [/^leading-safe-certification/, "Scaled Agile, Inc.", "leading-safe"],
  [/^safe-scrum-master/, "Scaled Agile, Inc.", "safe-ssm"],
  [/^safe-product-owner/, "Scaled Agile, Inc.", "safe-popm"],
  [/^safe-rte/, "Scaled Agile, Inc.", "safe-rte"],
  [/^lean-portfolio-management-certification/, "Scaled Agile, Inc.", "safe-lpm"],
  [/^advanced-spc-certification/, "Scaled Agile, Inc.", "safe-spc"],

  [/icagile|^icp-/, "ICAgile"], // ICP-ACC's image comes from EXACT_IMAGES

  [/^pmp-certification/, "PMI", "pmp"],
  [/^capm-certification/, "PMI", "capm"],
  [/^program-management-professional/, "PMI", "pgmp"],
  [/^pmi-acp/, "PMI", "pmi-acp"],
  [/^(pfmp|cpmai)-certification/, "PMI"],
  [/^disciplined-agile/, "PMI"],

  [/^itil-5/, "PeopleCert", "itil5"],
  [/^itil/, "PeopleCert", "itil4"],
  [/^prince2/, "PeopleCert"],

  [/^cbap/, "IIBA", "cbap"],
  [/^ecba/, "IIBA", "ecba"],
  [/^(ccba|iiba-aac)/, "IIBA"],

  [/^devops-foundation/, "DevOps Institute", "devops-foundation"],
  [/^devsecops-foundation/, "DevOps Institute"],
  [/^continuous-(delivery|testing)/, "DevOps Institute"],

  [/^aws-sysops/, "Amazon Web Services", "aws-sysops"],
  [/^aws-(certified|cloud-practitioner|devops)/, "Amazon Web Services"],

  [/^az-104/, "Microsoft", "az-104"],
  [/^microsoft-azure-fundamentals-az-900/, "Microsoft", "az-900"],
  [/^microsoft-(az-400|azure|power-bi)/, "Microsoft"],

  [/^cissp/, "ISC2", "cissp"],
  [/^scrum-at-scale/, "Scrum Inc."],
  [/^artificial-intelligence-governance-professional/, "IAPP"],
  [/^iso-iec-42001/, "PECB"],
];

// Special-case: only the ICP-ACC course gets the ICP-ACC certificate image.
const EXACT_IMAGES = { "icp-acc-certification-training": "icp-acc" };

function classify(course) {
  if (EXACT_IMAGES[course.slug]) return { body: "ICAgile", key: EXACT_IMAGES[course.slug] };
  for (const [re, body, key] of RULES) {
    if (re.test(course.slug)) return { body, key: key || null };
  }
  if (course.category?.slug === "safe") return { body: "Scaled Agile, Inc.", key: null };
  return { body: "Simplilead", key: null };
}

(async () => {
  const courses = await p.course.findMany({
    select: { id: true, slug: true, pageSections: true, category: { select: { slug: true } } },
  });
  const counts = {};
  for (const c of courses) {
    const { body, key } = classify(c);
    counts[body] = (counts[body] || 0) + 1;
    const data = { accreditedBy: body };
    if (key) {
      const file = ["pmp"].includes(key) ? `/certificates/${key}.png` : `/certificates/${key}.webp`;
      if (!fs.existsSync("public" + file)) { console.error("missing file", file); continue; }
      const ps = c.pageSections && typeof c.pageSections === "object" ? c.pageSections : {};
      const cert = ps.certificate && typeof ps.certificate === "object" ? ps.certificate : {};
      if (!cert.image) data.pageSections = { ...ps, certificate: { ...cert, image: file } };
    }
    await p.course.update({ where: { id: c.id }, data });
    if (key) console.log("IMG", c.slug, "->", key, "|", body);
  }
  console.log(JSON.stringify(counts, null, 1));
  await p.$disconnect();
})();
