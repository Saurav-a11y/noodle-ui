## Task 1 – Setup & Data Profiling

### Focus
Install Microsoft BI tools; profile the crypto schema; understand source data structure and quality.

### Getting started

1. **Prerequisites**
   - Install SQL Server 2019+ (Developer Edition, free)
   - Install SQL Server Management Studio (SSMS)
   - Install Visual Studio 2019+ with SSDT (SQL Server Data Tools)
   - Access to sample CSV files (~100K rows for development)

2. **Environment Setup**
   - Create database `NoodlesDW` in SQL Server
   - Verify SSMS can connect to your local instance
   - Open Visual Studio → Verify SSIS/SSAS project templates available

3. **Read the Schema Documentation**
   - Open `data-analyst-tasks/noodles-crypto-schema.md`
   - Identify the main collections:
     - `v2-token` (currency metadata)
     - `v2-token-overview` (market data, sentiment)
     - `v4_x_tweets`, `v5_reddit_post_engagement` (social data)
     - `user_activity_logs` (user behavior)
   - Note the relationships between collections

4. **Profile Sample Data**
   - Load sample CSVs into Excel or SQL Server (temp tables)
   - Document for each file:
     - Row count
     - Column count
     - Null percentages (which fields have missing data?)
     - Data types (numeric, text, dates)
     - Sample values (first 5 rows)
   - Identify data quality issues:
     - Missing required fields (e.g., symbol, price)
     - Invalid values (negative prices, future dates)
     - Duplicates (same record appears multiple times)

5. **Create Profiling Report**
   - Create `bi-artifacts/evidence/data-profiling-report.md`
   - Include:
     - Summary table: File name, row count, column count, issues found
     - Data quality findings (3-5 specific examples)
     - Recommendations for ETL handling

6. **Sketch Initial Star Schema**
   - Draw a simple diagram (pen and paper or draw.io):
     - Identify 2-3 dimension tables (e.g., DimCurrency, DimDate)
     - Identify 1-2 fact tables (e.g., FactCurrencyDaily, FactSocialEngagement)
     - Show relationships with arrows
   - Save as `bi-artifacts/model/initial-schema-sketch.png`
   - Write 1 paragraph explaining your design choices

### Repo Paths
- `data-analyst-tasks/noodles-crypto-schema.md`
- `bi-artifacts/evidence/data-profiling-report.md` (you create this)
- `bi-artifacts/model/initial-schema-sketch.png` (you create this)

### Deliverables
- Data profiling report with findings
- Initial star schema sketch with rationale
- Environment setup confirmation (screenshot of SSMS + Visual Studio)

### Acceptance Criteria
- Profiling report covers all major CSV files
- At least 3 data quality issues identified with examples
- Star schema sketch shows dimensions and facts with relationships
- All tools installed and verified working

