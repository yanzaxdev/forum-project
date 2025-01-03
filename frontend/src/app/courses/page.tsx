import { getLang } from "../../utils/language";
import { tryCatch } from "~/utils/tryCatch";
import { expressAPI } from "~/server/express";
import CourseCard from "../../components/CourseCard";
import { Course } from "$/schema";

interface CoursesPageProps {
  searchParams: {
    lang?: string;
  };
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
  const { dir } = await getLang(searchParams);
  const [success, result] = await tryCatch(expressAPI.get("/api/courses"));
  if (!success) {
    console.error(result);
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-red-500">
          Failed to load courses. Please try again later.
        </p>
      </main>
    );
  }
  const allCourses = result as Course[];

  return (
    <main dir={dir} className="mx-auto max-w-2xl px-4 py-8">
      {allCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </main>
  );
};

export default CoursesPage;
