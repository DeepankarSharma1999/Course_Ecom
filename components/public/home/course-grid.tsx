"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, ChevronRight } from "lucide-react";
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

  const screenshotTabs = ["All Courses", "AGILE", "SAFe", "PROJECT", "BUSINESS", "Generative AI", "QUALITY", "SERVICE", "DEVOPS"];
  
  const filteredCourses = activeTab === "All Courses" 
    ? courses 
    : courses.filter(c => c.category.name.toUpperCase().includes(activeTab) || activeTab.includes(c.category.name.toUpperCase()) || (activeTab === "SAFe" && c.category.name.includes("SAFe")));

  return (
    <section className="section bg-[#f8f9fa] font-sans pt-10 pb-20">
      <div className="container-tight">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <div className="text-[11px] font-bold text-[#1c4b79] uppercase tracking-wider mb-2">
            CHOOSE THE BETTER COURSE FOR YOUR CAREER
          </div>
          <h2 className="text-3xl font-black text-foreground">
            Professional Certification & Training Courses
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-6xl mx-auto"
        >
          <div className="flex items-center overflow-x-auto hide-scrollbar border border-emerald-200 rounded-lg bg-white shadow-sm px-2">
            {screenshotTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-emerald-600 border-emerald-600"
                    : "text-gray-500 border-transparent hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {filteredCourses.slice(0, 6).map((c) => (
            <motion.div key={c.slug} variants={itemVariants} className="h-full">
              <GridCourseCard course={c} currency={currency} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GridCourseCard({ course, currency }: { course: CourseContent; currency: CurrencyCode }) {
  const basePrice = course.basePriceInr;
  const originalPrice = basePrice * 2; 
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full relative group">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 p-2">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {course.heroImage ? (
            <Image
              src={course.heroImage}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-[#002f5b] flex items-center justify-center p-4 text-center">
              <span className="text-white font-bold text-lg drop-shadow-md line-clamp-3">{course.title}</span>
            </div>
          )}
        </div>
        {/* Popular Badge */}
        <div className="absolute top-4 right-4 bg-[#1c4b79] text-white text-[11px] font-bold px-3 py-1 shadow-sm rounded-sm">
          Popular
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        {/* Top Meta */}
        <div className="flex items-center justify-between mb-3 text-[11px] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-sm">
              Starts 8 Jun 2026
            </span>
            <span className="text-[#1c4b79] flex items-center gap-1">
              • Live Classroom
            </span>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            5.0
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[#082032] text-[16px] leading-snug mb-3 line-clamp-2">
          {course.title}
        </h3>
        
        {/* Skills */}
        <div className="text-[13px] text-gray-600 mb-4 line-clamp-2 leading-relaxed h-10">
          <strong className="text-[#082032] font-bold">Skill you'll gain :</strong> {course.summary}
        </div>
        
        {/* Details */}
        <div className="flex flex-col gap-1.5 text-[12px] text-gray-500 mb-5 font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" /> 
            {course.durationLabel.replace('(', '|').replace(' Hours)', '')}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-600" /> 
            3K+ Enrolled
          </span>
        </div>
        
        {/* Footer: Price & Button */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-400 mb-0.5 font-medium">Start from</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-emerald-700 text-[15px]">
                {formatInCurrency(basePrice, currency).replace('.00', '')}
              </span>
              <span className="text-gray-400 line-through text-[11px] font-medium">
                {formatInCurrency(originalPrice, currency).replace('.00', '')}
              </span>
              <span className="text-emerald-600 text-[10px] font-bold">
                (50% OFF)
              </span>
            </div>
          </div>
          <Link href={`/${course.slug}`} className="bg-[#002f5b] hover:bg-[#001f3d] text-white px-4 py-2 rounded font-semibold text-[13px] flex items-center gap-1 transition-colors">
            Enroll <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
