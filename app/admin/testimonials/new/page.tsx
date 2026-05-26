import Link from "next/link";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, PageHeader, Section, Textarea } from "@/components/admin/ui";
import { saveTestimonial } from "@/lib/admin-actions";

export default function NewTestimonialPage() {
  const action = saveTestimonial.bind(null, null);
  return (
    <>
      <AdminTopbar title="New Testimonial" />
      <div className="p-6 max-w-2xl">
        <PageHeader title="Add Testimonial" actions={<Link href="/admin/testimonials" className="btn-ghost">Cancel</Link>} />
        <form action={action}>
          <Section title="Details">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" required><Input name="name" required /></Field>
              <Field label="Rating"><Input type="number" name="rating" min={1} max={5} defaultValue={5} /></Field>
              <Field label="Role"><Input name="role" /></Field>
              <Field label="Company"><Input name="company" /></Field>
              <Field label="Course"><Input name="course" /></Field>
              <Field label="Photo URL"><Input name="photo" /></Field>
            </div>
            <Field label="Quote" required><Textarea name="quote" rows={4} required /></Field>
            <button className="btn-primary w-full">Save Testimonial</button>
          </Section>
        </form>
      </div>
    </>
  );
}
