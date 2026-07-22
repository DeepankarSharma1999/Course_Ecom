// Compose course hero images for externally-certified courses: the certification
// body's official badge centered on a clean 4:3 brand canvas. Sources: high-res
// official badges staged in .cert-badge-tmp (Credly/body sites), else the local
// simpliaxis badge in public/images/courses/badges when it's >= 240px wide.
// Writes public/images/courses/cert-hero/<slug>.webp and points heroImage at it.
// Also clears the AI-generated hero PNGs so those courses fall back to the
// curated real-photo map in lib/course-image-map.ts.
// Run: docker exec mindclick-web node scripts/build-cert-heroes.js
const { PrismaClient } = require("@prisma/client");
const sharp = require("sharp");
const fs = require("fs");
const p = new PrismaClient();

const HI = ".cert-badge-tmp";
const LOCAL = "public/images/courses/badges";
const OUT = "public/images/courses/cert-hero";

// slug -> staged high-res badge file
const HI_MAP = {
  "csm-certification-training": "csm.png",
  "psm-certification": "psm.png",
  "psm-ii-certification": "psm2.png",
  "pspo-certification-training": "pspo.png",
  "pspo-advanced-certification-training": "pspo2.png",
  "psd-certification-training": "psd.png",
  "professional-scrum-kanban-certification-training": "psk.png",
  "professional-agile-leadership-essentials-training": "pal.png",
  "leading-safe-certification-training": "leading-safe.png",
  "safe-scrum-master-certification": "safe-ssm.png",
  "safe-advanced-scrum-master-certification": "safe-sasm.png",
  "safe-product-owner-product-manager-certification": "safe-popm.png",
  "safe-rte-certification": "safe-rte.png",
  "spc-certification-training": "safe-spc.png",
  "lean-portfolio-management-certification-training": "safe-lpm.png",
  "safe-agile-product-management-certification-training": "safe-apm.png",
  "safe-architects-certification": "safe-architect.png",
  "safe-devops-certification": "safe-devops.png",
  "safe-for-teams-certification-training": "safe-practitioner.png",
  "pmp-certification-training": "pmp.png",
  "capm-certification-training": "capm.png",
  "pmi-acp-certification-training": "pmi-acp.png",
  "program-management-professional-certification-training": "pgmp.png",
  "pfmp-certification-training": "pfmp.png",
  "cissp-certification-training": "cissp.png",
  "devops-foundation-certification": "devops-foundation.png",
  "continuous-testing-foundation-certification": "ctf.png",
  "itil-5-foundation-certification-training": "itil5.png",
  "aws-certified-solutions-architect-professional-certification-training": "aws-sap.png",
  "aws-cloud-practitioner-certification-training": "aws-cp.png",
  "aws-sysops-administrator-certification-training": "aws-sysops.png",
  "aws-devops-engineer-certification-training": "aws-devops.png",
  "microsoft-azure-fundamentals-az-900-course": "az-900.png",
  "az-104-microsoft-azure-administrator-certification-training": "ms-associate.svg",
  "microsoft-azure-developer-associate-az-204-certification-course": "ms-associate.svg",
  "microsoft-power-bi-certification-training": "ms-associate.svg",
  "microsoft-azure-architect-design-certification-training-course": "ms-expert.svg",
  "microsoft-az-400-devops-certification-training": "ms-expert.svg",
};

const W = 1200, H = 900;
// White rounded card on a soft brand-tinted gradient: Credly badges ship with an
// opaque white background, so the badge must sit on white to blend seamlessly.
const CARD_W = 780, CARD_H = 660, BADGE_W = 640, BADGE_H = 520;
const BG = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#ccfbf1"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="${(W - CARD_W) / 2 + 8}" y="${(H - CARD_H) / 2 + 10}" width="${CARD_W}" height="${CARD_H}" rx="28" fill="#0d9488" opacity="0.12"/>
  <rect x="${(W - CARD_W) / 2}" y="${(H - CARD_H) / 2}" width="${CARD_W}" height="${CARD_H}" rx="28" fill="#ffffff" stroke="#99f6e4" stroke-width="2"/>
</svg>`);

async function compose(src, dest) {
  const badge = await sharp(src, { density: 300 })
    .resize({ height: BADGE_H, width: BADGE_W, fit: "inside" })
    .png()
    .toBuffer();
  await sharp(BG).composite([{ input: badge, gravity: "center" }]).webp({ quality: 85 }).toFile(dest);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const courses = await p.course.findMany({
    where: { isPublished: true, NOT: { accreditedBy: "SimpliLEAD" } },
    select: { id: true, slug: true, heroImage: true },
  });
  let made = 0, skipped = 0;
  for (const c of courses) {
    let src = null;
    if (HI_MAP[c.slug] && fs.existsSync(`${HI}/${HI_MAP[c.slug]}`)) src = `${HI}/${HI_MAP[c.slug]}`;
    else {
      const f = fs.existsSync(LOCAL) && fs.readdirSync(LOCAL).find((f) => f.startsWith(c.slug + "."));
      if (f && !f.endsWith(".svg")) {
        const m = await sharp(`${LOCAL}/${f}`).metadata();
        if (m.width >= 240) src = `${LOCAL}/${f}`;
      } else if (f) src = `${LOCAL}/${f}`; // svg scales fine
    }
    if (!src) { skipped++; continue; }
    const dest = `${OUT}/${c.slug}.webp`;
    try {
      await compose(src, dest);
      await p.course.update({ where: { id: c.id }, data: { heroImage: `/images/courses/cert-hero/${c.slug}.webp` } });
      made++;
    } catch (e) {
      console.error("FAIL", c.slug, e.message);
    }
  }
  // De-AI: clear generated PNG heroes so the curated real-photo map takes over.
  const ai = await p.course.updateMany({
    where: { heroImage: { startsWith: "/images/courses/a" } },
    data: { heroImage: null },
  });
  const ai2 = await p.course.updateMany({
    where: { heroImage: { startsWith: "/images/courses/media_" } },
    data: { heroImage: null },
  });
  console.log("cert heroes:", made, "| skipped (no badge, keep photo):", skipped, "| AI heroes cleared:", ai.count + ai2.count);
  await p.$disconnect();
})();
