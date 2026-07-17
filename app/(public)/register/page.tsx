import { prisma } from "@/lib/prisma";
import { RegisterForm } from "@/components/register-form";

export const dynamic = "force-dynamic";

export const metadata = { title: "Register for a Course" };

// Course registration (no payment gateway yet): the learner picks a course and
// submits the form; an admin confirms participation from Admin > Registrations,
// after which the course appears in their dashboard.
export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: [{ category: { order: "asc" } }, { title: "asc" }],
    select: { slug: true, title: true, category: { select: { name: true } } },
  });
  const byCategory = new Map<string, typeof courses>();
  for (const c of courses) {
    const key = c.category?.name ?? "Other";
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key)!.push(c);
  }

  return (
    <div className="bg-[#fcfdfd] min-h-[70vh] py-12 md:py-16">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#082032] mb-2 text-center">Register for a Course</h1>
        <p className="text-[15px] text-[#475569] text-center mb-8">
          Submit your registration and our team will confirm your seat. The course appears in your dashboard once confirmed.
        </p>
        <RegisterForm
          groups={[...byCategory].map(([category, list]) => ({ category, courses: list.map((c) => ({ slug: c.slug, title: c.title })) }))}
          preselected={course}
        />
      </div>
    </div>
  );
}
