import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, BookOpen, ChevronRight, ChevronLeft, FileText, Sparkles, GraduationCap } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const PER_PAGE = 15;

export const metadata: Metadata = {
  title: "Blog — Agile, Scrum, SAFe, Project Management & AI Insights",
  description:
    "Expert articles on Agile, Scrum, SAFe, project management, business analysis, DevOps and AI — certification guides, career advice and practical how-tos from SimpliLEAD trainers.",
  alternates: { canonical: "/blog" },
};

type Search = { category?: string; page?: string };
type Card = {
  slug: string; title: string; category: string | null; excerpt: string | null;
  author: string | null; readMins: number | null; publishedAt: Date; heroImage: string | null;
};

const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function PostCard({ p, priority = false }: { p: Card; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
    >
      <div className="relative aspect-[1200/630] overflow-hidden bg-ink-100">
        {p.heroImage && (
          <Image
            src={p.heroImage}
            alt={p.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {p.category && (
          <span className="mb-3 w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {p.category}
          </span>
        )}
        <h2 className="mb-2 text-lg font-bold leading-snug text-ink-900 line-clamp-2 transition-colors group-hover:text-primary">
          {p.title}
        </h2>
        {p.excerpt && <p className="mb-5 flex-1 text-sm leading-6 text-ink-600 line-clamp-2">{p.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmtDate(p.publishedAt)}</span>
          {p.readMins && <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{p.readMins} min read</span>}
        </div>
      </div>
    </Link>
  );
}

export default async function BlogHub({ searchParams }: { searchParams: Promise<Search> }) {
  const { category, page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1", 10) || 1);

  let posts: Card[] = [];
  let categories: { name: string; count: number }[] = [];
  let total = 0;

  try {
    const where = { isPublished: true, ...(category ? { category } : {}) };
    const [rows, count, cats] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (pageNum - 1) * PER_PAGE,
        take: PER_PAGE + 1, // +1 so page 1 can promote a featured card without shorting the grid
        select: { slug: true, title: true, category: true, excerpt: true, author: true, readMins: true, publishedAt: true, heroImage: true },
      }),
      prisma.blog.count({ where }),
      prisma.blog.groupBy({ by: ["category"], where: { isPublished: true }, _count: true }),
    ]);
    posts = rows;
    total = count;
    categories = cats
      .filter((c): c is typeof c & { category: string } => !!c.category)
      .map((c) => ({ name: c.category, count: c._count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    /* DB unavailable — render empty state */
  }

  const isFirstPage = pageNum === 1;
  const featured = isFirstPage ? posts[0] : undefined;
  const gridPosts = isFirstPage ? posts.slice(1, PER_PAGE + 1) : posts.slice(0, PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const pageHref = (p: number, cat = category) =>
    `/blog${cat || p > 1 ? "?" : ""}${new URLSearchParams({ ...(cat ? { category: cat } : {}), ...(p > 1 ? { page: String(p) } : {}) }).toString()}`;

  return (
    <main className="min-h-screen bg-ink-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#082032] via-[#0B5E5E] to-[#1FA8A8] py-16 text-white">
        <div className="hero-dots absolute inset-0 text-white opacity-20"></div>
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-2xl"></div>
        <div className="container-tight relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-md">
            <FileText className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-semibold">SimpliLEAD Blog</span>
          </div>
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Insights that move your <span className="text-yellow-300">career forward</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/85">
            Practical articles on Agile, Scrum, SAFe, project management, business analysis and AI — written around the certifications we teach.
          </p>
        </div>
      </section>

      <section className="container-tight py-10">
        {/* Category filter */}
        <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${!category ? "border-primary bg-primary text-white shadow-md shadow-primary/25" : "border-ink-200 bg-white text-ink-600 hover:border-primary hover:text-primary"}`}
          >
            All articles
          </Link>
          {categories.map((c) => (
            <Link
              key={c.name}
              href={pageHref(1, c.name)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${category === c.name ? "border-primary bg-primary text-white shadow-md shadow-primary/25" : "border-ink-200 bg-white text-ink-600 hover:border-primary hover:text-primary"}`}
            >
              {c.name} <span className={`ml-1 text-xs ${category === c.name ? "text-white/70" : "text-ink-400"}`}>{c.count}</span>
            </Link>
          ))}
        </nav>

        {posts.length === 0 ? (
          <p className="py-20 text-center text-ink-600">No articles published yet — check back soon.</p>
        ) : (
          <>
            {/* Featured latest post */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group mb-10 grid overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-md transition-all duration-300 hover:shadow-2xl lg:grid-cols-[1.15fr_1fr]"
              >
                <div className="relative aspect-[1200/630] overflow-hidden bg-ink-100 lg:aspect-auto lg:min-h-[340px]">
                  {featured.heroImage && (
                    <Image
                      src={featured.heroImage}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow-700">
                      <Sparkles className="h-3.5 w-3.5" /> Latest
                    </span>
                    {featured.category && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {featured.category}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-3 text-2xl font-extrabold leading-tight text-ink-900 transition-colors group-hover:text-primary md:text-3xl">
                    {featured.title}
                  </h2>
                  {featured.excerpt && <p className="mb-6 text-ink-600 line-clamp-3">{featured.excerpt}</p>}
                  <div className="flex items-center gap-4 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmtDate(featured.publishedAt)}</span>
                    {featured.readMins && <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{featured.readMins} min read</span>}
                    <span className="ml-auto inline-flex items-center gap-1 font-bold text-primary">
                      Read article <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {pageNum > 1 && (
              <Link href={pageHref(pageNum - 1)} rel="prev" className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-primary hover:text-primary">
                <ChevronLeft className="h-4 w-4" /> Prev
              </Link>
            )}
            <span className="px-3 text-sm text-ink-600">Page {pageNum} of {totalPages}</span>
            {pageNum < totalPages && (
              <Link href={pageHref(pageNum + 1)} rel="next" className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-primary hover:text-primary">
                Next <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </nav>
        )}

        {/* CTA banner */}
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#082032] p-8 text-white shadow-2xl md:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">Ready to turn reading into a credential?</h2>
              <p className="text-white/75">
                Every article here maps to a live, instructor-led certification course — CSM, PMP, Leading SAFe, and 200 more.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/courses" className="btn inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-white transition-colors hover:bg-primary/90">
                <GraduationCap className="h-5 w-5" /> Explore courses
              </Link>
              <Link href="/enquire" className="btn rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition-colors hover:bg-white/20">
                Talk to an advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
