"use client";

import { CarouselItem } from "../ui/course_carousel";
import { useLanguage } from "~/app/providers";
import { TranslationKeys } from "~/translations";
import { Star } from "lucide-react";
import { CarouselApi } from "~/components/ui/carousel";

interface RatingSlideProps {
  name: TranslationKeys;
  api: CarouselApi;
}

export function RatingSlide({ name }: RatingSlideProps) {
  const { translation } = useLanguage();

  return (
    <CarouselItem key={name} className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-lg font-medium">{translation[name]}</h2>
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-12 w-12 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
