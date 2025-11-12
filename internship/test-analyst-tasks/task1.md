## Task 1 – Setup, Smoke Test, Baseline Screenshots

### What you will do
Run the app, click through key pages, and save baseline screenshots.

### Steps
1. Install and run
   - `npm ci && npm run dev`
   - Open `http://localhost:3000`
2. Visit pages
   - Stablecoins page
   - One stablecoins widget (e.g., table or stats card)
3. Capture evidence
   - Take screenshots of each page (normal, loading if possible).
   - Open DevTools → Console: ensure no errors.
4. Write a short plan
   - 3–5 bullet “what I will test next weeks”.
5. Share issues found (if any)
   - Note repro steps and a screenshot.

### Deliverables
- Screenshot set (pages and any loading states)
- Short smoke test notes (console status, pages visited)
- 3–5 bullet test plan for coming weeks
- Any initial issue reports (with repro steps)

### Done when
- Screenshots are saved, no console errors on happy path, and a short plan exists.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 1 – Setup & Baseline.  
Code Files Referenced: `apis/index.ts`, `app/api/*`, relevant UI components.  
Expected Functionality: App runs; basic navigation and rendering pass.  
Acceptance Criteria: Screenshots/logs attached; issues noted; plan documented.  
Evidence Provided: Screenshot set; test notes; PR/issue links.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


