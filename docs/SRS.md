# AutoVerse AI — Software Requirements Specification (SRS)

**Standard Reference:** IEEE 830 / IEEE 29148 Software Requirements Specification structure
**Document Owner:** Lead Product Manager / Engineering
**Project:** AutoVerse AI — AI-Powered Automotive Intelligence Platform
**Status:** Active
**Location:** `docs/SRS.md`

---

## 1. Introduction

### 1.1 Purpose of this Document
This Software Requirements Specification (SRS) defines the functional and non-functional requirements, system behavior, constraints, and acceptance criteria for AutoVerse AI. It serves as the authoritative technical reference for engineering, QA, and product stakeholders throughout development, following IEEE SRS documentation conventions.

### 1.2 Intended Audience
Engineering teams (frontend, backend, ML, DevOps), QA/testing teams, product management, and technical stakeholders responsible for building, testing, and maintaining AutoVerse AI.

### 1.3 Document Conventions
- "Must" / "Shall" indicate mandatory requirements.
- "Should" indicates recommended but non-mandatory behavior.
- Requirement IDs are prefixed by category: `FR` (Functional Requirement), `NFR` (Non-Functional Requirement), `UC` (Use Case).

---

## 2. Purpose

The purpose of AutoVerse AI is to provide a unified, AI-powered automotive intelligence platform that enables buyers, renters, dealers, and administrators to research, value, compare, transact, and manage vehicles through a single web-based system, augmented by machine learning and automated communication (Email, WhatsApp).

This SRS specifies **what** the system must do and the conditions under which it must perform, independent of implementation detail, while remaining consistent with the project's mandated architecture and technology stack (`docs/PROJECT_RULES.md`, `docs/Architecture.md`).

---

## 3. Scope

AutoVerse AI encompasses the following capabilities, delivered via:
- `apps/web-client` — the frontend web application (Next.js, React, TypeScript, Tailwind CSS).
- `backend` — the modular FastAPI/SQLAlchemy backend, organized by domain module.
- `ml` — machine learning training pipelines and inference services (Price Prediction, Recommendation Engine).
- `database` — PostgreSQL schema, migrations, and seed data (via Supabase).
- `infra` — deployment, environment, and monitoring configuration.

### 3.1 In Scope
Car Price Prediction, AI Car Recommendation, Car Comparison, Car Rentals, Dealer Management, User Dashboard, Admin Dashboard, Search & Filters, Wishlist, Reviews, Authentication & RBAC, Analytics, Email Automation, WhatsApp Automation.

### 3.2 Out of Scope (Current Phase)
Native mobile applications, in-app full purchase payment processing, multi-language/multi-currency support, insurance/financing marketplace integrations, physical inspection/logistics coordination.

---

## 4. Definitions, Acronyms, and Abbreviations

| Term | Definition |
|---|---|
| **SRS** | Software Requirements Specification |
| **RBAC** | Role-Based Access Control |
| **ML** | Machine Learning |
| **API** | Application Programming Interface |
| **CRUD** | Create, Read, Update, Delete |
| **JWT** | JSON Web Token |
| **MAE / RMSE** | Mean Absolute Error / Root Mean Squared Error (ML evaluation metrics) |
| **Lead** | A buyer inquiry routed to a dealer regarding a specific listing |
| **Listing** | A vehicle record published by a dealer for sale or rental |
| **Wishlist** | A user's saved collection of vehicles of interest |
| **Inference Service** | A deployed ML model exposed via API for real-time prediction |
| **Modular Monolith** | A single deployable backend application organized into independent, domain-bound modules |

---

## 5. System Overview

AutoVerse AI is architected as a **modular monolith** with clearly bounded domains, designed to evolve toward independent microservices as scale requires, without a structural rewrite.

**High-level composition:**
- **Client Layer** — `apps/web-client`, a single web application serving Buyer, Dealer, and Admin experiences via role-based views.
- **Application Layer** — `backend`, exposing versioned REST APIs, organized into domain modules (`auth`, `listings`, `search`, `pricing`, `recommendation`, `rentals`, `dealers`, `reviews`, `wishlist`, `notifications`, `analytics`, `admin`).
- **ML Layer** — `ml`, providing independently deployed training pipelines and inference services for Price Prediction and Recommendation.
- **Data Layer** — `database`, PostgreSQL (via Supabase), with migrations and seed data managed separately from application code.
- **Automation Layer** — Email and WhatsApp automation, integrated through the `notifications` module and external provider APIs.
- **Infrastructure Layer** — `infra`, covering containerized deployment, environment configuration, and monitoring.

