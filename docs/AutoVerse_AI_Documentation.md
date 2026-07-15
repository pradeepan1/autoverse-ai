# AutoVerse AI — Project Documentation

**Document Type:** Master Project Documentation
**Project Name:** AutoVerse AI — AI-Powered Automotive Intelligence Platform
**Prepared For:** Engineering, Product, QA, DevOps, and Stakeholder Teams
**Classification:** Internal — Enterprise Reference Document

---

## Table of Contents

1. Project Vision
2. Problem Statement
3. Objectives
4. Scope
5. Functional Requirements
6. Non-Functional Requirements
7. User Personas
8. User Roles
9. User Journey
10. Software Architecture
11. Frontend Architecture
12. Backend Architecture
13. Machine Learning Architecture
14. Deployment Architecture
15. Security Architecture
16. Folder Structure
17. Database Design
18. API Design
19. Coding Standards
20. Naming Convention
21. Git Strategy
22. Testing Strategy
23. Logging Strategy
24. Error Handling Strategy
25. Scalability Plan
26. Performance Optimization Plan
27. Future Enhancements
28. Complete Development Roadmap

---

## 1. Project Vision

AutoVerse AI aims to become the leading AI-driven automotive intelligence ecosystem — a single platform where car buyers, sellers, dealers, and renters can make faster, smarter, and more transparent decisions using data-driven intelligence.

The platform envisions a future where:

- Car valuation is instant, transparent, and backed by real market data and machine learning models rather than guesswork.
- Buyers receive personalized car recommendations based on their needs, budget, and behavior rather than generic listings.
- Dealers operate with intelligent tools that reduce manual overhead and improve lead conversion.
- Every stakeholder — buyer, seller, dealer, or admin — interacts with a unified, secure, and scalable digital experience across web and communication channels (email, WhatsApp).

AutoVerse AI is designed from day one as a **production-grade, enterprise-scale system** — built for reliability, extensibility, and long-term maintainability rather than as a prototype or MVP throwaway.

---

## 2. Problem Statement

The automotive marketplace today is fragmented and inefficient:

- **Pricing opacity:** Buyers and sellers lack reliable, data-backed price estimation, leading to mistrust and inefficient negotiations.
- **Generic recommendations:** Most platforms rely on simple filters instead of intelligent, personalized recommendations that understand user intent and behavior.
- **Fragmented comparison tools:** Comparing multiple vehicles across specifications, pricing, and reviews is manual and time-consuming.
- **Disconnected rental and dealer workflows:** Rental booking and dealer inventory/lead management are typically handled through disconnected, legacy, or manual systems.
- **Poor post-purchase engagement:** Communication (confirmations, reminders, offers) is often delayed or absent, especially over channels like WhatsApp that customers actively use.
- **Lack of unified analytics:** Dealers and admins lack real-time, actionable analytics dashboards to understand performance, demand trends, and inventory health.

AutoVerse AI addresses these gaps with a single, AI-augmented platform that unifies discovery, valuation, comparison, rental, dealer operations, and communication automation.

---

## 3. Objectives

1. Build a unified platform covering the full automotive customer lifecycle: discovery → comparison → valuation → purchase/rental → post-sale engagement.
2. Deliver an AI/ML-powered **Car Price Prediction** engine with measurable accuracy benchmarks.
3. Deliver an **AI Car Recommendation** engine that personalizes results using explicit preferences and implicit behavioral signals.
4. Provide dealers with a full-featured **Dealer Management** system for inventory, leads, and performance tracking.
5. Provide end users with **Dashboards**, **Wishlists**, **Reviews**, and **Search/Filter** capabilities that rival best-in-class marketplaces.
6. Automate customer communication via **Email** and **WhatsApp** for transactional and marketing use cases.
7. Ensure the platform is **secure, scalable, observable, and maintainable**, following enterprise software engineering standards.
8. Design the system so that each module (ML, backend, frontend, automation) can evolve, scale, and deploy independently.

---

## 4. Scope

### 4.1 In Scope

- Web-based platform (responsive, desktop + mobile web) for Buyers, Dealers, and Admins.
- Car Price Prediction using ML models trained on historical and market data.
- AI-driven Car Recommendation engine.
- Car Comparison tool (side-by-side, multi-vehicle).
- Car Rental booking and management workflow.
- Dealer Management portal (inventory, leads, listings, analytics).
- User Dashboard (profile, saved cars, price alerts, booking history).
- Admin Dashboard (platform-wide analytics, user/dealer management, content moderation).
- Search and Filters across all listings.
- Wishlist / Saved Vehicles.
- Reviews and Ratings (for cars and dealers).
- Authentication and Authorization (Role-Based Access Control).
- Machine Learning services (Price Prediction, Recommendation).
- Email Automation (transactional and marketing).
- WhatsApp Automation (notifications, reminders, conversational support).
- Analytics (user behavior, dealer performance, platform KPIs).

### 4.2 Out of Scope (Phase 1)

