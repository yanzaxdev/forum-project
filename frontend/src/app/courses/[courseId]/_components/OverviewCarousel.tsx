"use client";

import { FC } from "react";
import { useLanguage } from "~/app/providers";
import { CarouselItem } from "~/components/ui/carousel";
import { CourseSelect } from "~/server/db/schema/courses";

interface Props {
  course: CourseSelect;
}

const OverviewCarousel: FC<Props> = ({ course }) => {
  const { isHeb, translation } = useLanguage();

  /* ----- State -----*/
  const {
    titleEn,
    titleHe,
    descriptionEn,
    descriptionHe,
    courseNumber,
    level,
    creditPoints,
    department,
    gradeAverage,
    examDifficulty,
    assignmentDifficulty,
    interestLevel,
    overallScore,
  } = course;

  /* ----- Return -----*/
  return (
    <CarouselItem className="relative h-full w-full rounded-lg bg-white p-6 dark:bg-gray-800">
      <button
        className={`absolute top-4 ${isHeb ? "left-4" : "right-4"} rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600`}
      >
        {translation.rankThis}
      </button>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        {isHeb ? titleHe : titleEn}
      </h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        {isHeb ? descriptionHe : descriptionEn}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.courseNumber}:</strong> {courseNumber}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.level}:</strong> {level}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.creditPoints}:</strong> {creditPoints}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.department}:</strong> {department}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.gradeAverage}:</strong> {gradeAverage}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.examDifficulty}:</strong> {examDifficulty}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.assignmentDifficulty}:</strong>{" "}
          {assignmentDifficulty}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.interestLevel}:</strong> {interestLevel}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>{translation.overallScore}:</strong> {overallScore}
        </p>
      </div>
    </CarouselItem>
  );
};

export default OverviewCarousel;
