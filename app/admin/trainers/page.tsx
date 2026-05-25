import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { Plus, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TrainersList() {
  const trainers = await prisma.trainer.findMany({
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    include: { _count: { select: { courses: true } } },
  });
  return (
    <>
      <AdminTopbar title="Trainers" />
      <div className="p-6">
        <PageHeader title="Trainers" actions={<Link href="/admin/trainers/new" className="btn-primary"><Plus className="w-4 h-4" /> New</Link>} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainers.length === 0 && <div className="col-span-full card p-8 text-center text-ink-500">No trainers yet.</div>}
          {trainers.map((t) => (
            <Link key={t.id} href={`/admin/trainers/${t.id}/edit`} className="card p-4 hover:shadow-card-lg transition-shadow">
              <div className="flex items-start gap-3">
                {t.photo ? <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover" /> : <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 grid place-items-center font-bold">{t.name.charAt(0)}</div>}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink-900 truncate">{t.name}</div>
                  <div className="text-xs text-ink-500 truncate">{t.title}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    {t.rating && <span className="inline-flex items-center gap-0.5 text-amber-600"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{t.rating}</span>}
                    <span className="text-ink-500">{t._count.courses} courses</span>
                    {t.isFeatured && <Badge tone="blue">Featured</Badge>}
                    {!t.isActive && <Badge tone="red">Inactive</Badge>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
