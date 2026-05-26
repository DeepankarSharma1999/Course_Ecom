import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, Field, Input, PageHeader, Section } from "@/components/admin/ui";
import { createSimplePage } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function SimplePagesList() {
  const pages = await prisma.simplePage.findMany({ orderBy: { slug: "asc" } });
  return (
    <>
      <AdminTopbar title="Pages" />
      <div className="p-6">
        <PageHeader title="Site Pages" description="Manage content pages like /corporate, /enquire, /about, /privacy, /terms, etc." />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
                <tr><th className="px-4 py-3">Page</th><th className="px-4 py-3">URL</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {pages.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-ink-500">No pages yet.</td></tr>}
                {pages.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 text-ink-600">/{p.slug}</td>
                    <td className="px-4 py-3">{p.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="yellow">Draft</Badge>}</td>
                    <td className="px-4 py-3 text-right"><Link href={`/admin/pages/${p.slug}/edit`} className="text-brand-600 hover:underline text-sm">Edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form action={createSimplePage}>
            <Section title="Add New Page">
              <Field label="Slug" hint="No leading slash" required><Input name="slug" required placeholder="privacy-policy" /></Field>
              <Field label="Title" required><Input name="title" required /></Field>
              <button type="submit" className="btn-primary w-full">Create Page</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
