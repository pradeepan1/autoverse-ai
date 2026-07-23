/**
 * AutoVerse AI — ErrorBoundary Component
 *
 * React class-based error boundary that catches unhandled errors
 * in the component tree and renders a graceful fallback UI.
 *
 * Use this to wrap route segments and feature areas.
 * Per docs/Architecture.md (Frontend — Global error boundary).
 */

import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorPage } from "./ErrorPage";

// ── Props & State ─────────────────────────────────────────────────────────
interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback — defaults to ErrorPage */
  fallback?: ReactNode;
  /** Called when an error is caught (e.g. for logging) */
  onError?: (_error: Error, _info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ── Component ─────────────────────────────────────────────────────────────
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorPage
          title="Something went wrong"
          message={
            process.env.NODE_ENV === "development" && this.state.error
              ? this.state.error.message
              : "An unexpected error occurred. Please try again."
          }
          action={
            <button
              onClick={this.handleReset}
              className={[
                "inline-flex items-center justify-center h-11 px-5",
                "rounded-md font-semibold text-sm text-white",
                "bg-[var(--accent)] hover:bg-[var(--accent-hover)]",
                "transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
              ].join(" ")}
            >
              Try again
            </button>
          }
        />
      );
    }

    return this.props.children;
  }
}
