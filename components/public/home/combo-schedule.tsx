import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { courseBadge, DEFAULT_BADGE } from "@/lib/course-badge";
import { formatInCurrency, type CurrencyCode, type CurrencyConfig } from "@/lib/currency";

// ponytail: combos are just courses in the "combo-courses" category, managed from
// the admin Combos section. No classification tabs — render them all in one grid.
export function ComboSchedule({ combos, currency = "USD", currencies }: { combos: any[]; currency?: CurrencyCode; currencies?: CurrencyConfig[] }) {
  if (!combos || combos.length === 0) return null;

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

        <div className="grid gap-6 lg:grid-cols-3">
          {combos.map((combo) => {
            const badges = comboBadges(combo.slug, combo.title);
            return (
              <article
                key={combo.slug}
                className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_8px_24px_rgba(8,32,50,0.05)] transition-all duration-200 hover:-translate-y-1 ${
                  combo.isFeatured ? "border-primary/40 ring-4 ring-primary/10" : "border-[#082032]/10"
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {badges.map((badge, i) => (
                      <div
                        key={i}
                        className="grid h-12 w-12 place-items-center rounded-xl border border-[#082032]/10 bg-white p-1"
                        title={badge.name}
                      >
                        <Image
                          src={badge.src}
                          alt={badge.name}
                          width={40}
                          height={40}
                          className="h-auto max-h-10 w-auto max-w-10 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  {combo.isFeatured && <span className="accent-badge">Recommended</span>}
                </div>

                <h3 className="mb-4 min-h-14 text-lg font-black leading-snug text-[#082032]">{combo.shortTitle || combo.title}</h3>

                {/* FIX-02: fake slug-derived "k enrolled" count removed */}
                <div className="mb-5 flex flex-wrap gap-3 text-sm font-semibold text-muted-foreground">
                  <span>Live Classroom</span>
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
                    <span className="text-2xl font-black text-[#082032]">
                      {combo.basePriceUsd ? formatInCurrency(combo.basePriceUsd, currency, currencies) : "Enquire"}
                    </span>
                  </div>
                  <Link href={`/${combo.slug}`} className="btn-primary mt-4 w-full">
                    Enroll Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type Badge = { name: string; src: string };

// Which two courses each bundle is made of, so the cards can show the official
// credential badge (CSM, PMP, …) that lib/course-badge.ts already holds for
// every course. Combo titles don't match course titles textually — "PMP
// Certification Training" vs "Project Management Professional (PMP®)
// Certification Training" — so the pairing is stated rather than guessed; a
// wrong guess would put an official badge on a credential it doesn't award.
// Add a row when a new combo is created in admin; until then it falls back to
// the SimpliLEAD mark.
const COMBO_COURSES: Record<string, [string, string]> = {
  "pmp-pmi-acp-combo": ["pmp-certification-training", "pmi-acp-certification-training"],
  "csm-cspo-combo": ["csm-certification-training", "cspo-certification-training"],
  "safe-popm-cspo-combo": ["safe-product-owner-product-manager-certification", "cspo-certification-training"],
  "ssm-pmp-combo": ["safe-scrum-master-certification", "pmp-certification-training"],
  "leading-safe-pmp-combo": ["leading-safe-certification-training", "pmp-certification-training"],
};

// Self-issued courses (the AI bundles) carry our own mark — the same branch
// components/course-page/certificate-section.tsx takes. Generated by scripts/mkicon.js.
// PNG not SVG: next/image 400s on SVG unless dangerouslyAllowSVG is enabled,
// which is also why the "_default-ul.svg" placeholder is treated as "no badge".
const SELF_ISSUED: Badge = { name: "SimpliLEAD", src: "/certifications/simplilead.png" };

// One badge per bundled credential, named after the leg of the combo title it
// came from ("PMP Certification Training" & "PMI-ACP Certification Training").
export function comboBadges(slug: string, title: string): Badge[] {
  const legs = title.split(/\s*[&+]\s*|\s+and\s+/i).slice(0, 2).map((l) => l.trim());
  const courses = COMBO_COURSES[slug];
  return legs.map((name, i) => {
    const src = courses ? courseBadge(courses[i]) : DEFAULT_BADGE;
    return src === DEFAULT_BADGE ? { ...SELF_ISSUED, name } : { name, src };
  });
}
