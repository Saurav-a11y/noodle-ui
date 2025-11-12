## Task 4 – Make One API Route Safer (Validation)

### What you will do
Add basic input checks and clear error messages to one API route.

### Steps
1. Open this file
   - `app/api/stablecoins/list/route.ts`
2. Add validation
   - Check required query params (type and presence).
   - If invalid: return `400` with `{ error: "message", details: {...} }`.
3. Keep success path the same
   - Do not change the happy-path response shape.
4. Test quickly
   - Use curl/Postman with missing/invalid params → expect 400 + error JSON.
   - Valid request → expect 200 and same data as before.
5. Commit and PR
   - Branch: `intern/<your-name>/task4-api-validation`
   - Add 2 screenshots: invalid (400) and valid (200).

### Deliverables
- Pull Request link (branch `intern/<your-name>/task4-api-validation`)
- Postman/curl screenshots: one 400 error, one 200 success
- Brief error schema note `{ error, details }`

### Done when
- Invalid inputs return 400 with a consistent error shape.
- Valid requests behave exactly as before.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 4 – API Hardening.  
Code Files Referenced: `app/api/stablecoins/list/route.ts`.  
Expected Functionality: Validate inputs; uniform error responses.  
Acceptance Criteria: 400 on invalid; success unchanged; screenshots/logs attached.  
Evidence Provided: PR link; Postman/curl logs; screenshots.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


