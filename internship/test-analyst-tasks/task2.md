## Task 2 – Rankings Filters: Simple BDD + Postman

### What you will do
Write a few BDD cases and Postman tests to check filters change network queries and results.

### Steps
1. Create 3–5 BDD scenarios
   - Examples: Filter by Category; Filter by Score Range; Invalid filter value.
2. Build a small Postman collection
   - Calls the rankings API with/without filters.
   - Save example responses.
3. UI check
   - Change filters in the app; confirm list updates; take screenshots.
4. Record findings
   - Note any mismatch between UI and network.

### Deliverables
- BDD scenarios document (ReqRoll/Gherkin or simple markdown)
- Postman collection export + example responses
- UI screenshots showing filtered results
- Short findings note (any mismatches)

### Done when
- BDD docs and a Postman collection exist, and screenshots show filtered results.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 2 – Rankings Filters.  
Code Files Referenced: `features/stablecoins/StableCoinsTable.tsx`, `hooks/stablecoins/useStablecoinsList.tsx`, `app/api/stablecoins/list/route.ts`, `apis/index.ts`.  
Expected Functionality: Filters affect network queries and visible list.  
Acceptance Criteria: Scenarios and Postman tests pass; screenshots/logs attached.  
Evidence Provided: BDD docs; Postman export; run evidence.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


