import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function NewSchedulePickCourse() {
  const courses = await prisma.course.findMany({ orderBy: { title: "asc" } });
  return (
    <>
      <AdminTopbar title="Add Schedule" />
      <div className="p-6 max-w-2xl">
        <PageHeader title="Add a Schedule" description="Pick the course to add a new schedule for." />
        <div className="card divide-y divide-ink-100">
          {courses.length === 0 && <div className="p-6 text-center text-ink-500">No courses yet. <Link href="/admin/courses/new" className="text-brand-600">Create one</Link>.</div>}
          {courses.map((c) => (
            <Link key={c.id} href={`/admin/courses/${c.id}/schedules`} className="flex items-center justify-between p-4 hover:bg-ink-50">
              <div>
                <div className="font-medium">{c.shortTitle || c.title}</div>
                <div className="text-xs text-ink-500">/{c.slug}</div>
              </div>
              <span className="text-brand-600 text-sm">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
