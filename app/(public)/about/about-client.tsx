"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/public/dynamic-icon";

export function AboutClient({ content: c }: { content: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const stats = c.stats as any[];

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-dots text-white opacity-20"></div>
        <div className="container-tight relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">{c.heroBadge}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl leading-tight"
          >
            {c.heroHeading} <span className="text-yellow-400">{c.heroHeadingHighlight}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-primary-foreground/90 max-w-3xl mb-12 leading-relaxed font-medium"
          >
            {c.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 mb-20">
        <div className="container-tight">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl shadow-ink-200/50 border border-ink-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-ink-100"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-lg md:text-2xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-white py-16">
        <div className="container-tight">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c.missionTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {c.missionBody1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {c.missionBody2}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {(c.missionPoints as any[]).map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <DynamicIcon name={pt.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{pt.title}</h4>
                      <p className="text-sm text-muted-foreground">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-ink-100">
                <Image src={c.storyImage} alt={c.storyImageAlt} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-ink-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex -space-x-3">
                    <img src="/images/people/p1.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt=""/>
                    <img src="/images/people/p2.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt=""/>
                    <img src="/images/people/p4.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt=""/>
                  </div>
                  <div className="font-bold text-sm text-foreground">{c.storyCardTitle}</div>
                </div>
                <p className="text-xs text-muted-foreground">{c.storyCardText}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEAD framework */}
      {Array.isArray(c.leadSteps) && c.leadSteps.length > 0 && (
        <section className="section bg-gradient-to-br from-brand-950 to-brand-800 text-white py-20">
          <div className="container-tight">
            <h2 className="h2 mb-12 text-center text-white">{c.leadTitle}</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {(c.leadSteps as any[]).map((step, i) => (
                <motion.div variants={itemVariants} key={i} className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-7">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400 text-brand-950 font-black text-2xl flex items-center justify-center mb-5">
                    {step.letter}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="section bg-ink-50 py-20">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="h2 mb-4 text-foreground">{c.valuesTitle}</h2>
            <p className="lead max-w-2xl mx-auto text-muted-foreground">
              {c.valuesSubtitle}
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {(c.values as any[]).map((value, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className="card p-8 bg-white hover:-translate-y-1 transition-transform duration-300 border border-border/50 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <DynamicIcon name={value.icon} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Individuals */}
      {c.individualsTitle && (
        <section className="py-16 bg-white">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-brand-100 bg-brand-50/50 p-8 md:p-12 text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">{c.individualsBadge}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{c.individualsTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{c.individualsBody}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Explore Courses Banner */}
      <section className="py-20 bg-white">
        <div className="container-tight">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-foreground text-background rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{c.ctaTitle}</h2>
              <p className="text-lg md:text-xl text-background/80 mb-10 leading-relaxed">
                {c.ctaSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={c.ctaPrimaryLink} className="btn bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-bold rounded-md transition-all">
                  {c.ctaPrimaryText}
                </Link>
                <Link href={c.ctaSecondaryLink} className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 text-lg font-bold rounded-md transition-all">
                  {c.ctaSecondaryText}
                </Link>
              </div>
            </div>
            <div className="relative z-10 hidden lg:block shrink-0">
              <div className="w-64 h-64 bg-gradient-to-tr from-primary to-accent rounded-full opacity-90 flex items-center justify-center shadow-2xl relative">
                 <div className="absolute inset-2 border-2 border-white/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                 <ShieldCheck className="w-24 h-24 text-white drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
