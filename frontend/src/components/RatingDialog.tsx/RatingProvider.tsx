import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useContext } from "react";

// Type definitions
export interface RankingContextType {
  examDifficulty: number;
  assignmentDifficulty: number;
  interestLevel: number;
  overallScore: number;
  overallComment: string;
}

export interface RatingContextValue {
  ratingState: RankingContextType;
  setRatingContext: (
    value:
      | RankingContextType
      | ((prev: RankingContextType) => RankingContextType),
  ) => void;
}

const INITIAL_RANKING_STATE: RankingContextType = {
  examDifficulty: 0,
  assignmentDifficulty: 0,
  interestLevel: 0,
  overallScore: 0,
  overallComment: "",
};

const RATING_STORAGE_KEY = "rating";

// Create the context
const RatingContext = createContext<RatingContextValue | undefined>(undefined);

// Provider component
export const RatingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ratingState, setRatingContext] = useLocalStorage<RankingContextType>(
    RATING_STORAGE_KEY,
    INITIAL_RANKING_STATE,
  );

  return (
    <RatingContext.Provider value={{ ratingState, setRatingContext }}>
      {children}
    </RatingContext.Provider>
  );
};

// Custom hook to use the ranking context
export const useRating = (): RatingContextValue => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRanking must be used within a RankingProvider");
  }
  return context;
};
