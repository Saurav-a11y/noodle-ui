## Task 1 – Design the Star Schema (from CSVs)

### What you will do
Read the schema, sketch an ERD, and write SQL to create staging and star tables.

### Steps
1. Read `noodles-crypto-schema.md` (fields/types)
2. Draw ERD (Dims: token, date, social; Facts: price/engagement)
3. Write SQL DDL
   - Staging tables (close to CSV layout)
   - Star tables (Dims/Facts) with keys and indexes
4. Save ERD (PNG/PDF) and scripts

### Deliverables
- ERD image (PNG/PDF)
- SQL scripts for staging and star schema (Dims/Facts)
- One-paragraph rationale for key design choices

### Done when
- ERD is clear, and DDL scripts create staging + star tables with keys/indexes.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Data Analyst on Task 1 – Star Schema Design.  
Code Files Referenced: `data-analyst-tasks/noodles-crypto-schema.md`, `data-analyst-tasks/bi-artifacts/model/*`.  
Expected Functionality: Dimensional model supports price, sentiment, and activity analytics.  
Acceptance Criteria: ERD + DDL consistent; keys/relationships clear; indexes proposed.  
Evidence Provided: ERD image; SQL scripts; notes.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


