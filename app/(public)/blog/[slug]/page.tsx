import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, BookOpen, ChevronLeft, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SITE, baseCourseTitle } from "@/lib/utils";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getCourseBySlug } from "@/lib/content";

export const revalidate = 60;

async function getBlog(slug: string) {
  try {
    const b = await prisma.blog.findUnique({ where: { slug } });
    return b && b.isPublished ? b : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBlog(slug);
  if (!b) return {};
  return {
    title: b.seoTitle || b.title,
    description: b.seoDescription || b.excerpt || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${b.seoTitle || b.title} | ${SITE.name}`,
      description: b.seoDescription || b.excerpt || undefined,
      url: `${SITE.url}/blog/${slug}`,
      type: "article",
      ...(b.heroImage ? { images: [b.heroImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = await getBlog(slug);
  if (!b) notFound();

  const relatedCourses = (
    await Promise.all(b.relatedCourseSlugs.map((s) => getCourseBySlug(s)))
  ).filter((c): c is NonNullable<typeof c> => !!c);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: b.title,
      description: b.excerpt || undefined,
      datePublished: b.publishedAt.toISOString(),
      dateModified: b.updatedAt.toISOString(),
      author: { "@type": b.author ? "Person" : "Organization", name: b.author || SITE.name },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      mainEntityOfPage: `${SITE.url}/blog/${slug}`,
      // image is required for Article/BlogPosting rich-result eligibility —
      // absolute URL, falling back to the site logo when a post has no hero.
      image: [b.heroImage ? (b.heroImage.startsWith("http") ? b.heroImage : `${SITE.url}${b.heroImage}`) : `${SITE.url}/logo.png`],
      ...(b.tags.length ? { keywords: b.tags.join(", ") } : {}),
    },
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: "Blog", url: `${SITE.url}/blog` },
      { name: b.title, url: `${SITE.url}/blog/${slug}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-ink-50 py-12">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <article className="container-tight max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" /> All articles
        </Link>
        {b.category && (
          <div className="mb-4">
            <Link href={`/blog?category=${encodeURIComponent(b.category)}`} className="text-[11px] font-bold uppercase tracking-wider bg-ink-100 text-ink-600 px-2.5 py-1 rounded-sm inline-block hover:bg-ink-200 transition-colors">
              {b.category}
            </Link>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-4">{b.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-500 mb-8 pb-8 border-b border-ink-100">
          {b.author && (
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {b.author}{b.authorRole ? `, ${b.authorRole}` : ""}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> {b.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {b.readMins && (
            <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {b.readMins} min read</span>
          )}
        </div>
        <div className="prose prose-ink max-w-none" dangerouslySetInnerHTML={{ __html: b.content }} />

        {relatedCourses.length > 0 && (
          <aside className="mt-10 pt-8 border-t border-ink-100">
            <h2 className="font-bold text-lg text-ink-900 mb-4">Learn this with a certification</h2>
            <ul className="space-y-3">
              {relatedCourses.map((c) => (
                <li key={c.slug} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-[#f0faf9] border border-[#1FA8A8]/30 rounded-xl p-4">
                  <div>
                    <Link href={`/${c.slug}`} className="font-semibold text-ink-900 hover:text-primary">
                      {baseCourseTitle(c.title)}
                    </Link>
                    <p className="text-xs text-ink-500">{c.durationLabel}</p>
                  </div>
                  <Link href={`/info/${c.slug}`} className="text-sm font-semibold text-primary hover:underline shrink-0">
                    Read the certification guide →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
}
