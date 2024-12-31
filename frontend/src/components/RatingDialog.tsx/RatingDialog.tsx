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
import { useLanguage } from "~/app/providers";
import { RatingCategories, RatingSlide } from "./RatingSlide";
import { CarouselApi } from "../ui/carousel";
import { Button } from "../ui/button";
import { expressAPI } from "~/server/express";
import { useMutation } from "@tanstack/react-query";
import { RankingContextType } from "$/ranking";

interface RankingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const CATEGORIES: { name: RatingCategories }[] = [
  { name: "examDifficulty" },
  { name: "assignmentDifficulty" },
  { name: "interestLevel" },
  { name: "overallScore" },
];

const RatingDialog: FC<RankingDialogProps> = ({ isOpen, onClose }) => {
  const { isRTL, translation } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const submitRating = useMutation({
    mutationFn: async (data: RankingContextType) => {
      const response = await expressAPI.post("/api/rating", data);
      return response;
    },
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

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

  const onSubmit = async () => {
    if (!isValid(rankingContext)) {
      alert("Please fill in all fields");
    }
    submitRating.mutate(rankingContext);
  };

  // Calculate button states based on RTL
  const isAtStart = isRTL ? current === count - 1 : current === 0;
  const isAtEnd = isRTL ? current === 0 : current === count - 1;

  const rankingContext: RankingContextType = {
    examDifficulty: 0,
    assignmentDifficulty: 0,
    interestLevel: 0,
    overallScore: 0,
    overallComment: "",
  };

  return (
    <RankingContext.Provider value={rankingContext}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="mx-2 flex h-[70vh] w-[90vw] flex-col md:h-[400px] md:w-[500px]">
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

          <DialogFooter
            className={`absolute bottom-0 pb-2 ${isRTL ? "left-2" : "right-2"}`}
          >
            {current === CATEGORIES.length - 1 && (
              <Button
                onClick={onSubmit}
                className="w-full rounded-md bg-gray-800 py-2 text-white"
              >
                {translation.submit}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RankingContext.Provider>
  );
};

export default RatingDialog;

export const RankingContext = React.createContext<RankingContextType>({
  examDifficulty: 0,
  assignmentDifficulty: 0,
  interestLevel: 0,
  overallScore: 0,
  overallComment: "",
});

function isValid(context: RankingContextType) {
  return (
    context.examDifficulty > 0 &&
    context.assignmentDifficulty > 0 &&
    context.interestLevel > 0 &&
    context.overallScore > 0 &&
    context.overallComment !== ""
  );
}
