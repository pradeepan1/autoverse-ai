a# AutoVerse AI — API Design Documentation

**Document Owner:** Engineering / Backend Architecture
**Project:** AutoVerse AI — AI-Powered Automotive Intelligence Platform
**Base Path:** `/api/v1`
**Status:** Active
**Location:** `docs/API.md`

> This document specifies the complete REST API contract for AutoVerse AI. It is a design specification only — no implementation code is included. Endpoints map directly to the backend modules defined in `docs/Architecture.md` (`backend/app/modules/<module>/routes/`).

---

## Table of Contents

1. API Conventions
2. Authentication Headers
3. Request Format
4. Response Format
5. Status Codes
6. Pagination
7. Filtering
8. Sorting
9. Error Responses
10. Authentication API
11. Brands API
12. Models API
13. Cars (Listings) API
14. Predictions API
15. Recommendations API
16. Compare API
17. Rental API
18. Wishlist API
19. Reviews API
20. Notifications API
21. Analytics API
22. Admin API

---

## 1. API Conventions

- All endpoints are prefixed with `/api/v1` — versioned, backward-compatible evolution per `docs/Architecture.md`.
- Resource-oriented, noun-based, plural endpoint naming (e.g., `/cars`, `/brands`).
- All request/response bodies use `application/json`.
- All timestamps are ISO 8601, UTC (e.g., `2026-07-15T10:30:00Z`).
- All monetary values are returned as numeric strings with two decimal places to avoid floating-point precision issues (e.g., `"price": "1250000.00"`).
- Idempotency keys (`Idempotency-Key` header) are required on state-mutating endpoints prone to retries (e.g., booking creation).
- Endpoints are owned by exactly one backend module — no cross-module endpoint logic.

---

## 2. Authentication Headers

All authenticated endpoints require a bearer token issued by the Authentication API.

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

| Header | Required | Description |
|---|---|---|
| `Authorization` | Yes (for protected routes) | `Bearer <JWT access token>` |
| `Content-Type` | Yes (for request bodies) | `application/json` |
| `Idempotency-Key` | Conditional | Required on booking/payment-adjacent mutating endpoints |
| `X-Request-Id` | Optional | Client-supplied correlation ID; echoed back and propagated through logs |

Unauthenticated requests to protected endpoints receive `401 Unauthorized`. Requests with a valid token but insufficient role/permission receive `403 Forbidden`.

---

## 3. Request Format

- **GET** requests pass parameters via query string (filtering, pagination, sorting — see Sections 6–8).
- **POST / PATCH / PUT** requests pass a JSON body.
- **DELETE** requests typically require no body; resource identifier is in the path.

Example request body (`POST /rentals/bookings`):

```json
{
  "listing_id": "b3f1a2c4-1234-4a5b-9abc-1234567890ab",
  "start_date": "2026-08-01",
  "end_date": "2026-08-05"
}
```

---

## 4. Response Format

All responses use a standardized envelope.

**Success:**
```json
{
  "success": true,
  "data": { },
  "meta": { }
}
```

**Collection success (with pagination):**
```json
{
  "success": true,
  "data": [ ],
  "meta": {
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total_items": 143,
      "total_pages": 8
    }
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The 'email' field is required.",
    "details": [
      { "field": "email", "issue": "required" }
    ]
  }
}
```

---

## 5. Status Codes

| Code | Meaning | Usage |
|---|---|---|
| `200 OK` | Success | Successful GET, PATCH, or action endpoint |
| `201 Created` | Resource created | Successful POST creating a new resource |
| `204 No Content` | Success, no body | Successful DELETE |
| `400 Bad Request` | Malformed request | Invalid JSON, missing required fields |
| `401 Unauthorized` | Missing/invalid auth | No token or expired token |
| `403 Forbidden` | Insufficient permission | Valid token, wrong role/ownership |
| `404 Not Found` | Resource does not exist | Invalid ID or soft-deleted resource |
| `409 Conflict` | State conflict | Duplicate resource, booking overlap |
| `422 Unprocessable Entity` | Semantic validation failure | Valid JSON, invalid business rule (e.g., `end_date` before `start_date`) |
| `429 Too Many Requests` | Rate limit exceeded | Throttling triggered |
| `500 Internal Server Error` | Unexpected server error | Logged and alerted; generic message returned to client |
| `503 Service Unavailable` | Dependency unavailable | ML inference service or downstream dependency down |

---

## 6. Pagination

Cursor-based pagination is preferred for high-volume list endpoints; page-based pagination is used where total counts are useful to the UI (e.g., admin tables).

**Query parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | 1 | Page number (page-based endpoints) |
| `page_size` | integer | 20 (max 100) | Items per page |
| `cursor` | string | null | Opaque cursor (cursor-based endpoints, e.g., `/cars`) |
| `limit` | integer | 20 (max 100) | Items per page (cursor-based endpoints) |

