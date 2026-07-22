// Check the combo -> official credential badge mapping.
// Run: npx tsx scripts/test-combo-bodies.ts
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { comboBadges } from "@/components/public/home/combo-schedule";

const badges = (slug: string, title: string) => comboBadges(slug, title);

// Each leg gets the official badge of the course it bundles.
const pmp = badges("pmp-pmi-acp-combo", "PMP Certification Training & PMI-ACP Certification Training");
assert.deepEqual(pmp.map((b) => b.name), ["PMP Certification Training", "PMI-ACP Certification Training"]);
assert.match(pmp[0].src, /badges\/pmp-certification-training\./);
assert.match(pmp[1].src, /badges\/pmi-acp-certification-training\./);

const csm = badges("csm-cspo-combo", "CSM Certification Training & CSPO Certification Training");
assert.match(csm[0].src, /badges\/csm-certification-training\./);
assert.match(csm[1].src, /badges\/cspo-certification-training\./);

// SAFe POPM must map to the SAFe POPM badge, not to CSPO's.
const popm = badges("safe-popm-cspo-combo", "SAFe POPM Certification Training & CSPO Certification Training");
assert.match(popm[0].src, /badges\/safe-product-owner-product-manager-certification\./);
assert.match(popm[1].src, /badges\/cspo-certification-training\./);

// Unmapped combo (self-issued AI bundle) falls back to our own mark, never a
// credential badge it doesn't award.
const ai = badges("applied-agentic-ai-engineering", "Applied Agentic & Agentic AI Engineering");
assert.deepEqual(ai.map((b) => b.src), ["/certifications/simplilead.png", "/certifications/simplilead.png"]);
assert.deepEqual(ai.map((b) => b.name), ["Applied Agentic", "Agentic AI Engineering"]);

// Two badges max, however many legs the title has.
assert.equal(badges("csm-cspo-combo", "CSM & CSPO & PSM & SAFe").length, 2);

// Every badge actually resolves to a file on disk — a 404 here renders as a
// broken image, and next/image rejects SVG, so assert the extension too.
for (const b of [...pmp, ...csm, ...popm, ...ai]) {
  assert.ok(fs.existsSync(path.join(process.cwd(), "public", b.src)), `missing ${b.src}`);
  assert.notEqual(path.extname(b.src), ".svg", `${b.src} is SVG — next/image will 400`);
}

console.log("combo-badges: ok");
