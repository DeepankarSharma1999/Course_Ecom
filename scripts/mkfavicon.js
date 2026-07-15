const sharp = require('sharp');

// Same SimpliLEAD mark as scripts/mkicon.js.
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

const SIZE = 48;

sharp(Buffer.from(svg)).resize(SIZE, SIZE).png().toBuffer().then(png => {
  // ICO: 6-byte header + 16-byte dir entry + PNG payload (PNG-in-ICO, Vista+).
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);        // reserved
  header.writeUInt16LE(1, 2);        // type = icon
  header.writeUInt16LE(1, 4);        // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(SIZE, 0);         // width
  entry.writeUInt8(SIZE, 1);         // height
  entry.writeUInt8(0, 2);            // palette
  entry.writeUInt8(0, 3);            // reserved
  entry.writeUInt16LE(1, 4);         // color planes
  entry.writeUInt16LE(32, 6);        // bpp
  entry.writeUInt32LE(png.length, 8);// payload size
  entry.writeUInt32LE(22, 12);       // payload offset (6+16)
  require('fs').writeFileSync('app/favicon.ico', Buffer.concat([header, entry, png]));
  console.log('favicon.ico written', png.length + 22, 'bytes');
}).catch(e => { console.error(e); process.exit(1); });
