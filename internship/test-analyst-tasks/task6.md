## Task 6 – Watchlist Feature E2E Testing (UI + API + Database)

### Focus
Test watchlist functionality end-to-end including UI interactions, API calls, SQL Server data, and MongoDB activity logs.

### Getting started

1. **Prerequisites**
   - Ensure .NET microservice is running (from Software Developer Task 6)
   - SQL Server accessible
   - MongoDB accessible
   - Postman ready
   - SQL client installed (SSMS or Azure Data Studio)
   - MongoDB Compass installed

2. **Create BDD test scenarios**
   
   Create file: `test-evidence/task6-watchlist-e2e/bdd-scenarios.feature`
   
   ```gherkin
   Feature: Watchlist Management
     As a user
     I want to manage my watchlist
     So that I can track my favorite currencies
   
   Background:
     Given I am logged in
     And the .NET microservice is running
   
   Scenario: Add currency to watchlist from detail page
     Given I am on a currency detail page
     When I click the "Add to Watchlist" button
     Then the button should show loading state
     And I should see success message
     And the button should change to "Added" or show checkmark
     And the currency should appear in my watchlist
   
   Scenario: Verify SQL Server record created
     Given I have added a currency to watchlist
     When I query the Holdings table in SQL Server
     Then I should see a new row with:
       | Field | Expected |
       | UserId | My user ID |
       | AssetId | Currency ID |
       | AssetType | "stablecoin" |
       | HoldingsAmount | Default value |
       | CreatedAt | Recent timestamp |
   
   Scenario: Verify MongoDB activity log created
     Given I have added a currency to watchlist
     When I query user_activity_logs collection in MongoDB
     Then I should see a new document with:
       | Field | Expected |
       | userId | My user ID |
       | activity | "Watchlist_Add" |
       | assetType | "stablecoin" |
       | assetId | Currency ID |
       | createdAt | Recent timestamp |
   
   Scenario: Update holdings amount
     Given I have a currency in my watchlist
     When I update the holdings amount to 1000
     Then the API should return success
     And the SQL Server row should be updated
     And MongoDB should log "Watchlist_Update" activity
   
   Scenario: Idempotent add (no duplicates)
     Given I have already added a currency to watchlist
     When I try to add the same currency again
     Then the API should update the existing record
     And there should still be only one row in SQL Server
     And MongoDB should log the activity
   
   Scenario: Remove currency from watchlist
     Given I have a currency in my watchlist
     When I click "Remove from Watchlist"
     Then I should see confirmation dialog
     And when I confirm, the currency should be removed
     And the SQL Server row should be deleted
     And MongoDB should log "Watchlist_Remove" activity
   
   Scenario: View watchlist page
     Given I have multiple currencies in my watchlist
     When I navigate to the watchlist page
     Then I should see all my watchlisted currencies
     And each should display current price
     And each should show my holdings amount
   
   Scenario: Optimistic UI update
     Given I am on a currency detail page
     When I click "Add to Watchlist"
     Then the UI should update immediately
     And the button should change state before API responds
     And if API fails, the UI should rollback
   
   Scenario: Network error handling
     Given the .NET API is unavailable
     When I try to add to watchlist
     Then I should see error message
     And the UI should not show as added
     And no database changes should occur
   ```

3. **Set up database access**
   
   **SQL Server connection:**
   - Server: localhost
   - Database: NoodlesDb
   - Authentication: Windows/SQL Server
   
   **MongoDB connection:**
   - URI: mongodb://localhost:27017
   - Database: noodles
   - Collection: user_activity_logs

