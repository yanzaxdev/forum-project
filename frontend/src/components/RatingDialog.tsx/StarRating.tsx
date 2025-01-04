"use client";

import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const StarRating = ({
  rating,
  onChange,
  size = "md",
  disabled = false,
}: StarRatingProps) => {
  const handleStarClick = (selectedRating: number) => {
    if (!disabled) {
      onChange(selectedRating);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleStarClick(star)}
          className={cn(
            "transition-colors",
            disabled
              ? "cursor-not-allowed"
              : "cursor-pointer hover:text-yellow-400",
            star <= rating ? "text-yellow-400" : "text-gray-300",
          )}
          disabled={disabled}
          role="radio"
          aria-checked={star === rating}
          tabIndex={disabled ? -1 : 0}
        >
          <Star className={sizeClasses[size]} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
