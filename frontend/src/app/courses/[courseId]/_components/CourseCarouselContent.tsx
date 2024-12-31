import { FC } from "react";
import { CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import {
  Book,
  LucideIcon,
  MessageCircle,
  MessageSquare,
  Users,
} from "lucide-react";
import OverviewContent from "./OverviewContent";
import { Course } from "$/schema";

interface CourseCarouselContentProps {
  onContentClick?: () => void;
  className?: string;
  course: Course;
}

const CourseCarouselContent: FC<CourseCarouselContentProps> = ({
  className,
  course,
}) => {
  return (
    <CarouselContent className={cn("h-full flex-1 cursor-pointer", className)}>
      <OverviewContent course={course} />;
      <CarouselItem key={"forum"} />;
      <CarouselItem key={"reviews"} />;
      <CarouselItem key={"tutors"} />;
    </CarouselContent>
  );
};

export default CourseCarouselContent;

export interface TabItem {
  id: "overview" | "reviews" | "forum" | "tutors";
  title: string;
  icon: LucideIcon;
}

export const DEFAULT_TABS: TabItem[] = [
  {
    id: "overview",
    title: "Overview",
    icon: Book,
  },
  {
    id: "reviews",
    title: "Reviews",
    icon: MessageCircle,
  },

  {
    id: "forum",
    title: "Forum",
    icon: MessageSquare,
  },
  {
    id: "tutors",
    title: "Tutors",
    icon: Users,
  },
];

export enum TabID {
  OVERVIEW = "overview",
  REVIEWS = "reviews",
  FORUM = "forum",
  TUTORS = "tutors",
}
