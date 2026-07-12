import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updatePage } from "@/lib/page-actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });

  if (!page) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const requiresAuth = formData.get("requiresAuth") === "true";
    const isPublished = formData.get("isPublished") === "true";

    await updatePage(page!.id, { title, slug, content, requiresAuth, isPublished });
    redirect("/admin/pages");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages" className="p-2 hover:bg-ink-100 rounded-full text-ink-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-ink-900">Edit Page</h1>
            <p className="text-ink-500 text-sm">/{page.slug}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-ink-100 p-8">
        <form action={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-1.5">Title</label>
              <input 
                type="text" 
                name="title" 
                defaultValue={page.title} 
                required 
                className="w-full px-4 py-2.5 border border-ink-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-1.5">URL Slug</label>
              <input 
                type="text" 
                name="slug" 
                defaultValue={page.slug} 
                required 
                className="w-full px-4 py-2.5 border border-ink-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-ink-50 rounded-lg border border-ink-100">
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Visibility</label>
              <select name="requiresAuth" defaultValue={page.requiresAuth ? "true" : "false"} className="w-full px-4 py-2.5 border border-ink-200 rounded-lg outline-none">
                <option value="false">Universal (Publicly viewable)</option>
                <option value="true">Learner Only (Requires login)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-900 mb-2">Status</label>
              <select name="isPublished" defaultValue={page.isPublished ? "true" : "false"} className="w-full px-4 py-2.5 border border-ink-200 rounded-lg outline-none">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-ink-900 mb-1.5">Page Content</label>
            <RichTextEditor name="content" defaultValue={page.content} minHeight={380} />
          </div>

          <div className="flex justify-end pt-4 border-t border-ink-100">
            <button type="submit" className="bg-primary hover:bg-[#0f6b6b] text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
