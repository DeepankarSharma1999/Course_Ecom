"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, Globe, Users, Trophy, Target } from "lucide-react";
import Link from "next/link";

export function AboutClient() {
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

  const stats = [
    { label: "Global Learners", value: "100k+" },
    { label: "Corporate Partners", value: "500+" },
    { label: "Expert Instructors", value: "250+" },
    { label: "Countries Served", value: "45+" },
  ];

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
            <span className="text-sm font-semibold">Transforming Enterprise Learning</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl leading-tight"
          >
            Empowering the Future of <span className="text-yellow-400">Agile & Tech</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-primary-foreground/90 max-w-3xl mb-12 leading-relaxed font-medium"
          >
            ULearnSystems is a globally recognized leader in professional certification and corporate training, dedicated to bridging the global skills gap.
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
                <div className="text-3xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded with the vision to democratize elite enterprise training, ULearnSystems has grown into a premier destination for professionals seeking to upskill in Agile, Scrum, Project Management, and Cloud computing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe that continuous learning is the cornerstone of organizational agility and individual career growth. Our curriculum is constantly evolving, built by industry practitioners for the real-world challenges of tomorrow.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Outcome Driven</h4>
                    <p className="text-sm text-muted-foreground">Focus on practical skills and exam success.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Global Accreditations</h4>
                    <p className="text-sm text-muted-foreground">Partners with Scrum Alliance, PMI, and SAFe.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-ink-100">
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80" alt="ULearnSystems team collaborating" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-ink-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex -space-x-3">
                    <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar 1"/>
                    <img src="https://i.pravatar.cc/100?img=2" className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar 2"/>
                    <img src="https://i.pravatar.cc/100?img=3" className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar 3"/>
                  </div>
                  <div className="font-bold text-sm text-foreground">Trusted by Teams</div>
                </div>
                <p className="text-xs text-muted-foreground">Empowering Fortune 500 companies globally.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-ink-50 py-20">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="h2 mb-4 text-foreground">Why Choose ULearnSystems?</h2>
            <p className="lead max-w-2xl mx-auto text-muted-foreground">
              We stand apart through our commitment to instructional excellence, enterprise-grade curriculum, and unparalleled post-training support.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Users className="w-6 h-6 text-primary" />,
                title: "Elite Instructors",
                body: "Our trainers are not just certified; they are active industry practitioners with decades of hands-on experience in leading enterprise agile transformations."
              },
              {
                icon: <Globe className="w-6 h-6 text-primary" />,
                title: "Flexible Delivery",
                body: "Whether you prefer Live Virtual Classrooms, in-person Bootcamps, or Self-Paced learning, we offer modalities that fit your schedule and learning style."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
                title: "Continuous Mentorship",
                body: "We provide extensive exam prep materials, post-training mentorship, and access to an exclusive alumni network to ensure your long-term success."
              }
            ].map((value, index) => (
              <motion.div 
                variants={itemVariants} 
                key={index} 
                className="card p-8 bg-white hover:-translate-y-1 transition-transform duration-300 border border-border/50 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {value.icon}
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Ready to start your learning journey?</h2>
              <p className="text-lg md:text-xl text-background/80 mb-10 leading-relaxed">
                Join our community of over 100,000 professionals and take the next big step in your career.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses" className="btn bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-bold rounded-md transition-all">
                  Explore Courses
                </Link>
                <Link href="/corporate-training" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 text-lg font-bold rounded-md transition-all">
                  Enterprise Solutions
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
