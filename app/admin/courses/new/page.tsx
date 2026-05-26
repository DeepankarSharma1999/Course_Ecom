import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";
import { CourseForm } from "@/components/admin/course-form";
import { createCourse } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <>
      <AdminTopbar title="New Course" />
      <div className="p-6">
        <PageHeader
          title="Create Course"
          description="Add a new course to the catalog. You can edit schedules, FAQs, and country/city variants after saving."
          actions={<Link href="/admin/courses" className="btn-ghost">Cancel</Link>}
        />
        <form action={createCourse}>
          <CourseForm categories={categories} />
        </form>
      </div>
    </>
  );
}
