import { prisma } from "@/lib/prisma";
import { ComboCoursesClient } from "./combo-client";

export const metadata = {
  title: "Combo Courses | Ulearnsystems",
  description: "Unbeatable saving combo schedules. Explore our combo courses for maximum value.",
};

export default async function ComboCoursesPage() {
  const courses = await prisma.course.findMany({
    where: {
      category: { slug: "combo-courses" },
      isPublished: true,
    },
    orderBy: { createdAt: "asc" }
  });

  return <ComboCoursesClient courses={courses} />;
}
