import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, PageHeader, Section, Select, Textarea } from "@/components/admin/ui";
import { deleteLead, updateLeadStatus } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();
  const update = updateLeadStatus.bind(null, id);
  return (
    <>
      <AdminTopbar title={`Lead: ${lead.name}`} />
      <div className="p-6 max-w-4xl">
        <PageHeader title={lead.name} description={`Submitted ${new Date(lead.createdAt).toLocaleString()}`} actions={<Link href="/admin/leads" className="btn-ghost">← Back</Link>} />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6 space-y-3 text-sm">
            <Row label="Email">{lead.email}</Row>
            <Row label="Phone">{lead.phone}</Row>
            <Row label="Course">{lead.courseSlug || "—"}</Row>
            <Row label="Country">{lead.countrySlug || "—"}</Row>
            <Row label="City">{lead.citySlug || "—"}</Row>
            <Row label="Source">{lead.source || "—"}</Row>
            <Row label="UTM source">{(lead.utm as any)?.source || "—"}</Row>
            <Row label="UTM medium">{(lead.utm as any)?.medium || "—"}</Row>
            <Row label="UTM campaign">{(lead.utm as any)?.campaign || "—"}</Row>
            <Row label="Landing page">{(lead.utm as any)?.landingPath || "—"}</Row>
            <Row label="Referrer">{(lead.utm as any)?.referrer || "—"}</Row>
            <Row label="Message">{lead.message || "—"}</Row>
            <Row label="Marketing consent">{lead.consentMarketing ? "Yes" : "No"}</Row>
            <Row label="IP / device">{[lead.ipAddress, lead.userAgent?.slice(0, 60)].filter(Boolean).join(" · ") || "—"}</Row>
          </div>
          <form action={update} className="space-y-4">
            <Section title="Update Status">
              <Field label="Status">
                <Select name="status" defaultValue={lead.status}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="dropped">Dropped</option>
                </Select>
              </Field>
              <Field label="Internal Notes"><Textarea name="notes" rows={4} defaultValue={lead.notes ?? ""} /></Field>
              <button type="submit" className="btn-primary w-full">Save</button>
              <button formAction={deleteLead.bind(null, id)} className="text-red-600 hover:underline text-xs">Delete lead</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-4 gap-3 py-2 border-b border-ink-100 last:border-0">
      <div className="text-xs uppercase text-ink-500 col-span-1">{label}</div>
      <div className="col-span-3 text-ink-800">{children}</div>
    </div>
  );
}
