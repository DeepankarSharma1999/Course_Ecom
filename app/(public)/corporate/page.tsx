import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Building2, Users, Target, Shield, GraduationCap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Group Training | ULearnSystems",
  description: "Upskill your entire workforce with ULearnSystems' customized corporate training programs in Agile, Scrum, SAFe, and DevOps.",
};

const BENEFITS = [
  {
    icon: <Users className="w-8 h-8 text-[#4676f5]" />,
    title: "Train Your Entire Team",
    desc: "Cost-effective group rates and customized schedules to fit your organization's needs.",
  },
  {
    icon: <Target className="w-8 h-8 text-[#4676f5]" />,
    title: "Customized Curriculum",
    desc: "We tailor the training material to align with your specific industry and business goals.",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#4676f5]" />,
    title: "Dedicated Account Manager",
    desc: "A single point of contact to ensure seamless delivery and support throughout the engagement.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-[#4676f5]" />,
    title: "Post-Training Support",
    desc: "Continued access to learning resources and expert guidance after the training concludes.",
  },
];

export default function CorporatePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/frontend_assets/image/homban-dots.webp')] opacity-20 bg-repeat"></div>
        <div className="container-tight relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold">Corporate Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Corporate Group <br /> <span className="text-yellow-400">Training</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed max-w-xl">
              Empower your teams with world-class training in Agile, Scrum, SAFe, and DevOps. We deliver customized learning experiences that drive real business results.
            </p>
            
            <ul className="space-y-4 mb-10 text-primary-foreground/90">
              {[
                "Flexible Delivery: On-site or Live Online",
                "Expert Instructors with Industry Experience",
                "Hands-on Labs and Practical Case Studies",
                "Post-Training Mentorship and Support"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 opacity-80" />
                  <span className="font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inquire" className="btn bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-bold flex items-center justify-center transition-colors shadow-lg w-full sm:w-auto">
                Request a Proposal
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
              <Link href="/courses" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-8 py-3 text-lg font-medium flex items-center justify-center transition-colors w-full sm:w-auto">
                Explore Courses
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-xl text-white">Team Progress</h3>
                  <div className="text-sm text-primary-foreground/80">Engineering Department</div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-green-400">
                  <span className="text-sm font-bold text-white">85%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#4676f5] flex items-center justify-center text-white text-xs font-bold">AK</div>
                      <span className="font-medium text-white text-sm">Alex Kumar</span>
                    </div>
                    <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded">Completed</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">SJ</div>
                      <span className="font-medium text-white text-sm">Sarah Jenkins</span>
                    </div>
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">In Progress (70%)</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">MR</div>
                      <span className="font-medium text-white text-sm">Marcus Reed</span>
                    </div>
                    <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white border-b border-ink-100">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="h2 mb-4">Why Choose ULearnSystems for Your Team?</h2>
            <p className="lead max-w-2xl mx-auto">
              We partner with organizations to build high-performing teams through continuous learning and development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="text-center group p-6 rounded-2xl hover:bg-ink-50 transition-colors border border-transparent hover:border-ink-100">
                <div className="w-16 h-16 bg-[#eff6ff] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-1 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-xl text-ink-900 mb-3">{benefit.title}</h3>
                <p className="text-ink-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquire" className="section bg-ink-50">
        <div className="container-tight">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-card-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-5/12 bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground p-10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/frontend_assets/image/homban-dots.webp')] opacity-20 bg-repeat"></div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">Ready to Transform Your Team?</h3>
              <p className="text-primary-foreground/90 leading-relaxed mb-8 relative z-10">
                Fill out the form with your training requirements, and our corporate training specialist will get back to you within 24 hours.
              </p>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <span>Discuss your goals</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <span>Receive a custom proposal</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <span>Schedule the training</span>
                </li>
              </ul>
            </div>
            <div className="md:w-7/12 p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink-700">First Name *</label>
                    <input type="text" className="w-full border border-ink-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink-700">Last Name *</label>
                    <input type="text" className="w-full border border-ink-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink-700">Work Email *</label>
                  <input type="email" className="w-full border border-ink-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink-700">Company Name *</label>
                  <input type="text" className="w-full border border-ink-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink-700">Training Requirements</label>
                  <textarea rows={4} className="w-full border border-ink-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Which courses are you interested in? How many team members?" />
                </div>
                <button type="submit" className="w-full btn-primary rounded-lg px-6 py-3 font-semibold transition-colors shadow-md">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
