import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteBlog } from "@/lib/admin-actions";
import { ConfirmButton } from "@/components/admin/confirm-button";

export const dynamic = "force-dynamic";

export default async function BlogsList() {
  const blogs = await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <>
      <AdminTopbar title="Blogs" />
      <div className="p-6">
        <PageHeader
          title="Blogs"
          description="Articles shown on the Resources page."
          actions={<Link href="/admin/blogs/new" className="btn-primary"><Plus className="w-4 h-4" /> New Blog</Link>}
        />
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {blogs.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-ink-500">No blogs yet. <Link href="/admin/blogs/new" className="text-brand-600 hover:underline">Write the first one</Link>.</td></tr>
              )}
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-900">{b.title}</div>
                    <div className="text-xs text-ink-500">/resources/{b.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{b.category || "—"}</td>
                  <td className="px-4 py-3 text-ink-700">{b.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="px-4 py-3">{b.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="yellow">Draft</Badge>}</td>
                  <td className="px-4 py-3 text-right space-x-4 whitespace-nowrap">
                    <Link href={`/admin/blogs/${b.id}/edit`} className="inline-flex items-center gap-1 text-brand-600 hover:underline text-sm"><Pencil className="w-3 h-3" /> Edit</Link>
                    <form action={deleteBlog.bind(null, b.id)} className="inline-block">
                      <ConfirmButton message={`Delete "${b.title}"?`} className="inline-flex items-center gap-1 text-red-600 hover:underline text-sm">
                        <Trash2 className="w-3 h-3" /> Delete
                      </ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
