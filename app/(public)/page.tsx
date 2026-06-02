import { getAllCourses, getCategories, getTestimonials } from "@/lib/content";
import { getHomeContent, getSiteSettings, getGlobalFaqs } from "@/lib/site-content";
import { getDisplayCurrency } from "@/lib/geo";
import type { Metadata } from "next";

import { HomeHero } from "@/components/public/home/hero";
import { PartnerLogos } from "@/components/public/home/partner-logos";
import { TrustedCompanies } from "@/components/public/home/trusted-companies";
import { CourseGrid } from "@/components/public/home/course-grid";
import { ComboSchedule } from "@/components/public/home/combo-schedule";
import { BusinessSectors } from "@/components/public/home/business-sectors";
import { BenefitsSection } from "@/components/public/home/benefits-section";
import { TrainersSection } from "@/components/public/home/trainers-section";
import { StatsBanner } from "@/components/public/home/stats-banner";
import { CtaStrip } from "@/components/public/home/cta-strip";
import { WorldMap } from "@/components/world-map";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const h = await getHomeContent();
  return {
    title: h.seoTitle ?? undefined,
    description: h.seoDescription ?? undefined,
  };
}

export default async function HomePage() {
  const [COURSES, CATEGORIES, TESTIMONIALS, h, s, faqs, currency] = await Promise.all([
    getAllCourses(),
    getCategories(),
    getTestimonials(),
    getHomeContent(),
    getSiteSettings(),
    getGlobalFaqs(),
    getDisplayCurrency(),
  ]);
  
  const accreditationLogos = (s.accreditationLogos as { name: string; logoUrl?: string }[] | null) || [];

  return (
    <>
      <HomeHero />
      <PartnerLogos logos={accreditationLogos} />
      
      <TrustedCompanies />
      
      <CourseGrid courses={COURSES} categories={CATEGORIES} currency={currency} />
      
      <ComboSchedule />
      
      <BusinessSectors />
      
      <BenefitsSection />
      
      <TrainersSection />
      
      <StatsBanner />
      
      <CtaStrip />

      {/* World Map Section */}
      <section className="py-16 overflow-hidden font-sans" style={{ background: "#082032" }}>
        <div className="container-tight text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Our courses are famous<br />all over the world.
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto mb-8">
            Sign up for an account and start learning from industry experts globally with one click.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/courses" className="bg-white text-[#082032] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">Get Started</a>
            <a href="/resources" className="bg-transparent border border-white/30 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:border-white transition-colors">Learn More</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 w-full relative mt-12 opacity-90">
          <WorldMap
            lineColor="#1FA8A8"
            dots={[
              { start: { lat: 28.6, lng: 77.2, label: "India" }, end: { lat: 51.5, lng: -0.1, label: "UK" } },
              { start: { lat: 28.6, lng: 77.2, label: "India" }, end: { lat: 40.7, lng: -74.0, label: "USA" } },
              { start: { lat: 28.6, lng: 77.2, label: "India" }, end: { lat: 1.3, lng: 103.8, label: "Singapore" } },
              { start: { lat: 28.6, lng: 77.2, label: "India" }, end: { lat: -33.9, lng: 151.2, label: "Australia" } },
              { start: { lat: 28.6, lng: 77.2, label: "India" }, end: { lat: 35.7, lng: 139.7, label: "Japan" } },
              { start: { lat: 51.5, lng: -0.1, label: "UK" }, end: { lat: 48.8, lng: 2.3, label: "France" } },
              { start: { lat: 40.7, lng: -74.0, label: "USA" }, end: { lat: -23.5, lng: -46.6, label: "Brazil" } },
            ]}
          />
        </div>
      </section>
    </>
  );
}

