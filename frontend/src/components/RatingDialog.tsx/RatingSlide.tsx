"use client";

import { useContext, useEffect, useState } from "react";
import { CarouselItem } from "../ui/carousel";
import { useLanguage } from "~/app/providers";
import { Star } from "lucide-react";
import { CarouselApi } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { RankingContext as RatingContext } from "./RatingDialog";
import AccordionComment from "./AccordionComment";

export type RatingCategories =
  | "examDifficulty"
  | "assignmentDifficulty"
  | "interestLevel"
  | "overallScore";
interface RatingSlideProps {
  name: RatingCategories;
  api: CarouselApi;
}

export function RatingSlide({ name, api }: RatingSlideProps) {
  const { translation, dir } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const ctx = useContext(RatingContext);
  console.log({ ctx });

  useEffect(() => {
    if (name === "assignmentDifficulty") {
      ctx.assignmentComment = comment;
      ctx.assignmentDifficulty = rating;
    }
    if (name === "examDifficulty") {
      ctx.examComment = comment;
      ctx.examDifficulty = rating;
    }
    if (name === "interestLevel") {
      ctx.interestLevel = rating;
      ctx.interestComment = comment;
    }
    if (name === "overallScore") {
      ctx.overallScore = rating;
      ctx.overallComment = comment;
    }
  });

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
