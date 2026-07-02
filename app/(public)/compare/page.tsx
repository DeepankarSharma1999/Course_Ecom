import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCourses } from "@/lib/content";
import { getPageContent } from "@/lib/page-content";
import { ComparePicker } from "@/components/compare-picker";

const SLUG = "compare";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function ComparePage() {
  const [courses, c] = await Promise.all([getAllCourses(), getPageContent(SLUG)]);
  const suggested: { a: string; b: string }[] = (c.suggested as any) ?? [];
  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-14">
          <div className="badge mb-3 bg-white/10 text-white border border-white/20">{c.heroBadge}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{c.heroHeading}</h1>
          <p className="text-brand-100 text-lg max-w-2xl">{c.heroSubtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="card p-6 mb-10">
            <ComparePicker courses={courses.map((c) => ({ slug: c.slug, title: c.shortTitle }))} />
          </div>

          <h2 className="h3 mb-4">{c.popularTitle}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {suggested.map(({ a, b }) => {
              const A = courses.find((c) => c.slug === a); const B = courses.find((c) => c.slug === b);
              if (!A || !B) return null;
              return (
                <Link key={`${a}-${b}`} href={`/compare/${a}-vs-${b}`} className="card p-5 hover:shadow-card-lg transition-all flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-semibold">{A.shortTitle} <span className="text-ink-400 font-normal">vs</span> {B.shortTitle}</div>
                    <div className="text-xs text-ink-500 mt-1">Compare side-by-side</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
