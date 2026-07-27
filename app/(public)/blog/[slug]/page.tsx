import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, BookOpen, ChevronLeft, User, ChevronRight, List, Linkedin, Twitter, MessageCircle } from "lucide-react";
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

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

/** Decorate stored article HTML: h2 anchor ids (+TOC), lead paragraph,
 *  styled table wrappers, numbered-list offsets, FAQ h3/p pairs → accordions. */
function decorate(html: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  let out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugify(text) || `section-${toc.length + 1}`;
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // First paragraph becomes the visual lead.
  out = out.replace(/<p>/, '<p class="lead-para">');

  // Tables get a scrollable, card-styled wrapper.
  out = out.replace(/<table>([\s\S]*?)<\/table>/g, '<div class="table-wrap"><table>$1</table></div>');

  // Numbered lists that continue (start="N") keep their numbering with CSS counters.
  out = out.replace(/<ol start="(\d+)">/g, '<ol start="$1" style="--bp-start:$1">');

  // FAQ section: convert h3 + following <p> into <details> accordions.
  const faqIdx = out.search(/<h2 id="[^"]*"[^>]*>\s*Frequently asked questions/i);
  if (faqIdx !== -1) {
    const head = out.slice(0, faqIdx);
    let tail = out.slice(faqIdx);
    tail = tail.replace(
      /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g,
      '<details class="faq-item"><summary>$1</summary><p>$2</p></details>'
    );
    out = head + tail;
  }

  return { html: out, toc };
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

  const { html, toc } = decorate(b.content);

  const [relatedCourses, relatedPosts] = await Promise.all([
    Promise.all(b.relatedCourseSlugs.map((s) => getCourseBySlug(s))).then((cs) =>
      cs.filter((c): c is NonNullable<typeof c> => !!c)
    ),
    b.category
      ? prisma.blog
          .findMany({
            where: { isPublished: true, category: b.category, slug: { not: slug } },
            orderBy: { publishedAt: "desc" },
            take: 3,
            select: { slug: true, title: true, heroImage: true, readMins: true, publishedAt: true },
          })
          .catch(() => [])
      : Promise.resolve([]),
  ]);

  const pageUrl = `${SITE.url}/blog/${slug}`;
  const share = [
    { label: "LinkedIn", Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
    { label: "X", Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(b.title)}` },
    { label: "WhatsApp", Icon: MessageCircle, href: `https://wa.me/?text=${encodeURIComponent(`${b.title} ${pageUrl}`)}` },
  ];

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
      mainEntityOfPage: pageUrl,
      // image is required for Article/BlogPosting rich-result eligibility —
      // absolute URL, falling back to the site logo when a post has no hero.
      image: [b.heroImage ? (b.heroImage.startsWith("http") ? b.heroImage : `${SITE.url}${b.heroImage}`) : `${SITE.url}/logo.png`],
      ...(b.tags.length ? { keywords: b.tags.join(", ") } : {}),
    },
    breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: "Blog", url: `${SITE.url}/blog` },
      { name: b.title, url: pageUrl },
    ]),
  ];

  const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <main className="min-h-screen bg-ink-50 pb-16">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      {/* Header band */}
      <section className="bg-gradient-to-br from-[#082032] to-[#0E7C7C] pb-24 pt-10 text-white">
        <div className="container-tight max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white hover:underline">Blog</Link>
            {b.category && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/blog?category=${encodeURIComponent(b.category)}`} className="hover:text-white hover:underline">{b.category}</Link>
              </>
            )}
          </nav>
          {b.category && (
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
              {b.category}
            </span>
          )}
          <h1 className="mb-6 max-w-4xl text-3xl font-extrabold leading-tight md:text-4xl lg:text-[2.6rem]">{b.title}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            {b.author && (
              <span className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"><User className="h-4 w-4" /></span>
                <span className="font-semibold text-white">{b.author}{b.authorRole ? `, ${b.authorRole}` : ""}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{fmtDate(b.publishedAt)}</span>
            {b.readMins && <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{b.readMins} min read</span>}
          </div>
        </div>
      </section>

      <div className="container-tight -mt-16 max-w-5xl">
        {/* Hero image overlapping the header band */}
        {b.heroImage && (
          <div className="relative mb-10 aspect-[1200/630] overflow-hidden rounded-2xl border border-ink-100 shadow-2xl">
            <Image src={b.heroImage} alt={b.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* Article */}
          <article className="min-w-0 rounded-2xl border border-ink-100 bg-white p-7 shadow-sm md:p-10">
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Share row */}
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-6">
              <span className="text-sm font-bold text-ink-700">Share this article</span>
              {share.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {relatedCourses.length > 0 && (
              <aside className="mt-8 rounded-2xl bg-gradient-to-br from-[#f0faf9] to-white p-6 ring-1 ring-[#1FA8A8]/25">
                <h2 className="mb-4 text-lg font-extrabold text-ink-900">Learn this with a certification</h2>
                <ul className="space-y-3">
                  {relatedCourses.map((c) => (
                    <li key={c.slug} className="flex flex-col gap-2 rounded-xl border border-[#1FA8A8]/25 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <Link href={`/${c.slug}`} className="font-bold text-ink-900 hover:text-primary">
                          {baseCourseTitle(c.title)}
                        </Link>
                        <p className="text-xs text-ink-500">{c.durationLabel}</p>
                      </div>
                      <Link href={`/info/${c.slug}`} className="shrink-0 text-sm font-semibold text-primary hover:underline">
                        Read the certification guide →
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </article>

          {/* Sticky rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {toc.length > 2 && (
                <nav aria-label="Table of contents" className="rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
                  <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold text-ink-900">
                    <List className="h-4 w-4 text-primary" /> In this article
                  </p>
                  <ul className="space-y-1 border-l border-ink-100 text-sm">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-ink-500 transition-colors hover:border-primary hover:text-primary">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {relatedCourses[0] && (
                <div className="overflow-hidden rounded-2xl bg-[#082032] p-6 text-white shadow-lg">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#7DE3E3]">Recommended course</p>
                  <p className="mb-1 text-lg font-extrabold leading-snug">{baseCourseTitle(relatedCourses[0].title)}</p>
                  <p className="mb-4 text-xs text-white/60">{relatedCourses[0].durationLabel}</p>
                  <Link href={`/${relatedCourses[0].slug}`} className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-bold transition-colors hover:bg-primary/90">
                    View course & schedules <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-ink-900">More from {b.category}</h2>
              <Link href={`/blog?category=${encodeURIComponent(b.category!)}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[1200/630] overflow-hidden bg-ink-100">
                    {rp.heroImage && (
                      <Image src={rp.heroImage} alt={rp.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="mb-3 font-bold leading-snug text-ink-900 line-clamp-2 transition-colors group-hover:text-primary">{rp.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-ink-500">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmtDate(rp.publishedAt)}</span>
                      {rp.readMins && <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{rp.readMins} min</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            <ChevronLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}
