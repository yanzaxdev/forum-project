export interface RatingPayload {
  examDifficulty: number;
  assignmentDifficulty: number;
  interestLevel: number;
  overallScore: number;
  overallComment: string;
  userID: string
  courseId: string
}