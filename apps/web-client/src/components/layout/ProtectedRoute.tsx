"use client";

/**
 * AutoVerse AI — ProtectedRoute Component
 *
 * Route guard component that:
 * 1. Checks if auth state is loading; renders full-page loading skeleton.
 * 2. If unauthenticated, redirects to login page.
 * 3. If authenticated but role is not allowed, renders a 403 ErrorPage.
 * 4. Otherwise, renders children.
 *
 * Per docs/Architecture.md (Role-based routing) and docs/PROJECT_RULES.md.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/AuthProvider";
import { LoadingPage } from "@/components/feedback/LoadingPage";
import { ErrorPage } from "@/components/feedback/ErrorPage";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <ErrorPage
        statusCode={403}
        title="Permission Denied"
        message="You do not have the required permissions to access this page."
        action={
          <Button onClick={() => router.push(ROUTES.HOME)} variant="primary">
            Back to Home
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
}
