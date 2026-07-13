import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { Check, Trash2 } from "lucide-react";
import { confirmEnrollment, deleteEnrollment } from "@/lib/admin-actions";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { ExpandableRow, DetailItem } from "@/components/admin/expandable-row";

export const dynamic = "force-dynamic";

// Course registrations awaiting confirmation. Confirming makes the course
// visible in the learner's dashboard (no payment gateway yet).
export default async function RegistrationsPage() {
  const rows = await prisma.enrollment.findMany({
    include: { learner: { select: { name: true, email: true, createdAt: true } } },
    orderBy: [{ status: "desc" }, { createdAt: "desc" }], // "pending" > "confirmed" alphabetically desc
    take: 300,
  });
  const pending = rows.filter((r) => r.status === "pending").length;

  // The registration form also files a lead with phone + message; surface it here.
  const regLeads = rows.length
    ? await prisma.lead.findMany({
        where: { source: "Course Registration", email: { in: rows.map((r) => r.learner.email) } },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const leadFor = (email: string, courseSlug: string) =>
    regLeads.find((l) => l.email === email && l.courseSlug === courseSlug) ?? regLeads.find((l) => l.email === email);

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
                <th className="px-3 py-3 w-8"><span className="sr-only">Expand</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-ink-500">No registrations yet.</td></tr>
              )}
              {rows.map((r) => {
                const lead = leadFor(r.learner.email, r.courseSlug);
                return (
                  <ExpandableRow
                    key={r.id}
                    colSpan={5}
                    cols={
                      <>
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
                      </>
                    }
                    detail={
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <DetailItem label="Learner" value={r.learner.name} />
                          <DetailItem label="Email" value={<a href={`mailto:${r.learner.email}`} className="text-brand-600 hover:underline">{r.learner.email}</a>} />
                          <DetailItem label="Phone" value={lead ? `${lead.countryCode ? lead.countryCode + " " : ""}${lead.phone}` : null} />
                          <DetailItem label="Registered on" value={r.createdAt.toLocaleString()} />
                          <DetailItem label="Course" value={<Link href={`/${r.courseSlug}`} target="_blank" className="text-brand-600 hover:underline">{r.courseTitle}</Link>} />
                          <DetailItem label="Status" value={<Badge tone={r.status === "confirmed" ? "green" : "yellow"}>{r.status}</Badge>} />
                          <DetailItem label="Account created" value={r.learner.createdAt.toLocaleDateString()} />
                          <DetailItem label="Price" value={r.priceUsd > 0 ? `$${r.priceUsd}` : "Free / to be invoiced"} />
                        </div>
                        {lead?.message && <DetailItem label="Message from learner" value={<span className="whitespace-pre-wrap">{lead.message}</span>} />}
                      </div>
                    }
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
