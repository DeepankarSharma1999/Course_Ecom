const sharp = require('sharp');

// SimpliLEAD mark: teal "i" (dot + stem) with red upward arrow slash, white bg.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#ffffff"/>
  <rect x="150" y="210" width="70" height="200" rx="18" fill="#1C9E9E"/>
  <circle cx="185" cy="150" r="42" fill="#ED1B2E"/>
  <g fill="#ED1B2E">
    <polygon points="250,410 360,120 405,140 295,430"/>
    <polygon points="345,95 415,110 388,175"/>
  </g>
</svg>`;

sharp(Buffer.from(svg)).png().resize(512, 512).toFile('app/apple-icon.png')
  .then(() => sharp(Buffer.from(svg)).resize(64, 64).png().toFile('app/icon.png'))
  // Badge form for self-issued certifications (combo cards on the home page).
  // PNG, not SVG: next/image rejects SVG unless dangerouslyAllowSVG is enabled.
  .then(() => sharp(Buffer.from(svg)).resize(128, 128).png().toFile('public/certifications/simplilead.png'))
  .then(() => console.log('done'))
  .catch(e => { console.error(e); process.exit(1); });
