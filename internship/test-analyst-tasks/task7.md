## Task 7 – Selenium Regression + CI (Optimistic UI)

### What you will do
Automate the watchlist optimistic UI flow and run it in CI.

### Steps
1. Create tests (Selenium)
   - Success: add to watchlist → immediate UI change → confirm after API
   - Failure: simulate error → UI rolls back
2. Save artifacts
   - Screenshots on failure
   - JUnit/XML test results
3. Add a CI-friendly script
   - One command to run headless locally/CI (no prompts)
4. Document how to switch dev env to `.NET` backend for tests

### Deliverables
- Test code (Selenium), run instructions
- CI run script + sample CI logs
- Failure screenshots (if any) + JUnit/XML results
- Doc on toggling FE to `.NET` in dev for tests

### Done when
- Tests pass 3 runs in a row; artifacts and script included; doc is clear.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 7 – Selenium Regression + CI.  
Code Files Referenced: `features/cryptocurrency-detail/components/AddToCryptoWatchlist.tsx`, `hooks/useWatchlist.tsx`, `test-analyst-tasks/automation/selenium/*`.  
Expected Functionality: Automated regression with CI runability.  
Acceptance Criteria: Stable runs; artifacts; CI script; docs.  
Evidence Provided: Test code, CI logs, screenshots, run command.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


