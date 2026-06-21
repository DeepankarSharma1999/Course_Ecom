"use client";

import { useState } from "react";
import { Award, ChevronDown, ChevronUp, X, Image as ImageIcon } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";
import { DownloadModal } from "./download-modal";

const ROLE_DATA = {
  "Scrum Master": {
    salary: { min: "₹9L", avg: "₹15L", max: "₹20L" },
    companies: ["Coca-Cola", "Amazon", "Sapient", "HSBC", "Walmart", "Accenture"],
    demand: { percent: "87%", text: "Agile practitioners use Scrum" }
  },
  "Senior Scrum Master": {
    salary: { min: "₹14L", avg: "₹22L", max: "₹30L" },
    companies: ["Microsoft", "IBM", "Deloitte", "TCS", "Infosys", "Wipro"],
    demand: { percent: "92%", text: "Organizations adopting scaled Agile" }
  },
  "Chief Scrum Master": {
    salary: { min: "₹20L", avg: "₹35L", max: "₹50L" },
    companies: ["Google", "Meta", "Apple", "Netflix", "Uber", "Airbnb"],
    demand: { percent: "95%", text: "Enterprise Agile transformation" }
  }
};
type RoleType = keyof typeof ROLE_DATA;

export function DemandSection({ course }: { course: CourseContent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleType>("Scrum Master");

  const currentData = ROLE_DATA[activeRole];

  return (
    <>
      <section className="scroll-mt-24 pt-8 border-t border-gray-100">
        <div className="bg-[#fcfdfd] rounded-2xl p-8 md:p-10 border border-[#e2ecec]">
          <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
            High Demand for {course.shortTitle} Professionals
          </div>
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-10 break-words leading-tight">Soaring Demand and Accelerated Growth</h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Tabs */}
            <div className="flex items-center gap-1 border border-gray-200 rounded-full p-1.5 mb-10 mx-auto max-w-fit overflow-x-auto hide-scrollbar">
              {(Object.keys(ROLE_DATA) as RoleType[]).map((role) => (
                <div 
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-6 py-2 font-bold text-[14px] rounded-full cursor-pointer whitespace-nowrap transition-colors ${activeRole === role ? "bg-[#f0f7f7] text-[#1FA8A8]" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {role}
                </div>
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
              Armed with this coveted <span className="text-blue-600">Scrum certification</span>, not only will you be well positioned to command salaries <span className="text-blue-600">21% on average higher</span> than that earned by your non-certified peers, but also be ready to land in-demand Scrum roles like Scrum Master, Delivery Lead, Agile Scrum Master, <span className="text-blue-600">Agile Coach</span>, Program Manager, and Project Manager.
            </p>

            {isExpanded && (
              <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                <p>
                  At the end of the course, participants will take an online exam to demonstrate their understanding of Scrum and earn their Certified ScrumMaster Certification. This certification is recognized globally and demonstrates that the individual has the knowledge and skills to effectively facilitate Scrum in a team or organization.
                </p>

                <h3 className="text-[18px] font-bold text-[#082032] pt-4">Roles that Benefit from a CSM Certification</h3>
                <p>
                  Scrum Master is a key role in any <span className="text-blue-600">Scrum team</span>. CSM is one of the most popular certifications for a Scrum Master. A Scrum Master is responsible for ensuring all the Scrum values, Agile principles, processes, and ceremonies are performed within a team. The CSM course is beginner-friendly and hence it makes a great choice for professionals who are starting their careers or switching their profiles.
                </p>
                <p>
                  The skills professionals acquire through CSM certification can be applied across many job roles. Some of the most relevant roles are as follows:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#082032]">1) Scrum Master</h4>
                    <p className="mt-1">
                      A Scrum Master is responsible for ensuring that the Scrum methodology is followed across the team. Scrum ceremonies like a daily sprint, Definition of Done, Definition of Ready, Agile estimation techniques, Agile project management, <span className="text-blue-600">Agile framework</span>, retrospectives, etc. These are key components of Scrum. They play a key role in how Scrum teams perform in an organization.
                    </p>
                    <p className="mt-2">
                      A CSM certification from Scrum Alliance familiarizes learners with the Scrum framework and the responsibilities of a Scrum Master. The average annual salary for a Scrum Master ranges from $98K to $121K, according to Salary.com, with variations depending on factors like industry, experience, organization, and specific responsibilities.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#082032]">2) Senior Scrum Master</h4>
                    <p className="mt-1">
                      If you are a professional who has experience as a Scrum Master, getting a CSM certification will consolidate your credibility and help you progress in your career. A senior Scrum Master can handle more complex Agile initiatives than what is in the scope of a traditional Scrum Master role. It also sets you up for higher certifications like A-CSM.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#082032]">3) Chief Scrum Master</h4>
                    <p className="mt-1">
                      A Chief Scrum Master is a leader who oversees Scrum implementation across the organization. They mostly work in organizations that have scaled Scrum across teams. CSM training provides the basic knowledge and skills required for Scrum Masters at any level of the organization.
                    </p>
                  </div>
                </div>

                <h3 className="text-[18px] font-bold text-[#082032] pt-4">Benefits of CSM Certification</h3>
                <p>
                  A CSM certification is one of the most in-demand certifications in Agile. It is a great certification for familiarizing yourself with Scrum. The Scrum Master plays a vital role in any Scrum team, hence the CSM certification takes center stage among all the other Agile certifications.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#082032]">1) Globally Recognized Credential</h4>
                    <p className="mt-1">Certified ScrumMaster is one of the most popular certifications in Scrum. The CSM certification is a great start to your Scrum career. CSM certifications are issued by the Scrum Alliance, a renowned accreditation body for globally recognized Scrum certifications.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#082032]">2) Increased Employability</h4>
                    <p className="mt-1">A CSM certification is proof of your knowledge and skills as a ScrumMaster. Having a CSM certification will get you noticed by recruiters looking to hire Scrum professionals of a high caliber. The skills gained in this training will be useful even in organizations that are not currently using Scrum.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#082032]">3) Higher Earning Potential</h4>
                    <p className="mt-1">Certified professionals earn significantly more than their non-certified counterparts across roles and designations. CSM is no different, CSM certification opens new avenues and since most of the leading organizations use Scrum, a CSM certification leads to a high-paying job at one of the leading organizations.</p>
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
      />
    </>
  );
}
