# AutoVerse AI — UI/UX Guidelines

**Document Owner:** Design / Frontend Architecture
**Project:** AutoVerse AI — AI-Powered Automotive Intelligence Platform
**Status:** Active
**Location:** `docs/UI_UX_Guidelines.md`

> This document defines the visual and interaction language for AutoVerse AI, implemented via Tailwind CSS design tokens in `apps/web-client`, per `docs/Architecture.md` and `docs/PROJECT_RULES.md`. No component code is included — this is design specification only.

---

## Table of Contents

1. Design Philosophy
2. Typography
3. Spacing
4. Grid System
5. Colors
6. Design Tokens
7. Buttons
8. Cards
9. Forms
10. Navigation
11. Icons
12. Animations
13. Glassmorphism
14. Dark Mode
15. Light Mode
16. Accessibility
17. Responsive Rules

---

## 1. Design Philosophy

AutoVerse AI's design language blends four references into one coherent system:

- **Apple** — restraint, generous whitespace, quiet confidence, content-first hierarchy, precise typography.
- **Tesla** — minimal chrome, dark-mode-native surfaces, large confident imagery, low visual noise around high-stakes decisions (price, purchase).
- **BMW** — structured grid discipline, strong horizontal rhythm, premium metallic/neutral palette accents, engineering precision in alignment.
- **Porsche** — bold typographic scale for hero moments, high-contrast accent color used sparingly and deliberately (never decoratively), a sense of engineered performance.
- **Modern SaaS** — clarity over decoration: dashboards, tables, and forms prioritize scannability, fast comprehension, and low cognitive load over ornamentation.

**Core principle:** Every screen should feel like it belongs to a premium automotive brand *and* a best-in-class SaaS product simultaneously — confident, quiet, data-dense where needed, spacious where it matters (hero moments, price reveals, key decisions).

---

## 2. Typography

### Typeface
- **Primary typeface:** A geometric/humanist sans-serif (e.g., Inter, Söhne, or SF Pro–equivalent) for all UI text — clean, highly legible at small sizes, neutral enough to let vehicle imagery lead.
- **Display typeface (optional, hero moments only):** A slightly condensed, higher-contrast sans (e.g., a grotesk) for large hero numbers (price figures, comparison headlines) — evokes the Porsche/BMW performance-display feel.

