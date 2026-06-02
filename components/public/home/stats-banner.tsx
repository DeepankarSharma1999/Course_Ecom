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
          className="card p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-6 py-1.5 border border-border/50 rounded-full shadow-sm">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-widest">Grow Your Career Faster with Our Skilled Services</h3>
          </div>
          
          <div className="flex items-center gap-5 flex-1 justify-center md:justify-start mt-6 md:mt-0">
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
