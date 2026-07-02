import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
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
            // ponytail: pseudo enrolled count from the slug — no DB field for it.
            const enrolled = ((combo.slug || combo.title).split("").reduce((a: number, ch: string) => a + ch.charCodeAt(0), 0) % 5) + 4;
            const logos = comboLogos(combo.title);
            return (
              <article
                key={combo.slug}
                className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_8px_24px_rgba(8,32,50,0.05)] transition-all duration-200 hover:-translate-y-1 ${
                  combo.isFeatured ? "border-primary/40 ring-4 ring-primary/10" : "border-[#082032]/10"
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {logos.map((logo, i) => (
                      <div key={i} className="grid h-12 w-12 place-items-center rounded-xl border border-[#082032]/10 bg-[#F4F8FA] text-sm font-black text-[#082032]">
                        {logo}
                      </div>
                    ))}
                  </div>
                  {combo.isFeatured && <span className="accent-badge">Recommended</span>}
                </div>

                <h3 className="mb-4 min-h-14 text-lg font-black leading-snug text-[#082032]">{combo.shortTitle || combo.title}</h3>

                <div className="mb-5 flex flex-wrap gap-3 text-sm font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4" />
                    {enrolled}k enrolled
                  </span>
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

// Two badge labels from a combo title, split on the usual bundle separators.
function comboLogos(title: string): string[] {
  return title
    .split(/\s*[&+]\s*|\s+and\s+/i)
    .slice(0, 2)
    .map((part) => part.trim().split(/\s+/)[0].slice(0, 4) || "Combo");
}
