import Link from "next/link";
import { getAllCourses, getCategories } from "@/lib/content";
import { getHomeContent, getSiteSettings } from "@/lib/site-content";
import { getDisplayCurrency } from "@/lib/geo";
import type { Metadata } from "next";

import dynamic from "next/dynamic";

import { HomeHero } from "@/components/public/home/hero";
import { PartnerLogos } from "@/components/public/home/partner-logos";
import { BusinessSectors } from "@/components/public/home/business-sectors";

const CourseGrid = dynamic(() => import("@/components/public/home/course-grid").then(m => m.CourseGrid));
const ComboSchedule = dynamic(() => import("@/components/public/home/combo-schedule").then(m => m.ComboSchedule));
const PedagogySection = dynamic(() => import("@/components/public/home/pedagogy-section").then(m => m.PedagogySection));
const TrainersSection = dynamic(() => import("@/components/public/home/trainers-section").then(m => m.TrainersSection));
const WorldMap = dynamic(() => import("@/components/world-map").then(m => m.WorldMap));
const TestimonialsSlider = dynamic(() => import("@/components/public/home/testimonials-slider").then(m => m.TestimonialsSlider));
const AccoladesSection = dynamic(() => import("@/components/public/home/accolades-section").then(m => m.AccoladesSection));

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [h, s] = await Promise.all([getHomeContent(), getSiteSettings()]);
  return {
    title: h.seoTitle || s.defaultSeoTitle || undefined,
    description: h.seoDescription || s.defaultSeoDescription || undefined,
  };
}

export default async function HomePage() {
  const [COURSES, CATEGORIES, currency] = await Promise.all([
    getAllCourses(),
    getCategories(),
    getDisplayCurrency(),
  ]);

  return (
    <>
      <HomeHero />
      <PartnerLogos />
      
      <BusinessSectors />
      
      <CourseGrid courses={COURSES} categories={CATEGORIES} currency={currency} />
      <ComboSchedule />
      
      <PedagogySection />

      <TrainersSection />

      <TestimonialsSlider />
      
      <AccoladesSection />

      <section className="overflow-hidden bg-[#082032] py-16 font-sans md:py-20">
        <div className="container-tight">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Global reach</div>
              <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
                Training professionals across borders and industries.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
                Join learners and teams using expert-led programs to build capability across Agile, product, project, technology, and AI domains.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  ["120+", "Countries"],
                  ["130+", "Courses"],
                  ["5,000+", "Learners"],
                  ["98%", "Satisfaction"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="text-2xl font-black text-white">{value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wide text-white/70">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/courses" className="btn-primary">Explore Courses</Link>
                <Link href="/corporate-training" className="btn-outline border-white/20 bg-transparent text-white hover:bg-white/10">Corporate Training</Link>
              </div>
            </div>
            <div className="relative opacity-95">
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
          </div>
        </div>
      </section>
    </>
  );
}

