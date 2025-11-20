## Task 3 – SSIS: Load CSVs to Staging

### Focus
Build SSIS packages to load CSV files into staging tables with basic error handling.

### Getting started

1. **Create SSIS Project**
   - Visual Studio → New Project → Integration Services Project
   - Name: `NoodlesCryptoETL`
   - Location: `bi-artifacts/ssis/`

2. **Create Connection Managers**
   - **SQL Server Connection** (`SQLDB_NoodlesDW`):
     - Server: `localhost`
     - Database: `NoodlesDW`
     - Authentication: Windows or SQL Server
   - **Flat File Connections** (one per CSV):
     - `FF_Currency.csv`
     - `FF_CurrencyOverview.csv`
     - `FF_SocialEngagement.csv`
   - Configure: Delimiter (comma), Text qualifier ("), Header row (Yes)

3. **Build First Package: Load Currency Staging**
   - Create package: `01_Load_Currency_Staging.dtsx`
   - **Control Flow**:
     - Execute SQL Task: `TRUNCATE TABLE Staging.Currency;`
     - Data Flow Task: "Load Currency CSV"
   - **Data Flow**:
     - Flat File Source → `FF_Currency.csv`
     - Derived Column: Add `LoadTimestamp = GETDATE()`, `SourceFileName = @[User::SourceFile]`
     - OLE DB Destination → `Staging.Currency`
       - Access mode: Table or view - fast load
       - Rows per batch: 10,000

4. **Add Error Handling**
   - Configure Flat File Source error output: Redirect Row
   - Add Flat File Destination for rejects:
     - File: `Currency_Rejects.csv`
     - Columns: All source columns + ErrorCode + ErrorColumn
   - Test: Introduce bad data in CSV → Verify rejects file created

5. **Clone for Other Tables**
   - Copy `01_Load_Currency_Staging.dtsx` → `02_Load_CurrencyOverview_Staging.dtsx`
   - Update: Connection manager, target table, reject file name
   - Repeat for `03_Load_SocialEngagement_Staging.dtsx`

6. **Create Master Package**
   - Create `00_Master_Staging_Load.dtsx`
   - Add Execute Package Tasks:
     - Execute 01_Load_Currency_Staging.dtsx
     - Execute 02_Load_CurrencyOverview_Staging.dtsx
     - Execute 03_Load_SocialEngagement_Staging.dtsx
   - Link with precedence constraints (success → next)

7. **Test End-to-End**
   - Place sample CSVs in expected folder
   - Execute `00_Master_Staging_Load.dtsx`
   - Verify:
     - All packages complete successfully
     - Staging tables populated
     - Row counts match CSV (minus rejects)
     - Reject files created if errors exist

8. **Create Simple Runbook**
   - Create `bi-artifacts/ssis/RUNBOOK.md`
   - Include:
     - How to execute packages manually
     - Where to place CSV files
     - How to check for errors (reject files)
     - Expected row counts

### Repo Paths
- `bi-artifacts/ssis/NoodlesCryptoETL.sln`
- `bi-artifacts/ssis/00_Master_Staging_Load.dtsx`
- `bi-artifacts/ssis/01_Load_Currency_Staging.dtsx`
- `bi-artifacts/ssis/02_Load_CurrencyOverview_Staging.dtsx`
- `bi-artifacts/ssis/03_Load_SocialEngagement_Staging.dtsx`
- `bi-artifacts/ssis/RUNBOOK.md`

### Deliverables
- 4 SSIS packages (1 master + 3 staging loads)
- Packages execute successfully with sample data
- RUNBOOK.md with execution instructions
- Screenshots of successful execution

### Acceptance Criteria
- All packages execute without errors
- Staging tables populated with correct row counts
- Error handling redirects bad rows to reject files
- RUNBOOK.md explains how to run packages

