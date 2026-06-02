"use client";

import { useState } from "react";
import { Share2, TrendingUp, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["Other Combo", "PMI Combo", "Scaled Agile Combo", "Scrum Alliance Combo"];

const COMBO_DATA = [
  {
    id: 1,
    title: "Applied Agentic & Agentic AI Engineering",
    enrolled: "4k",
    type: "Live Classroom",
    price: "72,999",
    originalPrice: "87,598",
    discount: "14,599 off",
    logos: ["a", "a"],
    trending: true,
  },
  {
    id: 2,
    title: "Leading SAFe Certification Training & PMP Certification Training and Exam bundle",
    enrolled: "9k",
    type: "Live Classroom",
    price: "70,999",
    originalPrice: "84,399",
    discount: "13,400 off",
    logos: ["SAFe", "a"],
    trending: true,
  },
  {
    id: 3,
    title: "SSM Certification Training & PMP Certification Training and Exam bundle",
    enrolled: "8k",
    type: "Live Classroom",
    price: "70,999",
    originalPrice: "84,399",
    discount: "13,400 off",
    logos: ["SSM", "a"],
    trending: true,
  },
  {
    id: 4,
    title: "SAFe POPM Certification Training & PMP Certification Training and Exam bundle",
    enrolled: "8k",
    type: "Live Classroom",
    price: "70,999",
    originalPrice: "84,399",
    discount: "13,400 off",
    logos: ["POPM", "a"],
    trending: true,
  },
];

export function ComboSchedule() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="py-16 font-sans bg-[#F3F4F6]">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#3A3A3A] mb-8">
          Unbeatable Saving Combo Schedule
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center border-b border-gray-200 mb-10 gap-4 md:gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm md:text-base font-semibold transition-colors relative ${
                activeTab === tab ? "text-[#1BA8A8]" : "text-[#3A3A3A] hover:text-[#1BA8A8]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeComboTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1BA8A8]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {COMBO_DATA.map((combo) => (
              <motion.div
                key={combo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 relative flex flex-col"
              >
                {/* Trending Ribbon */}
                {combo.trending && (
                  <div className="absolute top-0 left-0 overflow-hidden w-24 h-24 rounded-tl-xl z-10">
                    <div className="absolute top-4 -left-8 w-32 bg-[#1BA8A8] text-white text-[10px] font-bold py-1 text-center -rotate-45 transform origin-center shadow-sm uppercase tracking-wider">
                      Trending
                    </div>
                  </div>
                )}

                {/* Share Icon */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Logos */}
                <div className="flex items-center justify-center gap-4 mt-6 mb-5">
                  <div className="w-14 h-14 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center bg-white">
                    <span className="text-[#3A3A3A] font-black text-xl">{combo.logos[0]}</span>
                  </div>
                  <span className="text-gray-400 font-medium text-lg">+</span>
                  <div className="w-14 h-14 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center bg-white">
                    <span className="text-[#3A3A3A] font-black text-xl">{combo.logos[1]}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[#3A3A3A] font-bold text-[15px] leading-tight text-center mb-4 min-h-[40px]">
                  {combo.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                  <div className="flex items-center text-[#1BA8A8]">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    <span>{combo.enrolled} enrolled</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{combo.type}</span>
                </div>

                <div className="mt-auto">
                  {/* Pricing */}
                  <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                    <span className="font-bold text-[#3A3A3A]">INR {combo.price}</span>
                    <span className="text-xs text-gray-400 line-through">INR {combo.originalPrice}</span>
                    <span className="text-[11px] font-bold text-[#168C8C] flex items-center bg-[#DFF1EF] px-1.5 py-0.5 rounded">
                      <Percent className="w-3 h-3 mr-0.5" />
                      {combo.discount}
                    </span>
                  </div>

                  {/* Button */}
                  <button className="w-full bg-[#1BA8A8] hover:bg-[#168C8C] text-white font-bold py-2.5 rounded text-sm transition-colors shadow-sm">
                    ENROLL NOW
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
