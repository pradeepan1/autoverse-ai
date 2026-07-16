# AutoVerse AI — Development Roadmap

**Document Owner:** Engineering / Product Management
**Project:** AutoVerse AI — AI-Powered Automotive Intelligence Platform
**Status:** Active
**Location:** `docs/Development_Roadmap.md`

> This roadmap sequences development strictly within the existing project structure (`apps/web-client`, `backend`, `ml`, `database`, `infra`), per `docs/PROJECT_RULES.md` and `docs/Architecture.md`. No new projects, services, or structural changes are introduced — every module below is built inside the established skeleton.

---

## Table of Contents

1. Module Breakdown
2. Complexity Estimation Legend
3. Dependency Map
4. Development Order
5. Milestones & Phases
6. Risk-Adjusted Notes

---

## 1. Module Breakdown

| Module | Location | Description |
|---|---|---|
| **M0 — Foundation & Infra** | `infra`, `.github/workflows`, `database` | CI/CD, environments, observability baseline, DB provisioning |
| **M1 — Authentication & RBAC** | `backend/app/modules/auth` | Registration, login, OAuth, JWT, role-based access control |
| **M2 — Brands/Models/Variants (Catalog)** | `backend/app/modules/listings` | Reference data hierarchy underpinning all listings |
| **M3 — Cars / Listings (Core)** | `backend/app/modules/listings` | Listing CRUD, images, dealer ownership |
| **M4 — Search & Filters** | `backend/app/modules/search` | Full-text/faceted search, auto-suggest, denormalized index |
| **M5 — Dealer Management** | `backend/app/modules/dealers` | Dealer onboarding, verification, lead inbox |
| **M6 — User Dashboard (Buyer)** | `apps/web-client/src/features/dashboard` + relevant backend modules | Profile, saved searches, booking/wishlist history |
| **M7 — Wishlist** | `backend/app/modules/wishlist` | Save vehicles, price-drop tracking |
| **M8 — Reviews & Moderation** | `backend/app/modules/reviews` | Ratings/reviews for listings & dealers, moderation workflow |
| **M9 — Car Comparison** | `backend/app/modules/listings` (compare composition) + frontend feature | Side-by-side comparison, shareable links |
| **M10 — Price Prediction (ML)** | `ml/price-prediction`, `backend/app/modules/pricing` | Training pipeline + inference service + backend integration |
| **M11 — AI Recommendation (ML)** | `ml/recommendation-engine`, `backend/app/modules/recommendation` | Training pipeline + inference service + backend integration |
| **M12 — Car Rentals** | `backend/app/modules/rentals` | Availability search, booking lifecycle, cancellation/modification |
| **M13 — Notifications (Email)** | `backend/app/modules/notifications` | Transactional + marketing email automation |
| **M14 — Notifications (WhatsApp)** | `backend/app/modules/notifications` | Transactional WhatsApp + FAQ bot |
| **M15 — Analytics (Behavioral + Business)** | `backend/app/modules/analytics` | Event ingestion, dealer analytics, platform KPIs |
| **M16 — Admin Dashboard** | `backend/app/modules/admin` + frontend admin views | User/dealer management, moderation console, platform reporting |
| **M17 — Hardening & Launch Readiness** | Cross-cutting | Security audit, load testing, accessibility audit, DR runbooks |

---

## 2. Complexity Estimation Legend

| Level | Meaning | Typical Duration (single team) |
|---|---|---|
| **XS** | Trivial, config/scaffolding-level | 2–4 days |
| **S** | Low complexity, single-module CRUD | 1 week |
| **M** | Moderate, multiple integration points | 2 weeks |
| **L** | High complexity, cross-cutting or ML-involved | 3–4 weeks |
| **XL** | Very high complexity, multiple services + ML + async workflows | 5+ weeks |

---

## 3. Dependency Map

| Module | Depends On | Reason |
|---|---|---|
| M0 — Foundation & Infra | — | Must exist before any deployable code |
| M1 — Auth & RBAC | M0 | All authenticated endpoints require identity/roles |
| M2 — Catalog (Brands/Models/Variants) | M0 | Reference data required before listings can reference it |
| M3 — Cars/Listings (Core) | M1, M2 | Listings belong to a dealer (M1 identity) and reference a variant (M2) |
| M4 — Search & Filters | M3 | Search indexes listing data |
| M5 — Dealer Management | M1, M3 | Dealer role management and lead handling operate on listings |
| M6 — User Dashboard | M1, M3, M7 (partial) | Aggregates profile, wishlist, and booking data |
| M7 — Wishlist | M1, M3 | Requires authenticated users and existing listings |
| M8 — Reviews & Moderation | M1, M3, M5 | Reviews target listings/dealers; moderation needs Admin foundations (M16 overlaps but core review CRUD can precede full Admin) |
| M9 — Car Comparison | M3, M4 | Requires listing data and search/browse to select comparison candidates |
| M10 — Price Prediction (ML) | M2, M3 | Training data derives from catalog + listing history |
| M11 — AI Recommendation (ML) | M3, M4, M7 | Behavioral signals from browsing/wishlist feed personalization |
| M12 — Car Rentals | M1, M3 | Booking requires identity and a bookable listing |
| M13 — Notifications (Email) | M1, M12 (initial trigger), M5 (leads) | First real trigger events come from bookings/leads |
| M14 — Notifications (WhatsApp) | M13 | Shares the same notification module/event pipeline |
| M15 — Analytics | M3, M4, M12 | Needs meaningful event sources (views, search, bookings) to be useful |
| M16 — Admin Dashboard | M1, M3, M5, M8, M15 | Aggregates moderation, dealer, and analytics data |
| M17 — Hardening & Launch | All prior modules | Cannot meaningfully test/harden an incomplete system |

