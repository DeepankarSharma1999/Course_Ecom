import { Field, Input, Textarea, Select, Checkbox, Section } from "./ui";

type Category = { id: string; slug: string; name: string };
type Course = any;

export function CourseForm({ course, categories }: { course?: Course; categories: Category[] }) {
  const c = course || {};
  const j = (v: any) => (v ? JSON.stringify(v, null, 2) : "");
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Section title="Basics">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Slug (URL)" required hint="e.g. safe-scrum-master-certification">
              <Input name="slug" defaultValue={c.slug} required />
            </Field>
            <Field label="Short Title" hint="Used in cards & menus">
              <Input name="shortTitle" defaultValue={c.shortTitle ?? ""} />
            </Field>
          </div>
          <Field label="Full Title" required>
            <Input name="title" defaultValue={c.title ?? ""} required />
          </Field>
          <Field label="Subtitle / Tagline">
            <Input name="subtitle" defaultValue={c.subtitle ?? ""} />
          </Field>
          <Field label="Summary" hint="2-3 sentences for course cards" required>
            <Textarea name="summary" rows={3} defaultValue={c.summary ?? ""} required />
          </Field>
          <Field label="Description" hint="Full course overview shown on the page" required>
            <Textarea name="description" rows={6} defaultValue={c.description ?? ""} required />
          </Field>
        </Section>

        <Section title="Details">
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Duration Label" hint="e.g. 2 Days (16 Hours)">
              <Input name="durationLabel" defaultValue={c.durationLabel ?? ""} />
            </Field>
            <Field label="Duration (hours)">
              <Input type="number" name="durationHours" defaultValue={c.durationHours ?? ""} />
            </Field>
            <Field label="Level">
              <Input name="level" defaultValue={c.level ?? ""} placeholder="Beginner / Intermediate / Advanced" />
            </Field>
            <Field label="Accredited By">
              <Input name="accreditedBy" defaultValue={c.accreditedBy ?? ""} />
            </Field>
            <Field label="PDU Credits">
              <Input type="number" name="pduCredits" defaultValue={c.pduCredits ?? ""} />
            </Field>
            <Field label="Category">
              <Select name="categorySlug" defaultValue={c.category?.slug ?? ""}>
                <option value="">— Select —</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex gap-6 pt-2">
            <Checkbox name="examIncluded" label="Exam fee included" defaultChecked={!!c.examIncluded} />
            <Checkbox name="isFeatured" label="Featured course" defaultChecked={!!c.isFeatured} />
            <Checkbox name="isPublished" label="Published" defaultChecked={c.isPublished ?? true} />
          </div>
        </Section>

        <Section title="Pricing & Rating">
          <div className="grid md:grid-cols-4 gap-4">
            <Field label="Base Price (INR)"><Input type="number" name="basePriceInr" defaultValue={c.basePriceInr ?? ""} /></Field>
            <Field label="Base Price (USD)"><Input type="number" name="basePriceUsd" defaultValue={c.basePriceUsd ?? ""} /></Field>
            <Field label="Rating Avg"><Input type="number" step="0.1" name="ratingAvg" defaultValue={c.ratingAvg ?? 4.8} /></Field>
            <Field label="Rating Count"><Input type="number" name="ratingCount" defaultValue={c.ratingCount ?? 0} /></Field>
          </div>
        </Section>

        <Section title="Imagery & Brochure">
          <Field label="Hero Image URL"><Input name="heroImage" defaultValue={c.heroImage ?? ""} placeholder="https://images.unsplash.com/..." /></Field>
          <Field label="Thumbnail Image URL"><Input name="thumbnailImage" defaultValue={c.thumbnailImage ?? ""} /></Field>
          <Field label="Brochure URL" hint="PDF link shown when a visitor requests the brochure"><Input name="brochureUrl" defaultValue={c.brochureUrl ?? ""} placeholder="https://.../brochure.pdf" /></Field>
        </Section>

        <Section title="Course Content (JSON arrays)" description="Edit the structured content as JSON. The form validates and stores these as JSON in the database.">
          <Field label="Key Features" hint='Array of { "icon": "Clock", "label": "..." }'>
            <Textarea name="keyFeatures" rows={6} defaultValue={j(c.keyFeatures)} placeholder='[{"icon":"Clock","label":"16 hours"}]' />
          </Field>
          <Field label="Learning Outcomes" hint="Array of strings">
            <Textarea name="learningOutcomes" rows={5} defaultValue={j(c.learningOutcomes)} placeholder='["Outcome 1", "Outcome 2"]' />
          </Field>
          <Field label="Who Should Attend" hint="Array of strings">
            <Textarea name="whoShouldAttend" rows={5} defaultValue={j(c.whoShouldAttend)} />
          </Field>
          <Field label="Prerequisites" hint="Array of strings">
            <Textarea name="prerequisites" rows={4} defaultValue={j(c.prerequisites)} />
          </Field>
          <Field label="Curriculum" hint='Array of { "title": "Module ...", "topics": ["..."] }'>
            <Textarea name="curriculum" rows={10} defaultValue={j(c.curriculum)} />
          </Field>
          <Field label="Why Choose Us" hint='Array of { "title": "...", "body": "..." }'>
            <Textarea name="whyChooseUs" rows={6} defaultValue={j(c.whyChooseUs)} />
          </Field>
        </Section>
      </div>

      <div className="space-y-6">
        <Section title="SEO">
          <Field label="SEO Title" hint="Up to ~60 chars"><Input name="seoTitle" defaultValue={c.seoTitle ?? ""} /></Field>
          <Field label="Meta Description" hint="Up to ~160 chars"><Textarea name="seoDescription" rows={3} defaultValue={c.seoDescription ?? ""} /></Field>
          <Field label="Keywords" hint="Comma separated"><Textarea name="seoKeywords" rows={2} defaultValue={c.seoKeywords ?? ""} /></Field>
        </Section>

        <Section title="Save">
          <button type="submit" className="btn-primary w-full">Save Course</button>
          <p className="text-xs text-ink-500">Saving will revalidate the public site immediately.</p>
        </Section>
      </div>
    </div>
  );
}
