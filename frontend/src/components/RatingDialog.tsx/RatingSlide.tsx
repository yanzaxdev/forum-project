"use client";

import { useContext, useState } from "react";
import { CarouselItem } from "../ui/course_carousel";
import { useLanguage } from "~/app/providers";
import { TranslationKeys } from "~/translations";
import { Star } from "lucide-react";
import { CarouselApi } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { RankingContext as RatingContext } from "./RatingDialog";

interface RatingSlideProps {
  name: TranslationKeys;
  api: CarouselApi;
}

export function RatingSlide({ name }: RatingSlideProps) {
  const { translation } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const {} = useContext(RatingContext);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  return (
    <CarouselItem key={name} className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-lg font-medium">{translation[name]}</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          {rating > 0 && (
            <div className="text-sm text-gray-500">{rating}/5</div>
          )}
          <div className="inline-flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <button
                key={starIndex}
                onClick={() => handleStarClick(starIndex)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "h-12 w-12 transition-all",
                    starIndex <= rating
                      ? "fill-yellow-400 font-bold text-yellow-400"
                      : "text-yellow-400",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
