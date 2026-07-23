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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";

import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useToast } from "@/components/providers/ToastProvider";
import { apiClient } from "@/lib/api/client";
import { ROUTES } from "@/lib/constants";
import { GuestGuard } from "@/features/auth/components/GuestGuard";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/features/auth/schemas";
import type { ApiResponse } from "@/types";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);

    if (!token) {
      setError("Reset token is missing. Please request a new password reset link.");
      return;
    }

    try {
      await apiClient.post<ApiResponse<any>>("/auth/reset-password", {
        token,
        new_password: data.password,
      });

      toast({
        variant: "success",
        title: "Password Reset Success",
        description: "Your password has been changed. You can now sign in.",
      });

      router.push(ROUTES.LOGIN);
    } catch (err: any) {
      setError(err?.error?.message || "Reset failed. The token may be invalid or expired.");
    }
  };

  return (
    <Card className="glass shadow-lg border border-[var(--border-color)]">
      <CardBody className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
            {...register("password")}
            error={errors.password?.message}
            disabled={isSubmitting || !token}
            leftIcon={<Lock className="w-4 h-4 text-[var(--text-secondary)]" />}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting || !token}
            leftIcon={<Lock className="w-4 h-4 text-[var(--text-secondary)]" />}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isSubmitting}
            disabled={isSubmitting || !token}
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
    <GuestGuard>
      <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-h2 font-bold text-[var(--text-primary)]">New Password</h1>
            <p className="text-body-sm text-[var(--text-secondary)]">
              Enter a strong, secure new password for your AutoVerse AI account.
            </p>
          </div>

          <Suspense fallback={
            <Card className="glass shadow-lg border border-[var(--border-color)]">
              <CardBody className="py-12 flex justify-center items-center">
                <span className="text-sm text-[var(--text-secondary)]">Loading...</span>
              </CardBody>
            </Card>
          }>
            <ResetPasswordForm />
          </Suspense>

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
    </GuestGuard>
  );
}
