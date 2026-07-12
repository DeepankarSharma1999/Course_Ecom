import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { Check, Trash2 } from "lucide-react";
import { confirmEnrollment, deleteEnrollment } from "@/lib/admin-actions";
import { ConfirmButton } from "@/components/admin/confirm-button";

export const dynamic = "force-dynamic";

// Course registrations awaiting confirmation. Confirming makes the course
// visible in the learner's dashboard (no payment gateway yet).
export default async function RegistrationsPage() {
  const rows = await prisma.enrollment.findMany({
    include: { learner: { select: { name: true, email: true } } },
    orderBy: [{ status: "desc" }, { createdAt: "desc" }], // "pending" > "confirmed" alphabetically desc
    take: 300,
  });
  const pending = rows.filter((r) => r.status === "pending").length;

  return (
    <>
      <AdminTopbar title="Registrations" />
      <div className="p-6">
        <PageHeader
          title="Course Registrations"
          description={`Learner registrations awaiting confirmation. Confirming a registration makes the course visible in the learner's dashboard. ${pending} pending.`}
        />
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr>
                <th className="px-4 py-3">Requested</th>
                <th className="px-4 py-3">Learner</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-ink-500">No registrations yet.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3 whitespace-nowrap">{r.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-900">{r.learner.name || "—"}</div>
                    <div className="text-xs text-ink-500">{r.learner.email}</div>
                  </td>
                  <td className="px-4 py-3"><Link href={`/${r.courseSlug}`} target="_blank" className="text-brand-600 hover:underline">{r.courseTitle}</Link></td>
                  <td className="px-4 py-3">
                    <Badge tone={r.status === "confirmed" ? "green" : "yellow"}>{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {r.status === "pending" && (
                        <form action={confirmEnrollment.bind(null, r.id)}>
                          <button type="submit" className="inline-flex items-center gap-1 text-green-700 hover:underline font-medium">
                            <Check className="w-3.5 h-3.5" /> Confirm
                          </button>
                        </form>
                      )}
                      <form action={deleteEnrollment.bind(null, r.id)}>
                        <ConfirmButton
                          message={`Remove this registration for ${r.learner.email}? The course will disappear from their dashboard.`}
                          className="inline-flex items-center gap-1 text-red-600 hover:underline"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
