import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, PageHeader, Section, Textarea } from "@/components/admin/ui";
import { deleteTestimonial, saveTestimonial } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();
  return (
    <>
      <AdminTopbar title="Edit Testimonial" />
      <div className="p-6 max-w-2xl">
        <PageHeader title="Edit Testimonial" actions={<Link href="/admin/testimonials" className="btn-ghost">← Back</Link>} />
        <form action={saveTestimonial.bind(null, id)}>
          <Section title="Details">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" required><Input name="name" defaultValue={t.name} required /></Field>
              <Field label="Rating"><Input type="number" name="rating" min={1} max={5} defaultValue={t.rating} /></Field>
              <Field label="Role"><Input name="role" defaultValue={t.role ?? ""} /></Field>
              <Field label="Company"><Input name="company" defaultValue={t.company ?? ""} /></Field>
              <Field label="Course"><Input name="course" defaultValue={t.course ?? ""} /></Field>
              <Field label="Photo URL"><Input name="photo" defaultValue={t.photo ?? ""} /></Field>
            </div>
            <Field label="Quote" required><Textarea name="quote" rows={4} defaultValue={t.quote} required /></Field>
            <div className="flex justify-between">
              <button type="submit" className="btn-primary">Save</button>
              <button formAction={deleteTestimonial.bind(null, id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          </Section>
        </form>
      </div>
    </>
  );
}
