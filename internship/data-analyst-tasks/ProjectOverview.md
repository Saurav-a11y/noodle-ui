## Project Overview
Project Noodles presents on-chain/off-chain intelligence in a React UI. Data comes from app APIs (`apis/index.ts`, `app/api/*`) and a .NET service (to be extended) writing to SQL Server and MongoDB. In this BI-focused redesign, you will assume access to CSV exports (≈1M rows) conforming to the crypto schema documented in `data-analyst-tasks/noodles-crypto-schema.md`, and you will build a Microsoft BI stack solution: SSIS (ETL), SQL Server (staging/star), SSAS (Tabular), SSRS (operational reports), and Power BI (dashboards).

## Role Overview (Data Analyst, Microsoft BI Stack)
You will design the data model, implement ETL with SSIS from CSV to SQL Server (staging → star schema), publish an SSAS Tabular model with measures, create SSRS parameterized reports, and deliver a Power BI dashboard. You will validate performance and data quality at ~1M+ rows and document refresh/processing strategies.

## Core Repo References
- Data schema reference: `data-analyst-tasks/noodles-crypto-schema.md`
- App API context: `apis/index.ts`
- .NET DB artifacts (from Dev track): `server-dotnet/Database/SqlServer/001_create_tables.sql`, `002_holdings.sql`, `Database/Mongo/Models/UserActivityLog.cs`
- Evidence and scripts folder (you will add): `data-analyst-tasks/bi-artifacts/`

## Week-by-Week Progression (8 Weeks)
| Week | Focus | Task | Repo path | Deliverable | AI verification prompt summary |
|---|---|---|---|---|---|
| 1 | Data modeling | Source profiling + star schema design (dimensions/facts) from CSV + schema doc. | `noodles-crypto-schema.md`, `bi-artifacts/model/` | Dim/Fact diagram + DDL for staging/star | Verify schema aligns to CSV + app fields; keys/relationships defined. |
| 2 | SSIS ETL (staging) | Build SSIS packages to load CSV to staging with audit/logging, type casting, dedupe. | `bi-artifacts/ssis/` | SSIS solution (.dtsx), config, runbook | Validate full load completes; row counts, rejects, logs captured. |
| 3 | SSIS ETL (star) | Transform staging → star (Dims/Facts), surrogate keys, SCD Type 1/2 where needed; partition large facts. | `bi-artifacts/ssis/` | Star load packages + SQL DDL/Indexes | Validate dims/facts populated; partitions/indexes created. |
| 4 | SSAS Tabular | Create Tabular model on star schema with relationships and DAX measures (price change, volatility, engagement). | `bi-artifacts/ssas/` | BIM file or Model.bim export, measure list | Validate relationships and measures; process succeeds (sample). |
| 5 | SSRS Reports | Parameterized operational reports (Top Gainers, Most Talked) from SQL/SSAS dataset. | `bi-artifacts/ssrs/` | RDL files + dataset queries | Validate parameters, pagination, and export. |
| 6 | Power BI Dashboard | Interactive dashboard (DirectQuery or Import to SQL/SSAS): trends, correlations, drill-through. | `bi-artifacts/powerbi/` | .pbix with visuals + RLS (optional) | Validate visuals, filters, performance guidance. |
| 7 | Refresh & Perf | Automate refresh (SSIS job scripts), SSAS processing strategy, SQL perf tuning (indexes/partitions). | `bi-artifacts/ops/` | SQL Agent job scripts, processing steps, perf notes | Validate job scripts; perf tests and timings attached. |
| 8 | Final E2E | Data quality checks, reconciliation with app metrics, final doc + demo pack. | `bi-artifacts/` | Evidence pack + README + demo video | Validate accuracy, stability, and documentation completeness. |

## Milestone 1 (end of Weeks 3–4)
- Goal: Foundational BI pipeline: CSV → SSIS → SQL Server (staging + star) + initial SSAS Tabular model.
- Deliverables: Star schema DDL, SSIS packages (staging and star), SSAS model with core measures, runbook, and evidence of successful loads.
- AI Prompt Example: Confirm DDL quality, SSIS run logs (row counts, rejects), Tabular relationships/measures; include performance notes and confidence score.

## Milestone 2 (end of Weeks 7–8)
- Goal: Integrated BI delivery: SSRS reports, Power BI dashboard, automated refresh and processing, data quality and reconciliation report against app metrics.
- Deliverables: RDLs, PBIX, SQL Agent/processing scripts, performance benchmarks, final README and demo.
- AI Prompt Example: Validate report parameters/exports, dashboard interactivity/performance, job schedules, reconciliation accuracy; provide improvement suggestions + confidence score.

## Mentor Review Notes
- Data model fidelity to domain; dimensional design rationale.
- ETL robustness: logging, error handling, idempotency, partitioning strategy.
- Model quality: well-defined measures, relationships, and friendly metadata.
- Reporting/dashboard usability and performance at ~1M+ rows.
- Documentation and reproducibility of end-to-end steps.

## Portfolio Outcome
- A full Microsoft BI stack solution (SSIS, SQL Server star schema, SSAS Tabular, SSRS, Power BI) with evidence, scripts, and a demo-ready dashboard/report suite.


