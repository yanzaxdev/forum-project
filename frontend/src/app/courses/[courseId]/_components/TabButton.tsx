"use client";

import { FC } from "react";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { cn } from "~/lib/utils";
import { useLanguage } from "~/app/providers";

interface TabButtonProps {
  tab: {
    id: string;
    title: string;
    icon: LucideIcon;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const TabButton: FC<TabButtonProps> = ({
  tab,
  index,
  isActive,
  onClick,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const Icon = tab.icon;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${index}`}
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "flex flex-1 items-center justify-center gap-2",
              "rounded-t-lg px-3 py-2",
              "text-sm font-medium",
              isActive && [
                "border-t-2 border-blue-600 bg-white text-blue-600",
                "dark:border-blue-400 dark:bg-gray-800 dark:text-blue-400",
                "shadow-sm",
              ],
              !isActive && [
                "text-gray-600 hover:bg-gray-200",
                "dark:text-gray-400 dark:hover:bg-gray-700",
              ],
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                !isActive && "text-gray-500 dark:text-gray-400",
              )}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">
              {t[tab.id as keyof typeof t]}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className={cn(
            "sm:hidden",
            "rounded-md bg-gray-900 dark:bg-gray-700",
            "px-3 py-1.5",
            "text-sm text-white",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {t[tab.id as keyof typeof t]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TabButton;
