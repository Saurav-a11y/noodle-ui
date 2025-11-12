## Task 3 – SSIS: Load Staging → Star + Speed It Up

### What you will do
Load the star schema from staging and add partitions/indexes for speed.

### Steps
1. SSIS transforms: staging → Dims/Facts (add surrogate keys)
2. Add SCD logic where needed (brief note)
3. SQL scripts: partitions (e.g., by date) and helpful indexes
4. Run and measure: capture a few query timings

### Deliverables
- SSIS star-load packages
- SQL scripts for partitions and indexes
- Timing screenshots or table comparing before/after

### Done when
- Star tables are populated; scripts for partitions/indexes exist; timings are recorded.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Data Analyst on Task 3 – Star Load & Performance.  
Code Files Referenced: `bi-artifacts/ssis/*`, `bi-artifacts/model/*`.  
Expected Functionality: Correct star loads; partitioning/indexing effective.  
Acceptance Criteria: Load logs; query timings; documentation of SCD logic.  
Evidence Provided: SSIS runs; SQL scripts; plans/timings screenshots.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


