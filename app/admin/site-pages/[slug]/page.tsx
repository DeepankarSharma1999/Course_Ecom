import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { PageContentEditor } from "@/components/admin/page-content-editor";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";
import { getPageContent } from "@/lib/page-content";
import { savePageContent } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = PAGE_DEFAULTS[slug];
  if (!def) notFound();

  const content = await getPageContent(slug); // defaults merged with any saved override

  return (
    <div>
      <PageHeader
        title={def.label}
        description={`Editing /${slug} · ${def.group}`}
        actions={
          <Link href={`/${slug}`} target="_blank" className="text-sm text-ink-500 hover:text-ink-900">
            View page ↗
          </Link>
        }
      />
      <div className="card p-6">
        <PageContentEditor slug={slug} initial={content} action={savePageContent} />
      </div>
    </div>
  );
}
