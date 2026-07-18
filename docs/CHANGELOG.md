# AutoVerse AI — Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/) once the first production-facing release ships. Until then, entries are grouped under `[Unreleased]` by development phase, per `docs/Development_Roadmap.md`.

---

## [Unreleased]

### Added — Module 01: Core Foundation, Layout & Reusable Components

**Frontend — Design System**
- `apps/web-client/tailwind.config.ts` — Full design tokens from `docs/UI_UX_Guidelines.md` §6: colors (light + dark mode), typography scale (display/h1–h4/body/caption/price), border radius, shadows, motion durations, keyframe animations (shimmer, fade-in, fade-up, scale-in, toast-slide-in), font families (Inter, Inter Tight), grid utilities.
- `apps/web-client/src/styles/globals.css` — Tailwind directives, CSS custom properties for light/dark mode, Google Fonts import, base resets, accessible focus styles, skip-to-content link, shimmer gradient, glassmorphism utility (`.glass`), scrollbar utility, `.av-container` layout utility.

**Frontend — Types**
- `apps/web-client/src/types/index.ts` — Shared TypeScript types: `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`, `UserProfile`, `UserRole`, `ThemeMode`, component size/variant types, `Toast`, `NavItem`, `BreadcrumbItem`, `PaginationParams`, `SortParams`, `BaseEntity`.

**Frontend — Lib: Config, Constants, API Client, Utils, Hooks**
- `apps/web-client/src/lib/config/env.ts` — Typed environment configuration from `NEXT_PUBLIC_*` env vars; no hardcoded values.
- `apps/web-client/src/lib/constants/index.ts` — Application constants: `APP_NAME`, `API_VERSION`, `ROUTES`, `BREAKPOINTS`, `PAGINATION`, `STORAGE_KEYS`, `TOAST_DEFAULTS`, layout dimensions, validation patterns, `MOTION` durations.
- `apps/web-client/src/lib/api/client.ts` — Axios instance with auth token request interceptor, 401 refresh-token handling (with request queuing), normalized error response interceptor, SSR safety.
- `apps/web-client/src/lib/api/index.ts` — API module barrel export.
- `apps/web-client/src/lib/utils/cn.ts` — `cn()` utility combining `clsx` + `tailwind-merge`.
- `apps/web-client/src/lib/utils/format.ts` — `formatCurrency()`, `formatCurrencyCompact()`, `formatMileage()`, `formatNumber()`, `formatNumberCompact()`, `formatDate()`, `formatDateTime()`, `formatRelativeTime()`, `formatYear()`, `formatFuelEconomy()`, `formatEngineCC()` — all using `Intl` APIs.
- `apps/web-client/src/lib/utils/index.ts` — Utils barrel export.
- `apps/web-client/src/lib/hooks/useTheme.ts` — Theme management hook: localStorage persistence, `prefers-color-scheme` listener, `.dark` class on `<html>`.
- `apps/web-client/src/lib/hooks/useLocalStorage.ts` — Generic typed localStorage hook with SSR safety and functional updater.
- `apps/web-client/src/lib/hooks/useMediaQuery.ts` — `matchMedia` hook with SSR safety + convenience hooks (`useIsTablet`, `useIsDesktop`, `usePrefersReducedMotion`).
- `apps/web-client/src/lib/hooks/useDebounce.ts` — Debounce hook for search/filter inputs.
- `apps/web-client/src/lib/hooks/index.ts` — Hooks barrel export.

**Frontend — Providers**
- `apps/web-client/src/components/providers/ThemeProvider.tsx` — React context wrapping `useTheme`; exposes `useThemeContext()`.
- `apps/web-client/src/components/providers/ToastProvider.tsx` — Toast notification context + `useToast()`: portal-rendered stack, 4 variants, auto-dismiss, max 5 visible, accessible `role="status"` / `aria-live`.
- `apps/web-client/src/components/providers/ModalProvider.tsx` — Imperative modal context + `useModal()`: portal-rendered, focus trap, scroll lock, Escape dismissal, backdrop blur.
- `apps/web-client/src/components/providers/index.ts` — Providers barrel export.

