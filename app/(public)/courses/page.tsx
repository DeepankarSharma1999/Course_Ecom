import type { Metadata } from "next";
import { getAllCourses, getCategories } from "@/lib/content";
import { CoursesExplorer } from "@/components/courses-explorer";
import { getDisplayCurrency } from "@/lib/geo";

export const metadata: Metadata = {
  title: "All Certification Training Courses",
  description: "Browse all globally accredited certification courses from MindClick — Agile, SAFe, DevOps, Project Management, ITSM, Quality and more.",
};

export const revalidate = 60;

export default async function CoursesPage() {
  const [COURSES, CATEGORIES, currency] = await Promise.all([getAllCourses(), getCategories(), getDisplayCurrency()]);
  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">All Training Courses</h1>
          <p className="text-brand-100 text-lg max-w-2xl">Globally accredited certification training across {CATEGORIES.length} categories. Live online, classroom and corporate batches.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-tight">
          <CoursesExplorer courses={COURSES} categories={CATEGORIES} currency={currency} />
        </div>
      </section>
    </>
  );
}
