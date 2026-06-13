import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Star, Users } from "lucide-react";

const trustedCompanies = [
  { name: "NETFLIX", className: "text-[#E50914] tracking-tight" },
  { name: "cognizant", className: "text-[#000080] lowercase italic" },
  { name: "Meta", className: "text-[#0668E1] tracking-tighter" },
  { name: "Infosys", className: "font-serif text-[#007CC3]" },
  { name: "Capgemini", className: "text-[#0070AD] tracking-tighter" },
];

const learnerAvatars = [
  "https://i.pravatar.cc/80?img=11",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=5",
  "https://i.pravatar.cc/80?img=48",
  "https://i.pravatar.cc/80?img=16",
];

function TrustedCompanyCarousel() {
  const companySet = (
    <div className="flex items-center gap-8 pr-8">
      {trustedCompanies.map((company) => (
        <span key={company.name} className={`shrink-0 text-[20px] font-black ${company.className}`}>
          {company.name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="mt-8 max-w-xl rounded-2xl border border-[#082032]/5 bg-white/70 p-4 shadow-[0_10px_28px_rgba(8,32,50,0.05)]">
      <div className="mb-3 text-sm font-black text-[#082032]">Trusted by</div>
      <div
        className="relative w-full max-w-full overflow-hidden [contain:paint]"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="flex w-max animate-marquee text-slate-700/70 hover:[animation-play-state:paused]">
          {companySet}
          <div aria-hidden="true">{companySet}</div>
        </div>
      </div>
      <div className="mt-2 text-[13px] font-medium text-muted-foreground">and 6,000+ companies across the globe</div>
    </div>
  );
}

function HeroImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[540px] ${className}`}>
      <div className="absolute -right-5 top-10 h-72 w-72 rounded-[48px] bg-[#DDF3F3]" />
      <div className="absolute -left-4 bottom-8 h-40 w-40 rounded-full bg-white" />
      <div className="absolute right-4 top-2 hidden h-64 w-44 bg-[radial-gradient(#9BCBCD_2px,transparent_2px)] [background-size:18px_18px] opacity-60 md:block" />

      <div className="relative overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_24px_70px_rgba(8,32,50,0.15)]">
        <img
          src="https://images.pexels.com/photos/18999469/pexels-photo-18999469.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Professionals collaborating in a certification training workshop"
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#082032]/20 via-transparent to-primary/10" />
      </div>

      <div className="absolute -left-2 top-8 rounded-2xl bg-white/95 p-4 shadow-[0_18px_50px_rgba(8,32,50,0.14)] ring-1 ring-[#082032]/5 sm:-left-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <div className="text-xl font-bold text-primary">5,000+</div>
            <div className="text-xs font-medium text-muted-foreground">Learners certified</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 right-4 rounded-2xl bg-white/95 p-4 shadow-[0_18px_50px_rgba(8,32,50,0.14)] ring-1 ring-[#082032]/5 sm:right-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#082032] text-white">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <div className="text-xl font-bold text-[#082032]">130+</div>
            <div className="text-xs font-medium text-muted-foreground">Expert-led courses</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(31,168,168,0.13),transparent_28%),linear-gradient(90deg,rgba(240,246,248,0.95),rgba(255,255,255,0)_60%)]" />

      <div className="container-tight relative grid items-center gap-12 pb-16 pt-12 md:pb-20 md:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <div className="min-w-0 max-w-2xl text-left">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Global professional learning platform
          </div>

          <h1 className="max-w-[640px] text-[36px] font-bold leading-[1.04] tracking-tight text-[#082032] sm:text-5xl lg:text-[56px]">
            Build globally recognised skills with expert-led certification training.
          </h1>

          <p className="mt-5 max-w-[560px] text-[17px] leading-8 text-muted-foreground">
            Prepare for the next step in your career with live training, practical learning paths, and corporate programs led by experienced practitioners.
          </p>

          <HeroImage className="mt-9 lg:hidden" />

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/courses" className="btn-primary rounded-md">
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/corporate" className="btn-outline rounded-md">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-primary">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Book Consultation
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex -space-x-3">
              {learnerAvatars.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                  style={{ zIndex: 5 - i }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#082032]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.9/5
              <span className="font-medium text-muted-foreground">10,000+ reviews</span>
            </div>
          </div>

          <TrustedCompanyCarousel />
        </div>

        <HeroImage className="hidden lg:block lg:ml-auto" />
      </div>

      <div className="border-y border-[#082032]/5 bg-white/70 py-5 backdrop-blur">
        <div className="container-tight grid gap-4 text-sm font-black text-[#082032] sm:grid-cols-3">
          {["Globally recognized frameworks", "Expert-led live learning", "Corporate and individual programs"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
