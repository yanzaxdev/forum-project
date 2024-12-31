import React, { FC, useState, useEffect } from "react";
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
import { TranslationKeys } from "~/translations";
import { useLanguage } from "~/app/providers";
import { RatingSlide } from "./RatingSlide";
import { CarouselApi } from "../ui/course_carousel";

interface RankingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const CATEGORIES: { name: TranslationKeys }[] = [
  { name: "examDifficulty" },
  { name: "assignmentDifficulty" },
  { name: "interestLevel" },
  { name: "overallScore" },
];

const RatingDialog: FC<RankingDialogProps> = ({ isOpen, onClose }) => {
  const { isRTL } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const moveRight = () => {
    if (api) api.scrollNext();
  };
  const moveLeft = () => {
    if (api) api.scrollPrev();
  };

  const handleNext = () => {
    if (isRTL) moveLeft();
    else moveRight();
  };

  const handlePrevious = () => {
    if (isRTL) moveRight();
    else moveLeft();
  };

  // Calculate button states based on RTL
  const isAtStart = isRTL ? current === count - 1 : current === 0;
  const isAtEnd = isRTL ? current === 0 : current === count - 1;

  const rankingContext: RankingContextType = {
    examDifficulty: 0,
    examComment: "",
    assignmentDifficulty: 0,
    assignmentComment: "",
    interestLevel: 0,
    interestComment: "",
    overallScore: 0,
    overallComment: "",
  };

  return (
    <RankingContext.Provider value={rankingContext}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex h-[500px] min-w-[80vh] flex-col sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">{}</DialogTitle>
          </DialogHeader>

          <Carousel
            opts={{
              direction: isRTL ? "rtl" : "ltr",
            }}
            setApi={setApi}
            className="flex w-full flex-1 items-center justify-center py-6"
          >
            <CarouselContent className={`${isRTL ? "flex-row-reverse" : ""}`}>
              {CATEGORIES.map((category) => (
                <RatingSlide
                  api={api}
                  key={category.name}
                  name={category.name}
                />
              ))}
            </CarouselContent>

            <CarouselPrevious
              onClick={handlePrevious}
              disabled={isAtStart}
              className={`${isAtStart ? "hidden" : ""}`}
            />
            <CarouselNext
              onClick={handleNext}
              disabled={isAtEnd}
              className={`${isAtEnd ? "hidden" : ""}`}
            />
          </Carousel>

          <DialogFooter className="absolute bottom-0 pb-2"></DialogFooter>
        </DialogContent>
      </Dialog>
    </RankingContext.Provider>
  );
};

export default RatingDialog;

export interface RankingContextType {
  examDifficulty: number;
  examComment: string;
  assignmentDifficulty: number;
  assignmentComment: string;
  interestLevel: number;
  interestComment: string;
  overallScore: number;
  overallComment: string;
}
export const RankingContext = React.createContext<RankingContextType>({
  examDifficulty: 0,
  examComment: "",
  assignmentDifficulty: 0,
  assignmentComment: "",
  interestLevel: 0,
  interestComment: "",
  overallScore: 0,
  overallComment: "",
});
