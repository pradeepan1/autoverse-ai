"use client";

/**
 * AutoVerse AI — Next.js Error Page
 *
 * Rendered automatically by Next.js when an unhandled error
 * occurs in a route segment. Provides a reset mechanism.
 *
 * Must be a Client Component (required by Next.js error.tsx contract).
 */

import { useEffect } from "react";

import { ErrorPage } from "@/components/feedback/ErrorPage";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // In production: send to error monitoring service here
  }, [error]);

  return (
    <ErrorPage
      title="Something went wrong"
      message={
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred. Please try again or return to the home page."
      }
      action={
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/")}>
            Go home
          </Button>
        </div>
      }
    />
  );
}
