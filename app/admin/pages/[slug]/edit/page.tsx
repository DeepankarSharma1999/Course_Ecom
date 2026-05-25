import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Checkbox, Field, Input, PageHeader, Section, Textarea } from "@/components/admin/ui";
import { deleteSimplePage, saveSimplePage } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditSimplePage({
  params, searchParams,
}: { params: Promise<{ slug: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const p = await prisma.simplePage.findUnique({ where: { slug } });
  if (!p) notFound();
  return (
    <>
      <AdminTopbar title={`Page: ${p.title}`} />
      <div className="p-6 max-w-4xl">
        <PageHeader
          title={p.title}
          description={`/${p.slug}`}
          actions={<>
            <Link href="/admin/pages" className="btn-ghost">← Back</Link>
            <Link href={`/${p.slug}`} target="_blank" className="btn-ghost">View →</Link>
          </>}
        />
        {sp.saved && <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 text-sm">Saved.</div>}
        <form action={saveSimplePage.bind(null, slug)} className="space-y-6">
          <Section title="Basics">
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Slug" hint="Changes the public URL" required><Input name="slug" defaultValue={p.slug} required /></Field>
              <Field label="Title" required><Input name="title" defaultValue={p.title} required /></Field>
            </div>
            <Checkbox name="isPublished" label="Published" defaultChecked={p.isPublished} />
          </Section>

          <Section title="Hero">
            <Field label="Hero Badge"><Input name="heroBadge" defaultValue={p.heroBadge ?? ""} /></Field>
            <Field label="Hero Headline"><Input name="heroHeadline" defaultValue={p.heroHeadline ?? ""} /></Field>
            <Field label="Hero Subheading"><Textarea name="heroSubheading" rows={3} defaultValue={p.heroSubheading ?? ""} /></Field>
          </Section>

          <Section title="Body" description="Markdown-flavored: use **bold**, line breaks, and `-` for bullets. HTML is also allowed.">
            <Field label="Body content"><Textarea name="body" rows={14} defaultValue={p.body ?? ""} /></Field>
          </Section>

          <Section title="Lead Form / CTA">
            <Checkbox name="showLeadForm" label="Show lead form" defaultChecked={p.showLeadForm} />
            <Field label="Lead Form Title"><Input name="leadFormTitle" defaultValue={p.leadFormTitle ?? ""} /></Field>
            <Field label="Lead Form Subtitle"><Textarea name="leadFormSubtitle" rows={2} defaultValue={p.leadFormSubtitle ?? ""} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Inline CTA text"><Input name="ctaText" defaultValue={p.ctaText ?? ""} /></Field>
              <Field label="Inline CTA link"><Input name="ctaLink" defaultValue={p.ctaLink ?? ""} /></Field>
            </div>
          </Section>

          <Section title="SEO">
            <Field label="SEO Title"><Input name="seoTitle" defaultValue={p.seoTitle ?? ""} /></Field>
            <Field label="Meta Description"><Textarea name="seoDescription" rows={3} defaultValue={p.seoDescription ?? ""} /></Field>
          </Section>

          <div className="flex justify-between items-center">
            <button type="submit" className="btn-primary">Save Page</button>
            <button formAction={deleteSimplePage.bind(null, slug)} className="text-red-600 hover:underline text-sm">Delete page</button>
          </div>
        </form>
      </div>
    </>
  );
}
