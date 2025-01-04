"use client";

import { Course } from "$/schema";
import { FC, useState } from "react";
import { useLanguage } from "~/app/providers";
import { H1, P } from "~/components/Typography";
import { Button } from "~/components/ui/button";
import { CarouselItem } from "~/components/ui/carousel";
import RatingDialog from "~/components/RatingDialog.tsx/RatingDialog";
import { cn } from "~/lib/utils";

interface Props {
  course: Course;
}

const OverviewContent: FC<Props> = ({ course }) => {
  const { isRTL, translation } = useLanguage();
  const [isRankingOpen, setIsRankingOpen] = useState(false);
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

  const handleRankingComplete = () => {
    setIsRankingOpen(false);
  };

  /* ----- Return -----*/
  return (
    <CarouselItem className="relative h-full w-full rounded-lg bg-white p-6 dark:bg-gray-800">
      <Button
        onClick={() => setIsRankingOpen(true)}
        className={cn(
          "absolute top-4 mx-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600",
          isRTL ? "left-4" : "right-4",
        )}
      >
        {translation.rankThis}
      </Button>
      <H1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        {isRTL ? titleHe : titleEn}
      </H1>
      <P className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        {isRTL ? descriptionHe : descriptionEn}
      </P>
      <div className="grid grid-cols-2 gap-4">
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.courseNumber}:</strong> {courseNumber}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.level}:</strong> {level}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.creditPoints}:</strong> {creditPoints}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.department}:</strong> {department}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.gradeAverage}:</strong> {gradeAverage}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.examDifficulty}:</strong> {examDifficulty}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.assignmentDifficulty}:</strong>{" "}
          {assignmentDifficulty}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.interestLevel}:</strong> {interestLevel}
        </P>
        <P className="text-gray-600 dark:text-gray-400">
          <strong>{translation.overallScore}:</strong> {overallScore}
        </P>
      </div>
      <RatingDialog
        isOpen={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
        onComplete={handleRankingComplete}
      />
    </CarouselItem>
  );
};

export default OverviewContent;
