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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock } from "lucide-react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { registerSchema, type RegisterFormData } from "@/features/auth/schemas";
import { GuestGuard } from "@/features/auth/components/GuestGuard";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ROUTES } from "@/lib/constants";
import type { UserRole } from "@/types";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("buyer");
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setGeneralError(null);
    try {
      await registerUser(data.full_name, data.email, data.password, role);
    } catch (err: any) {
      const errorMsg = err?.error?.message || "Registration failed. Please check your details.";
      setGeneralError(errorMsg);
    }
  };

  return (
    <GuestGuard>
      <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-h2 font-bold text-[var(--text-primary)]">Create Account</h1>
            <p className="text-body-sm text-[var(--text-secondary)]">
              Join AutoVerse AI and unlock the intelligence layer of automotive decision-making.
            </p>
          </div>

          <Card className="glass shadow-lg border border-[var(--border-color)]">
            <CardBody className="flex flex-col gap-4">
              {generalError && (
                <Alert variant="error" dismissible onClose={() => setGeneralError(null)}>
                  {generalError}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                
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

                <Input
                  label="Full Name"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  {...register("full_name")}
                  error={errors.full_name?.message}
                  disabled={isSubmitting}
                  leftIcon={<User className="w-4 h-4 text-[var(--text-secondary)]" />}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. priya@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  leftIcon={<Mail className="w-4 h-4 text-[var(--text-secondary)]" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    error={errors.password?.message}
                    disabled={isSubmitting}
                    leftIcon={<Lock className="w-4 h-4 text-[var(--text-secondary)]" />}
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
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
                  Sign Up
                </Button>
              </form>
            </CardBody>
          </Card>

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
    </GuestGuard>
  );
}