4. **Create SQL validation queries**
   
   Create file: `test-evidence/task6-watchlist-e2e/sql-queries.sql`
   
   ```sql
   -- Check if Holdings table exists
   SELECT * FROM INFORMATION_SCHEMA.TABLES 
   WHERE TABLE_NAME = 'Holdings';
   
   -- View all holdings
   SELECT * FROM Holdings 
   ORDER BY CreatedAt DESC;
   
   -- Check holdings for specific user
   SELECT * FROM Holdings 
   WHERE UserId = 'test-user-123'
   ORDER BY CreatedAt DESC;
   
   -- Verify no duplicates
   SELECT UserId, AssetId, AssetType, COUNT(*) as Count
   FROM Holdings
   GROUP BY UserId, AssetId, AssetType
   HAVING COUNT(*) > 1;
   
   -- Check recent additions
   SELECT * FROM Holdings
   WHERE CreatedAt >= DATEADD(MINUTE, -5, GETDATE())
   ORDER BY CreatedAt DESC;
   
   -- Verify holdings amount
   SELECT UserId, AssetId, HoldingsAmount, UpdatedAt
   FROM Holdings
   WHERE UserId = 'test-user-123'
   AND AssetId = 'tether-usdt';
   
   -- Check API request logs
   SELECT TOP 10 * FROM ApiRequestLog
   WHERE Endpoint LIKE '%watchlist%'
   ORDER BY RequestTimestamp DESC;
   ```

5. **Create MongoDB validation queries**
   
   Create file: `test-evidence/task6-watchlist-e2e/mongodb-queries.js`
   
   ```javascript
   // Switch to noodles database
   use noodles
   
   // View all activity logs
   db.user_activity_logs.find().sort({createdAt: -1}).limit(10)
   
   // Check watchlist activities for specific user
   db.user_activity_logs.find({
     userId: "test-user-123",
     activity: {$in: ["Watchlist_Add", "Watchlist_Update", "Watchlist_Remove"]}
   }).sort({createdAt: -1})
   
   // Verify recent watchlist additions
   db.user_activity_logs.find({
     activity: "Watchlist_Add",
     createdAt: {$gte: new Date(Date.now() - 5*60*1000)}
   }).sort({createdAt: -1})
   
   // Check activity for specific asset
   db.user_activity_logs.find({
     assetId: "tether-usdt",
     activity: {$regex: /Watchlist/}
   }).sort({createdAt: -1})
   
   // Count activities by type
   db.user_activity_logs.aggregate([
     {$match: {activity: {$regex: /Watchlist/}}},
     {$group: {_id: "$activity", count: {$sum: 1}}},
     {$sort: {count: -1}}
   ])
   ```

6. **Manual E2E test execution**
   
   Create file: `test-evidence/task6-watchlist-e2e/e2e-test-results.md`
   
   For each test:
   1. Perform UI action
   2. Capture screenshot
   3. Check Network tab for API call
   4. Query SQL Server for data
   5. Query MongoDB for activity log
   6. Document all findings
   
   Template:
   ```markdown
   # E2E Test Execution Results
   
   ## Test 1: Add to Watchlist
   
   ### UI Action
   - **Page:** Currency detail (USDT)
   - **Action:** Clicked "Add to Watchlist" button
   - **Result:** ✅ Success message shown
   - **Screenshot:** ui-add-to-watchlist.png
   
   ### API Call
   - **Endpoint:** POST /api/watchlist/holdings
   - **Status:** 200 OK
   - **Response time:** 234ms
   - **Request body:**
     ```json
     {
       "userId": "test-user-123",
       "assetId": "tether-usdt",
       "assetType": "stablecoin",
       "holdings": 0
     }
     ```
   - **Screenshot:** network-tab-watchlist-add.png
   
   ### SQL Server Verification
   - **Query executed:** SELECT * FROM Holdings WHERE UserId = 'test-user-123' AND AssetId = 'tether-usdt'
   - **Result:** ✅ Row found
   - **Data:**
     | Field | Value |
     |-------|-------|
     | HoldingId | 1 |
     | UserId | test-user-123 |
     | AssetId | tether-usdt |
     | AssetType | stablecoin |
     | HoldingsAmount | 0 |
     | CreatedAt | 2025-01-15 10:30:45 |
   - **Screenshot:** sql-holdings-row.png
   
   ### MongoDB Verification
   - **Query executed:** db.user_activity_logs.find({userId: "test-user-123", activity: "Watchlist_Add"})
   - **Result:** ✅ Document found
   - **Data:**
     ```json
     {
       "_id": ObjectId("..."),
       "userId": "test-user-123",
       "activity": "Watchlist_Add",
       "assetType": "stablecoin",
       "assetId": "tether-usdt",
       "content": "Holdings: 0",
       "createdAt": ISODate("2025-01-15T10:30:45.123Z")
     }
     ```
   - **Screenshot:** mongodb-activity-log.png
   
   ### Overall Status
   ✅ PASS - All verifications successful
   ```

