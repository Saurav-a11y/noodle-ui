## Task 2 – Stablecoins Search & Filter Testing (BDD + Postman)

### Focus
Test search and filter functionality using BDD scenarios (Gherkin), validate API parameters with Postman, and document findings.

### Getting started

1. **Review the Stablecoins page**
   - Navigate to `http://localhost:3001/stablecoins`
   - Identify search input field
   - Note any filter options (if present)
   - Observe table columns and data

2. **Create BDD test scenarios**
   
   Create file: `test-evidence/task2-search-filters/bdd-scenarios.feature`
   
   ```gherkin
   Feature: Stablecoins Search and Filter
     As a user
     I want to search and filter stablecoins
     So that I can find specific stablecoins quickly
   
   Background:
     Given I am on the Stablecoins page
     And the stablecoins list has loaded
   
   Scenario: Search for a specific stablecoin by name
     When I enter "USDT" in the search box
     Then I should see only stablecoins matching "USDT"
     And the table should update within 2 seconds
     And the URL should include "q=USDT" parameter
   
   Scenario: Search with partial match
     When I enter "USD" in the search box
     Then I should see all stablecoins containing "USD" in their name
     And results should include "USDT", "USDC", "USDS"
   
   Scenario: Search with no results
     When I enter "NONEXISTENTCOIN123" in the search box
     Then I should see "No results found" message
     And the table should be empty
   
   Scenario: Clear search
     Given I have searched for "USDT"
     And search results are displayed
     When I clear the search box
     Then I should see the full list of stablecoins
     And the URL should not include "q=" parameter
   
   Scenario: Search with special characters
     When I enter "USD@#$%" in the search box
     Then the search should handle special characters gracefully
     And no console errors should appear
   
   Scenario: Search debouncing
     When I type "U" then "S" then "D" then "T" quickly
     Then the API should not be called for each keystroke
     And only one API call should be made after I stop typing
   
   Scenario: Search persistence on page reload
     Given I have searched for "USDC"
     When I reload the page
     Then the search term "USDC" should still be in the search box
     And the filtered results should still be displayed
   ```

3. **Manual test execution**
   
   Create file: `test-evidence/task2-search-filters/manual-test-results.md`
   
   Execute each BDD scenario manually and document:
   
   ```markdown
   # Manual Test Execution - Search & Filters
   
   **Date:** [Date]
   **Tester:** [Your Name]
   **Environment:** Docker (localhost:3001)
   **Browser:** [Browser and version]
   
   ## Scenario 1: Search for a specific stablecoin by name
   - **Status:** ✅ Pass / ❌ Fail
   - **Steps executed:**
     1. Opened /stablecoins page
     2. Entered "USDT" in search box
     3. Observed results
   - **Actual result:** [Describe what happened]
   - **Response time:** ~X seconds
   - **URL parameter:** Present / Missing
   - **Screenshot:** scenario-1-search-usdt.png
   - **Notes:** [Any observations]
   
   [Repeat for each scenario...]
   ```

4. **Set up Postman API tests**
   
   Create collection: "Task 2 - Stablecoins Search & Filters"
   
   **Test 1: Basic search query**
   ```
   GET http://localhost:3000/noodle/stablecoins?q=USDT&limit=20&page=1
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response has data array", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('data');
       pm.expect(jsonData.data).to.be.an('array');
   });
   
   pm.test("Results contain search term", function () {
       var jsonData = pm.response.json();
       jsonData.data.forEach(function(item) {
           pm.expect(item.name.toUpperCase()).to.include('USDT');
       });
   });
   ```
   
   **Test 2: Search with limit parameter**
   ```
   GET http://localhost:3000/noodle/stablecoins?q=USD&limit=5&page=1
   
   Tests:
   pm.test("Response respects limit parameter", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData.data.length).to.be.at.most(5);
   });
   ```
   
   **Test 3: Search with pagination**
   ```
   GET http://localhost:3000/noodle/stablecoins?q=USD&limit=10&page=2
   
   Tests:
   pm.test("Pagination works correctly", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('page');
       pm.expect(jsonData.page).to.equal(2);
   });
   ```
   
   **Test 4: Empty search query**
   ```
   GET http://localhost:3000/noodle/stablecoins?q=&limit=20&page=1
   
   Tests:
   pm.test("Empty query returns all results", function () {
       pm.response.to.have.status(200);
       var jsonData = pm.response.json();
       pm.expect(jsonData.data).to.be.an('array');
       pm.expect(jsonData.data.length).to.be.greaterThan(0);
   });
   ```
   
   **Test 5: Invalid parameters**
   ```
   GET http://localhost:3000/noodle/stablecoins?q=USDT&limit=-5&page=0
   
   Tests:
   pm.test("Handles invalid parameters gracefully", function () {
       // Should return 400 or default to valid values
       pm.expect(pm.response.code).to.be.oneOf([200, 400]);
   });
   ```
   
   **Test 6: Special characters in search**
   ```
   GET http://localhost:3000/noodle/stablecoins?q=USD%40%23%24&limit=20&page=1
   
   Tests:
   pm.test("Handles special characters", function () {
       pm.response.to.have.status(200);
   });
   ```

