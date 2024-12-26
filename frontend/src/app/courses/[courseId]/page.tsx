import { notFound } from "next/navigation";
import { SearchParams } from "next/dist/server/request/search-params";
import { getLang } from "~/utils/language";
import CourseCarousel from "./_components/CourseCarousel";
import { tryCatch } from "~/utils/tryCatch";
import { expressAPI } from "~/server/express";
import { InferSelectModel } from "drizzle-orm";
import { courses } from "~/server/db";

interface CourseProps {
  params: {
    courseId: string;
  };
  searchParams?: SearchParams;
}

const CoursePage = async ({ params, searchParams }: CourseProps) => {
  const { translation } = await getLang(searchParams);
  const pageParams = params;

  const courseIdNum = parseInt(pageParams.courseId, 10);
  if (isNaN(courseIdNum)) notFound();

  const [success, result] = (await tryCatch(
    expressAPI.get(`/api/courses/${courseIdNum}`),
  )) as [false, unknown] | [true, InferSelectModel<typeof courses>];

  if (!success) {
    console.error(result);
    notFound(); // Throw a 404 Not Found error
  }

  const course = result;

  return (
    <main dir={translation._dir} className="flex flex-1 flex-col py-1">
      <CourseCarousel course={course} className="flex-1" />
    </main>
  );
};

export default CoursePage;
