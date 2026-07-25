import Link from "next/link";
import { ChevronRight, CheckCircle2, Star, Clock, Award } from "lucide-react";
import type { CourseContent } from "@/lib/seed-data";
import type { CourseGuide, GuideSection } from "@/lib/course-guide";

// Server-rendered guide page: sticky TOC, question-form H2 sections, course CTA
// cards and related guides. No client JS — these ~200 pages are pure SEO
// surface and should be as light as possible.

function CtaCard({ course, guideName }: { course: CourseContent; guideName: string }) {
  return (
    <div className="card bg-white border border-border/60 shadow-sm p-6 md:p-8 my-10 flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex-1">
        <p className="text-sm font-semibold text-primary mb-1">Live instructor-led training</p>
        <h3 className="font-bold text-xl text-foreground mb-2">{guideName}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{course.durationLabel}</span>
          {course.ratingCount > 0 && (
            <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{course.ratingAvg} ({course.ratingCount.toLocaleString()} ratings)</span>
          )}
          {course.examIncluded && <span className="inline-flex items-center gap-1"><Award className="w-4 h-4" />Exam fee included</span>}
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
        <p className="text-2xl font-extrabold text-foreground">₹{course.basePriceInr.toLocaleString("en-IN")}</p>
        <Link href={`/${course.slug}`} className="btn bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-bold rounded-md inline-flex items-center gap-2">
          View course & schedules
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function Section({ s }: { s: GuideSection }) {
  return (
    <section id={s.id} className="scroll-mt-28 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{s.heading}</h2>
      {s.html && (
        <div className="prose prose-ink max-w-none text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: s.html }} />
      )}
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
      ))}
      {s.bullets && (
        <ul className="space-y-2.5 mb-4">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{b}</span>
            </li>
          ))}
        </ul>
      )}
      {s.facts && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border/60 rounded-lg overflow-hidden">
            <tbody>
              {s.facts.map((f, i) => (
                <tr key={i} className={i % 2 ? "bg-white" : "bg-ink-50"}>
                  <th scope="row" className="text-left font-semibold text-foreground p-3 w-48 align-top">{f.label}</th>
                  <td className="p-3 text-muted-foreground">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.modules && (
        <ol className="space-y-4">
          {s.modules.map((m, i) => (
            <li key={i} className="card bg-white border border-border/50 p-5">
              <p className="font-bold text-foreground mb-2">Module {i + 1}: {m.title}</p>
              {m.topics.length > 0 && (
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  {m.topics.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function CourseGuideContent({
  guide,
  course,
  related,
}: {
  guide: CourseGuide;
  course: CourseContent;
  related: { slug: string; name: string }[];
}) {
  const midpoint = Math.min(2, guide.sections.length - 1); // CTA after eligibility-ish sections

  return (
    <main className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-14">
        <div className="container-tight">
          <nav aria-label="Breadcrumb" className="text-sm text-primary-foreground/80 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/courses" className="hover:underline">Courses</Link>
            <span className="mx-2">/</span>
            <span>{guide.name} Guide</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-4xl leading-tight mb-4">
            {guide.name} Certification Guide: Syllabus, Eligibility, Exam & Cost
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-3xl">{course.summary}</p>
        </div>
      </section>

      <div className="container-tight py-12 grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 text-sm">
            <p className="font-bold text-foreground mb-3">On this page</p>
            <ul className="space-y-2 border-l border-border/60">
              {guide.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block pl-4 -ml-px border-l-2 border-transparent text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    {s.heading}
                  </a>
                </li>
              ))}
              {guide.faqs.length > 0 && (
                <li>
                  <a href="#faqs" className="block pl-4 -ml-px border-l-2 border-transparent text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    Frequently asked questions
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </aside>

        <article>
          {guide.sections.map((s, i) => (
            <div key={s.id}>
              <Section s={s} />
              {i === midpoint && <CtaCard course={course} guideName={guide.name} />}
            </div>
          ))}

          {guide.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {guide.faqs.map((f, i) => (
                  <details key={i} className="card bg-white border border-border/50 p-5 group">
                    <summary className="font-semibold text-foreground cursor-pointer list-none flex items-start justify-between gap-4">
                      {f.q}
                      <ChevronRight className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="text-muted-foreground leading-relaxed mt-3">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <CtaCard course={course} guideName={guide.name} />

          {related.length > 0 && (
            <section className="mt-4">
              <h2 className="text-xl font-bold text-foreground mb-4">Related certification guides</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/info/${r.slug}`} className="card block bg-ink-50 hover:bg-white border border-border/50 p-4 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      {r.name} Guide
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
