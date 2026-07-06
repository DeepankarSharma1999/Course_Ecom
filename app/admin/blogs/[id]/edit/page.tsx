import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await prisma.blog.findUnique({ where: { id } });
  if (!b) notFound();
  return (
    <>
      <AdminTopbar title="Edit Blog" />
      <div className="p-6 max-w-3xl">
        <PageHeader title={b.title} actions={<Link href="/admin/blogs" className="btn-ghost">Back</Link>} />
        <BlogForm id={b.id} b={b} />
      </div>
    </>
  );
}