The system follows API-first, event-driven, and stateless service design principles as defined in `docs/Architecture.md`.

---

## 6. Actors

| Actor | Description |
|---|---|
| **Guest** | Unauthenticated visitor with read-only access to public listings and search. |
| **Buyer** | Registered user who searches, compares, wishlists, reviews, and purchases/rents vehicles. |
| **Renter** | A Buyer role performing rental-specific actions (booking, managing rentals). |
| **Dealer** | Verified business account managing listings, leads, and dealer-level analytics. |
| **Support Agent** | Internal staff handling user/dealer support and limited moderation. |
| **Admin** | Internal staff managing platform-wide users, dealers, content moderation, and analytics. |
| **Super Admin** | Highest-privilege internal role managing system configuration, roles, and security settings. |
| **ML Inference Service** | System actor providing price predictions and recommendations to the backend. |
| **Notification Provider** | External system actor (Email/WhatsApp API providers) delivering automated messages. |

---

## 7. Functional Requirements

### 7.1 Authentication & Authorization
- **FR-1:** The system shall allow users to register and log in via email/password and OAuth (Google).
- **FR-2:** The system shall enforce Role-Based Access Control for Buyer, Dealer, Admin, Support Agent, and Super Admin roles.
- **FR-3:** The system shall support secure password reset and email verification workflows.
- **FR-4:** The system shall issue and refresh JWT-based session tokens.

### 7.2 Car Price Prediction
- **FR-5:** The system shall accept vehicle attributes (make, model, year, mileage, condition, location) and return a predicted price range with a confidence score.
- **FR-6:** The system shall support periodic retraining of the price prediction model using updated market data.
- **FR-7:** The system shall display historical price trends for a given vehicle profile.

### 7.3 AI Car Recommendation
- **FR-8:** The system shall generate recommendations based on stated user preferences (budget, body type, fuel type, usage).
- **FR-9:** The system shall refine recommendations using behavioral signals (search, browsing, wishlist activity).
- **FR-10:** The system shall display "Similar Cars" recommendations on car detail pages.

### 7.4 Car Comparison
- **FR-11:** The system shall allow users to select 2–4 vehicles for side-by-side comparison of specifications, price, and reviews.
- **FR-12:** The system shall generate a shareable link for a given comparison result.

### 7.5 Car Rentals
- **FR-13:** The system shall allow users to search rental vehicles by location, date range, and category.
- **FR-14:** The system shall support a full booking workflow including availability checks, pricing, and confirmation.
- **FR-15:** The system shall allow users to view rental history and cancel or modify existing bookings.

### 7.6 Dealer Management
- **FR-16:** The system shall allow dealers to create, edit, and manage vehicle listings.
- **FR-17:** The system shall allow dealers to view and respond to incoming leads.
- **FR-18:** The system shall provide dealer-level analytics (views, leads, conversion rate, inventory aging).
- **FR-19:** The system shall support bulk listing upload via file import.

### 7.7 User Dashboard
- **FR-20:** The system shall provide a user dashboard including profile management, saved searches, wishlist, price alerts, and booking history.

### 7.8 Admin Dashboard
- **FR-21:** The system shall provide platform-wide user, dealer, and listing management for Admin/Super Admin roles.
- **FR-22:** The system shall support moderation of flagged reviews and listings.
- **FR-23:** The system shall provide platform-wide analytics and reporting.

### 7.9 Search & Filters
- **FR-24:** The system shall support full-text and faceted search (make, model, price range, year, fuel type, transmission, location).
- **FR-25:** The system shall support auto-suggest and typo-tolerant search queries.

### 7.10 Wishlist
- **FR-26:** The system shall allow users to add/remove vehicles from a personal wishlist and receive price-drop alerts.

### 7.11 Reviews
- **FR-27:** The system shall allow users to submit ratings and reviews for vehicles and dealers.
- **FR-28:** The system shall support a moderation workflow for submitted reviews (auto-flagging and manual review).

