"use client";

import { Diamond, Clock, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function StatsBanner() {
  return (
    <section className="bg-background pb-20 pt-10 font-sans relative z-20">
      <div className="container-tight max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative mt-6 md:mt-0"
        >
          <div className="md:absolute md:-top-4 md:left-1/2 md:-translate-x-1/2 bg-secondary/30 md:bg-background px-6 py-4 md:py-1.5 rounded-2xl md:rounded-full md:border md:border-border/50 md:shadow-sm w-full md:w-auto text-center mb-4 md:mb-0">
            <h3 className="font-bold text-foreground text-xs md:text-sm uppercase tracking-widest leading-relaxed">Grow Your Career Faster with Our Skilled Services</h3>
          </div>
          
          <div className="flex items-center gap-5 flex-1 justify-center md:justify-start w-full md:w-auto">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-inner">
              <Diamond className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-foreground text-2xl">1,500+</div>
              <div className="text-sm text-muted-foreground font-semibold">Industry Experts</div>
            </div>
          </div>

          <div className="w-px h-16 bg-border hidden md:block" />

          <div className="flex items-center gap-5 flex-1 justify-center mt-6 md:mt-0">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-foreground text-2xl">130+</div>
              <div className="text-sm text-muted-foreground font-semibold">Comprehensive Courses</div>
            </div>
          </div>

          <div className="w-px h-16 bg-border hidden md:block" />

          <div className="flex items-center gap-5 flex-1 justify-center mt-6 md:mt-0">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-foreground text-2xl">300+</div>
              <div className="text-sm text-muted-foreground font-semibold">Agile Transformations</div>
            </div>
          </div>

          <div className="w-px h-16 bg-border hidden md:block" />

          <div className="flex items-center gap-5 flex-1 justify-center md:justify-end mt-6 md:mt-0">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-inner">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-foreground text-2xl">120+</div>
              <div className="text-sm text-muted-foreground font-semibold">Countries & Counting</div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
