import { FC } from "react";
import { cn } from "~/lib/utils";

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

export const H1: FC<TypographyProps> = ({ className, children }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const H2: FC<TypographyProps> = ({ className, children }) => {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const H3: FC<TypographyProps> = ({ className, children }) => {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const P: FC<TypographyProps> = ({ className, children }) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
};

export const BlockQuote: FC<TypographyProps> = ({ className, children }) => {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
};

export const List: FC<TypographyProps> = ({ className, children }) => {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
};
