import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import * as Lucide from "lucide-react";

function resolveCompanyLogo(file: string): string | null {
  const dir = path.join(process.cwd(), "public", "companies");
  for (const ext of ["svg", "png", "webp", "jpg", "jpeg"]) {
    if (fs.existsSync(path.join(dir, `${file}.${ext}`))) return `/companies/${file}.${ext}`;
  }
  return null;
}

const learnerAvatars = [
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=32",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=48",
  "https://i.pravatar.cc/100?img=16",
];

function TrustedCompanyCarousel() {
  const trustedCompanies = [
    { name: "Infosys", file: "infosys", wordmark: "Infosys", className: "text-[#007CC3]" },
    { name: "Hewlett Packard Enterprise", file: "hpe", wordmark: "Hewlett Packard", className: "text-gray-800" },
    { name: "Bennett Coleman & Co.", file: "bennett-coleman", wordmark: "Bennett Coleman", className: "text-gray-800" },
    { name: "Tiger Analytics", file: "tiger-analytics", wordmark: "TIGER ANALYTICS", className: "text-black tracking-tighter" },
    { name: "Welspun", file: "welspun", wordmark: "WELSPUN", className: "text-blue-600" },
    { name: "TerraPay", file: "terrapay", wordmark: "terrapay", className: "text-blue-800 lowercase italic" },
    { name: "Reliance", file: "reliance", wordmark: "Reliance", className: "text-red-600" },
  ].map((c) => ({ ...c, src: resolveCompanyLogo(c.file) }));

  const companySet = (
    <div className="flex items-center">
      {trustedCompanies.map((company) => (
        <div key={company.name} className="grid h-10 w-36 shrink-0 place-items-center px-3" title={company.name}>
          {company.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={company.src} alt={company.name} className="max-h-9 max-w-[110px] object-contain" />
          ) : (
            <span className={`text-[18px] font-black ${company.className}`}>{company.wordmark}</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-14 max-w-xl">
      <div className="text-[14px] font-semibold text-gray-500 mb-4">Trusted by</div>
      <div
        className="relative w-full max-w-full overflow-hidden [contain:paint]"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {companySet}
          <div aria-hidden="true">{companySet}</div>
        </div>
      </div>
    </div>
  );
}

export function HomeHero({ content }: { content?: any }) {
  const h = content ?? {};
  const headline = h.heroHeadline || "Learn In-Demand Skills";
  const highlight = h.heroHeadlineHighlight || "for Tomorrow's";
  const suffix = h.heroHeadlineSuffix || "Jobs";
  const subheading = h.heroSubheading || "Experience learning that delivers results. We're disrupting the way you learn new-age technologies and we'll help you get job-ready, fast.";
  const ctaPrimaryText = h.heroCtaPrimaryText || "Explore All Courses";
  const ctaPrimaryLink = h.heroCtaPrimaryLink || "/courses";
  const ctaSecondaryText = h.heroCtaSecondaryText || "Corporate Training";
  const ctaSecondaryLink = h.heroCtaSecondaryLink || "/corporate-training";

  return (
    <section className="relative overflow-hidden bg-white font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(20,102,92,0.07),transparent_32%),linear-gradient(180deg,#f7f9f9,rgba(255,255,255,0)_55%)] pointer-events-none" />
      <div className="container-tight relative grid items-center gap-12 pt-16 pb-12 md:pt-20 lg:grid-cols-[1fr_1fr] lg:pt-24 lg:pb-16 z-10">

        {/* LEFT COLUMN */}
        <div className="min-w-0 max-w-2xl text-left z-10">
          {/* badge pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e4efe9] pl-1.5 pr-4 py-1.5 mb-6">
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Star className="w-3 h-3 fill-[#14665c] text-[#14665c]" />
            </span>
            <span className="text-[13px] font-semibold text-[#14665c]">{h.heroBadge || "Learn. Enhance. Adapt. Deliver."}</span>
          </div>

          <h1 className="max-w-[620px] text-[34px] md:text-[44px] font-extrabold leading-[1.12] tracking-tight text-[#0f1f2e] sm:text-[48px] lg:text-[54px] font-sans">
            {headline} <span className="text-[#14665c]">{highlight}</span> {suffix}
          </h1>

          <p className="mt-5 md:mt-6 max-w-[520px] text-[15px] md:text-[17px] leading-relaxed text-gray-500 font-normal">
            {subheading}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={ctaPrimaryLink} className="rounded-lg bg-[#14665c] hover:bg-[#0f544c] text-white font-bold text-[15px] text-center py-3.5 px-8 flex items-center justify-center gap-2 transition-colors shadow-sm">
              {ctaPrimaryText} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={ctaSecondaryLink} className="rounded-lg border-[1.5px] border-[#14665c] bg-white hover:bg-[#f2f8f6] text-[#14665c] font-bold text-[15px] text-center py-3.5 px-8 flex items-center justify-center gap-2 transition-colors">
              {ctaSecondaryText} <Lucide.Users className="h-4 w-4" />
            </Link>
          </div>

          <TrustedCompanyCarousel />

          {/* shield trust line */}
          <div className="mt-5 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#14665c] flex items-center justify-center shrink-0">
              <Lucide.ShieldCheck className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-[14px] font-medium text-gray-600">and 4,500+ companies across the globe</span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex -space-x-3 items-center">
              {learnerAvatars.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
                  style={{ zIndex: 6 - i }}
                />
              ))}
              <span className="h-11 w-11 rounded-full bg-[#14665c] border-2 border-white text-white text-[12px] font-bold flex items-center justify-center shadow-sm relative z-0">12K+</span>
            </div>
            <div className="flex flex-col text-left">
              <div className="text-[13px] text-gray-500 font-medium">Rated by Learners</div>
              <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#0f1f2e]">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.8/5 <span className="font-normal text-gray-400 px-1">•</span> <span className="font-medium text-gray-500 text-[14px]">12,500+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - arch-portrait collage with career cards */}
        <div className="relative h-[620px] hidden lg:block z-0">

          {/* dotted accent */}
          <div className="absolute top-[6%] left-[8%] w-24 h-16 opacity-60 z-0"
               style={{ backgroundImage: "radial-gradient(circle, #99c2bc 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />

          {/* Top-centre: hijabi professional */}
          <div className="absolute top-0 left-[26%] w-[215px] h-[300px] bg-[#dcede6] rounded-t-full overflow-hidden shadow-lg z-10">
            <img src="/images/vendor/pexels/pexels-photo-10341448.jpeg" alt="" className="w-full h-full object-cover object-top" />
          </div>
          <div className="absolute top-[16%] left-[-4%] bg-white p-2.5 pr-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-[#e0f2ef] flex items-center justify-center shrink-0">
              <Lucide.BarChart3 className="w-5 h-5 text-[#0d7d74]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#082032] flex items-center gap-2">Data Analyst <Lucide.ArrowUpRight className="w-3.5 h-3.5 text-[#b8860b]" strokeWidth={3} /></div>
              <div className="text-[11px] text-gray-500 font-medium mt-0.5">to <span className="text-[#0d7d74] font-bold">Data Engineer</span></div>
            </div>
          </div>

          {/* Right: businessman in suit (Dubai skyline) */}
          <div className="absolute top-[9%] right-0 w-[195px] h-[290px] bg-[#e8eef4] rounded-t-full overflow-hidden shadow-lg z-10">
            <img src="/images/vendor/pexels/pexels-photo-3307862.jpeg" alt="" className="w-full h-full object-cover object-[center_30%]" />
          </div>
          <div className="absolute top-[56%] right-[-6%] bg-white p-2.5 pr-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-[#e0f2ef] flex items-center justify-center shrink-0">
              <Lucide.Cloud className="w-5 h-5 text-[#0d7d74]" strokeWidth={2.5} fill="currentColor" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#082032] flex items-center gap-2">Cloud Engineer <Lucide.ArrowUpRight className="w-3.5 h-3.5 text-[#0d7d74]" strokeWidth={3} /></div>
              <div className="text-[11px] text-gray-500 font-medium mt-0.5">• <span className="text-[#0d7d74] font-bold">180% Salary Growth</span></div>
            </div>
          </div>

          {/* Middle-left: Emirati man in kandura */}
          <div className="absolute top-[36%] left-[2%] w-[185px] h-[270px] bg-[#f2e9db] rounded-t-full overflow-hidden shadow-lg z-10">
            <img src="/images/vendor/pexels/pexels-photo-5416859.jpeg" alt="" className="w-full h-full object-cover object-top" />
          </div>
          <div className="absolute top-[76%] left-[-5%] bg-white p-2.5 pr-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-[#fdf3e0] flex items-center justify-center shrink-0">
              <Lucide.Briefcase className="w-5 h-5 text-[#b8860b]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#082032] flex items-center gap-2">Project Coordinator <Lucide.ArrowUpRight className="w-3.5 h-3.5 text-[#b8860b]" strokeWidth={3} /></div>
              <div className="text-[11px] text-gray-500 font-medium mt-0.5">to <span className="text-[#0d7d74] font-bold">Product Manager</span></div>
            </div>
          </div>

          {/* Bottom-centre: businesswoman with laptop */}
          <div className="absolute bottom-0 left-[36%] w-[205px] h-[280px] bg-[#dce9e4] rounded-t-full overflow-hidden shadow-lg z-10">
            <img src="/images/vendor/pexels/pexels-photo-8424944.jpeg" alt="" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

    </section>
  );
}

