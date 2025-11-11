## Task 2 – SSIS: Load CSVs into Staging (with simple auditing)

### What you will do
Create an SSIS package that loads the CSVs to staging tables and records row counts/errors.

### Steps
1. Create SSIS solution in `bi-artifacts/ssis/`
2. Add flat file sources → map to staging tables
3. Add basic type conversions and dedupe (if needed)
4. Add audit tables/logging and error output (reject CSVs)
5. Run once and save counts/logs

### Deliverables
- SSIS solution files (.dtsx, configs)
- Staging row counts and sample reject files
- Runbook with connection/config steps

### Done when
- Full load completes; counts and reject samples are saved; runbook explains how to run.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Data Analyst on Task 2 – SSIS Staging Load.  
Code Files Referenced: `bi-artifacts/ssis/*`, `bi-artifacts/model/*`.  
Expected Functionality: Reliable CSV→staging load with auditing and errors captured.  
Acceptance Criteria: Logs, row counts, and reject samples provided; runbook clear.  
Evidence Provided: SSIS screenshots; log excerpts; counts; sample reject files.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


