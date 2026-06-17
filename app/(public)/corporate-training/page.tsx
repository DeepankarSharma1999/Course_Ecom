import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Building2, Users, Target, Shield, GraduationCap, ArrowRight, PlayCircle, BarChart3, Clock, MapPin, Search, Cpu, Cloud, Code, LineChart, Server, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Training and Development Programs | ULearnSystems",
  description: "Corporate courses customized to training needs. Hands-on training sessions help trainees implement learning to projects.",
};

const DOMAINS = [
  { icon: <Search className="w-6 h-6 text-blue-500" />, title: "Agile Management", courses: "20+ Courses" },
  { icon: <BarChart3 className="w-6 h-6 text-green-500" />, title: "Project Management", courses: "15+ Courses" },
  { icon: <Cpu className="w-6 h-6 text-purple-500" />, title: "Artificial Intelligence", courses: "12+ Courses" },
  { icon: <Cloud className="w-6 h-6 text-sky-500" />, title: "Cloud Computing", courses: "25+ Courses" },
  { icon: <Code className="w-6 h-6 text-orange-500" />, title: "Web Development", courses: "30+ Courses" },
  { icon: <LineChart className="w-6 h-6 text-pink-500" />, title: "Data Science", courses: "18+ Courses" },
  { icon: <Shield className="w-6 h-6 text-red-500" />, title: "Cyber Security", courses: "10+ Courses" },
  { icon: <Server className="w-6 h-6 text-indigo-500" />, title: "DevOps", courses: "14+ Courses" },
  { icon: <Layout className="w-6 h-6 text-teal-500" />, title: "IT Service Management", courses: "8+ Courses" },
];

const TRUSTED_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
];

export default function CorporatePage() {
  return (
    <main className="bg-[#f8f9fa] min-h-screen font-sans text-[#082032]">
      
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-20 border-b border-gray-200">
        <div className="container-tight relative z-10 grid lg:grid-cols-[1fr_400px] gap-16 items-start">
          
          {/* Left Content */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 bg-[#e6f6f6] text-[#1FA8A8] px-4 py-1.5 rounded-full mb-6 text-sm font-bold tracking-wide">
              <Building2 className="w-4 h-4" />
              Corporate Training Solutions
            </div>
            
            <h1 className="text-[40px] md:text-[52px] font-extrabold tracking-tight mb-6 leading-[1.1] text-[#082032]">
              Drive Business Outcomes with <br className="hidden md:block"/> Customized <span className="text-[#1FA8A8]">Corporate Training</span>
            </h1>
            
            <p className="text-[18px] text-gray-600 mb-10 leading-relaxed max-w-2xl">
              Upskill your workforce with hands-on, expert-led training programs tailored to your organization's specific goals. We offer individual and group training to help teams implement learning directly into high-impact projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#1FA8A8]" />
                </div>
                <div>
                  <div className="font-bold text-xl">300,000+</div>
                  <div className="text-sm text-gray-500 font-medium">Professionals Trained</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#1FA8A8]" />
                </div>
                <div>
                  <div className="font-bold text-xl">500+</div>
                  <div className="text-sm text-gray-500 font-medium">Enterprise Clients</div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {TRUSTED_LOGOS.map((logo, i) => (
                  <img key={i} src={logo} alt="Partner" className="h-7 object-contain" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 sticky top-24">
            <h3 className="text-2xl font-bold mb-2 text-[#082032]">Talk to our Learning Experts</h3>
            <p className="text-sm text-gray-500 mb-6">Fill out the form below and we'll get back to you with a customized proposal.</p>
            
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Full Name *</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Work Email *</label>
                <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="john@company.com" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Phone Number *</label>
                <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="+1 (555) 000-0000" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Company Name *</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white" placeholder="Acme Corp" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Team Size</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1FA8A8] focus:ring-1 focus:ring-[#1FA8A8] outline-none text-sm transition-all bg-gray-50 focus:bg-white text-gray-700">
                  <option>1-10 learners</option>
                  <option>11-50 learners</option>
                  <option>51-200 learners</option>
                  <option>200+ learners</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#1FA8A8] hover:bg-[#168989] text-white rounded-lg px-6 py-3.5 font-bold transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
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
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] mb-4 leading-tight">High-Impact Enterprise Skill Domains</h2>
            <p className="text-lg text-gray-600">Explore comprehensive training across 25+ cutting-edge technology and management domains to build a future-ready workforce.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain, i) => (
              <Link href="/courses" key={i} className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-start gap-5 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#1FA8A8]/10 transition-colors">
                  {domain.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#082032] mb-1 group-hover:text-[#1FA8A8] transition-colors">{domain.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    {domain.courses}
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[#1FA8A8] group-hover:underline flex items-center gap-1">Explore <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center gap-2 font-bold text-[#1FA8A8] hover:text-[#082032] transition-colors border-b-2 border-[#1FA8A8] pb-1">
              View All Course Domains <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Immersive Learning Model */}
      <section className="py-24 bg-[#082032] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1FA8A8] opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="container-tight relative z-10">
          <div className="mb-16 md:w-1/2">
            <div className="text-[#1FA8A8] font-bold tracking-widest uppercase text-sm mb-4">The ULearnSystems Advantage</div>
            <h2 className="text-[32px] md:text-[42px] font-bold mb-6 leading-tight">Immersive Learning Model for Maximum ROI</h2>
            <p className="text-gray-300 text-lg leading-relaxed">Our proven 5-step framework ensures that training translates directly into measurable business performance and sustained skill retention.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
            {[
              { num: "01", title: "Assess", desc: "Identify skill gaps and map learning objectives to business goals." },
              { num: "02", title: "Design", desc: "Customize curriculum and labs using real-world enterprise scenarios." },
              { num: "03", title: "Deliver", desc: "Engaging, instructor-led live sessions or blended learning tracks." },
              { num: "04", title: "Reinforce", desc: "Post-training access to sandboxes, mentors, and ongoing resources." },
              { num: "05", title: "Measure", desc: "Track progress with detailed analytics and ROI reporting." },
            ].map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector Line */}
                {i !== 4 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-px border-t-2 border-dashed border-gray-700 -z-10 group-hover:border-[#1FA8A8] transition-colors" />}
                
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center font-black text-2xl text-[#1FA8A8] mb-6 shadow-lg group-hover:bg-[#1FA8A8] group-hover:text-white transition-all duration-300 group-hover:scale-110">
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
