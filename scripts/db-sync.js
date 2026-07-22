// Runs before `next build` (see package.json "build") so every deployment
// carries the schema plus one-time data migrations to whatever database the
// environment points at. Every step is idempotent: safe on every build, and
// none of them overwrite values an admin has since edited.
// Skips silently when DATABASE_URL is absent (e.g. static preview builds).
const { execSync } = require("child_process");

if (!process.env.DATABASE_URL) {
  console.log("db-sync: no DATABASE_URL — skipping.");
  process.exit(0);
}

(async () => {
  const { PrismaClient } = require("@prisma/client");
  const p = new PrismaClient();
  const fs = require("fs");

  // Serverless Postgres (e.g. Neon) autosuspends: wake it with a trivial query,
  // retrying while the compute spins up. If the database stays unreachable,
  // warn and let the build continue — the site has static fallbacks, and a
  // dead database should not also take down code deployments.
  for (let i = 1; ; i++) {
    try { await p.$queryRaw`SELECT 1`; break; }
    catch (e) {
      if (i >= 6) {
        console.warn("db-sync: DATABASE UNREACHABLE — skipping schema/data sync!");
        console.warn("db-sync: last error:", (e && (e.message || e.code)) || e);
        console.warn("db-sync: check the database (e.g. Neon project status) and DATABASE_URL, then redeploy.");
        process.exit(0);
      }
      console.log(`db-sync: database not awake yet (attempt ${i}), retrying…`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  // 1. Schema. `db push` needs a direct connection — Neon's pgbouncer pooler
  // (host contains "-pooler") doesn't support it, so strip the suffix.
  const directUrl = process.env.DATABASE_URL.replace("-pooler.", ".");
  execSync("npx prisma db push --skip-generate", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: directUrl },
  });

  // 2. Policy pages (script skips slugs that already exist).
  await new Promise((res, rej) => {
    try { execSync("node scripts/seed-policy-pages.js", { stdio: "inherit" }); res(); } catch (e) { rej(e); }
  });

  // 3. Real certification bodies — only while courses still carry the
  //    original placeholder, so admin edits are never overwritten.
  const placeholders = await p.course.count({ where: { accreditedBy: "Global Certification Body" } });
  if (placeholders > 0) {
    console.log(`db-sync: assigning certification bodies (${placeholders} placeholder courses)…`);
    execSync("node scripts/assign-certificates.js", { stdio: "inherit" });
  }

  // 4. Cert-badge hero images (composed webps are committed in the repo).
  //    Only replaces heroes that are still the generic pool / AI-generated ones.
  const certHeroDir = "public/images/courses/cert-hero";
  if (fs.existsSync(certHeroDir)) {
    let set = 0;
    for (const f of fs.readdirSync(certHeroDir)) {
      const slug = f.replace(/\.webp$/, "");
      const r = await p.course.updateMany({
        where: {
          slug,
          OR: [
            { heroImage: null },
            { heroImage: { startsWith: "/images/vendor/unsplash/" } },
            { heroImage: { startsWith: "/images/courses/a" } },
            { heroImage: { startsWith: "/images/courses/media_" } },
          ],
        },
        data: { heroImage: `/images/courses/cert-hero/${f}` },
      });
      set += r.count;
    }
    if (set) console.log(`db-sync: cert hero images set on ${set} courses.`);
  }

  // 5. Clear remaining AI-generated hero PNGs (curated photo map takes over).
  const ai = await p.course.updateMany({
    where: { OR: [{ heroImage: { startsWith: "/images/courses/ai_" } }, { heroImage: { startsWith: "/images/courses/agentic_" } }, { heroImage: { startsWith: "/images/courses/media_" } }] },
    data: { heroImage: null },
  });
  if (ai.count) console.log(`db-sync: cleared ${ai.count} AI-generated heroes.`);

  // 6. WhatsApp number — only migrates the old default, keeps admin edits.
  const wa = await p.siteSettings.updateMany({
    where: { whatsappNumber: "918047106633" },
    data: { whatsappNumber: "971585232875" },
  });
  if (wa.count) console.log("db-sync: WhatsApp number migrated.");

  // 6b. Phone — same pattern: migrate the old default, keep admin edits.
  const ph = await p.siteSettings.updateMany({
    where: { phone: "+91 80 4710 6633" },
    data: { phone: "+971 58 523 2875" },
  });
  if (ph.count) console.log("db-sync: phone number migrated.");

  // 7. Enrollments created before the pending/confirmed flow shipped
  //    (2026-07-12) were instant enrollments — keep them visible.
  const en = await p.enrollment.updateMany({
    where: { status: "pending", createdAt: { lt: new Date("2026-07-12T00:00:00Z") } },
    data: { status: "confirmed" },
  });
  if (en.count) console.log(`db-sync: confirmed ${en.count} pre-flow enrollments.`);

  await p.$disconnect();
  console.log("db-sync: done.");
})().catch((e) => { console.error("db-sync failed:", e.message); process.exit(1); });
