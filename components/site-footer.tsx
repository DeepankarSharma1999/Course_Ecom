import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { getSiteSettings } from "@/lib/site-content";
import { getAllCourses } from "@/lib/content";
import { COUNTRIES } from "@/lib/seed-data";
import { FooterCountrySwitcher } from "@/components/course-country-switcher";

export async function SiteFooter() {
  const [s, courses] = await Promise.all([getSiteSettings(), getAllCourses()]);
  const social = (s.socialLinks as any) || {};
  const columns = (s.footerColumns as any) || [];
  const courseSlugs = courses.map((c) => c.slug);

  return (
    <footer className="bg-ink-900 text-ink-400">
      <div className="container-tight py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            {s.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.logoUrl} alt={s.brandName} className="h-10 w-auto object-contain bg-white/5 rounded p-1" />
            ) : (
              <>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">{s.brandName.charAt(0)}</div>
                <div className="text-white font-bold text-lg">{s.brandName}</div>
              </>
            )}
          </div>
          {s.footerAbout && <p className="text-sm leading-relaxed mb-4">{s.footerAbout}</p>}
          <div className="space-y-2 text-sm">
            {s.address && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>{s.address}</span></div>}
            {s.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /><a href={`tel:${s.phone}`} className="hover:text-white">{s.phone}</a></div>}
            {s.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><a href={`mailto:${s.email}`} className="hover:text-white">{s.email}</a></div>}
          </div>
          <div className="flex items-center gap-3 mt-5">
            {social.linkedin && <a href={social.linkedin} aria-label="LinkedIn" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 text-white"><Linkedin className="w-4 h-4" /></a>}
            {social.facebook && <a href={social.facebook} aria-label="Facebook" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 text-white"><Facebook className="w-4 h-4" /></a>}
            {social.twitter && <a href={social.twitter} aria-label="Twitter" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 text-white"><Twitter className="w-4 h-4" /></a>}
            {social.instagram && <a href={social.instagram} aria-label="Instagram" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 text-white"><Instagram className="w-4 h-4" /></a>}
            {social.youtube && <a href={social.youtube} aria-label="YouTube" className="p-2 rounded-full bg-ink-800 hover:bg-brand-600 text-white"><Youtube className="w-4 h-4" /></a>}
          </div>
        </div>

        {columns.map((col: any, i: number) => (
          <div key={i}>
            <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {(col.links ?? []).map((l: any, j: number) => (
                <li key={j}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-800">
        <div className="container-tight py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div>{s.copyrightText.replace("©", `© ${new Date().getFullYear()}`)}</div>
          <FooterCountrySwitcher countries={COUNTRIES as any} courseSlugs={courseSlugs} />
        </div>
      </div>
    </footer>
  );
}
