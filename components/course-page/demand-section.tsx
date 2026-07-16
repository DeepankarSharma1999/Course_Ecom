"use client";

import { useState } from "react";
import { Award, ChevronDown, ChevronUp, X, Image as ImageIcon } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";
import { DownloadModal } from "./download-modal";

import { DEFAULT_DEMAND_TIERS } from "@/lib/course-section-defaults";

// Map a course to a concise, industry-recognised job-role base.
// Title keywords win first; otherwise fall back to the course category.
const CATEGORY_ROLE: Record<string, string> = {
  agile: "Scrum Master",
  safe: "Agile Coach",
  project: "Project Manager",
  business: "Business Analyst",
  "data science": "Data Scientist",
  "generative ai": "AI Engineer",
  devops: "DevOps Engineer",
  "cloud computing": "Cloud Engineer",
  quality: "Quality Analyst",
  service: "IT Service Manager",
  technology: "Software Engineer",
  microcredentials: "Agile Practitioner",
  "on demand microcredentials": "Agile Practitioner",
};
function deriveRole(course: CourseContent): string {
  const raw = (course.shortTitle || course.title);
  if (/scrum master/i.test(raw)) return "Scrum Master";
  if (/product owner|product manager|popm/i.test(raw)) return "Product Owner";
  if (/release train|rte/i.test(raw)) return "Release Train Engineer";
  if (/devops/i.test(raw)) return "DevOps Engineer";
  if (/architect/i.test(raw)) return "Solutions Architect";
  if (/business analy|cbap|ccba/i.test(raw)) return "Business Analyst";
  if (/project manage|pmp|prince2|capm/i.test(raw)) return "Project Manager";
  if (/data scien/i.test(raw)) return "Data Scientist";
  if (/\bitil\b|service management/i.test(raw)) return "IT Service Manager";
  if (/six sigma|quality/i.test(raw)) return "Quality Analyst";
  if (/\bai\b|machine learning|generative/i.test(raw)) return "AI Engineer";
  if (/cloud|aws|azure/i.test(raw)) return "Cloud Engineer";
  // Category fallback — always an industry-recognised title.
  return CATEGORY_ROLE[(course.category?.name || "").toLowerCase()] ?? "Agile Practitioner";
}