- Native mobile applications (iOS/Android) — planned as a future enhancement.
- In-app payment gateway for full vehicle purchase transactions (Phase 1 supports rental payments and lead capture only).
- Multi-language/internationalization support (planned in future phases).
- Physical vehicle inspection/logistics coordination.
- Insurance and financing marketplace integrations (future roadmap item).

---

## 5. Functional Requirements

### 5.1 Authentication & Authorization
- FR-1: Users can register/login via email-password and OAuth (Google).
- FR-2: Role-based access for Buyer, Dealer, Admin, and Support roles.
- FR-3: Secure password reset and email verification flows.
- FR-4: Session management with JWT access + refresh tokens.

### 5.2 Car Price Prediction
- FR-5: User submits vehicle attributes (make, model, year, mileage, condition, location) and receives a predicted price range with confidence score.
- FR-6: Prediction model retrains periodically using updated market data.
- FR-7: Historical price trend visualization for a given vehicle profile.

### 5.3 AI Car Recommendation
- FR-8: System recommends vehicles based on stated preferences (budget, body type, fuel type, usage).
- FR-9: System refines recommendations based on browsing/search/wishlist behavior.
- FR-10: "Similar Cars" recommendations on car detail pages.

### 5.4 Car Comparison
- FR-11: Users can select 2–4 vehicles for side-by-side spec, price, and review comparison.
- FR-12: Comparison results are shareable via link.

### 5.5 Car Rentals
- FR-13: Users can search rental vehicles by location, date range, and category.
- FR-14: Booking workflow with availability checks, pricing, and confirmation.
- FR-15: Rental history and cancellation/modification support.

### 5.6 Dealer Management
- FR-16: Dealers can create, edit, and manage vehicle listings.
- FR-17: Dealers can view and manage incoming leads/inquiries.
- FR-18: Dealer-level analytics: views, leads, conversion rate, inventory aging.
- FR-19: Bulk listing upload (CSV/Excel import).

### 5.7 User Dashboard
- FR-20: Profile management, saved searches, wishlist, price alerts, rental/booking history.

### 5.8 Admin Dashboard
- FR-21: Platform-wide user, dealer, and listing management.
- FR-22: Content moderation (flagged reviews/listings).
- FR-23: System-wide analytics and reporting.

### 5.9 Search & Filters
- FR-24: Full-text and faceted search (make, model, price range, year, fuel type, transmission, location).
- FR-25: Auto-suggest and typo-tolerant search.

### 5.10 Wishlist
- FR-26: Add/remove vehicles to a personal wishlist; receive price-drop alerts on wishlisted items.

### 5.11 Reviews
- FR-27: Users can submit ratings and reviews for vehicles and dealers.
- FR-28: Review moderation workflow (auto-flagging + manual review).

### 5.12 Analytics
- FR-29: Behavioral analytics (page views, search terms, funnel drop-offs).
- FR-30: Business analytics (top models, regional demand, conversion rates).

### 5.13 Email Automation
- FR-31: Transactional emails (welcome, verification, booking confirmation, password reset).
- FR-32: Marketing emails (price alerts, recommendations, newsletters) with opt-out support.

### 5.14 WhatsApp Automation
- FR-33: Transactional WhatsApp messages (booking confirmations, reminders).
- FR-34: Conversational support bot for FAQs and lead capture.

---

## 6. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | API p95 response time < 300ms for core endpoints; search results < 500ms. |
| **Scalability** | Horizontally scalable services supporting 100,000+ concurrent users at target load. |
| **Availability** | 99.9% uptime SLA for core services. |
| **Security** | OWASP Top 10 compliance, encrypted data at rest and in transit, RBAC enforced at API layer. |
| **Maintainability** | Modular, service-oriented codebase with documented interfaces and test coverage ≥ 80% for critical modules. |
| **Observability** | Centralized logging, metrics, and distributed tracing across all services. |
| **Portability** | Fully containerized services deployable across cloud providers (cloud-agnostic where feasible). |
| **Compliance** | GDPR-aligned data handling for user PII; configurable data retention policies. |
| **Usability** | WCAG 2.1 AA accessibility compliance for core user flows. |
| **Auditability** | Full audit trail for admin/dealer actions affecting listings, users, and transactions. |

---

## 7. User Personas

### 7.1 Priya — The First-Time Buyer
- Age 27, urban professional, buying her first car.
- Needs guidance, transparent pricing, and simple comparisons.
- Uses mobile web primarily; values trust signals (reviews, verified listings).

### 7.2 Arjun — The Value-Conscious Upgrader
- Age 38, replacing a family car.
- Compares multiple models across price, fuel economy, and resale value.
- Relies heavily on price prediction and comparison tools before negotiating with dealers.

### 7.3 Meera — The Independent Dealer
- Runs a mid-sized used-car dealership.
- Needs efficient listing management, lead visibility, and performance analytics.
- Time-constrained; prefers WhatsApp notifications over email.

### 7.4 Rahul — The Frequent Renter
- Business traveler renting vehicles across cities.
- Needs fast search, transparent pricing, and reliable booking confirmations.

