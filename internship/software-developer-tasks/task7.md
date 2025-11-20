## Task 7 – Frontend Optimistic Updates & Integration

### Focus
Add optimistic UI updates to watchlist; ensure smooth UX while waiting for API response.

### Getting started

1. **Review current watchlist hook**
   - Open `hooks/useWatchlist.tsx`
   - Understand the current mutation flow
   - Note: Currently UI waits for API response before updating

2. **Implement optimistic update**
   - Update the `useAddToWatchlist` mutation:
     ```tsx
     export const useAddToWatchlist = () => {
       const queryClient = useQueryClient()
       
       return useMutation({
         mutationFn: async (params: {
           userId: string
           assetId: string
           assetType: string
           holdings: number
         }) => {
           return await upsertHoldingsApi(params)
         },
         
         // Optimistic update
         onMutate: async (newHolding) => {
           // Cancel outgoing refetches
           await queryClient.cancelQueries({ 
             queryKey: ['watchlist', newHolding.userId] 
           })
           
           // Snapshot previous value
           const previousWatchlist = queryClient.getQueryData([
             'watchlist', 
             newHolding.userId
           ])
           
           // Optimistically update cache
           queryClient.setQueryData(
             ['watchlist', newHolding.userId],
             (old: any) => {
               if (!old) return [newHolding]
               
               // Check if already exists
               const exists = old.some((item: any) => 
                 item.assetId === newHolding.assetId
               )
               
               if (exists) {
                 // Update existing
                 return old.map((item: any) =>
                   item.assetId === newHolding.assetId
                     ? { ...item, holdings: newHolding.holdings }
                     : item
                 )
               } else {
                 // Add new
                 return [...old, newHolding]
               }
             }
           )
           
           // Return context for rollback
           return { previousWatchlist }
         },
         
         // Rollback on error
         onError: (err, newHolding, context) => {
           queryClient.setQueryData(
             ['watchlist', newHolding.userId],
             context?.previousWatchlist
           )
           
           toast.error('Failed to update watchlist. Please try again.')
         },
         
         // Refetch on success
         onSuccess: (data, variables) => {
           queryClient.invalidateQueries({ 
             queryKey: ['watchlist', variables.userId] 
           })
           
           toast.success('Watchlist updated successfully!')
         }
       })
     }
     ```

3. **Add loading states**
   - Update the component that uses the hook:
     ```tsx
     const { mutate: addToWatchlist, isPending } = useAddToWatchlist()
     
     const handleAdd = () => {
       addToWatchlist({
         userId: user.id,
         assetId: asset.id,
         assetType: 'stablecoin',
         holdings: 100
       })
     }
     
     return (
       <button 
         onClick={handleAdd}
         disabled={isPending}
       >
         {isPending ? 'Adding...' : 'Add to Watchlist'}
       </button>
     )
     ```

4. **Add visual feedback**
   - Show a temporary "success" indicator immediately after click
   - Use a subtle animation or color change
   - Example with Framer Motion:
     ```tsx
     import { motion } from 'framer-motion'
     
     const [justAdded, setJustAdded] = useState(false)
     
     const handleAdd = () => {
       setJustAdded(true)
       addToWatchlist(params)
       
       setTimeout(() => setJustAdded(false), 2000)
     }
     
     return (
       <motion.button
         animate={{ scale: justAdded ? 1.05 : 1 }}
         className={justAdded ? 'bg-green-500' : 'bg-blue-500'}
       >
         {justAdded ? '✓ Added' : 'Add to Watchlist'}
       </motion.button>
     )
     ```

5. **Handle edge cases**
   - Network timeout: Show error after 10 seconds
   - Duplicate add: Prevent multiple clicks
   - Offline mode: Queue requests (optional advanced feature)

6. **Test the flow**
   - Click "Add to Watchlist" → UI updates immediately
   - Verify API call happens in background (Network tab)
   - Simulate slow network (Chrome DevTools → Network → Slow 3G)
   - Verify UI still feels instant
   - Simulate API error → Verify rollback works

7. **Add retry logic (optional)**
   - Retry failed requests automatically:
     ```tsx
     return useMutation({
       mutationFn: upsertHoldingsApi,
       retry: 2, // Retry up to 2 times
       retryDelay: 1000, // Wait 1 second between retries
       // ... rest of config
     })
     ```

8. **Collaborate with Test Analyst**
   - Share test scenarios:
     - Happy path: Add to watchlist succeeds
     - Error path: API returns 500, UI rolls back
     - Network timeout: Request takes >10s
   - Provide Postman collection for API testing
   - Document expected behavior in each scenario

9. **Collaborate with Data Analyst**
   - Verify SQL queries:
     ```sql
     -- Check holdings were created
     SELECT * FROM Holdings 
     WHERE UserId = 'test-user-123' 
     ORDER BY UpdatedAt DESC;
     ```
   - Verify MongoDB logs:
     ```javascript
     db.user_activity_logs.find({
       userId: 'test-user-123',
       activity: { $in: ['Watchlist_Add', 'Watchlist_Update'] }
     }).sort({ createdAt: -1 })
     ```
   - Share validation queries in documentation

10. **Create comprehensive documentation**
    - Create `docs/task7-optimistic-updates.md`:
      - Explain optimistic update pattern
      - Show code examples
      - List test scenarios
      - Include SQL/MongoDB validation queries
      - Screenshots/GIFs of UX flow

### Repo Paths
- `hooks/useWatchlist.tsx`
- `features/watchlist/*` (components using the hook)
- `docs/task7-optimistic-updates.md`

### Deliverables
- Optimistic UI updates implemented
- Error rollback working
- Visual feedback (loading states, success indicators)
- Documentation with test scenarios
- SQL/MongoDB validation queries

### Acceptance Criteria
- UI updates immediately on button click (no wait for API)
- API call happens in background
- On error, UI rolls back to previous state
- Toast notifications show success/error
- Slow network doesn't block UI
- Documentation includes test scenarios and validation queries
- Collaboration notes with Test/Data analysts included