5. **Validate API parameters in browser**
   - Open browser DevTools → Network tab
   - Perform search on UI
   - Find the API request
   - Verify query parameters:
     - `q` parameter matches search input
     - `limit` parameter is present
     - `page` parameter is present
   - Take screenshot of Network tab showing request
   - Save as: `test-evidence/task2-search-filters/network-tab-search-request.png`

6. **Test debouncing behavior**
   - Open Network tab
   - Type "USDT" character by character
   - Observe API calls
   - Expected: Only 1 API call after you stop typing (not 4 calls)
   - Document findings:
     ```markdown
     ## Debouncing Test
     - **Test:** Type "USDT" character by character
     - **Expected:** 1 API call after typing stops
     - **Actual:** [X] API calls observed
     - **Debounce delay:** ~[X]ms
     - **Screenshot:** debounce-test-network.png
     ```

7. **Test edge cases**
   
   Create file: `test-evidence/task2-search-filters/edge-cases.md`
   
   Test and document:
   - [ ] Very long search query (200+ characters)
   - [ ] Search with only spaces
   - [ ] Search with SQL injection attempt: `' OR '1'='1`
   - [ ] Search with XSS attempt: `<script>alert('test')</script>`
   - [ ] Search with emoji: `💰 USD`
   - [ ] Search with non-English characters: `USDT 中文`
   - [ ] Rapid search changes (type, delete, type again)
   - [ ] Search while page is still loading

8. **Performance testing**
   - Measure search response times
   - Test with different result set sizes
   - Document in: `test-evidence/task2-search-filters/performance-notes.md`
   
   ```markdown
   # Performance Notes
   
   ## Search Response Times
   | Search Term | Results Count | Response Time | Notes |
   |-------------|---------------|---------------|-------|
   | USDT        | 1             | ~Xms          |       |
   | USD         | 10            | ~Xms          |       |
   | (empty)     | 72            | ~Xms          |       |
   ```

9. **Accessibility smoke test**
   - Test keyboard navigation:
     - Tab to search input
     - Type search term
     - Tab to results
   - Test screen reader labels (if available)
   - Document findings

10. **Create test report**
    
    Create file: `test-evidence/task2-search-filters/test-report.md`
    
    ```markdown
    # Test Report - Stablecoins Search & Filters
    
    **Date:** [Date]
    **Tester:** [Your Name]
    
    ## Summary
    - Total scenarios: X
    - Passed: X
    - Failed: X
    - Blocked: X
    
    ## BDD Scenarios Results
    [Summary of each scenario]
    
    ## API Tests Results
    - Total Postman tests: X
    - Passed: X
    - Failed: X
    
    ## Issues Found
    [List any issues with severity and reproduction steps]
    
    ## Recommendations
    [Any suggestions for improvements]
    ```

### Repo Paths
- `app/stablecoins/page.tsx`
- `features/stablecoins/StableCoinsTable.tsx`
- `hooks/stablecoins/useStablecoinsList.tsx`
- `app/api/stablecoins/list/route.ts`
- `apis/index.ts`

### Deliverables
- [ ] BDD scenarios file (Gherkin format)
- [ ] Manual test execution results
- [ ] Postman collection with 6+ API tests
- [ ] Network tab screenshots showing API parameters
- [ ] Edge cases test results
- [ ] Performance notes
- [ ] Test report with summary
- [ ] Issues log (if any)

### Acceptance Criteria
- All BDD scenarios executed and documented
- Postman tests verify API parameters correctly
- Network tab screenshots show `q`, `limit`, `page` parameters
- Debouncing behavior verified
- Edge cases tested and documented
- Test report includes pass/fail summary
- Any issues found have clear reproduction steps

### Estimated Time
8-10 hours

