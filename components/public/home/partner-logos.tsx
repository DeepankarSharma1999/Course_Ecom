import fs from "node:fs";
import Image from "next/image";
import path from "node:path";

type Cert = {
  name: string;
  /** Short label shown beneath the logo. */
  label: string;
  /** Base filename (without extension) expected in public/certifications/. */
  file: string;
};

// Accreditation / partner badges. Official images live in
// public/certifications/<file>.(png|svg).
const CERTS: Cert[] = [
  { name: "Scaled Agile (SAFe)", label: "Scaled Agile", file: "scaled-agile" },
  { name: "Scrum Alliance", label: "Scrum Alliance", file: "scrum-alliance" },
  { name: "Scrum.org", label: "Scrum.org", file: "scrum-org" },
  { name: "IIBA", label: "IIBA", file: "iiba" },
  { name: "ICAgile", label: "ICAgile", file: "icagile" },
  { name: "AWS Training Partner", label: "AWS", file: "aws" },
  { name: "DevOps Institute", label: "DevOps Institute", file: "devops-institute" },
  { name: "EC-Council", label: "EC-Council", file: "ec-council" },
  { name: "IASSC", label: "IASSC", file: "iassc" },
];

// Resolve which logo image (if any) exists on disk — runs on the server.
function resolveLogo(file: string): string | null {
  const dir = path.join(process.cwd(), "public", "certifications");
  for (const ext of ["svg", "png", "webp", "jpg", "jpeg"]) {
    if (fs.existsSync(path.join(dir, `${file}.${ext}`))) return `/certifications/${file}.${ext}`;
  }
  return null;
}

export function PartnerLogos({ content }: { content?: any }) {
  const source = content?.partnerLogos?.length ? content.partnerLogos : CERTS;
  // Each item: explicit image URL wins; otherwise resolve a bundled logo file by name.
  const items = source.map((c: any) => ({
    name: c.name,
    label: c.label,
    src: c.image || (c.file ? resolveLogo(c.file) : null),
  }));

  const group = (groupKey: string, hidden = false) => (
    <div className="flex shrink-0 items-start" aria-hidden={hidden}>
      {items.map((cert: any, i: number) => (
        <div
          key={`${groupKey}-${cert.name}-${i}`}
          className="flex w-44 shrink-0 flex-col items-center gap-3 px-3"
          title={cert.name}
        >
          <div className="grid h-12 w-full place-items-center">
            {cert.src ? (
              <Image
                src={cert.src}
                alt={cert.name}
                width={96}
                height={44}
                className="max-h-11 max-w-[96px] w-auto h-auto object-contain"
              />
            ) : (
              <span className="text-center text-[14px] font-bold tracking-tight text-[#0a2540]">
                {cert.label}
              </span>
            )}
          </div>
          <span className="text-center text-[13px] font-medium text-muted-foreground">
            {cert.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative z-20 bg-white px-4 py-12 font-sans">
      <div className="container-tight max-w-6xl">
        <div className="rounded-xl border border-[#082032]/5 bg-white p-7 shadow-[0_16px_50px_rgba(8,32,50,0.08)] md:p-9">
          <h2 className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Accredited &amp; recognised training partner
          </h2>
          <div
            className="group relative w-full max-w-full overflow-hidden [contain:paint]"
            style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
          >
            {/* Four identical groups; the track slides exactly two group widths (-50%) for a seamless loop. */}
            <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
              {group("a")}
              {group("b", true)}
              {group("c", true)}
              {group("d", true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
