"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import { useLanguage } from "~/app/providers";

// Reuse your StarRating & RatingSlide
import { RatingSlide } from "./RatingSlide";

interface RatingCategory {
  name: string;
  title: string;
  description?: string;
  hasTextInput?: boolean;
  requiredComment?: boolean;
}

const categories: RatingCategory[] = [
  { name: "gradeAverage", title: "Grade Average" },
  { name: "examDifficulty", title: "Exam Difficulty" },
  { name: "assignmentDifficulty", title: "Assignment Difficulty" },
  { name: "interestLevel", title: "Interest Level" },
  {
    name: "overallScore",
    title: "Overall Score",
    description: "Summarize your overall impression",
    hasTextInput: true,
    requiredComment: true, // let’s say we want the final comment to be required
  },
];

interface RateCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (
    allRatings: Record<string, number>,
    comments: Record<string, string>,
  ) => void;
}

export function RankingDialog({
  isOpen,
  onClose,
  onComplete,
}: RateCourseDialogProps) {
  const { translation } = useLanguage();

  // Store each category’s numeric rating
  const [ratings, setRatings] = useState<Record<string, number>>({});

  // Store each category’s text comment
  const [comments, setComments] = useState<Record<string, string>>({});

  // Current index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRatingChange = (categoryName: string, value: number) => {
    setRatings((prev) => ({ ...prev, [categoryName]: value }));
  };

  const handleCommentChange = (categoryName: string, text: string) => {
    setComments((prev) => ({ ...prev, [categoryName]: text }));
  };

  const handleNext = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    // For the final category, if requiredComment is set, ensure user wrote something
    const finalCategory = categories[currentIndex];
    if (
      finalCategory &&
      finalCategory.requiredComment &&
      !comments[finalCategory.name]?.trim()
    ) {
      // Could show an error toast or something
      alert("Please add a comment for the overall score!");
      return;
    }

    // Submit everything
    onComplete(ratings, comments);
  };

  const handleReviewInDetail = () => {
    // Could close dialog & navigate to a separate “detailed review” page
    onClose();
    // e.g., router.push("/courses/[courseId]/review?type=detailed")
  };

  const handleRateMoreCourses = () => {
    // Could close dialog & navigate to a rating page with a full list of courses
    onClose();
    // e.g., router.push("/courses/rating-hub")
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{translation.rankThis}</DialogTitle>
          <DialogDescription>Rate each category</DialogDescription>
        </DialogHeader>

        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((category, idx) => (
              <CarouselItem key={category.name}>
                {/** Use your existing <RatingSlide> or new custom */}
                <RatingSlide
                  title={category.title}
                  description={category.description}
                  value={ratings[category.name] ?? 0}
                  onChange={(val) => {
                    handleRatingChange(category.name, val);
                    // If not the final slide or if comment not required, auto-advance
                    if (
                      !category.requiredComment &&
                      idx < categories.length - 1
                    ) {
                      setTimeout(() => handleNext(), 500);
                    }
                  }}
                  hasTextInput={category.hasTextInput}
                  onTextChange={(txt) =>
                    handleCommentChange(category.name, txt)
                  }
                  onNext={handleNext}
                  isLast={idx === categories.length - 1}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious onClick={handlePrevious} />
          <CarouselNext onClick={handleNext} />
        </Carousel>

        <DialogFooter className="flex flex-col gap-2">
          {/** Final “Complete” button. But we can also put 2 other actions: “Review in Detail” or “Rate More…” */}
          {currentIndex === categories.length - 1 ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="default" onClick={handleComplete}>
                {translation.completeRanking}
              </Button>
              <Button variant="outline" onClick={handleReviewInDetail}>
                Review in Detail
              </Button>
              <Button variant="outline" onClick={handleRateMoreCourses}>
                Rate More Courses
              </Button>
            </div>
          ) : (
            <Button onClick={handleNext}>{translation.next}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
