// Crop each portrait to its painted arch, keep the upper body, and mask the
// outside of the arch to transparency. Output: /app/public/Hero/<name>.webp
const sharp = require("sharp");

const ASPECT = 0.56; // slender arch (w/h) so portraits leave gaps, like the reference

async function run(name) {
  const src = `/app/public/Hero/src/${name}.png`;

  // 1. Trim the uniform studio background -> bounding box of arch + person.
  const trimmed = await sharp(src).trim({ threshold: 12 }).toBuffer({ resolveWithObject: true });
  let { width: W, height: H } = trimmed.info;

  // 2. Vertical extent (head -> waist), then centre-crop the width to a slim arch.
  const targetH = Math.min(H, Math.round(W / 0.72));
  const cropW = Math.min(W, Math.round(targetH * ASPECT));
  const left = Math.round((W - cropW) / 2);
  const upper = await sharp(trimmed.data).extract({ left, top: 0, width: cropW, height: targetH }).toBuffer();

  // 3. Mask: slim arch (semicircular top, straight sides/bottom).
  const r = cropW / 2;
  const maskSvg = Buffer.from(
    `<svg width="${cropW}" height="${targetH}"><path d="M0,${targetH} L0,${r} A${r},${r} 0 0 1 ${cropW},${r} L${cropW},${targetH} Z" fill="#fff"/></svg>`
  );

  const masked = await sharp(upper).composite([{ input: maskSvg, blend: "dest-in" }]).png().toBuffer();
  const out = await sharp(masked)
    .resize({ height: 640 })
    .webp({ quality: 88 })
    .toFile(`/app/public/Hero/${name}.webp`);
  console.log(`${name}.webp ${out.width}x${out.height} ${out.size}b`);
}

(async () => {
  for (const n of ["hijab", "emirati", "suit", "laptop"]) await run(n);
})();
