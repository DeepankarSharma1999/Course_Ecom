"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, CheckCircle2, Star, Users, MonitorPlay, Gift, BookOpen } from "lucide-react";
import Link from "next/link";
import { type InfoPageContent } from "@/lib/info-content";

export default function AnimatedContent({ content, slug }: { content: InfoPageContent, slug: string }) {
  
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

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section - Matching /free-course */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/frontend_assets/image/homban-dots.webp')] opacity-20 bg-repeat"></div>
        <div className="container-tight relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">Enterprise-Grade Solutions</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight"
          >
            {content.title.split('|')[0].trim()}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mb-10 leading-relaxed font-medium"
          >
            {content.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#content" className="btn bg-white text-primary hover:bg-white/90 shadow-lg px-8 py-4 text-lg font-bold inline-flex items-center gap-2 rounded-md">
              Learn More
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections - Matching /free-course Benefits style */}
      <section id="content" className="section bg-ink-50 py-20">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4 text-foreground">Detailed Information</h2>
            <p className="lead max-w-2xl mx-auto text-muted-foreground">
              Everything you need to know about {content.title.split('|')[0].trim().toLowerCase()}.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {content.sections.map((section, index) => (
              <motion.div 
                variants={itemVariants} 
                key={index} 
                className="card p-8 bg-white hover:-translate-y-1 transition-transform duration-300 border border-border/50 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-foreground">{section.heading}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore Courses Banner - Matching /free-course Refer & Earn Banner */}
      <section className="py-16 bg-white">
        <div className="container-tight">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-foreground text-background rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to accelerate your career?</h2>
              <p className="text-lg text-background/80 mb-8 leading-relaxed">
                Join thousands of professionals globally who have trusted ULearnSystems for their Agile, Scrum, and PMP certification needs. Explore our comprehensive course catalog today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses" className="btn bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 text-lg font-bold rounded-md">
                  Explore Courses
                </Link>
                <Link href="/corporate-training" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 text-lg font-bold rounded-md transition-colors">
                  Enterprise Solutions
                </Link>
              </div>
            </div>
            <div className="relative z-10 hidden md:flex shrink-0">
              <div className="w-40 h-40 bg-gradient-to-tr from-primary to-accent rounded-full opacity-80 flex items-center justify-center shadow-lg">
                 <BookOpen className="w-20 h-20 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
