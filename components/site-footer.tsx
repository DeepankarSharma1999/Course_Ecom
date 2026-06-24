import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { getAllCourses } from "@/lib/content";
import { CATEGORIES } from "@/lib/seed-data";

const LINKS = {
  company: {
    title: "Company",
    links: ["About Us", "Careers", "Accreditation", "Customer Speak", "Contact Us", "Grievance Redressal"],
  },
  offerings: {
    title: "Offerings",
    links: ["Live Virtual (Online)", "Classroom", "Agile Services", "Refer and Earn", "Corporate Training"],
  },
  resources: {
    title: "Resources",
    links: ["Course Info", "Tutorials", "Blogs", "Interview Questions", "Practice Tests", "Free Courses", "Masterclasses"],
  },
  partner: {
    title: "Partner with Us",
    links: ["Become an Instructor", "Become a Training Partner", "Affiliate"],
  },
  support: {
    title: "Support",
    links: ["FAQs", "Terms and Conditions", "Privacy Policy and Disclaimer", "Cancellation and Refund Policy", "Report a Vulnerability"],
  },
};

const CONTACT_NUMBERS = [
  { country: "USA", flag: "🇺🇸", number: "+1-469-442-0620\n+1-832-684-0080" },
  { country: "India", flag: "🇮🇳", number: "+91-95382-36399\n+91-72089-98084\n+91-95381-83332\n+91-72089-98083" },
  { country: "UK", flag: "🇬🇧", number: "+44-2045-865736\n+44-2046-002067" },
  { country: "Singapore", flag: "🇸🇬", number: "+65-317-46174" },
  { country: "Malaysia", flag: "🇲🇾", number: "+601548770914" },
  { country: "Canada", flag: "🇨🇦", number: "+1-613-707-0763" },
  { country: "New Zealand", flag: "🇳🇿", number: "+64-36694791" },
  { country: "Ireland", flag: "🇮🇪", number: "+44-2081-586434" },
  { country: "Australia", flag: "🇦🇺", number: "+61-290995641" },
  { country: "UAE: Toll Free", flag: "🇦🇪", number: "8000180960" },
];



