## Project Overview
Project Noodles surfaces on-chain/off-chain metrics in a Next.js/React UI. Data is fetched via `apis/index.ts` and internal routes in `app/api/*`. A small .NET service will be introduced for select endpoints, writing logs to SQL Server and activities to MongoDB. Test Analysts create structured, evidence-driven testing across UI/API/DB while collaborating with Dev/Data roles.

## Role Overview (Test Analyst)
You will design and execute manual and BDD-styled tests (ReqRoll/Gherkin where applicable), build Postman collections, document exploratory findings, and validate DB effects (SQL/Mongo). The journey moves from smoke and baseline → focused feature testing → cross-stack regression and resilience checks.

## Core Repo References
- `apis/index.ts`
- `app/api/*` (e.g., `app/api/stablecoins/list/route.ts`, `app/api/stock-dividend-yield/route.ts`)
- `features/cryptocurrencies/components/CommunityHealthRankings.tsx`
- `features/cryptocurrency-detail/components/CandletickChart.tsx`
- `features/cryptocurrency-detail/components/AddToCryptoWatchlist.tsx`

## Week-by-Week Progression (8 Weeks)
| Week | Focus | Task | Repo path | Deliverable | AI verification prompt summary |
|---|---|---|---|---|---|
| 1 | Setup & Baseline | Install, run, and smoke-test critical pages; capture baseline screenshots; define test charters. | UI components and routes above | Test plan + baseline screenshot set | Verify navigation, render, states, no console errors; attach evidence. |
| 2 | Rankings Filters | Define BDD cases; build Postman tests for API queries; execute UI checks with filters. | `CommunityHealthRankings.tsx`, `useCommunityHealthRanks.ts`, `apis/index.ts` | BDD scenarios + Postman collection + report | Verify params in requests; UI reflects filters; record findings. |
| 3 | Chart Controls | Test interval/time range controls and network params; accessibility smoke. | `CandletickChart.tsx`, `usePriceHistory.tsx` | Test notes + screenshots + logs | Requests include interval/type; chart updates; a11y smoke. |
| 4 | API Hardening | Negative/positive tests for route validation and error shape. | `app/api/stablecoins/list/route.ts` | Postman tests + error schema doc | 400 on invalid input; schema consistent; demo evidence. |
| 5 | .NET Proxy | Test .NET proxy endpoint and SQL logging; include SQL validation queries. | `server-dotnet/*` | Postman tests + SQL results | Proxy returns data; `ApiRequestLog` rows correct. |
| 6 | Watchlist Upsert | E2E tests for upsert; validate SQL row and Mongo activity; FE env override. | `WatchlistController.cs`, `apis/index.ts`, UI watchlist | Postman suite + DB checks + report | Upsert idempotency; FE calls .NET; DB docs attached. |
| 7 | Selenium Regression + CI | Build Selenium regression pack (watchlist optimistic UI) and wire to CI (scripted run). | FE watchlist + .NET | Automated suite + CI run script/output | Validate optimistic update and rollback across runs; artifacts saved. |
| 8 | Resilience & Health | Retry/circuit-breaker behavior; `/health` endpoint; Docker run smoke. | `server-dotnet/*` | Final report + evidence pack | Health 200; retry logging; container run verified. |

## Milestone 1 (end of Weeks 3–4)
- Goal: Foundational feature validation for filters, chart controls, and hardened API route.
- Deliverables: BDD cases, Postman tests, screenshots/logs, error schema doc.
- AI Prompt Example: Confirm requests/params, response codes/schemas, screenshots attached; provide confidence score + suggestions.

## Milestone 2 (end of Weeks 7–8)
- Goal: Integrated validation across FE + .NET + SQL/Mongo including health/resilience and regression.
- Deliverables: Comprehensive Postman collection, DB validation queries/results, final report.
- AI Prompt Example: Validate E2E upsert, SQL/Mongo evidence, health checks, Docker run; confidence score + suggestions.

## Mentor Review Notes
- Evidence quality (screens, logs, queries), reproducibility, and clarity.
- Coverage of happy/negative paths, a11y smoke, and resilience.
- Collaboration: defect reports and cross-role handoffs with Dev/Data.

## Portfolio Outcome
- Professional test artifacts (Postman collections, BDD scenarios, reports) and evidence packs; defect logs with reproductions.


