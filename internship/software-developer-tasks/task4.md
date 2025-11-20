## Task 4 – API Route Hardening (Input Validation & Error Handling)

### Focus
Add input validation and standardized error responses to the stablecoins list API route.

### Getting started

1. **Review the current API route**
   - Open `app/api/stablecoins/list/route.ts`
   - Note: Currently minimal validation exists
   - Identify potential issues:
     - Invalid `limit` values (negative, non-numeric, too large)
     - Invalid `page` values (negative, non-numeric)
     - Malformed `q` search query (SQL injection risk if passed to DB)

2. **Add input validation**
   - Create a validation function at the top of the file:
     ```typescript
     function validateParams(searchParams: URLSearchParams) {
       const errors: string[] = []
       
       const limit = searchParams.get('limit')
       const page = searchParams.get('page')
       const q = searchParams.get('q')
       
       // Validate limit
       if (limit) {
         const limitNum = parseInt(limit, 10)
         if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
           errors.push('limit must be a number between 1 and 100')
         }
       }
       
       // Validate page
       if (page) {
         const pageNum = parseInt(page, 10)
         if (isNaN(pageNum) || pageNum < 1) {
           errors.push('page must be a positive number')
         }
       }
       
       // Validate search query length
       if (q && q.length > 200) {
         errors.push('search query too long (max 200 characters)')
       }
       
       return errors
     }
     ```

3. **Return 400 Bad Request for invalid input**
   - Update the GET handler:
     ```typescript
     export async function GET(req: NextRequest) {
       const { searchParams } = new URL(req.url)
       
       // Validate inputs
       const errors = validateParams(searchParams)
       if (errors.length > 0) {
         return NextResponse.json(
           { 
             error: 'Invalid request parameters',
             details: errors 
           },
           { status: 400 }
         )
       }
       
       // ... rest of existing code
     }
     ```

4. **Standardize error response format**
   - Create a helper function for consistent error responses:
     ```typescript
     function errorResponse(message: string, status: number, details?: string[]) {
       return NextResponse.json(
         {
           error: message,
           ...(details && { details }),
           timestamp: new Date().toISOString()
         },
         { status }
       )
     }
     ```

5. **Add try-catch for upstream API errors**
   - Wrap the fetch call in try-catch:
     ```typescript
     try {
       const res = await fetch(url, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
         cache: 'no-store',
       })
       
       if (!res.ok) {
         return errorResponse(
           'Failed to fetch stablecoins from upstream API',
           res.status
         )
       }
       
       const data = await res.json()
       return NextResponse.json(data)
     } catch (error) {
       console.error('Stablecoins API error:', error)
       return errorResponse(
         'Internal server error',
         500,
         ['Unable to connect to data service']
       )
     }
     ```

6. **Add request logging (optional)**
   - Log incoming requests for debugging:
     ```typescript
     console.log(`[Stablecoins API] ${req.method} ${req.url}`)
     ```

7. **Test validation thoroughly**
   - Test invalid inputs:
     - `/api/stablecoins/list?limit=-5` → 400 error
     - `/api/stablecoins/list?limit=abc` → 400 error
     - `/api/stablecoins/list?limit=1000` → 400 error (exceeds max)
     - `/api/stablecoins/list?page=0` → 400 error
     - `/api/stablecoins/list?q=[very long string]` → 400 error
   - Test valid inputs:
     - `/api/stablecoins/list?limit=20&page=1&q=usdc` → 200 success
   - Verify error response format is consistent

8. **Update frontend to handle errors**
   - In the hook (`hooks/stablecoins/useStablecoinsList.tsx`):
   - Display user-friendly error messages
   - Example:
     ```tsx
     if (error) {
       toast.error('Failed to load stablecoins. Please try again.')
     }
     ```

9. **Document the changes**
   - Create `docs/task4-api-validation.md`:
     - List all validation rules
     - Show example error responses
     - Document error status codes (400, 500)

### Repo Paths
- `app/api/stablecoins/list/route.ts`
- `hooks/stablecoins/useStablecoinsList.tsx` (for error handling)

### Deliverables
- PR with input validation and error handling
- Consistent error response format
- Documentation of validation rules

### Acceptance Criteria
- Invalid inputs return 400 Bad Request with clear error messages
- Valid inputs work as before (no regression)
- Error responses follow consistent format (error, details, timestamp)
- Frontend displays user-friendly error messages
- No console errors in happy path
- Documentation lists all validation rules

