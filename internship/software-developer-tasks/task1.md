## Task 1 – Onboarding & UI Polish

### Focus

Run the app locally; map data flow `apis/index.ts` → hooks → components; add loading/empty states.

### Getting started

1. Prereqs

   - Install Node.js 18+ (use `nvm use` if `.nvmrc` exists).
   - Ensure Git and a package manager (`npm` preferred) are available.

2. Install and run (dev)

   - From the repo root:
     ```bash
     npm i
     npm run dev
     ```
   - Open the app in your browser (default `http://localhost:3000`).
   - Navigate to:
     - Stablecoin list
     - Any Stablecoin detail page

3. Build check (confidence)

   - Ensure the project builds successfully:
     ```bash
     npm run build
     npm run start
     ```
   - Verify the same two pages render without console errors.

4. Add minimal UI polish (loading/empty states)

   - Choose ONE list/detail UI you just verified:
     - Option A: `features/stablecoins/StableCoinsTable.tsx`
     - Option B: `features/stablecoins/MostTalkedAboutStablecoins.tsx` (or `TopGrowthStablecoins.tsx`)
   - Add:
     - A visible loading indicator while data is fetching (e.g., spinner/skeleton/text)
     - An empty state when result sets are 0 items (short helpful message)
   - Keep styling consistent with existing components (reuse existing styles/components if present).

5. Document the data flow (short note)

   - Add a Markdown file alongside your PR description or in `docs/`:
     - Show how the screen’s hook calls a function in `apis/index.ts`
     - Which endpoint(s) it uses
     - Where loading/empty states were added and why

6. Commit and PR
   - Branch name: `intern/<your-name>/task1-onboarding-ui-polish`
   - Include screenshots for:
     - Loading state
     - Empty state
     - Successful build output (terminal)
   - Keep the diff small and focused.

### Repo Paths

- `apis/index.ts`
- `features/stablecoins/StableCoinsTable.tsx`
- `features/stablecoins/MostTalkedAboutStablecoins.tsx`

### Deliverables

- PR with loading/empty states (no UX regressions).
- Architecture note (Markdown) describing data paths used next weeks.

### Acceptance Criteria

- Loading/empty states render correctly; no console errors.
- No changes to API response assumptions.
- `npm run build` completes without errors; `npm run start` serves pages successfully.

### AI Verification Prompt

You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 1 – Onboarding & UI Polish.  
Code Files Referenced: `apis/index.ts`, component files above.  
Expected Functionality: Non-intrusive loading/empty states.  
Acceptance Criteria: Successful build (`npm run build`/`start`), correct rendering, zero console errors, architecture note attached.  
Evidence Provided: Screenshots/GIFs; PR link.  
Evaluate: functionality, code quality, DB safety (N/A), documentation, suggestions + confidence score.  
Return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨
