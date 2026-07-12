import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";

// Course registration: records the learner's request as a *pending* enrollment.
// An admin confirms participation (Admin > Registrations) before the course
// shows up in the learner's dashboard. No payment gateway yet.
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
    update: {}, // already registered: keep its current status
    create: { learnerId: session.sub, courseSlug: course.slug, courseTitle: course.title, priceUsd: 0, status: "pending" },
  });

  return NextResponse.json({
    ok: true,
    enrollment: { courseSlug: enrollment.courseSlug, createdAt: enrollment.createdAt, status: enrollment.status },
  });
}
