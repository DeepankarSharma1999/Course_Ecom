"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaStrip() {
  return (
    <section className="bg-white py-14 font-sans">
      <div className="container-tight max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-primary/20 bg-foreground p-8 shadow-[0_18px_55px_rgba(8,32,50,0.18)] md:flex-row md:items-center md:p-10"
        >
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "radial-gradient(circle at 100% 100%, white 40px, transparent 40px), radial-gradient(circle at 80% 0%, white 20px, transparent 20px)",
            backgroundSize: "200px 200px"
          }} />

          <div className="relative z-10">
            <h2 className="max-w-xl text-2xl font-black leading-tight text-white md:text-3xl">
              Ready to plan your next certification journey?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
              Talk to an advisor and choose the right training path for your role or team.
            </p>
          </div>

          <Link href="/enquire" className="btn-primary relative z-10 whitespace-nowrap">
            Request Guidance <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
