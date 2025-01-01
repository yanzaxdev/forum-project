"use client";

import { useContext, useEffect, useState } from "react";
import { CarouselItem } from "../ui/carousel";
import { useLanguage } from "~/app/providers";
import { Star } from "lucide-react";
import { CarouselApi } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import {
  RatingCategory,
  RankingContext as RatingContext,
} from "./RatingDialog";

export type RatingCategories =
  | "examDifficulty"
  | "assignmentDifficulty"
  | "interestLevel"
  | "overallScore";

interface RatingSlideProps {
  category: RatingCategory;
  api: CarouselApi;
}

export function RatingSlide({ category, api }: RatingSlideProps) {
  const { name, rating: initRating, comment: initComment } = category;
  const { translation, dir } = useLanguage();
  const [rating, setRating] = useState<number>(initRating ?? 0);
  const [comment, setComment] = useState<string>(initComment ?? "");

  const ctx = useContext(RatingContext);

  useEffect(() => {
    if (name === "assignmentDifficulty") {
      ctx.assignmentDifficulty = rating;
    }
    if (name === "examDifficulty") {
      ctx.examDifficulty = rating;
    }
    if (name === "interestLevel") {
      ctx.interestLevel = rating;
    }
    if (name === "overallScore") {
      ctx.overallScore = rating;
      ctx.overallComment = comment;
    }
  });

  useEffect(() => {
    localStorage.setItem("rating", JSON.stringify(ctx));
  }, [rating, comment, ctx]);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
    if (!api) return;
    setTimeout(() => {
      api.scrollNext();
    }, 300);
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
              <Star
                key={starIndex}
                onClick={() => handleStarClick(starIndex)}
                className={cn(
                  "h-8 w-8 cursor-pointer transition-all hover:scale-110 md:h-10 md:w-10",
                  starIndex <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-yellow-400 hover:fill-yellow-200",
                )}
              />
            ))}
          </div>
        </div>
        {name === "overallScore" && (
          <textarea
            dir={dir}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-md border p-4"
            placeholder={translation.commentHere}
            rows={4}
          />
        )}
      </div>
    </CarouselItem>
  );
}
