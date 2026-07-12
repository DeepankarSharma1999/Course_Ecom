import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";
import { resolveHeroImage } from "@/lib/course-images";
import { ArrowLeft, Video, Calendar, Clock, ExternalLink, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LearnerCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  const { slug } = await params;

  // Must be enrolled AND admin-confirmed to see the classroom (the meeting link is learner-only).
  const enrollment = await prisma.enrollment.findUnique({
    where: { learnerId_courseSlug: { learnerId: learner.sub, courseSlug: slug } },
  });
  if (!enrollment || enrollment.status !== "confirmed") redirect("/home/lms");

  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      slug: true, title: true, shortTitle: true, summary: true, heroImage: true,
      durationLabel: true, meetingUrl: true,
      category: { select: { name: true, slug: true } },
      schedules: {
        where: { startDate: { gte: new Date() } },
        orderBy: { startDate: "asc" },
        take: 3,
      },
    },
  });
  if (!course) notFound();

  const img = resolveHeroImage(course.heroImage, course.slug, course.category?.slug);
  const nextSession = course.schedules[0];

  return (
    <div className="p-8 max-w-[900px] mx-auto space-y-6">
      <Link href="/home/lms" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> My Learning
      </Link>

      {/* Course header */}
      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden">
        <div className="relative h-[200px] bg-ink-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">{course.category?.name ?? "Course"}</div>
            <h1 className="text-2xl font-extrabold leading-tight">{course.title}</h1>
          </div>
        </div>

        {/* Join live class */}
        <div className="p-6">
          {course.meetingUrl ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-ink-900 text-[16px]">Your live class is ready</h2>
                <p className="text-[13px] text-ink-600">Join at the scheduled batch time using the button — the link stays the same for every session.</p>
              </div>
              <a
                href={course.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-[14px] shrink-0"
              >
                <Video className="w-4 h-4" /> Join Live Class <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h2 className="font-bold text-ink-900 text-[16px]">Meeting link coming soon</h2>
                <p className="text-[13px] text-ink-600">Your trainer will publish the live-class link before the batch starts — check back here or watch your email.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming sessions for this course */}
      {course.schedules.length > 0 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
          <h2 className="font-bold text-ink-900 text-[16px] mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Upcoming batch dates
          </h2>
          <div className="space-y-3">
            {course.schedules.map((s) => (
              <div key={s.id} className={`flex items-center gap-4 rounded-xl border p-4 ${s === nextSession ? "border-primary/40 bg-primary/5" : "border-ink-100"}`}>
                <div className="w-12 shrink-0 rounded-lg bg-white border border-ink-100 text-center py-1.5">
                  <div className="text-[16px] font-black text-ink-900 leading-none">{s.startDate.getDate()}</div>
                  <div className="text-[9px] font-bold uppercase text-ink-500 mt-0.5">{s.startDate.toLocaleDateString("en-US", { month: "short" })}</div>
                </div>
                <div className="flex-1 text-[13px] text-ink-700 font-medium">
                  {s.startDate.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  <div className="flex items-center gap-1.5 text-[12px] text-ink-500 mt-0.5">
                    <Clock className="w-3 h-3" /> {s.timeLabel || "Timing shared by email"} {s.timezone ? `(${s.timezone})` : ""} • {s.mode}
                  </div>
                </div>
                {s === nextSession && <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">Next</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course details link */}
      <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="font-bold text-ink-900 text-[16px] mb-1">Course curriculum & details</h2>
          <p className="text-[13px] text-ink-500">{course.summary}</p>
        </div>
        <Link
          href={`/${course.slug}`}
          className="inline-flex items-center justify-center gap-2 border border-ink-200 hover:border-primary hover:text-primary text-ink-700 font-bold px-5 py-2.5 rounded-xl transition-colors text-[13px] shrink-0"
        >
          <BookOpen className="w-4 h-4" /> View full course page
        </Link>
      </div>
    </div>
  );
}