### 7.5 Ananya — The Platform Admin
- Manages platform integrity: moderates reviews/listings, monitors analytics, handles escalations.
- Needs a comprehensive, efficient admin dashboard with drill-down reporting.

---

## 8. User Roles

| Role | Description | Key Permissions |
|---|---|---|
| **Guest** | Unauthenticated visitor | Browse listings, view public content, limited search |
| **Buyer (Registered User)** | Standard authenticated end user | Search, wishlist, reviews, price prediction, recommendations, rentals, dashboard |
| **Dealer** | Verified business account | Manage listings, leads, dealer analytics, respond to reviews |
| **Support Agent** | Internal customer support staff | View user/dealer issues, respond to tickets, limited moderation |
| **Admin** | Platform administrator | Full platform management, user/dealer management, analytics, moderation, configuration |
| **Super Admin** | Highest-privilege internal role | System configuration, role management, security settings, audit logs |

Role-Based Access Control (RBAC) governs all API and UI-level permissions, with permissions defined at a granular resource-action level (e.g., `listing:edit`, `review:moderate`).

---

## 9. User Journey

### 9.1 Buyer Journey
1. **Discover:** Land on homepage or via search engine → browse featured/recommended cars.
2. **Search & Filter:** Apply filters (budget, type, fuel, location) to narrow results.
3. **Evaluate:** View car detail page → check price prediction, reviews, and specs.
4. **Compare:** Add multiple cars to comparison view.
5. **Engage:** Add to wishlist, request dealer contact, or start rental booking.
6. **Convert:** Complete rental booking or submit a purchase inquiry to a dealer.
7. **Post-Interaction:** Receive confirmation via Email/WhatsApp; leave a review after interaction.
8. **Retain:** Receive price-drop alerts and personalized recommendations over time.

### 9.2 Dealer Journey
1. **Onboard:** Register as a dealer → verification workflow.
2. **List Inventory:** Add vehicles individually or via bulk upload.
3. **Manage Leads:** Receive and respond to buyer inquiries.
4. **Analyze:** Review dashboard analytics (views, leads, conversion).
5. **Optimize:** Adjust pricing/listings based on price prediction insights and demand analytics.

### 9.3 Admin Journey
1. **Monitor:** View platform-wide KPIs on the admin dashboard.
2. **Moderate:** Review flagged listings/reviews and take action.
3. **Manage:** Handle user/dealer account issues and escalations.
4. **Report:** Generate and export analytics reports for stakeholders.

---

## 10. Software Architecture

AutoVerse AI follows a **modular, service-oriented architecture (SOA)** that can evolve toward microservices as scale demands increase. Phase 1 uses a **modular monolith with clearly bounded domains**, enabling faster initial development while preserving clean extraction boundaries for future microservice decomposition.

### 10.1 High-Level Architecture Layers

1. **Client Layer** — Web application (Buyer, Dealer, Admin portals share a codebase with role-based views).
2. **API Gateway Layer** — Single entry point handling routing, authentication, rate limiting, and request validation.
3. **Application/Service Layer** — Domain-bound modules: Auth, Listings, Search, Recommendation, Pricing, Rentals, Dealers, Reviews, Wishlist, Notifications, Analytics.
4. **ML Layer** — Independently deployed ML inference services (Price Prediction, Recommendation Engine).
5. **Data Layer** — Relational database (core transactional data), search index (listings/search), cache layer, and object storage (media assets).
6. **Automation Layer** — Email and WhatsApp automation services, decoupled via message queue.
7. **Infrastructure Layer** — Containerized deployment, CI/CD, monitoring, logging, and secrets management.

### 10.2 Architectural Principles

- **Domain-driven boundaries:** Each module owns its data and exposes well-defined APIs; no cross-module direct DB access.
- **Event-driven communication:** Asynchronous events (e.g., `BookingConfirmed`, `ListingCreated`) drive notifications and analytics without tight coupling.
- **API-first design:** All modules expose versioned REST APIs consumed by the frontend and internal services alike.
- **Statelessness:** Application services are stateless; session/user state lives in the database/cache, enabling horizontal scaling.
- **Separation of ML and application logic:** ML models are served via dedicated inference services, decoupled from core business logic deployment cycles.

### 10.3 Conceptual Diagram (Textual)

```
[ Web Client (Buyer/Dealer/Admin) ]
              |
        [ API Gateway ]
              |
   -----------------------------------------------------
   |        |         |          |         |            |
 [Auth] [Listings] [Search] [Pricing ML] [Recs ML] [Rentals]
   |        |         |          |         |            |
   -----------------------------------------------------
              |
   [Message Queue / Event Bus]
        |             |
 [Email Service]  [WhatsApp Service]
              |
     [Relational DB | Search Index | Cache | Object Storage]
              |
        [Analytics Pipeline / Data Warehouse]
```

---

## 11. Frontend Architecture

