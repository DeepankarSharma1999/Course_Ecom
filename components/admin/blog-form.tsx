import { Checkbox, Field, Input, Section, Textarea } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { saveBlog } from "@/lib/admin-actions";

type BlogValues = {
  title?: string; slug?: string; category?: string | null; excerpt?: string | null;
  content?: string; readMins?: number | null; isPublished?: boolean;
};

export function BlogForm({ id, b }: { id: string | null; b?: BlogValues }) {
  return (
    <form action={saveBlog.bind(null, id)}>
      <Section title="Article">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title" required><Input name="title" defaultValue={b?.title} required /></Field>
          <Field label="Slug (blank = from title)"><Input name="slug" defaultValue={b?.slug} placeholder="my-article" /></Field>
          <Field label="Category"><Input name="category" defaultValue={b?.category ?? ""} placeholder="Agile" /></Field>
          <Field label="Read time (minutes)"><Input type="number" name="readMins" defaultValue={b?.readMins ?? ""} /></Field>
        </div>
        <Field label="Excerpt (card description)"><Textarea name="excerpt" rows={3} defaultValue={b?.excerpt ?? ""} /></Field>
        <Field label="Content"><RichTextEditor name="content" defaultValue={b?.content ?? ""} minHeight={380} /></Field>
        <div className="py-2"><Checkbox name="isPublished" label="Published" defaultChecked={b?.isPublished ?? true} /></div>
        <button className="btn-primary w-full">Save Blog</button>
      </Section>
    </form>
  );
}
