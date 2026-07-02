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

          {/* Webinars */}
          <section>
              <SectionHeader title="Free Webinars" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link href="/webinars" className="bg-white rounded-2xl border border-ink-100 overflow-hidden group hover:shadow-lg transition-all block">
                  <div className="relative h-[160px]">
                    <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">FREE</div>
                    <img src="/images/vendor/unsplash/photo-1573496359142-b8d87734a5a2.jpg" alt="Agile Leadership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col h-[100px]">
                    <h4 className="font-bold text-[14px] text-ink-900 leading-snug group-hover:text-primary transition-colors">Agile Leadership Bootcamp: Leading in the AI Era</h4>
                  </div>
                </Link>
                <Link href="/webinars" className="bg-white rounded-2xl border border-ink-100 overflow-hidden group hover:shadow-lg transition-all block">
                  <div className="relative h-[160px]">
                    <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">FREE</div>
                    <img src="/images/vendor/unsplash/photo-1560250097-0b93528c311a.jpg" alt="SAFe Agilist" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col h-[100px]">
                    <h4 className="font-bold text-[14px] text-ink-900 leading-snug group-hover:text-primary transition-colors">Become a Certified SAFe® Agilist — and Lead with Confidence</h4>
                  </div>
                </Link>
              </div>
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
