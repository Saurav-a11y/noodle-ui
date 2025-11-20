## Task 2 – Add Search Filter to Stablecoins List

### Focus
Add search/filter functionality to the stablecoins list; wire to API params.

### Getting started

1. **Review existing code**
   - Open `features/stablecoins/StableCoinsTable.tsx`
   - Open `hooks/stablecoins/useStablecoinsList.tsx`
   - Open `app/api/stablecoins/list/route.ts`
   - Note: The API route already accepts a `q` parameter for search

2. **Add search input to UI**
   - In `features/stablecoins/StableCoinsTable.tsx` (or create a parent wrapper component):
   - Add a text input field above the table
   - Label it "Search stablecoins..." or similar
   - Use React state to manage the search value:
     ```tsx
     const [searchQuery, setSearchQuery] = useState('')
     ```

3. **Debounce the search input**
   - Use the existing `useDebounce` hook from `lib/useDebounce.tsx`
   - Debounce the search query to avoid excessive API calls:
     ```tsx
     const debouncedSearch = useDebounce(searchQuery, 500) // 500ms delay
     ```

4. **Wire search to the API hook**
   - Update the hook call to pass the debounced search value:
     ```tsx
     const { data, isLoading } = useStablecoinsList({ 
       q: debouncedSearch,
       limit: 20,
       page: 1 
     })
     ```
   - Ensure the hook passes the `q` parameter to the API endpoint

5. **Update the API route (if needed)**
   - Verify `app/api/stablecoins/list/route.ts` correctly forwards the `q` param
   - The route should already handle this, but confirm the query string is built correctly

6. **Add clear button (optional enhancement)**
   - Add a small "X" button next to the search input
   - Clicking it clears the search: `setSearchQuery('')`

7. **Test the feature**
   - Type in the search box → Verify API request includes `q` parameter (check Network tab)
   - Verify table updates with filtered results
   - Clear search → Verify full list returns
   - Test with no results → Verify empty state shows (from Task 1)

8. **Document changes**
   - Create `docs/task2-search-filter.md`:
     - Explain how search works (debounce → hook → API)
     - Screenshot of search in action
     - Note any edge cases handled

### Repo Paths
- `features/stablecoins/StableCoinsTable.tsx`
- `hooks/stablecoins/useStablecoinsList.tsx`
- `app/api/stablecoins/list/route.ts`
- `lib/useDebounce.tsx`

### Deliverables
- PR with search functionality
- Search input styled consistently with existing UI
- Documentation explaining the implementation

### Acceptance Criteria
- Search input visible and functional
- API requests include `q` parameter with debounced value
- Table updates with filtered results
- No console errors or warnings
- Empty state shows when no results match search

