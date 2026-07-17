/**
 * AutoVerse AI — API Module Barrel Export
 *
 * Re-exports the configured Axios client instance and typed
 * request/response helpers for consumption across the application.
 */

export { apiClient } from "./client";
export type { AxiosResponse, AxiosError } from "axios";
