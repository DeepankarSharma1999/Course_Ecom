import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";

// Free enrollment: records the learner into the course. Paid checkout can
// replace this later; the Enrollment row shape already carries priceUsd.
export async function POST(req: Request) {
  const session = await getCurrentLearner();
  if (!session) return NextResponse.json({ error: "Please log in first." }, { status: 401 });

  const { courseSlug = "" } = await req.json().catch(() => ({}));
  if (!courseSlug || typeof courseSlug !== "string") {
    return NextResponse.json({ error: "Missing courseSlug." }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: { slug: true, title: true, isPublished: true },
  });
  if (!course || !course.isPublished) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.upsert({
    where: { learnerId_courseSlug: { learnerId: session.sub, courseSlug: course.slug } },
    update: {},
    create: { learnerId: session.sub, courseSlug: course.slug, courseTitle: course.title, priceUsd: 0 },
  });

  return NextResponse.json({ ok: true, enrollment: { courseSlug: enrollment.courseSlug, createdAt: enrollment.createdAt } });
}