**Cursor-based response meta:**
```json
"meta": {
  "pagination": {
    "next_cursor": "eyJpZCI6ICJhYmMxMjMifQ==",
    "has_more": true,
    "limit": 20
  }
}
```

---

## 7. Filtering

Filters are passed as query parameters. Multi-value filters accept comma-separated values.

**Example — `GET /cars`:**

| Parameter | Example | Description |
|---|---|---|
| `brand` | `brand=Toyota,Honda` | Filter by one or more brands |
| `model` | `model=Corolla` | Filter by model name |
| `fuel_type` | `fuel_type=petrol,hybrid` | Filter by fuel type |
| `transmission` | `transmission=automatic` | Filter by transmission |
| `min_price` / `max_price` | `min_price=500000&max_price=1500000` | Price range |
| `min_year` / `max_year` | `min_year=2020` | Manufacture year range |
| `condition` | `condition=used` | New / used / certified pre-owned |
| `location` | `location=Bengaluru` | Filter by city/region |
| `status` | `status=published` | Listing status (admin/dealer views only) |

---

## 8. Sorting

**Query parameter:** `sort`

Format: `sort=<field>` for ascending, `sort=-<field>` for descending. Multiple fields comma-separated (applied in order).

**Example:** `GET /cars?sort=-created_at,price`

| Supported Fields (Cars) | Notes |
|---|---|
| `price` | Ascending/descending |
| `created_at` | Newest/oldest first (default: `-created_at`) |
| `manufacture_year` | Ascending/descending |
| `mileage_km` | Ascending/descending |

---

## 9. Error Responses

All errors follow the standard error envelope (Section 4). Error codes are stable, machine-readable identifiers.

| Error Code | HTTP Status | Description |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body/query failed schema validation |
| `AUTHENTICATION_REQUIRED` | 401 | No or invalid access token |
| `TOKEN_EXPIRED` | 401 | Access token expired; client should refresh |
| `PERMISSION_DENIED` | 403 | Authenticated but not authorized for this action |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource does not exist |
| `DUPLICATE_RESOURCE` | 409 | Resource already exists (e.g., duplicate wishlist entry) |
| `BOOKING_CONFLICT` | 409 | Requested rental dates overlap an existing booking |
| `BUSINESS_RULE_VIOLATION` | 422 | Request is well-formed but violates a business rule |
| `RATE_LIMITED` | 429 | Too many requests in the current window |
| `DEPENDENCY_UNAVAILABLE` | 503 | ML inference service or other downstream dependency unreachable |
| `INTERNAL_ERROR` | 500 | Unexpected server-side failure |

---

## 10. Authentication API

Owning module: `auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new user (Buyer by default) |
| POST | `/auth/login` | No | Log in with email/password, returns access + refresh tokens |
| POST | `/auth/oauth/google` | No | Log in/register via Google OAuth |
| POST | `/auth/refresh` | No (refresh token in body) | Exchange a valid refresh token for a new access token |
| POST | `/auth/logout` | Yes | Invalidate current refresh token |
| POST | `/auth/verify-email` | No | Verify email using a token sent via Email Automation |
| POST | `/auth/forgot-password` | No | Trigger password reset email |
| POST | `/auth/reset-password` | No | Reset password using a valid reset token |
| GET | `/auth/me` | Yes | Get the authenticated user's profile |

**Example — `POST /auth/login` request:**
```json
{
  "email": "priya@example.com",
  "password": "••••••••"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOi...",
    "refresh_token": "eyJhbGciOi...",
    "user": {
      "id": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
      "full_name": "Priya Sharma",
      "email": "priya@example.com",
      "role": "buyer"
    }
  }
}
```

---

## 11. Brands API

Owning module: `listings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/brands` | No | List all brands (paginated, filterable by `name`) |
| GET | `/brands/{brandId}` | No | Get a single brand's details |
| POST | `/brands` | Yes (Admin) | Create a new brand |
| PATCH | `/brands/{brandId}` | Yes (Admin) | Update a brand |
| DELETE | `/brands/{brandId}` | Yes (Admin) | Remove a brand (blocked if models reference it) |

---

## 12. Models API

Owning module: `listings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/brands/{brandId}/models` | No | List all models under a brand |
| GET | `/models/{modelId}` | No | Get a single model's details, including variants |
| GET | `/models/{modelId}/variants` | No | List all variants for a model |
| POST | `/models` | Yes (Admin) | Create a new model |
| PATCH | `/models/{modelId}` | Yes (Admin) | Update a model |
| DELETE | `/models/{modelId}` | Yes (Admin) | Remove a model (blocked if variants/listings reference it) |
| POST | `/variants` | Yes (Admin) | Create a new variant |
| PATCH | `/variants/{variantId}` | Yes (Admin) | Update a variant |
| DELETE | `/variants/{variantId}` | Yes (Admin) | Remove a variant (blocked if listings reference it) |

---

## 13. Cars (Listings) API

Owning module: `listings` (search-optimized queries delegate to the `search` module internally)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/cars` | No | Search/list published listings (filtering, sorting, pagination per Sections 6–8) |
| GET | `/cars/{carId}` | No | Get full listing detail (brand, model, variant, images, aggregate rating) |
| POST | `/cars` | Yes (Dealer) | Create a new listing |
| PATCH | `/cars/{carId}` | Yes (Dealer — owner only) | Update a listing |
| DELETE | `/cars/{carId}` | Yes (Dealer — owner only) | Soft-delete a listing |
| POST | `/cars/bulk-upload` | Yes (Dealer) | Bulk upload listings via file import |
| GET | `/cars/{carId}/images` | No | List images for a listing |
| POST | `/cars/{carId}/images` | Yes (Dealer — owner only) | Add image(s) to a listing |
| DELETE | `/cars/{carId}/images/{imageId}` | Yes (Dealer — owner only) | Remove an image |
| GET | `/cars/{carId}/similar` | No | Get "similar cars" (delegates to Recommendations API internally) |

