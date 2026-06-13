import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/page-actions";

export const dynamic = "force-dynamic";

export default async function LearnerCustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to find a page with the exact slug or prepended with home/
  // The user might create a page with slug "home/referrals" or just "referrals"
  // Let's check "home/[slug]" first, then just "[slug]"
  let page = await getPageBySlug(`home/${slug}`, true);
  if (!page) {
    page = await getPageBySlug(slug, true);
  }

  if (!page) {
    notFound();
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-ink-100 p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-ink-900 mb-8 pb-6 border-b border-ink-100">
          {page.title}
        </h1>
        <div 
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
