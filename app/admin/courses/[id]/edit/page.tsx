import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, PageHeader } from "@/components/admin/ui";
import { CourseForm } from "@/components/admin/course-form";
import { updateCourse, deleteCourse, toggleCoursePublished } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const course = await prisma.course.findUnique({ where: { id }, include: { category: true } });
  if (!course) notFound();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const updateBound = updateCourse.bind(null, id);
  const deleteBound = deleteCourse.bind(null, id);
  const toggleBound = toggleCoursePublished.bind(null, id);

  return (
    <>
      <AdminTopbar title={`Edit: ${course.shortTitle || course.title}`} />
      <div className="p-6">
        <PageHeader
          title={course.shortTitle || course.title}
          description={`/${course.slug}`}
          actions={
            <div className="flex gap-2 items-center">
              {course.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="yellow">Draft</Badge>}
              <form action={toggleBound}><button className="btn-outline">{course.isPublished ? "Unpublish" : "Publish"}</button></form>
              <Link href={`/admin/courses/${id}/schedules`} className="btn-ghost">Schedules</Link>
              <Link href={`/admin/courses/${id}/faqs`} className="btn-ghost">FAQs</Link>
              <Link href={`/admin/courses/${id}/variants`} className="btn-ghost">Variants</Link>
              <Link href={`/${course.slug}`} target="_blank" className="btn-ghost">View →</Link>
            </div>
          }
        />
        {sp.saved && <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 text-sm">Saved.</div>}
        <form action={updateBound}>
          <CourseForm course={course} categories={categories} />
        </form>

        <div className="mt-10 card p-6 border-red-200">
          <h3 className="font-semibold text-red-700 mb-2">Danger Zone</h3>
          <p className="text-sm text-ink-600 mb-4">Deleting a course will also delete its schedules, FAQs, and variants. This cannot be undone.</p>
          <form action={deleteBound}>
            <button className="btn bg-red-600 text-white hover:bg-red-700">Delete this course</button>
          </form>
        </div>
      </div>
    </>
  );
}
