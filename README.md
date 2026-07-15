# AutoVerse AI

AI-Powered Automotive Intelligence Platform.

> This repository contains the **base project skeleton** for AutoVerse AI, established per `docs/PROJECT_RULES.md` and `docs/Architecture.md`. It defines the structural foundation only — application logic, APIs, UI, and ML models are implemented in subsequent development phases within this same structure.

## Repository Structure

```
autoverse-ai/
├── apps/
│   └── web-client/          # Next.js + React + TypeScript + Tailwind frontend
├── backend/                  # FastAPI modular backend (auth, listings, search, pricing, etc.)
├── ml/                       # Machine Learning training pipelines and inference services
│   ├── price-prediction/
│   └── recommendation-engine/
├── database/                 # Migrations and seed data
├── tests/                    # unit / integration / e2e tests
├── infra/                    # Deployment, environments, monitoring configuration
├── docs/                     # Project documentation (PRD, SRS, Architecture, API, etc.)
├── .github/workflows/        # CI pipelines
├── docker-compose.yml
├── package.json
├── requirements.txt
└── PROJECT_RULES.md
```

## Technology Stack (Mandatory — see `docs/PROJECT_RULES.md`)

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** FastAPI, SQLAlchemy
- **Database:** PostgreSQL (via Supabase)
- **Auth/BaaS:** Supabase

## Getting Started

### Prerequisites
- Node.js (LTS)
- Python 3.11+
- Docker & Docker Compose

### Environment Setup
1. Copy environment example files and fill in real values:
   - `apps/web-client/.env.example` → `apps/web-client/.env.local`
   - `backend/.env.example` → `backend/.env`
2. Install dependencies:
   - Frontend: `npm install` (from `apps/web-client`)
   - Backend: `pip install -r backend/requirements.txt`
3. Run locally via Docker Compose:
   ```
   docker compose up --build
   ```

## Development Rules

All contributors **must** read [`PROJECT_RULES.md`](./PROJECT_RULES.md) before starting any development session. These rules are mandatory and take precedence over ad-hoc instructions.

## Documentation

Full project documentation is available under [`docs/`](./docs), including Vision, PRD, SRS, Architecture, API Design, Database Design, Deployment, and the Development Roadmap.

## Status

🚧 **Skeleton phase.** Business logic, authentication, APIs, ML models, and UI are not yet implemented. This structure is the approved foundation for all future development.
