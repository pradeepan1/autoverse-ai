"use client";

/**
 * AutoVerse AI — Authentication Provider & Context
 *
 * Exposes auth state (user, isAuthenticated, isLoading) and actions
 * (login, register, logout) using standard React context.
 *
 * Integrates with ToastProvider for automatic notifications.
 * Uses the configured Axios apiClient to persist sessions via JWT.
 *
 * Per docs/Architecture.md (Authentication Flow) and docs/PROJECT_RULES.md.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/api/client";
import { STORAGE_KEYS } from "@/lib/constants";
import { useToast } from "@/components/providers/ToastProvider";
import type { ApiResponse, UserProfile, UserRole } from "@/types";

// ── Auth Context Type ──────────────────────────────────────────────────────
interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (_email: string, _password: string) => Promise<void>;
  register: (_fullName: string, _email: string, _password: string, _role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Auth Provider Component ────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const { toast } = useToast();
  const router = useRouter();

  // 1. Restore session on mount
  useEffect(() => {
    async function restoreSession() {
      if (typeof window === "undefined") return;

      const accessToken = window.localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const cachedProfile = window.localStorage.getItem(STORAGE_KEYS.USER_PROFILE);

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      // If cached profile exists, set it eagerly to prevent FOUC, but verify with me endpoint
      if (cachedProfile) {
        try {
          const parsed = JSON.parse(cachedProfile) as UserProfile;
          setUser(parsed);
          setIsAuthenticated(true);
        } catch {
          // ignore parsing errors and let the api call handle it
        }
      }

      try {
        const response = await apiClient.get<ApiResponse<UserProfile>>("/auth/me");
        const freshProfile = response.data.data;
        
        setUser(freshProfile);
        setIsAuthenticated(true);
        window.localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(freshProfile));
      } catch (err: any) {
        // If /auth/me fails (and refresh interceptor also failed), clear state
        setUser(null);
        setIsAuthenticated(false);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          window.localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          window.localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
        }
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  // 2. Login Action
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<
        ApiResponse<{ access_token: string; refresh_token: string; user: UserProfile }>
      >("/auth/login", { email, password });

      const { access_token, refresh_token, user: profile } = response.data.data;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        window.localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
        window.localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      }

      setUser(profile);
      setIsAuthenticated(true);
      
      toast({
        variant: "success",
        title: "Welcome Back!",
        description: `Signed in successfully as ${profile.full_name}.`,
      });

      // Redirect depending on user role
      if (profile.role === "admin") {
        router.push("/admin");
      } else if (profile.role === "dealer") {
        router.push("/dealer");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      const errorMsg = err?.error?.message || "Invalid credentials. Please try again.";
      toast({
        variant: "error",
        title: "Sign In Failed",
        description: errorMsg,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Register Action
  const register = async (fullName: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<
        ApiResponse<{ access_token: string; refresh_token: string; user: UserProfile }>
      >("/auth/register", {
        full_name: fullName,
        email,
        password,
        role,
      });

      const { access_token, refresh_token, user: profile } = response.data.data;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        window.localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
        window.localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      }

      setUser(profile);
      setIsAuthenticated(true);

      toast({
        variant: "success",
        title: "Registration Successful",
        description: `Account created for ${profile.full_name}. Welcome to Capo Cars`,
      });

      if (profile.role === "dealer") {
        router.push("/dealer");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      const errorMsg = err?.error?.message || "Registration failed. Please check your inputs.";
      toast({
        variant: "error",
        title: "Registration Failed",
        description: errorMsg,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Logout Action
  const logout = async () => {
    setIsLoading(true);
    try {
      // Best-effort call to backend logout to invalidate refresh token
      await apiClient.post("/auth/logout").catch(() => {});
    } finally {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        window.localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        window.localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      }
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      toast({
        variant: "info",
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
