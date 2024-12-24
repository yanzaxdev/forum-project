import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { courses } from "~/server/db";
import { SearchParams } from "next/dist/server/request/search-params";
import { getLangFromServer } from "~/utils/language";
import CourseCarousel from "./_components/CourseCarousel";

interface CourseProps {
  params: {
    courseId: string;
  };
  searchParams?: SearchParams;
}

const CoursePage = async ({ params, searchParams }: CourseProps) => {
  const { translation } = await getLangFromServer(searchParams);
  const pageParams = await params;

  const courseIdNum = parseInt(pageParams.courseId, 10);
  if (isNaN(courseIdNum)) notFound();

  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseIdNum))
    .limit(1);

  if (!course) notFound();

  return (
    <main dir={translation._dir} className="flex flex-1 flex-col py-1">
      <CourseCarousel course={course} className="flex-1" />
    </main>
  );
};

export default CoursePage;