### 7.12 Analytics
- **FR-29:** The system shall capture behavioral analytics (page views, search terms, funnel drop-offs).
- **FR-30:** The system shall provide business analytics (top models, regional demand, conversion rates).

### 7.13 Email Automation
- **FR-31:** The system shall send transactional emails (welcome, verification, booking confirmation, password reset).
- **FR-32:** The system shall send marketing emails (price alerts, recommendations, newsletters) with opt-out support.

### 7.14 WhatsApp Automation
- **FR-33:** The system shall send transactional WhatsApp messages (booking confirmations, reminders).
- **FR-34:** The system shall provide a conversational support bot for FAQs and lead capture.

---

## 8. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| **NFR-1** | Performance | API p95 response time shall be under 300ms for core endpoints; search results under 500ms. |
| **NFR-2** | Scalability | The system shall support horizontal scaling to at least 100,000 concurrent users at target load. |
| **NFR-3** | Availability | Core services shall maintain 99.9% uptime. |
| **NFR-4** | Security | The system shall comply with OWASP Top 10 guidance; data shall be encrypted at rest and in transit; RBAC enforced at the API layer. |
| **NFR-5** | Maintainability | The codebase shall remain modular and domain-bound, with test coverage of at least 80% on critical modules. |
| **NFR-6** | Observability | The system shall provide centralized logging, metrics, and distributed tracing across all services. |
| **NFR-7** | Portability | All services shall be containerized and deployable across supported environments without code modification. |
| **NFR-8** | Compliance | The system shall follow GDPR-aligned data handling practices for user PII, with configurable retention policies. |
| **NFR-9** | Usability | Core user flows shall comply with WCAG 2.1 AA accessibility standards. |
| **NFR-10** | Auditability | The system shall maintain a full audit trail for admin/dealer actions affecting users, listings, and transactions. |

---

## 9. Use Cases

### UC-1: Predict Car Price
- **Actor:** Buyer, Dealer
- **Preconditions:** User has provided vehicle attributes (make, model, year, mileage, condition, location).
- **Main Flow:** User submits vehicle details → system invokes the Price Prediction inference service → system returns predicted price range with confidence score.
- **Postconditions:** Prediction result is displayed and optionally logged for analytics.
- **Alternate Flow:** If the inference service is unavailable, the system falls back to a cached or rule-based estimate.

### UC-2: Receive Car Recommendations
- **Actor:** Buyer
- **Preconditions:** User is logged in or has provided preference data.
- **Main Flow:** User requests recommendations → system aggregates preference and behavioral signals → recommendation inference service returns ranked results → system displays results.
- **Postconditions:** Recommendations are displayed and interaction is logged for future personalization.

### UC-3: Compare Vehicles
- **Actor:** Buyer
- **Preconditions:** At least two listings exist.
- **Main Flow:** User selects 2–4 vehicles → system retrieves specifications, pricing, and reviews → system renders a side-by-side comparison view.
- **Postconditions:** User may share the comparison via a generated link.

### UC-4: Book a Rental
- **Actor:** Renter
- **Preconditions:** User is logged in; a rental vehicle is available for the selected dates.
- **Main Flow:** User searches rentals → selects a vehicle and date range → system confirms availability and price → user confirms booking → system creates the booking and triggers confirmation notifications.
- **Postconditions:** Booking is recorded; Email/WhatsApp confirmation is sent.
- **Alternate Flow:** If the vehicle becomes unavailable before confirmation, the system notifies the user and suggests alternatives.

### UC-5: Manage Dealer Listings
- **Actor:** Dealer
- **Preconditions:** Dealer account is verified.
- **Main Flow:** Dealer creates/edits a listing (individually or via bulk upload) → system validates and publishes the listing → listing becomes searchable.
- **Postconditions:** Listing appears in search results and is available for buyer inquiries.

### UC-6: Respond to a Lead
- **Actor:** Dealer
- **Preconditions:** A buyer inquiry (lead) exists for a dealer's listing.
- **Main Flow:** Dealer views the lead in the dealer dashboard → dealer responds → system logs the interaction and updates lead status.
- **Postconditions:** Lead status and dealer analytics are updated.

