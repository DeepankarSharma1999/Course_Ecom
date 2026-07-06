import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, BookOpen, ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

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
  return { title: b.title, description: b.excerpt ?? undefined, alternates: { canonical: `/resources/${slug}` } };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = await getBlog(slug);
  if (!b) notFound();
  return (
    <main className="min-h-screen bg-ink-50 py-12">
      <article className="container-tight max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
        <Link href="/resources#articles" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline mb-6"><ChevronLeft className="w-4 h-4" /> All articles</Link>
        {b.category && <div className="text-[11px] font-bold uppercase tracking-wider bg-ink-100 text-ink-600 px-2.5 py-1 rounded-sm inline-block mb-4">{b.category}</div>}
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-4">{b.title}</h1>
        <div className="flex items-center gap-4 text-xs text-ink-500 mb-8 pb-8 border-b border-ink-100">
          <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {b.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          {b.readMins && <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {b.readMins} min read</span>}
        </div>
        <div className="prose prose-ink max-w-none" dangerouslySetInnerHTML={{ __html: b.content }} />
      </article>
    </main>
  );
}
