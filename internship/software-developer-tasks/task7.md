## Task 7 – Optimistic UI for Watchlist + Quick Tests

### What you will do
Make the watchlist button update instantly (optimistic), and roll back on failure.

### Steps
1. Open files
   - `features/cryptocurrency-detail/components/AddToCryptoWatchlist.tsx`
   - `hooks/useWatchlist.tsx`
   - `apis/index.ts` (confirm it points to .NET in dev from Task 6)
2. Add optimistic update
   - On click: update UI immediately.
   - After API returns:
     - Success: keep UI.
     - Error: show error and revert UI state.
3. Test
   - Happy path: ensure instant change, then confirmation.
   - Failure path: simulate an error (e.g., force 500) → UI rolls back.
4. Share a simple Postman request and DB check notes.
5. Commit and PR
   - Branch: `intern/<your-name>/task7-optimistic-ui`
   - Screenshots: before/after + failure rollback.

### Deliverables
- Pull Request link (branch `intern/<your-name>/task7-optimistic-ui`)
- Screenshots: optimistic success, and rollback on error
- Postman request (JSON) and brief DB check notes

### Done when
- UI changes instantly and reverts correctly on error.
- Network calls hit your .NET endpoint in dev.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 7 – Integration + Optimistic UI.  
Code Files Referenced: `features/cryptocurrency-detail/components/AddToCryptoWatchlist.tsx`, `hooks/useWatchlist.tsx`, `apis/index.ts`.  
Expected Functionality: Optimistic UI; FE ↔ .NET integration; basic tests/docs included.  
Acceptance Criteria: Verified UI behavior; API and DB checks pass; screenshots attached.  
Evidence Provided: PR link; logs; screenshots; Postman tests.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


