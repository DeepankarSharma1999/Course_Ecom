"use client";

import Link from "next/link";
import { ChevronRight, Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";

const footerGroups = [
  {
    title: "Company",
    links: ["About us", "Accreditation", "Careers", "Customer Speak", "Contact us"],
  },
  {
    title: "Offerings",
    links: ["Live virtual training", "Classroom training", "Corporate training", "Agile services", "Training Schedule"],
  },
  {
    title: "Resources",
    links: ["Combo Courses", "Free Course", "Practice Tests", "Webinars", "Blogs", "Trainers"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#082032] font-sans text-sm text-white">
      <div className="container-tight pb-8 pt-16 md:pt-[76px]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <img src="/logo.png" alt="ULearnSystems" className="mb-5 h-auto w-[125px] rounded bg-white p-2" />
            <p className="max-w-[280px] text-[15px] leading-7 text-white/65">
              A global learning and certification platform helping professionals and organisations build practical capability.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Facebook, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" aria-label="Social profile" className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white/72 transition-colors hover:border-primary hover:bg-primary hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-[15px] font-bold text-white">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="inline-flex min-h-[32px] items-center text-sm leading-[26px] text-white/62 transition-colors hover:text-primary sm:min-h-0">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-[15px] font-bold text-white">Get weekly learning insights</h3>
            <form className="flex overflow-hidden rounded-lg border border-white/10 bg-white/8">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="Email address" className="min-h-12 w-full bg-transparent px-4 text-white placeholder:text-white/45 focus:outline-none" />
              <button type="submit" className="bg-primary px-4 font-black text-white transition-colors hover:bg-[#178f8f]" aria-label="Subscribe">
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-6 space-y-3 text-white/65">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                +91-9036554933
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                hello@ulearnsystems.com
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="mb-6">
            <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.14em] text-white/80">Top Categories</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-semibold uppercase text-white/45">
              {["Agile", "SAFe", "Project", "Business", "Generative AI", "Quality", "Service", "DevOps", "Cloud Computing", "Data Science"].map((cat) => (
                <Link key={cat} href="#" className="inline-flex min-h-[32px] items-center hover:text-primary sm:min-h-0">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <p className="max-w-5xl text-[12px] leading-6 text-white/42">
            Certification marks and course names remain the property of their respective owners. ULearnSystems provides professional training programs through authorised and partner-led frameworks where applicable.
          </p>

          <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-white/45 md:flex-row">
            <span>© 2018-2026 ULearnSystems Solutions Private Limited. All rights reserved.</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="#" className="inline-flex min-h-[32px] items-center hover:text-primary sm:min-h-0">Privacy Policy</Link>
              <Link href="#" className="inline-flex min-h-[32px] items-center hover:text-primary sm:min-h-0">Terms</Link>
              <Link href="#" className="inline-flex min-h-[32px] items-center hover:text-primary sm:min-h-0">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
