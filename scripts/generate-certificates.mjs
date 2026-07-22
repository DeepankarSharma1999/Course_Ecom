// Generates representative sample certificates (SVG) for every course that has an
// external certification body but no sample image — one template per body, in that
// body's design language, with the EXACT certification name for each course.
// Same convention as the existing 24 images in public/certificates: placeholder
// recipient + "*representative purpose only" disclaimer.
import fs from "fs";
import path from "path";

const REPO = process.cwd();
const OUT = path.join(REPO, "public/certificates/gen");
fs.mkdirSync(OUT, { recursive: true });

const b64 = (p, mime) => `data:${mime};base64,` + fs.readFileSync(path.join(REPO, p)).toString("base64");
const LOGO = {
  scrumAlliance: b64("public/images/courses/issuers/accreditation_module_accreditation_module_ScrumAlliance_1730264966_1739364612.png", "image/png"),
  icagile: b64("public/images/courses/issuers/accreditation_module_IC_agile_1726658228.png", "image/png"),
  scrumOrg: b64("public/images/courses/issuers/accreditation_module_certificate-2_1629442295.png", "image/png"),
  pmi: b64("public/images/courses/issuers/accreditation_module_PMI-Nov_1669118571.png", "image/png"),
  peopleCert: b64("public/images/courses/issuers/accreditation_module_PeoplesCert_Logo_1637915287.png", "image/png"),
  iiba: b64("public/images/courses/issuers/accreditation_module_IIBA-Logo_1629636929.png", "image/png"),
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const DISCLAIMER = "*This certificate is for representative purpose only and holds no official or legal value.";
// Split a long title into <=2 lines near the middle.
function twoLines(t, max = 38) {
  if (t.length <= max) return [t];
  const words = t.split(" ");
  let a = "", i = 0;
  while (i < words.length && (a + " " + words[i]).trim().length <= t.length / 2 + 6) { a = (a + " " + words[i]).trim(); i++; }
  return [a, words.slice(i).join(" ")];
}
const tspans = (lines, x, y, dy) => lines.map((l, i) => `<tspan x="${x}" y="${y + i * dy}">${esc(l)}</tspan>`).join("");

// Shared outer frame: lavender rounded border on soft-blob background (matches existing set).
function page(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="Arial, Helvetica, sans-serif">
<rect width="${w}" height="${h}" fill="#ffffff"/>
<ellipse cx="${w * 0.12}" cy="${h * 0.85}" rx="${w * 0.18}" ry="${h * 0.10}" fill="#faf3e3" transform="rotate(-35 ${w * 0.12} ${h * 0.85})"/>
<ellipse cx="${w * 0.88}" cy="${h * 0.14}" rx="${w * 0.18}" ry="${h * 0.10}" fill="#faf3e3" transform="rotate(-35 ${w * 0.88} ${h * 0.14})"/>
<ellipse cx="${w * 0.16}" cy="${h * 0.35}" rx="${w * 0.16}" ry="${h * 0.09}" fill="#e4efe4" transform="rotate(-35 ${w * 0.16} ${h * 0.35})"/>
<ellipse cx="${w * 0.86}" cy="${h * 0.68}" rx="${w * 0.16}" ry="${h * 0.09}" fill="#e4efe4" transform="rotate(-35 ${w * 0.86} ${h * 0.68})"/>
${inner}
</svg>`;
}

// SAFe wordmark (drawn): mountains + SAFe text.
const safeLogo = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
<polygon points="0,26 14,6 22,17 30,2 46,26" fill="#0b3a45"/>
<text x="50" y="24" font-size="26" font-weight="bold" fill="#0b3a45" font-style="italic">SAFe<tspan font-size="12" dy="-10">®</tspan></text>
<text x="50" y="36" font-size="8.5" letter-spacing="0.5" fill="#0b3a45" font-weight="bold">PROVIDED BY SCALED AGILE</text>
</g>`;

// ---------- BODY TEMPLATES ----------

function safeTemplate({ certName }) {
  const lines = twoLines(certName, 40);
  const W = 960, H = 540;
  const pat = Array.from({ length: 46 }, (_, i) => `<rect x="${20 + i * 20}" y="${12 + (i % 3) * 9}" width="7" height="12" rx="1.5" fill="#ffffff" opacity="0.25"/>`).join("");
  return page(W, H, `
<rect x="185" y="38" width="590" height="464" rx="12" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<g clip-path="url(#hd)"><clipPath id="hd"><rect x="193" y="46" width="574" height="110" rx="8"/></clipPath>
  <rect x="193" y="46" width="574" height="110" fill="#0e3a47"/>
  <g transform="translate(173,34)">${pat}</g>
  <text x="480" y="136" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">Certificate of Completion</text></g>
<text x="480" y="196" text-anchor="middle" font-size="12" fill="#333">This certificate verifies</text>
<text x="480" y="228" text-anchor="middle" font-size="27" fill="#0e6273" font-weight="600">Anthony Kennedy</text>
<text x="480" y="252" text-anchor="middle" font-size="12" fill="#333">has successfully completed the requirements of the</text>
<text text-anchor="middle" font-size="${lines.length > 1 ? 21 : 24}" font-weight="bold" fill="#111">${tspans(lines, 480, 288, 27)}</text>
<text x="345" y="${lines.length > 1 ? 352 : 336}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#111">COMPLETED: MAY 1, 2026</text>
<text x="600" y="${lines.length > 1 ? 352 : 336}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#111">CERTIFICATE ID: 00000000 - XXXX</text>
<text x="290" y="432" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0e3a47">Andrew Sales</text>
<text x="290" y="447" text-anchor="middle" font-size="10.5" fill="#0e3a47">Chief Methodologist</text>
<text x="452" y="432" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0e3a47">Steve Matthesen</text>
<text x="452" y="447" text-anchor="middle" font-size="10.5" fill="#0e3a47">Chief Executive Officer</text>
${safeLogo(590, 414, 0.95)}
<rect x="193" y="462" width="574" height="12" fill="#7fd4cf"/>
<text x="480" y="490" text-anchor="middle" font-size="8.5" fill="#8a8a8a">${DISCLAIMER}</text>`);
}

function scrumAllianceTemplate({ certName, badge, badgeColor = "#e8a33d" }) {
  const W = 1000, H = 640;
  const body = `is awarded the designation ${certName} on this day,|May 1, 2026, for completing the prescribed requirements|for this certification and is hereby entitled to all privileges|and benefits offered by SCRUM ALLIANCE®.`.split("|");
  return page(W, H, `
<rect x="190" y="30" width="620" height="580" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<path d="M 200 40 h 260 a 560 560 0 0 0 -252 252 v -244 z" fill="#b9c9d4" opacity="0.55"/>
<path d="M 800 600 h -260 a 560 560 0 0 1 252 -252 v 244 z" fill="#b9c9d4" opacity="0.55"/>
<rect x="204" y="44" width="592" height="552" rx="10" fill="#ffffff" opacity="0.0"/>
<image href="${LOGO.scrumAlliance}" x="415" y="60" width="170" height="170"/>
<text x="500" y="268" text-anchor="middle" font-size="34" font-weight="bold" fill="#111">Aaron Arellano</text>
<text text-anchor="middle" font-size="14.5" fill="#222">${body.map((l, i) => `<tspan x="500" y="${300 + i * 21}">${esc(l)}</tspan>`).join("")}</text>
<g transform="translate(500,438)">
  ${Array.from({ length: 24 }, (_, i) => `<circle cx="${38 * Math.cos((i * Math.PI) / 12)}" cy="${38 * Math.sin((i * Math.PI) / 12)}" r="5.5" fill="${badgeColor}"/>`).join("")}
  <circle r="36" fill="${badgeColor}"/><circle r="30" fill="#ffffff" opacity="0.15"/>
  <text y="-8" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">Scrum Alliance</text>
  <text y="${badge.length > 6 ? 8 : 9}" text-anchor="middle" font-size="${badge.length > 6 ? 11 : 14}" fill="#ffffff" font-weight="bold">${esc(badge)}</text>
  <text y="22" text-anchor="middle" font-size="7.5" fill="#fff" letter-spacing="1">CERTIFIED</text>
</g>
<text x="500" y="505" text-anchor="middle" font-size="10.5" fill="#333">Certificant ID: 000000000 Certification Active through: Aug 31, 2028</text>
<line x1="330" y1="552" x2="470" y2="552" stroke="#333" stroke-width="1"/>
<text x="400" y="566" text-anchor="middle" font-size="10" font-style="italic" fill="#111">Certified Scrum Trainer®</text>
<line x1="540" y1="552" x2="680" y2="552" stroke="#333" stroke-width="1"/>
<text x="610" y="566" text-anchor="middle" font-size="10" font-style="italic" fill="#111">Chairman of the Board</text>
<text x="500" y="588" text-anchor="middle" font-size="8.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

function scrumOrgTemplate({ certName, badge }) {
  const lines = twoLines(certName.toUpperCase(), 42);
  const W = 1000, H = 640;
  const border = `<rect x="205" y="52" width="590" height="536" fill="none" stroke="#9db9d6" stroke-width="10" stroke-dasharray="2 3"/>`;
  return page(W, H, `
<rect x="190" y="36" width="620" height="568" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
${border}
<rect x="212" y="59" width="576" height="522" fill="none" stroke="#3c6e91" stroke-width="1.5"/>
<image href="${LOGO.scrumOrg}" x="430" y="86" width="140" height="66"/>
<g transform="translate(716,84)">${Array.from({ length: 64 }, (_, i) => (i * 7 + i % 5) % 3 ? `<rect x="${(i % 8) * 6}" y="${Math.floor(i / 8) * 6}" width="5" height="5" fill="#444"/>` : "").join("")}</g>
<text x="500" y="206" text-anchor="middle" font-size="15" letter-spacing="3" fill="#3c6e91" font-weight="bold">PROFESSIONAL CERTIFICATION</text>
<text text-anchor="middle" font-size="${lines.length > 1 ? 20 : 23}" letter-spacing="1.5" fill="#255a7e" font-weight="bold" font-family="Georgia, serif">${tspans(lines, 500, 244, 28)}</text>
<text x="500" y="${lines.length > 1 ? 322 : 300}" text-anchor="middle" font-size="30" fill="#111">Carlos Perez</text>
<text text-anchor="start" font-size="11" font-style="italic" fill="#333">
  <tspan x="255" y="${lines.length > 1 ? 372 : 356}">has demonstrated the knowledge and practice required by this certification, including the</tspan>
  <tspan x="255" y="${lines.length > 1 ? 388 : 372}">concepts of applying Scrum as described in the Scrum Guide, and a consistent use of</tspan>
  <tspan x="255" y="${lines.length > 1 ? 404 : 388}">terminology and approach to Scrum.</tspan>
  <tspan x="255" y="${lines.length > 1 ? 428 : 414}">In recognition of this achievement, Scrum.org is pleased to award this certification.</tspan>
</text>
<line x1="255" y1="492" x2="400" y2="492" stroke="#555" stroke-width="1"/>
<text x="255" y="507" font-size="10.5" fill="#333">Ken Schwaber, founder Scrum.org</text>
<line x1="440" y1="492" x2="560" y2="492" stroke="#555" stroke-width="1"/>
<text x="445" y="507" font-size="10.5" fill="#333">Certification Date</text>
<g transform="translate(680,470)">
  <circle r="52" fill="#ffffff" stroke="#255a7e" stroke-width="3"/>
  <circle r="44" fill="none" stroke="#255a7e" stroke-width="1"/>
  <text y="-14" text-anchor="middle" font-size="9" fill="#255a7e" font-weight="bold">Scrum.org™</text>
  <text y="${badge.length > 7 ? 8 : 10}" text-anchor="middle" font-size="${badge.length > 7 ? 12 : 16}" fill="#255a7e" font-weight="bold">${esc(badge)}</text>
</g>
<text x="500" y="566" text-anchor="middle" font-size="8.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

function icagileTemplate({ track, code }) {
  const W = 1200, H = 680;
  const trackLines = twoLines(track.toUpperCase(), 30);
  return page(W, H, `
<rect x="255" y="55" width="720" height="550" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<image href="${LOGO.icagile}" x="285" y="80" width="190" height="66"/>
<text font-size="10" fill="#333">
  <tspan x="500" y="92">The International Consortium for Agile (ICAgile) hereby certifies that, having</tspan>
  <tspan x="500" y="106">successfully completed the learning and evaluation for this certification, the</tspan>
  <tspan x="500" y="120">holder shall be recognized as an ICAgile Certified Professional${code ? ` in` : ` for`}</tspan>
  <tspan x="500" y="134">${esc(track)}${code ? `, with rights to affix and display the letters ${esc(code)}.` : `.`}</tspan>
  <tspan x="500" y="148">This certification signifies knowledge acquired as assessed by instructors.</tspan>
</text>
<text x="615" y="215" text-anchor="middle" font-size="34" fill="#111" letter-spacing="2" font-family="Georgia, serif">ICA<tspan font-size="27">GILE</tspan> C<tspan font-size="27">ERTIFIED</tspan> P<tspan font-size="27">ROFESSIONAL</tspan></text>
<text text-anchor="middle" font-size="24" fill="#8a8a8a" letter-spacing="4" font-family="Georgia, serif">${tspans(trackLines, 615, 258, 30)}</text>
${code ? `<text x="615" y="${trackLines.length > 1 ? 342 : 312}" text-anchor="middle" font-size="38" fill="#111" font-family="Georgia, serif">${esc(code)}</text>` : ""}
<rect x="275" y="368" width="680" height="64" fill="#e9e9e9" opacity="0.85"/>
<text x="615" y="410" text-anchor="middle" font-size="38" font-style="italic" fill="#111" font-family="Georgia, serif">Wren Preston</text>
<g transform="translate(590,505)">
  ${Array.from({ length: 28 }, (_, i) => `<polygon points="0,-52 6,-40 -6,-40" fill="#d9a520" transform="rotate(${i * (360 / 28)})"/>`).join("")}
  <circle r="42" fill="#e6b83c"/><circle r="36" fill="none" stroke="#b8860b" stroke-width="1"/>
  <image href="${LOGO.icagile}" x="-26" y="-13" width="52" height="19"/>
</g>
<text x="315" y="520" font-size="10.5" fill="#333">Ahmed Sidky, Ph.D.</text>
<text x="315" y="535" font-size="10.5" fill="#333">President, ICAgile</text>
<text x="315" y="550" font-size="10.5" fill="#333">May 1, 2026</text>
<line x1="750" y1="512" x2="905" y2="512" stroke="#333" stroke-width="1"/>
<text x="750" y="528" font-size="10.5" fill="#333">Authorized Instructor</text>
<text x="750" y="543" font-size="10.5" fill="#333">SimpliLEAD (Member Training Org.)</text>
<text x="750" y="572" font-size="9" fill="#9a9a9a">*This certificate is for representative purpose</text>
<text x="750" y="584" font-size="9" fill="#9a9a9a">only and holds no official or legal value.</text>`);
}

function peopleCertTemplate({ certName }) {
  const lines = twoLines(certName, 26);
  const W = 960, H = 620;
  return page(W, H, `
<rect x="315" y="30" width="330" height="560" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<image href="${LOGO.peopleCert}" x="335" y="52" width="120" height="38"/>
<text x="628" y="72" text-anchor="end" font-size="17" font-weight="bold" fill="#8c1d40">AXELOS</text>
<text x="628" y="84" text-anchor="end" font-size="6.5" letter-spacing="1" fill="#8c1d40">GLOBAL BEST PRACTICE</text>
<defs><linearGradient id="pc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3b8ad"/></linearGradient></defs>
<rect x="330" y="130" width="300" height="420" fill="url(#pc)" opacity="0.75"/>
<text x="480" y="176" text-anchor="middle" font-size="10.5" fill="#8c1d40">This is to certify that</text>
<text x="480" y="202" text-anchor="middle" font-size="19" font-weight="bold" fill="#111">Garrett Aureole</text>
<text x="480" y="232" text-anchor="middle" font-size="10.5" fill="#8c1d40">Has achieved the</text>
<text text-anchor="middle" font-size="15.5" font-weight="bold" fill="#111">${tspans(lines, 480, 258, 20)}</text>
<text x="360" y="330" font-size="9.5" fill="#8c1d40">Effective from</text><text x="428" y="330" font-size="9.5" font-weight="bold" fill="#111">01 May 2026</text>
<text x="520" y="330" font-size="9.5" fill="#8c1d40">Expiry date</text><text x="575" y="330" font-size="9.5" font-weight="bold" fill="#111">N/A</text>
<text x="360" y="368" font-size="9.5" fill="#8c1d40">Certificate number</text><text x="450" y="368" font-size="9.5" font-weight="bold" fill="#111">XXXXXXXXXXXXX</text>
<line x1="360" y1="440" x2="470" y2="440" stroke="#555" stroke-width="0.8"/>
<text x="360" y="452" font-size="7.5" fill="#333">CEO, AXELOS</text>
<line x1="500" y1="440" x2="612" y2="440" stroke="#555" stroke-width="0.8"/>
<text x="500" y="452" font-size="7.5" fill="#333">Certification Qualifier, PeopleCert</text>
<text x="345" y="500" font-size="8.5" font-weight="bold" fill="#111">Printed on 1 May 2026</text>
<text x="345" y="522" font-size="6.5" fill="#666">This certificate remains the property of the issuing Examination Institute.</text>
<text x="480" y="572" text-anchor="middle" font-size="7.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

function pmiTemplate({ certName }) {
  const lines = twoLines(certName, 40);
  const W = 1000, H = 760;
  return page(W, H, `
<rect x="220" y="30" width="560" height="700" fill="#3d1a70"/>
<rect x="236" y="46" width="528" height="668" fill="#c86ce8" opacity="0.6"/>
<rect x="244" y="54" width="512" height="652" fill="#ffffff"/>
<image href="${LOGO.pmi}" x="400" y="86" width="200" height="88"/>
<text x="500" y="240" text-anchor="middle" font-size="21" font-weight="bold" letter-spacing="2" fill="#111">CERTIFICATE OF ACHIEVEMENT</text>
<text x="500" y="286" text-anchor="middle" font-size="12" letter-spacing="2.5" fill="#666">IS HEREBY GRANTED TO</text>
<text x="500" y="330" text-anchor="middle" font-size="34" fill="#222">Oliver Murphy</text>
<text x="500" y="374" text-anchor="middle" font-size="12" letter-spacing="2.5" fill="#666">FOR COMPLETING THE FOLLOWING COURSE</text>
<text text-anchor="middle" font-size="${lines.length > 1 ? 19 : 21}" fill="#5a2ea6" font-weight="600">${tspans(lines, 500, 424, 26)}</text>
<text x="500" y="${lines.length > 1 ? 492 : 470}" text-anchor="middle" font-size="14" fill="#111">1 May 2026</text>
<g transform="translate(330,600)">
  <circle r="62" fill="#c86ce8"/><circle r="56" fill="#3d1a70"/>
  <text y="-14" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">PMI</text>
  <text y="2" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">Authorized</text>
  <text y="15" text-anchor="middle" font-size="9.5" fill="#ffffff" font-weight="bold">Training Partner</text>
  <text y="34" text-anchor="middle" font-size="8" fill="#e0c3f0">2026</text>
</g>
<rect x="560" y="580" width="170" height="26" fill="none" stroke="#5a2ea6" stroke-width="1"/>
<text x="645" y="597" text-anchor="middle" font-size="9" fill="#9a7bb8">SimpliLEAD</text>
<text x="500" y="668" text-anchor="middle" font-size="10.5" fill="#555">Name of Instructor</text>
<text x="500" y="692" text-anchor="middle" font-size="9" fill="#8a8a8a">${DISCLAIMER}</text>`);
}

function microsoftTemplate({ certName, subline, badgeTop, badgeMain }) {
  const lines = twoLines(certName, 40);
  const W = 1200, H = 680;
  return page(W, H, `
<rect x="225" y="52" width="750" height="570" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<path d="M 239 66 h 722 v 176 h -722 z" fill="#12294b"/>
<text x="268" y="140" font-size="40" fill="#ffffff" font-weight="600">Microsoft Certified</text>
<text font-size="23" fill="#ffffff">${tspans(lines, 268, 180, 28)}</text>
<text x="268" y="330" font-size="21" fill="#222">Itzel Winters</text>
<text x="268" y="362" font-size="11.5" fill="#333">Has successfully completed the requirements to be recognised as a ${esc(subline)}.</text>
<text x="268" y="412" font-size="10.5" fill="#333">Date of achievement: May 1, 2026</text>
<text x="268" y="430" font-size="10.5" fill="#333">Valid until: May 1, 2028</text>
<g transform="translate(268,500)">
  <rect width="17" height="17" fill="#f25022"/><rect x="19" width="17" height="17" fill="#7fba00"/>
  <rect y="19" width="17" height="17" fill="#00a4ef"/><rect x="19" y="19" width="17" height="17" fill="#ffb900"/>
  <text x="46" y="27" font-size="21" fill="#666" font-weight="600">Microsoft</text>
</g>
<text x="640" y="516" font-size="10.5" fill="#333">Satya Nadella</text>
<text x="640" y="531" font-size="10.5" fill="#333">Chief Executive Officer</text>
<g transform="translate(872,455)">
  <path d="M -46 -38 h 92 v 52 l -46 34 l -46 -34 z" fill="#ffffff" stroke="#12294b" stroke-width="3"/>
  <path d="M -38 6 h 76 v 12 l -38 26 l -38 -26 z" fill="#1f6fd6"/>
  <text y="-18" text-anchor="middle" font-size="8.5" fill="#12294b" font-weight="bold">${esc(badgeTop)}</text>
  <rect x="-40" y="-10" width="80" height="15" fill="#ffffff" stroke="#888" stroke-width="0.6" transform="rotate(-3)"/>
  <text y="1" text-anchor="middle" font-size="9" fill="#111" font-weight="bold" transform="rotate(-3)">${esc(badgeMain)}</text>
  <text y="28" text-anchor="middle" font-size="12" fill="#ffffff">★★</text>
</g>
<rect x="239" y="580" width="722" height="28" fill="#12294b"/>
<text x="600" y="598" text-anchor="middle" font-size="8.5" fill="#cfd8e6">${DISCLAIMER}</text>`);
}

function awsTemplate({ certName }) {
  const W = 1200, H = 680;
  return page(W, H, `
<rect x="225" y="52" width="750" height="570" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<rect x="243" y="70" width="714" height="534" rx="8" fill="none" stroke="#232f3e" stroke-width="1.5"/>
<g transform="translate(430,120)">
  <text x="0" y="34" font-size="44" font-weight="bold" fill="#232f3e">aws</text>
  <g transform="translate(104,10)"><polygon points="14,0 28,8 28,24 14,32 0,24 0,8" fill="#f79400"/><path d="M 7 16 l 5 5 l 9 -10" stroke="#ffffff" stroke-width="3.5" fill="none"/></g>
  <text x="142" y="34" font-size="44" fill="#232f3e">certified</text>
</g>
<text x="600" y="240" text-anchor="middle" font-size="30" fill="#222">Abram Beil</text>
<text x="600" y="286" text-anchor="middle" font-size="12.5" fill="#333">has successfully completed the AWS Certification</text>
<text x="600" y="304" text-anchor="middle" font-size="12.5" fill="#333">requirements and has achieved their:</text>
<rect x="243" y="336" width="714" height="66" fill="#8a8f98"/>
<text x="600" y="378" text-anchor="middle" font-size="${certName.length > 42 ? 20 : 24}" font-weight="bold" fill="#ffffff">${esc(certName)}</text>
<text x="322" y="452" font-size="11.5" font-weight="bold" fill="#111">Issue Date</text>
<text x="322" y="470" font-size="11" fill="#333">May 1, 2026</text>
<text x="322" y="500" font-size="11.5" font-weight="bold" fill="#111">Expiration Date</text>
<text x="322" y="518" font-size="11" fill="#333">May 1, 2029</text>
<text x="690" y="480" font-size="11.5" fill="#111">AWS Training and Certification</text>
<text x="690" y="530" font-size="8.5" fill="#333">Validation Number XXXXXXXXXXXXXXXX</text>
<text x="690" y="544" font-size="8.5" fill="#333">Validate at: http://aws.amazon.com/verification</text>
<text x="600" y="586" text-anchor="middle" font-size="8.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

function doiTemplate({ certName }) {
  const lines = twoLines(certName, 26);
  const W = 1200, H = 680;
  return page(W, H, `
<rect x="405" y="68" width="390" height="540" rx="10" fill="#7a1f2b"/>
<rect x="419" y="82" width="362" height="512" fill="#ffffff"/>
<g transform="translate(448,104)">
  <rect x="6" y="18" width="44" height="5" fill="#7a1f2b"/><rect x="10" y="4" width="36" height="12" rx="6" fill="#e8a33d"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${9 + i * 10.5}" y="10" width="6" height="8" fill="#7a1f2b"/>`).join("")}
  <text x="2" y="42" font-size="15" font-weight="bold" fill="#e07b39">DevOps</text>
  <text x="2" y="53" font-size="6.5" letter-spacing="2" fill="#7a1f2b">I N S T I T U T E</text>
</g>
<text x="700" y="118" font-size="11.5" font-weight="bold" fill="#111">Certified ID</text>
<text x="700" y="133" font-size="11.5" fill="#111">0000000</text>
<text x="600" y="212" text-anchor="middle" font-size="12" font-style="italic" fill="#8a8a8a">This is to certify that</text>
<text x="600" y="244" text-anchor="middle" font-size="26" font-weight="bold" fill="#7a1f2b">Juan Lopez</text>
<text x="600" y="272" text-anchor="middle" font-size="12" font-style="italic" fill="#8a8a8a">Has achieved the</text>
<text text-anchor="middle" font-size="17" font-weight="bold" fill="#7a1f2b">${tspans(lines, 600, 300, 22)}</text>
<g transform="translate(600,420)">
  ${[["#1f6f8b", 0], ["#e8a33d", 120], ["#c0392b", 240]].map(([c, r]) => `<path d="M 0 -62 A 62 62 0 0 1 53.7 31 L 27 15.5 A 31 31 0 0 0 0 -31 Z" fill="${c}" transform="rotate(${r})"/>`).join("")}
  <circle r="28" fill="#ffffff"/><circle r="28" fill="none" stroke="#ddd"/>
  <text y="-2" text-anchor="middle" font-size="7" fill="#555" font-weight="bold">HUMANS</text><text y="7" text-anchor="middle" font-size="7" fill="#555" font-weight="bold">of DevOps</text>
</g>
<line x1="470" y1="540" x2="580" y2="540" stroke="#555" stroke-width="0.8"/>
<text x="470" y="554" font-size="9" fill="#666">CEO, DevOps Institute</text>
<text x="660" y="548" font-size="11" fill="#111">May 1, 2026</text>
<text x="660" y="560" font-size="8" fill="#888">Date</text>
<text x="600" y="584" text-anchor="middle" font-size="7.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

function iibaTemplate({ certName, code }) {
  const lines = twoLines(certName, 38);
  const W = 1200, H = 680;
  return page(W, H, `
<rect x="225" y="52" width="750" height="570" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<rect x="243" y="70" width="714" height="534" fill="none" stroke="#0f3b5c" stroke-width="3"/>
<rect x="249" y="76" width="702" height="522" fill="none" stroke="#2a9d8f" stroke-width="1"/>
<image href="${LOGO.iiba}" x="560" y="96" width="80" height="126"/>
<text x="600" y="266" text-anchor="middle" font-size="17.5" letter-spacing="1.5" font-weight="bold" fill="#0f3b5c">INTERNATIONAL INSTITUTE OF BUSINESS ANALYSIS</text>
<text x="600" y="300" text-anchor="middle" font-size="12" font-style="italic" fill="#555">hereby certifies that</text>
<text x="600" y="340" text-anchor="middle" font-size="30" fill="#111" font-family="Georgia, serif">Adrian Keller</text>
<text x="600" y="374" text-anchor="middle" font-size="12" font-style="italic" fill="#555">has fulfilled the requirements and is granted the designation</text>
<text text-anchor="middle" font-size="20" font-weight="bold" fill="#2a9d8f">${tspans(lines, 600, 408, 26)}</text>
<g transform="translate(600,${lines.length > 1 ? 502 : 486})">
  ${Array.from({ length: 30 }, (_, i) => `<polygon points="0,-40 5,-30 -5,-30" fill="#0f3b5c" transform="rotate(${i * 12})"/>`).join("")}
  <circle r="32" fill="#0f3b5c"/><text y="-2" text-anchor="middle" font-size="10" fill="#fff" font-weight="bold">IIBA®</text>
  <text y="11" text-anchor="middle" font-size="8" fill="#f0a545" font-weight="bold">${esc(code)}</text>
</g>
<line x1="320" y1="540" x2="460" y2="540" stroke="#555" stroke-width="1"/>
<text x="390" y="556" text-anchor="middle" font-size="10" fill="#333">President &amp; CEO, IIBA</text>
<line x1="740" y1="540" x2="880" y2="540" stroke="#555" stroke-width="1"/>
<text x="810" y="556" text-anchor="middle" font-size="10" fill="#333">Chair, IIBA Board</text>
<text x="600" y="588" text-anchor="middle" font-size="8.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

// Generic formal template for single-course bodies (ProKanban, Scrum Inc., IAPP, PECB).
function formalTemplate({ org, orgColor, certName, tagline }) {
  const lines = twoLines(certName, 36);
  const W = 1200, H = 680;
  return page(W, H, `
<rect x="225" y="52" width="750" height="570" rx="14" fill="#ffffff" stroke="#8b8ff0" stroke-width="2"/>
<rect x="243" y="70" width="714" height="534" fill="none" stroke="${orgColor}" stroke-width="3"/>
<text x="600" y="150" text-anchor="middle" font-size="34" font-weight="bold" fill="${orgColor}">${esc(org)}</text>
${tagline ? `<text x="600" y="176" text-anchor="middle" font-size="11" letter-spacing="2" fill="#777">${esc(tagline.toUpperCase())}</text>` : ""}
<text x="600" y="240" text-anchor="middle" font-size="15" letter-spacing="4" fill="#555">CERTIFICATE</text>
<text x="600" y="282" text-anchor="middle" font-size="12" font-style="italic" fill="#555">This is to certify that</text>
<text x="600" y="322" text-anchor="middle" font-size="30" fill="#111" font-family="Georgia, serif">Morgan Blake</text>
<text x="600" y="356" text-anchor="middle" font-size="12" font-style="italic" fill="#555">has successfully completed all requirements and is recognised as</text>
<text text-anchor="middle" font-size="21" font-weight="bold" fill="${orgColor}">${tspans(lines, 600, 394, 27)}</text>
<text x="600" y="${lines.length > 1 ? 468 : 442}" text-anchor="middle" font-size="12" fill="#333">Awarded on May 1, 2026 • Credential ID 0000000</text>
<line x1="330" y1="540" x2="470" y2="540" stroke="#555" stroke-width="1"/>
<text x="400" y="556" text-anchor="middle" font-size="10" fill="#333">Authorized Signatory, ${esc(org)}</text>
<line x1="730" y1="540" x2="870" y2="540" stroke="#555" stroke-width="1"/>
<text x="800" y="556" text-anchor="middle" font-size="10" fill="#333">Program Director</text>
<text x="600" y="588" text-anchor="middle" font-size="8.5" fill="#9a9a9a">${DISCLAIMER}</text>`);
}

// ---------- COURSE → CERTIFICATE MAP (exact names aligned with course titles) ----------
const T = {
  safe: safeTemplate, sa: scrumAllianceTemplate, so: scrumOrgTemplate, ica: icagileTemplate,
  pc: peopleCertTemplate, pmi: pmiTemplate, ms: microsoftTemplate, aws: awsTemplate,
  doi: doiTemplate, iiba: iibaTemplate, formal: formalTemplate,
};

const COURSES = [
  // --- Scaled Agile (16) ---
  ["leading-safe-6-for-government", T.safe, { certName: "Certified SAFe 6 Government Practitioner" }],
  ["ai-native-change-agent-certification-training", T.safe, { certName: "AI-Native Change Agent" }],
  ["value-stream-mapping-safe-micro-credential-course", T.safe, { certName: "Advanced Facilitator: Value Stream Mapping" }],
  ["safe-architects-certification", T.safe, { certName: "Certified SAFe 6 Architect" }],
  ["safe-for-teams-certification-training", T.safe, { certName: "Certified SAFe 6 Practitioner" }],
  ["safe-agile-product-management-certification-training", T.safe, { certName: "Certified SAFe 6 Agile Product Manager" }],
  ["agile-hr-explorer-certification-training", T.safe, { certName: "Agile HR Explorer (AHRE)" }],
  ["advanced-scrum-master-certification-path", T.safe, { certName: "Certified SAFe 6 Advanced Scrum Master" }],
  ["safe-advanced-scrum-master-certification", T.safe, { certName: "Certified SAFe 6 Advanced Scrum Master" }],
  ["ai-native-foundations-certification-training", T.safe, { certName: "AI-Native Foundations" }],
  ["safe-agile-software-engineering-certification", T.safe, { certName: "Certified SAFe 6 Agile Software Engineer" }],
  ["safe-for-hardware-certification-training", T.safe, { certName: "Certified SAFe 6 for Hardware Practitioner" }],
  ["safe-devops-certification", T.safe, { certName: "Certified SAFe 6 DevOps Practitioner" }],
  ["spc-certification-training", T.safe, { certName: "Certified SAFe 6 Practice Consultant" }],
  ["conflict-and-collaboration-safe-micro-credential-course", T.safe, { certName: "Advanced Facilitator: Conflict & Collaboration" }],
  ["achieving-responsible-ai-with-safe-micro-credential", T.safe, { certName: "Achieving Responsible AI with SAFe" }],
  // --- Scrum Alliance (9) ---
  ["agile-coaching-skills-certified-facilitator-training", T.sa, { certName: "Certified Agile Facilitator℠", badge: "CAF" }],
  ["cal-i-certification-training", T.sa, { certName: "Certified Agile Leader® 1", badge: "CAL 1" }],
  ["certified-scrum-professional-scrummaster-certification", T.sa, { certName: "Certified Scrum Professional® - ScrumMaster", badge: "CSP-SM", badgeColor: "#4a7fb5" }],
  ["certified-scrum-professional-product-owner-certification-training", T.sa, { certName: "Certified Scrum Professional® - Product Owner", badge: "CSP-PO", badgeColor: "#d97941" }],
  ["a-cspo-certification-training", T.sa, { certName: "Advanced Certified Scrum Product Owner®", badge: "A-CSPO", badgeColor: "#d97941" }],
  ["cal-ii-certification-training", T.sa, { certName: "Certified Agile Leader® 2", badge: "CAL 2" }],
  ["certified-agile-skills-scaling-level-1-training", T.sa, { certName: "Certified Agile Scaling Practitioner 1", badge: "CASP 1" }],
  ["csd-certification-training", T.sa, { certName: "Certified Scrum Developer®", badge: "CSD", badgeColor: "#5b9e6f" }],
  ["a-csd-certification-training", T.sa, { certName: "Advanced Certified Scrum Developer®", badge: "A-CSD", badgeColor: "#5b9e6f" }],
  // --- Scrum.org (10) ---
  ["psd-certification-training", T.so, { certName: "Professional Scrum Developer I", badge: "PSD I" }],
  ["pspbm-skills-certification-course", T.so, { certName: "Professional Scrum Product Backlog Management Skills", badge: "PSPBM" }],
  ["psm-ii-certification", T.so, { certName: "Professional Scrum Master II", badge: "PSM II" }],
  ["pspo-certification-training", T.so, { certName: "Professional Scrum Product Owner I", badge: "PSPO I" }],
  ["professional-scrum-kanban-certification-training", T.so, { certName: "Professional Scrum with Kanban I", badge: "PSK I" }],
  ["pspo-advanced-certification-training", T.so, { certName: "Professional Scrum Product Owner II", badge: "PSPO II" }],
  ["psm-ai-essentials-certification-training", T.so, { certName: "Professional Scrum Master - AI Essentials", badge: "PSM-AI" }],
  ["professional-agile-leadership-essentials-training", T.so, { certName: "Professional Agile Leadership I", badge: "PAL I" }],
  ["applying-professional-scrum-training", T.so, { certName: "Applying Professional Scrum", badge: "APS" }],
  ["pspo-ai-essentials-certification-training", T.so, { certName: "Professional Scrum Product Owner - AI Essentials", badge: "PSPO-AI" }],
  // --- ICAgile (20) ---
  ["icagile-fundamentals-certification-training", T.ica, { track: "Agile Fundamentals", code: "ICP" }],
  ["icagile-people-development-icp-pdv-certification-training", T.ica, { track: "People Development", code: "ICP-PDV" }],
  ["icp-cat-certification-training", T.ica, { track: "Coaching Agile Transformations", code: "ICP-CAT" }],
  ["icagile-product-management-icp-pdm-training", T.ica, { track: "Product Management", code: "ICP-PDM" }],
  ["icagile-agile-leadership-icp-lea-certification-training", T.ica, { track: "Agile Leadership", code: "ICP-LEA" }],
  ["icagile-product-ownership-icp-apo-certification-training", T.ica, { track: "Agile Product Ownership", code: "ICP-APO" }],
  ["icagile-foundations-of-ai-icp-fai-certification-training", T.ica, { track: "Foundations of AI", code: "ICP-FAI" }],
  ["icagile-agile-team-facilitation-icp-atf-certification-training", T.ica, { track: "Agile Team Facilitation", code: "ICP-ATF" }],
  ["icagile-business-agility-foundations-certification-training", T.ica, { track: "Business Agility Foundations", code: "ICP-BAF" }],
  ["icagile-systems-coaching-icp-sys-certification-training", T.ica, { track: "Systems Coaching", code: "ICP-SYS" }],
  ["icagile-ai-for-product-planning-micro-credential-course", T.ica, { track: "AI for Product Planning", code: "" }],
  ["icagile-ai-for-customer-insights-micro-credential-training", T.ica, { track: "AI for Customer Insights", code: "" }],
  ["icagile-ai-for-product-strategy-micro-credential-course", T.ica, { track: "AI for Product Strategy", code: "" }],
  ["icagile-ai-for-product-discovery-micro-credential-course", T.ica, { track: "AI for Product Discovery", code: "" }],
  ["icagile-ai-for-stakeholder-management-micro-credential-certification-course", T.ica, { track: "AI for Stakeholder Management", code: "" }],
  ["icp-ent-certification-training", T.ica, { track: "Agility in the Enterprise", code: "ICP-ENT" }],
  ["icagile-lean-portfolio-management-icp-lpm-certification-training", T.ica, { track: "Lean Portfolio Management", code: "ICP-LPM" }],
  ["icagile-adaptive-org-design-icp-org-certification-training", T.ica, { track: "Adaptive Org Design", code: "ICP-ORG" }],
  ["icagile-ai-for-product-metrics-micro-credential-course", T.ica, { track: "AI for Product Metrics", code: "" }],
  ["icagile-agile-project-delivery-management-icp-apm-certification-training", T.ica, { track: "Agile Project & Delivery Management", code: "ICP-APM" }],
  // --- PeopleCert (6) ---
  ["prince2-practitioner-certification", T.pc, { certName: "PRINCE2® Practitioner Certification" }],
  ["prince2-agile-practitioner-certification", T.pc, { certName: "PRINCE2 Agile® Practitioner Certification" }],
  ["prince2-agile-foundation-certification", T.pc, { certName: "PRINCE2 Agile® Foundation Certification" }],
  ["prince2-foundation-certification", T.pc, { certName: "PRINCE2® Foundation Certification" }],
  ["prince2-foundation-practitioner-course", T.pc, { certName: "PRINCE2® Foundation and Practitioner Certification" }],
  ["prince2-agile-foundation-practitioner-certification", T.pc, { certName: "PRINCE2 Agile® Foundation and Practitioner Certification" }],
  // --- PMI (3) ---
  ["cpmai-certification-training", T.pmi, { certName: "PMI Certified Professional in Machine Learning and AI (PMI-CPMAI)™" }],
  ["disciplined-agile-foundations-course", T.pmi, { certName: "Disciplined Agile® Foundations (DAF)" }],
  ["pfmp-certification-training", T.pmi, { certName: "Portfolio Management Professional (PfMP)®" }],
  // --- Microsoft (4) ---
  ["microsoft-azure-architect-design-certification-training-course", T.ms, { certName: "Azure Solutions Architect Expert (AZ-305)", subline: "Microsoft Certified: Azure Solutions Architect Expert", badgeTop: "Microsoft CERTIFIED", badgeMain: "EXPERT" }],
  ["microsoft-azure-developer-associate-az-204-certification-course", T.ms, { certName: "Azure Developer Associate (AZ-204)", subline: "Microsoft Certified: Azure Developer Associate", badgeTop: "Microsoft CERTIFIED", badgeMain: "ASSOCIATE" }],
  ["microsoft-az-400-devops-certification-training", T.ms, { certName: "DevOps Engineer Expert (AZ-400)", subline: "Microsoft Certified: DevOps Engineer Expert", badgeTop: "Microsoft CERTIFIED", badgeMain: "EXPERT" }],
  ["microsoft-power-bi-certification-training", T.ms, { certName: "Power BI Data Analyst Associate (PL-300)", subline: "Microsoft Certified: Power BI Data Analyst Associate", badgeTop: "Microsoft CERTIFIED", badgeMain: "ASSOCIATE" }],
  // --- AWS (3) ---
  ["aws-cloud-practitioner-certification-training", T.aws, { certName: "AWS Certified Cloud Practitioner" }],
  ["aws-devops-engineer-certification-training", T.aws, { certName: "AWS Certified DevOps Engineer – Professional" }],
  ["aws-certified-solutions-architect-professional-certification-training", T.aws, { certName: "AWS Certified Solutions Architect – Professional" }],
  // --- DevOps Institute (3) ---
  ["continuous-testing-foundation-certification", T.doi, { certName: "Continuous Testing Foundation (CTF)℠ Certification" }],
  ["continuous-delivery-ecosystem-foundation-certification", T.doi, { certName: "Continuous Delivery Ecosystem Foundation (CDEF)℠ Certification" }],
  ["devsecops-foundation-certification", T.doi, { certName: "DevSecOps Foundation (DSOF)℠ Certification" }],
  // --- IIBA (2 + 2 replacements for blank files) ---
  ["iiba-aac-certification-training", T.iiba, { certName: "Agile Analysis Certification (IIBA®-AAC)", code: "AAC" }],
  ["ccba-certification-training", T.iiba, { certName: "Certification of Capability in Business Analysis™ (CCBA®)", code: "CCBA" }],
  ["cbap-certification-training", T.iiba, { certName: "Certified Business Analysis Professional™ (CBAP®)", code: "CBAP" }],
  ["ecba-certification-training", T.iiba, { certName: "Entry Certificate in Business Analysis™ (ECBA™)", code: "ECBA" }],
  // --- single-course bodies ---
  ["applying-professional-kanban-apk-course", T.formal, { org: "ProKanban.org", orgColor: "#1d7a8c", certName: "Applying Professional Kanban (APK)", tagline: "The Home of Professional Kanban" }],
  ["scrum-at-scale-certification-training", T.formal, { org: "Scrum Inc.", orgColor: "#b02a30", certName: "Registered Scrum@Scale Practitioner™", tagline: "Scrum@Scale" }],
  ["artificial-intelligence-governance-professional", T.formal, { org: "IAPP", orgColor: "#1d5c3f", certName: "Artificial Intelligence Governance Professional (AIGP)", tagline: "International Association of Privacy Professionals" }],
  ["iso-iec-42001-lead-implementer-certification-training", T.formal, { org: "PECB", orgColor: "#1c4f9c", certName: "ISO/IEC 42001 Lead Implementer", tagline: "Beyond Recognition" }],
];

let n = 0;
for (const [slug, tpl, args] of COURSES) {
  fs.writeFileSync(path.join(OUT, `${slug}.svg`), tpl(args));
  n++;
}
console.log("generated", n, "certificates in public/certificates/gen");
