import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Briefcase, Zap, Target, TrendingUp, Layers, Users, BarChart, Shield, Code, Cpu, Globe, LayoutDashboard } from "lucide-react";
import React from "react";

export type IconName = "briefcase" | "zap" | "target" | "trending" | "layers" | "users" | "chart" | "shield" | "code" | "cpu" | "globe" | "layout";

const getIcon = (name: IconName, className: string) => {
  const icons: Record<IconName, React.ReactNode> = {
    briefcase: <Briefcase className={className} />,
    zap: <Zap className={className} />,
    target: <Target className={className} />,
    trending: <TrendingUp className={className} />,
    layers: <Layers className={className} />,
    users: <Users className={className} />,
    chart: <BarChart className={className} />,
    shield: <Shield className={className} />,
    code: <Code className={className} />,
    cpu: <Cpu className={className} />,
    globe: <Globe className={className} />,
    layout: <LayoutDashboard className={className} />
  };
  return icons[name] || <CheckCircle2 className={className} />;
};

type Benefit = {
  title: string;
  description: string;
  icon: IconName;
};

type ApproachStep = {
  title: string;
  description: string;
};

type Props = {
  category: "Agile Solutions" | "Product Building";
  title: string;
  subtitle: string;
  description: string;
  benefitsTitle?: string;
  benefits: Benefit[];
  approachTitle?: string;
  approach: ApproachStep[];
  relatedCourses?: { title: string; href: string }[];
};

export function EnterpriseSolutionLayout({
  category,
  title,
  subtitle,
  description,
  benefitsTitle = "Why Choose This Solution?",
  benefits,
  approachTitle = "Our Implementation Approach",
  approach,
  relatedCourses
}: Props) {
  return (
    <main className="bg-[#f8f9fa] min-h-screen font-sans text-[#082032]">
      
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-24 border-b border-gray-200">
        <div className="container-tight max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 bg-[#e6f6f6] text-[#0E7C7C] px-4 py-1.5 rounded-full mb-8 text-sm font-bold tracking-wide mx-auto">
            <Target className="w-4 h-4" />
            {category}
          </div>
          
          <h1 className="text-[40px] md:text-[56px] font-extrabold tracking-tight mb-6 leading-[1.1] text-[#082032]">
            {title}
          </h1>
          <h2 className="text-[20px] md:text-[24px] text-[#0E7C7C] font-bold mb-6">
            {subtitle}
          </h2>
          
          <p className="text-[18px] text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#contact" className="bg-[#0E7C7C] hover:bg-[#0a5f5f] text-white rounded-lg px-8 py-4 font-bold transition-colors shadow-lg flex items-center justify-center gap-2 text-lg">
              Consult an Expert <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container-tight">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] mb-4 leading-tight">{benefitsTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#0E7C7C]/10 transition-colors">
                  {getIcon(benefit.icon, "w-8 h-8 text-[#0E7C7C]")}
                </div>
                <h3 className="font-bold text-xl text-[#082032] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-[#082032] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0E7C7C] opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="container-tight relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="text-[#0E7C7C] font-bold tracking-widest uppercase text-sm mb-4">Our Methodology</div>
            <h2 className="text-[32px] md:text-[42px] font-bold mb-6 leading-tight">{approachTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((step, i) => (
              <div key={i} className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#0E7C7C] flex items-center justify-center font-black text-xl text-white mb-6 shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-[#e6f6f6] border-t border-[#1FA8A8]/20">
        <div className="container-tight max-w-4xl mx-auto text-center">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] mb-6 leading-tight">Ready to Transform Your Organization?</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Partner with SimpliLEAD to implement customized {category.toLowerCase()} that drive measurable business outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/corporate-training" className="bg-[#082032] hover:bg-[#061a29] text-white rounded-lg px-8 py-4 font-bold transition-colors shadow-lg flex items-center justify-center text-lg">
              Contact Sales
            </Link>
            {relatedCourses && relatedCourses.length > 0 && (
              <Link href={relatedCourses[0].href} className="bg-white hover:bg-gray-50 text-[#082032] border border-gray-200 rounded-lg px-8 py-4 font-bold transition-colors shadow flex items-center justify-center text-lg">
                View Related Courses
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
