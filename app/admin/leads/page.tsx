import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { Download, Search } from "lucide-react";
import { ExpandableRow, DetailItem } from "@/components/admin/expandable-row";

export const dynamic = "force-dynamic";

const STATUS_TONES: Record<string, "neutral" | "green" | "yellow" | "red" | "blue"> = {
  new: "yellow",
  contacted: "blue",
  qualified: "blue",
  converted: "green",
  dropped: "red",
};

export default async function LeadsPage({
  searchParams,
}: { searchParams: Promise<{ status?: string; q?: string; course?: string }> }) {
  const sp = await searchParams;
  const where: any = {};
  if (sp.status) where.status = sp.status;
  if (sp.course) where.courseSlug = sp.course;
  if (sp.q) {
    where.OR = [
      { name: { contains: sp.q, mode: "insensitive" } },
      { email: { contains: sp.q, mode: "insensitive" } },
      { phone: { contains: sp.q } },
    ];
  }
  const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 });
  const counts = {
    all: await prisma.lead.count(),
    new: await prisma.lead.count({ where: { status: "new" } }),
    contacted: await prisma.lead.count({ where: { status: "contacted" } }),
    converted: await prisma.lead.count({ where: { status: "converted" } }),
  };

  return (
    <>
      <AdminTopbar title="Leads" />
      <div className="p-6">
        <PageHeader
          title="Leads"
          description="All enquiries submitted from the public site."
          actions={
            // CSV download endpoint (route handler) — a plain <a download> is correct here; <Link> would break the download.
            // eslint-disable-next-line @next/next/no-html-link-for-pages
            <a href="/admin/leads/export" download className="btn-outline"><Download className="w-4 h-4" /> Export CSV</a>
          }
        />

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Link href="/admin/leads" className={`px-3 py-1.5 rounded-lg text-sm ${!sp.status ? "bg-brand-600 text-white" : "bg-white border border-ink-200"}`}>All ({counts.all})</Link>
          <Link href="/admin/leads?status=new" className={`px-3 py-1.5 rounded-lg text-sm ${sp.status === "new" ? "bg-brand-600 text-white" : "bg-white border border-ink-200"}`}>New ({counts.new})</Link>
          <Link href="/admin/leads?status=contacted" className={`px-3 py-1.5 rounded-lg text-sm ${sp.status === "contacted" ? "bg-brand-600 text-white" : "bg-white border border-ink-200"}`}>Contacted ({counts.contacted})</Link>
          <Link href="/admin/leads?status=converted" className={`px-3 py-1.5 rounded-lg text-sm ${sp.status === "converted" ? "bg-brand-600 text-white" : "bg-white border border-ink-200"}`}>Converted ({counts.converted})</Link>

          <form className="ml-auto flex items-center gap-2">
            {sp.status && <input type="hidden" name="status" value={sp.status} />}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input name="q" defaultValue={sp.q ?? ""} placeholder="Search name, email, phone" className="pl-9 pr-3 py-1.5 rounded-lg border border-ink-200 text-sm w-72" />
            </div>
          </form>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">UTM</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-3 py-3 w-8"><span className="sr-only">Expand</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {leads.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-ink-500">No leads match the filter.</td></tr>}
              {leads.map((l) => {
                const utm = (l.utm as any) || {};
                return (
                  <ExpandableRow
                    key={l.id}
                    colSpan={8}
                    cols={
                      <>
                        <td className="px-4 py-3 text-ink-600 whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-3"><Link href={`/admin/leads/${l.id}`} className="font-medium text-ink-900 hover:text-brand-600">{l.name}</Link></td>
                        <td className="px-4 py-3 text-ink-700">{l.email}</td>
                        <td className="px-4 py-3 text-ink-700">{l.phone}</td>
                        <td className="px-4 py-3 text-xs text-ink-600">
                          {l.courseSlug ? (
                            <span className="font-medium text-ink-900">{l.courseSlug}</span>
                          ) : (
                            <span className="text-ink-500 italic">General Enquiry</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs">{l.source ? <Badge tone="neutral">{l.source}</Badge> : <span className="text-ink-400">—</span>}</td>
                        <td className="px-4 py-3 text-xs text-ink-600">
                          {utm.source ? <>{utm.source}{utm.campaign ? <span className="text-ink-400"> · {utm.campaign}</span> : ""}</> : <span className="text-ink-400">—</span>}
                        </td>
                        <td className="px-4 py-3"><Badge tone={STATUS_TONES[l.status] || "neutral"}>{l.status}</Badge></td>
                      </>
                    }
                    detail={
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <DetailItem label="Full name" value={l.name} />
                          <DetailItem label="Email" value={<a href={`mailto:${l.email}`} className="text-brand-600 hover:underline">{l.email}</a>} />
                          <DetailItem label="Phone" value={`${l.countryCode ? l.countryCode + " " : ""}${l.phone}`} />
                          <DetailItem label="Marketing consent" value={l.consentMarketing ? "Yes" : "No"} />
                          <DetailItem label="Course" value={l.courseSlug ? <Link href={`/${l.courseSlug}`} target="_blank" className="text-brand-600 hover:underline">{l.courseSlug}</Link> : "General enquiry"} />
                          <DetailItem label="Location" value={[l.citySlug, l.countrySlug].filter(Boolean).join(", ") || null} />
                          <DetailItem label="Source" value={l.source} />
                          <DetailItem label="Brochure requested" value={l.brochureCourseSlug} />
                          <DetailItem label="UTM" value={utm.source ? [utm.source, utm.medium, utm.campaign, utm.term, utm.content].filter(Boolean).join(" · ") : null} />
                          <DetailItem label="Referrer" value={utm.referrer} />
                          <DetailItem label="Landing page" value={utm.landingPath} />
                          <DetailItem label="IP / Device" value={[l.ipAddress, l.userAgent ? l.userAgent.slice(0, 60) : null].filter(Boolean).join(" · ") || null} />
                        </div>
                        {l.message && <DetailItem label="Message" value={<span className="whitespace-pre-wrap">{l.message}</span>} />}
                        {l.notes && <DetailItem label="Internal notes" value={<span className="whitespace-pre-wrap">{l.notes}</span>} />}
                        <Link href={`/admin/leads/${l.id}`} className="inline-block text-sm font-semibold text-brand-600 hover:underline">Open full lead →</Link>
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