### 11.1 Technology Approach
- Component-based single-page application (SPA) architecture with server-side rendering (SSR) support for SEO-critical pages (listings, car detail pages).
- Shared design system/component library across Buyer, Dealer, and Admin portals, with role-based routing and layout composition.

### 11.2 Structural Principles
- **Feature-based folder organization** (not type-based) — each feature (e.g., `car-comparison`, `rentals`, `wishlist`) is self-contained with its own components, hooks, services, and tests.
- **State management** split into:
  - Server state (API data, caching, revalidation) via a dedicated data-fetching layer.
  - Client/UI state (modals, filters, form state) via lightweight local state management.
- **Design system** with tokenized styling (colors, spacing, typography) to ensure visual consistency and easy theming.
- **Route-level code splitting** to minimize initial bundle size.
- **Accessibility-first components** (semantic HTML, ARIA labeling, keyboard navigation).

### 11.3 Cross-Cutting Concerns
- Centralized API client with interceptors for auth token refresh and error normalization.
- Global error boundary and fallback UI strategy.
- Internationalization-ready structure (even if only one locale is shipped in Phase 1).
- Analytics event instrumentation embedded at the component interaction level.

---

## 12. Backend Architecture

### 12.1 Service Decomposition (Modular Monolith → Microservices-ready)

| Module | Responsibility |
|---|---|
| **Auth Service** | Registration, login, token issuance, RBAC enforcement |
| **Listing Service** | Vehicle listing CRUD, dealer inventory |
| **Search Service** | Indexing and querying listings (search + filters) |
| **Pricing Service** | Orchestrates calls to ML Price Prediction model, caches results |
| **Recommendation Service** | Orchestrates calls to ML Recommendation model, manages personalization signals |
| **Rental Service** | Booking lifecycle, availability, pricing |
| **Dealer Service** | Dealer profile, lead management, dealer analytics |
| **Review Service** | Review/rating submission and moderation |
| **Wishlist Service** | Saved vehicles, price-drop tracking |
| **Notification Service** | Orchestrates Email + WhatsApp automation via queue consumers |
| **Analytics Service** | Event ingestion, aggregation, reporting APIs |
| **Admin Service** | Cross-cutting administrative operations |

### 12.2 Design Patterns
- **Layered architecture per service:** Controller → Service (business logic) → Repository (data access) → Database.
- **Repository pattern** to abstract persistence and enable testability.
- **CQRS-lite approach** for read-heavy modules (Search, Analytics) — separate optimized read models from transactional write models.
- **Event-driven integration** using a message broker for cross-module workflows (e.g., booking confirmation triggers notification + analytics events).
- **Circuit breaker and retry policies** for calls to ML inference services and third-party integrations (email/WhatsApp providers).

### 12.3 Communication Patterns
- **Synchronous (REST/gRPC)** for request-response operations (e.g., fetch listing details).
- **Asynchronous (message queue)** for side-effect-heavy workflows (notifications, analytics, model retraining triggers).

---

## 13. Machine Learning Architecture

### 13.1 Car Price Prediction

- **Data Sources:** Historical listing data, sales transactions, market trend feeds, vehicle depreciation data.
- **Feature Engineering:** Make/model/year, mileage, condition, location, seasonality, market demand indices.
- **Model Approach:** Ensemble regression models (e.g., gradient-boosted trees) chosen for interpretability and strong tabular performance; versioned and benchmarked against a baseline linear model.
- **Serving:** Deployed as an independent inference microservice with a versioned REST endpoint; supports A/B testing between model versions.
- **Retraining Pipeline:** Scheduled retraining pipeline ingesting fresh listing/sales data, with automated evaluation gates (accuracy/error thresholds) before promotion to production.

### 13.2 AI Car Recommendation

- **Approach:** Hybrid recommendation strategy combining:
  - **Content-based filtering** (vehicle attributes vs. stated user preferences).
  - **Collaborative filtering / behavioral signals** (search history, wishlist activity, view patterns).
- **Cold-Start Handling:** Preference-questionnaire-driven recommendations for new users; popularity/trending fallback.
- **Serving:** Dedicated recommendation inference service, with a feature store providing real-time and batch-computed user/vehicle features.

### 13.3 MLOps Practices

- Model versioning and experiment tracking for reproducibility.
- Automated evaluation pipelines (offline metrics) before deployment.
- Shadow deployment / canary rollout for new model versions.
- Model performance monitoring in production (prediction drift, latency, error rates).
- Clear separation between **training pipeline** (batch, scheduled) and **inference service** (real-time, low-latency).

---

## 14. Deployment Architecture

### 14.1 Principles
- **Containerization:** All services (application, ML inference, automation) packaged as containers for consistent, portable deployment.
- **Orchestration:** Container orchestration platform manages scaling, self-healing, and rolling deployments.
- **Environment Strategy:** Isolated environments — `Development`, `Staging`, `Production` — with environment-specific configuration via centralized config/secrets management.
- **CI/CD Pipeline:** Automated build → test → security scan → deploy pipeline triggered on merge, with manual approval gates for production releases.
- **Blue-Green / Canary Deployments:** Used for high-risk releases (ML model updates, core service changes) to minimize downtime and risk.

