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
import { RatingContextType } from "$/ranking";
import { SignIn, useUser } from "@clerk/nextjs";
import { RatingProvider } from "./RatingProvider";
interface RankingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export interface RatingCategory {
  name: RatingCategories;
  rating: number;
  comment?: string;
}
const CATEGORIES: RatingCategory[] = [
  { name: RatingCategories.assignmentDifficulty, rating: 0, comment: "" },
  { name: RatingCategories.examDifficulty, rating: 0, comment: "" },
  { name: RatingCategories.interestLevel, rating: 0, comment: "" },
  { name: RatingCategories.overallScore, rating: 0, comment: "" },
];

const RatingDialog: FC<RankingDialogProps> = ({ isOpen, onClose }) => {
  const { isRTL, translation } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const user = useUser();
  const [showSignIn, setShowSignIn] = useState(false);

  const submitRating = useMutation({
    mutationFn: async (data: RatingContextType) => {
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
    if (user.isSignedIn) {
      submitRating.mutate(ratingContext);
    }
    if (!user.isSignedIn) {
      setShowSignIn(true);
      return;
    }
  };

  // Calculate button states based on RTL
  const isAtStart = isRTL ? current === count - 1 : current === 0;
  const isAtEnd = isRTL ? current === 0 : current === count - 1;

  const ratingContext: RatingContextType = React.useMemo(
    () => ({
      examDifficulty: 0,
      assignmentDifficulty: 0,
      interestLevel: 0,
      overallScore: 0,
      overallComment: "",
      userID: user.isSignedIn ? user.user.id : "",
    }),
    [user.isSignedIn, user.user],
  );

  return (
    <RatingProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex h-[70vh] w-[90vw] flex-col p-8 md:h-[400px] md:w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">{}</DialogTitle>
          </DialogHeader>
          {showSignIn && <SignIn />}
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
                  category={category}
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
    </RatingProvider>
  );
};

export default RatingDialog;
