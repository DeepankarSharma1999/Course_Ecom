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
      <div className="mt-4 text-[13px] font-bold text-[#0a66c2] hover:underline cursor-pointer">
        and 4,500+ companies across the globe
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(31,168,168,0.13),transparent_28%),linear-gradient(90deg,rgba(240,246,248,0.95),rgba(255,255,255,0)_60%)] pointer-events-none" />
      <div className="container-tight relative grid items-center gap-12 pt-16 pb-12 md:pt-20 lg:grid-cols-[1fr_1fr] lg:pt-24 lg:pb-16 z-10">
        
        {/* LEFT COLUMN */}
        <div className="min-w-0 max-w-2xl text-left z-10">
          <h1 className="max-w-[600px] text-[32px] md:text-[40px] font-bold leading-[1.15] tracking-tight text-[#082032] sm:text-[44px] lg:text-[48px] font-sans">
            Learn In-Demand Skills for Tomorrow&apos;s Jobs
          </h1>

          <p className="mt-4 md:mt-6 max-w-[500px] text-[14px] md:text-[16px] leading-relaxed text-gray-600 font-medium">
            Experience learning that delivers results. We&apos;re disrupting the way you learn <span className="font-bold text-[#082032]">new-age technologies</span> and we&apos;ll help you get <span className="font-bold text-[#082032]">job-ready</span>, fast.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/courses" className="btn-primary rounded text-center py-3.5 px-8">
              Explore All Courses
            </Link>
            <Link href="/corporate-training" className="btn-outline rounded text-center py-3.5 px-8 flex items-center justify-center gap-2">
              Corporate Training <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <TrustedCompanyCarousel />

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex -space-x-3">
              {learnerAvatars.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-[#fafafa] object-cover shadow-sm"
                  style={{ zIndex: 5 - i }}
                />
              ))}
            </div>
            <div className="flex flex-col text-left">
              <div className="text-[12px] text-gray-500 font-medium">Rated by Learners</div>
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#082032]">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.8/5 <span className="font-normal text-gray-400 px-1">•</span> <span className="font-medium text-gray-500 text-[13px]">12,500+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - VISUAL GRAPHIC */}
        <div className="relative h-[600px] hidden lg:block z-0">
          
          {/* Top Right Girl (Microsoft) */}
          <div className="absolute top-[0%] right-[0%] w-[200px] h-[200px] bg-[#27ae60] rounded-t-full overflow-hidden flex items-end justify-center shadow-lg">
             <img src="/images/vendor/pexels/pexels-photo-3756679.jpeg" alt="" className="w-[85%] object-cover object-top h-[95%]" />
          </div>
          <div className="absolute top-[28%] right-[-10%] bg-white p-3 pr-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-3 z-20">
             <img src="/images/vendor/wikimedia/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5" />
             <div>
               <div className="text-[13px] font-bold text-[#082032] flex items-center gap-1.5">150% Salary Hike <Lucide.TrendingUp className="w-3.5 h-3.5 text-[#e11d48]" strokeWidth={3} /></div>
               <div className="text-[10px] text-gray-500 font-medium mt-0.5">SDE II @ Microsoft</div>
             </div>
          </div>

          {/* Left Middle Girl (Citi) */}
          <div className="absolute top-[25%] left-[5%] w-[180px] h-[180px] bg-[#fcd34d] rounded-t-full overflow-hidden flex items-end justify-center shadow-lg">
            <img src="/images/vendor/pexels/pexels-photo-1181686.jpeg" alt="" className="w-[80%] object-cover object-top h-[90%]" />
          </div>
          <div className="absolute top-[50%] left-[-5%] bg-white p-2.5 pr-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-3 z-20 min-w-[200px]">
             <div className="flex-1">
               <div className="text-[9px] text-gray-400 font-medium line-through mb-0.5">Business Analyst</div>
               <div className="text-[12px] font-bold text-[#082032] flex items-center gap-1.5"><Lucide.TrendingUp className="w-3.5 h-3.5 text-[#082032]" strokeWidth={3} /> To Project Manager</div>
             </div>
             <div className="font-black text-[#003B70] text-lg relative shrink-0">citi<span className="absolute -top-1 right-0 text-red-500 text-[10px]">◝</span></div>
          </div>

          {/* Bottom Right Boy (Oracle) */}
          <div className="absolute bottom-[2%] right-[5%] w-[190px] h-[190px] bg-[#fde047] rounded-t-full overflow-hidden flex items-end justify-center shadow-lg">
             <img src="/images/vendor/pexels/pexels-photo-2379004.jpeg" alt="" className="w-[90%] object-cover object-top h-[95%]" />
          </div>
          <div className="absolute bottom-[-2%] right-[-5%] bg-white p-3 pr-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-3 z-20">
             <div className="font-black text-[#C74634] text-base tracking-tighter">ORACLE</div>
             <div>
               <div className="text-[13px] font-bold text-[#082032] flex items-center gap-1.5">200% Salary Hike <Lucide.TrendingUp className="w-3.5 h-3.5 text-[#e11d48]" strokeWidth={3} /></div>
               <div className="text-[10px] text-gray-500 font-medium mt-0.5">Cloud Architect @ Oracle</div>
             </div>
          </div>

          {/* Bottom Left Boy (Walmart) */}
          <div className="absolute bottom-[0%] left-[15%] w-[210px] h-[210px] bg-[#34d399] rounded-t-full overflow-hidden flex items-end justify-center shadow-lg">
             <img src="/images/vendor/pexels/pexels-photo-220453.jpeg" alt="" className="w-[85%] object-cover object-top h-[95%]" />
          </div>
          <div className="absolute bottom-[-10%] left-[5%] bg-white p-3 pr-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-4 z-20">
             <div>
               <div className="text-[9px] text-gray-400 font-medium mb-0.5">Data Analyst</div>
               <div className="text-[12px] font-bold text-[#082032] flex items-center gap-1.5"><Lucide.TrendingUp className="w-3.5 h-3.5 text-[#e11d48]" strokeWidth={3} /> To Data Engineer</div>
             </div>
             <div className="font-bold text-[#0071CE] text-base flex items-center gap-1">Walmart<Lucide.Sun className="w-3.5 h-3.5 text-[#FFC220] fill-current" /></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-[18%] left-[20%] w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center z-10 p-2.5">
            <img src="/images/vendor/wikimedia/Slack_icon_2019.svg" alt="Slack" className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-[8%] right-[45%] w-10 h-10 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center z-10 p-2">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-red-600"><path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z"/></svg>
          </div>
          <div className="absolute top-[60%] right-[5%] w-10 h-10 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center z-10 p-2">
            <img src="/images/vendor/wikimedia/Python-logo-notext.svg" alt="Python" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[5%] left-[0%] w-10 h-10 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center z-10 p-2">
            <img src="/images/vendor/wikimedia/Visual_Studio_Code_1.35_icon.svg" alt="VS Code" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

    </section>
  );
}