7. **Test Postman with .NET endpoint**
   
   Create collection: "Task 6 - Watchlist E2E"
   
   **Test 1: Add to watchlist**
   ```
   POST http://localhost:5000/api/watchlist/holdings
   Headers:
     Content-Type: application/json
   
   Body:
   {
     "userId": "test-user-123",
     "assetId": "tether-usdt",
     "assetType": "stablecoin",
     "holdings": 100
   }
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response indicates success", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData.success).to.be.true;
   });
   
   // Wait a moment then verify SQL
   setTimeout(function() {
       // Manual SQL verification step
   }, 1000);
   ```
   
   **Test 2: Update holdings**
   ```
   POST http://localhost:5000/api/watchlist/holdings
   Body:
   {
     "userId": "test-user-123",
     "assetId": "tether-usdt",
     "assetType": "stablecoin",
     "holdings": 500
   }
   
   Tests:
   pm.test("Update returns success", function () {
       pm.response.to.have.status(200);
       var jsonData = pm.response.json();
       pm.expect(jsonData.action).to.equal("updated");
   });
   ```
   
   **Test 3: Get holdings**
   ```
   GET http://localhost:5000/api/watchlist/holdings/test-user-123
   
   Tests:
   pm.test("Returns user holdings", function () {
       pm.response.to.have.status(200);
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('array');
   });
   ```

8. **Test idempotency**
   
   Create file: `test-evidence/task6-watchlist-e2e/idempotency-test.md`
   
   Test:
   1. Add same currency to watchlist 3 times
   2. Query SQL Server
   3. Verify only 1 row exists
   4. Verify UpdatedAt timestamp changed
   5. Query MongoDB
   6. Verify 3 activity logs exist (1 Add, 2 Updates)

9. **Test error scenarios**
   
   Test and document:
   - [ ] Add to watchlist with invalid user ID
   - [ ] Add to watchlist with invalid asset ID
   - [ ] Add to watchlist with negative holdings
   - [ ] Add to watchlist when SQL Server is down
   - [ ] Add to watchlist when MongoDB is down
   - [ ] Add to watchlist when .NET API is down
   - [ ] Concurrent adds from multiple tabs

10. **Create E2E test report**
    
    Create file: `test-evidence/task6-watchlist-e2e/e2e-test-report.md`
    
    Include:
    - Summary of all E2E scenarios
    - UI screenshots
    - Network tab screenshots
    - SQL query results with screenshots
    - MongoDB query results with screenshots
    - Issues found
    - Recommendations

### Repo Paths
- `features/currency-detail/components/AddToCryptoWatchlist.tsx`
- `hooks/useWatchlist.tsx`
- `apis/index.ts`
- `server-dotnet/NoodlesApi/Controllers/WatchlistController.cs` (from Dev Task 6)
- SQL Server: `NoodlesDb.Holdings` table
- MongoDB: `noodles.user_activity_logs` collection

### Deliverables
- [ ] BDD scenarios file (Gherkin format)
- [ ] E2E test execution results with screenshots
- [ ] SQL validation queries file
- [ ] MongoDB validation queries file
- [ ] SQL query results (screenshots)
- [ ] MongoDB query results (screenshots)
- [ ] Postman collection for .NET endpoints
- [ ] Idempotency test results
- [ ] Error scenario test results
- [ ] E2E test report

### Acceptance Criteria
- All BDD scenarios executed and documented
- UI actions verified with screenshots
- API calls verified in Network tab
- SQL Server data verified with queries and screenshots
- MongoDB logs verified with queries and screenshots
- Idempotency tested and confirmed
- Error scenarios tested
- E2E test report is comprehensive with evidence

### Estimated Time
14-16 hours

