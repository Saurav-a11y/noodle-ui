## Task 6 – Watchlist Upsert (.NET + SQL + Mongo) + FE Switch

### What you will do
Create an upsert endpoint in .NET, write to SQL + Mongo, and point the FE to this endpoint in dev.

### Steps
1. Create backend pieces
   - `server-dotnet/Controllers/WatchlistController.cs` → `POST /api/watchlist/holdings`
   - `server-dotnet/Database/SqlServer/002_holdings.sql` → table `Holdings(user_id, asset_id, holdings, updated_at)` with upsert
   - `server-dotnet/Database/Mongo/Models/UserActivityLog.cs` → log each upsert `{ userId, action, assetId, meta, createdAt }`
2. Frontend env switch
   - In `apis/index.ts`, add an env-based override so dev uses your .NET endpoint for watchlist calls.
3. Test
   - Postman: create/update holdings → check SQL row + Mongo log.
   - Run the FE in dev: confirm FE calls your .NET endpoint.
4. Commit and PR
   - Branch: `intern/<your-name>/task6-watchlist-upsert`
   - Include screenshots of SQL row, Mongo doc, and FE network tab.

### Deliverables
- Pull Request link (branch `intern/<your-name>/task6-watchlist-upsert`)
- Postman screenshot (200 response)
- SQL `Holdings` row screenshot + Mongo `user_activity_logs` doc screenshot
- FE Network tab screenshot showing request to `.NET` endpoint
- `.env` example or README note for FE override

### Done when
- Upsert is idempotent (repeat calls update same row).
- Mongo activity is written.
- FE in dev points to .NET for watchlist.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 6 – Watchlist Upsert.  
Code Files Referenced: `server-dotnet/Controllers/WatchlistController.cs`, `server-dotnet/Database/SqlServer/002_holdings.sql`, `server-dotnet/Database/Mongo/Models/UserActivityLog.cs`, `apis/index.ts`.  
Expected Functionality: SQL upsert + Mongo log; FE override in dev.  
Acceptance Criteria: Verified DB writes; FE points to .NET; docs included.  
Evidence Provided: PR link; SQL/Mongo screenshots; Postman tests; .env example.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


