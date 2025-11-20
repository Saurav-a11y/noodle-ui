## Task 3 – Add Table Sorting to Stablecoins List

### Focus
Add sorting (ascending/descending) for key columns in the stablecoins table.

### Getting started

1. **Review the table structure**
   - Open `features/stablecoins/StableCoinsTable.tsx`
   - Identify sortable columns (e.g., Name, Market Cap, Price, Change %)
   - Note the current data structure returned by the API

2. **Add sort state management**
   - Add React state to track sort column and direction:
     ```tsx
     const [sortColumn, setSortColumn] = useState<string | null>(null)
     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
     ```

3. **Make column headers clickable**
   - Update table header cells to be clickable
   - Add onClick handler to toggle sort:
     ```tsx
     const handleSort = (column: string) => {
       if (sortColumn === column) {
         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
       } else {
         setSortColumn(column)
         setSortDirection('asc')
       }
     }
     ```

4. **Add visual indicators**
   - Show sort direction with arrows (▲ ▼) or icons
   - Use existing icons from `icons/` folder (e.g., `ArrowUp.tsx`, `ArrowDown.tsx`)
   - Highlight the currently sorted column
   - Example:
     ```tsx
     <th onClick={() => handleSort('marketCap')}>
       Market Cap
       {sortColumn === 'marketCap' && (
         sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />
       )}
     </th>
     ```

5. **Implement client-side sorting**
   - Sort the data array before rendering:
     ```tsx
     const sortedData = useMemo(() => {
       if (!sortColumn || !data) return data
       
       return [...data].sort((a, b) => {
         const aVal = a[sortColumn]
         const bVal = b[sortColumn]
         
         if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
         if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
         return 0
       })
     }, [data, sortColumn, sortDirection])
     ```

6. **Handle different data types**
   - Numbers: Direct comparison
   - Strings: Use `localeCompare` for case-insensitive sorting
   - Null/undefined: Handle gracefully (put at end)

7. **Optional: Server-side sorting**
   - If the API supports `sortBy` and `order` parameters:
   - Pass sort params to the API hook
   - Update `app/api/stablecoins/list/route.ts` to forward these params
   - This is optional; client-side sorting is sufficient for this task

8. **Test thoroughly**
   - Click each sortable column → Verify rows reorder correctly
   - Click same column twice → Verify direction toggles (asc ↔ desc)
   - Test with edge cases: null values, equal values, mixed types
   - Verify sorting works with search filter (from Task 2)

9. **Document the feature**
   - Create `docs/task3-table-sorting.md`:
     - Explain sort logic (client-side vs. server-side)
     - List sortable columns
     - Screenshot showing sort indicators

### Repo Paths
- `features/stablecoins/StableCoinsTable.tsx`
- `icons/ArrowUp.tsx`
- `icons/ArrowDown.tsx`

### Deliverables
- PR with sorting functionality
- Visual indicators for sort column and direction
- Documentation explaining implementation

### Acceptance Criteria
- Clicking column headers sorts the table
- Sort direction toggles on repeated clicks
- Visual indicators (arrows/icons) show current sort state
- Sorting works correctly for all data types (numbers, strings)
- No console errors or warnings
- Sorting works alongside search filter (if Task 2 completed)

