import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, PageHeader, Section, Textarea } from "@/components/admin/ui";
import { createGlobalFaq, deleteGlobalFaq, updateGlobalFaq } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function GlobalFaqsPage() {
  const faqs = await prisma.fAQ.findMany({ where: { scope: "global" }, orderBy: { order: "asc" } });
  return (
    <>
      <AdminTopbar title="Global FAQs" />
      <div className="p-6">
        <PageHeader title="Global FAQs" description="Shown on the home page FAQ section. Course-specific FAQs are managed inside each course." />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {faqs.length === 0 && <div className="card p-6 text-center text-ink-500 text-sm">No global FAQs yet.</div>}
            {faqs.map((f) => (
              <form key={f.id} action={updateGlobalFaq.bind(null, f.id)} className="card p-4 space-y-3">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-11"><Input name="question" defaultValue={f.question} className="font-semibold" /></div>
                  <div className="col-span-1"><Input type="number" name="order" defaultValue={f.order} /></div>
                </div>
                <Textarea name="answer" rows={3} defaultValue={f.answer} />
                <div className="flex justify-between">
                  <button type="submit" className="btn-outline">Save</button>
                  <button formAction={deleteGlobalFaq.bind(null, f.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </form>
            ))}
          </div>
          <form action={createGlobalFaq}>
            <Section title="Add Global FAQ">
              <Field label="Question" required><Input name="question" required /></Field>
              <Field label="Answer" required><Textarea name="answer" rows={4} required /></Field>
              <Field label="Order"><Input type="number" name="order" defaultValue={faqs.length} /></Field>
              <button type="submit" className="btn-primary w-full">Add FAQ</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
