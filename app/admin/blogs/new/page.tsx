import Link from "next/link";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <>
      <AdminTopbar title="New Blog" />
      <div className="p-6 max-w-3xl">
        <PageHeader title="Write Blog" actions={<Link href="/admin/blogs" className="btn-ghost">Cancel</Link>} />
        <BlogForm id={null} />
      </div>
    </>
  );
}