### Type Scale (modular scale, base 16px, ratio ~1.25)

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-display` | 56px | 1.05 | 700 | Hero headlines, landing statements |
| `text-h1` | 40px | 1.1 | 700 | Page titles |
| `text-h2` | 32px | 1.15 | 600 | Section titles |
| `text-h3` | 24px | 1.2 | 600 | Card/module titles |
| `text-h4` | 20px | 1.25 | 600 | Subsection headers |
| `text-body-lg` | 18px | 1.5 | 400 | Lead paragraphs, key descriptions |
| `text-body` | 16px | 1.5 | 400 | Default body text |
| `text-body-sm` | 14px | 1.45 | 400 | Secondary text, table cells |
| `text-caption` | 12px | 1.4 | 500 | Labels, metadata, timestamps |
| `text-price` | 32–48px | 1.1 | 700 | Price displays (Porsche/Tesla-style hero numbers) |

### Typographic Rules
- Never use more than 3 font weights on a single screen (e.g., 400 / 600 / 700).
- Letter-spacing: slightly negative (-0.01em to -0.02em) on headings for a tightened, premium feel; default (0) on body text.
- Numeric figures (price, mileage, year) use tabular figures so columns align in tables and comparison views.
- Line length for body copy capped at ~70–75 characters for readability.

---

## 3. Spacing

An **8px base unit** system, consistent with both Apple's and modern SaaS spacing conventions.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro spacing (icon-to-label gap) |
| `space-2` | 8px | Tight internal padding |
| `space-3` | 12px | Form field internal padding |
| `space-4` | 16px | Default component padding |
| `space-6` | 24px | Card padding, section internal spacing |
| `space-8` | 32px | Section spacing (between related blocks) |
| `space-12` | 48px | Section spacing (between distinct sections) |
| `space-16` | 64px | Major section breaks |
| `space-24` | 96px | Hero/landing section spacing |

**Rule:** Vertical rhythm always uses multiples of `space-2` (8px). No arbitrary pixel values in layout spacing.

---

## 4. Grid System

- **Base grid:** 12-column responsive grid, consistent with BMW's structured, engineered layout discipline.
- **Max content width:** 1280px on desktop, centered, with fluid gutters below that.
- **Gutter width:** 24px desktop, 16px tablet, 12px mobile.
- **Breakpoints:**

| Breakpoint | Min Width | Columns Used |
|---|---|---|
| `sm` (mobile) | 0px | 4-column |
| `md` (tablet) | 768px | 8-column |
| `lg` (desktop) | 1024px | 12-column |
| `xl` (wide desktop) | 1440px | 12-column, wider gutters |

- **Card grids** (listings, dealer inventory): 1 column on mobile, 2 on tablet, 3–4 on desktop, using CSS grid with fixed gutter and fluid card width.
- **Dashboard layouts:** fixed sidebar (240px) + fluid content area on desktop; collapsible/off-canvas sidebar below `lg`.

---

## 5. Colors

### Palette Philosophy
Neutral-dominant palette (Apple/Tesla restraint) with a single, deliberate accent color (Porsche-style precision use) — never more than one accent color active per screen.

### Core Palette

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `color-bg-primary` | `#FFFFFF` | `#0A0A0B` | Page background |
| `color-bg-secondary` | `#F5F5F7` | `#161618` | Section/card background |
| `color-bg-elevated` | `#FFFFFF` | `#1E1E21` | Modals, popovers, elevated surfaces |
| `color-border` | `#E4E4E7` | `#2C2C30` | Dividers, card borders |
| `color-text-primary` | `#0A0A0B` | `#F5F5F7` | Headings, primary text |
| `color-text-secondary` | `#6B6B70` | `#A1A1A6` | Secondary/supporting text |
| `color-text-muted` | `#9C9CA1` | `#6B6B70` | Captions, placeholders |
| `color-accent` | `#D4001A` | `#FF3B45` | Primary CTA, key highlights (Porsche red-inspired, used sparingly) |
| `color-accent-hover` | `#B00016` | `#E62F38` | Accent hover/active state |
| `color-success` | `#1E8E5A` | `#2FBE7C` | Confirmations, positive states |
| `color-warning` | `#B7791F` | `#E0A83A` | Warnings, pending states |
| `color-error` | `#C0362C` | `#F0564A` | Errors, destructive actions |
| `color-info` | `#2563EB` | `#5B8DEF` | Informational highlights |

### Usage Rules
- Accent color (`color-accent`) reserved exclusively for primary actions and the single most important element per screen (e.g., "Book Now," predicted price highlight) — never for decoration.
- Neutral grays carry the majority of the UI (Apple-style restraint); color is a signal, not a decoration.
- Status colors (success/warning/error/info) are used consistently and never repurposed for branding.

---

## 6. Design Tokens

Design tokens are the single source of truth, implemented as Tailwind CSS theme extensions (no hardcoded values in components, per `docs/PROJECT_RULES.md` Rule 20).

