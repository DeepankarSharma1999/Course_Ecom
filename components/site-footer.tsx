"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube, ChevronRight } from "lucide-react";

export function SiteFooter() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <footer className="bg-[#f8f9fa] font-sans text-sm">
      <div className="container-tight py-12">
        {/* Top & Middle Sections combined into a grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Company & Partner with us */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Company</h4>
              <ul className="space-y-2.5">
                {["About us", "Accreditation", "Careers", "Customer Speak", "Contact us", "Grievance Redressal"].map(l => (
                  <li key={l}><Link href="#" className="text-[#5c7080] hover:text-[#082032] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Partner with us</h4>
              <ul className="space-y-2.5">
                {["Become an Instructor", "Hire from Us", "Become a Training Partner"].map(l => (
                  <li key={l}><Link href="#" className="text-[#5c7080] hover:text-[#082032] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Offerings & Support */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Offerings</h4>
              <ul className="space-y-2.5">
                {["Live virtual (Online)", "Classroom (In-Person)", "Agile services", "Refer and earn", "Blog as a guest", "Corporate training", "Training Schedule"].map(l => (
                  <li key={l}><Link href="#" className="text-[#5c7080] hover:text-[#082032] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Support</h4>
              <ul className="space-y-2.5">
                {["FAQ", "Terms and conditions", "Privacy policy", "Cancellation and refund", "Html Sitemap"].map(l => (
                  <li key={l}><Link href="#" className="text-[#5c7080] hover:text-[#082032] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Resources</h4>
            <ul className="space-y-2.5">
              {["Combo Courses", "E-Learning", "Free Course", "Practice Tests", "Webinars", "Blogs", "Course Info", "Trainers", "Learning Path", "Questions", "Quiz"].map(l => (
                <li key={l}><Link href="#" className="text-[#5c7080] hover:text-[#082032] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter, Social, Payments, and Contact Box */}
          <div className="lg:col-span-5 space-y-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Get Our Weekly Newsletter :</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Email*" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[#2b3445]"
                />
                <button type="submit" className="bg-[#2b3445] text-white px-6 py-2 rounded-r-md font-semibold flex items-center hover:bg-[#1a212e] transition-colors">
                  Subscribe <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>

            {/* Social & Payments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[#082032] font-bold mb-4 text-[15px]">Connect with us :</h4>
                <div className="flex gap-2">
                  <a href="#" className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80"><Facebook className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white flex items-center justify-center hover:opacity-80"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"></path></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-80"><Youtube className="w-4 h-4" /></a>
                </div>
              </div>
              <div>
                <h4 className="text-[#082032] font-bold mb-4 text-[15px]">We Accept</h4>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                  {/* Mocking payment badges */}
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#003087]">PayPal</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#02042b]">Razorpay</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#635bff]">stripe</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-black">splitit</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#016fd0]">AMEX</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#eb001b]">mastercard</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#b2fce4]">afterpay</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#1a1f71]">VISA</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[#ffb3c7]">Klarna</span>
                </div>
              </div>
            </div>

            {/* Global Contact Box */}
            <div className="bg-white border border-[#b2ccdf] rounded-xl p-6 shadow-sm mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#082032] font-bold text-sm"><span>🇺🇸</span> USA</div>
                  <div className="text-[#5c7080] text-sm">+1-361-998-9988</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#082032] font-bold text-sm"><span>🇨🇦</span> Canada</div>
                  <div className="text-[#5c7080] text-sm">+1-249-500-3143</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#082032] font-bold text-sm"><span>🇮🇳</span> India</div>
                  <div className="text-[#5c7080] text-sm">+91-9036554933</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#082032] font-bold text-sm"><span>🇬🇧</span> UK</div>
                  <div className="text-[#5c7080] text-sm">+44-1414890048</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#082032] font-bold text-sm"><span>🇦🇺</span> Australia</div>
                  <div className="text-[#5c7080] text-sm">+61-272025160</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#082032] font-bold text-sm"><span>🇸🇬</span> Singapore</div>
                  <div className="text-[#5c7080] text-sm">+65-31592313</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 py-8 text-center text-xs text-[#5c7080]">
          
          {/* Top Categories */}
          <div className="mb-6">
            <h4 className="text-[#082032] font-bold text-[15px] text-left mb-3">Top Categories</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-2 uppercase text-[11px] font-semibold text-left">
              {["AGILE", "SAFe", "PROJECT", "BUSINESS", "Generative AI", "Microcredentials", "QUALITY", "SERVICE", "DEVOPS", "CLOUD COMPUTING", "DATA SCIENCE", "TECHNOLOGY", "OTHERS"].map((cat, i, arr) => (
                <span key={cat} className="flex items-center gap-3">
                  <Link href="#" className="hover:text-[#082032] transition-colors">{cat}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Top Courses */}
          <div className="mb-8">
            <h4 className="text-[#082032] font-bold text-[15px] text-left mb-3">Top Courses</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-[12px] leading-relaxed text-left text-[#8391a1]">
              {[
                "Certified Scrum Master (CSM)", "Certified Scrum Product Owner (CSPO)", "Advanced Certified Scrum Master (A-CSM)", "Advanced Certified Scrum Product Owner (A-CSPO)", "Certified Agile Leader® (CAL-1™)", "Certified Scrum Developer® (CSD)", "PMP® Certification", "Leading SAFe® (SA)Training", "SAFe® Product Owner/Product Manager (POPM)", "SAFe® Scrum Master (SSM)", "SAFe® Practice Consultant (SPC)", "SAFe® Release Train Engineer (RTE)", "SAFe Lean Portfolio Management (LPM)", "ITIL® 4 Foundation", "PRINCE2 Foundation and Practitioner", "PRINCE2 Foundation Certification", "PRINCE2 Practitioner Certification", "SAFe® 6.0 DevOps (SDP)", "SAFe® Agile Product Management (APM)", "Advanced SAFe Practice Consultant (ASPC)", "Advanced Scrum Master (ASM)", "CAPM® Certification", "PgMP Certification", "Certified Scrum Professional ScrumMaster (CSP-SM)", "Jira Software Training", "Professional Scrum Master™ (PSM)", "Certified Business Analysis Professional (CBAP®)", "Entry Certificate In Business Analysis (ECBA)", "DevOps Foundation Certification", "Certified Agile Facilitator (CAF)", "Certified Agile Scaling Practitioner 1 (CASP 1)", "Certification of Capability in Business Analysis™ (CCBA®)", "Project Management Techniques Training", "Advanced-Certified Scrum Developer® (A-CSD)", "Six Sigma Green Belt Certification", "Conflict Management Training", "Professional Scrum Product Owner (PSPO)", "Professional Scrum Developer (PSD)"
              ].map((course, i, arr) => (
                <span key={course} className="flex items-center gap-3">
                  <Link href="#" className="hover:text-[#082032] transition-colors">{course}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-4 text-[#8391a1] leading-relaxed max-w-6xl mx-auto space-y-4">
            <p>Disclaimer : Certified Scrum Master(CSM®),Advanced Certified Scrum Master(A-CSM®), Certified Scrum Professional ScrumMaster(CSP-SM®), Certified Scrum Product Owner (CSPO®), Advanced Certified Scrum Product Owner (A-CSPO®), Certified Scrum Professional Product Owner(CSP-PO®), Certified Scrum Developer (CSD®), Certified Scrum Professional(CSP®), Certified Agile Leadership(CAL-I®,CAL-II®), Scrum Education Units(SEU®),Certified Scrum Trainer (CST®),Certified Enterprise Coach(CEC®), and Certified Team Coach(CTC®), are registered trademarks of Scrum Alliance®. ULearnSystems INC is a Licensed Training Partner (LTP) of Scrum Alliance.</p>
            
            {isExpanded && (
              <>
                <p>Profession Scrum Master (PSM-I®, PSM-II®, PSM-III®), Profession Scrum Product Owner (PSPO-I®, PSPO-II®, PSPO-III®), Profession Scrum Developer (PSD-I®), Scaled Professional Scrum(SPS®),Professional Scrum With Kanban(PSK-I®), Prove your knowledge of Professional Agile Leadership(PAL-I®), Prove your knowledge of Evidence-Based Management™ (PAL-EBM®), Prove Your Scrum with User Experience Knowledge(PSU-I®) and Professional Scrum Trainer(PST®) are registered trademarks of Scrum.org®. ULearnSystems INC is a Professional Training Network member of Scrum.org®.</p>
                <p>Certified Business Analysis Professional (CBAP®), Certification of Capability in Business Analysis(CCBA®), Entry Certificate in Business Analysis(ECBA®), Agile Analysis Certification(AAC®), Certification in Business Data Analytics(CBDA®), Certificate in Cybersecurity Analysis(CCA®), Certificate in Product Ownership Analysis(CPOA®) are registered trademarks of International Institute of Business Analysis(IIBA®). ULearnSystems INC is an Premier Level Endorsed Education Provider of IIBA®.</p>
                <p>SAFe Agilist Certification (SA®), SAFe Program Consultant Certification (SPC®),SAFe Program Consultant Trainer Certification (SPCT®),SAFe Practitioner Certification(SP®),SAFe Release Train Engineer Certification (RTE®),SAFe Scrum Master Certification (SSM®),SAFe Advanced Scrum Master Certification (SASM®),SAFe DevOps Practitioner Certification(SDP®),Agile Product Manager Certification (APM®),Lean Portfolio Manager Certification (LPM®),Product Owner / Product Manager Certification (POPM®),SAFe Architect Certification (ARCH®),Agile Software Engineer Certification (ASE®) and SAFe Government Practitioner Certification (SGP®), Scaled Agile Framework® and SAFe® are registered trademarks of Scaled Agile, Inc.®. ULearnSystems INC is a Platinum SPCT Partner of Scaled Agile, Inc®.</p>
                <p>DevOps Foundation®, DevOps Leader®, SRE Foundation℠, SRE Practitioner℠, DevSecOps Foundation℠, Continuous Testing Foundation℠, Certified Agile Service Manager®, Continuous Delivery Ecosystem Foundation℠ and Value Stream Management Foundation® are registered trademarks of DevOps Institute.</p>
                <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
              </>
            )}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#082032] font-semibold border-b border-[#082032] uppercase tracking-wider text-[11px] pb-0.5 hover:text-[#1fa8a8] hover:border-[#1fa8a8] transition-colors mb-8"
          >
            {isExpanded ? "READ LESS" : "READ MORE"}
          </button>

          {/* Copyright */}
          <div className="flex justify-center items-center gap-2 font-medium text-[#5c7080] text-[13px]">
            <Link href="#" className="hover:text-[#082032] transition-colors border-b border-transparent hover:border-[#082032]">Our privacy policy</Link>
            <span>© 2018-2026, ULearnSystems Solutions Private Limited. All Rights Reserved</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Contact Bar */}
      <div className="bg-[#2b3445] text-white py-3 border-t-4 border-[#3b475c]">
        <div className="container-tight flex flex-col md:flex-row justify-between items-center text-[13px] font-medium gap-4">
          <div className="flex items-center gap-2 hover:text-[#1fa8a8] cursor-pointer transition-colors"><Phone className="w-4 h-4" /> Request a call back</div>
          <div className="flex items-center gap-2 hover:text-[#1fa8a8] cursor-pointer transition-colors"><Phone className="w-4 h-4" /> +91-9036554933</div>
          <div className="flex items-center gap-2 hover:text-[#1fa8a8] cursor-pointer transition-colors"><Mail className="w-4 h-4" /> hello@ulearnsystems.com</div>
        </div>
      </div>
    </footer>
  );
}