export function DemandSection({ course }: { course: CourseContent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  // Per-course override from admin, else derived role + default tiers.
  const demand = course.pageSections?.demand;
  const role = demand?.role || deriveRole(course);
  const tiers = demand?.tiers?.length ? demand.tiers : DEFAULT_DEMAND_TIERS;
  const tabs = tiers.map((t) => `${t.prefix}${role}`);
  const currentData = tiers[activeRole] ?? tiers[0];

  return (
    <>
      <section className="scroll-mt-24 pt-12 border-t border-gray-100">
        <div className="bg-[#fcfdfd] rounded-2xl p-8 md:p-10 border border-[#e2ecec]">
          <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
            High Demand for {course.shortTitle} Professionals
          </div>
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-10 break-words leading-tight">Soaring Demand and Accelerated Growth</h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Tabs */}
            <div role="tablist" aria-label="Job roles" className="flex items-center gap-1 border border-gray-200 rounded-full p-1.5 mb-10 mx-auto max-w-fit overflow-x-auto hide-scrollbar">
              {tabs.map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={activeRole === idx}
                  onClick={() => setActiveRole(idx)}
                  className={`px-6 py-2 font-bold text-[14px] rounded-full cursor-pointer whitespace-nowrap transition-colors ${activeRole === idx ? "bg-[#f0f7f7] text-[#1FA8A8]" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Salary Chart Placeholder */}
              <div>
                <h4 className="text-[14px] font-bold text-[#082032] mb-6">Average Salary</h4>
                <div className="h-32 flex items-end gap-3 justify-center">
                  <div className="w-12 bg-orange-100 h-[40%] rounded-t-sm relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-bold">{currentData.salary.min}</span></div>
                  <div className="w-12 bg-orange-300 h-[80%] rounded-t-sm relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[12px] font-black text-[#082032]">{currentData.salary.avg}</span></div>
                  <div className="w-12 bg-orange-100 h-[60%] rounded-t-sm relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-bold">{currentData.salary.max}</span></div>
                </div>
                <div className="flex justify-center gap-5 mt-3 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>Min</span><span>Average</span><span>Max</span>
                </div>
              </div>

              {/* Hiring Companies */}
              <div className="md:border-l md:border-r border-gray-100 md:px-8">
                <h4 className="text-[14px] font-bold text-[#082032] mb-6">Hiring Companies</h4>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  {currentData.companies.map(c => (
                    <div key={c} className="text-[13px] font-bold text-gray-400 flex items-center justify-center h-8">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Demand Stats */}
              <div>
                <h4 className="text-[14px] font-bold text-[#082032] mb-6">Demand</h4>
                <div className="flex flex-col h-full pt-2">
                  <div className="w-10 h-10 bg-yellow-50 rounded flex items-center justify-center mb-4">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-3xl font-black text-[#082032] mb-1">{currentData.demand.percent}</div>
                  <div className="text-[13px] text-gray-500 leading-tight pr-4">{currentData.demand.text}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[14px] text-[#475569] leading-relaxed max-w-4xl mx-auto space-y-4">
            <p>
              Armed with this coveted <span className="text-blue-600">{course.shortTitle} certification</span>, not only will you be well positioned to command salaries <span className="text-blue-600">21% on average higher</span> than that earned by your non-certified peers, but also be ready to land in-demand roles like {role}, {`Senior ${role}`}, and {`Lead ${role}`}.
            </p>

            {isExpanded && (
              <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                <p>
                  On completing the program you sit a recognised assessment that validates your understanding and earns you the {course.shortTitle} credential. The certification is acknowledged across industries and signals to employers that you have the knowledge and practical skills to deliver in the role.
                </p>

                <h3 className="text-[18px] font-bold text-[#082032] pt-4">Roles that benefit from the {course.shortTitle} certification</h3>
                <p>
                  The skills you gain in this training apply across a range of positions. Three of the most relevant career paths are:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#082032]">1) {role}</h4>
                    <p className="mt-1">
                      As a {role}, you put the core practices of this discipline to work day to day — applying the right techniques, collaborating with stakeholders and delivering measurable outcomes. The {course.shortTitle} certification gives you a strong, recognised foundation for the role and helps you stand out to employers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#082032]">2) Senior {role}</h4>
                    <p className="mt-1">
                      With experience, a Senior {role} takes on larger, more complex initiatives and mentors others. This certification consolidates your credibility, demonstrates depth of capability and supports your progression into more senior, higher-impact work.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#082032]">3) Lead {role}</h4>
                    <p className="mt-1">
                      A Lead {role} sets direction and drives adoption of best practice across teams and the wider organisation. The skills validated by this credential underpin the strategic, leadership-level work expected at this level.
                    </p>
                  </div>
                </div>

                <h3 className="text-[18px] font-bold text-[#082032] pt-4">Benefits of the {course.shortTitle} certification</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#082032]">1) Globally recognised credential</h4>
                    <p className="mt-1">The certification is awarded against standards recognised across the industry, giving your skills credibility with employers anywhere in the world.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#082032]">2) Increased employability</h4>
                    <p className="mt-1">A respected credential is clear proof of your knowledge and helps you get noticed by recruiters looking to hire capable, certified professionals.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#082032]">3) Higher earning potential</h4>
                    <p className="mt-1">Certified professionals consistently earn more than their non-certified peers, and the credential opens the door to better-paid, in-demand roles.</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-[#082032] font-bold flex items-center gap-1 cursor-pointer transition-colors hover:text-[#1FA8A8]"
            >
              {isExpanded ? (
                <>Read Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-12 px-8 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] flex items-center justify-center gap-2 text-[14px] transition-colors"
            >
              Download Free Guide
            </button>
          </div>
        </div>
      </section>

      {/* Download Guide Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Discover More: Download The Free Guide!"
        subtitle="Fill out the form to get your free guide and take your first step towards a rewarding career."
        courseSlug={course.slug}
        source={`guide-${course.slug}`}
        ctaLabel="Send me the guide"
      />
    </>
  );
}
