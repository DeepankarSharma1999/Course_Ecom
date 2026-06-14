import { prisma } from "@/lib/prisma";
import { ComboCoursesClient } from "./combo-client";

export const metadata = {
  title: "Combo Courses | Ulearnsystems",
  description: "Unbeatable saving combo schedules. Explore our combo courses for maximum value.",
};

export const dynamic = "force-dynamic";

export default async function ComboCoursesPage() {
  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({
      where: {
        category: { slug: "combo-courses" },
        isPublished: true,
      },
      orderBy: { createdAt: "asc" },
    });
  } catch {
    courses = [];
  }

  return <ComboCoursesClient courses={courses} />;
}
