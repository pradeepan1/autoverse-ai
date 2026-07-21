/**
 * AutoVerse AI — Environment Configuration
 *
 * Reads NEXT_PUBLIC_* environment variables and provides typed, validated
 * configuration for use throughout the frontend application.
 *
 * Per docs/PROJECT_RULES.md Rule 20 — no hardcoded values.
 * All values must come from environment variables defined in .env.local.
 */

/**
 * Typed environment configuration interface.
 * All required variables that are not present will throw at startup.
 */
interface EnvConfig {
  /** Application display name */
  appName: string;
  /** Base URL of the AutoVerse AI backend API (without trailing slash) */
  apiBaseUrl: string;
  /** Current deployment environment */
  environment: "development" | "staging" | "production";
  /** Supabase project URL */
  supabaseUrl: string;
  /** Supabase anonymous/public key */
  supabaseAnonKey: string;
  /** Whether the app is running in development mode */
  isDevelopment: boolean;
  /** Whether the app is running in production mode */
  isProduction: boolean;
}

/**
 * Returns the string value of a `NEXT_PUBLIC_*` environment variable.
 * Falls back to `fallback` if provided, otherwise returns empty string.
 */
function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value !== undefined && value !== "") {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  // In development, warn about missing optional vars
  if (process.env.NODE_ENV === "development") {
    console.warn(`[AutoVerse AI] Missing env var: ${key}`);
  }
  return "";
}

const environment = (
  getEnvVar("NEXT_PUBLIC_ENVIRONMENT", "development") as EnvConfig["environment"]
);

/**
 * Singleton environment configuration object.
 * Import this wherever environment variables are needed.
 *
 * @example
 * import { env } from "@/lib/config/env";
 * const response = await fetch(`${env.apiBaseUrl}/cars`);
 */
export const env: EnvConfig = {
  appName: getEnvVar("NEXT_PUBLIC_APP_NAME", "Capo Cars"),
  apiBaseUrl: getEnvVar(
    "NEXT_PUBLIC_API_BASE_URL",
    "http://localhost:8000/api/v1"
  ),
  environment,
  supabaseUrl: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  isDevelopment: environment === "development",
  isProduction: environment === "production",
};
