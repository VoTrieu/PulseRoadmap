# PulseRoadmap

PulseRoadmap is a full-stack B2B SaaS-style product operations platform for product teams. It helps SaaS teams collect customer feedback, triage product requests, plan roadmap work, and track feature priorities in one internal tool.

The project is being built as a portfolio-grade product engineering project with a React frontend, FastAPI backend, PostgreSQL database, typed API boundaries, reusable UI components, pagination, filtering, and internationalization.

## Screenshots

### Dashboard

![Dashboard](docs/images/dashboard.png)

### Feedback Inbox

![Feedback inbox](docs/images/feedback.png)

### Roadmap Planning

![Roadmap planning](docs/images/roadmap.png)

### Bug Triage

![Bug triage](docs/images/bugs.png)

### Release Management

![Release management](docs/images/releases.png)

### Analytics

![Analytics](docs/images/analytics.png)

### AI Assistant

![AI Assistant](docs/images/ai-assistant.png)

## Current Features

### Dashboard

- Product operations overview with key metrics
- Feedback trend visualization
- Bug severity summary
- Roadmap progress preview
- AI insight cards using realistic product operations data

### Feedback

- Customer feedback inbox
- Create, read, update, and delete feedback records
- Feedback detail page
- Search by customer, request, source, and linked feature
- Filter by product area and urgency
- Server-side pagination with page size support
- Reusable feedback form dialog using React form action pattern
- Reusable confirmation dialog for destructive actions
- Centralized API error handling and toast notifications
- Top-page network progress indicator for API activity

### Roadmap

- Roadmap planning page
- Roadmap board grouped by status: Discovery, Planned, In progress, Shipped
- Roadmap feature cards with owner, milestone, priority, linked feedback count, and scoring
- Create, read, update, and delete roadmap feature records
- Search and filter roadmap work by status, priority, and product area
- Server-side pagination and typed frontend/backend mapping

### Bugs

- Bug triage page
- Create, read, update, and delete bug reports
- Track customer, severity, status, assignee, source, reproduction steps, and linked release
- Search, filter, summarize, and paginate bug reports

### Releases

- Release management page
- Create, read, update, and delete releases
- Track release type, status, owner, target date, shipped date, public/internal notes, included features, and included bugs
- Public changelog visibility flag and release summary metrics

### Analytics

- Product analytics page using feedback, roadmap, bug, and release data
- Summary cards for product operations health
- Feedback area trends, bug severity mix, roadmap status, release pipeline, and generated operational insights

### AI Assistant

- AI-assisted product workspace
- Product context endpoint for feedback, roadmap, bugs, releases, and active AI provider
- Draft product brief generation through a backend AI provider boundary
- Local deterministic provider for offline demos
- Optional OpenAI provider using the Responses API with structured JSON output
- Service-level and route-level backend tests for AI behavior

### Internationalization

- English and French support
- `react-i18next` integration
- Type-safe translation keys using `i18next.d.ts`
- Language selector in the app header

## Tech Stack

### Frontend

- React 19
- Vite
- TypeScript
- React Router
- PrimeReact
- Tailwind CSS
- TanStack Query
- Axios
- react-i18next / i18next

### Backend

- Python
- FastAPI
- Pydantic
- SQLAlchemy 2.0
- Alembic
- PostgreSQL
- psycopg
- Uvicorn

### Infrastructure

- Docker Compose for PostgreSQL
- Environment-based configuration
- REST API integration between frontend and backend

## Architecture Overview

```text
apps/
  api/
    app/
      api/routes/          FastAPI route handlers
      core/                App config and shared helpers
      data/db/             Database session, base, and seed setup
      data/models/         SQLAlchemy models
      data/repositories/   Database query and persistence logic
      data/migrations/     Alembic migrations
      schemas/             Pydantic request/response schemas
      services/            Business logic and AI provider integration
  web/
    src/
      components/          Reusable UI and feature components
      config/              Frontend environment config
      constants/           Shared frontend constants
      data/                Sample data for frontend-only sections
      hooks/               Shared React hooks
      i18n/                react-i18next setup and translations
      mappers/             API-to-UI data mapping
      pages/               Route-level pages
      queries/             TanStack Query hooks and query keys
      services/            Axios API services
      types/               TypeScript domain and API types
docs/                      Planning notes
infra/                     Future deployment infrastructure
```

## Getting Started

