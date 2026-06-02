"use client";

import Link from "next/link";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const TRAINERS = [
  {
    name: "Aakash Srinivasan, CST",
    title: "Certified Scrum Master (CSM®)Cer...",
    bio: "Aakash Srinivasan is an experienced Agile transformation leader and a co-founder of ULearnSystems, an Agile training and coaching...",
    exp: "15+ Years",
    img: "https://i.pravatar.cc/100?img=11"
  },
  {
    name: "Michel Goldenberg, CST",
    title: "Certified Scrum Master (CSM®)Adv...",
    bio: "Michel Started working with Agile in 2001 when he first used eXtreme Programming as a team member in a very complex project in Brazil, since...",
    exp: "21+ Years",
    img: "https://i.pravatar.cc/100?img=53"
  },
  {
    name: "Raj Kasturi, CST",
    title: "CSM",
    bio: "Raj is an experienced Scrum Trainer, Scrum Master, Agile Coach helping organizations transition to Scrum...",
    exp: "28+ Years",
    img: "https://i.pravatar.cc/100?img=68"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function TrainersSection() {
  return (
    <section className="bg-background py-20 font-sans">
      <div className="container-tight">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-[11px] font-extrabold text-primary uppercase tracking-widest mb-3">
            OUR EXPERIENCED TRAINING EXPERTS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            Meet the Team That's Invested in Your Success
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {TRAINERS.map((t, i) => (
            <motion.div key={i} variants={itemVariants} className="card p-8 group flex flex-col transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full scale-[1.15] -z-10 group-hover:bg-primary/30 transition-colors" />
                  <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full border-2 border-background object-cover shadow-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground leading-snug group-hover:text-primary transition-colors">{t.name}</h4>
                  <div className="text-xs font-semibold text-muted-foreground truncate w-48">{t.title}</div>
                </div>
              </div>
              
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-4 flex-1">
                {t.bio}
              </p>
              <Link href="#" className="text-sm font-bold text-foreground hover:text-primary underline underline-offset-4 mb-8 transition-colors">Read More</Link>
              
              <div className="pt-5 border-t border-border flex items-center justify-between">
                <span className="text-[14px] text-foreground font-semibold">Experience: <span className="text-primary">{t.exp}</span></span>
                <Link href="#" className="w-8 h-8 bg-[#0A66C2]/10 hover:bg-[#0A66C2] rounded-full flex items-center justify-center text-[#0A66C2] hover:text-white transition-all">
                  <Linkedin className="w-4 h-4 fill-current" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all active:scale-95">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all active:scale-95">
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
