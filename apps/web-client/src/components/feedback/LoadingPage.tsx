"use client";

/**
 * AutoVerse AI — LoadingPage Component
 *
 * Full-page loading state used for route-level transitions.
 * Centered spinner with branded text.
 *
 * Used by: src/app/loading.tsx (Next.js Suspense boundary)
 */

import { Spinner } from "@/components/ui/Spinner";
import { APP_NAME } from "@/lib/constants";

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message }: LoadingPageProps) {
  return (
    <div
      role="status"
      aria-label={message ?? `Loading ${APP_NAME}…`}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
    >
      <Spinner size="lg" />
      <p className="text-sm text-[var(--text-secondary)] animate-pulse">
        {message ?? `Loading ${APP_NAME}…`}
      </p>
    </div>
  );
}
