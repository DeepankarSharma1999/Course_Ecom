"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaStrip() {
  return (
    <section className="bg-background pb-20 font-sans">
      <div className="container-tight max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-foreground rounded-3xl p-10 md:p-14 shadow-[0_20px_50px_rgba(8,32,50,0.3)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden border border-primary/20"
        >
          {/* Background pattern placeholder */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle at 100% 100%, white 40px, transparent 40px), radial-gradient(circle at 80% 0%, white 20px, transparent 20px)",
            backgroundSize: "200px 200px"
          }} />
          
          <h2 className="text-2xl md:text-3xl font-black text-background max-w-lg relative z-10 text-center md:text-left leading-tight tracking-tight">
            Have more questions or require individualized guidance?
          </h2>
          
          <Link href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2 group relative z-10 whitespace-nowrap">
            Request for Query <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
