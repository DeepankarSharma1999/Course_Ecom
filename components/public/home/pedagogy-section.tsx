"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_PEDAGOGY_STEPS } from "@/lib/home-defaults";

export function PedagogySection({ content }: { content?: any }) {
  const [active, setActive] = useState(0);

  const source = content?.pedagogySteps?.length ? content.pedagogySteps : DEFAULT_PEDAGOGY_STEPS;
  // num + alternating accent are derived so admins only edit title/text/img.
  const STEPS = source.map((s: any, i: number) => ({ ...s, num: i + 1, color: i % 2 === 0 ? "green" : "red" }));
  const title = content?.pedagogyTitle || "Experience Immersive Learning";

  const prev = () => setActive(c => c === 0 ? STEPS.length - 1 : c - 1);
  const next = () => setActive(c => c === STEPS.length - 1 ? 0 : c + 1);

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
       <div className="container-tight max-w-[1200px] relative">
          <div className="text-center mb-16">
             <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">OUR UNIQUE PEDAGOGY</div>
             <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight mb-4">{title}</h2>
             <p className="text-[14px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
               Join the learning revolution with the ultimate AI-Powered Integrated Learning Platform. Designed to provide a highly engaging, immersive learning experience, it's always YOU at the centre of the learning.
             </p>
          </div>

          {/* Slider Container */}
          <div className="relative flex justify-center items-center h-[400px] w-full">
             
             {STEPS.map((step, i) => {
                let position = 'hidden';
                let style: React.CSSProperties = { transform: 'translateX(200%) scale(0.5)', opacity: 0, zIndex: 0 };
                
                if (i === active) {
                   position = 'active';
                   style = { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 20 };
                } else if (i === (active === 0 ? STEPS.length - 1 : active - 1)) {
                   position = 'prev';
                   style = { transform: 'translateX(-100%) scale(0.85)', opacity: 0.4, zIndex: 10 };
                } else if (i === (active === STEPS.length - 1 ? 0 : active + 1)) {
                   position = 'next';
                   style = { transform: 'translateX(100%) scale(0.85)', opacity: 0.4, zIndex: 10 };
                }

                return (
                   <div key={step.num} className="absolute w-[90%] md:w-[800px] lg:w-[960px] h-[340px] md:h-[380px] bg-white rounded-[40px] md:rounded-[60px] border-2 border-blue-50/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex items-center p-8 md:p-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" style={style}>
                      {/* Number Badge */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30">
                         <div className={`w-16 h-16 md:w-20 md:h-20 bg-white shadow-[0_5px_15px_rgba(0,0,0,0.06)] rounded-[20px] md:rounded-[24px] border-[2px] flex items-center justify-center text-2xl md:text-3xl font-black transition-colors duration-300 ${step.color === 'green' ? 'text-[#10b981] border-[#10b981]' : 'text-[#ef4444] border-[#ef4444]'}`}>
                            {step.num}
                         </div>
                      </div>

                      {/* Content (only visible if active) */}
                      <div className={`flex-1 grid md:grid-cols-2 gap-10 items-center pl-8 md:pl-12 transition-opacity duration-500 delay-100 ${position === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                         <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#082032] mb-4">{step.title}</h3>
                            <p className="text-[13px] md:text-[14px] leading-[1.8] text-gray-500 font-medium">
                              {step.text}
                            </p>
                         </div>
                         <div className="hidden md:flex justify-end">
                            <div className="w-[380px] h-[240px] bg-white rounded-2xl border border-gray-100 shadow-xl flex items-center justify-center overflow-hidden p-2">
                               <img src={step.img} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" alt="Learning platform interface" />
                            </div>
                         </div>
                      </div>
                   </div>
                );
             })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-16 relative z-30">
             <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-[#082032] flex items-center justify-center text-[#082032] hover:bg-[#082032] hover:text-white transition-colors" aria-label="Previous step">
                <ChevronLeft className="w-5 h-5" />
             </button>
             <span className="text-[14px] font-bold text-[#082032] tracking-widest">{active + 1} / {STEPS.length}</span>
             <button onClick={next} className="w-10 h-10 rounded-full border-2 border-[#082032] flex items-center justify-center text-[#082032] hover:bg-[#082032] hover:text-white transition-colors" aria-label="Next step">
                <ChevronRight className="w-5 h-5" />
             </button>
          </div>
       </div>
    </section>
  );
}
