import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader, Badge } from "@/components/admin/ui";
import { Plus, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TestimonialsList() {
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <AdminTopbar title="Testimonials" />
      <div className="p-6">
        <PageHeader title="Testimonials" actions={<Link href="/admin/testimonials/new" className="btn-primary"><Plus className="w-4 h-4" /> New</Link>} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 && <div className="col-span-full card p-8 text-center text-ink-500">No testimonials yet.</div>}
          {items.map((t) => (
            <Link key={t.id} href={`/admin/testimonials/${t.id}/edit`} className="card p-4 hover:shadow-card-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-ink-900">{t.name}</div>
                <div className="flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
              </div>
              <div className="text-xs text-ink-500 mb-2">{t.role} {t.company && `· ${t.company}`}</div>
              <div className="text-sm text-ink-700 line-clamp-3">{t.quote}</div>
              {t.course && <div className="mt-3"><Badge tone="blue">{t.course}</Badge></div>}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
