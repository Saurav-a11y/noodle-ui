## Task 3 – Currency Detail Page Testing (Charts, Metrics & Interactions)

### Focus
Test currency detail page components including Community Health Score, Market Metrics, correlation charts, and interactive elements.

### Getting started

1. **Navigate to a currency detail page**
   - Go to `/stablecoins` page
   - Click on any stablecoin (e.g., "Tether USDt")
   - Observe the detail page structure
   - Note all interactive elements

2. **Create BDD test scenarios**
   
   Create file: `test-evidence/task3-detail-page/bdd-scenarios.feature`
   
   ```gherkin
   Feature: Currency Detail Page
     As a user
     I want to view detailed information about a currency
     So that I can make informed decisions
   
   Background:
     Given I am on the Stablecoins list page
     When I click on "Tether USDt"
     Then I should be on the currency detail page
   
   Scenario: Community Health Score displays correctly
     Then I should see the Community Health Score
     And the score should be a number between 0 and 100
     And the score should have a visual indicator
   
   Scenario: Authentic Engagement indicator
     Then I should see "Authentic Engagement" section
     And it should show either "Low or Artificial" or a positive indicator
     And it should have an info icon with tooltip
   
   Scenario: Community Growth displays
     Then I should see "Community Growth" percentage
     And the percentage should be formatted correctly (e.g., "0%")
     And it should have an upward or downward trend indicator
   
   Scenario: Recent Activity Drop indicator
     Then I should see "Recent Activity Drop" section
     And it should show a percentage (e.g., "0%")
     And it should have a warning icon if activity dropped
   
   Scenario: Whale Activity indicator
     Then I should see "Whale Activity" section
     And it should show status (e.g., "No significant activity")
     And it should have an appropriate icon
   
   Scenario: Market Metrics display
     Then I should see "Market Metrics" section
     And it should display:
       | Metric              |
       | Market Cap          |
       | FDV                 |
       | Volume (24h)        |
       | Vol/Mkt Cap (24h)   |
       | Total Supply        |
       | Max Supply          |
       | Circulating Supply  |
     And all values should be formatted with proper units
   
   Scenario: Correlation chart loads
     Then I should see "Social Activity vs On-Chain Behavior Correlation" chart
     And the chart should display candlestick data
     And the chart should have time range controls (1D, 3D, 7D, 1M, 3M, 1Y)
     And the default time range should be "3M"
   
   Scenario: Change chart time range
     Given the correlation chart is loaded
     When I click on "7D" button
     Then the chart should update to show 7 days of data
     And the "7D" button should be highlighted
     And the API should be called with appropriate time parameters
   
   Scenario: Chart hover interaction
     Given the correlation chart is loaded
     When I hover over a candlestick
     Then I should see a tooltip with:
       | Data Point    |
       | Date/Time     |
       | Open price    |
       | Close price   |
       | High price    |
       | Low price     |
       | Volume        |
   
   Scenario: Best Yields table displays
     Then I should see "Best yields for USD1" section
     And the table should have columns:
       | Column      |
       | #           |
       | Project     |
       | Chain       |
       | APY         |
       | TVL (USD)   |
     And at least one yield opportunity should be listed
   
   Scenario: Watchlist button functionality
     Then I should see "Add to Watchlist" button
     When I click the watchlist button
     Then the button should show loading state
     And the button should change to "Added" or similar confirmation
   ```

3. **Manual test execution**
   
   Create file: `test-evidence/task3-detail-page/manual-test-results.md`
   
   Execute each scenario and document results with screenshots.

4. **Set up Postman API tests for detail page**
   
   Create collection: "Task 3 - Currency Detail APIs"
   
   **Test 1: Get currency overview**
   ```
   GET http://localhost:3000/noodle/community-overview?communityId=tether-usdt
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response has community health score", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('communityHealthScore');
       pm.expect(jsonData.communityHealthScore).to.be.a('number');
       pm.expect(jsonData.communityHealthScore).to.be.within(0, 100);
   });
   
   pm.test("Response has market metrics", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('marketCap');
       pm.expect(jsonData).to.have.property('volume24h');
   });
   ```
   
   **Test 2: Get price history for chart**
   ```
   GET http://localhost:3000/noodle/price-history?symbol=USDT&interval=1d&type=stablecoin
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response has price data array", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('data');
       pm.expect(jsonData.data).to.be.an('array');
   });
   
   pm.test("Price data has required fields", function () {
       var jsonData = pm.response.json();
       if (jsonData.data.length > 0) {
           var firstItem = jsonData.data[0];
           pm.expect(firstItem).to.have.property('timestamp');
           pm.expect(firstItem).to.have.property('open');
           pm.expect(firstItem).to.have.property('close');
           pm.expect(firstItem).to.have.property('high');
           pm.expect(firstItem).to.have.property('low');
       }
   });
   ```
   
   **Test 3: Get best yields**
   ```
   GET http://localhost:3000/noodle/best-yields?symbol=USDT
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response has yields array", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('array');
   });
   
   pm.test("Yield data has required fields", function () {
       var jsonData = pm.response.json();
       if (jsonData.length > 0) {
           var firstYield = jsonData[0];
           pm.expect(firstYield).to.have.property('project');
           pm.expect(firstYield).to.have.property('chain');
           pm.expect(firstYield).to.have.property('apy');
           pm.expect(firstYield).to.have.property('tvl');
       }
   });
   ```
   
   **Test 4: Chart time range parameters**
   ```
   GET http://localhost:3000/noodle/price-history?symbol=USDT&interval=1h&startTime={{timestamp_7d_ago}}&endTime={{timestamp_now}}&type=stablecoin
   
   Tests:
   pm.test("Time range parameters work", function () {
       pm.response.to.have.status(200);
       var jsonData = pm.response.json();
       pm.expect(jsonData.data).to.be.an('array');
   });
   ```

