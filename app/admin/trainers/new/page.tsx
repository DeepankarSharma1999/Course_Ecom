import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";
import { TrainerForm } from "@/components/admin/trainer-form";
import { saveTrainer } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function NewTrainer() {
  const courses = await prisma.course.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true, shortTitle: true } });
  return (
    <>
      <AdminTopbar title="New Trainer" />
      <div className="p-6">
        <PageHeader title="Add Trainer" actions={<Link href="/admin/trainers" className="btn-ghost">Cancel</Link>} />
        <form action={saveTrainer.bind(null, null)}>
          <TrainerForm courses={courses} />
        </form>
      </div>
    </>
  );
}