```json
{
  "color": {
    "bg": { "primary": "#FFFFFF", "secondary": "#F5F5F7", "elevated": "#FFFFFF" },
    "text": { "primary": "#0A0A0B", "secondary": "#6B6B70", "muted": "#9C9CA1" },
    "accent": { "DEFAULT": "#D4001A", "hover": "#B00016" },
    "border": "#E4E4E7"
  },
  "radius": { "sm": "6px", "md": "10px", "lg": "16px", "xl": "24px", "full": "9999px" },
  "shadow": {
    "sm": "0 1px 2px rgba(0,0,0,0.06)",
    "md": "0 4px 12px rgba(0,0,0,0.08)",
    "lg": "0 12px 32px rgba(0,0,0,0.12)",
    "glass": "0 8px 32px rgba(0,0,0,0.10)"
  },
  "spacing": { "1": "4px", "2": "8px", "4": "16px", "6": "24px", "8": "32px", "12": "48px" },
  "font": {
    "family": { "base": "Inter, sans-serif", "display": "Inter Tight, sans-serif" },
    "size": { "sm": "14px", "base": "16px", "lg": "18px", "xl": "24px", "display": "56px" }
  },
  "motion": {
    "duration": { "fast": "150ms", "base": "250ms", "slow": "400ms" },
    "easing": { "standard": "cubic-bezier(0.4, 0, 0.2, 1)", "emphasized": "cubic-bezier(0.2, 0, 0, 1)" }
  }
}
```

All tokens are defined once in the Tailwind configuration and consumed everywhere — no component redefines a color, radius, spacing value, or duration inline.

---

## 7. Buttons

| Variant | Usage | Style Notes |
|---|---|---|
| **Primary** | Single primary action per screen (e.g., "Get Price Estimate," "Book Now") | `color-accent` background, white text, `radius-md`, subtle shadow on hover |
| **Secondary** | Supporting actions | Neutral background (`color-bg-secondary`), 1px border, primary text color |
| **Tertiary / Ghost** | Low-emphasis actions (e.g., "Cancel," "Learn more") | Transparent background, text-only, underline or color shift on hover |
| **Destructive** | Irreversible actions (e.g., "Delete Listing") | `color-error` background or border, requires confirmation step |
| **Icon Button** | Compact actions (wishlist heart, close, filter toggle) | Square/circular, `radius-full` or `radius-md`, minimum 40×40px tap target |

**Rules:**
- Only one Primary button visible per view/section — never two competing primary CTAs.
- Minimum touch target: 44×44px on all interactive elements (Apple HIG standard).
- Button states: default, hover, active/pressed, focus-visible (visible outline), disabled (reduced opacity, no pointer events).
- Loading state replaces label with a spinner, button remains the same width (no layout shift).

---

## 8. Cards

Cards are the primary content unit for listings, dealer summaries, dashboard widgets, and comparison rows.

- **Structure:** image/media (if applicable) → title/metadata → primary stat (price) → actions.
- **Radius:** `radius-lg` (16px) — soft enough to feel premium, not playful.
- **Elevation:** `shadow-sm` at rest, `shadow-md` on hover, with a subtle 2–4px upward translate on hover (Tesla-style responsiveness).
- **Padding:** `space-6` (24px) internal padding, consistent across all card types.
- **Listing cards:** image at 16:9 ratio, price rendered in `text-price` weight/scale even within a compact card, secondary metadata (mileage, year, location) in `text-body-sm` / `color-text-secondary`.
- **Dashboard/metric cards:** large numeric figure top-aligned, label below in `text-caption`, optional trend indicator (up/down arrow + delta %) in success/error color.

---

## 9. Forms

- **Input fields:** `radius-md`, 1px border (`color-border`), 12–16px internal padding, clear focus state (2px accent-colored outline/ring, never removed for accessibility).
- **Labels:** always visible above the field (never placeholder-only labels) — placeholders are used only for format hints (e.g., "e.g., 2019").
- **Validation:**
  - Inline, real-time validation on blur (client-side) — errors appear directly below the field in `color-error`, with a short, specific message.
  - Server-side validation is authoritative; client-side is a UX convenience only, per `docs/PROJECT_RULES.md` Rule 27.
- **Required fields:** marked with a subtle asterisk or "(required)" label — never color alone, for accessibility.
- **Grouping:** related fields grouped visually with consistent `space-4` gaps; unrelated groups separated by `space-8`+.
- **Multi-step forms** (e.g., listing creation, price prediction input): a persistent step indicator at the top, with the ability to go back without losing entered data.
- **Buttons within forms:** primary submit action right-aligned (desktop) or full-width (mobile), secondary/cancel action to its left or below.