**Frontend — Global Layout (Next.js App Router)**
- `apps/web-client/src/app/layout.tsx` — Root layout: Inter font (`next/font/google`), ThemeProvider + ToastProvider + ModalProvider nesting, full metadata (OG, Twitter cards, robots), anti-FOUC inline script, `suppressHydrationWarning`.
- `apps/web-client/src/app/page.tsx` — Component showcase page (temporary — replaced by landing page in Module 03).
- `apps/web-client/src/app/showcase-client.tsx` — Interactive client component demonstrating all Module 01 components.
- `apps/web-client/src/app/error.tsx` — Next.js error boundary with reset + go-home actions.
- `apps/web-client/src/app/not-found.tsx` — Next.js 404 page with go-home CTA.
- `apps/web-client/src/app/loading.tsx` — Next.js Suspense boundary loading page.

**Frontend — Layout Components**
- `apps/web-client/src/components/layout/Navbar.tsx` — Top navigation: transparent-over-hero / solid-on-scroll, skip-to-content link, dark mode toggle, mobile hamburger + full-screen drawer, active state, ARIA landmark.
- `apps/web-client/src/components/layout/Footer.tsx` — Footer: 4 link columns, social icons, copyright, responsive grid.
- `apps/web-client/src/components/layout/Sidebar.tsx` — Dealer/Admin sidebar: 240px fixed desktop, collapsible icon-only mode, off-canvas mobile drawer, accent border active state.
- `apps/web-client/src/components/layout/Breadcrumbs.tsx` — Breadcrumb trail: semantic nav/ol, BreadcrumbList JSON-LD, aria-current, chevron separators.
- `apps/web-client/src/components/layout/index.ts` — Layout barrel export.

**Frontend — UI Components**
- `apps/web-client/src/components/ui/Button.tsx` — 4 variants, 3 sizes, isLoading (no width shift), leftIcon/rightIcon, 44px min touch target, full a11y.
- `apps/web-client/src/components/ui/Card.tsx` — Composable Card/CardHeader/CardBody/CardFooter; elevated hover animation.
- `apps/web-client/src/components/ui/Input.tsx` — Always-visible label, error/help text, icons, required asterisk, accent focus ring, ref forwarding.
- `apps/web-client/src/components/ui/Textarea.tsx` — Same pattern as Input; vertical resize only, char count display.
- `apps/web-client/src/components/ui/Badge.tsx` — 5 variants, 2 sizes, optional dot indicator.
- `apps/web-client/src/components/ui/Alert.tsx` — 4 variants, icon+heading+description, dismissible, `role="alert"`.
- `apps/web-client/src/components/ui/Dialog.tsx` — Portal-rendered, focus trap, scroll lock, Escape/backdrop dismiss, scale-in animation, 5 sizes, full ARIA.
- `apps/web-client/src/components/ui/Spinner.tsx` — SVG spinner, 3 sizes, accessible, motion-reduce.
- `apps/web-client/src/components/ui/Skeleton.tsx` — SkeletonBox, SkeletonText, SkeletonCard; shimmer animation, motion-reduce.
- `apps/web-client/src/components/ui/index.ts` — UI components barrel export.

**Frontend — Feedback Components**
- `apps/web-client/src/components/feedback/LoadingPage.tsx` — Full-page loading state.
- `apps/web-client/src/components/feedback/LoadingGrid.tsx` — Configurable SkeletonCard grid.
- `apps/web-client/src/components/feedback/ErrorBoundary.tsx` — React class-based error boundary with retry.
- `apps/web-client/src/components/feedback/ErrorPage.tsx` — Reusable error display with status code, title, message, CTA.
- `apps/web-client/src/components/feedback/EmptyState.tsx` — Icon + heading + body + optional CTA.
- `apps/web-client/src/components/feedback/index.ts` — Feedback barrel export.

**Dependencies Added**
- `clsx` — Conditional class construction
- `tailwind-merge` — Safe Tailwind class merging
- `axios` — HTTP client for API calls

---

