## Task 2 – Design Star Schema (Dimensions & Facts)

### Focus
Create SQL DDL for staging and star schema tables; define primary/foreign keys and indexes.

### Getting started

1. **Review Task 1 Feedback**
   - Incorporate mentor feedback on your initial schema sketch
   - Refine dimension and fact table choices

2. **Create Staging Schema**
   - Staging tables mirror CSV structure (minimal transformation)
   - Create SQL script: `bi-artifacts/model/01_create_staging_schema.sql`
   - Include:
     - `Staging.Currency` (from v2-token CSV)
     - `Staging.CurrencyOverview` (from v2-token-overview CSV)
     - `Staging.SocialEngagement` (combined social data)
     - Audit columns: `LoadTimestamp`, `SourceFileName`, `RowNumber`
   - Use VARCHAR for raw data (avoid type conversion errors during load)

3. **Create Dimension Tables**
   - Create SQL script: `bi-artifacts/model/02_create_star_dimensions.sql`
   - Implement:
     - `DW.DimCurrency` (currency metadata with surrogate key `CurrencyKey`)
     - `DW.DimDate` (calendar table, pre-populated)
     - `DW.DimSocialPlatform` (reference: Twitter, Reddit, YouTube, GitHub)
   - Include:
     - Primary keys (surrogate keys for dimensions)
     - Natural keys (business keys like `CurrencySymbol`)
     - SCD columns for DimCurrency: `EffectiveDate`, `ExpirationDate`, `IsCurrent`

4. **Create Fact Tables**
   - Create SQL script: `bi-artifacts/model/03_create_star_facts.sql`
   - Implement:
     - `DW.FactCurrencyDailySnapshot` (one row per currency per day)
       - Columns: `CurrencyKey`, `DateKey`, `OpenPrice`, `ClosePrice`, `Volume24h`, `MarketCap`
       - Composite PK: `(CurrencyKey, DateKey)`
     - `DW.FactSocialEngagement` (event-level social data)
       - Columns: `EngagementKey`, `CurrencyKey`, `DateKey`, `PlatformKey`, `LikeCount`, `RetweetCount`
       - PK: `EngagementKey` (IDENTITY)
   - Add foreign key constraints to dimensions
   - Add non-clustered indexes on FK columns

5. **Populate DimDate**
   - Create SQL script: `bi-artifacts/model/04_populate_dimdate.sql`
   - Generate dates from 2020-01-01 to 2030-12-31
   - Include: Year, Quarter, Month, Week, DayOfWeek, IsWeekend

6. **Test Schema Creation**
   - Run all scripts in SSMS in order (01, 02, 03, 04)
   - Verify:
     - All tables created without errors
     - DimDate has ~4,000 rows
     - Foreign keys exist (check sys.foreign_keys)
     - Indexes created (check sys.indexes)

7. **Document Design Decisions**
   - Create `bi-artifacts/model/design-rationale.md`
   - Explain (1 paragraph each):
     - Why these dimensions and facts?
     - Why composite PK for FactCurrencyDailySnapshot?
     - Why SCD Type 2 for DimCurrency?
     - Which indexes and why?

### Repo Paths
- `bi-artifacts/model/01_create_staging_schema.sql`
- `bi-artifacts/model/02_create_star_dimensions.sql`
- `bi-artifacts/model/03_create_star_facts.sql`
- `bi-artifacts/model/04_populate_dimdate.sql`
- `bi-artifacts/model/design-rationale.md`

### Deliverables
- 4 SQL scripts that execute without errors
- DimDate populated with 10+ years of data
- design-rationale.md explaining key decisions
- ERD diagram (optional but recommended)

### Acceptance Criteria
- All scripts execute successfully in SSMS
- Tables have appropriate primary keys and foreign keys
- DimDate contains expected row count (~4,000)
- design-rationale.md addresses grain, SCD strategy, and indexing

