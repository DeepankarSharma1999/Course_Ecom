import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";
import { WelcomeBanner } from "@/components/learner/welcome-banner";
import { ReferralBanner } from "@/components/learner/referral-banner";
import { ComboOfferCard, SectionHeader } from "@/components/learner/dashboard-widgets";
import { GiftVoucherBanner } from "@/components/learner/gift-voucher";
import { PopularCoursesWidget } from "@/components/learner/sidebar-widgets";

export const dynamic = "force-dynamic";

export default async function LearnerDashboardPage() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  const [rawCourses, enrollments] = await Promise.all([
    prisma.course.findMany({
      take: 8,
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: {
        slug: true,
        title: true,
        heroImage: true,
        basePriceUsd: true,
        ratingAvg: true,
        category: { select: { slug: true } },
      },
    }),
    prisma.enrollment.findMany({ where: { learnerId: learner.sub }, select: { courseSlug: true } }),
  ]);

  const enrolledSlugs = new Set(enrollments.map((e) => e.courseSlug));
  const courses = rawCourses.map((c) => ({
    slug: c.slug,
    title: c.title,
    heroImage: c.heroImage,
    basePriceUsd: c.basePriceUsd,
    ratingAvg: c.ratingAvg,
    categorySlug: c.category?.slug ?? null,
  }));

  const comboOffers = courses.slice(0, 2);
  const popularCourses = courses.slice(4, 8);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col xl:flex-row gap-8">

        {/* Main Content Area */}
        <div className="flex-1 space-y-12">

          {/* Top Banners */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WelcomeBanner enrolledCount={enrolledSlugs.size} />
            <ReferralBanner />
          </div>

          {/* Combo Offers */}
          <section>
            <SectionHeader title="Combo Offers Made Just for You" />
            <div className="grid grid-cols-1 gap-6">
              {comboOffers.map(course => (
                <ComboOfferCard key={course.slug} course={course} />
              ))}
            </div>
          </section>

          {/* Gift Voucher */}
          <section>
            <GiftVoucherBanner />
          </section>

        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full xl:w-[320px] 2xl:w-[380px] shrink-0 space-y-6">
          <PopularCoursesWidget courses={popularCourses} />
        </div>

      </div>
    </div>
  );
}
