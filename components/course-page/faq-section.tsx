"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type FaqItem } from "@/lib/seed-data";

export function FaqSection({ faqs, shortTitle }: { faqs: FaqItem[], shortTitle: string }) {
  const tabs = ["Course", "Workshop", "Standard & Pro", "Career Benefits", "Finance"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // For demonstration, we'll split the existing FAQs across tabs
  const getFaqsForTab = (tab: string) => {
    // If not enough FAQs, just cycle them for the demo so tabs aren't empty
    if (!faqs || faqs.length === 0) return [];
    if (tab === "Course") return faqs.slice(0, 5);
    if (tab === "Workshop") return faqs.slice(5, 10).length ? faqs.slice(5, 10) : faqs.slice(0, 3);
    if (tab === "Standard & Pro") return faqs.slice(10, 15).length ? faqs.slice(10, 15) : faqs.slice(0, 2);
    if (tab === "Career Benefits") return faqs.slice(15, 20).length ? faqs.slice(15, 20) : faqs.slice(0, 4);
    return faqs.slice(20).length ? faqs.slice(20) : faqs.slice(0, 3);
  };

  const currentFaqs = getFaqsForTab(activeTab);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 pt-12 border-t border-gray-100 pb-10">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
        {shortTitle.toUpperCase()} CERTIFICATION COURSE FAQS
      </div>
      <h2 className="text-[32px] font-bold text-[#082032] mb-8">Frequently Asked Questions</h2>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar mb-8 bg-white border border-gray-200 rounded-full p-1.5 w-max max-w-full shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(0);
            }}
            className={`px-6 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? "bg-[#e0f2f1] text-[#1FA8A8]" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <h3 className="font-bold text-[#082032] text-[20px] mb-6">{activeTab} Experience</h3>

      <div className="space-y-3">
        {currentFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          
          return (
            <div 
              key={i} 
              className={`rounded-xl border overflow-hidden transition-colors ${isOpen ? 'border-[#1FA8A8] bg-[#fcfdfd]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <button 
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className={`font-bold text-[15px] ${isOpen ? 'text-[#082032]' : 'text-[#475569]'}`}>
                  {i + 1}. {faq.q}
                </span>
                <div className={`transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'text-[#1FA8A8]' : 'text-gray-400'}`}>
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-5 pb-5 text-[14px] text-gray-600 leading-relaxed pt-2 border-t border-gray-100 mx-5" dangerouslySetInnerHTML={{ __html: faq.a }} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* View More Dropdown Indicator */}
      <div className="mt-8 text-center">
        <button className="text-[14px] font-bold text-[#082032] hover:text-[#1FA8A8] transition-colors border border-gray-300 px-6 py-2 rounded-full inline-flex items-center gap-2">
          View More <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
