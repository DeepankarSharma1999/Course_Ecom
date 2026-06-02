import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { formatPrice } from "@/lib/utils";
import { Calendar, MessageCircleQuestion, MapPin, Pencil, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ComboCoursesList() {
  const courses = await prisma.course.findMany({
    where: { category: { slug: "combo-courses" } },
    orderBy: { updatedAt: "desc" },
    include: {
      category: true,
      _count: { select: { schedules: true, faqs: true, pageVariants: true } },
    },
  });
  return (
    <>
      <AdminTopbar title="Combo Courses" />
      <div className="p-6">
        <PageHeader
          title="Combo Courses"
          description="Manage your bundled training offerings. These courses are displayed on the dedicated Combo Courses page."
          actions={<Link href="/admin/courses/new" className="btn-primary"><Plus className="w-4 h-4" /> New Combo</Link>}
        />

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price (INR)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Relations</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {courses.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-ink-500">No courses yet. <Link href="/admin/courses/new" className="text-brand-600 hover:underline">Create the first one</Link>.</td></tr>
              )}
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-900">{c.shortTitle || c.title}</div>
                    <div className="text-xs text-ink-500">/{c.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{c.category?.name || "—"}</td>
                  <td className="px-4 py-3">{c.basePriceInr ? formatPrice(c.basePriceInr, "INR") : "—"}</td>
                  <td className="px-4 py-3 space-x-1">
                    {c.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="yellow">Draft</Badge>}
                    {c.isFeatured && <Badge tone="blue">Featured</Badge>}
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-600 space-x-3">
                    <Link href={`/admin/courses/${c.id}/schedules`} className="inline-flex items-center gap-1 hover:text-brand-600"><Calendar className="w-3 h-3" /> {c._count.schedules}</Link>
                    <Link href={`/admin/courses/${c.id}/faqs`} className="inline-flex items-center gap-1 hover:text-brand-600"><MessageCircleQuestion className="w-3 h-3" /> {c._count.faqs}</Link>
                    <Link href={`/admin/courses/${c.id}/variants`} className="inline-flex items-center gap-1 hover:text-brand-600"><MapPin className="w-3 h-3" /> {c._count.pageVariants}</Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/courses/${c.id}/edit`} className="inline-flex items-center gap-1 text-brand-600 hover:underline text-sm"><Pencil className="w-3 h-3" /> Edit</Link>
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
