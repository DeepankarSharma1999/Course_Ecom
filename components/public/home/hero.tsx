"use client";

import Link from "next/link";
import { ArrowRight, Play, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

export function HomeHero() {
  return (
    <section className="bg-secondary relative pt-24 pb-40 overflow-hidden font-sans">
      <div className="container-tight relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left max-w-2xl lg:pr-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-700 font-bold text-[13px] mb-8 border border-emerald-200">
            <Shield className="w-4 h-4" />
            100% Money Back Guarantee
          </div>
          
          <h1 className="text-4xl lg:text-[44px] leading-[1.2] font-extrabold text-foreground mb-6 tracking-tight">
            Enhance skills with our specialists - anytime, anywhere
          </h1>
          <p className="text-foreground/70 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            Prepare to take the next step in your career with the leading training provider globally. Begin your immersive learning journey with us.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <Link href="/courses" className="bg-primary hover:opacity-90 text-primary-foreground px-6 py-3.5 rounded font-semibold text-[15px] inline-flex items-center gap-2 transition-opacity">
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  "https://i.pravatar.cc/100?img=68",
                  "https://i.pravatar.cc/100?img=47",
                  "https://i.pravatar.cc/100?img=12",
                ].map((src, i) => (
                  <img key={i} src={src} alt="Learner" className="w-9 h-9 rounded-full border-2 border-background object-cover bg-white shadow-sm" />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[9px] font-bold text-primary shadow-sm z-10">
                  1M+
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-foreground text-[13px] leading-tight">1100K+</span>
                <span className="text-muted-foreground text-[12px]">Enrolled Learners</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Video Graphic Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full relative hidden lg:block"
        >
           <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white aspect-[16/10] flex items-center justify-center group z-10">
              <video 
                src="/video-poster.mp4" 
                className="absolute inset-0 w-full h-full object-cover bg-gray-100 group-hover:scale-[1.02] transition-transform duration-700"
                autoPlay
                loop
                muted
                playsInline
                poster="/video-poster.jpg"
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/10 pointer-events-none transition-opacity group-hover:bg-black/5" />
              
              {/* Simpliaxis logo watermark placeholder */}
              <div className="absolute top-4 right-4 pointer-events-none opacity-50">
                 <span className="font-extrabold text-lg tracking-tighter text-foreground drop-shadow-md">
                   <span className="text-primary">U</span>LearnSystems
                 </span>
              </div>
           </div>
           
           {/* Floating Rating Card */}
           <div className="absolute -bottom-6 left-10 bg-white rounded-xl shadow-lg border border-border/50 p-4 flex items-center gap-4 z-20 hover:-translate-y-1 transition-transform">
             <div className="w-12 h-12 bg-[#082032] rounded-lg flex items-center justify-center shrink-0">
               <Star className="w-6 h-6 text-[#FBBF24] fill-current" />
             </div>
             <div>
               <div className="font-black text-xl text-foreground leading-none mb-1">4.9/5</div>
               <div className="text-[12px] text-muted-foreground font-medium">Average Trainer Rating</div>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
