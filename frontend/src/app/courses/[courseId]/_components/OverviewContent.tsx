"use client";

import { Course } from "$/schema";
import { FC, useState } from "react";
import { useLanguage } from "~/app/providers";
import RatingDialog from "~/components/RatingDialog.tsx/RatingDialog";
import { H1, P } from "~/components/Typography";
import { Button } from "~/components/ui/button";
import { CarouselItem } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { Card, CardContent } from "~/components/ui/Card";
import { Separator } from "~/components/ui/separator";

interface Props {
  course: Course;
}

const OverviewContent: FC<Props> = ({ course }) => {
  const { isRTL, translation } = useLanguage();
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  const handleRankingComplete = () => {
    setIsRankingOpen(false);
  };

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
        {isRTL ? course.titleHe : course.titleEn}
      </H1>

      <P className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        {isRTL ? course.descriptionHe : course.descriptionEn}
      </P>

      <Card className="mb-6">
        <CardContent className="grid grid-cols-2 gap-4 pt-6">
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.courseNumber}:</strong> {course.id}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.level}:</strong> {course.level}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.creditPoints}:</strong> {course.creditPoints}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.department}:</strong>{" "}
            {isRTL ? course.departmentHe : course.departmentEn}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.gradeAverage}:</strong> {course.gradeAverage}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.examDifficulty}:</strong>{" "}
            {course.examDifficulty}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.assignmentDifficulty}:</strong>{" "}
            {course.assignmentDifficulty}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.interestLevel}:</strong> {course.interestLevel}
          </P>
          <P className="text-gray-600 dark:text-gray-400">
            <strong>{translation.overallScore}:</strong> {course.overallScore}
          </P>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <div className="space-y-6">
        <div>
          <H1 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {translation.prerequisites}
          </H1>
          <P className="text-gray-600 dark:text-gray-400">
            {isRTL ? course.prerequisitesHe : course.prerequisitesEn}
          </P>
        </div>

        <div>
          <H1 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {translation.topics}
          </H1>
          <P className="text-gray-600 dark:text-gray-400">
            {isRTL ? course.topicsHe : course.topicsEn}
          </P>
        </div>
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
