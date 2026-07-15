# AutoVerse AI — Project Rules

**Status:** MANDATORY
**Applies To:** Every contributor, every commit, every development session — human or AI-assisted.
**Enforcement:** Non-negotiable. These rules override convenience, speed, or personal preference. Any code, PR, or session that violates these rules must be corrected before merge/acceptance.

---

## How to Use This Document

This document is the **single source of truth** for how AutoVerse AI is built, extended, and maintained. Before starting any development session — including AI-assisted coding sessions — read this file in full. If a request or instruction conflicts with these rules, **these rules win** unless a rule is formally amended (see [Section 8](#8-amending-these-rules)).

---

## 1. Project Integrity Rules

| # | Rule |
|---|---|
| 1 | **Never create another project.** AutoVerse AI is one project, one repository, one codebase. Do not scaffold a new project, a parallel repo, or a "clean slate" rewrite. |
| 2 | **Never rename folders.** Existing folder names are fixed contracts. Renaming breaks imports, CI, docs, and tooling. |
| 3 | **Never change folder structure.** The structure defined in `Architecture.md` / the project documentation is final for the current phase. New code is added *within* the existing structure, not by restructuring it. |
| 4 | **Never rename APIs.** Existing API routes/endpoints are contracts consumed by the frontend and possibly external systems. Renaming breaks integrations silently. |
| 5 | **Never rename database tables.** Table names are referenced across migrations, ORM models, and queries. Renaming without a formal, reviewed migration plan causes data-integrity risk. |
| 23 | **Never delete existing features.** Features are removed only through an explicit, approved deprecation process — never silently, never as a side effect of "cleanup." |
| 31 | **Extend the existing project instead of creating a new one.** Every new requirement is implemented as an extension of AutoVerse AI's current codebase and architecture — never as a separate app, service, or throwaway prototype. |

---

## 2. Code Reuse & Modularity Rules

| # | Rule |
|---|---|
| 6 | **Never duplicate components.** Before writing a new component, search the codebase for an existing one that does the same or similar job. |
| 7 | **Always reuse existing components.** If a component exists that fulfills the need (even partially), extend or configure it — do not fork a near-identical copy. |
| 17 | **Always write reusable components.** New components must be designed to be generic and configurable enough for future reuse, not hardcoded to a single use case. |
| 18 | **Always write modular code.** Business logic, UI, and data access must remain separated and composable. No monolithic files mixing concerns. |
| 8 | **Always follow the existing architecture.** Respect the layering, service boundaries, and design patterns already established in the project documentation. Do not introduce a competing pattern (e.g., a different state-management approach, a different API style) without formal architectural review. |

---

## 3. Mandatory Technology Stack

The following technologies are **fixed** for this project. No substitutions, no "alternative library because it's easier," no mixing frameworks.

| # | Rule |
|---|---|
| 9 | **Always use Next.js** for the frontend application framework. |
| 10 | **Always use React** as the UI library (via Next.js). |
| 11 | **Always use TypeScript.** No plain JavaScript files in application code. All types must be explicit and meaningful — no blanket `any`. |
| 12 | **Always use Tailwind CSS** for styling. |
| 13 | **Always use FastAPI** for backend services and APIs. |
| 14 | **Always use PostgreSQL** as the relational database engine. |
| 15 | **Always use SQLAlchemy** as the ORM/data-access layer for PostgreSQL. |
| 16 | **Always use Supabase** for the managed backend platform (auth/database/storage integration as applicable to this project's setup). |

No new frameworks, databases, ORMs, or styling systems may be introduced without a formal architecture decision and update to this document.

---

## 4. Code Quality & Completeness Rules

| # | Rule |
|---|---|
| 19 | **Never use inline CSS.** All styling goes through Tailwind CSS utility classes (or the established design system) — no `style={{ }}` props or inline `<style>` blocks used as a substitute for proper styling. |
| 20 | **Never hardcode values.** Configuration, secrets, URLs, thresholds, and environment-specific values must come from environment variables, config files, or constants — never hardcoded inline. |
| 21 | **Never use placeholder code.** No `TODO: implement later`, no stub functions returning fake data, no `// coming soon` left in code presented as done. |
| 22 | **Never generate incomplete code.** Every function, component, endpoint, or module delivered must be fully working end-to-end — not partially wired up. |
| 24 | **Every feature must be production-ready.** No "demo quality" code. Error handling, edge cases, validation, and responsiveness are part of "done," not follow-up work. |

---

## 5. API, Validation & UI Rules

| # | Rule |
|---|---|
| 25 | **Every API must include validation.** All incoming request data must be validated (schema/type validation) before processing — no endpoint trusts raw client input. |
| 26 | **Every page must be responsive.** All UI must work correctly across mobile, tablet, and desktop breakpoints — no desktop-only or mobile-only pages. |
| 27 | **Every form must include validation.** Both client-side (immediate feedback) and server-side (authoritative) validation are required for every form. |

---

## 6. Documentation Rules

| # | Rule |
|---|---|
| 28 | **Every module must include documentation.** New services, components, or modules must include a brief description of purpose, inputs/outputs, and usage — inline docstrings/comments at minimum, dedicated docs for larger modules. |
| 29 | **Update README whenever necessary.** If a change affects setup, usage, architecture, or available scripts/commands, the README (and relevant `docs/*.md` file) must be updated in the same change — not as a follow-up task. |

---

## 7. Delivery Rules (AI-Assisted & Human Development Sessions)

| # | Rule |
|---|---|
| 30 | **Return only modified files.** When delivering changes, provide only the files that were actually created or changed — do not re-output unrelated or unchanged files. |

**Additional delivery expectations that follow from Rules 1–31:**
- Before adding a new component, service, table, or API route, first check whether an equivalent already exists in the project (Rules 6, 7).
- Any proposed change to folder structure, naming, or architecture must be flagged explicitly as a **proposal requiring approval** — never applied unilaterally (Rules 2, 3, 4, 5, 8).
- Any feature addition must integrate with existing Auth, RBAC, database schema, and API conventions already in place — not introduce a parallel system.

---

## 8. Amending These Rules

These rules are considered locked for the duration of active development. A rule may only be changed, relaxed, or removed through an explicit, documented decision recorded in `CHANGELOG.md` and approved by the project owner/architect — never inferred from a single request or assumed from convenience.

---

## Quick-Reference Checklist (For Every Development Session)

Before submitting any change, confirm:

- [ ] No new project, repo, or parallel codebase was created (Rule 1, 31)
- [ ] No folders, APIs, or database tables were renamed (Rules 2, 4, 5)
- [ ] Folder structure is unchanged (Rule 3)
- [ ] Existing components were reused, not duplicated (Rules 6, 7)
- [ ] New code follows existing architecture and patterns (Rule 8)
- [ ] Stack used: Next.js, React, TypeScript, Tailwind, FastAPI, PostgreSQL, SQLAlchemy, Supabase (Rules 9–16)
- [ ] No inline CSS, no hardcoded values, no placeholders, no incomplete code (Rules 19–22)
- [ ] No existing feature was removed (Rule 23)
- [ ] Feature is production-ready end-to-end (Rule 24)
- [ ] API includes validation (Rule 25)
- [ ] Page/UI is responsive (Rule 26)
- [ ] Form includes client + server validation (Rule 27)
- [ ] Module is documented (Rule 28)
- [ ] README/docs updated if needed (Rule 29)
- [ ] Only modified files are returned (Rule 30)

---

*This document governs all development activity on AutoVerse AI and takes precedence over ad-hoc instructions that conflict with it.*
