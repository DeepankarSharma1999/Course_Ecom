import { Metadata } from "next";
import Link from "next/link";
import { Calendar, BookOpen, ChevronRight, ChevronLeft, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/utils";

export const revalidate = 60;

const PER_PAGE = 16;

export const metadata: Metadata = {
  title: "Blog — Agile, Scrum, SAFe, Project Management & AI Insights",
  description:
    "Expert articles on Agile, Scrum, SAFe, project management, business analysis, DevOps and AI — certification guides, career advice and practical how-tos from SimpliLEAD trainers.",
  alternates: { canonical: "/blog" },
};

type Search = { category?: string; page?: string };

export default async function BlogHub({ searchParams }: { searchParams: Promise<Search> }) {
  const { category, page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1", 10) || 1);

  let posts: {
    slug: string; title: string; category: string | null; excerpt: string | null;
    author: string | null; readMins: number | null; publishedAt: Date;
  }[] = [];
  let categories: string[] = [];
  let total = 0;

  try {
    const where = { isPublished: true, ...(category ? { category } : {}) };
    const [rows, count, cats] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (pageNum - 1) * PER_PAGE,
        take: PER_PAGE,
        select: { slug: true, title: true, category: true, excerpt: true, author: true, readMins: true, publishedAt: true },
      }),
      prisma.blog.count({ where }),
      prisma.blog.groupBy({ by: ["category"], where: { isPublished: true }, _count: true }),
    ]);
    posts = rows;
    total = count;
    categories = cats.map((c) => c.category).filter((c): c is string => !!c).sort();
  } catch {
    /* DB unavailable — render empty state */
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const pageHref = (p: number, cat = category) =>
    `/blog?${new URLSearchParams({ ...(cat ? { category: cat } : {}), ...(p > 1 ? { page: String(p) } : {}) }).toString()}`.replace(/\?$/, "");

  return (
    <main className="bg-ink-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-14">
        <div className="container-tight">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-5">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-semibold">SimpliLEAD Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Insights that move your career forward
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Practical articles on Agile, Scrum, SAFe, project management, business analysis, DevOps and AI — written around the certifications we teach.
          </p>
        </div>
      </section>

      <section className="container-tight py-10">
        {/* Category filter */}
        <nav aria-label="Blog categories" className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${!category ? "bg-primary text-primary-foreground border-primary" : "bg-white text-ink-600 border-ink-200 hover:border-primary"}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={pageHref(1, c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${category === c ? "bg-primary text-primary-foreground border-primary" : "bg-white text-ink-600 border-ink-200 hover:border-primary"}`}
            >
              {c}
            </Link>
          ))}
        </nav>

        {posts.length === 0 ? (
          <p className="text-ink-600 py-20 text-center">No articles published yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-6 bg-white border border-ink-100 hover:border-primary hover:shadow-card-md transition-all flex flex-col h-full group">
                {p.category && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-ink-100 text-ink-600 px-2.5 py-1 rounded-sm w-fit mb-4">
                    {p.category}
                  </span>
                )}
                <h2 className="font-bold text-lg text-ink-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{p.title}</h2>
                {p.excerpt && <p className="text-ink-600 text-sm mb-5 flex-1 line-clamp-3">{p.excerpt}</p>}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink-100 text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {p.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {p.readMins && (
                    <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />{p.readMins} min read</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-10">
            {pageNum > 1 && (
              <Link href={pageHref(pageNum - 1)} rel="prev" className="btn bg-white border border-ink-200 px-4 py-2 rounded-md text-sm font-semibold inline-flex items-center gap-1 hover:border-primary">
                <ChevronLeft className="w-4 h-4" /> Prev
              </Link>
            )}
            <span className="text-sm text-ink-600 px-3">Page {pageNum} of {totalPages}</span>
            {pageNum < totalPages && (
              <Link href={pageHref(pageNum + 1)} rel="next" className="btn bg-white border border-ink-200 px-4 py-2 rounded-md text-sm font-semibold inline-flex items-center gap-1 hover:border-primary">
                Next <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </nav>
        )}
      </section>
    </main>
  );
}
