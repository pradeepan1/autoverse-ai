"use client";

/**
 * AutoVerse AI — Forgot Password Page
 *
 * Premium interface for triggering password recovery emails.
 *
 * Per docs/UI_UX_Guidelines.md §14 (Dark Mode) and §15 (Light Mode).
 * Per docs/PROJECT_RULES.md.
 */

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { apiClient } from "@/lib/api/client";
import { ROUTES } from "@/lib/constants";
import { GuestGuard } from "@/features/auth/components/GuestGuard";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/features/auth/schemas";
import type { ApiResponse } from "@/types";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    try {
      await apiClient.post<ApiResponse<any>>("/auth/forgot-password", { email: data.email });
      setSubmittedEmail(data.email);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.error?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <GuestGuard>
      <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          
          <div className="text-center flex flex-col gap-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-2 shadow-lg shadow-[rgba(212,0,26,0.2)]">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-9 5h.01M5.066 10.022a1.5 1.5 0 010-2.012l3.029-3.029a1.5 1.5 0 012.012 0l3.03 3.03a1.5 1.5 0 010 2.012l-3.03 3.03a1.5 1.5 0 01-2.012 0l-3.03-3.03z" />
              </svg>
            </div>
            <h1 className="text-h2 font-bold text-[var(--text-primary)]">Reset Password</h1>
            <p className="text-body-sm text-[var(--text-secondary)]">
              Enter your email and we&apos;ll send you instructions to reset your password.
            </p>
          </div>

          <Card className="glass shadow-lg border border-[var(--border-color)]">
            <CardBody className="flex flex-col gap-5">
              {success ? (
                <div className="flex flex-col gap-4 text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(47,190,124,0.15)] text-[var(--success)] flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-[var(--text-primary)]">Check your email</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    We&apos;ve sent a password reset link to <strong>{submittedEmail}</strong>.
                  </p>
                  <Button onClick={() => setSuccess(false)} variant="secondary" className="mt-4">
                    Resend Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  {error && (
                    <Alert variant="error" dismissible onClose={() => setError(null)}>
                      {error}
                    </Alert>
                  )}

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. priya@example.com"
                    {...register("email")}
                    error={errors.email?.message}
                    disabled={isSubmitting}
                    leftIcon={<Mail className="w-4 h-4 text-[var(--text-secondary)]" />}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Send Reset Link
                  </Button>
                </form>
              )}
            </CardBody>
          </Card>

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Remember your password?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-fast focus-visible:outline-none focus-visible:underline"
            >
              Sign back in
            </Link>
          </p>
        </div>
      </main>
    </GuestGuard>
  );
}
