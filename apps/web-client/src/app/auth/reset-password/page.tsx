"use client";

/**
 * AutoVerse AI — Reset Password Page
 *
 * Form for resetting a user's password using a token passed via query parameters.
 *
 * Per docs/UI_UX_Guidelines.md §14 (Dark Mode) and §15 (Light Mode).
 * Per docs/PROJECT_RULES.md.
 */

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useToast } from "@/components/providers/ToastProvider";
import { apiClient } from "@/lib/api/client";
import { ROUTES, VALIDATION } from "@/lib/constants";
import type { ApiResponse } from "@/types";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formErrors, setFormErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateField = (field: "password" | "confirmPassword", value: string) => {
    const errors = { ...formErrors };

    if (field === "password") {
      if (!value) {
        errors.password = "Password is required.";
      } else if (value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`;
      } else {
        delete errors.password;
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        errors.confirmPassword = "Please confirm your password.";
      } else if (value !== password) {
        errors.confirmPassword = "Passwords do not match.";
      } else {
        delete errors.confirmPassword;
      }
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing. Please request a new password reset link.");
      return;
    }

    const errors: typeof formErrors = {};
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post<ApiResponse<any>>("/auth/reset-password", {
        token,
        new_password: password,
      });

      toast({
        variant: "success",
        title: "Password Reset Success",
        description: "Your password has been changed. You can now sign in.",
      });

      router.push(ROUTES.LOGIN);
    } catch (err: any) {
      setError(err?.error?.message || "Reset failed. The token may be invalid or expired.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="glass shadow-lg border border-[var(--border-color)]">
      <CardBody className="flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <Alert variant="error" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {!token && (
            <Alert variant="warning">
              Invalid or missing password reset token. Please request a new reset link.
            </Alert>
          )}

          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validateField("password", password)}
            error={formErrors.password}
            required
            disabled={submitting || !token}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => validateField("confirmPassword", confirmPassword)}
            error={formErrors.confirmPassword}
            required
            disabled={submitting || !token}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={submitting}
            disabled={submitting || !token}
          >
            Reset Password
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-[420px] flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-h2 font-bold text-[var(--text-primary)]">New Password</h1>
          <p className="text-body-sm text-[var(--text-secondary)]">
            Enter a strong, secure new password for your AutoVerse AI account.
          </p>
        </div>

        {/* Suspense is required when using useSearchParams in Next.js App Router */}
        <Suspense fallback={
          <Card className="glass shadow-lg border border-[var(--border-color)]">
            <CardBody className="py-12 flex justify-center items-center">
              <span className="text-sm text-[var(--text-secondary)]">Loading...</span>
            </CardBody>
          </Card>
        }>
          <ResetPasswordForm />
        </Suspense>

        {/* Footer */}
        <p className="text-center text-sm text-[var(--text-secondary)]">
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-fast focus-visible:outline-none focus-visible:underline"
          >
            Back to Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
