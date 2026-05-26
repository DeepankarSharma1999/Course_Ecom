import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, Field, Input, PageHeader, Section, Select, Textarea, Checkbox } from "@/components/admin/ui";
import { createVariant, deleteVariant, updateVariant } from "@/lib/admin-actions";
import { COUNTRIES, CITIES_IN } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export default async function CourseVariants({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) notFound();
  const variants = await prisma.coursePageVariant.findMany({ where: { courseId: id }, orderBy: { countrySlug: "asc" } });
  const createBound = createVariant.bind(null, id);
  return (
    <>
      <AdminTopbar title={`Variants: ${course.shortTitle || course.title}`} />
      <div className="p-6">
        <PageHeader
          title="Country / City Page Variants"
          description={`Override hero text, pricing, SEO and local context for ${course.shortTitle || course.title} in specific locations. URL: /[country]/${course.slug}/[city]`}
          actions={<Link href={`/admin/courses/${id}/edit`} className="btn-ghost">← Back to course</Link>}
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {variants.length === 0 && <div className="card p-6 text-center text-ink-500 text-sm">No variants yet. Add one on the right to start optimizing for specific cities.</div>}
            {variants.map((v) => (
              <form key={v.id} action={updateVariant.bind(null, v.id, id)} className="card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold">{v.cityName || v.citySlug || "—"}</span>
                    <span className="text-ink-500"> · {v.countryName || v.countrySlug}</span>
                  </div>
                  {v.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="yellow">Draft</Badge>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Country Slug"><Input name="countrySlug" defaultValue={v.countrySlug ?? ""} /></Field>
                  <Field label="City Slug"><Input name="citySlug" defaultValue={v.citySlug ?? ""} /></Field>
                  <Field label="Country Name"><Input name="countryName" defaultValue={v.countryName ?? ""} /></Field>
                  <Field label="City Name"><Input name="cityName" defaultValue={v.cityName ?? ""} /></Field>
                  <Field label="Currency"><Input name="currency" defaultValue={v.currency} /></Field>
                  <Field label="Price (Local)"><Input type="number" name="priceLocal" defaultValue={v.priceLocal ?? ""} /></Field>
                </div>
                <Field label="Hero Headline"><Input name="heroHeadline" defaultValue={v.heroHeadline ?? ""} /></Field>
                <Field label="Hero Subheadline"><Textarea name="heroSubheadline" rows={2} defaultValue={v.heroSubheadline ?? ""} /></Field>
                <Field label="Local Context"><Textarea name="localContext" rows={3} defaultValue={v.localContext ?? ""} /></Field>
                <Field label="SEO Title"><Input name="seoTitle" defaultValue={v.seoTitle ?? ""} /></Field>
                <Field label="SEO Description"><Textarea name="seoDescription" rows={2} defaultValue={v.seoDescription ?? ""} /></Field>
                <Checkbox name="isPublished" label="Published" defaultChecked={v.isPublished} />
                <input type="hidden" name="countryCode" defaultValue={v.countryCode ?? ""} />
                <div className="flex justify-between">
                  <button type="submit" className="btn-outline">Save</button>
                  <button formAction={deleteVariant.bind(null, v.id, id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </form>
            ))}
          </div>
          <form action={createBound}>
            <Section title="Add Variant">
              <Field label="Country">
                <Select name="countrySlug" required defaultValue="in">
                  {COUNTRIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </Select>
              </Field>
              <Field label="City">
                <Select name="citySlug" required defaultValue="delhi">
                  {CITIES_IN.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </Select>
              </Field>
              <Field label="City Name"><Input name="cityName" placeholder="Delhi" required /></Field>
              <Field label="Country Name"><Input name="countryName" placeholder="India" required /></Field>
              <Field label="Currency"><Input name="currency" defaultValue="INR" /></Field>
              <Field label="Price (Local)"><Input type="number" name="priceLocal" defaultValue={course.basePriceInr ?? ""} /></Field>
              <Field label="Hero Headline"><Input name="heroHeadline" /></Field>
              <Field label="Hero Subheadline"><Textarea name="heroSubheadline" rows={2} /></Field>
              <Field label="SEO Title"><Input name="seoTitle" /></Field>
              <Field label="SEO Description"><Textarea name="seoDescription" rows={2} /></Field>
              <Checkbox name="isPublished" label="Published" defaultChecked />
              <button type="submit" className="btn-primary w-full">Add Variant</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
