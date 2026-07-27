import { Checkbox, Field, Input, Section, Textarea } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { saveBlog } from "@/lib/admin-actions";
import { BLOG_CATEGORIES } from "@/lib/blog-hero";

type BlogValues = {
  title?: string; slug?: string; category?: string | null; excerpt?: string | null;
  content?: string; readMins?: number | null; isPublished?: boolean;
  author?: string | null; authorRole?: string | null; heroImage?: string | null;
  tags?: string[]; seoTitle?: string | null; seoDescription?: string | null;
  relatedCourseSlugs?: string[];
};

// New posts start from this skeleton so admin-written articles pick up the
// full .blog-prose treatment (lead paragraph, accent H2s, styled tables,
// FAQ accordions) without the author needing to know any CSS.
const CONTENT_TEMPLATE = `<p>Opening paragraph — one or two sentences that hook the reader and state what this article covers. This renders larger as the lead.</p>

<h2>First main section</h2>
<p>Body text. Use <strong>bold</strong> for key terms and link related pages like <a href="/csm-certification-training">course pages</a> or <a href="/info/csm-certification-training">certification guides</a>.</p>
<ul>
<li>Bullet points render with teal check circles</li>
<li>Keep each point to one clear idea</li>
</ul>

<h2>Comparison section (optional)</h2>
<table>
<tr><th></th><th>Option A</th><th>Option B</th></tr>
<tr><td>Criterion</td><td>Value</td><td>Value</td></tr>
</table>

<h2>Frequently asked questions</h2>
<h3>First question readers ask?</h3>
<p>Direct answer in one or two sentences. These render as interactive accordions.</p>
<h3>Second question?</h3>
<p>Answer.</p>`;

export function BlogForm({ id, b }: { id: string | null; b?: BlogValues }) {
  return (
    <form action={saveBlog.bind(null, id)}>
      <Section title="Article">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title" required><Input name="title" defaultValue={b?.title} required /></Field>
          <Field label="Slug (blank = from title)"><Input name="slug" defaultValue={b?.slug} placeholder="my-article" /></Field>
          <Field label="Category">
            <>
              <Input name="category" list="blog-categories" defaultValue={b?.category ?? ""} placeholder="Agile & Scrum" />
              <datalist id="blog-categories">
                {BLOG_CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </>
          </Field>
          <Field label="Read time (minutes)"><Input type="number" name="readMins" defaultValue={b?.readMins ?? ""} /></Field>
          <Field label="Author"><Input name="author" defaultValue={b?.author ?? "SimpliLEAD Editorial Team"} /></Field>
          <Field label="Author role (optional)"><Input name="authorRole" defaultValue={b?.authorRole ?? ""} placeholder="PMP, Lead Trainer" /></Field>
        </div>
        <Field label="Excerpt (card description)"><Textarea name="excerpt" rows={3} defaultValue={b?.excerpt ?? ""} /></Field>
        <Field label="Content">
          <RichTextEditor name="content" defaultValue={b?.content || (id ? "" : CONTENT_TEMPLATE)} minHeight={380} />
        </Field>
        <p className="text-xs text-gray-500 -mt-2 mb-2">
          Styling is automatic: the first paragraph becomes the lead, H2s get accent bars and appear in the
          table of contents, tables render with branded headers, and “Frequently asked questions” H3+paragraph
          pairs become accordions.
        </p>
      </Section>

      <Section title="SEO & linking">
        <div className="grid grid-cols-2 gap-3">
          <Field label="SEO title (blank = article title)"><Input name="seoTitle" defaultValue={b?.seoTitle ?? ""} /></Field>
          <Field label="Tags (comma-separated)"><Input name="tags" defaultValue={(b?.tags ?? []).join(", ")} placeholder="Scrum, Agile" /></Field>
        </div>
        <Field label="SEO description (blank = excerpt)"><Textarea name="seoDescription" rows={2} defaultValue={b?.seoDescription ?? ""} /></Field>
        <Field label="Related course slugs (comma-separated — shown as the certification block and sidebar card)">
          <Input name="relatedCourseSlugs" defaultValue={(b?.relatedCourseSlugs ?? []).join(", ")} placeholder="csm-certification-training, psm-certification" />
        </Field>
        <Field label="Hero image URL (blank = auto-generate branded image from title + category)">
          <Input name="heroImage" defaultValue={b?.heroImage ?? ""} placeholder="/images/blog/my-article.png" />
        </Field>
      </Section>

      <div className="py-2"><Checkbox name="isPublished" label="Published" defaultChecked={b?.isPublished ?? true} /></div>
      <button className="btn-primary w-full">Save Blog</button>
    </form>
  );
}
