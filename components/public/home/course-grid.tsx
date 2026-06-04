"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { CourseContent, CategoryContent } from "@/lib/seed-data";
import { formatInCurrency, type CurrencyCode } from "@/lib/currency";

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

export function CourseGrid({
  courses,
  categories,
  currency,
}: {
  courses: CourseContent[];
  categories: CategoryContent[];
  currency: CurrencyCode;
}) {
  const [activeTab, setActiveTab] = useState("All Courses");

  const tabs = ["All Courses", ...categories.map((c) => c.name)];
  
  const filteredCourses = activeTab === "All Courses" 
    ? courses 
    : courses.filter(c => c.category.name === activeTab);

  return (
    <section className="section bg-background font-sans">
      <div className="container-tight">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
            Accelerate Your Career
          </div>
          <h2 className="h2 mb-4">
            Professional Certification & Training Courses
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex overflow-x-auto md:flex-wrap items-center justify-start md:justify-center gap-2 mb-12 max-w-5xl mx-auto hide-scrollbar pb-2 px-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-[0_8px_20px_rgb(31,168,168,0.25)]"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {filteredCourses.slice(0, 6).map((c) => (
            <motion.div key={c.slug} variants={itemVariants}>
              <GridCourseCard course={c} currency={currency} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/courses"
            className="btn-outline group"
          >
            Explore All Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function GridCourseCard({ course, currency }: { course: CourseContent; currency: CurrencyCode }) {
  const basePrice = course.basePriceInr;
  const originalPrice = basePrice * 2; 
  
  return (
    <div className="card group flex flex-col h-full transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(31,168,168,0.15)] bg-white cursor-pointer relative z-10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-secondary">
        {course.heroImage ? (
          <Image
            src={course.heroImage}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center p-4 text-center">
            <span className="text-white font-bold text-lg drop-shadow-md line-clamp-3">{course.title}</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-foreground/90 backdrop-blur-sm text-background text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
          Popular
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 text-[13px] font-bold">
          <div className="flex items-center gap-2">
            <span className="bg-secondary text-primary px-2.5 py-1 rounded-md">
              Starts 8 Jun
            </span>
            <span className="text-foreground flex items-center gap-1.5 opacity-80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Classroom
            </span>
          </div>
          <div className="flex items-center gap-1 text-foreground">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {course.ratingAvg.toFixed(1)}
          </div>
        </div>

        <h3 className="font-bold text-foreground text-xl leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
          <strong className="text-foreground font-semibold">Skills you'll gain:</strong> {course.summary}
        </p>
        
        <div className="flex flex-col gap-2.5 text-[13px] text-muted-foreground mb-6 font-medium">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> 
            {course.durationLabel}
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> 
            3K+ Enrolled Worldwide
          </span>
        </div>
        
        <div className="mt-auto pt-5 border-t border-border flex items-center justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1 uppercase tracking-wider font-bold">Starting from</div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-foreground text-xl tracking-tight">
                {formatInCurrency(basePrice, currency)}
              </span>
              <span className="text-muted-foreground line-through text-xs font-medium">
                {formatInCurrency(originalPrice, currency)}
              </span>
            </div>
          </div>
          <Link href={`/${course.slug}`} className="bg-foreground hover:bg-primary text-background hover:text-primary-foreground px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95">
            Enroll <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
