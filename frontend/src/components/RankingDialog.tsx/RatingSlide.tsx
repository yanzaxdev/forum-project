"use client";

import { CarouselItem } from "../ui/carousel";
import { useLanguage } from "~/app/providers";
import { TranslationKeys } from "~/translations";
import { Star } from "lucide-react";
import { CarouselApi } from "~/components/ui/carousel";
import { H2 } from "../Typography";

interface RatingSlideProps {
  name: TranslationKeys;
  api: CarouselApi;
}

export function RatingSlide({ name }: RatingSlideProps) {
  const { translation } = useLanguage();

  return (
    <CarouselItem key={name} className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <H2 className="text-center text-lg font-medium">{translation[name]}</H2>
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
