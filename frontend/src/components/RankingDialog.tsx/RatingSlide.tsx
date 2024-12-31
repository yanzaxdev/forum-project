"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { Textarea } from "~/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";

interface RatingSlideProps {
  title: string;
  description?: string;
  value: number;
  onChange: (rating: number) => void;
  onTextChange?: (text: string) => void;
  hasTextInput?: boolean;
  onNext?: () => void;
  isLast?: boolean;
}

export function RatingSlide({
  title,
  description,
  value,
  onChange,
  onTextChange,
  hasTextInput = false,
  onNext,
  isLast = false,
}: RatingSlideProps) {
  const [showTextInput, setShowTextInput] = useState(false);
  const [text, setText] = useState("");

  const handleRatingChange = (newRating: number) => {
    onChange(newRating);
    if (!isLast && onNext && !hasTextInput) {
      setTimeout(onNext, 500);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-center text-sm">
          {description}
        </p>
      )}

      <StarRating rating={value} onChange={handleRatingChange} size="lg" />

      {hasTextInput && (
        <div className="w-full space-y-2">
          <button
            onClick={() => setShowTextInput(!showTextInput)}
            className="text-muted-foreground hover:text-foreground flex items-center text-sm"
          >
            {showTextInput ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="ml-1">Add comment</span>
          </button>

          {showTextInput && (
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                onTextChange?.(e.target.value);
              }}
              placeholder="Share your thoughts..."
              className="min-h-[100px]"
            />
          )}
        </div>
      )}
    </div>
  );
}
