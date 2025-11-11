## Task 7 – Automate Refresh + Show Performance

### What you will do
Schedule SSIS loads and SSAS processing, then show simple timing results.

### Steps
1. Add job scripts in `bi-artifacts/ops/` (SQL Agent + SSAS processing)
2. Document steps to run/schedule
3. Capture timings before/after small tuning (indexes/partitions)
4. Save screenshots/logs of successful runs

### Deliverables
- SQL Agent job scripts and SSAS processing scripts
- Documentation of scheduling steps
- Timing tables/logs (before vs after tuning)

### Done when
- Jobs/processes can run on a schedule; timings and logs are saved with a short note.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Data Analyst on Task 7 – Refresh & Performance.  
Code Files Referenced: `bi-artifacts/ops/*`, `bi-artifacts/ssis/*`, `bi-artifacts/ssas/*`.  
Expected Functionality: Automated refresh and stable processing with performance evidence.  
Acceptance Criteria: Job scripts/steps; timing evidence; error handling notes.  
Evidence Provided: SQL Agent screenshots; logs; timing tables.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