### Added — Documentation Phase
- `docs/PRD.md` — Product Requirements Document: vision, mission, problem statement, target users, business goals, objectives, scope, complete feature list, user stories, success metrics, future scope, technical stack, constraints, and risks.
- `docs/SRS.md` — Software Requirements Specification following IEEE SRS structure: functional requirements (FR-1–34), non-functional requirements (NFR-1–10), actors, use cases (UC-1–9), system constraints, assumptions, and acceptance criteria.
- `docs/Architecture.md` — Enterprise architecture documentation: high-level architecture, frontend/backend/ML/database architecture, authentication flow, API flow, deployment flow, folder structure, component diagram, sequence diagrams, scalability, and security.
- `docs/Database.md` — Full database design: ER diagram, 17 core tables (`users`, `dealers`, `brands`, `car_models`, `variants`, `listings`, `listing_images`, `reviews`, `rental_bookings`, `leads`, `wishlists`, `price_predictions`, `recommendations`, `notifications`, `admin_action_logs`, `system_logs`, `analytics_events`), relationships, indexing strategy, key constraints, normalization rationale.
- `docs/API.md` — Complete REST API contract: conventions, auth headers, request/response format, status codes, pagination, filtering, sorting, error responses, and endpoint specifications for Authentication, Brands, Models, Cars, Predictions, Recommendations, Compare, Rentals, Wishlist, Notifications, Analytics, and Admin.
- `docs/UI_UX_Guidelines.md` — Design system specification: typography, spacing, grid system, colors, design tokens, buttons, cards, forms, navigation, icons, animations, glassmorphism, dark/light mode, accessibility, and responsive rules.
- `docs/Development_Roadmap.md` — Module breakdown (M0–M17), complexity estimates, dependency map, development order, and milestone definitions (Milestones 1–8).
- `docs/PROJECT_RULES.md` — 31 mandatory development rules governing folder structure, technology stack, code reuse, code quality, documentation, and delivery conventions for all future development sessions.

### Established — Project Skeleton
- Base project structure created across `apps/web-client` (Next.js/React/TypeScript/Tailwind), `backend` (FastAPI/SQLAlchemy modular monolith with 12 domain modules), `ml` (`price-prediction`, `recommendation-engine` training/inference skeletons), `database` (migrations/seeds scaffolding), `tests` (unit/integration/e2e), and `infra` (docker/environments/monitoring scaffolding).
- Root configuration: `README.md`, `.gitignore`, `docker-compose.yml`, `package.json` (npm workspaces), `requirements.txt` (aggregate), `.github/workflows/ci.yml` (lint, build, test).
- Frontend configuration: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc`, `.env.example`, `Dockerfile`.
- Backend configuration: `requirements.txt`, `pyproject.toml` (ruff/black), `.env.example`, `Dockerfile`, app bootstrap (`main.py`, `core/config.py`, `db/base.py`, `db/session.py`) with no routes, tables, or business logic.
- ML configuration: `requirements.txt`, `Dockerfile`, `.env.example`, and inference service bootstraps for both `price-prediction` and `recommendation-engine`, with no model logic.

### Notes
- No authentication logic, backend APIs, ML models, UI components, database tables, or business logic have been implemented yet — the current state is documentation and structural skeleton only, per explicit scope instructions.
- All future entries in this file should be added under a new `[Unreleased]` section as work lands, and moved into a versioned section (e.g., `[0.1.0] - YYYY-MM-DD`) at the point of the first tagged release, per `docs/PROJECT_RULES.md` (Rule 29: update documentation whenever necessary).

---

## Changelog Entry Guidelines

Each future entry must use the following categories, only where applicable:

- **Added** — new features, modules, or endpoints.
- **Changed** — changes to existing functionality.
- **Deprecated** — features soon to be removed.
- **Removed** — features removed in this release (must follow the formal deprecation process — see `docs/PROJECT_RULES.md`, Rule 23).
- **Fixed** — bug fixes.
- **Security** — vulnerability fixes or security-related changes.

Every entry should reference the owning module/folder (e.g., `backend/app/modules/pricing`) so changes remain traceable to the architecture defined in `docs/Architecture.md`.

---

*End of Document.*
## [0.4.0] - 2026-07-18
### Added
- Module 04: Database & Backend Foundation.
- PostgreSQL and Alembic configuration.
- SQLAlchemy models (Users, Cars, Brands, Models, Categories, Dealers, Rentals, Wishlist, Reviews, Car Images).
- Core Repositories and Services pattern.
- CRUD APIs for Brands, Categories, Cars, and Dealers with filtering/pagination.
