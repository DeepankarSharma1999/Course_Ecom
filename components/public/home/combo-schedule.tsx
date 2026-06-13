"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Percent, TrendingUp } from "lucide-react";

const TABS = ["Other Combo", "PMI Combo", "Scaled Agile Combo", "Scrum Alliance Combo"];

const COMBO_DATA = [
  {
    id: 1,
    title: "Applied Agentic & Agentic AI Engineering",
    enrolled: "4k",
    type: "Live Classroom",
    price: "72,999",
    originalPrice: "87,598",
    discount: "Save INR 14,599",
    logos: ["AI", "GenAI"],
    recommended: true,
  },
  {
    id: 2,
    title: "Leading SAFe Certification Training & PMP Certification Training",
    enrolled: "9k",
    type: "Live Classroom",
    price: "70,999",
    originalPrice: "84,399",
    discount: "Save INR 13,400",
    logos: ["SAFe", "PMP"],
    recommended: false,
  },
  {
    id: 3,
    title: "SSM Certification Training & PMP Certification Training",
    enrolled: "8k",
    type: "Live Classroom",
    price: "70,999",
    originalPrice: "84,399",
    discount: "Save INR 13,400",
    logos: ["SSM", "PMP"],
    recommended: false,
  },
];

export function ComboSchedule() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="section bg-white font-sans">
      <div className="container-tight">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-eyebrow mb-3">Bundled Learning Paths</div>
          <h2 className="h2">Save time with structured certification combos</h2>
          <p className="lead mt-4">
            Curated bundles for professionals who want a clear path across complementary skills and credentials.
          </p>
        </div>

        <div className="mb-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max gap-2 border-b border-[#082032]/10 pb-1 md:w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`min-h-[44px] whitespace-nowrap px-4 text-sm font-extrabold transition-colors ${
                  activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {COMBO_DATA.map((combo) => (
            <article
              key={combo.id}
              className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_8px_24px_rgba(8,32,50,0.05)] transition-all duration-200 hover:-translate-y-1 ${
                combo.recommended ? "border-primary/40 ring-4 ring-primary/10" : "border-[#082032]/10"
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {combo.logos.map((logo) => (
                    <div key={logo} className="grid h-12 w-12 place-items-center rounded-xl border border-[#082032]/10 bg-[#F4F8FA] text-sm font-black text-[#082032]">
                      {logo}
                    </div>
                  ))}
                </div>
                {combo.recommended && <span className="accent-badge">Recommended</span>}
              </div>

              <h3 className="mb-4 min-h-14 text-lg font-black leading-snug text-[#082032]">{combo.title}</h3>

              <div className="mb-5 flex flex-wrap gap-3 text-sm font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  {combo.enrolled} enrolled
                </span>
                <span>{combo.type}</span>
              </div>

              <ul className="mb-6 space-y-3 text-sm font-semibold text-muted-foreground">
                {["Live instructor-led", "Certification-focused learning plan", "Exam preparation support"].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-2xl bg-[#F4F8FA] p-4">
                <div className="text-xs font-black uppercase tracking-wide text-muted-foreground">Combo price</div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-2xl font-black text-[#082032]">INR {combo.price}</span>
                  <span className="pb-1 text-sm font-semibold text-muted-foreground line-through">INR {combo.originalPrice}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#FFE8E8] px-3 py-1 text-xs font-extrabold text-[#E23B3B]">
                  <Percent className="h-3 w-3" />
                  {combo.discount}
                </div>
                <button className="btn-primary mt-4 w-full">
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
