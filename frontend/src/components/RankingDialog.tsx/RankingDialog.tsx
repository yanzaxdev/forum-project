import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";
import { TranslationKeys } from "~/translations";
import { useLanguage } from "~/app/providers";
import { RatingSlide } from "./RatingSlide";

interface RankingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}
const RankingDialog: FC<RankingDialogProps> = ({ isOpen, onClose }) => {
  const { translation } = useLanguage();
  const categories: { name: TranslationKeys }[] = [
    { name: "overallScore" },
    { name: "examDifficulty" },
    { name: "assignmentDifficulty" },
    { name: "interestLevel" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[500px] min-w-[80vh] flex-col sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">{}</DialogTitle>
        </DialogHeader>

        <Carousel className="flex w-full flex-1 items-center justify-center py-6">
          <CarouselContent>
            {categories.map((category) => (
              <RatingSlide key={category.name} name={category.name} />
            ))}
          </CarouselContent>

          <CarouselPrevious onClick={handlePrevious} />
          <CarouselNext onClick={handleNext} />
        </Carousel>

        <DialogFooter className="flex flex-col gap-2">
          {currentIndex === categories.length - 1 ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="default">{translation.completeRanking}</Button>
              <Button variant="outline">Review in Detail</Button>
              <Button variant="outline">Rate More Courses</Button>
            </div>
          ) : (
            <></>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RankingDialog;
