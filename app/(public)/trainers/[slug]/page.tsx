import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, Linkedin, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/course-card";
import { LeadForm } from "@/components/lead-form";
import { SITE } from "@/lib/utils";
import { getAllCourses } from "@/lib/content";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const ts = await prisma.trainer.findMany({ where: { isActive: true } });
    return ts.map((t) => ({ slug: t.slug }));
  } catch { return []; }
}

async function getTrainer(slug: string) {
  try {
    return await prisma.trainer.findUnique({
      where: { slug },
      include: { courses: { include: { course: { include: { category: true } } } } },
    });
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTrainer(slug);
  if (!t) return {};
  return {
    title: `${t.name} — ${t.title ?? "Trainer"}`,
    description: t.bio?.slice(0, 160) ?? `Learn from ${t.name} at MindClick.`,
    openGraph: { title: `${t.name} | MindClick`, description: t.bio?.slice(0, 160) ?? "", images: t.photo ? [t.photo] : [], url: `${SITE.url}/trainers/${slug}` },
  };
}

export default async function TrainerDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTrainer(slug);
  if (!t) notFound();

  const allCourses = await getAllCourses();
  const assignedSlugs = t.courses.map((ct) => ct.course.slug);
  const courses = allCourses.filter((c) => assignedSlugs.includes(c.slug));

  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-14 grid lg:grid-cols-[200px_1fr] gap-8 items-center">
          {t.photo ? <img src={t.photo} alt={t.name} className="w-40 h-40 rounded-full object-cover border-4 border-white/20" /> : <div className="w-40 h-40 rounded-full bg-white/10 grid place-items-center text-5xl font-bold">{t.name.charAt(0)}</div>}
          <div>
            <div className="text-sm text-brand-200 mb-2">Trainer</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{t.name}</h1>
            <p className="text-brand-100 text-lg mb-4">{t.title}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-brand-100">
              {t.rating && <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent-500 text-accent-500" /> {t.rating} ({t.reviews ?? 0} reviews)</span>}
              {t.experienceYears && <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {t.experienceYears}+ years</span>}
              {t.linkedinUrl && <a href={t.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><Linkedin className="w-4 h-4" /> LinkedIn</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <h2 className="h3 mb-3">About {t.name.split(" ")[0]}</h2>
            <p className="text-ink-700 leading-relaxed whitespace-pre-line mb-8">{t.bio}</p>

            {Array.isArray(t.expertise) && (t.expertise as string[]).length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-ink-900 mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {(t.expertise as string[]).map((x) => <span key={x} className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium">{x}</span>)}
                </div>
              </div>
            )}

            {Array.isArray(t.certifications) && (t.certifications as string[]).length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-ink-900 mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {(t.certifications as string[]).map((x) => <span key={x} className="px-3 py-1 rounded-lg bg-ink-100 text-ink-800 text-sm font-medium">{x}</span>)}
                </div>
              </div>
            )}

            {courses.length > 0 && (
              <div className="mt-10">
                <h3 className="font-semibold text-ink-900 mb-4">Courses delivered by {t.name.split(" ")[0]}</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
                </div>
              </div>
            )}
          </div>
          <aside className="lg:sticky lg:top-24 self-start">
            <LeadForm variant="card" title="Train with this expert" subtitle="Request a callback or join the next batch." source={`trainer-${slug}`} />
            <Link href="/trainers" className="text-sm text-brand-600 hover:underline mt-4 block">← All trainers</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