5. **Test chart interactions**
   
   Create file: `test-evidence/task3-detail-page/chart-interactions.md`
   
   Test and document:
   - [ ] Click each time range button (1D, 3D, 7D, 1M, 3M, 1Y)
   - [ ] Verify chart updates for each time range
   - [ ] Check Network tab for API calls with correct parameters
   - [ ] Test chart zoom (if available)
   - [ ] Test chart pan/scroll (if available)
   - [ ] Test hover tooltips
   - [ ] Test chart responsiveness (resize browser window)
   - [ ] Take screenshots of each time range view

6. **Validate data accuracy**
   
   Create file: `test-evidence/task3-detail-page/data-validation.md`
   
   ```markdown
   # Data Validation
   
   ## Community Health Score
   - **UI Display:** [X]
   - **API Response:** [X]
   - **Match:** ✅ Yes / ❌ No
   - **Notes:** [Any discrepancies]
   
   ## Market Cap
   - **UI Display:** $2.83B
   - **API Response:** [Check API]
   - **Formatting:** Correct / Incorrect
   - **Notes:** [Any issues]
   
   ## Volume (24h)
   - **UI Display:** $303.80M
   - **API Response:** [Check API]
   - **Match:** ✅ Yes / ❌ No
   
   [Continue for all metrics...]
   ```

7. **Test error states**
   
   Test and document:
   - [ ] Invalid currency ID in URL
   - [ ] Currency with no chart data
   - [ ] API timeout (simulate with slow network)
   - [ ] Chart fails to load
   - [ ] Best yields API returns empty
   - [ ] Network offline

8. **Accessibility testing**
   
   Create file: `test-evidence/task3-detail-page/accessibility-notes.md`
   
   Test:
   - [ ] Keyboard navigation through all interactive elements
   - [ ] Tab order is logical
   - [ ] Focus indicators visible
   - [ ] Info icons have tooltips
   - [ ] Chart has alt text or aria labels
   - [ ] Color contrast meets WCAG standards (use browser tools)
   - [ ] Screen reader compatibility (basic test)

9. **Performance testing**
   
   Measure and document:
   - Page load time
   - Chart render time
   - API response times
   - Time to interactive
   
   Create file: `test-evidence/task3-detail-page/performance-metrics.md`

10. **Cross-browser testing**
    
    Test on:
    - [ ] Chrome
    - [ ] Firefox
    - [ ] Safari (if on Mac)
    - [ ] Edge
    
    Document any browser-specific issues

### Repo Paths
- `app/cryptocurrencies/[slug]/page.tsx` (or similar detail page)
- `features/currency-detail/components/CommunityMetrics.tsx`
- `features/currency-detail/components/MarketInfoCard.tsx`
- `features/currency-detail/components/SocialChart.tsx`
- `features/currency-detail/components/AddToCryptoWatchlist.tsx`
- `hooks/useAssetOverviewData.tsx`

### Deliverables
- [ ] BDD scenarios file (Gherkin format)
- [ ] Manual test execution results
- [ ] Postman collection with 4+ API tests
- [ ] Chart interactions test report
- [ ] Data validation document
- [ ] Error states test results
- [ ] Accessibility notes
- [ ] Performance metrics
- [ ] Cross-browser test results
- [ ] Screenshots for each major component
- [ ] Test summary report

### Acceptance Criteria
- All BDD scenarios executed and documented
- Chart time range controls tested with API parameter validation
- Data accuracy verified between UI and API
- Error states tested and documented
- Accessibility smoke test completed
- Performance metrics captured
- At least 2 browsers tested
- Test report includes pass/fail summary with evidence

### Estimated Time
10-12 hours

