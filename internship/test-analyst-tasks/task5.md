## Task 5 – .NET Proxy: Simple API + SQL Log Check

### What you will do
Call the .NET proxy endpoint and prove it logs to SQL.

### Steps
1. Postman: call `GET /api/metrics/community-health-ranks`
2. Confirm response returns data.
3. Run a SQL query on `ApiRequestLog` to see a new row with status/latency.
4. Save screenshots of both.

### Deliverables
- Postman response screenshot
- SQL `ApiRequestLog` query + result screenshot
- Short note confirming status/latency captured

### Done when
- You have one API response screenshot and one SQL log screenshot.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 5 – .NET Proxy + SQL Logging.  
Code Files Referenced: `server-dotnet/Program.cs`, `server-dotnet/Controllers/MetricsController.cs`, `server-dotnet/Database/SqlServer/001_create_tables.sql`.  
Expected Functionality: Proxy works; SQL logs status/latency.  
Acceptance Criteria: Tests and SQL evidence attached.  
Evidence Provided: Postman export; SQL screenshots; run notes.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


