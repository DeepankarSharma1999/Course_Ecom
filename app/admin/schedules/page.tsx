import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AllSchedulesPage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { startDate: "asc" },
    include: { course: { select: { id: true, shortTitle: true, slug: true } } },
    take: 200,
  });
  return (
    <>
      <AdminTopbar title="All Schedules" />
      <div className="p-6">
        <PageHeader title="Schedules" description="All upcoming and past batches across courses. To add or delete, open the course's Schedules tab." />
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Mode</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Seats</th></tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {schedules.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-ink-500">No schedules.</td></tr>}
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3">{new Date(s.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><Link href={`/admin/courses/${s.course.id}/schedules`} className="text-brand-600 hover:underline">{s.course.shortTitle}</Link></td>
                  <td className="px-4 py-3"><Badge tone={s.mode === "Classroom" ? "blue" : "neutral"}>{s.mode}</Badge></td>
                  <td className="px-4 py-3">{[s.citySlug, s.countrySlug].filter(Boolean).join(", ") || "Global"}</td>
                  <td className="px-4 py-3">{s.seatsLeft ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
