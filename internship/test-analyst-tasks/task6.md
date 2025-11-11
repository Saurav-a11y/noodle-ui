## Task 6 – Watchlist Upsert: API + DB Check

### What you will do
Call the upsert API and prove SQL + Mongo were updated.

### Steps
1. Postman: `POST /api/watchlist/holdings` with sample user/asset
2. SQL: select from `Holdings` for that user/asset → verify row
3. Mongo: find in `user_activity_logs` → verify recent activity
4. FE dev: confirm FE calls the .NET route (Network tab)

### Deliverables
- Postman 200 screenshot
- SQL `Holdings` row + Mongo activity doc screenshots
- FE Network tab screenshot calling `.NET` route
- One-paragraph test summary

### Done when
- You have screenshots of Postman 200, SQL row, Mongo doc, and FE network request.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 6 – Watchlist Upsert.  
Code Files Referenced: `server-dotnet/Controllers/WatchlistController.cs`, `server-dotnet/Database/SqlServer/002_holdings.sql`, `server-dotnet/Database/Mongo/Models/UserActivityLog.cs`, `apis/index.ts`.  
Expected Functionality: Upsert + activity log; FE override in dev.  
Acceptance Criteria: Valid DB writes; tests pass; evidence attached.  
Evidence Provided: Postman export; SQL/Mongo screenshots; run notes.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


