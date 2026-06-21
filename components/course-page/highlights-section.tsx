"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import * as Lucide from "lucide-react";
import { type CourseContent } from "@/lib/seed-data";

export function HighlightsSection({ course }: { course: CourseContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="highlights" className="scroll-mt-24 pt-4 overflow-hidden">
      <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2 break-words">
        {course.category?.name || "CSM"} Certification Highlights
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-10 break-words leading-tight">{course.shortTitle} Course Highlights</h2>
      
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
        {course.keyFeatures.map((kf, i) => {
          const Icon = (Lucide as any)[kf.icon] || CheckCircle2;
          const words = kf.label.split(' ');
          const boldPart = words.slice(0, 3).join(' ');
          const restPart = words.slice(3).join(' ');
          return (
            <div key={i} className="flex flex-col gap-3">
              <Icon className="w-8 h-8 text-[#1FA8A8]" strokeWidth={1.5} />
              <div className="text-[15px] text-[#475569] leading-relaxed pr-4">
                <span className="font-bold text-[#082032]">{boldPart}</span> {restPart}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-[14px] text-[#475569] leading-relaxed border-t border-gray-100 pt-6 space-y-4">
        <p>
          Distinguish yourself as a Scrum Alliance-Certified ScrumMaster and be ready become part of an elite group of Scrum specialists responsible for the effective implementation of the Scrum framework and building high-performance Scrum teams and guiding them to success.
        </p>

        {isExpanded && (
          <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <h3 className="text-[16px] font-bold text-[#1a5b8c] mb-2">What is the CSM Course All About?</h3>
              <p>
                Master the core concepts of Scrum, including the roles and responsibilities of the Scrum Master, Product Owner, and Development Team, as well as Scrum ceremonies and artifacts in our experiential learning sessions, power-packed with activities, role-plays, real-world simulations, and case studies. Our expert Scrum Alliance-Certified Scrum Trainers (CSTs) will deliver a captivating course bringing on board their vast expertise in the most engaging way.
              </p>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#1a5b8c] mb-3">CSM Certification Course Key Highlights</h3>
              <ul className="space-y-3">
                {[
                  "16 Hours of Live Training by CSTs: Guaranteed-to-run, live, fun and interactive sessions",
                  "PDUs and SEUs: Earn 16 Professional Development Units (PDUs) and 16 Scrum Education Units (SEUs) for continual learning.",
                  "4 High-Quality Mock Exams: Practice to ace the CSM exam with comprehensive mock exams",
                  "Get answers to all your real-life <span class=\"text-blue-600\">Agile and Scrum challenges</span>",
                  "20 SEUs with Complimentary CSM Course: Renew your certification effortlessly with our complimentary course.",
                  "Comprehensive Exam Support: Unlock success in your certification with thorough exam preparation and support.",
                  "Scrum Alliance Membership: Access a 2-year Scrum Alliance Membership, connecting you to a global Scrum community.",
                  "Comprehensive Job Support: Comprehensive job support, including LinkedIn assistance, AI-resume builder and more.",
                  "Gateway to Largest Global Community: Become part of a thriving Scrum ecosystem, fostering networking opportunities and global connections.",
                  "Learn in fun, interactive sessions by CSTs experienced across industries along with peers from all over the world. Experience engaging and interactive learning sessions led by Certified Scrum Trainers (CSTs) with diverse industry expertise. Bid farewell to dull lectures and monotonous PowerPoint presentations and say hello to a dynamic and enjoyable learning environment.",
                  "Join peers from around the globe for an exciting educational journey that will propel you towards earning your Certified ScrumMaster certification."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0"></div>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[18px] font-bold text-[#082032] pt-4 mb-2">Skills Covered in the CSM Training</h3>
              <p>
                The Certified ScrumMaster Certification is essential training for anyone looking to become a Scrum Master in an organization that uses Scrum. This certification is ideal for professionals interested in getting a solid understanding of Scrum and the Scrum Master role. The CSM training equips learners to work effectively with Scrum teams and stakeholders, helping deliver high-quality products consistently.
              </p>
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-[#082032] mb-4">Key Skills Covered in CSM Training:</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[#082032]">1) Leadership</h4>
                  <p className="mt-1">Learn the principles of leadership in Scrum, where you empower and guide your team rather than directing them. CSM training teaches you to support your team in making informed decisions, fostering a sense of autonomy, and encouraging team ownership, building an environment for continuous improvement.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">2) Team Facilitation</h4>
                  <p className="mt-1">Develop facilitation skills to guide discussions and encourage effective collaboration. Learn to communicate clearly, align teams, and resolve conflicts constructively. Online CSM certification training covers techniques to manage team dynamics and keep teams focused on their goals.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">3) Conflict Resolution</h4>
                  <p className="mt-1">The CSM certification provides strategies to handle conflicts within Agile teams. Learn to approach conflicts constructively and resolve them by encouraging open communication and aligning teams toward shared goals that benefit both the team and the organization.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">4) Agile Mindset</h4>
                  <p className="mt-1">Learn to adopt a mindset that embraces change, adaptability, and improvement. CSM training helps you understand Agile values and principles and how to instill these within your team to help align to changes in business environment and customer needs.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">5) Sprint Planning and Backlog Management</h4>
                  <p className="mt-1">Learn how to facilitate sprint planning sessions, manage the backlog effectively, and prioritize work for each sprint. With CSM training you can understand how to keep the team focused on delivering valuable work in an incremental fashion.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">6) Communication and Collaboration</h4>
                  <p className="mt-1">CSM certification covers essential skills for building and maintaining open channels of communication within the team and with stakeholders. Build a transparent environment where information flows smoothly, helping team members stay aligned and productive.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">7) Motivating Teams</h4>
                  <p className="mt-1">Scrum Masters play a pivotal role in driving motivation within Agile teams. Through CSM training, you will gain skills to inspire and encourage your team to achieve their best by creating a supportive environment and celebrating team successes.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">8) Facilitating Scrum Ceremonies</h4>
                  <p className="mt-1">CSM training covers techniques for facilitating Scrum events like Sprint Reviews and Retrospectives, helping teams reflect on their work and identify opportunities for improvement. These ceremonies enable the team to build on strengths and continuously improve their performance.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">9) Risk Management</h4>
                  <p className="mt-1">Learn strategies to assess and manage risks within Agile projects. CSM training provides tools for anticipating challenges, responding to changes, and helping the team stay aligned with project goals even when priorities change.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">10) Incremental Value Delivery</h4>
                  <p className="mt-1">Scrum promotes delivering value in small increments. CSM training will help you guide the team in delivering iterative work, gathering feedback early, and adapting to user needs and market demands to ensure value at every step.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#082032]">11) Continuous Improvement</h4>
                  <p className="mt-1">CSM certification emphasizes continuous learning and improvement. You will learn how to promote a culture of agility and innovation within your team, helping them adapt and refine their practices for long-term success.</p>
                </div>
              </div>
            </div>

            <p className="pt-2">
              Don't miss this chance to transform your career and become a driving force in Agile transformation. Elevate your skills in sprint planning, daily standup, sprint review, and retrospective expand your professional network, and unlock new career possibilities – enroll in our Certified ScrumMaster course today and take the first step towards Agile excellence!
            </p>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-[#082032] font-bold flex items-center gap-1 cursor-pointer transition-colors hover:text-[#1FA8A8]"
        >
          {isExpanded ? (
            <span className="border-b border-[#082032] hover:border-[#1FA8A8] pb-0.5">Read Less <ChevronUp className="w-4 h-4 inline" /></span>
          ) : (
            <span className="border-b border-[#082032] hover:border-[#1FA8A8] pb-0.5">Read More <ChevronDown className="w-4 h-4 inline" /></span>
          )}
        </button>
      </div>
    </section>
  );
}
