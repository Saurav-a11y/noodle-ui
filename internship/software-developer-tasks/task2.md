## Task 2 – Add Filters to the Stablecoins Table

### What you will do
Add simple filters (e.g., Search by name, Category) to the stablecoins list and pass them to the existing API/hook.

### Steps
1. Open these files
   - `features/stablecoins/StableCoinsTable.tsx`
   - `hooks/stablecoins/useStablecoinsList.tsx`
   - `app/api/stablecoins/list/route.ts` (validate inputs if needed)
   - `apis/index.ts` (read only)
2. Add UI controls
   - Add a search box and (if applicable) a simple dropdown filter (use existing UI components/styles if available).
   - Keep labels clear and keyboard accessible.
3. Wire up state
   - Store selected values in component state.
   - Pass query params into the hook → API route.
4. Test quickly
   - Change each dropdown and check results update.
   - In DevTools → Network, confirm query params match your selections.
5. Commit and PR
   - Branch: `intern/<your-name>/task2-rankings-filters`
   - Add 2 screenshots: before and after applying a filter.

### Deliverables
- Pull Request link (branch `intern/<your-name>/task2-rankings-filters`)
- 2 screenshots (before filter, after filter)
- Short PR description noting which params you pass (e.g., `search`, `category`)

### Done when
- Requests include your filter/search params.
- List updates without console errors and remains keyboard accessible.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 2 – Rankings Filters.  
Code Files Referenced: `features/stablecoins/StableCoinsTable.tsx`, `hooks/stablecoins/useStablecoinsList.tsx`, `app/api/stablecoins/list/route.ts`, `apis/index.ts`.  
Expected Functionality: Filters update query params and the list.  
Acceptance Criteria: Network shows correct params; UI updates smoothly; screenshots included.  
Evidence Provided: Screenshots/video; PR link; network logs.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