---

## 10. Navigation

- **Primary navigation (Buyer-facing):** persistent top navigation bar — logo, primary sections (Search, Compare, Rentals, Wishlist), utility icons (notifications, profile) right-aligned. Transparent-over-hero on landing, solid on scroll (Apple/Tesla pattern).
- **Dealer/Admin navigation:** left sidebar navigation, collapsible, icon + label, with active-state indicated by accent-colored left border and background tint — not color-fill alone.
- **Breadcrumbs:** used on deep detail pages (e.g., Brand → Model → Variant → Listing) for orientation, `text-body-sm`, `color-text-secondary` with the current page in `color-text-primary`.
- **Mobile navigation:** bottom tab bar for Buyer-facing core actions (Home, Search, Wishlist, Dashboard); sidebar collapses to a slide-over drawer for Dealer/Admin views.
- **Search bar:** persistent, prominent placement in the primary nav, with auto-suggest dropdown appearing below (per `docs/SRS.md` FR-25).

---

## 11. Icons

- **Icon set:** a single, consistent line-icon set (consistent stroke width, e.g., 1.5–2px) — no mixing of filled and outlined styles within the same context.
- **Sizing:** standardized at 16px, 20px, and 24px — no arbitrary icon sizes.
- **Usage:** icons always paired with a text label in primary navigation and buttons (icon-only is reserved for well-understood, universal actions: close, search, heart/wishlist, filter).
- **Semantic color:** icons inherit `color-text-secondary` by default; only shift to `color-accent` or status colors when indicating an active/selected or status-specific state (e.g., filled red heart for wishlisted).

---

## 12. Animations

Motion is used to reinforce hierarchy and responsiveness — never as decoration (Tesla/Apple restraint principle).

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `motion-fast` | 150ms | standard | Hover states, button press feedback |
| `motion-base` | 250ms | standard | Card hover elevation, dropdown open/close |
| `motion-slow` | 400ms | emphasized | Page transitions, modal entrance |

**Rules:**
- All interactive state changes (hover, focus, active) animate with `motion-fast`.
- Modals/drawers slide or fade in with `motion-slow` + emphasized easing, combined with a backdrop fade.
- Skeleton loaders (not spinners) are preferred for content-heavy loads (listing grids, dashboards) to reduce perceived latency.
- Respect `prefers-reduced-motion`: all non-essential animation is disabled or reduced to opacity-only transitions when the user has this OS-level preference set.
- No parallax, no bounce/elastic easing — motion stays precise and engineered, not playful.

---

## 13. Glassmorphism

Used selectively for elevated, content-over-media surfaces (Tesla/Apple hero overlays) — never for dense data surfaces (tables, forms).

**Where to use:**
- Navigation bar when overlaying a hero image/video.
- Floating action panels over vehicle imagery (e.g., quick-spec overlay on a listing hero).
- Modal/dialog backdrops in Dark Mode.

**Where NOT to use:**
- Dashboards, tables, forms, or any data-dense, high-legibility-requirement surface.

**Style specification:**
```json
{
  "background": "rgba(255, 255, 255, 0.65)",
  "backgroundDark": "rgba(20, 20, 22, 0.55)",
  "backdropFilter": "blur(20px) saturate(160%)",
  "border": "1px solid rgba(255, 255, 255, 0.18)",
  "shadow": "shadow-glass"
}
```

**Rule:** Glassmorphic surfaces must maintain a minimum 4.5:1 text contrast ratio against their busiest expected background — verified before shipping, not assumed.

---

## 14. Dark Mode

