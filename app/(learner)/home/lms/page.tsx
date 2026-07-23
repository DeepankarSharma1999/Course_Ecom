import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";
import { resolveHeroImage } from "@/lib/course-images";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LmsPage() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  // Only admin-confirmed registrations unlock course content.
  const enrollments = await prisma.enrollment.findMany({
    where: { learnerId: learner.sub, status: "confirmed" },
    orderBy: { createdAt: "desc" },
  });

  // Pull course art + category for the enrolled courses in one query.
  const courses = enrollments.length
    ? await prisma.course.findMany({
        where: { slug: { in: enrollments.map((e) => e.courseSlug) } },
        select: { slug: true, heroImage: true, durationLabel: true, category: { select: { name: true, slug: true } } },
      })
    : [];
  const bySlug = new Map(courses.map((c) => [c.slug, c]));

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900 mb-1">My Learning</h1>
        <p className="text-ink-500 text-[14px]">Courses you are enrolled in.</p>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-bold text-ink-900 text-[16px] mb-1.5">You haven&apos;t enrolled in anything yet</h2>
          <p className="text-[14px] text-ink-500 mb-6">Browse the catalog to find your first course.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/courses" className="inline-flex items-center gap-2 bg-primary hover:bg-[#0f6b6b] text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-[14px]">
              <BookOpen className="w-4 h-4" /> Browse catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrollments.map((e) => {
            const c = bySlug.get(e.courseSlug);
            const img = resolveHeroImage(c?.heroImage ?? null, e.courseSlug, c?.category?.slug);
            return (
              <div key={e.id} className="bg-white rounded-2xl border border-ink-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
                <div className="relative h-[150px] bg-ink-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={e.courseTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Enrolled
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-ink-400 mb-1">{c?.category?.name ?? "Course"}</div>
                  <h3 className="font-bold text-[15px] text-ink-900 leading-snug mb-3 flex-1">{e.courseTitle}</h3>
                  <div className="text-[12px] text-ink-500 mb-4">
                    Enrolled {e.createdAt.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    {c?.durationLabel ? ` • ${c.durationLabel}` : ""}
                  </div>
                  <Link
                    href={`/home/lms/${e.courseSlug}`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-2.5 rounded-lg transition-colors text-[13px]"
                  >
                    Continue learning <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
