## Task 5 – API Testing & Documentation (Postman Advanced)

### Focus
Create comprehensive Postman collection with advanced tests, environment variables, test scripts, and API documentation.

### Getting started

1. **Review all API endpoints**
   - List all endpoints used in the application
   - Document request/response formats
   - Identify authentication requirements

2. **Set up Postman environment**
   
   Create environment: "Noodle - Docker Local"
   
   Variables:
   ```json
   {
     "base_url": "http://localhost:3000/noodle",
     "api_url": "http://localhost:3001/api",
     "auth_token": "",
     "user_id": "",
     "test_currency_id": "tether-usdt",
     "timestamp_now": "",
     "timestamp_7d_ago": ""
   }
   ```

3. **Create comprehensive API test collection**
   
   Collection structure:
   ```
   Noodle API Tests
   ├── 01 - Health & Status
   │   ├── Health Check
   │   └── API Status
   ├── 02 - Authentication
   │   ├── Login
   │   ├── Register
   │   ├── Refresh Token
   │   └── Logout
   ├── 03 - Stablecoins
   │   ├── List All Stablecoins
   │   ├── Search Stablecoins
   │   ├── Get Stablecoin Detail
   │   ├── Top Gaining Stablecoins
   │   ├── Most Talked About Stablecoins
   │   └── Filter by Parameters
   ├── 04 - Currency Detail
   │   ├── Get Community Overview
   │   ├── Get Price History
   │   ├── Get Best Yields
   │   ├── Get Social Data
   │   └── Get Market Metrics
   ├── 05 - User Profile
   │   ├── Get Profile
   │   ├── Update Profile
   │   ├── Upload Avatar
   │   └── Delete Avatar
   ├── 06 - Watchlist
   │   ├── Get Watchlist
   │   ├── Add to Watchlist
   │   ├── Update Holdings
   │   ├── Remove from Watchlist
   │   └── Check Watchlist Status
   ├── 07 - Charts & Analytics
   │   ├── Price History (1D)
   │   ├── Price History (7D)
   │   ├── Price History (1M)
   │   ├── Price History (3M)
   │   └── Correlation Data
   └── 08 - Negative Tests
       ├── Invalid Endpoints
       ├── Invalid Parameters
       ├── Missing Authentication
       ├── Malformed Requests
       └── Rate Limiting
   ```

4. **Write advanced Postman tests**
   
   **Example: List Stablecoins with comprehensive tests**
   ```javascript
   // Pre-request Script
   pm.environment.set("timestamp_now", Date.now());
   
   // Tests
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response time is less than 2000ms", function () {
       pm.expect(pm.response.responseTime).to.be.below(2000);
   });
   
   pm.test("Content-Type is application/json", function () {
       pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
   });
   
   pm.test("Response has required structure", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('object');
       pm.expect(jsonData).to.have.property('data');
       pm.expect(jsonData.data).to.be.an('array');
   });
   
   pm.test("Each stablecoin has required fields", function () {
       var jsonData = pm.response.json();
       jsonData.data.forEach(function(coin) {
           pm.expect(coin).to.have.property('id');
           pm.expect(coin).to.have.property('name');
           pm.expect(coin).to.have.property('symbol');
           pm.expect(coin).to.have.property('price');
           pm.expect(coin).to.have.property('marketCap');
       });
   });
   
   pm.test("Price values are numbers", function () {
       var jsonData = pm.response.json();
       jsonData.data.forEach(function(coin) {
           pm.expect(coin.price).to.be.a('number');
           pm.expect(coin.price).to.be.at.least(0);
       });
   });
   
   pm.test("Market cap values are valid", function () {
       var jsonData = pm.response.json();
       jsonData.data.forEach(function(coin) {
           pm.expect(coin.marketCap).to.be.a('number');
           pm.expect(coin.marketCap).to.be.at.least(0);
       });
   });
   
   pm.test("Pagination data present", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('page');
       pm.expect(jsonData).to.have.property('limit');
       pm.expect(jsonData).to.have.property('total');
   });
   
   // Save first coin ID for next requests
   var jsonData = pm.response.json();
   if (jsonData.data.length > 0) {
       pm.environment.set("test_currency_id", jsonData.data[0].id);
   }
   ```

5. **Create test scenarios for each endpoint category**
   
   Create file: `test-evidence/task5-api-testing/api-test-scenarios.md`
   
   ```markdown
   # API Test Scenarios
   
   ## Stablecoins Endpoints
   
   ### GET /stablecoins
   #### Happy Path Tests
   - [ ] Returns 200 with valid data
   - [ ] Returns array of stablecoins
   - [ ] Each stablecoin has required fields
   - [ ] Pagination works correctly
   - [ ] Default limit is 20
   
   #### Negative Tests
   - [ ] Invalid limit (negative) returns 400
   - [ ] Invalid page (0 or negative) returns 400
   - [ ] Limit exceeds maximum returns 400
   - [ ] Invalid query parameter returns 400
   
   #### Performance Tests
   - [ ] Response time < 2 seconds
   - [ ] Large limit (100) still performs well
   
   ### GET /stablecoins/:id
   #### Happy Path Tests
   - [ ] Returns 200 with valid ID
   - [ ] Returns complete stablecoin data
   - [ ] Community health score is present
   - [ ] Market metrics are present
   
   #### Negative Tests
   - [ ] Invalid ID returns 404
   - [ ] Non-existent ID returns 404
   - [ ] Malformed ID returns 400
   
   [Continue for all endpoints...]
   ```

