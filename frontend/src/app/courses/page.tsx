import { db } from "~/server/db";
import { courses } from "~/server/db";
import { getLangFromServer } from "../../utils/language";
import CourseCard from "../../components/CourseCard";

interface CoursesPageProps {
  searchParams: {
    lang?: string;
  };
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
  const allCourses = await db.select().from(courses);
  const { translation } = await getLangFromServer(searchParams);

  return (
    <main dir={translation._dir} className="mx-auto max-w-2xl px-4 py-8">
      {allCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </main>
  );
};

export default CoursesPage;