### 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d db
```

The database runs on host port `5433`.

### 2. Configure Backend Environment

Create `apps/api/.env` from the example if needed:

```bash
cp apps/api/.env.example apps/api/.env
```

Expected database URL:

```text
PULSEROADMAP_DATABASE_URL="postgresql+psycopg://pulseroadmap:pulseroadmap@localhost:5433/pulseroadmap"
```

### 3. Run Backend Migrations

```bash
cd apps/api
.venv/bin/alembic upgrade head
```

### 4. Start The Backend API

```bash
cd apps/api
.venv/bin/uvicorn app.main:app --reload
```

API docs:

```text
http://127.0.0.1:8000/docs
```

### 5. Configure Frontend Environment

Create `apps/web/.env` from the example if needed:

```bash
cp apps/web/.env.example apps/web/.env
```

Expected API URL:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 6. Start The Frontend

```bash
cd apps/web
npm install
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173/
```

## Useful Commands

### Frontend Build

```bash
cd apps/web
npm run build
```

### Backend Compile Check

```bash
cd apps/api
.venv/bin/python -m compileall app
```

### Backend Tests

```bash
cd apps/api
.venv/bin/python -m unittest discover -s tests
```

### Create Alembic Migration

```bash
cd apps/api
.venv/bin/alembic revision --autogenerate -m "migration message"
```

### Apply Migrations

```bash
cd apps/api
.venv/bin/alembic upgrade head
```

### Reset Local Database

This deletes local PostgreSQL data for the Docker Compose project:

```bash
docker compose down -v
docker compose up -d db
cd apps/api
.venv/bin/alembic upgrade head
```

## API Routes

### Health

```text
GET /health
```

### Feedback

```text
GET    /api/feedback
POST   /api/feedback
GET    /api/feedback/{feedback_id}
PATCH  /api/feedback/{feedback_id}
DELETE /api/feedback/{feedback_id}
```

`GET /api/feedback` supports:

```text
search
product_area
urgency
skip
take
```

### Roadmap

```text
GET    /api/roadmap
POST   /api/roadmap
GET    /api/roadmap/{feature_id}
PATCH  /api/roadmap/{feature_id}
DELETE /api/roadmap/{feature_id}
```

### Bugs

```text
GET    /api/bugs
POST   /api/bugs
PATCH  /api/bugs/{bug_id}
DELETE /api/bugs/{bug_id}
```

### Releases

```text
GET    /api/releases
POST   /api/releases
PATCH  /api/releases/{release_id}
DELETE /api/releases/{release_id}
```

### AI Assistant

```text
GET  /api/ai/context
POST /api/ai/brief
```

Default local AI provider:

```env
PULSEROADMAP_AI_PROVIDER="local"
```

Optional OpenAI provider:

```env
PULSEROADMAP_AI_PROVIDER="openai"
PULSEROADMAP_OPENAI_API_KEY="your-api-key"
PULSEROADMAP_OPENAI_MODEL="gpt-5.2"
```

## Engineering Highlights

- Built a full-stack SaaS-style product operations platform using React, FastAPI, PostgreSQL, and Docker Compose.
- Implemented typed frontend/backend data boundaries with TypeScript types, Pydantic schemas, and centralized mapper functions.
- Integrated TanStack Query and Axios for API state management, caching, mutation invalidation, loading states, and centralized error handling.
- Designed reusable UI components for cards, page headers, dropdowns, paginated tables, dialogs, loading states, error states, and layout.
- Implemented server-side filtering and pagination for product modules using FastAPI query parameters and SQLAlchemy queries.
- Added PostgreSQL persistence with SQLAlchemy models, repository pattern, Alembic migrations, and environment-based database configuration.
- Added English/French internationalization using react-i18next with type-safe translation keys.
- Added AI-assisted product brief generation with local and OpenAI provider paths behind a backend provider boundary.
- Applied clean architecture separation across routes, schemas, repositories, models, services, mappers, queries, and UI components.

## CV Summary

**PulseRoadmap - Full-Stack Product Operations Platform**

Built a B2B SaaS-style product operations platform for managing customer feedback, roadmap planning, bug triage, release management, product analytics, and AI-assisted product briefs. Developed a React + TypeScript frontend with PrimeReact, Tailwind CSS, React Router, TanStack Query, Axios, and react-i18next. Built a FastAPI backend with Pydantic, SQLAlchemy 2.0, Alembic, PostgreSQL, and Docker Compose. Implemented CRUD APIs, server-side filtering, pagination, reusable UI components, typed API mapping, centralized error handling, English/French localization, backend tests, and configurable AI providers.

## Suggested CV Bullet Points

- Built a full-stack product operations SaaS application using React, TypeScript, FastAPI, PostgreSQL, SQLAlchemy, Alembic, and Docker Compose.
- Implemented customer feedback, roadmap, bug triage, and release management workflows with server-side search, filtering, pagination, reusable form dialogs, and API mutation invalidation using TanStack Query.
- Designed typed API integration layers with Axios services, TypeScript domain/API types, Pydantic schemas, and mapper functions between snake_case backend data and camelCase frontend models.
- Built an AI-assisted product brief workflow with local and OpenAI provider implementations, structured output parsing, environment-based provider selection, and backend service/route tests.
- Added internationalization with react-i18next, supporting English/French translations and type-safe translation keys.
- Structured the codebase with clean separation of concerns across frontend components/pages/queries/services and backend routes/schemas/repositories/models.

## Next Planned Work

- Link feedback records to roadmap features.
- Add authentication and organization/workspace support.
- Add role-based access control and workspace-level permissions.
- Add file attachments for feedback and bug reports.
- Add notifications and background jobs for release/change events.
- Add stronger analytics filtering and export workflows.
- Add CI checks for frontend build, backend compile, and backend tests.