### UC-7: Moderate Content
- **Actor:** Admin, Support Agent
- **Preconditions:** A review or listing has been flagged (automatically or by a user).
- **Main Flow:** Admin/Support Agent reviews flagged content → approves, edits, or removes content → system updates content status and logs the action.
- **Postconditions:** Moderation action is recorded in the audit trail.

### UC-8: Submit a Review
- **Actor:** Buyer
- **Preconditions:** User has interacted with a vehicle or dealer.
- **Main Flow:** User submits a rating and comment → system runs auto-flagging checks → review is published or routed for manual moderation.
- **Postconditions:** Review is visible on the relevant vehicle/dealer page (if approved).

### UC-9: Receive Automated Notification
- **Actor:** Buyer, Dealer; System Actor: Notification Provider
- **Preconditions:** A triggering event has occurred (e.g., booking confirmed, price drop on wishlist item).
- **Main Flow:** System publishes an event → Notification module consumes the event → Email/WhatsApp message is generated and dispatched via provider.
- **Postconditions:** Notification delivery status is logged.

---

## 10. System Constraints

- The system must be developed strictly within the existing project structure: `apps/web-client`, `backend`, `ml`, `database`, `docs`, `infra` — no new frontend, backend, or parallel project may be introduced.
- The mandated technology stack (Next.js, React, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, SQLAlchemy, Supabase) must be used exclusively, per `docs/PROJECT_RULES.md`.
- The backend must remain organized as domain-bound modules within the modular monolith; no bypassing of established module boundaries.
- ML inference must be served via dedicated, independently deployable services, decoupled from core application deployment cycles.
- All configuration and secrets must be externalized via environment variables — no hardcoded values.
- The system must operate within the constraints of third-party Email and WhatsApp Business API providers (rate limits, delivery guarantees, policy compliance).

---

## 11. Assumptions

- Reliable historical vehicle pricing and market data will be available and continuously updated to support ML model training.
- Dealers will be onboarded through a verification process that ensures listing data quality.
- Users will have access to modern web browsers supporting responsive, JavaScript-driven applications.
- Supabase will be used as the managed backend platform for authentication and/or storage integration as applicable.
- Third-party Email and WhatsApp Business API providers will maintain sufficient uptime and delivery reliability for automation features.
- Infrastructure will be containerized and deployed consistently across development, staging, and production environments.

---

## 12. Acceptance Criteria

- **AC-1:** All Functional Requirements (FR-1 through FR-34) are implemented, testable, and verified through unit, integration, and end-to-end tests.
- **AC-2:** All Non-Functional Requirements (NFR-1 through NFR-10) are measured and meet or exceed defined thresholds prior to production release.
- **AC-3:** All defined Use Cases (UC-1 through UC-9) execute successfully through their main flow, with alternate/error flows handled gracefully.
- **AC-4:** The system passes OWASP Top 10 security review and penetration testing prior to production launch.
- **AC-5:** Core user flows (search, comparison, booking, dealer listing management) pass WCAG 2.1 AA accessibility checks.
- **AC-6:** Price Prediction and Recommendation models meet pre-defined offline evaluation thresholds (e.g., MAE/RMSE, precision/recall) before production deployment.
- **AC-7:** All API endpoints are documented via OpenAPI/Swagger and validated through contract tests.
- **AC-8:** The system maintains 99.9% uptime and defined p95 latency targets under simulated peak load testing.
- **AC-9:** All privileged actions (admin/dealer) are captured in an immutable audit log.

---

## 13. Future Enhancements

- Native mobile applications (iOS and Android) with push notification support.
- In-app secure payment gateway and financing workflow integration.
- Insurance and financing marketplace integrations.
- Multi-language and multi-currency support for regional/international expansion.
- Advanced conversational AI assistant for natural-language search and negotiation support.
- Computer-vision-based vehicle condition assessment from user-uploaded photos/video.
- Blockchain-based vehicle history and ownership verification (exploratory).
- Dealer subscription tiers with premium analytics and lead prioritization.
- Predictive maintenance recommendations based on post-purchase usage data.
- Expansion into adjacent verticals (motorcycles, commercial vehicles).

---

*End of Document.*