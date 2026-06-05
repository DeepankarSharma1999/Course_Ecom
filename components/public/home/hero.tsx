"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export function HomeHero() {
  return (
    <section className="bg-[#f0f4f8] relative pt-24 pb-40 overflow-hidden font-sans">
      <div className="container-tight relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left max-w-2xl lg:pr-8"
        >
          <h1 className="text-[34px] lg:text-[42px] leading-[1.2] font-bold text-foreground mb-4 tracking-tight">
            Enhance skills with our specialists - anytime, anywhere
          </h1>
          <p className="text-foreground/70 text-[16px] leading-relaxed mb-8 max-w-[500px] mx-auto lg:mx-0">
            Prepare to take the next step in your career with the leading training provider globally. Begin your immersive learning journey with us.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-10">
            <Link href="/courses" className="bg-primary hover:bg-[#158f8f] text-primary-foreground px-6 py-3 rounded font-semibold text-[15px] inline-flex items-center gap-2 transition-colors">
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <div className="text-[14px] font-bold text-foreground mb-3">Trusted by</div>
            <div className="w-full max-w-full overflow-hidden relative mb-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="flex w-max animate-marquee gap-8 text-xl font-bold text-slate-700/60 hover:[animation-play-state:paused]">
                {/* First Set */}
                <div className="flex items-center gap-8 pr-8">
                  <span className="font-sans text-[#E50914] tracking-tight text-[22px]">NETFLIX</span>
                  <span className="font-sans text-[#000080] font-black lowercase italic text-[22px]">cognizant</span>
                  <span className="font-sans text-[#0668E1] tracking-tighter text-[22px]">Meta</span>
                  <span className="font-serif text-[#007CC3] text-[22px]">Infosys</span>
                  <span className="font-sans text-[#0070AD] font-bold tracking-tighter text-[20px]">Capgemini</span>
                </div>
                {/* Second Set (Duplicate) */}
                <div className="flex items-center gap-8 pr-8" aria-hidden="true">
                  <span className="font-sans text-[#E50914] tracking-tight text-[22px]">NETFLIX</span>
                  <span className="font-sans text-[#000080] font-black lowercase italic text-[22px]">cognizant</span>
                  <span className="font-sans text-[#0668E1] tracking-tighter text-[22px]">Meta</span>
                  <span className="font-serif text-[#007CC3] text-[22px]">Infosys</span>
                  <span className="font-sans text-[#0070AD] font-bold tracking-tighter text-[20px]">Capgemini</span>
                </div>
              </div>
            </div>
            <div className="text-[13px] text-muted-foreground text-center lg:text-left">and 6,000+ companies across the globe</div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-3">
              {[
                "https://i.pravatar.cc/100?img=68",
                "https://i.pravatar.cc/100?img=47",
                "https://i.pravatar.cc/100?img=12",
                "https://i.pravatar.cc/100?img=32",
                "https://i.pravatar.cc/100?img=51",
              ].map((src, i) => (
                <img key={i} src={src} alt="Learner" className="w-10 h-10 rounded-full border-2 border-[#f0f4f8] object-cover bg-white shadow-sm relative" style={{ zIndex: 5 - i }} />
              ))}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-muted-foreground text-[12px] mb-0.5">Rated by Learners</span>
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-foreground">
                <Star className="w-4 h-4 text-primary fill-current" /> 4.9/5 <span className="text-muted-foreground font-normal ml-1">• 10,000+ Reviews</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Video Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full relative hidden lg:block"
        >
           {/* Dotted pattern background */}
           <div className="absolute -top-10 -right-6 w-48 h-64 z-0">
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#93B4D8 2.5px, transparent 2.5px)', backgroundSize: '18px 18px' }} />
           </div>

           <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black aspect-[16/10] flex items-center justify-center z-10">
              <video 
                src="/video-poster.mp4" 
                className="absolute inset-0 w-full h-full object-cover bg-black"
                autoPlay
                loop
                muted
                playsInline
                poster="/video-poster.jpg"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* ULearnSystems logo watermark */}
              <div className="absolute top-4 right-5 pointer-events-none opacity-90">
                 <span className="font-bold text-[15px] tracking-wide text-white drop-shadow-md">
                   ulearnsystems
                 </span>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
