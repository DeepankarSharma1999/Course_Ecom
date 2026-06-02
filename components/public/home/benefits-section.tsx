"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
];

export function BenefitsSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background py-20 font-sans">
      <ParallaxHeroImages images={images} variant="edge-focus" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container-tight max-w-5xl relative z-10 backdrop-blur-xl bg-card/85 p-8 md:p-14 rounded-3xl border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
      >
        <div className="text-center mb-14">
          <div className="text-[11px] font-extrabold text-primary uppercase tracking-widest mb-3">
            BENEFITS FOCUSED ON INDIVIDUALS AND CORPORATE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground drop-shadow-sm tracking-tight">
            Individual & Corporate Benefits
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Individual Benefits */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-foreground text-center mb-2">Individual Benefits</h3>
              <p className="text-primary text-sm text-center mb-8 font-medium">Gain valuable Expert-Led Live Sessions</p>
              
              <div className="font-bold text-foreground text-[15px] mb-6 border-b border-border/50 pb-3">Solid Experiential Learning</div>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Expert-led professional training.",
                  "Globally recognized certifications.",
                  "Practical learning experience.",
                  "Flexible course schedules.",
                  "Lifetime access to resources.",
                  "Exam support after training."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/contact" className="block w-full text-center bg-foreground hover:bg-primary text-background hover:text-primary-foreground py-3.5 rounded-full font-bold text-[15px] transition-all shadow-md active:scale-95">
                Contact Course Advisor
              </Link>
            </div>
          </motion.div>

          {/* Corporate Benefits */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-foreground text-center mb-2">Corporate Benefits</h3>
              <p className="text-primary text-sm text-center mb-8 font-medium">Personalized Corporate Training</p>
              
              <div className="font-bold text-foreground text-[15px] mb-6 border-b border-border/50 pb-3">Customized Corporate Training</div>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Customized training solutions.",
                  "Boost team productivity.",
                  "Industry-specific course content.",
                  "Scalable enterprise learning.",
                  "Global training delivery.",
                  "Trackable ROI on training."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 opacity-80" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/corporate" className="block w-full text-center bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background py-3.5 rounded-full font-bold text-[15px] transition-all shadow-sm active:scale-95">
                Skill Up Your Teams
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