### 14.2 Infrastructure Components
- Load balancer / API gateway at the edge.
- Auto-scaling application service pods based on CPU/memory/request-rate thresholds.
- Managed relational database with read replicas for scaling read-heavy workloads.
- Managed search index cluster.
- Managed cache layer for session data, hot listings, and ML prediction caching.
- Object storage for images/media with CDN distribution.
- Message broker cluster for asynchronous workflows.
- Centralized logging, metrics, and tracing infrastructure.

### 14.3 Disaster Recovery
- Automated database backups with point-in-time recovery.
- Multi-zone deployment for high availability.
- Documented RTO (Recovery Time Objective) and RPO (Recovery Point Objective) targets, reviewed quarterly.

---

## 15. Security Architecture

### 15.1 Authentication & Authorization
- JWT-based access tokens (short-lived) with refresh token rotation.
- RBAC enforced at the API gateway and service layer (defense in depth).
- OAuth 2.0 support for social login.

### 15.2 Data Protection
- TLS enforced for all data in transit.
- Encryption at rest for sensitive data (PII, credentials, tokens).
- Secrets managed via a dedicated secrets manager — never hardcoded or committed to source control.
- Field-level encryption for highly sensitive data where applicable (e.g., payment-related identifiers).

### 15.3 Application Security
- Input validation and sanitization at API boundaries to prevent injection attacks.
- Rate limiting and throttling on public-facing endpoints (auth, search, prediction APIs).
- CSRF/XSS protections on all client-facing forms.
- Dependency vulnerability scanning integrated into CI/CD pipeline.
- Regular penetration testing and OWASP Top 10 audits.

### 15.4 Operational Security
- Principle of least privilege for all internal service-to-service and human access.
- Full audit logging for admin/dealer-privileged actions.
- Automated alerting on anomalous access patterns.
- Periodic access reviews and credential rotation policies.

### 15.5 Compliance
- GDPR-aligned consent management and data subject request handling (access/delete).
- Configurable data retention and deletion policies.
- Privacy-by-design applied to analytics and personalization features (anonymization/pseudonymization where feasible).

---

## 16. Folder Structure

> Structural blueprint only — no source code included, per documentation scope.

```
autoverse-ai/
├── apps/
│   ├── web-client/                # Frontend SPA (Buyer/Dealer/Admin portals)
│   └── admin-portal/              # Optional dedicated admin app (if split from web-client)
│
├── services/
│   ├── auth-service/
│   ├── listing-service/
│   ├── search-service/
│   ├── pricing-service/
│   ├── recommendation-service/
│   ├── rental-service/
│   ├── dealer-service/
│   ├── review-service/
│   ├── wishlist-service/
│   ├── notification-service/
│   │   ├── email-automation/
│   │   └── whatsapp-automation/
│   ├── analytics-service/
│   └── admin-service/
│
├── ml/
│   ├── price-prediction/
│   │   ├── training-pipeline/
│   │   └── inference-service/
│   └── recommendation-engine/
│       ├── training-pipeline/
│       └── inference-service/
│
├── shared/
│   ├── libs/                      # Shared utilities, types, constants
│   ├── design-system/             # UI component library and design tokens
│   └── config/                    # Shared configuration schemas
│
├── infra/
│   ├── ci-cd/
│   ├── kubernetes/ or orchestration configs
│   ├── monitoring/
│   └── environments/
│       ├── development/
│       ├── staging/
│       └── production/
│
├── docs/
│   ├── PRD.md
│   ├── SRS.md
│   ├── Architecture.md
│   ├── API.md
│   ├── Database.md
│   ├── Deployment.md
│   ├── Development_Roadmap.md
│   ├── PROJECT_RULES.md
│   ├── UI_UX_Guidelines.md
│   └── CHANGELOG.md
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── README.md
└── LICENSE
```

**Structural Rationale:**
- `apps/` isolates deployable frontend surfaces.
- `services/` enforces domain-bound backend boundaries, each independently deployable and testable.
- `ml/` cleanly separates training pipelines from inference services, reflecting distinct lifecycles and deployment cadences.
- `shared/` prevents duplication while avoiding tight coupling between services.
- `infra/` centralizes deployment and environment configuration for consistency across environments.

---

## 17. Database Design

### 17.1 Data Storage Strategy
- **Primary relational database** for transactional, structured data (users, listings, bookings, dealers, reviews).
- **Search index** (denormalized, optimized for full-text and faceted queries) synchronized from the primary database via events.
- **Cache layer** for session data, frequently accessed listings, and ML prediction results.
- **Object storage** for vehicle images and media assets, referenced by URL from the relational database.
- **Analytics data store / warehouse** for aggregated event and reporting data, decoupled from transactional workloads.

### 17.2 Core Entities (Conceptual)

