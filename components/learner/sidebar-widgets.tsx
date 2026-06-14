"use client";

import { Package, FileText, Star } from "lucide-react";
import Link from "next/link";

export function PopularCoursesWidget({ courses }: { courses: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-5 h-5 text-amber-600" />
        <h3 className="text-[15px] font-bold text-ink-900">Popular Courses</h3>
      </div>

      <div className="space-y-3">
        {courses.slice(0, 3).map((course, i) => (
          <div key={i} className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <h4 className="font-bold text-[13px] text-ink-900 leading-snug mb-1.5">{course.title}</h4>
            <div className="flex items-center gap-2 text-[11px] text-ink-500 mb-3">
              <Star className="w-3 h-3 text-[#eab308] fill-current" />
              <span>Beginner</span>
              <span>•</span>
              <span className="truncate">{course.categorySlug?.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(j => (
                  <img key={j} src={`https://i.pravatar.cc/100?img=${i * 4 + j}`} className="w-6 h-6 rounded-full border-2 border-white" alt="Student" />
                ))}
              </div>
              <Link href={`/${course.slug}`} className="bg-ink-900 text-white text-[11px] font-bold px-3 py-1 rounded-full hover:bg-ink-800 transition-colors">
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LatestBlogsWidget() {
  const blogs = [
    { title: "Project Audit in Project Management: Process, Types & Benefits Guide", desc: "Learn what is a project audit in project management, along w...", icon: "📝" },
    { title: "Master Docker Networking: Types, Drivers, Commands & Security", desc: "Learn Docker Networking, network types, drivers, bridge and ...", icon: "📝" },
    { title: "What is a Network Diagram in Project Management: Types and Examples", desc: "Understand What is a Network Diagram in project management w...", icon: "📝" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-ink-600" />
        <h3 className="text-[15px] font-bold text-ink-900">Latest Blogs</h3>
      </div>

      <div className="space-y-5">
        {blogs.map((blog, i) => (
          <div key={i} className="flex gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-yellow-100 flex items-center justify-center shrink-0 text-lg">
              {blog.icon}
            </div>
            <div>
              <h4 className="font-bold text-[12px] text-[#a855f7] leading-snug mb-1 group-hover:text-[#9333ea] transition-colors">{blog.title}</h4>
              <p className="text-[11px] text-ink-500 leading-relaxed">
                {blog.desc} <span className="text-ink-900 font-bold">Read More</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
