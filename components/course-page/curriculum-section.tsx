"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

const MOCK_CSM_CURRICULUM = [
  {
    title: "Agile and Scrum Overview",
    learningObjectivesIntro: "Get familiar with the 12 principles and 4 values stated in the Agile Manifesto through our popular in-class activity- “Draw and demonstrate”. Herein, you will be asked to form groups and illustrate all 12 principles pictorially.",
    learningObjectivesOutcomes: [
      "Explain the 12 principles and 4 values listed in the Agile Manifesto.",
      "Demonstrate the benefits of “responding to change” in Agile over “following a plan” in traditional project management.",
      "Describe how the Scrum values (courage, focus, commitment, respect, openness) relate to the Scrum artifacts, events, and roles.",
      "List and explain the three pillars in Scrum — Transparency, Inspection, Adaptation.",
      "Explain the differences between framework and methodology and understand why Scrum is called a framework.",
      "List 5 ways to develop an Agile mindset.",
      "Illustrate 2 differences between Agile and Scrum and explain why these two terms cannot be used interchangeably."
    ],
    topics: [
      "Agile Manifesto",
      "12 Principles",
      "4 values",
      "Scrum Foundations (5 Scrum Values)"
    ]
  },
  {
    title: "The Three Roles in Scrum",
    learningObjectivesIntro: "Learn more about the three roles in Scrum with role-based activities. Each group will play a simulation game called “candy catch” that will have three iterations. The Scrum Master and Product Owner (chosen by group members) will coordinate and help the team achieve the highest target within the shortest time.",
    learningObjectivesOutcomes: [
      "Conduct a retrospective to list 3 techniques to improve the performance and turnaround time.",
      "Explain the <span class=\"text-blue-600\">roles and responsibilities</span> of a Scrum Master and a Product Owner.",
      "List 3 differences between a Scrum Master and a Product Owner and understand why these two roles should not overlap.",
      "Discuss how a product owner acts as a bridge between the development team and the stakeholders.",
      "Understand why a Scrum Master is not an active participant but a facilitator in the Scrum events and ceremonies.",
      "List 3 demerits of having a development team of less than 3 members or greater than 10 members."
    ],
    topics: [
      "Scrum Master roles and challenges",
      "Product Owner roles and responsibilities",
      "Development team roles and responsibilities"
    ]
  },
  {
    title: "Scrum Ceremonies",
    learningObjectivesIntro: "Take part in the Scrum Paper Plane game and learn how the 5 Scrum ceremonies work. There will be 3 sprints, each lasting 15 minutes. You need to prepare the user stories that will cover the features and functionalities along with acceptance criteria.",
    learningObjectivesOutcomes: [
      "Explain the “why” and “how” of sprint planning, daily scrum, sprint review, and retrospective.",
      "Understand why the scope and duration of a sprint are fixed.",
      "List 3 ways to avoid sprint backlog spillover.",
      "Define sprint goals and discuss 5 benefits of having a sprint goal.",
      "Understand how the Scrum Master and the Product Owner should coordinate with the team and list 5 points to improve such communications.",
      "Discuss 3 damaging impacts of sprint cancellation and how to avoid it.",
      "List 10 sprint anti-patterns (E.g. sprint cancellation, variable sprint length) and understand how these impact the delivery and turnaround time."
    ],
    topics: [
      "Sprint planning",
      "Daily Scrum",
      "Sprint Review",
      "Sprint Retrospective"
    ]
  },
  {
    title: "Scrum Artifacts",
    learningObjectivesIntro: "Experience how scrum works in real projects with our simulation game “Crime Teller”. The activity will be divided into 3 sprints, wherein the participants will actively employ Product backlog refinement among other scrum artifacts to solve a given “crime” story.",
    learningObjectivesOutcomes: [
      "List and demonstrate 5 salient features of a well-formed product backlog (E.g. estimated, prioritized).",
      "Discuss 2 responsibilities of the Product Owner, Scrum Master, and the Development team in creating and maintaining a product backlog.",
      "The objective of having a product backlog and best approaches to product backlog refinement.",
      "Analyze and discuss the ideal time and capacity to be dedicated to product backlog refinement.",
      "Demonstrate 3 activities (E.g. budget and timeline, release schedule) that take place during a sprint review.",
      "List 5 sprint review anti-patterns (E.g. delayed acceptance) and their negative impacts."
    ],
    topics: [
      "Product Backlog",
      "Sprint Backlog",
      "Product Increment"
    ]
  },
  {
    title: "Sprint Execution",
    learningObjectivesIntro: "Learn about Scrum life cycle by taking part in the “coin game”. The participants will be linking ceremonies to create effective sprint goals. This module will focus on the common challenges in sprint execution and enable team members to improvise.",
    learningObjectivesOutcomes: [
      "Explain the difference between resolution meetings and daily standups.",
      "Explain the benefits of collaborations with product owners.",
      "List 3 demerits of over collaboration of the product owners.",
      "Demonstrate 3 ways to break the barriers and collaborate.",
      "Demonstrate creation of sprint burndown chart.",
      "Explain 3 approaches to increase efficiency in the team."
    ],
    topics: [
      "Sprint Execution Planning",
      "Flow management",
      "Resolution meetings",
      "Communication (Taskboard, Sprint burndown chart using story points, hours effort)"
    ]
  },
  {
    title: "Daily Scrum and Sprint Retrospective",
    learningObjectivesIntro: "Play the “Marshmellow Tower” game and learn more about daily scrum and sprint retrospective in real scrum projects. The tallest tower built with the minimum raw materials and in the shortest time frame will win. Acceptance criteria will be defined by the instructor.",
    learningObjectivesOutcomes: [
      "Explain the importance of 15-minute timebox for daily scrum meetings.",
      "List 3 differences between traditional meetings and daily stand-ups.",
      "Describe 2 roles played by the Scrum Master, Product Owner, and the Development team in daily scrum.",
      "List the 3 critical questions pertaining to the daily scrum agenda.",
      "List 2 responsibilities of the Scrum Master, Product Owner, and the Development team during the sprint retrospective."
    ],
    topics: [
      "Activities in daily scrum",
      "Activities in sprint retrospective"
    ]
  },
  {
    title: "Definition of Done (DoD) and Acceptance Criteria",
    learningObjectivesIntro: "Familiarize yourself with Definition of Done (DoD) and Acceptance Criteria with the “Crazy Juggler” game wherein you need to pass a fixed number of balls to non-adjacent team members within a certain time frame and collect them in a paper bag once marked as “done”.",
    learningObjectivesOutcomes: [
      "Explain Definition of Done at three levels — user story (e.g. writing code), sprint, and release (e.g. preparing release notes).",
      "List 3 benefits of Definition of Done and explain why it can evolve over a certain period of time.",
      "Prepare a checklist (with a minimum of 7 entries) of an ideal DoD.",
      "Mention 3 risks associated with an ill-formed DoD.",
      "List 5 characteristics of good acceptance criteria.",
      "Understand who all should be involved in drafting the acceptance criteria.",
      "List 3 negative impacts of not following the acceptance criteria."
    ],
    topics: [
      "Definition of Done for a feature (user story or product backlog item)",
      "Definition of Done for a sprint",
      "Definition of Done for a release",
      "Definition of Done vs. Acceptance criteria",
      "Done vs. Done-Done"
    ]
  },
  {
    title: "Definition of Ready",
    learningObjectivesIntro: "Acquaint yourself with the Definition of Ready with our Lego blocks game wherein the attendees will be asked to build a city out of Lego building blocks. The “definition of ready” checklist for the final deliverable will be determined by the instructor.",
    learningObjectivesOutcomes: [
      "Create an ultimate checklist of Definition of Done.",
      "List 3 negative impacts of an ill-formed Definition of Done.",
      "Identify at least 3 benefits of a shared Definition of Done for multiple teams working on the same product backlog.",
      "List 2 ways to improve Definition of Done.",
      "Clearly understand the differences between “done” and “done done”."
    ],
    topics: [
      "Definition of Ready for user story",
      "Definition of Ready for sprint"
    ]
  },
  {
    title: "Release Planning",
    learningObjectivesIntro: "Play the self-organization game “Human Knots” by forming teams of 5-6. Groups where team members can untie themselves first win. The time frame for this activity will be decided by your instructor. Each team will have a Scrum Master and Product Owner chosen by group members.",
    learningObjectivesOutcomes: [
      "Define and understand the steps involved in release planning.",
      "List 3 benefits of a well-organized release planning.",
      "List 3 outputs of release planning."
    ],
    topics: [
      "Definition of release planning",
      "Who takes part in release planning",
      "Steps in Release planning",
      "Output of Release Planning"
    ]
  },
  { 
    title: "Sprint Burndown Chart", 
    learningObjectivesIntro: "Understand the visual representation of work left to do versus time. This module teaches how to effectively track sprint progress using burndown charts to ensure the team meets its commitments.",
    learningObjectivesOutcomes: [
      "Interpret sprint burndown charts to identify potential bottlenecks early.",
      "Understand the relationship between remaining effort and the sprint timeline.",
      "Explain how the Scrum Master uses burndown charts to protect the sprint goal."
    ],
    topics: [
      "Introduction to Burndown Charts",
      "Tracking Sprint Progress",
      "Identifying Trends and Bottlenecks"
    ] 
  },
];

