"use client";

import { Clock, Diamond, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "1,500+", label: "Industry Experts", icon: Diamond, accent: true },
  { value: "130+", label: "Comprehensive Courses", icon: Clock },
  { value: "300+", label: "Agile Transformations", icon: Users, accent: true },
  { value: "120+", label: "Countries & Counting", icon: Globe },
];

export function StatsBanner() {
  return (
    <section className="bg-[#F4F8FA] py-12 font-sans md:py-16">
      <div className="container-tight max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-[#082032]/10 bg-white p-6 shadow-[0_8px_24px_rgba(8,32,50,0.05)] md:p-8"
        >
          <div className="mb-6 text-center">
            <div className="section-eyebrow mb-3">Skilled Services</div>
            <h2 className="text-xl font-black text-[#082032] md:text-2xl">Grow your career faster with credible training support</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 rounded-2xl bg-[#F4F8FA] p-4">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${item.accent ? "bg-[#FFE8E8] text-[#E23B3B]" : "bg-secondary text-primary"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#082032]">{item.value}</div>
                    <div className="text-sm font-semibold text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
