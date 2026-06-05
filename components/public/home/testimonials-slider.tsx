"use client";

import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

export function TestimonialsSlider() {
  const testimonials = [
    {
      name: "Daniel Harper",
      role: "Product Manager,",
      text: "Outstanding training from Ulearnsystems! The curriculum on multi-agent architectures and RAG pipeline development using Claude was thorough...",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Sarah Mitchell",
      role: "Cloud AI Architect,",
      text: "I enrolled in this course to upskill as a software architect, and Ulearnsystems exceeded my expectations. The MCP server integration...",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Priya Venkataraman",
      role: "AI Solutions Architect,",
      text: "The hands-on labs in Ulearnsystems's Agentic AI Engineering course were brilliant. From context engineering to building RAG applications with...",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  ];

  return (
    <section className="bg-[#f8f9fa] py-16 font-sans">
      <div className="container-tight max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-[11px] font-bold text-[#1c4b79] uppercase tracking-wider mb-2">
            OUR SUPPORT SYSTEM FOR ONLINE TRAINING
          </div>
          <h2 className="text-3xl font-black text-[#082032] mb-6">
            Our Learners Love Us
          </h2>
          <div className="inline-flex items-center border border-gray-200 rounded-lg p-1 bg-white shadow-sm">
            <button className="bg-[#2f3941] text-white px-8 py-2 rounded-md font-semibold text-sm transition-colors">
              LinkedIn
            </button>
            <button className="text-gray-500 hover:text-gray-800 px-8 py-2 rounded-md font-semibold text-sm transition-colors">
              Trustpilot
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="text-5xl font-serif text-[#1FA8A8] leading-[0.5] mb-4 mt-2">"</div>
              <p className="text-gray-600 text-[13px] leading-relaxed mb-1 line-clamp-3">
                {t.text}
              </p>
              <a href="#" className="text-[#082032] text-[11px] font-bold underline mb-6 hover:text-[#1FA8A8] transition-colors">
                Read More
              </a>
              <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                  <div>
                    <div className="text-[13px] font-bold text-[#082032] leading-tight mb-0.5">{t.name}</div>
                    <div className="text-[11px] text-gray-500 leading-tight">{t.role}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[10px] text-gray-400 mr-1.5 underline">Read on</span>
                  <div className="text-[#0a66c2]">
                    <Linkedin className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-full border border-[#082032] flex items-center justify-center text-[#082032] hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
