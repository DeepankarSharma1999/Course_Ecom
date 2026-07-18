import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Building2, Users, ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/public/dynamic-icon";
import { getPageContent } from "@/lib/page-content";

const SLUG = "corporate-training";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: "/corporate-training" } };
}

export default async function CorporatePage() {
  const c = await getPageContent(SLUG);
  const DOMAINS = c.domains as any[];
  const TRUSTED_LOGOS = c.trustedLogos as string[];
  return (
    <main className="bg-[#f8f9fa] min-h-screen font-sans text-[#082032]">
      
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-20 border-b border-gray-200">
        <div className="container-tight relative z-10 grid lg:grid-cols-[1fr_400px] gap-16 items-start">
          
          {/* Left Content */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 bg-[#e6f6f6] text-[#0E7C7C] px-4 py-1.5 rounded-full mb-6 text-sm font-bold tracking-wide">
              <Building2 className="w-4 h-4" />
              {c.heroBadge}
            </div>

            <h1 className="text-[40px] md:text-[52px] font-extrabold tracking-tight mb-6 leading-[1.1] text-[#082032]">
              {c.heroHeading} <br className="hidden md:block"/> {c.heroHeadingMid} <span className="text-[#0E7C7C]">{c.heroHeadingHighlight}</span>
            </h1>

            <p className="text-[18px] text-gray-600 mb-10 leading-relaxed max-w-2xl">
              {c.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mb-12">
              {(c.stats as any[]).map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                    <DynamicIcon name={stat.icon} className="w-6 h-6 text-[#0E7C7C]" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">{c.trustedLabel}</p>
              <div className="flex flex-wrap items-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {TRUSTED_LOGOS.map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={logo} alt="" loading="lazy" className="h-7 object-contain" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 sticky top-24">
            <h3 className="text-2xl font-bold mb-2 text-[#082032]">{c.formTitle}</h3>
            <p className="text-sm text-gray-500 mb-6">{c.formSubtitle}</p>
            
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Full Name *</label>
                <input type="text" aria-label="Full name" autoComplete="name" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Work Email *</label>
                <input type="email" aria-label="Work email" autoComplete="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="john@company.com" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Phone Number *</label>
                <input type="tel" aria-label="Phone number" autoComplete="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="+1 (555) 000-0000" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Company Name *</label>
                <input type="text" aria-label="Company name" autoComplete="organization" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="Acme Corp" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Team Size</label>
                <select aria-label="Team size" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white text-gray-700">
                  <option>1-10 learners</option>
                  <option>11-50 learners</option>
                  <option>51-200 learners</option>
                  <option>200+ learners</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#0E7C7C] hover:bg-[#0a5f5f] text-white rounded-lg px-6 py-3.5 font-bold transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
                Request Proposal <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
            </form>
          </div>
          
        </div>
      </section>

      {/* Enterprise Domains Grid */}
      <section className="py-24 bg-white">
        <div className="container-tight">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] mb-4 leading-tight">{c.domainsTitle}</h2>
            <p className="text-lg text-gray-600">{c.domainsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain, i) => (
              <Link href="/courses" key={i} className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-start gap-5 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#0E7C7C]/10 transition-colors">
                  <DynamicIcon name={domain.icon} className={`w-6 h-6 ${domain.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#082032] mb-1 group-hover:text-[#0E7C7C] transition-colors">{domain.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    {domain.courses}
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[#0E7C7C] group-hover:underline flex items-center gap-1">Explore <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center gap-2 font-bold text-[#0E7C7C] hover:text-[#082032] transition-colors border-b-2 border-[#1FA8A8] pb-1">
              View All Course Domains <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Immersive Learning Model */}
      <section className="py-24 bg-[#082032] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0E7C7C] opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="container-tight relative z-10">
          <div className="mb-16 md:w-1/2">
            <div className="text-[#0E7C7C] font-bold tracking-widest uppercase text-sm mb-4">{c.advantageEyebrow}</div>
            <h2 className="text-[32px] md:text-[42px] font-bold mb-6 leading-tight">{c.advantageTitle}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{c.advantageSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
            {(c.steps as any[]).map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector Line */}
                {i !== 4 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-px border-t-2 border-dashed border-gray-700 -z-10 group-hover:border-[#1FA8A8] transition-colors" />}
                
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center font-black text-2xl text-[#0E7C7C] mb-6 shadow-lg group-hover:bg-[#0E7C7C] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
