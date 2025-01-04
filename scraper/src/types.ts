export interface Course {
  id: string;
  titleHe: string;
  creditPoints: number;
  level: string;
  department: string;
  descriptionHe: string;
  topics: string[];
  prerequisites: string[];
  developmentTeam: string;
  advisors: string;
}

export type CourseParseResult = {
  success: boolean;
  course?: Course;
  error?: string;
};

export type ScrapingResult = {
  success: boolean;
  data?: Course[];
  error?: string;
};