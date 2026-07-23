"use client";

/**
 * AutoVerse AI — Login Page
 *
 * Stunning, responsive sign-in interface following premium design guidelines.
 * Features:
 * - Glassmorphic login card with Apple/Tesla restraint.
 * - Form validation (client-side checks + error highlights).
 * - Integration with AuthProvider for credentials verification and redirection.
 * - Auto-redirect if already logged in.
 *
 * Per docs/UI_UX_Guidelines.md §14 (Dark Mode) and §15 (Light Mode).
 * Per docs/PROJECT_RULES.md Rule 26 (responsive) and Rule 27 (validation).
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas";
import { GuestGuard } from "@/features/auth/components/GuestGuard";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError(null);
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      const errorMsg = err?.error?.message || "Invalid email or password. Please try again.";
      setGeneralError(errorMsg);
    }
  };

  return (
    <GuestGuard>
      <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          
          <div className="text-center flex flex-col gap-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-2 shadow-lg shadow-[rgba(212,0,26,0.2)]">
              <span className="text-white font-bold text-lg">AV</span>
            </div>
            <h1 className="text-h2 font-bold text-[var(--text-primary)]">Sign In</h1>
            <p className="text-body-sm text-[var(--text-secondary)]">
              Welcome back to AutoVerse AI. Enter your credentials to access your dashboard.
            </p>
          </div>

          <Card className="glass shadow-lg border border-[var(--border-color)]">
            <CardBody className="flex flex-col gap-5">
              {generalError && (
                <Alert variant="error" dismissible onClose={() => setGeneralError(null)}>
                  {generalError}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. name@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  leftIcon={<Mail className="w-4 h-4 text-[var(--text-secondary)]" />}
                />

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-[var(--text-primary)]">Password</label>
                    <Link
                      href={ROUTES.FORGOT_PASSWORD}
                      className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-fast focus-visible:outline-none focus-visible:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    error={errors.password?.message}
                    disabled={isSubmitting}
                    leftIcon={<Lock className="w-4 h-4 text-[var(--text-secondary)]" />}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
              </form>
            </CardBody>
          </Card>

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.REGISTER}
              className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-fast focus-visible:outline-none focus-visible:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </main>
    </GuestGuard>
  );
}
