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
import { ClerkProvider } from "@clerk/nextjs";
import { heIL } from "@clerk/localizations";

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
    <ClerkProvider localization={heIL}>
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
    </ClerkProvider>
  );
};

export default RootLayout;

const hebClerk = {
  signIn: {
    title: "התחברות",
    subtitle: "המשך להתחברות",
    emailAddressLabel: "כתובת אימייל",
    emailAddressPlaceholder: "הכנס את כתובת האימייל שלך",
    passwordLabel: "סיסמה",
    passwordPlaceholder: "הכנס את הסיסמה שלך",
    continueButtonLabel: "המשך",
    forgotPasswordLink: "שכחת סיסמה?",
    formButtonPrimary: "התחבר",
    backButton: "חזור",
    alternativeMethods: {
      title: "או התחבר באמצעות",
      google: "התחבר עם Google",
      facebook: "התחבר עם Facebook",
    },
  },
  signUp: {
    title: "הרשמה",
    subtitle: "צור חשבון חדש",
    emailAddressLabel: "כתובת אימייל",
    emailAddressPlaceholder: "הכנס את כתובת האימייל שלך",
    passwordLabel: "סיסמה",
    passwordPlaceholder: "צור סיסמה חדשה",
    passwordRequirements: "הסיסמה חייבת להכיל לפחות 8 תווים",
    continueButtonLabel: "המשך",
    formButtonPrimary: "הירשם",
    backButton: "חזור",
    alternativeMethods: {
      title: "או הירשם באמצעות",
      google: "הירשם עם Google",
      facebook: "הירשם עם Facebook",
    },
  },
  // Add more translations as needed
};

const engClerk = {
  signIn: {
    title: "Sign in",
    subtitle: "to continue to the application",
    emailAddressLabel: "Email address",
    emailAddressPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    continueButtonLabel: "Continue",
    forgotPasswordLink: "Forgot password?",
    formButtonPrimary: "Sign in",
    backButton: "Back",
    alternativeMethods: {
      title: "Or continue with",
      google: "Continue with Google",
      facebook: "Continue with Facebook",
    },
  },
  signUp: {
    title: "Sign up",
    subtitle: "Create a new account",
    emailAddressLabel: "Email address",
    emailAddressPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Create a password",
    passwordRequirements: "Must be at least 8 characters",
    continueButtonLabel: "Continue",
    formButtonPrimary: "Sign up",
    backButton: "Back",
    alternativeMethods: {
      title: "Or sign up with",
      google: "Sign up with Google",
      facebook: "Sign up with Facebook",
    },
  },
  // Add more translations as needed
};