---

## 4. Development Order

The order below sequences modules to respect dependencies while front-loading the highest-leverage, highest-risk items (ML and core transactional flows) early enough to allow iteration time.

1. **M0** — Foundation & Infra
2. **M1** — Authentication & RBAC
3. **M2** — Catalog (Brands/Models/Variants)
4. **M3** — Cars / Listings (Core)
5. **M4** — Search & Filters
6. **M7** — Wishlist
7. **M5** — Dealer Management
8. **M9** — Car Comparison
9. **M10** — Price Prediction (ML)
10. **M8** — Reviews & Moderation
11. **M12** — Car Rentals
12. **M11** — AI Recommendation (ML)
13. **M6** — User Dashboard
14. **M13** — Notifications (Email)
15. **M14** — Notifications (WhatsApp)
16. **M15** — Analytics
17. **M16** — Admin Dashboard
18. **M17** — Hardening & Launch Readiness

**Rationale for key ordering decisions:**
- Wishlist (M7) is pulled early (step 6) because it's low complexity, unlocks User Dashboard content, and provides an early behavioral signal source for Recommendation (M11).
- Price Prediction (M10) is sequenced before Reviews/Rentals because it's the platform's core differentiator and has the longest lead time (data prep, training, evaluation) — starting early de-risks the timeline.
- Recommendation (M11) is deliberately placed after Rentals (M12) because it benefits from richer behavioral data (search, wishlist, comparison, booking activity) accumulated by that point.
- Notifications (M13/M14) follow Rentals because bookings provide the first meaningful transactional trigger event.
- Admin Dashboard (M16) is placed late because it aggregates data/moderation surfaces from nearly every other module — building it earlier would mean repeated rework.

---

## 5. Milestones & Phases

### Milestone 1 — Foundation Ready
**Modules:** M0, M1
**Complexity:** M0 = S, M1 = M
**Exit Criteria:** CI/CD pipeline operational; environments provisioned; users can register, log in, and receive role-scoped JWTs.

### Milestone 2 — Core Catalog & Listings Live
**Modules:** M2, M3, M4
**Complexity:** M2 = S, M3 = M, M4 = L
**Exit Criteria:** Dealers can create listings against a structured brand/model/variant catalog; listings are searchable and filterable end-to-end.

### Milestone 3 — Buyer Engagement Foundations
**Modules:** M7, M5, M9
**Complexity:** M7 = S, M5 = M, M9 = M
**Exit Criteria:** Buyers can wishlist and compare vehicles; dealers can manage listings and view incoming leads.

### Milestone 4 — Intelligence Layer v1
**Modules:** M10, M8
**Complexity:** M10 = XL, M8 = M
**Exit Criteria:** Price Prediction inference service is live and integrated into listing/detail views with a benchmarked accuracy threshold met; reviews can be submitted and moderated.

### Milestone 5 — Transactions Enabled
**Modules:** M12, M11
**Complexity:** M12 = L, M11 = XL
**Exit Criteria:** End-to-end rental booking flow is functional (search → book → manage); Recommendation engine is live with personalized and trending fallback modes.

### Milestone 6 — Engagement & Automation Complete
**Modules:** M6, M13, M14
**Complexity:** M6 = M, M13 = M, M14 = M
**Exit Criteria:** User Dashboard aggregates all buyer activity; transactional/marketing Email and WhatsApp automation are live and triggered by real platform events.

### Milestone 7 — Insight & Oversight Complete
**Modules:** M15, M16
**Complexity:** M15 = L, M16 = L
**Exit Criteria:** Behavioral and business analytics are captured and reportable; Admin Dashboard provides full user/dealer/content oversight with audit logging.

### Milestone 8 — Production Launch Readiness
**Modules:** M17
**Complexity:** XL (cross-cutting)
**Exit Criteria:** Security audit and penetration test passed; load testing meets defined NFR thresholds (`docs/SRS.md`); accessibility audit (WCAG 2.1 AA) passed; disaster recovery runbooks finalized; phased production rollout completed.

---

## 6. Risk-Adjusted Notes

- **M10 (Price Prediction)** and **M11 (Recommendation)** carry the highest complexity and schedule risk due to data dependency, training/evaluation cycles, and the need for offline accuracy gates before production promotion (per `docs/Architecture.md`, MLOps Practices). Both should begin data preparation work in parallel with earlier milestones rather than waiting for their sequenced start.
- **M4 (Search & Filters)** is rated **L** despite being "just search" because it introduces the first denormalized, eventually-consistent read model (per `docs/Database.md`, Section 8) — the synchronization mechanism itself is non-trivial and worth budgeting properly.
- **M16 (Admin Dashboard)** risk is aggregation risk, not net-new complexity — delays in upstream modules (M5, M8, M15) will directly delay this milestone; buffer time should be reserved accordingly.
- **M17 (Hardening & Launch)** should not be compressed — this phase is where NFRs (`docs/SRS.md` Section 8) and Acceptance Criteria (`docs/SRS.md` Section 12) are formally verified, not assumed.

---

*End of Document.*