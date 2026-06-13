import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createPage, deletePage } from "@/lib/page-actions";
import Link from "next/link";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPages() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    if (!title || !slug) return;
    
    const res = await createPage({ title, slug });
    if (res.success && res.id) {
      redirect(`/admin/pages/${res.id}`);
    }
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) await deletePage(id);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-900 mb-2">Site Pages</h1>
        <p className="text-ink-500 text-sm">Manage content pages like /corporate, /about, /privacy, etc.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Pages Table */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-ink-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ink-50 border-b border-ink-100 text-xs font-bold text-ink-500 uppercase tracking-wider">
                <th className="px-6 py-4">Page Title</th>
                <th className="px-6 py-4">URL Slug</th>
                <th className="px-6 py-4">Auth Required</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-ink-400">No pages found. Create one.</td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id} className="hover:bg-ink-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-ink-900">{page.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-600 font-mono">/{page.slug}</td>
                    <td className="px-6 py-4">
                      {page.requiresAuth ? (
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Login Required</span>
                      ) : (
                        <span className="bg-ink-100 text-ink-600 text-xs font-bold px-2 py-1 rounded">Universal</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {page.isPublished ? (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Published</span>
                      ) : (
                        <span className="bg-ink-100 text-ink-600 text-xs font-bold px-2.5 py-1 rounded-full">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/pages/${page.id}`} className="text-primary hover:text-[#0f6b6b] text-sm font-semibold flex items-center gap-1">
                          <Edit className="w-4 h-4" /> Edit
                        </Link>
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={page.id} />
                          <button type="submit" className="text-red-500 hover:text-red-700 p-1 rounded transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Right Side: Add Form */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-ink-100 p-6 sticky top-8">
            <h2 className="text-lg font-bold text-ink-900 mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" /> Add New Page
            </h2>
            
            <form action={handleCreate} className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <label className="text-sm font-bold text-ink-900">Slug *</label>
                  <span className="text-[11px] text-ink-400">No leading slash</span>
                </div>
                <input 
                  type="text" 
                  name="slug" 
                  required 
                  placeholder="e.g. privacy-policy or home/referrals" 
                  className="w-full px-4 py-2.5 border border-ink-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  pattern="[a-zA-Z0-9\-_/]+"
                  title="Only letters, numbers, hyphens, underscores, and forward slashes allowed."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-900 mb-1.5">Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder="e.g. Privacy Policy" 
                  className="w-full px-4 py-2.5 border border-ink-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-[#0f6b6b] text-white font-bold py-3 rounded-lg transition-colors mt-2"
              >
                Create Page
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
