import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";
import { resolveHeroImage } from "@/lib/course-images";
import { ArrowRight } from "lucide-react";
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
      take: 12,
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
    prisma.enrollment.findMany({
      where: { learnerId: learner.sub },
      orderBy: { createdAt: "desc" },
      select: { courseSlug: true, courseTitle: true, status: true },
    }),
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
  const courseBySlug = new Map(courses.map((c) => [c.slug, c]));

  // Only admin-confirmed enrollments unlock content (same rule as /home/lms).
  const continueLearning = enrollments
    .filter((e) => e.status === "confirmed")
    .slice(0, 3)
    .map((e) => ({
      slug: e.courseSlug,
      title: e.courseTitle,
      image: resolveHeroImage(
        courseBySlug.get(e.courseSlug)?.heroImage ?? null,
        e.courseSlug,
        courseBySlug.get(e.courseSlug)?.categorySlug ?? undefined
      ),
    }));

  // Never re-sell what the student already owns.
  const available = courses.filter((c) => !enrolledSlugs.has(c.slug));
  const comboOffers = available.slice(0, 2);
  const newCourses = available.slice(2, 6);

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

          {/* Continue Learning */}
          {continueLearning.length > 0 && (
            <section>
              <SectionHeader title="Continue Learning" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {continueLearning.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/home/lms/${c.slug}`}
                    className="bg-white rounded-2xl border border-ink-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
                  >
                    <div className="h-[120px] bg-ink-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-[14px] text-ink-900 leading-snug mb-3 flex-1">{c.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-primary font-bold text-[13px]">
                        Continue learning <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

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
          <PopularCoursesWidget courses={newCourses} />
        </div>

      </div>
    </div>
  );
}