import { DownloadModal } from "./download-modal";

export function CurriculumSection({ course }: { course: CourseContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Always render the per-course, admin-editable curriculum (uniform across courses).
  const curriculumToRender = course.curriculum;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="curriculum" className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
        {course.shortTitle} Certification Training Curriculum
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-8 break-words leading-tight">Curriculum</h2>
      
      <div className="space-y-4">
        {curriculumToRender.map((m: any, i: number) => {
          const isOpen = openIndex === i;
          
          return (
            <div 
              key={i} 
              className={`rounded-lg overflow-hidden transition-all duration-200 ${
                isOpen 
                  ? "bg-white border-2 border-[#1FA8A8] shadow-sm" 
                  : "bg-[#fcfdfd] border border-[#e2ecec] hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleAccordion(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h3 className="font-bold text-[#082032] text-[15px]">
                  {i + 1}. {m.title}
                </h3>
                <div className={`shrink-0 ml-4 border-[5px] border-transparent transition-transform duration-200 ${
                  isOpen 
                    ? "border-b-[#082032] -translate-y-1" 
                    : "border-t-[#1FA8A8] translate-y-1"
                }`}></div>
              </button>
              
              {isOpen && (m.topics || m.learningObjectivesIntro) && (
                <div className="px-5 pb-6 pt-0 border-t border-[#1FA8A8]/20 bg-white animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="pt-5 space-y-6 text-[14px] text-[#475569] leading-relaxed">
                    
                    {/* Learning Objectives Block */}
                    {m.learningObjectivesIntro && (
                      <div>
                        <h4 className="font-bold text-[#1a5b8c] mb-2">Learning Objectives:</h4>
                        <p>{m.learningObjectivesIntro}</p>
                        
                        {m.learningObjectivesOutcomes && m.learningObjectivesOutcomes.length > 0 && (
                          <>
                            <p className="mt-4 mb-2">At the end of this activity, you will be able to:</p>
                            <ul className="space-y-2">
                              {m.learningObjectivesOutcomes.map((outcome: string, idx: number) => (
                                <li key={idx} className="flex gap-3 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#475569]">
                                  <span dangerouslySetInnerHTML={{ __html: outcome }} />
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}

                    {/* Topics Block */}
                    {m.topics && m.topics.length > 0 && (
                      <div className={m.learningObjectivesIntro ? "pt-4 border-t border-gray-100" : ""}>
                        <h4 className="font-bold text-[#1a5b8c] mb-3">Topics:</h4>
                        <ul className="space-y-2">
                          {m.topics.map((t: string, j: number) => (
                            <li key={j} className="flex gap-3 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#475569]">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-10 flex justify-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="h-12 px-8 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] flex items-center gap-2 transition-colors text-[14px]"
        >
          <Download className="w-4 h-4" /> Download Curriculum
        </button>
      </div>

      <DownloadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Download Curriculum"
        subtitle="Enter your details to download the course curriculum"
      />
    </section>
  );
}