**Example — `GET /cars?brand=Toyota&min_price=800000&max_price=1500000&sort=-created_at&page=1&page_size=20`**

Response (`200 OK`):
```json
{
  "success": true,
  "data": [
    {
      "id": "b3f1a2c4-1234-4a5b-9abc-1234567890ab",
      "brand": "Toyota",
      "model": "Corolla",
      "variant": "Altis",
      "manufacture_year": 2022,
      "price": "1250000.00",
      "mileage_km": 18000,
      "condition": "used",
      "location": "Bengaluru",
      "status": "published",
      "thumbnail_url": "https://cdn.autoverse.ai/listings/abc.jpg"
    }
  ],
  "meta": {
    "pagination": { "page": 1, "page_size": 20, "total_items": 34, "total_pages": 2 }
  }
}
```

---

## 14. Predictions API

Owning module: `pricing` (delegates inference to `ml/price-prediction/inference-service`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/predictions` | Optional (anonymous allowed, rate-limited) | Submit vehicle attributes and receive a predicted price range |
| GET | `/predictions/{predictionId}` | Yes | Retrieve a previously generated prediction |
| GET | `/cars/{carId}/predictions/history` | Yes (Dealer — owner, or Admin) | Historical price trend for a specific listing |

**Example — `POST /predictions` request:**
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "variant": "Altis",
  "manufacture_year": 2022,
  "mileage_km": 18000,
  "condition": "used",
  "location": "Bengaluru"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "predicted_price": "1235000.00",
    "confidence_score": 0.87,
    "model_version": "price-model-v2.1.0",
    "price_range": { "low": "1180000.00", "high": "1290000.00" }
  }
}
```

---

## 15. Recommendations API

Owning module: `recommendation` (delegates inference to `ml/recommendation-engine/inference-service`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/recommendations` | Yes | Get personalized recommendations for the authenticated user |
| GET | `/recommendations/cold-start` | No | Get preference-questionnaire-driven or popularity-based recommendations for guests/new users |
| POST | `/recommendations/preferences` | Yes | Submit/update explicit preferences (budget, body type, fuel type, usage) used for recommendations |
| GET | `/cars/{carId}/similar` | No | Get similar-cars recommendations for a specific listing (see Section 13) |

---

## 16. Compare API

Owning module: `listings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/compare` | No | Submit 2–4 listing IDs, receive a structured side-by-side comparison payload |
| GET | `/compare/{compareId}` | No | Retrieve a previously generated, shareable comparison result |

**Example — `POST /compare` request:**
```json
{
  "listing_ids": [
    "b3f1a2c4-1234-4a5b-9abc-1234567890ab",
    "c4a2b3d5-2345-5b6c-0bcd-2345678901bc"
  ]
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "compare_id": "d5e3f4g6-3456-6c7d-1cde-3456789012cd",
    "share_url": "https://autoverse.ai/compare/d5e3f4g6",
    "listings": [ ]
  }
}
```

---

## 17. Rental API

Owning module: `rentals`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/rentals/search` | No | Search rental-available vehicles by location, date range, category |
| GET | `/rentals/availability` | No | Check availability for a specific listing and date range |
| POST | `/rentals/bookings` | Yes | Create a rental booking (requires `Idempotency-Key`) |
| GET | `/rentals/bookings` | Yes | List the authenticated user's bookings |
| GET | `/rentals/bookings/{bookingId}` | Yes (owner or Admin) | Get booking details |
| PATCH | `/rentals/bookings/{bookingId}` | Yes (owner) | Modify a booking (dates, if permitted) |
| POST | `/rentals/bookings/{bookingId}/cancel` | Yes (owner) | Cancel a booking |

**Example — `POST /rentals/bookings` request:**
```json
{
  "listing_id": "b3f1a2c4-1234-4a5b-9abc-1234567890ab",
  "start_date": "2026-08-01",
  "end_date": "2026-08-05"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "id": "e6f4g5h7-4567-7d8e-2def-4567890123de",
    "listing_id": "b3f1a2c4-1234-4a5b-9abc-1234567890ab",
    "start_date": "2026-08-01",
    "end_date": "2026-08-05",
    "total_price": "8000.00",
    "status": "confirmed"
  }
}
```

**Conflict response (`409 Conflict`):**
```json
{
  "success": false,
  "error": {
    "code": "BOOKING_CONFLICT",
    "message": "The selected vehicle is not available for the requested dates."
  }
}
```

---

## 18. Wishlist API

Owning module: `wishlist`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/wishlist` | Yes | List the authenticated user's wishlisted listings |
| POST | `/wishlist` | Yes | Add a listing to the wishlist |
| DELETE | `/wishlist/{listingId}` | Yes | Remove a listing from the wishlist |

**Example — `POST /wishlist` request:**
```json
{ "listing_id": "b3f1a2c4-1234-4a5b-9abc-1234567890ab" }
```

**Duplicate response (`409 Conflict`):**
```json
{
  "success": false,
  "error": { "code": "DUPLICATE_RESOURCE", "message": "This listing is already in your wishlist." }
}
```

---

## 19. Reviews API

Owning module: `reviews`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/reviews` | No | List reviews, filterable by `target_type` and `target_id` |
| POST | `/reviews` | Yes | Submit a review for a listing or dealer |
| PATCH | `/reviews/{reviewId}` | Yes (owner) | Edit own review (while `pending`) |
| DELETE | `/reviews/{reviewId}` | Yes (owner or Admin) | Remove a review |
| POST | `/reviews/{reviewId}/flag` | Yes | Flag a review for moderation |

---

## 20. Notifications API

Owning module: `notifications`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/notifications` | Yes | List the authenticated user's notification history |
| GET | `/notifications/{notificationId}` | Yes (owner) | Get a single notification's delivery status |
| POST | `/notifications/preferences` | Yes | Update channel opt-in/opt-out preferences (email/WhatsApp, marketing vs transactional) |
| POST | `/notifications/webhooks/email` | No (provider-signed) | Inbound delivery-status webhook from Email provider |
| POST | `/notifications/webhooks/whatsapp` | No (provider-signed) | Inbound delivery-status/message webhook from WhatsApp provider |

---

## 21. Analytics API

Owning module: `analytics`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/analytics/events` | Optional (anonymous allowed) | Ingest a client-side behavioral event |
| GET | `/analytics/dealer/{dealerId}` | Yes (Dealer — owner, or Admin) | Dealer performance analytics (views, leads, conversion) |
| GET | `/analytics/platform` | Yes (Admin) | Platform-wide KPI dashboard data |
| GET | `/analytics/reports` | Yes (Admin) | Generate/export analytics reports |

---

## 22. Admin API

Owning module: `admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/users` | Yes (Admin) | List/search all users |
| PATCH | `/admin/users/{userId}` | Yes (Admin) | Update a user's role/status |
| GET | `/admin/dealers` | Yes (Admin) | List/search all dealers |
| PATCH | `/admin/dealers/{dealerId}/verify` | Yes (Admin) | Approve/reject dealer verification |
| GET | `/admin/listings` | Yes (Admin) | List/search all listings, including unpublished |
| PATCH | `/admin/listings/{listingId}/moderate` | Yes (Admin) | Moderate (approve/remove/archive) a listing |
| GET | `/admin/reviews/flagged` | Yes (Admin) | List flagged reviews pending moderation |
| PATCH | `/admin/reviews/{reviewId}/moderate` | Yes (Admin) | Approve/reject a flagged review |
| GET | `/admin/logs` | Yes (Super Admin) | Query admin action logs |
| GET | `/admin/system-logs` | Yes (Super Admin) | Query application-level system logs |

---

## 23. Search API

Owning module: `search`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/search` | No | Advanced search and smart filtering for cars |
| GET | `/search/suggestions` | No | Get autocomplete search suggestions |
| GET | `/search/popular` | No | Get popular search queries |

**Example — `GET /search?q=Tesla&brand=Tesla&min_price=50000`**

Response (`200 OK`):
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "b3f1a2c4-1234-4a5b-9abc-1234567890ab",
        "brand": "Tesla",
        "model": "Model S",
        "price": "75000.00"
      }
    ],
    "total": 1,
    "skip": 0,
    "limit": 20
  }
}
```

---

*End of Document.*