import Link from "next/link";
import { 
  ShieldCheck, Server, Cpu, Cloud, PieChart, Briefcase, Bookmark, Wifi, UserCheck, 
  Database, LineChart, Code2, CheckCircle, GraduationCap, Users
} from "lucide-react";

const domains = [
  { name: "Cybersecurity", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "DevOps", icon: Server, color: "text-red-500", bg: "bg-red-50" },
  { name: "Artificial Intelligence", icon: Cpu, color: "text-green-500", bg: "bg-green-50" },
  { name: "Cloud Computing", icon: Cloud, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Data Science", icon: PieChart, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Project Management", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-50" },
  { name: "Others", icon: Bookmark, color: "text-indigo-400", bg: "bg-indigo-50" },
  { name: "CompTIA", icon: Wifi, color: "text-red-500", bg: "bg-red-50" },
  { name: "Machine Learning", icon: Cpu, color: "text-green-600", bg: "bg-green-50" },
  { name: "Database", icon: Database, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Digital Marketing", icon: LineChart, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Software Testing", icon: Code2, color: "text-blue-600", bg: "bg-blue-50" },
];

function MarqueeRow({ items, reverse = false }: { items: typeof domains, reverse?: boolean }) {
  const content = items.map((domain, i) => {
    const Icon = domain.icon;
    return (
      <Link 
        key={domain.name + i} 
        href="/courses" 
        className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-3 pr-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all w-[260px] md:w-[240px] shrink-0"
      >
        <div className={`w-12 h-12 rounded-full ${domain.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${domain.color}`} />
        </div>
        <div>
          <div className="text-[14px] font-bold text-[#082032] mb-0.5">{domain.name}</div>
          <div className="text-[12px] font-semibold text-gray-400 flex items-center gap-1 hover:text-primary transition-colors">
            Explore <span className="text-primary text-[10px]">↗</span>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="relative w-full max-w-full overflow-hidden mb-4 [contain:paint]" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div className={`flex w-max animate-marquee ${reverse ? '[animation-direction:reverse]' : ''} hover:[animation-play-state:paused]`}>
        <div className="flex items-center gap-4 pr-4">
          {content}
        </div>
        <div className="flex items-center gap-4 pr-4" aria-hidden="true">
          {content}
        </div>
        {/* Render a 3rd time just in case the screen is wider than 2 sets of items */}
        <div className="flex items-center gap-4 pr-4" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}

export function BusinessSectors() {
  const row1 = domains.slice(0, 6);
  const row2 = domains.slice(6, 12);

  return (
    <section className="section bg-[#F8FAFC] font-sans relative overflow-hidden pb-32">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      
      <div className="container-tight relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">High-Impact Skills for the Future of Work</div>
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#082032] tracking-tight leading-tight">
            Choose From 25+ In-Demand Domains
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-gray-500 max-w-2xl mx-auto font-medium">
            Our immersive courses in booming fields like Data Science, AI, and Cloud Computing
            provide you with the practical knowledge and experience you need to succeed in the ever-
            evolving job market. Don't just learn, get future-ready with ULearnSystems.
          </p>
        </div>

        {/* Domains Marquee Grids */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col gap-2">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse={true} />
        </div>

        <div className="text-center mb-24">
          <Link href="/courses" className="inline-flex items-center justify-center px-8 py-3 bg-[#E23B3B] hover:bg-[#c93030] text-white text-[15px] font-bold rounded shadow-[0_8px_20px_rgba(226,59,59,0.25)] transition-all">
            Self-Learning
          </Link>
        </div>

        {/* Accelerate Career Banner */}
        <div className="max-w-5xl mx-auto bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 relative mt-10">
          <h3 className="text-center text-[22px] font-bold text-[#082032] mb-10">
            Accelerate Your Career with Our Expert Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            <div className="flex items-center gap-4 border-r-0 md:border-r border-gray-100 last:border-0 pr-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#082032]">Premium Job Openings</div>
                <div className="text-[11px] text-gray-500 mt-0.5">5000+ Hiring Partners</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-r-0 md:border-r border-gray-100 last:border-0 pr-4 pl-0 md:pl-2">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#082032]">Personalized Career Coaching</div>
                <div className="text-[11px] text-gray-500 mt-0.5">1:1 Mentorship by Experts</div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-r-0 md:border-r border-gray-100 last:border-0 pr-4 pl-0 md:pl-2">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#082032]">Dedicated Job Support</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Comprehensive Placement Assistance</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pr-4 pl-0 md:pl-2">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#082032]">Global Alumni Network</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Network with 450,000+ Alumni</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
