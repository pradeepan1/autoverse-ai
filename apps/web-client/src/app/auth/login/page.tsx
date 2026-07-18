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
import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ROUTES, VALIDATION } from "@/lib/constants";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Eager redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isLoading, isAuthenticated, router]);

  // Handle client-side field validation on blur
  const validateField = (field: "email" | "password", value: string) => {
    const errors = { ...formErrors };
    
    if (field === "email") {
      if (!value) {
        errors.email = "Email is required.";
      } else if (!VALIDATION.EMAIL_REGEX.test(value)) {
        errors.email = "Please enter a valid email address.";
      } else {
        delete errors.email;
      }
    }

    if (field === "password") {
      if (!value) {
        errors.password = "Password is required.";
      } else if (value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`;
      } else {
        delete errors.password;
      }
    }

    setFormErrors(errors);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Validate all fields
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!VALIDATION.EMAIL_REGEX.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      const errorMsg = err?.error?.message || "Invalid email or password. Please try again.";
      setGeneralError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || isAuthenticated) {
    return null; // Let RootLayout's loading state handle it, or AuthProvider me validation
  }

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-[420px] flex flex-col gap-8">
        
        {/* Title / Logo Accent */}
        <div className="text-center flex flex-col gap-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-2 shadow-lg shadow-[rgba(212,0,26,0.2)]">
            <span className="text-white font-bold text-lg">AV</span>
          </div>
          <h1 className="text-h2 font-bold text-[var(--text-primary)]">Sign In</h1>
          <p className="text-body-sm text-[var(--text-secondary)]">
            Welcome back to AutoVerse AI. Enter your credentials to access your dashboard.
          </p>
        </div>

        {/* Login Card */}
        <Card className="glass shadow-lg border border-[var(--border-color)]">
          <CardBody className="flex flex-col gap-5">
            {generalError && (
              <Alert variant="error" dismissible onClose={() => setGeneralError(null)}>
                {generalError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateField("email", email)}
                error={formErrors.email}
                required
                disabled={submitting}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
              />

              {/* Password */}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validateField("password", password)}
                  error={formErrors.password}
                  required
                  disabled={submitting}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  }
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                className="w-full mt-2"
                isLoading={submitting}
                disabled={submitting}
              >
                Sign In
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Footer */}
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
  );
}
