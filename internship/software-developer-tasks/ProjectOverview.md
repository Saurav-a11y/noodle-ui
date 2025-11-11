## Project Overview
Project Noodles is a Financial Intelligence App that aggregates on-chain and off-chain metrics (token prices, sentiment, user transactions, project growth) and visualizes them in interactive dashboards. The frontend is a Next.js/React app that consumes APIs defined in `apis/index.ts` and internal routes under `app/api/*`. For this internship track, you will also introduce a small C#/.NET microservice to mirror select endpoints and integrate SQL Server (structured storage/logging) and MongoDB (activity logs). Interns extend existing modules rather than building net-new systems.

### How the project is structured (short)
- `app/` – Next.js App Router pages and API routes
  - `app/api/*` – server routes (request validation, proxying, simple logic)
- `features/` – domain-focused UI (screens, widgets, charts) and local hooks
- `hooks/` – shared React hooks (auth, watchlist, search)
- `apis/index.ts` – client API functions that call the data services
- `components/`, `icons/`, `styles/` – UI building blocks and styling
- `server-dotnet/` (you add in this internship) – minimal .NET service
  - `Controllers/*` – endpoints
  - `Database/SqlServer/*` – SQL DDL (e.g., logs, holdings)
  - `Database/Mongo/*` – activity log model

Data flow in a sentence:
UI component → feature hook → `apis/index.ts` → remote data API (or `app/api/*`) → optional `.NET` service (dev) → SQL Server/Mongo (write paths).

## Role Overview (Software Developer)
You will enhance React UI components and hooks, harden existing API routes, and add a minimal .NET service with SQL Server + MongoDB integration. The journey moves from read-only exploration → small UI/route changes → cross-stack delivery that’s demo-ready and production-like.

## Core Repo References
- `apis/index.ts`
- `features/stablecoins/StableCoinsTable.tsx`
- `features/stablecoins/MostTalkedAboutStablecoins.tsx`
- `features/stablecoins/TopGrowthStablecoins.tsx`
- `app/api/stablecoins/list/route.ts`
- `hooks/useWatchlist.tsx`

## Week-by-Week Progression (8 Weeks)
| Week | Focus | Task | Repo path | Deliverable | AI verification prompt summary |
|---|---|---|---|---|---|
| 1 | Onboarding & UI polish | Add loading/empty states; map data flow `apis` → hooks → components. | `apis/index.ts`, `features/stablecoins/StableCoinsTable.tsx`, `features/stablecoins/*` | PR + architecture note | Verify states render, no console errors; doc shows data flow. |
| 2 | Stablecoins filters | Add search/filter to the stablecoins list; wire to API params. | `features/stablecoins/StableCoinsTable.tsx`, `hooks/stablecoins/useStablecoinsList.tsx`, `app/api/stablecoins/list/route.ts` | PR + usage note | Requests include filter params; UI updates cleanly. |
| 3 | Table sorting | Add sorting (asc/desc) for key columns on stablecoins table. | `features/stablecoins/StableCoinsTable.tsx` | PR + control UI | Rows reorder correctly; optional sort param used. |
| 4 | API hardening | Validate inputs and error shape for one route. | `app/api/stablecoins/list/route.ts` | PR + demo | 400 on invalid input; happy path unchanged. |
| 5 | .NET scaffold + SQL log | Minimal API proxy + SQL `ApiRequestLog`. | `server-dotnet/*` (new) | Running service + SQL script | Proxy returns data; logs request status/latency. |
| 6 | Watchlist upsert | .NET `POST /api/watchlist/holdings` + Mongo log; FE env override. | `server-dotnet/*` (new), `apis/index.ts` | PRs (BE/FE/DB) | SQL upsert + Mongo activity; FE uses .NET in dev. |
| 7 | Integration + UX | FE optimistic update; collaborate with Test/Data analysts. | `hooks/useWatchlist.tsx`, relevant stablecoins UI | PR + tests/docs | Instant UI update; tests and DB checks included. |
| 8 | Hardening + Docker | Retry/circuit-breaker, health endpoint, Dockerfile. | `server-dotnet/*` | Dockerized service + docs | Health check works; image builds and runs. |

## Milestone 1 (end of Weeks 3–4)
- Goal: Foundational enhancement of rankings filters, chart controls, and one hardened API route.
- Deliverables: PRs, screenshots, short demo; README snippets.
- AI Prompt Example: Verify network params reflect UI, error shape standardized, no console errors; provide confidence score + suggestions.

## Milestone 2 (end of Weeks 7–8)
- Goal: Integrated improvement: Watchlist upsert via .NET + SQL/Mongo with FE optimistic updates and test artifacts.
- Deliverables: Working E2E flow, Dockerized service, health checks, Postman collection, DB validation notes.
- AI Prompt Example: Confirm SQL/Mongo writes, FE env override works, health endpoint passes, Docker build succeeds; provide confidence score + suggestions.

## Mentor Review Notes
- Small PRs with clear descriptions; tests/validation steps included.
- Code clarity: naming, modular hooks/components, consistent patterns.
- DB safety: parameterized queries, idempotent upserts, minimal round-trips.
- Observability: structured logs, robust error handling, health checks.
- Collaboration: coordinate with Test/Data analysts; respond to code reviews.

## Portfolio Outcome
- Demo-ready feature across FE + .NET + SQL/Mongo; before/after screenshots; Postman tests.
- Clean commit history; README/runbook for .NET service; validation evidence (screens, logs).


