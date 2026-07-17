import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ModalProvider } from "@/components/providers/ModalProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { APP_NAME } from "@/lib/constants";
import "@/styles/globals.css";

// ── Google Font ───────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "AutoVerse AI is an AI-powered automotive intelligence platform for car discovery, price prediction, comparison, and rental — serving buyers, dealers, and administrators.",
  keywords: [
    "cars",
    "automotive",
    "AI",
    "price prediction",
    "car rental",
    "car comparison",
    "used cars",
    "car dealer",
  ],
  authors: [{ name: "AutoVerse AI" }],
  creator: "AutoVerse AI",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: APP_NAME,
    title: APP_NAME,
    description:
      "AI-powered automotive intelligence for smarter car decisions.",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "AI-powered automotive intelligence for smarter car decisions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────
/**
 * AutoVerse AI — Root Layout
 *
 * Wraps every page with:
 * - Inter font (Google Fonts, display=swap)
 * - ThemeProvider (dark/light/system mode)
 * - ToastProvider (global notifications)
 * - ModalProvider (global imperative modals)
 * - Global CSS (design tokens + base styles)
 *
 * Per docs/Architecture.md (Frontend — Global Layout).
 * Per docs/UI_UX_Guidelines.md §2 (Typography — Inter).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/*
          Anti-FOUC script — sets theme class before React hydrates.
          Must be render-blocking (no defer/async) and inline.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('av_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored || stored === 'system') && prefersDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
