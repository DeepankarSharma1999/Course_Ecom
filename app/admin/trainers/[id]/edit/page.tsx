import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";
import { TrainerForm } from "@/components/admin/trainer-form";
import { deleteTrainer, saveTrainer } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditTrainer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trainer = await prisma.trainer.findUnique({ where: { id }, include: { courses: true } });
  if (!trainer) notFound();
  const courses = await prisma.course.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true, shortTitle: true } });
  const assignedCourseIds = trainer.courses.map((ct) => ct.courseId);
  return (
    <>
      <AdminTopbar title={`Edit: ${trainer.name}`} />
      <div className="p-6">
        <PageHeader title={trainer.name} description={trainer.title ?? ""} actions={<Link href="/admin/trainers" className="btn-ghost">← Back</Link>} />
        <form action={saveTrainer.bind(null, id)}>
          <TrainerForm trainer={trainer} courses={courses} assignedCourseIds={assignedCourseIds} />
        </form>
        <div className="mt-10 card p-6 border-red-200">
          <h3 className="font-semibold text-red-700 mb-2">Danger Zone</h3>
          <form action={deleteTrainer.bind(null, id)}>
            <button className="btn bg-red-600 text-white hover:bg-red-700">Delete this trainer</button>
          </form>
        </div>
      </div>
    </>
  );
}
