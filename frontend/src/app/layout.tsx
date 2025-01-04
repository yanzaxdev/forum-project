import "~/styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { Assistant } from "next/font/google";
import { Metadata, Viewport } from "next";
import { cn } from "~/lib/utils";
import { Providers } from "./providers";
import NavBar from "~/components/Navbar";
import { Sheet } from "~/components/ui/sheet";
import ForumSheet from "~/components/ForumSheet";
import { getLang } from "~/utils/language";

const FONT_ASSISTANT = Assistant({
  subsets: ["hebrew"],
  display: "swap",
  variable: "--font-assistant",
});

export const metadata: Metadata = {
  title: {
    default: "Open Uni Forum",
    template: "%s | Open Uni Forum",
  },
  description: "A simple forum for Open University courses",
  keywords: ["university", "forum", "education", "courses"],
  authors: [{ name: "Open Uni Forum Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const { lang } = await getLang();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(FONT_ASSISTANT.className, "antialiased")}
    >
      <head />
      <body
        className={cn(
          "flex min-h-screen flex-col",
          "bg-background text-foreground",
          "transition-colors duration-300",
        )}
      >
        <Suspense fallback={null}>
          <Providers>
            <Sheet>
              <ForumSheet />
              <Suspense fallback={null}>
                <NavBar />
              </Suspense>
            </Sheet>

            <main className="flex flex-1 flex-col">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
