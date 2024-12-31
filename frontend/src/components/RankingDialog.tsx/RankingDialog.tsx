import React, { useState } from "react";
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
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";
import { Star } from "lucide-react";
import { xTrans } from "~/translations";
import { useLanguage } from "~/app/providers";

type TransKeys = keyof typeof xTrans.en;
const RankingDialog = ({ isOpen, onClose }) => {
  const { translation } = useLanguage();
  const categories: { name: TransKeys }[] = [
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

        <div className="flex flex-1 items-center justify-center py-6">
          <Carousel className="w-full">
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem
                  key={category.name}
                  className="flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center gap-6">
                    <h2 className="text-center text-lg font-medium">
                      {translation[category.name]}
                    </h2>
                    <div className="flex items-center justify-center">
                      <div className="inline-flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-12 w-12 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious onClick={handlePrevious} />
            <CarouselNext onClick={handleNext} />
          </Carousel>
        </div>

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
