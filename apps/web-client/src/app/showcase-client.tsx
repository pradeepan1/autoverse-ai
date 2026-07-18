"use client";

/**
 * AutoVerse AI — Component Showcase (Client Component)
 *
 * Interactive demonstration of all Module 01 components.
 * Not the landing page — replaced in Module 03.
 */

import { useState } from "react";

import { useThemeContext } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/Textarea";
import { EmptyState } from "@/components/feedback/EmptyState";
import { LoadingGrid } from "@/components/feedback/LoadingGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { APP_NAME } from "@/lib/constants";
import { formatCurrency, formatMileage, formatRelativeTime } from "@/lib/utils/format";

// ── Section wrapper ───────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-h3 font-bold text-[var(--text-primary)] mb-6 pb-3 border-b border-[var(--border-color)]">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export function ShowcaseClient() {
  const { resolvedTheme } = useThemeContext();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const validateInput = () => {
    if (!inputValue.trim()) {
      setInputError("This field is required.");
    } else if (inputValue.length < 3) {
      setInputError("Must be at least 3 characters.");
    } else {
      setInputError("");
      toast({ variant: "success", title: "Validated!", description: "Input is valid." });
    }
  };

  return (
    <div className="av-container py-6">
          {/* Header */}
          <div className="mb-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Module 01", href: "/" },
                { label: "Component Showcase" },
              ]}
            />
            <h1 className="text-h1 font-bold text-[var(--text-primary)] mt-4">
              {APP_NAME} — Component Library
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] mt-2">
              Module 01 Design System Showcase · Active theme:{" "}
              <strong className="text-[var(--accent)]">{resolvedTheme}</strong>
            </p>
          </div>

          {/* ── Formatters ─────────────────────────────────────────── */}
          <Section title="Formatters">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Currency", value: formatCurrency(1250000) },
                { label: "Mileage", value: formatMileage(45230) },
                { label: "Relative", value: formatRelativeTime(new Date(Date.now() - 3600000).toISOString()) },
                { label: "Compact", value: formatCurrency(12500000) },
              ].map(({ label, value }) => (
                <Card key={label}>
                  <p className="text-caption text-[var(--text-muted)] uppercase tracking-wider">{label}</p>
                  <p className="text-h4 font-bold text-[var(--text-primary)] mt-1 tabular-nums">{value}</p>
                </Card>
              ))}
            </div>
          </Section>

          {/* ── Buttons ────────────────────────────────────────────── */}
          <Section title="Buttons">
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="primary" isLoading onClick={showLoadingDemo}>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm" variant="primary">Small</Button>
              <Button size="md" variant="primary">Medium</Button>
              <Button size="lg" variant="primary">Large</Button>
              <Button
                variant="primary"
                isLoading={isLoading}
                onClick={showLoadingDemo}
              >
                {isLoading ? "Loading…" : "Click to Load"}
              </Button>
            </div>
          </Section>

          {/* ── Badges ─────────────────────────────────────────────── */}
          <Section title="Badges">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success" dot>With Dot</Badge>
              <Badge variant="error" size="sm">Small</Badge>
            </div>
          </Section>

          {/* ── Alerts ─────────────────────────────────────────────── */}
          <Section title="Alerts">
            <div className="flex flex-col gap-3">
              <Alert variant="info" title="Information" description="This is an informational alert message." dismissible />
              <Alert variant="success" title="Success!" description="Your listing was saved successfully." dismissible />
              <Alert variant="warning" title="Warning" description="This action may affect your account." dismissible />
              <Alert variant="error" title="Error" description="Something went wrong. Please try again." dismissible />
            </div>
          </Section>

          {/* ── Cards ──────────────────────────────────────────────── */}
          <Section title="Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card elevated>
                <CardHeader>
                  <div>
                    <h3 className="text-h4 font-semibold text-[var(--text-primary)]">2023 Toyota Camry</h3>
                    <p className="text-body-sm text-[var(--text-secondary)]">Petrol · Automatic</p>
                  </div>
                  <Badge variant="success">Available</Badge>
                </CardHeader>
                <CardBody>
                  <p className="text-price font-bold text-[var(--text-primary)] tabular-nums">
                    {formatCurrency(1850000)}
                  </p>
                  <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                    {formatMileage(12000)} · 2023 · Bangalore
                  </p>
                </CardBody>
                <CardFooter>
                  <Button variant="primary" fullWidth>View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-h4 font-semibold text-[var(--text-primary)]">Default Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-body-sm text-[var(--text-secondary)]">
                    Standard card without elevation effect. Used for data-dense or static content areas.
                  </p>
                </CardBody>
              </Card>

              <SkeletonCard />
            </div>
          </Section>

          {/* ── Form Inputs ────────────────────────────────────────── */}
          <Section title="Form Inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <Input
                label="Search Cars"
                placeholder="e.g. Toyota Camry"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                error={inputError}
                helpText="Search by make, model, or keyword"
                required
                leftIcon={
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 0a6 6 0 110 12A6 6 0 016 0zm0 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6.72 10.19a.75.75 0 011.06 1.06l-2.5 2.5a.75.75 0 01-1.06-1.06l2.5-2.5z" />
                  </svg>
                }
              />
              <div className="flex items-end">
                <Button variant="primary" onClick={validateInput}>Validate</Button>
              </div>
              <Textarea
                label="Description"
                placeholder="Describe the vehicle condition…"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                rows={4}
                maxLength={300}
                showCharCount
                helpText="Max 300 characters"
                wrapperClassName="md:col-span-2"
              />
            </div>
          </Section>

          {/* ── Spinners ───────────────────────────────────────────── */}
          <Section title="Spinners">
            <div className="flex items-center gap-6">
              <Spinner size="sm" aria-label="Small spinner" />
              <Spinner size="md" aria-label="Medium spinner" />
              <Spinner size="lg" aria-label="Large spinner" />
            </div>
          </Section>

          {/* ── Skeleton Loading Grid ──────────────────────────────── */}
          <Section title="Loading Grid (Skeleton)">
            <LoadingGrid count={3} columns={3} />
          </Section>

          {/* ── Empty State ────────────────────────────────────────── */}
          <Section title="Empty State">
            <div className="border border-[var(--border-color)] rounded-xl">
              <EmptyState
                title="No Cars Found"
                description="Try adjusting your filters or search terms to find what you're looking for."
                action={
                  <Button variant="primary">Clear Filters</Button>
                }
              />
            </div>
          </Section>

          {/* ── Dialog ─────────────────────────────────────────────── */}
          <Section title="Dialog">
            <Button variant="primary" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Dialog
              isOpen={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Example Dialog"
              description="This dialog demonstrates the Dialog component with focus trap and Escape dismissal."
              size="md"
            >
              <div className="flex flex-col gap-4">
                <p className="text-body-sm text-[var(--text-secondary)]">
                  Dialog body content. Press Escape or click the backdrop to dismiss.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDialogOpen(false);
                      toast({ variant: "success", title: "Action confirmed!" });
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Dialog>
          </Section>

          {/* ── Toast Demo ─────────────────────────────────────────── */}
          <Section title="Toast Notifications">
            <div className="flex flex-wrap gap-3">
              {(["success", "error", "warning", "info"] as const).map((v) => (
                <Button
                  key={v}
                  variant="secondary"
                  onClick={() =>
                    toast({
                      variant: v,
                      title: `${v.charAt(0).toUpperCase() + v.slice(1)} notification`,
                      description: `This is a ${v} toast message.`,
                    })
                  }
                >
                  Show {v}
                </Button>
              ))}
            </div>
          </Section>
    </div>
  );
}
