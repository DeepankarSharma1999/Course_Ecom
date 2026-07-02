import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { getAllCourses, getCourseBySlug } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";
import { formatInCurrency } from "@/lib/currency";
import { LeadForm } from "@/components/lead-form";
import { SITE } from "@/lib/utils";

export const revalidate = 60;

function parsePair(pair: string): [string, string] | null {
  const parts = pair.split("-vs-");
  if (parts.length !== 2) return null;
  return [parts[0], parts[1]];
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  const out: { pair: string }[] = [];
  for (const a of courses) for (const b of courses) if (a.slug !== b.slug) out.push({ pair: `${a.slug}-vs-${b.slug}` });
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params;
  const parts = parsePair(pair);
  if (!parts) return {};
  const [a, b] = await Promise.all([getCourseBySlug(parts[0]), getCourseBySlug(parts[1])]);
  if (!a || !b) return {};
  return {
    title: `${a.shortTitle} vs ${b.shortTitle} — Side-by-Side Comparison`,
    description: `Compare ${a.shortTitle} and ${b.shortTitle} side-by-side. Duration, price, exam, prerequisites and outcomes from Ulearnsystems.`,
    alternates: { canonical: `/compare/${pair}` },
    openGraph: { url: `${SITE.url}/compare/${pair}` },
  };
}

function Row({ label, a, b, highlight }: { label: string; a: React.ReactNode; b: React.ReactNode; highlight?: boolean }) {
  return (
    <tr className={highlight ? "bg-brand-50/40" : ""}>
      <td className="px-4 py-3 text-sm font-medium text-ink-700 border-r border-ink-100 w-1/4">{label}</td>
      <td className="px-4 py-3 text-sm text-ink-800 border-r border-ink-100 align-top">{a}</td>
      <td className="px-4 py-3 text-sm text-ink-800 align-top">{b}</td>
    </tr>
  );
}

function ListCell({ items }: { items: any[] | undefined | null }) {
  if (!items || items.length === 0) return <span className="text-ink-400">—</span>;
  return (
    <ul className="space-y-1">
      {items.slice(0, 6).map((it: any, i: number) => (
        <li key={i} className="flex items-start gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" /><span>{typeof it === "string" ? it : it?.label || it?.title}</span></li>
      ))}
    </ul>
  );
}

export default async function ComparePair({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const parts = parsePair(pair);
  if (!parts) notFound();
  const [a, b, currency, currencyCfg] = await Promise.all([getCourseBySlug(parts[0]), getCourseBySlug(parts[1]), getDisplayCurrency(), getCurrencyConfig()]);
  if (!a || !b) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-12">
          <div className="text-sm text-brand-200 mb-2">Compare</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{a.shortTitle} vs {b.shortTitle}</h1>
          <p className="text-brand-100 max-w-2xl">A side-by-side comparison of two leading certifications to help you choose the right next step for your career.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-ink-50">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase text-ink-500 w-1/4">Attribute</th>
                  <th className="px-4 py-4 text-left">
                    <div className="font-semibold text-ink-900">{a.shortTitle}</div>
                    <Link href={`/${a.slug}`} className="text-xs text-brand-600 hover:underline">View course →</Link>
                  </th>
                  <th className="px-4 py-4 text-left">
                    <div className="font-semibold text-ink-900">{b.shortTitle}</div>
                    <Link href={`/${b.slug}`} className="text-xs text-brand-600 hover:underline">View course →</Link>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <Row label="Category" a={a.category.name} b={b.category.name} />
                <Row label="Duration" a={a.durationLabel} b={b.durationLabel} />
                <Row label="Level" a={a.level} b={b.level} />
                <Row label="Accredited by" a={a.accreditedBy} b={b.accreditedBy} />
                <Row label="Exam fee included" a={a.examIncluded ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />} b={b.examIncluded ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />} />
                <Row label="Price" a={a.basePriceUsd ? formatInCurrency(a.basePriceUsd, currency, currencyCfg.currencies) : "—"} b={b.basePriceUsd ? formatInCurrency(b.basePriceUsd, currency, currencyCfg.currencies) : "—"} highlight />
                <Row label="Rating" a={`${a.ratingAvg}/5 (${a.ratingCount})`} b={`${b.ratingAvg}/5 (${b.ratingCount})`} />
                <Row label="Key features" a={<ListCell items={a.keyFeatures as any} />} b={<ListCell items={b.keyFeatures as any} />} />
                <Row label="Who should attend" a={<ListCell items={a.whoShouldAttend} />} b={<ListCell items={b.whoShouldAttend} />} />
                <Row label="Learning outcomes" a={<ListCell items={a.learningOutcomes} />} b={<ListCell items={b.learningOutcomes} />} />
                <Row label="Prerequisites" a={<ListCell items={a.prerequisites} />} b={<ListCell items={b.prerequisites} />} />
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Link href={`/${a.slug}`} className="btn-primary justify-center">Enroll in {a.shortTitle}</Link>
            <Link href={`/${b.slug}`} className="btn-outline justify-center">Enroll in {b.shortTitle}</Link>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50/40">
        <div className="container-tight grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          <div>
            <h2 className="h3 mb-3">Still not sure which to pick?</h2>
            <p className="text-ink-700 mb-4">Speak with a Ulearnsystems training advisor — we&apos;ll review your career goals, current experience and team context to recommend the right certification path.</p>
            <ul className="space-y-2 text-sm text-ink-700">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5" /> Personalized course recommendation</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5" /> Batch schedule and pricing details</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5" /> Exclusive offers and group discounts</li>
            </ul>
          </div>
          <LeadForm variant="card" title="Get a Personalized Recommendation" subtitle="A training advisor will call you back shortly." source={`compare-${pair}`} />
        </div>
      </section>
    </>
  );
}
