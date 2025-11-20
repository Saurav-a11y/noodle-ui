## Task 1 – Setup, Smoke Test & Baseline Documentation

### Focus
Set up Docker environment, perform smoke testing on critical pages, and establish baseline documentation.

### Getting started

1. **Prerequisites**
   - Install Docker Desktop ([download](https://www.docker.com/products/docker-desktop/))
   - Install Git
   - Install Postman ([download](https://www.postman.com/downloads/))
   - Verify installations:
     ```bash
     docker -v
     git --version
     ```

2. **Clone repositories**
   - Follow the instructions in `docker-setup.md`
   - Clone both `noodle-ui` and `noodle-api` repositories
   - Verify folder structure:
     ```
     /your-workspace/
       ├── noodle-ui/
       └── noodle-api/
     ```

3. **Build and run Docker containers**
   - Navigate to `noodle-ui/` directory
   - Build images:
     ```bash
     docker compose build --no-cache
     ```
   - Start containers:
     ```bash
     docker compose up
     ```
   - Wait for both services to start (watch terminal logs)
   - Verify containers are running:
     ```bash
     docker ps -a
     ```
   - Expected output: `noodle-ui` and `noodle-api` containers with status "Up"

4. **Access the application**
   - Open browser: `http://localhost:3001`
   - Verify homepage loads successfully
   - Check browser console (F12) for errors

5. **Perform smoke testing**
   
   **Test Charter:** Verify critical user journeys and basic functionality
   
   **Pages to test:**
   - [ ] **Homepage** (`/`)
     - Verify page loads
     - Check "Overview" section displays
     - Verify "Top Gaining Project" widget shows data
     - Verify "Most Talked About Project" widget shows data
     - Check "Number of Tracked Stablecoins" displays
     - Verify "Total Active Users" shows with percentage change
   
   - [ ] **Stablecoins List** (`/stablecoins`)
     - Verify table loads with data
     - Check columns: Name, Price, Volume(24h), Market Cap, Circulating Supply, Brief Introduction, Backing Mechanism, Best Yield, Depegging History
     - Verify search input is present
     - Check pagination (if applicable)
   
   - [ ] **Stablecoin Detail Page** (click any stablecoin)
     - Verify Community Health Score displays
     - Check "Authentic Engagement" indicator
     - Verify "Community Growth" percentage
     - Check "Recent Activity Drop" status
     - Verify "Whale Activity" status
     - Check Market Metrics section (Market Cap, FDV, Volume, Vol/Mkt Cap, Total Supply, Max Supply, Circulating Supply)
     - Verify "Social Activity vs On-Chain Behavior Correlation" chart loads
     - Check "Best yields" table displays
   
   - [ ] **User Profile/Settings** (`/settings`)
     - Verify Profile setting tab loads
     - Check Avatar display
     - Verify form fields: Display name, Username, Email, Birthday, Bio
     - Check "Social Accounts" section (X/Twitter, Telegram)
     - Verify "Save" button is present

6. **Capture baseline evidence**
   
   Create folder: `test-evidence/task1-baseline/`
   
   **Screenshots to capture:**
   - [ ] Homepage - full page
   - [ ] Homepage - Top Gaining Project widget
   - [ ] Homepage - Most Talked About Project widget
   - [ ] Stablecoins list - full table view
   - [ ] Stablecoins list - search input focused
   - [ ] Stablecoin detail - Community Health Score section
   - [ ] Stablecoin detail - Market Metrics section
   - [ ] Stablecoin detail - Correlation chart
   - [ ] User Profile - Profile details form
   - [ ] User Profile - Social Accounts section
   - [ ] Browser console - showing no errors (or document any errors found)
   - [ ] Docker containers running (`docker ps -a` output)

7. **Document initial findings**
   
   Create file: `test-evidence/task1-baseline/smoke-test-report.md`
   
   Template:
   ```markdown
   # Smoke Test Report - Task 1
   
   **Date:** [Date]
   **Tester:** [Your Name]
   **Environment:** Docker (localhost:3001)
   **Browser:** [Browser name and version]
   
   ## Test Summary
   - Total pages tested: X
   - Pages passed: X
   - Issues found: X
   
   ## Pages Tested
   
   ### 1. Homepage (/)
   - **Status:** ✅ Pass / ❌ Fail
   - **Load time:** ~X seconds
   - **Console errors:** None / [List errors]
   - **Notes:** [Any observations]
   
   ### 2. Stablecoins List (/stablecoins)
   - **Status:** ✅ Pass / ❌ Fail
   - **Data loaded:** Yes / No
   - **Console errors:** None / [List errors]
   - **Notes:** [Any observations]
   
   ### 3. Stablecoin Detail
   - **Status:** ✅ Pass / ❌ Fail
   - **Charts loaded:** Yes / No
   - **Console errors:** None / [List errors]
   - **Notes:** [Any observations]
   
   ### 4. User Profile (/settings)
   - **Status:** ✅ Pass / ❌ Fail
   - **Form fields:** All present / Missing: [list]
   - **Console errors:** None / [List errors]
   - **Notes:** [Any observations]
   
   ## Issues Found
   
   ### Issue #1: [Title]
   - **Severity:** Critical / High / Medium / Low
   - **Page:** [Page name]
   - **Steps to reproduce:**
     1. [Step 1]
     2. [Step 2]
     3. [Step 3]
   - **Expected result:** [What should happen]
   - **Actual result:** [What actually happens]
   - **Screenshot:** [Reference to screenshot file]
   
   ## Console Errors (if any)
   - [List any console errors with context]
   
   ## Performance Notes
   - Homepage load time: ~X seconds
   - Stablecoins list load time: ~X seconds
   - Detail page load time: ~X seconds
   ```

8. **Create test plan for upcoming weeks**
   
   Create file: `test-evidence/task1-baseline/test-plan.md`
   
   Template:
   ```markdown
   # Test Plan - Weeks 2-8
   
   ## Week 2: Stablecoins Search & Filters
   - Test search functionality
   - Validate API parameters
   - Test filter combinations
   
   ## Week 3: Charts & Data Visualization
   - Test chart interactions
   - Validate time range controls
   - Test data accuracy
   
   ## Week 4: API Validation
   - Test API error handling
   - Validate response schemas
   - Test edge cases
   
   ## Week 5-8: Advanced Testing
   - E2E user flows
   - Performance testing
   - Accessibility testing
   - Cross-browser testing
   ```

9. **Set up Postman workspace**
   - Create new Postman workspace: "Noodle Testing"
   - Create collection: "Task 1 - Baseline API Tests"
   - Add basic requests:
     - GET Stablecoins list
     - GET Stablecoin detail
     - GET Top gaining projects
     - GET Most talked about projects
   - Save collection and export as JSON
   - Place in: `test-evidence/task1-baseline/postman-collection.json`

### Repo Paths
- `docker-compose.yml`
- `app/page.tsx` (Homepage)
- `app/stablecoins/page.tsx` (Stablecoins list)
- `app/settings/page.tsx` (User profile)

### Deliverables
- [ ] Docker containers running successfully
- [ ] Smoke test report with all pages tested
- [ ] Baseline screenshot set (10+ screenshots)
- [ ] Test plan for upcoming weeks
- [ ] Postman collection with basic API tests
- [ ] Issues log (if any issues found)

### Acceptance Criteria
- All critical pages load without blocking errors
- Screenshots clearly show page states
- Smoke test report is complete and well-formatted
- Test plan outlines 3-5 focus areas for coming weeks
- Postman collection includes at least 4 API requests
- Any issues found are documented with reproduction steps

### Estimated Time
6-8 hours

