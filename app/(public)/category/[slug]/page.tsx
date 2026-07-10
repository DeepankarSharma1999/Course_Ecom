import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCourses, getCategories } from "@/lib/content";
import { getDisplayCurrency, getCurrencyConfig } from "@/lib/geo";
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
    description: `${cat.tagline}. Globally accredited ${cat.name} training from Simplilead.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cats, all, currency, currencyCfg] = await Promise.all([getCategories(), getAllCourses(), getDisplayCurrency(), getCurrencyConfig()]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const courses = all.filter((c) => c.category.slug === cat.slug);
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#0f6b6b] text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
        <div className="container-tight py-16 lg:py-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
            Category
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">{cat.name}</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">{cat.tagline}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-tight">
          {courses.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => <CourseCard key={c.slug} course={c} currency={currency} currencies={currencyCfg.currencies} />)}
            </div>
          ) : (
            <div className="text-center text-ink-500 py-12">More courses launching soon in this category.</div>
          )}
        </div>
      </section>
    </>
  );
}
