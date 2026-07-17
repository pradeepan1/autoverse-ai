import Link from "next/link";

import { ErrorPage } from "@/components/feedback/ErrorPage";
import { ROUTES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

/**
 * AutoVerse AI — 404 Not Found Page
 *
 * Rendered automatically by Next.js when a route is not found.
 * Per docs/Architecture.md (Frontend Architecture).
 */
export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
      action={
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center justify-center h-11 px-5 rounded-md font-semibold text-sm text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          Go to Home
        </Link>
      }
    />
  );
}
