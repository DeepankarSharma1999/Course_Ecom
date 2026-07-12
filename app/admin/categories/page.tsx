import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, PageHeader, Section } from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/image-uploader";
import { deleteCategory, saveCategory } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { courses: true } } },
  });
  // ponytail: image via raw SQL — running Prisma client may predate Category.image.
  let images = new Map<string, string | null>();
  try {
    const r = await prisma.$queryRaw<{ id: string; image: string | null }[]>`SELECT "id", "image" FROM "Category"`;
    images = new Map(r.map((x) => [x.id, x.image]));
  } catch { /* column not migrated yet */ }
  const createBound = saveCategory.bind(null, null);
  return (
    <>
      <AdminTopbar title="Categories" />
      <div className="p-6">
        <PageHeader title="Categories" description="Group courses for navigation and SEO category pages." />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {categories.length === 0 && <div className="card p-6 text-center text-ink-500 text-sm">No categories yet.</div>}
            {categories.map((cat) => (
              <form key={cat.id} action={saveCategory.bind(null, cat.id)} className="card p-4 grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3"><Field label="Slug"><Input name="slug" defaultValue={cat.slug} required /></Field></div>
                <div className="col-span-3"><Field label="Name"><Input name="name" defaultValue={cat.name} required /></Field></div>
                <div className="col-span-3"><Field label="Tagline"><Input name="tagline" defaultValue={cat.tagline ?? ""} /></Field></div>
                <div className="col-span-1"><Field label="Order"><Input type="number" name="order" defaultValue={cat.order} /></Field></div>
                <div className="col-span-1"><Field label="Icon"><Input name="icon" defaultValue={cat.icon ?? ""} /></Field></div>
                <div className="col-span-1 text-xs text-ink-500 text-right pb-2">{cat._count.courses} courses</div>
                <div className="col-span-12">
                  <Field label="Banner Image" hint="Shown behind the category page header. Leave empty for an auto-picked themed photo.">
                    <ImageUploader name="image" kind="asset" defaultValue={images.get(cat.id) ?? null} previewAspect="wide" />
                  </Field>
                </div>
                <div className="col-span-12 flex justify-between">
                  <button type="submit" className="btn-outline">Save</button>
                  <button formAction={deleteCategory.bind(null, cat.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </form>
            ))}
          </div>
          <form action={createBound}>
            <Section title="Add Category">
              <Field label="Slug" required><Input name="slug" required placeholder="agile-scrum" /></Field>
              <Field label="Name" required><Input name="name" required /></Field>
              <Field label="Tagline"><Input name="tagline" /></Field>
              <Field label="Icon (Lucide)"><Input name="icon" placeholder="Workflow" /></Field>
              <Field label="Banner Image" hint="Optional — auto-picked themed photo when empty">
                <ImageUploader name="image" kind="asset" previewAspect="wide" />
              </Field>
              <Field label="Order"><Input type="number" name="order" defaultValue={categories.length} /></Field>
              <button type="submit" className="btn-primary w-full">Add Category</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
