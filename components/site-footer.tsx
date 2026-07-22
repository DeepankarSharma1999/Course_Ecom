import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Star, Twitter } from "lucide-react";
import { ORG_PROFILES } from "@/lib/structured-data";
import { getAllCourses, getCountries } from "@/lib/content";
import { FooterCountrySelect } from "@/components/footer-country-select";
import { CATEGORIES } from "@/lib/seed-data";
import { getSiteSettings } from "@/lib/site-content";
import { DEFAULT_FOOTER_COLUMNS, type FooterColumn } from "@/lib/footer-defaults";
import { FooterAccordion, ReadMore } from "@/components/footer-collapsible";

const CONTACT_INFO = [
  { label: "Office Address", value: "CWS-2V-322813, 26th Floor\nAmber Gem Tower, Ajman, UAE" },
  { label: "Email", value: "info@simplilead.com", href: "mailto:info@simplilead.com" },
  { label: "Phone", value: "+971 58 523 2875", href: "tel:+971585232875" },
];



function LinkGroup({ data }: { data: FooterColumn }) {
  return (
    <div>
      <h3 className="font-bold text-brand-950 mb-5">{data.title}</h3>
      <ul className="space-y-3">
        {data.links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-[13px] text-brand-700 hover:text-brand-600 transition-colors block">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function SiteFooter() {
  const [courses, settings, countries] = await Promise.all([getAllCourses(), getSiteSettings(), getCountries()]);
  const categories = CATEGORIES;
  const columns: FooterColumn[] = (settings.footerColumns as any)?.length ? (settings.footerColumns as any) : DEFAULT_FOOTER_COLUMNS;
  const social = (settings.socialLinks as any) || {};
  // Only verified profiles get a hardcoded default (FIX-14/16); the other networks
  // render only when the admin has entered a real URL in Site Settings.
  const socialIcons = [
    { label: "LinkedIn", href: social.linkedin || ORG_PROFILES.find((p) => p.label === "LinkedIn")?.href, Icon: Linkedin },
    { label: "Instagram", href: social.instagram, Icon: Instagram },
    { label: "Facebook", href: social.facebook, Icon: Facebook },
    { label: "Twitter", href: social.twitter, Icon: Twitter, fill: true },
  ].filter((s) => s.href);
  const reviewProfiles = ORG_PROFILES.filter((p) => p.label !== "LinkedIn");
  return (
    <footer className="bg-brand-50/30 font-sans pt-16 pb-8 border-t border-brand-100/50">
      <div className="container-tight max-w-[1400px] px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_500px] gap-16">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
              {columns.map((col, i) => <LinkGroup key={i} data={col} />)}
           </div>

           <div>
              <div className="mb-10">
                 <h3 className="font-bold text-brand-950 mb-4">Your Country</h3>
                 <FooterCountrySelect countries={countries.map((c) => ({ slug: c.slug, name: c.name, currency: c.currency }))} />
              </div>

              <div className="mb-10">
                 <h3 className="font-bold text-brand-950 mb-4">Connect with us</h3>
                 <div className="flex gap-3">
                    {socialIcons.map(({ label, href, Icon, fill }) => (
                      <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-600 hover:text-white transition-all">
                        <Icon className={`w-4 h-4 ${fill ? "fill-current" : ""}`} />
                      </a>
                    ))}
                 </div>
                 <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {reviewProfiles.map((p) => (
                      <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-brand-700 underline-offset-4 hover:underline">
                        <Star className="w-3.5 h-3.5" aria-hidden /> Review us on {p.label}
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
                     <span className="font-black text-teal-700 italic text-lg leading-none tracking-tighter">afterpay<span className="text-xl">⬎</span></span>
                 </div>
              </div>

              <div className="border border-gray-200 rounded-[24px] p-6 lg:p-8 bg-white shadow-sm">
                 <div className="space-y-6">
                    {CONTACT_INFO.map(c => (
                        <div key={c.label}>
                           <div className="mb-1 font-bold text-brand-950 text-[13px]">{c.label}</div>
                           {c.href ? (
                             <a href={c.href} className="text-[13px] text-brand-700 hover:text-brand-600 transition-colors whitespace-pre-line leading-relaxed">{c.value}</a>
                           ) : (
                             <div className="text-[13px] text-brand-700 whitespace-pre-line leading-relaxed">{c.value}</div>
                           )}
                        </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-16 border-t border-brand-100/50 pt-10">
           <div className="mb-8">
              <FooterAccordion title="Top Categories">
                 <div className="flex flex-wrap items-center text-[13px] text-brand-700 leading-8">
                    {categories.slice(0, 15).map((cat, i, arr) => (
                       <React.Fragment key={cat.slug}>
                          <Link href={`/category/${cat.slug}`} className="hover:text-brand-600 transition-colors whitespace-nowrap">{cat.name}</Link>
                          {i < arr.length - 1 && <span className="mx-3 text-brand-200">|</span>}
                       </React.Fragment>
                    ))}
                 </div>
              </FooterAccordion>
           </div>
           <div className="mb-10">
              <FooterAccordion title="Top Courses">
                 <div className="flex flex-wrap items-center text-[13px] text-brand-700 leading-8">
                    {courses.slice(0, 40).map((course, i, arr) => (
                       <React.Fragment key={course.slug}>
                          <Link href={`/${course.slug}`} className="hover:text-brand-600 transition-colors whitespace-nowrap">{course.shortTitle || course.title}</Link>
                          {i < arr.length - 1 && <span className="mx-3 text-brand-200">|</span>}
                       </React.Fragment>
                    ))}
                 </div>
              </FooterAccordion>
           </div>

           <div className="text-[11px] text-gray-400 text-center leading-[1.8] max-w-7xl mx-auto">
              <ReadMore collapsedHeight={110}>
              <div className="space-y-4">
              <p>Disclaimer: The content on the website and/or Platform is for informational and educational purposes only. The user of this website and/or Platform (User) should not construe any such information as legal, investment, tax, financial or any other advice. Nothing contained herein constitutes any representation, solicitation, recommendation, promotion or advertisement on behalf of SimpliLEAD and / or its Affiliates (including but not limited to its subsidiaries, associates, employees, directors, key managerial personnel, consultants, trainers, advisors).</p>
              <p>The User is solely responsible for evaluating the merits and risks associated with use of the information included as part of the content. The User agrees and covenants not to hold SimpliLEAD and its Affiliates responsible for any and all losses or damages arising from such decision made by them basis the information provided in the course and / or available on the website and/or platform. SimpliLEAD reserves the right to cancel or reschedule events in case of insufficient registrations, or if presenters cannot attend due to unforeseen circumstances. You are therefore advised to consult a SimpliLEAD agent prior to making any travel arrangements for a workshop. For more details, please refer to the <Link href="/cancellation-policy" className="text-primary hover:underline">Cancellation Policy</Link> and <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>.</p>
              <p>CSM®, CSPO®, CSD®, CSP®, A-CSPO®, A-CSM® are registered trademarks of Scrum Alliance®. SimpliLEAD Private Limited is a Licensed Training Partner (LTP) of Scrum Alliance®. PMP is a registered mark of the Project Management Institute, Inc. CAPM is a registered mark of the Project Management Institute, Inc. PMI-ACP is a registered mark of the Project Management Institute, Inc. PMI-RMP is a registered mark of the Project Management Institute, Inc. PMI-PBA is a registered mark of the Project Management Institute, Inc. PgMP is a registered mark of the Project Management Institute, Inc. PfMP is a registered mark of the Project Management Institute, Inc. SimpliLEAD Private Limited is a Premier Authorized Training Partner (ATP) of Project Management Institute, Inc. The PMI Premier Authorized Training Partner logo is a registered mark of the Project Management Institute, Inc. PMBOK is a registered mark of the Project Management Institute, Inc. ITIL®, PRINCE2®, PRINCE2 Agile®, AgileSHIFT® are registered trademarks of AXELOS Limited, used under permission of AXELOS Limited. All rights reserved. COBIT® is a registered trademark of the Information Systems Audit and Control Association® (ISACA®). (ISC)2® is a registered trademark of International Information Systems Security Certification Consortium, Inc. CompTIA Authorized Training Partner. CMMI® is registered in the U.S. Patent and Trademark Office by Carnegie Mellon University. FRM®, GARP™, and Global Association of Risk Professionals™ are trademarks owned by the Global Association of Risk Professionals, Inc. Global Association of Risk Professionals, Inc. (GARP™) does not endorse, promote, review, or warrant the accuracy of the products or services offered by SimpliLEAD Private Limited for FRM® related information, nor does it endorse any pass rates claimed by the provider. Further, GARP is not responsible for any fees or costs paid by the user. IIBA®, the IIBA® logo, BABOK®, and Business Analysis Body of Knowledge® are registered trademarks owned by the International Institute of Business Analysis. SimpliLEAD Private Limited is an Endorsed Education Provider of IIBA®. Scaled Agile Framework® and SAFe® are registered trademarks of Scaled Agile, Inc.® SimpliLEAD Private Limited is a Platinum SPCT Partner of Scaled Agile, Inc.® SimpliLEAD Private Limited is an Authorized Training Partner of CertNexus. SimpliLEAD Private Limited is a Microsoft Partner. SimpliLEAD Private Limited is an AWS Training Partner (ATP). SimpliLEAD Private Limited is an ICAgile Member Training Organization. SimpliLEAD Private Limited is a Professional Training Network member of scrum.org. SimpliLEAD Private Limited is an Accredited Examination Centre of IASSC. SimpliLEAD Private Limited is a Registered Education Partner (REP) of the DevOps Institute (DOI). SimpliLEAD Private Limited is an ATO of PeopleCert. SimpliLEAD Private Limited is an Authorized Training Partner (ATP) and Accredited Training Center (ATC) of the EC-Council.</p>
              </div>
              </ReadMore>
           </div>
           
           <div className="mt-8 pt-6 border-t border-brand-100/50 text-center text-xs text-brand-700 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link href="/about" className="hover:text-brand-600 transition-colors underline underline-offset-2">About Us</Link>
              <Link href="/info/privacy-policy-and-disclaimer" className="hover:text-brand-600 transition-colors underline underline-offset-2">Privacy Policy</Link>
              <Link href="/refund-policy" className="hover:text-brand-600 transition-colors underline underline-offset-2">Refund Policy</Link>
              <Link href="/cancellation-policy" className="hover:text-brand-600 transition-colors underline underline-offset-2">Cancellation Policy</Link>
              <Link href="/cookies-policy" className="hover:text-brand-600 transition-colors underline underline-offset-2">Cookies Policy</Link>
              <span>{settings.copyrightText || `© 2011-${new Date().getFullYear()}, SimpliLEAD Private Limited. All Rights Reserved`}</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