- **Default for:** hero/marketing surfaces, and available as a user preference across the full application (Tesla-style dark-native feel).
- **Background hierarchy:** true near-black (`#0A0A0B`) base, with slightly lighter elevated surfaces (`#1E1E21`) to create depth without relying on heavy shadows (shadows are subtle-to-invisible in dark mode; elevation is communicated via background lightness instead).
- **Text contrast:** primary text at `#F5F5F7` (not pure white, to reduce glare/halation); secondary text at `#A1A1A6`.
- **Accent color:** slightly brightened in dark mode (`#FF3B45` vs. `#D4001A`) to maintain perceptual vibrancy against a dark background.
- **Images/media:** listing photos are not altered, but surrounding chrome (cards, overlays) adapts; avoid pure white card backgrounds in dark mode — use `color-bg-elevated`.

---

## 15. Light Mode

- **Default for:** dashboards, forms, and data-dense views where maximum legibility and print-like clarity are prioritized (SaaS convention).
- **Background hierarchy:** pure white (`#FFFFFF`) base with a very light gray secondary (`#F5F5F7`) to separate sections without heavy borders.
- **Shadows carry more visual weight** in light mode (since background lightness can't communicate elevation) — `shadow-sm`/`shadow-md` are used deliberately for card and modal elevation.
- **Borders:** light mode relies more on 1px borders (`color-border`) for separation than dark mode, which favors background-shade separation.

**Mode switching:** the platform respects OS-level `prefers-color-scheme` by default, with an explicit user override available in account settings, persisted per user.

---

## 16. Accessibility

Baseline: **WCAG 2.1 AA**, per `docs/SRS.md` NFR-9.

- **Color contrast:** minimum 4.5:1 for body text, 3:1 for large text (24px+/bold 19px+) and UI component boundaries.
- **Never color-alone:** status, required fields, and validation states always paired with an icon, label, or text — not conveyed by color alone.
- **Keyboard navigation:** every interactive element reachable and operable via keyboard, with a visible focus indicator (accent-colored ring, never `outline: none` without a replacement).
- **Semantic HTML:** proper heading hierarchy (`h1`→`h6`), landmark regions (`nav`, `main`, `aside`), and form labels tied to inputs via `for`/`id` or equivalent.
- **Alt text:** all vehicle images require descriptive alt text (e.g., "2021 Toyota Corolla LE, front three-quarter view").
- **ARIA:** used to supplement, not replace, semantic HTML — applied to custom components (dropdowns, modals, tabs) that lack a native equivalent.
- **Motion sensitivity:** `prefers-reduced-motion` respected platform-wide (see Section 12).
- **Screen reader testing:** core flows (search, compare, book, submit review) manually tested with at least one screen reader (e.g., VoiceOver or NVDA) before release.
- **Touch targets:** minimum 44×44px, consistent with the Buttons section.

---

## 17. Responsive Rules

- **Mobile-first construction:** base styles target mobile; complexity is added at larger breakpoints, not stripped away from a desktop-first design.
- **Fluid typography:** heading sizes scale down proportionally below `md` (e.g., `text-display` reduces from 56px to ~36px on mobile) to preserve hierarchy without overflow.
- **Navigation collapse:** primary nav collapses to a hamburger/menu icon below `md`; dealer/admin sidebars collapse to an off-canvas drawer below `lg`.
- **Card grids:** reflow from multi-column to single-column as width decreases (Section 4); no horizontal scrolling for primary content grids.
- **Tables (dashboards, dealer leads):** convert to stacked card-per-row layout below `md`, preserving all data without truncation-only strategies.
- **Forms:** single-column field layout on mobile; multi-column (2-field rows) permitted at `md`+ only for tightly related fields (e.g., start date / end date).
- **Touch vs. pointer:** hover-dependent interactions (e.g., hover-to-reveal actions on cards) must have an equivalent tap-accessible alternative on touch devices — hover is an enhancement, never the only path to an action.
- **Images:** responsive `srcset`-driven delivery, served via CDN, with defined aspect ratios to prevent layout shift during load.

---

*End of Document.*