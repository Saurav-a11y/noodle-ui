## Task 5 – Create a Tiny .NET API + Log Requests to SQL

### What you will do
Spin up a small .NET API endpoint that proxies an existing metrics call and logs each request to SQL.

### Steps
1. Create files
   - `server-dotnet/Program.cs`
   - `server-dotnet/Controllers/MetricsController.cs`
   - `server-dotnet/Database/SqlServer/001_create_tables.sql`
   - `server-dotnet/README.md`
2. Add endpoint
   - `GET /api/metrics/community-health-ranks` → forward query params to data API used in `apis/index.ts`.
3. Add logging
   - Create table `ApiRequestLog(id, route, status, latency_ms, created_at)`.
   - Insert one row per request with status and timing.
4. Run and test
   - Start the .NET app locally.
   - Call the endpoint; verify you get data and a row is written to SQL.
5. Commit and PR
   - Branch: `intern/<your-name>/task5-dotnet-proxy-logging`
   - Include screenshots of: API response + SQL row.

### Deliverables
- Pull Request link (branch `intern/<your-name>/task5-dotnet-proxy-logging`)
- Screenshot of proxy API response
- Screenshot of `ApiRequestLog` row showing status/latency
- `server-dotnet/README.md` with run steps

### Done when
- Endpoint returns data.
- Each call creates a correct log row in SQL.
- README has run steps.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 5 – .NET Scaffold + SQL Logging.  
Code Files Referenced: `server-dotnet/Program.cs`, `server-dotnet/Controllers/MetricsController.cs`, `server-dotnet/Database/SqlServer/001_create_tables.sql`, `server-dotnet/README.md`.  
Expected Functionality: Proxy works; logs written with status/latency.  
Acceptance Criteria: Valid responses; correct DB rows; README run steps.  
Evidence Provided: PR link; SQL screenshots; local run logs.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


