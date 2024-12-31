import { Course } from "$/schema";
import {
  Book,
  LucideIcon,
  MessageCircle,
  MessageSquare,
  Users,
} from "lucide-react";
import { xTrans } from "~/translations";

export interface TabItem {
  id: keyof typeof xTrans.en;
  title: string;
  icon: LucideIcon;
}

export interface TabbedContentProps {
  course: Course;
  className?: string;
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