| Entity | Key Attributes | Relationships |
|---|---|---|
| **User** | id, name, email, password_hash, role, created_at | Has many: Wishlists, Reviews, Bookings |
| **Dealer** | id, business_name, verification_status, user_id | Belongs to User; Has many: Listings |
| **Listing (Car)** | id, dealer_id, make, model, year, price, mileage, condition, location, status | Belongs to Dealer; Has many: Reviews, Images |
| **PricePrediction** | id, listing_id or query_hash, predicted_price, confidence, model_version, created_at | Belongs to Listing (optional) |
| **Recommendation** | id, user_id, listing_id, score, generated_at | Belongs to User, Listing |
| **Wishlist** | id, user_id, listing_id, created_at | Belongs to User, Listing |
| **Review** | id, user_id, target_type (car/dealer), target_id, rating, comment, status | Belongs to User |
| **Booking (Rental)** | id, user_id, vehicle_id, start_date, end_date, status, price | Belongs to User, Listing |
| **Lead** | id, dealer_id, user_id, listing_id, status, created_at | Belongs to Dealer, User, Listing |
| **Notification** | id, user_id, channel (email/whatsapp), type, status, sent_at | Belongs to User |
| **AnalyticsEvent** | id, event_type, user_id (nullable), payload, timestamp | Referenced by User (optional) |

### 17.3 Design Principles
- **Normalization** for transactional entities (up to 3NF) to maintain data integrity.
- **Denormalized read models** maintained separately for search and analytics to optimize read performance without compromising transactional integrity.
- **Soft deletes** for user-facing entities (listings, reviews) to preserve audit history and support moderation workflows.
- **Indexing strategy** on high-cardinality query fields (location, price range, make/model) to support fast filtering.
- **Referential integrity** enforced at the database level for core relationships; eventual consistency accepted for analytics/search projections.

---

## 18. API Design

### 18.1 Design Principles
- RESTful, resource-oriented API design with consistent noun-based endpoint naming.
- **Versioning:** URI-based versioning (e.g., `/api/v1/...`) to support backward-compatible evolution.
- **Consistent response envelope:** Standardized success/error response structure across all endpoints.
- **Pagination:** Cursor-based pagination for high-volume list endpoints (listings, search results).
- **Idempotency:** Idempotency keys supported on state-mutating endpoints prone to retries (bookings, payments).
- **HATEOAS-lite:** Related resource links included where useful for client navigation (optional, not mandatory).

### 18.2 Representative Endpoint Groups (Conceptual — No Implementation)

| Domain | Example Endpoints (Conceptual) |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh` |
| Listings | `GET /listings`, `GET /listings/{id}`, `POST /listings`, `PATCH /listings/{id}` |
| Search | `GET /search?query=&filters=` |
| Pricing | `POST /pricing/predict` |
| Recommendations | `GET /recommendations/{userId}` |
| Rentals | `GET /rentals/availability`, `POST /rentals/bookings` |
| Dealers | `GET /dealers/{id}/leads`, `GET /dealers/{id}/analytics` |
| Reviews | `POST /reviews`, `GET /reviews?targetId=` |
| Wishlist | `POST /wishlist`, `DELETE /wishlist/{id}` |
| Admin | `GET /admin/users`, `PATCH /admin/listings/{id}/moderate` |

### 18.3 API Governance
- OpenAPI/Swagger specification maintained as the single source of truth per service.
- Contract testing between frontend and backend to prevent breaking changes.
- Rate limiting policies defined per endpoint category (public, authenticated, admin).
- Deprecation policy: minimum notice period and dual-version support window before retiring an API version.

---

## 19. Coding Standards

- **Consistency over cleverness:** Code should be readable and predictable; avoid unnecessary abstraction or premature optimization.
- **Single Responsibility Principle** applied at function, class, and module levels.
- **DRY with judgment:** Shared logic extracted into common libraries; avoid over-abstracting incidental duplication.
- **Explicit error handling:** No silent failures; all error paths must be handled or explicitly propagated.
- **Type safety:** Strong typing enforced across frontend and backend codebases wherever the language/tooling supports it.
- **Code documentation:** Public interfaces (APIs, shared functions, ML model interfaces) must include docstrings/comments describing purpose, inputs, and outputs.
- **Linting & formatting:** Automated linters and formatters enforced via pre-commit hooks and CI checks; no manual style debates.
- **Code reviews mandatory:** No code merges to main branches without at least one peer review approval.
- **No hardcoded secrets or environment-specific values** in source code — all configuration externalized.

---

## 20. Naming Convention

| Element | Convention | Example |
|---|---|---|
| **Variables/functions** | camelCase | `getUserWishlist()` |
| **Classes/Components** | PascalCase | `CarComparisonCard` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_COMPARISON_ITEMS` |
| **Database tables** | snake_case, plural | `car_listings`, `rental_bookings` |
| **Database columns** | snake_case | `created_at`, `dealer_id` |
| **API endpoints/routes** | kebab-case, plural nouns | `/car-listings`, `/rental-bookings` |
| **Files/folders** | kebab-case | `car-comparison-card.tsx` |
| **Environment variables** | UPPER_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |
| **Git branches** | type/short-description | `feature/price-prediction-api` |
| **ML model versions** | semantic versioning | `price-model-v2.1.0` |

