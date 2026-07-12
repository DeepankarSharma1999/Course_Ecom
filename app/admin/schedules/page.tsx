import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { Trash2 } from "lucide-react";
import { bulkDeleteSchedules } from "@/lib/admin-actions";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { SelectAll } from "@/components/admin/select-all";

export const dynamic = "force-dynamic";

export default async function AllSchedulesPage({ searchParams }: { searchParams: Promise<{ added?: string }> }) {
  const { added } = await searchParams;
  const schedules = await prisma.schedule.findMany({
    orderBy: { startDate: "asc" },
    include: { course: { select: { id: true, shortTitle: true, slug: true } } },
    take: 200,
  });
  return (
    <>
      <AdminTopbar title="All Schedules" />
      <div className="p-6">
        <PageHeader
          title="Schedules"
          description="All upcoming and past batches across courses. To add or delete one batch, open the course's Schedules tab."
          actions={<Link href="/admin/schedules/bulk" className="btn-primary">Bulk add</Link>}
        />
        {added && <p className="mb-4 text-sm text-green-700">Created {added} schedules across courses.</p>}
        <form action={bulkDeleteSchedules} className="card overflow-hidden block">
          <div className="flex items-center justify-end px-4 py-2 border-b border-ink-100 bg-ink-50/50">
            <ConfirmButton
              message="Delete all selected schedules?"
              className="inline-flex items-center gap-1 text-red-600 hover:underline text-sm"
            >
              <Trash2 className="w-3 h-3" /> Delete Selected
            </ConfirmButton>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr>
                <th className="px-4 py-3 w-8"><SelectAll name="ids" /></th>
                <th className="px-4 py-3">Date</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Mode</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Seats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {schedules.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-ink-500">No schedules.</td></tr>}
              {schedules.map((s) => (
                <tr key={s.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3"><input type="checkbox" name="ids" value={s.id} aria-label={`Select ${s.course.shortTitle} ${new Date(s.startDate).toLocaleDateString()}`} /></td>
                  <td className="px-4 py-3">{new Date(s.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><Link href={`/admin/courses/${s.course.id}/schedules`} className="text-brand-600 hover:underline">{s.course.shortTitle}</Link></td>
                  <td className="px-4 py-3"><Badge tone={s.mode === "Classroom" ? "blue" : "neutral"}>{s.mode}</Badge></td>
                  <td className="px-4 py-3">{[s.citySlug, s.countrySlug].filter(Boolean).join(", ") || "Global"}</td>
                  <td className="px-4 py-3">{s.seatsLeft ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}
