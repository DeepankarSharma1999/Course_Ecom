import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCourses, getCategories } from "@/lib/content";
import { CourseCard } from "@/components/course-card";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} Training & Certification Courses`,
    description: `${cat.tagline}. Globally accredited ${cat.name} training from MindClick.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cats, all] = await Promise.all([getCategories(), getAllCourses()]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const courses = all.filter((c) => c.category.slug === cat.slug);
  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-14">
          <div className="text-sm text-brand-200 mb-2">Category</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{cat.name}</h1>
          <p className="text-brand-100 text-lg max-w-2xl">{cat.tagline}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-tight">
          {courses.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
            </div>
          ) : (
            <div className="text-center text-ink-500 py-12">More courses launching soon in this category.</div>
          )}
        </div>
      </section>
    </>
  );
}
