"use client";

import { type FC } from "react";
import { useLanguage } from "~/app/providers";
import { Carousel } from "~/components/ui/course_carousel";
import { cn } from "~/lib/utils";
import { useTabs } from "../useTabs";
import CourseCarouselNav from "./CourseCarouselNav";
import CourseCarouselContent, { DEFAULT_TABS } from "./CourseCarouselContent";
import { Course } from "$/schema";

export interface TabbedContentProps {
  course: Course;
  className?: string;
}

const CourseCarousel: FC<TabbedContentProps> = ({ className, course }) => {
  const { isRTL, dir } = useLanguage();
  const { activeTab, setApi, skipAnimation, handleTabClick, api } =
    useTabs(DEFAULT_TABS);

  const handleContentClick = () => {
    if (!api) return;
    const nextIndex = (activeTab + 1) % DEFAULT_TABS.length;
    handleTabClick(nextIndex);
  };

  return (
    <section className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <CourseCarouselNav
        tabs={DEFAULT_TABS}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      <Carousel
        className={cn(
          "flex flex-grow flex-col bg-white dark:bg-gray-800",
          isRTL && "direction-rtl",
        )}
        dir={dir}
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: skipAnimation,
          duration: skipAnimation ? 0 : undefined,
          direction: dir, // Set carousel direction
        }}
      >
        <CourseCarouselContent
          onContentClick={handleContentClick}
          course={course}
        />
      </Carousel>
    </section>
  );
};

export default CourseCarousel;
