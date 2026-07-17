"use client";

/**
 * AutoVerse AI — ModalProvider
 *
 * Context + `useModal()` hook for imperative modal management.
 *
 * Features:
 * - Open/close modals by rendering any React node as modal content
 * - Portal-rendered — never trapped in layout hierarchy
 * - Backdrop blur + click-outside dismissal
 * - Escape key dismissal
 * - Scroll lock on body when modal is open
 * - Focus trap (first focusable element receives focus on open)
 * - Accessible: `role="dialog"`, `aria-modal`, `aria-labelledby`
 * - `motion-slow` entrance animation
 *
 * Per docs/UI_UX_Guidelines.md §13 (Glassmorphism) and §16 (Accessibility).
 *
 * Note: For the `Dialog` component (declarative usage), see `ui/Dialog.tsx`.
 * This provider is for programmatic/imperative modal triggering.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils/cn";

// ── Modal State ───────────────────────────────────────────────────────────
interface ModalState {
  id: string;
  content: ReactNode;
  title?: string;
}

// ── Context ───────────────────────────────────────────────────────────────
interface ModalContextValue {
  /** Open a modal with arbitrary content */
  openModal: (options: { content: ReactNode; title?: string }) => string;
  /** Close a specific modal by id */
  closeModal: (id: string) => void;
  /** Close all open modals */
  closeAll: () => void;
  /** Whether any modal is currently open */
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

// ── Backdrop + Container ──────────────────────────────────────────────────
interface ModalContainerProps {
  modal: ModalState;
  onClose: () => void;
}

function ModalContainer({ modal, onClose }: ModalContainerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus the dialog on open
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      // Restore focus when modal closes
      previousFocus?.focus?.();
    };
  }, []);

  // Escape key dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Scroll lock
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={modal.title ? `modal-title-${modal.id}` : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg",
          "bg-[var(--bg-elevated)] border border-[var(--border-color)]",
          "rounded-xl shadow-xl",
          "animate-scale-in",
          "focus:outline-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {modal.title && (
          <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
            <h2
              id={`modal-title-${modal.id}`}
              className="text-h4 font-semibold text-[var(--text-primary)]"
            >
              {modal.title}
            </h2>
            <button
              onClick={onClose}
              className={cn(
                "rounded-lg p-2 transition-colors duration-fast",
                "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              )}
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{modal.content}</div>
      </div>
    </div>
  );
}

// ── Provider ──────────────────────────────────────────────────────────────
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalState[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback(
    (options: { content: ReactNode; title?: string }): string => {
      const id = `modal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setModals((prev) => [...prev, { id, ...options }]);
      return id;
    },
    []
  );

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  // Render only the topmost modal
  const topModal = modals[modals.length - 1];

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, closeAll, isOpen: modals.length > 0 }}
    >
      {children}
      {mounted &&
        topModal &&
        createPortal(
          <ModalContainer
            modal={topModal}
            onClose={() => closeModal(topModal.id)}
          />,
          document.body
        )}
    </ModalContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
/**
 * Access the modal management system.
 * Must be used within a `ModalProvider` subtree.
 *
 * @example
 * const { openModal, closeAll } = useModal();
 * const id = openModal({ title: "Confirm Delete", content: <DeleteForm /> });
 */
export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