const URL_OVERRIDES: Record<string, string> = {
  "About Us": "/about",
  "Corporate Training": "/corporate-training",
  "Refer and Earn": "/refer-earn",
  "Practice Tests": "/practice-tests",
  "Free Courses": "/free-course",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function LinkGroup({ data }: { data: { title: string; links: string[] } }) {
  return (
    <div>
      <h3 className="font-bold text-brand-950 mb-5">{data.title}</h3>
      <ul className="space-y-3">
        {data.links.map((link) => {
          const href = URL_OVERRIDES[link] || `/info/${slugify(link)}`;
          return (
            <li key={link}>
              <Link href={href} className="text-[13px] text-brand-700 hover:text-brand-600 transition-colors block">
                {link}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function SiteFooter() {
  const courses = await getAllCourses();
  const categories = CATEGORIES;
  return (
    <footer className="bg-brand-50/30 font-sans pt-16 pb-8 border-t border-brand-100/50">
      <div className="container-tight max-w-[1400px] px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_500px] gap-16">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Col 1 */}
              <div className="flex flex-col gap-12">
                 <LinkGroup data={LINKS.company} />
                 <LinkGroup data={LINKS.partner} />
              </div>
              {/* Col 2 */}
              <div className="flex flex-col gap-12">
                 <LinkGroup data={LINKS.offerings} />
                 <LinkGroup data={LINKS.support} />
              </div>
              {/* Col 3 */}
              <div className="flex flex-col gap-12">
                 <LinkGroup data={LINKS.resources} />
              </div>
           </div>

           <div>
              <div className="mb-10">
                 <h3 className="font-bold text-brand-950 mb-4">Connect with us</h3>
                 <div className="flex gap-3">
                    {[
                      { label: "LinkedIn", href: "https://www.linkedin.com/company/ulearnsystems", Icon: Linkedin },
                      { label: "Instagram", href: "https://www.instagram.com/ulearnsystems", Icon: Instagram },
                      { label: "Facebook", href: "https://www.facebook.com/ulearnsystems", Icon: Facebook },
                      { label: "Twitter", href: "https://twitter.com/ulearnsystems", Icon: Twitter, fill: true },
                    ].map(({ label, href, Icon, fill }) => (
                      <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-600 hover:text-white transition-all">
                        <Icon className={`w-4 h-4 ${fill ? "fill-current" : ""}`} />
                      </a>
                    ))}
                 </div>
              </div>
              
              <div className="mb-10">
                 <h3 className="font-bold text-brand-950 mb-4">We Accept</h3>
                 <div className="flex gap-5 items-center flex-wrap">
                     <span className="font-black text-blue-800 italic text-xl leading-none">PayPal</span>
                     <span className="font-black text-blue-600 text-[10px] leading-tight w-14 uppercase">American Express</span>
                     <span className="w-10 h-6 flex items-center justify-center relative">
                        <div className="w-4 h-4 rounded-full bg-red-500 absolute left-1 mix-blend-multiply opacity-90"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-400 absolute right-1 mix-blend-multiply opacity-90"></div>
                     </span>
                     <span className="font-black text-blue-800 text-2xl italic leading-none">VISA</span>
                     <span className="font-black text-teal-400 italic text-lg leading-none tracking-tighter">afterpay<span className="text-xl">⬎</span></span>
                 </div>
              </div>

              <div className="border border-gray-200 rounded-[24px] p-6 lg:p-8 bg-white shadow-sm">
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
                    {CONTACT_NUMBERS.map(c => (
                        <div key={c.country}>
                           <div className="flex items-center gap-2 mb-2 font-bold text-brand-950 text-[13px]"><span className="text-lg leading-none">{c.flag}</span> {c.country}</div>
                           <div className="text-[12px] text-brand-700 space-y-1 whitespace-pre-line leading-relaxed">{c.number}</div>
                        </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-16 border-t border-brand-100/50 pt-10">
           <div className="mb-8">
              <h3 className="font-bold text-brand-950 text-[15px] mb-4">Top Categories</h3>
              <div className="flex flex-wrap items-center text-[13px] text-brand-700 leading-8">
                 {categories.slice(0, 15).map((cat, i, arr) => (
                    <React.Fragment key={cat.slug}>
                       <Link href={`/category/${cat.slug}`} className="hover:text-brand-600 transition-colors whitespace-nowrap">{cat.name}</Link>
                       {i < arr.length - 1 && <span className="mx-3 text-brand-200">|</span>}
                    </React.Fragment>
                 ))}
              </div>
           </div>
           <div className="mb-10">
              <h3 className="font-bold text-brand-950 text-[15px] mb-4">Top Courses</h3>
              <div className="flex flex-wrap items-center text-[13px] text-brand-700 leading-8">
                 {courses.slice(0, 40).map((course, i, arr) => (
                    <React.Fragment key={course.slug}>
                       <Link href={`/${course.slug}`} className="hover:text-brand-600 transition-colors whitespace-nowrap">{course.shortTitle || course.title}</Link>
                       {i < arr.length - 1 && <span className="mx-3 text-brand-200">|</span>}
                    </React.Fragment>
                 ))}
              </div>
           </div>

           <div className="text-[11px] text-gray-400 text-center leading-[1.8] max-w-7xl mx-auto space-y-4">
              <p>Disclaimer: The content on the website and/or Platform is for informational and educational purposes only. The user of this website and/or Platform (User) should not construe any such information as legal, investment, tax, financial or any other advice. Nothing contained herein constitutes any representation, solicitation, recommendation, promotion or advertisement on behalf of ULearnSystems and / or its Affiliates (including but not limited to its subsidiaries, associates, employees, directors, key managerial personnel, consultants, trainers, advisors).</p>
              <p>The User is solely responsible for evaluating the merits and risks associated with use of the information included as part of the content. The User agrees and covenants not to hold ULearnSystems and its Affiliates responsible for any and all losses or damages arising from such decision made by them basis the information provided in the course and / or available on the website and/or platform. ULearnSystems reserves the right to cancel or reschedule events in case of insufficient registrations, or if presenters cannot attend due to unforeseen circumstances. You are therefore advised to consult a ULearnSystems agent prior to making any travel arrangements for a workshop. For more details, please refer to the <Link href="/info/cancellation-and-refund-policy" className="text-primary hover:underline">Cancellation & Refund Policy</Link>.</p>
              <p>CSM®, CSPO®, CSD®, CSP®, A-CSPO®, A-CSM® are registered trademarks of Scrum Alliance®. ULearnSystems Private Limited is a Licensed Training Partner (LTP) of Scrum Alliance®. PMP is a registered mark of the Project Management Institute, Inc. CAPM is a registered mark of the Project Management Institute, Inc. PMI-ACP is a registered mark of the Project Management Institute, Inc. PMI-RMP is a registered mark of the Project Management Institute, Inc. PMI-PBA is a registered mark of the Project Management Institute, Inc. PgMP is a registered mark of the Project Management Institute, Inc. PfMP is a registered mark of the Project Management Institute, Inc. ULearnSystems Private Limited is a Premier Authorized Training Partner (ATP) of Project Management Institute, Inc. The PMI Premier Authorized Training Partner logo is a registered mark of the Project Management Institute, Inc. PMBOK is a registered mark of the Project Management Institute, Inc. ITIL®, PRINCE2®, PRINCE2 Agile®, AgileSHIFT® are registered trademarks of AXELOS Limited, used under permission of AXELOS Limited. All rights reserved. COBIT® is a registered trademark of the Information Systems Audit and Control Association® (ISACA®). (ISC)2® is a registered trademark of International Information Systems Security Certification Consortium, Inc. CompTIA Authorized Training Partner. CMMI® is registered in the U.S. Patent and Trademark Office by Carnegie Mellon University. FRM®, GARP™, and Global Association of Risk Professionals™ are trademarks owned by the Global Association of Risk Professionals, Inc. Global Association of Risk Professionals, Inc. (GARP™) does not endorse, promote, review, or warrant the accuracy of the products or services offered by ULearnSystems Private Limited for FRM® related information, nor does it endorse any pass rates claimed by the provider. Further, GARP is not responsible for any fees or costs paid by the user. IIBA®, the IIBA® logo, BABOK®, and Business Analysis Body of Knowledge® are registered trademarks owned by the International Institute of Business Analysis. ULearnSystems Private Limited is an Endorsed Education Provider of IIBA®. Scaled Agile Framework® and SAFe® are registered trademarks of Scaled Agile, Inc.® ULearnSystems Private Limited is a Platinum SPCT Partner of Scaled Agile, Inc.® ULearnSystems Private Limited is an Authorized Training Partner of CertNexus. ULearnSystems Private Limited is a Microsoft Partner. ULearnSystems Private Limited is an AWS Training Partner (ATP). ULearnSystems Private Limited is an ICAgile Member Training Organization. ULearnSystems Private Limited is a Professional Training Network member of scrum.org. ULearnSystems Private Limited is an Accredited Examination Centre of IASSC. ULearnSystems Private Limited is a Registered Education Partner (REP) of the DevOps Institute (DOI). ULearnSystems Private Limited is an ATO of PeopleCert. ULearnSystems Private Limited is an Authorized Training Partner (ATP) and Accredited Training Center (ATC) of the EC-Council.</p>
           </div>
           
           <div className="mt-8 pt-6 border-t border-brand-100/50 text-center text-xs text-brand-600/70 flex items-center justify-center gap-2">
              <Link href="/info/privacy-policy-and-disclaimer" className="hover:text-brand-600 transition-colors underline underline-offset-2">Our Privacy Policy</Link>
              <span>© 2011-{new Date().getFullYear()}, ULearnSystems Private Limited. All Rights Reserved</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
