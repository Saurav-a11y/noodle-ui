## Task 3 – Add Sorting to the Stablecoins Table

### What you will do
Add simple sort controls (asc/desc) to the stablecoins table columns (e.g., Name, Market Cap, Growth).

### Steps
1. Open these files
   - `features/stablecoins/StableCoinsTable.tsx`
2. Add UI controls
   - Clickable column headers or small sort buttons for asc/desc
3. Wire to data
   - Sort the current data set (client-side) or pass a sort param to the list hook/API if supported
4. Test quickly
   - Click to sort ascending/descending; confirm rows re-order correctly
   - If API supports sorting: DevTools → Network shows sort param
5. Commit and PR
   - Branch: `intern/<your-name>/task3-stablecoins-sorting`
   - Add screenshots: sorted ascending and descending for one numeric column

### Deliverables
- Pull Request link (branch `intern/<your-name>/task3-stablecoins-sorting`)
- 2 screenshots (ascending, descending) for a numeric column
- Short note on whether sorting is client-side or via API param

### Done when
- Table sorts correctly for at least one text and one numeric column.
- If API supports sorting: network requests include correct params.
- No console errors.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 3 – Stablecoins Table Sorting.  
Code Files Referenced: `features/stablecoins/StableCoinsTable.tsx`.  
Expected Functionality: Sort controls reorder rows; (optional) API sort param used.  
Acceptance Criteria: Correct ordering; clean UI; screenshots attached.  
Evidence Provided: Screens/video; PR link; (optional) network logs.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


