import { FC } from "react";
import { CarouselContent, CarouselItem } from "~/components/ui/course_carousel";
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
      {DEFAULT_TABS.map((tab) => {
        if (tab.id === "overview")
          return <OverviewContent key={tab.id} course={course} />;
        else if (tab.id === "forum") return <CarouselItem key={"forum"} />;
        else if (tab.id === "reviews") return <CarouselItem key={"reviews"} />;
        else if (tab.id === "tutors") return <CarouselItem key={"tutors"} />;
        return <></>;
      })}
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
