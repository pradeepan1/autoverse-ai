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

import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { apiClient } from "@/lib/api/client";
import { ROUTES, VALIDATION } from "@/lib/constants";
import type { ApiResponse } from "@/types";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError("Email is required.");
    } else if (!VALIDATION.EMAIL_REGEX.test(val)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setEmailError("Email is required.");
      return;
    } else if (!VALIDATION.EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post<ApiResponse<any>>("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.error?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-[420px] flex flex-col gap-8">
        
        {/* Header */}
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

        {/* Card */}
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
                  We&apos;ve sent a password reset link to <strong>{email}</strong>.
                </p>
                <Button onClick={() => setSuccess(false)} variant="secondary" className="mt-4">
                  Resend Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <Alert variant="error" dismissible onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  error={emailError}
                  required
                  disabled={submitting}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  }
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={submitting}
                  disabled={submitting}
                >
                  Send Reset Link
                </Button>
              </form>
            )}
          </CardBody>
        </Card>

        {/* Footer */}
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
  );
}