Naming should be **descriptive over abbreviated** — favor clarity over brevity (e.g., `dealerConversionRate` over `dcr`).

---

## 21. Git Strategy

### 21.1 Branching Model
- **`main`** — always production-ready, protected branch.
- **`develop`** — integration branch for features prior to release (if release-train model is adopted).
- **`feature/*`** — individual feature branches, branched from `develop`.
- **`bugfix/*`** — non-critical bug fixes.
- **`hotfix/*`** — urgent production fixes, branched from `main` and merged back to both `main` and `develop`.
- **`release/*`** — stabilization branches prior to a production release.

### 21.2 Commit Standards
- Conventional Commits format: `type(scope): short description` (e.g., `feat(pricing): add confidence score to prediction response`).
- Types include: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`.

### 21.3 Pull Request Policy
- All changes merged via Pull Request — no direct commits to `main` or `develop`.
- Minimum one approving review required; two required for changes to shared/core modules.
- CI checks (lint, test, build, security scan) must pass before merge is allowed.
- PR descriptions must reference the related ticket/issue and summarize the change and testing performed.

### 21.4 Release Strategy
- Semantic versioning (`MAJOR.MINOR.PATCH`) for all services and the platform release as a whole.
- Tagged releases with auto-generated changelogs from commit history.

---

## 22. Testing Strategy

### 22.1 Testing Pyramid
- **Unit Tests:** Cover business logic, utility functions, and ML preprocessing/feature engineering logic. Target ≥ 80% coverage on critical modules.
- **Integration Tests:** Validate interactions between services, database, and external dependencies (search index, cache, message queue).
- **End-to-End (E2E) Tests:** Simulate full user journeys (search → compare → book/inquire) across the deployed application in a staging environment.
- **Contract Tests:** Validate API contracts between frontend and backend, and between internal services.

### 22.2 Specialized Testing
- **ML Model Testing:** Offline evaluation metrics (e.g., MAE/RMSE for price prediction, precision/recall for recommendations) validated against benchmark thresholds before deployment.
- **Load & Performance Testing:** Simulated peak traffic scenarios (search, price prediction) to validate scalability targets.
- **Security Testing:** Automated dependency scanning, periodic penetration testing, and static application security testing (SAST) in CI.
- **Accessibility Testing:** Automated + manual audits against WCAG 2.1 AA for core user flows.

### 22.3 Testing Practices
- Tests run automatically on every Pull Request via CI.
- Flaky tests tracked and quarantined, not ignored.
- Test data managed via seed scripts and isolated test environments/databases.

---

## 23. Logging Strategy

- **Structured logging** (JSON format) across all services for machine-readable log aggregation.
- **Log levels:** `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL` — consistently applied; production defaults to `INFO` and above.
- **Correlation IDs:** Every incoming request assigned a unique trace/correlation ID propagated across all downstream service calls for end-to-end traceability.
- **Centralized log aggregation:** All service logs shipped to a centralized logging platform for search, alerting, and retention.
- **PII scrubbing:** Sensitive fields (passwords, tokens, full payment identifiers) are never logged in plaintext.
- **Audit logs:** Separate, immutable audit log stream for privileged actions (admin/dealer operations, moderation actions, role changes).
- **Retention policy:** Logs retained per compliance requirements (e.g., 90 days hot storage, extended cold storage for audit logs).

---

## 24. Error Handling Strategy

### 24.1 Principles
- **Fail fast, fail clearly:** Errors are surfaced immediately with actionable context, not silently swallowed.
- **Consistent error taxonomy:** Errors categorized as `ValidationError`, `AuthenticationError`, `AuthorizationError`, `NotFoundError`, `ConflictError`, `DependencyError`, `InternalError`.
- **Standardized error response format:** All API errors return a consistent structure including error code, human-readable message, and (where safe) resolution guidance.
- **No leaking internals:** Stack traces and internal implementation details are never exposed to end users; detailed diagnostics are logged internally only.

### 24.2 Resilience Patterns
- **Retries with exponential backoff** for transient failures (network, third-party API calls).
- **Circuit breakers** around ML inference calls and third-party integrations (email/WhatsApp providers) to prevent cascading failures.
- **Graceful degradation:** If ML services (pricing/recommendation) are temporarily unavailable, the platform falls back to cached results or rule-based defaults rather than failing the entire request.
- **Dead-letter queues** for failed asynchronous jobs (notifications, analytics events), with alerting and manual/automated reprocessing.

### 24.3 User-Facing Error Handling
- Friendly, actionable error messages on the frontend, distinct from internal error codes.
- Global error boundary to prevent full application crashes from isolated component failures.

---

## 25. Scalability Plan

- **Stateless application services** enabling horizontal auto-scaling behind a load balancer.
- **Database scaling:** Read replicas for read-heavy workloads (search, listings, analytics queries); connection pooling enforced across services.
- **Caching strategy:** Multi-layer caching (CDN for static assets, application-level cache for hot listings/prediction results) to reduce database load.
- **Search index scaling:** Dedicated, independently scalable search cluster decoupled from the transactional database.
- **Asynchronous processing:** Non-critical-path workloads (notifications, analytics ingestion, model scoring for batch recommendations) processed via message queues to decouple load spikes from user-facing latency.
- **ML inference scaling:** Inference services scaled independently from core application services, with autoscaling based on request volume and latency SLOs.
- **Domain-based scaling boundaries:** Modular monolith structured so that any module (e.g., Search, Pricing) can be extracted into an independently scaled microservice as load demands increase, without a full platform rewrite.
- **Multi-region readiness:** Architecture designed to support future multi-region deployment for latency reduction and disaster recovery, even if Phase 1 launches single-region.

---

## 26. Performance Optimization Plan

- **Frontend:**
  - Route-based code splitting and lazy loading of non-critical components.
  - Image optimization and responsive image delivery via CDN.
  - Client-side caching of frequently accessed, low-volatility data (e.g., filter metadata).
- **Backend:**
  - Query optimization and indexing review as part of the standard PR checklist for database-touching changes.
  - N+1 query prevention via batching/eager-loading strategies in data access layers.
  - Response payload optimization (field selection/projection for list endpoints).
- **ML Services:**
  - Model result caching for repeated/near-identical prediction requests.
  - Batch inference for non-real-time recommendation refresh jobs.
  - Lightweight model variants considered for latency-sensitive endpoints, with heavier models reserved for asynchronous/batch use cases.
- **Infrastructure:**
  - Continuous performance monitoring (APM) with defined latency SLOs per endpoint category.
  - Regular load testing prior to major releases and seasonal traffic events.
  - Capacity planning reviews tied to growth projections.

---

## 27. Future Enhancements

- Native mobile applications (iOS and Android) with push notification support.
- In-app secure payment gateway for full vehicle purchase transactions and financing workflows.
- Insurance and financing marketplace integrations.
- Multi-language and multi-currency support for regional/international expansion.
- Advanced conversational AI assistant (beyond WhatsApp FAQ bot) for natural-language vehicle search and negotiation support.
- Computer-vision-based vehicle condition assessment from user-uploaded photos/videos.
- Blockchain-based vehicle history and ownership verification (exploratory).
- Dealer subscription tiers with premium analytics and lead prioritization features.
- Predictive maintenance recommendations based on vehicle usage data (post-purchase engagement).
- Marketplace expansion into adjacent verticals (motorcycles, commercial vehicles).

---

## 28. Complete Development Roadmap

### Phase 0 — Foundation (Weeks 1–4)
- Finalize architecture, technology stack decisions, and infrastructure setup.
- Establish CI/CD pipelines, environments (dev/staging/production), and observability foundations.
- Set up core repositories, coding standards, and Git workflows.
- Define database schema for core entities (Users, Dealers, Listings).

### Phase 1 — Core Platform MVP (Weeks 5–12)
- Implement Authentication & RBAC.
- Implement Listings (CRUD) and basic Search & Filters.
- Implement User Dashboard (basic) and Dealer Management (basic listing management).
- Implement Wishlist functionality.
- Set up baseline Admin Dashboard for user/listing oversight.

### Phase 2 — Intelligence Layer (Weeks 13–20)
- Develop and deploy Car Price Prediction model (v1) and Pricing Service.
- Develop and deploy AI Car Recommendation engine (v1).
- Implement Car Comparison feature.
- Integrate Reviews & Ratings with moderation workflow.
- Expand Search & Filters with faceted/auto-suggest capabilities.

### Phase 3 — Transactions & Automation (Weeks 21–28)
- Implement Car Rentals (search, booking, management).
- Implement Email Automation (transactional + marketing).
- Implement WhatsApp Automation (notifications + FAQ bot).
- Expand Dealer Management with lead management and dealer-level analytics.

### Phase 4 — Analytics & Optimization (Weeks 29–34)
- Build platform-wide Analytics (behavioral + business KPIs).
- Enhance Admin Dashboard with full reporting and moderation tooling.
- Conduct load testing, performance optimization, and security hardening (penetration testing).
- Refine ML models (v2) using accumulated production data.

### Phase 5 — Hardening & Production Launch (Weeks 35–38)
- Full end-to-end QA, accessibility audit, and UAT with stakeholders.
- Finalize disaster recovery, backup, and monitoring runbooks.
- Production launch with phased rollout (canary → full release).

### Phase 6 — Post-Launch Growth (Ongoing)
- Continuous model retraining and evaluation pipelines.
- Iterative feature enhancements based on analytics and user feedback.
- Planning and execution of Future Enhancements roadmap items (mobile apps, payments, financing, multi-language support).

---

*End of Document.*
