import { Checkbox, Field, Input, Section, Textarea } from "./ui";

type Course = { id: string; shortTitle: string | null; title: string };

export function TrainerForm({ trainer, courses, assignedCourseIds = [] }: { trainer?: any; courses: Course[]; assignedCourseIds?: string[] }) {
  const t = trainer || {};
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Section title="Profile">
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Slug" required hint="e.g. ravi-kumar"><Input name="slug" defaultValue={t.slug ?? ""} required /></Field>
            <Field label="Name" required><Input name="name" defaultValue={t.name ?? ""} required /></Field>
          </div>
          <Field label="Title / Headline"><Input name="title" defaultValue={t.title ?? ""} placeholder="Principal SAFe Program Consultant (SPC)" /></Field>
          <Field label="Bio"><Textarea name="bio" rows={5} defaultValue={t.bio ?? ""} /></Field>
          <Field label="Photo URL"><Input name="photo" defaultValue={t.photo ?? ""} /></Field>
          <Field label="LinkedIn URL"><Input name="linkedinUrl" defaultValue={t.linkedinUrl ?? ""} /></Field>
        </Section>

        <Section title="Credentials">
          <div className="grid md:grid-cols-3 gap-3">
            <Field label="Years of experience"><Input type="number" name="experienceYears" defaultValue={t.experienceYears ?? ""} /></Field>
            <Field label="Rating"><Input type="number" step="0.1" name="rating" defaultValue={t.rating ?? ""} /></Field>
            <Field label="Reviews count"><Input type="number" name="reviews" defaultValue={t.reviews ?? ""} /></Field>
          </div>
          <Field label="Expertise" hint="Comma-separated"><Input name="expertise" defaultValue={Array.isArray(t.expertise) ? t.expertise.join(", ") : ""} placeholder="SAFe 6.0, Agile Coaching, DevOps" /></Field>
          <Field label="Certifications" hint="Comma-separated"><Input name="certifications" defaultValue={Array.isArray(t.certifications) ? t.certifications.join(", ") : ""} placeholder="SAFe SPC, PMP, CSP-SM" /></Field>
        </Section>

        <Section title="Assigned Courses">
          <div className="grid md:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
            {courses.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm text-ink-700 p-2 rounded hover:bg-ink-50">
                <input type="checkbox" name="courseIds" value={c.id} defaultChecked={assignedCourseIds.includes(c.id)} className="rounded border-ink-300 text-brand-600" />
                {c.shortTitle || c.title}
              </label>
            ))}
          </div>
        </Section>
      </div>

      <div className="space-y-6">
        <Section title="Settings">
          <Checkbox name="isFeatured" label="Featured trainer" defaultChecked={!!t.isFeatured} />
          <Checkbox name="isActive" label="Active" defaultChecked={t.isActive ?? true} />
          <button type="submit" className="btn-primary w-full">Save Trainer</button>
        </Section>
      </div>
    </div>
  );
}