6. **Test API error handling**
   
   Create dedicated folder in collection: "Negative Tests"
   
   Tests to create:
   - [ ] 404 - Endpoint not found
   - [ ] 400 - Invalid request body
   - [ ] 400 - Missing required parameters
   - [ ] 401 - Unauthorized (no token)
   - [ ] 403 - Forbidden (invalid token)
   - [ ] 405 - Method not allowed
   - [ ] 429 - Rate limit exceeded (if applicable)
   - [ ] 500 - Server error (simulate if possible)

7. **Create test data management**
   
   Create file: `test-evidence/task5-api-testing/test-data.json`
   
   ```json
   {
     "valid_stablecoins": [
       "tether-usdt",
       "usd-coin",
       "dai"
     ],
     "invalid_ids": [
       "nonexistent-coin",
       "12345",
       "test@#$%"
     ],
     "test_users": [
       {
         "email": "test1@example.com",
         "password": "Test123!@#"
       }
     ],
     "search_queries": {
       "valid": ["USDT", "USD", "Tether"],
       "invalid": ["", "   ", "<script>", "' OR '1'='1"]
     }
   }
   ```

8. **Run collection with Newman (CLI)**
   
   Install Newman:
   ```bash
   npm install -g newman
   ```
   
   Export collection and environment from Postman
   
   Run tests:
   ```bash
   newman run noodle-api-tests.json \
     -e noodle-docker-local.json \
     --reporters cli,html \
     --reporter-html-export test-evidence/task5-api-testing/newman-report.html
   ```
   
   Document results in: `test-evidence/task5-api-testing/newman-results.md`

9. **Create API documentation**
   
   Create file: `test-evidence/task5-api-testing/api-documentation.md`
   
   Template:
   ```markdown
   # Noodle API Documentation
   
   ## Base URL
   - Local: `http://localhost:3000/noodle`
   - Docker: `http://localhost:3001/api`
   
   ## Authentication
   - Type: Bearer Token
   - Header: `Authorization: Bearer {token}`
   
   ## Endpoints
   
   ### GET /stablecoins
   **Description:** Get list of stablecoins
   
   **Parameters:**
   | Name | Type | Required | Default | Description |
   |------|------|----------|---------|-------------|
   | q | string | No | "" | Search query |
   | limit | integer | No | 20 | Results per page |
   | page | integer | No | 1 | Page number |
   
   **Response:**
   ```json
   {
     "data": [
       {
         "id": "tether-usdt",
         "name": "Tether USDt",
         "symbol": "USDT",
         "price": 1.00,
         "marketCap": 184020283052,
         "volume24h": 135380872389
       }
     ],
     "page": 1,
     "limit": 20,
     "total": 72
   }
   ```
   
   **Status Codes:**
   - 200: Success
   - 400: Invalid parameters
   - 500: Server error
   
   [Continue for all endpoints...]
   ```

10. **Create test summary report**
    
    Create file: `test-evidence/task5-api-testing/test-summary.md`
    
    ```markdown
    # API Testing Summary Report
    
    **Date:** [Date]
    **Tester:** [Your Name]
    **Total Endpoints Tested:** X
    **Total Tests Executed:** X
    **Passed:** X
    **Failed:** X
    **Pass Rate:** X%
    
    ## Endpoints Coverage
    - Stablecoins: X/X tests passed
    - Currency Detail: X/X tests passed
    - User Profile: X/X tests passed
    - Watchlist: X/X tests passed
    
    ## Issues Found
    [List any API issues with severity]
    
    ## Performance Summary
    - Average response time: Xms
    - Slowest endpoint: [endpoint] (Xms)
    - Fastest endpoint: [endpoint] (Xms)
    
    ## Recommendations
    [Any suggestions for API improvements]
    ```

### Repo Paths
- `app/api/*` (all API routes)
- `apis/index.ts`

### Deliverables
- [ ] Comprehensive Postman collection (50+ requests)
- [ ] Postman environment file
- [ ] API test scenarios document
- [ ] Test data file
- [ ] Newman CLI test results
- [ ] Newman HTML report
- [ ] API documentation
- [ ] Test summary report
- [ ] Issues log (if any)

### Acceptance Criteria
- Postman collection covers all major endpoints
- Each request has at least 5 test assertions
- Negative tests included for error handling
- Environment variables used for flexibility
- Newman CLI tests run successfully
- API documentation is complete and accurate
- Test summary shows >80% pass rate
- All tests are reproducible

### Estimated Time
12-14 hours

