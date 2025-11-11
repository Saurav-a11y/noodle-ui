## Task 4 – API Validation: Quick Pos/Neg Checks

### What you will do
Use Postman to prove the API returns 400 on bad input and 200 on good input.

### Steps
1. Create Postman requests:
   - Valid request (200)
   - Missing/invalid params (400)
2. Assert response schema:
   - Error has `{ error, details }`
   - Success unchanged
3. Save run results and screenshots.

### Deliverables
- Postman collection/export
- Screenshots for 200 and 400 cases
- Short error schema doc `{ error, details }`

### Done when
- Positive and negative cases pass; evidence saved.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 4 – API Hardening.  
Code Files Referenced: `app/api/stablecoins/list/route.ts`.  
Expected Functionality: Validation works; consistent error schema.  
Acceptance Criteria: Tests pass; evidence attached.  
Evidence Provided: Postman export; run logs; screenshots.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


