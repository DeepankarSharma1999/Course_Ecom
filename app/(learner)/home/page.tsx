import { prisma } from "@/lib/prisma";
import { WelcomeBanner } from "@/components/learner/welcome-banner";
import { ReferralBanner } from "@/components/learner/referral-banner";
import { ComboOfferCard, FreeCourseCard, SectionHeader } from "@/components/learner/dashboard-widgets";
import { GiftVoucherBanner } from "@/components/learner/gift-voucher";
import { UpcomingWebinarsCalendar } from "@/components/learner/upcoming-webinars-calendar";
import { AiAssistantWidget } from "@/components/learner/ai-assistant-widget";
import { PopularCoursesWidget, LatestBlogsWidget } from "@/components/learner/sidebar-widgets";

export const dynamic = "force-dynamic";

export default async function LearnerDashboardPage() {
  // Fetch some courses for the dashboard
  const rawCourses = await prisma.course.findMany({
    take: 8,
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      heroImage: true,
      basePriceInr: true,
      category: { select: { slug: true } },
    }
  });
  // Flatten the category relation to a categorySlug field for the dashboard widgets.
  const courses = rawCourses.map((c) => ({
    slug: c.slug,
    title: c.title,
    heroImage: c.heroImage,
    basePriceInr: c.basePriceInr,
    categorySlug: c.category?.slug ?? null,
  }));

  const comboOffers = courses.slice(0, 2);
  const freeCourses = courses.slice(2, 4);
  const popularCourses = courses.slice(4, 8);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col xl:flex-row gap-8">

        {/* Main Content Area */}
        <div className="flex-1 space-y-12">

          {/* Top Banners */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WelcomeBanner />
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

          {/* Free Courses & Events Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <SectionHeader title="Free Courses For You" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {freeCourses.map(course => (
                  <FreeCourseCard key={course.slug} course={course} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Upcoming Events" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Event Cards (Static placeholders matching FreeCourseCard style) */}
                <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden group hover:shadow-lg transition-all">
                  <div className="relative h-[160px]">
                    <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">FREE</div>
                    <img src="/images/vendor/unsplash/photo-1573496359142-b8d87734a5a2.jpg" alt="Agile Leadership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col h-[100px]">
                    <h4 className="font-bold text-[14px] text-ink-900 leading-snug">Agile Leadership Bootcamp: Leading in the AI Era</h4>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden group hover:shadow-lg transition-all">
                  <div className="relative h-[160px]">
                    <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">FREE</div>
                    <img src="/images/vendor/unsplash/photo-1560250097-0b93528c311a.jpg" alt="SAFe Agilist" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col h-[100px]">
                    <h4 className="font-bold text-[14px] text-ink-900 leading-snug">Become a Certified SAFe® Agilist — and Lead with Confidence</h4>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full xl:w-[320px] 2xl:w-[380px] shrink-0 space-y-6">
          <AiAssistantWidget />
          <UpcomingWebinarsCalendar />
          <PopularCoursesWidget courses={popularCourses} />
          <LatestBlogsWidget />
        </div>

      </div>
    </div>
  );
}
