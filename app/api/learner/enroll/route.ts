import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";
import { createPaymentIntent, syncPayment, ziinaEnabled } from "@/lib/ziina";

// Course registration: records the learner's request as a *pending* enrollment
// and, when the course has a price and Ziina is configured, returns a hosted
// checkout URL to pay for it. Payment does not unlock the course by itself —
// an admin still confirms participation (Admin > Registrations).
export async function POST(req: Request) {
  const session = await getCurrentLearner();
  if (!session) return NextResponse.json({ error: "Please log in first." }, { status: 401 });

  const { courseSlug = "" } = await req.json().catch(() => ({}));
  if (!courseSlug || typeof courseSlug !== "string") {
    return NextResponse.json({ error: "Missing courseSlug." }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: {
      slug: true, title: true, isPublished: true, basePriceUsd: true,
      // Same "next batch" price the course page advertises.
      schedules: { where: { startDate: { gte: new Date() } }, orderBy: { startDate: "asc" }, take: 1 },
    },
  });
  if (!course || !course.isPublished) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  let enrollment = await prisma.enrollment.upsert({
    where: { learnerId_courseSlug: { learnerId: session.sub, courseSlug: course.slug } },
    update: {}, // already registered: keep its current status
    create: { learnerId: session.sub, courseSlug: course.slug, courseTitle: course.title, priceUsd: 0, status: "pending" },
  });

  const next = course.schedules[0];
  const priceUsd = Math.round(((next?.priceUsd || course.basePriceUsd) ?? 0) * (1 - (next?.discountPct ?? 0) / 100));

  let redirectUrl: string | undefined;
  if (ziinaEnabled() && priceUsd > 0) {
    try {
      // An earlier checkout may have completed without the learner returning
      // to the site — check before charging them a second time.
      if (!(await syncPayment(enrollment))) {
        const origin = new URL(req.url).origin;
        const intent = await createPaymentIntent({
          amountUsd: priceUsd,
          message: course.title,
          successUrl: `${origin}/api/learner/payment/return?e=${enrollment.id}`,
          cancelUrl: `${origin}/register?course=${course.slug}&payment=cancelled`,
        });
        enrollment = await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: { paymentId: intent.id, priceUsd },
        });
        redirectUrl = intent.redirect_url;
      }
    } catch (err) {
      console.error("[enroll] Ziina error", err);
      return NextResponse.json({ error: "We couldn't start the payment. Please try again in a moment." }, { status: 502 });
    }
  }

  return NextResponse.json({
    ok: true,
    redirectUrl,
    enrollment: { courseSlug: enrollment.courseSlug, createdAt: enrollment.createdAt, status: enrollment.status },
  });
}
