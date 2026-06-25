import Link from "next/link";
import { PageHeader } from "@/components/admin/ui";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";

export const dynamic = "force-dynamic";

export default function SitePagesIndex() {
  const groups: Record<string, { slug: string; label: string }[]> = {};
  for (const [slug, def] of Object.entries(PAGE_DEFAULTS)) {
    (groups[def.group] ||= []).push({ slug, label: def.label });
  }

  return (
    <div>
      <PageHeader
        title="Site Pages"
        description="Edit the text, lists and icons on the marketing pages. Changes go live on save."
      />
      <div className="space-y-6">
        {Object.entries(groups).map(([group, pages]) => (
          <div key={group} className="card p-6">
            <h3 className="font-semibold text-ink-900 mb-3">{group}</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {pages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/admin/site-pages/${p.slug}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-ink-200 hover:border-ink-400 hover:bg-ink-50"
                >
                  <span className="text-sm font-medium text-ink-800">{p.label}</span>
                  <span className="text-xs text-ink-400">/{p.slug}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
