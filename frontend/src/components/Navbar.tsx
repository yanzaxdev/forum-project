"use client";

import { FC } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, House, Menu } from "lucide-react";
import { cn } from "~/lib/utils";
import { useLanguage } from "~/app/providers";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";

const NavBar: FC = () => {
  const { theme, setTheme } = useTheme();
  const { isRTL: isHeb, translation: t, langParam } = useLanguage();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const COMMON_HOVER_CLASSES = "hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <nav
      dir={isHeb ? "rtl" : "ltr"}
      className={cn(
        "sticky top-0 z-50",
        "flex h-16 items-center justify-between",
        "bg-gray-100 dark:bg-black",
        "border-b px-4",
      )}
    >
      {/* Left Section: Navigation */}
      <div className="flex items-center gap-4">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className={COMMON_HOVER_CLASSES}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>

        <Link
          href={`/${langParam}`}
          className={cn(
            "flex items-center gap-2",
            "rounded-md p-2",
            COMMON_HOVER_CLASSES,
          )}
        >
          <House className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Link>

        <Link
          href={`/courses${langParam}`}
          className={cn(
            "rounded-md p-2",
            "text-sm font-medium",
            COMMON_HOVER_CLASSES,
          )}
        >
          {t.courses}
        </Link>
      </div>

      {/* Right Section: Theme Toggle */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleThemeToggle}
          variant="ghost"
          size="icon"
          className={COMMON_HOVER_CLASSES}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
