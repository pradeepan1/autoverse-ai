"use client";

/**
 * AutoVerse AI — Register Page
 *
 * Premium sign-up interface following core visual guidelines.
 * Features:
 * - Interactive, glassmorphic card for details entry.
 * - Dynamic Role Selection ("Buyer" vs "Dealer") styled with custom visual tiles.
 * - Comprehensive client-side form validation (emails, matching passwords, length).
 * - Integration with AuthProvider for API registration and route redirect.
 *
 * Per docs/UI_UX_Guidelines.md §9 (Forms) and §17 (Responsive Rules).
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
import type { UserRole } from "@/types";

export default function RegisterPage() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
  
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Eager redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isLoading, isAuthenticated, router]);

  // Field validation on blur
  const validateField = (
    field: "fullName" | "email" | "phone" | "password" | "confirmPassword",
    value: string
  ) => {
    const errors = { ...formErrors };

    if (field === "fullName") {
      if (!value) {
        errors.fullName = "Full name is required.";
      } else if (value.length > VALIDATION.NAME_MAX_LENGTH) {
        errors.fullName = `Name cannot exceed ${VALIDATION.NAME_MAX_LENGTH} characters.`;
      } else {
        delete errors.fullName;
      }
    }

    if (field === "email") {
      if (!value) {
        errors.email = "Email is required.";
      } else if (!VALIDATION.EMAIL_REGEX.test(value)) {
        errors.email = "Please enter a valid email address.";
      } else {
        delete errors.email;
      }
    }

    if (field === "phone" && value) {
      if (!VALIDATION.PHONE_REGEX.test(value)) {
        errors.phone = "Please enter a valid phone number (e.g. +919876543210).";
      } else {
        delete errors.phone;
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

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Validate all fields
    const errors: typeof formErrors = {};
    
    if (!fullName) errors.fullName = "Full name is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!VALIDATION.EMAIL_REGEX.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (phone && !VALIDATION.PHONE_REGEX.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

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
      await register(fullName, email, password, role);
    } catch (err: any) {
      const errorMsg = err?.error?.message || "Registration failed. Please check your details.";
      setGeneralError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-[480px] flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-h2 font-bold text-[var(--text-primary)]">Create Account</h1>
          <p className="text-body-sm text-[var(--text-secondary)]">
            Join AutoVerse AI and unlock the intelligence layer of automotive decision-making.
          </p>
        </div>

        {/* Form Card */}
        <Card className="glass shadow-lg border border-[var(--border-color)]">
          <CardBody className="flex flex-col gap-4">
            {generalError && (
              <Alert variant="error" dismissible onClose={() => setGeneralError(null)}>
                {generalError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Role Selection Tabs (Apple/Tesla style custom tiles) */}
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-[var(--text-primary)]">Account Type</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-base ${
                      role === "buyer"
                        ? "border-[var(--accent)] bg-[var(--bg-secondary)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border-color)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    <span className={`font-semibold text-sm ${role === "buyer" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                      Buyer / Renter
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5">Explore & book cars</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setRole("dealer")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-base ${
                      role === "dealer"
                        ? "border-[var(--accent)] bg-[var(--bg-secondary)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border-color)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    <span className={`font-semibold text-sm ${role === "dealer" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                      Dealer / Host
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5">Manage listings & leads</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <Input
                label="Full Name"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => validateField("fullName", fullName)}
                error={formErrors.fullName}
                required
                disabled={submitting}
              />

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateField("email", email)}
                error={formErrors.email}
                required
                disabled={submitting}
              />

              {/* Phone */}
              <Input
                label="Phone Number (Optional)"
                type="tel"
                placeholder="e.g. +919876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => validateField("phone", phone)}
                error={formErrors.phone}
                disabled={submitting}
              />

              {/* Passwords side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validateField("password", password)}
                  error={formErrors.password}
                  required
                  disabled={submitting}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => validateField("confirmPassword", confirmPassword)}
                  error={formErrors.confirmPassword}
                  required
                  disabled={submitting}
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
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-fast focus-visible:outline-none focus-visible:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  );
}
