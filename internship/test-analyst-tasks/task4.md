## Task 4 – User Profile & Settings Testing

### Focus
Test user profile functionality, form validation, social account connections, and settings persistence.

### Getting started

1. **Navigate to Settings page**
   - Go to `/settings` or `/settings/profile`
   - Observe all form fields and sections
   - Note interactive elements

2. **Create BDD test scenarios**
   
   Create file: `test-evidence/task4-profile-settings/bdd-scenarios.feature`
   
   ```gherkin
   Feature: User Profile and Settings
     As a user
     I want to manage my profile and settings
     So that I can personalize my experience
   
   Background:
     Given I am logged in
     And I am on the Settings page
   
   Scenario: Profile settings page loads
     Then I should see "Profile setting" tab selected
     And I should see "Account Security" tab
     And I should see "Account Analytics" tab
     And I should see "Watchlist & Portfolio" tab
   
   Scenario: Avatar display and change
     Then I should see my current avatar
     And I should see "Change photo" button
     And I should see "Remove" button
   
   Scenario: Display name field validation
     When I clear the "Display name" field
     And I enter "TestUser123"
     Then the field should accept the input
     And the character count should show "12/30"
   
   Scenario: Display name with emoji
     When I enter "CryptoGirl 🔥" in the "Display name" field
     Then the field should accept emoji
     And the character count should update correctly
   
   Scenario: Display name exceeds max length
     When I enter a string longer than 30 characters
     Then the field should prevent additional input
     Or show validation error
   
   Scenario: Username field validation
     When I clear the "Username" field
     And I enter "RektCryptoGirl"
     Then the field should accept the input
     And the character count should show "X/30"
   
   Scenario: Username with special characters
     When I enter "User@#$%" in the "Username" field
     Then the field should show validation error
     Or prevent special characters
   
   Scenario: Email field displays
     Then I should see "Email" field
     And it should show my current email
     And it should have a verification badge if verified
   
   Scenario: Email field validation
     When I enter "invalid-email" in the "Email" field
     Then I should see validation error "Invalid email format"
   
   Scenario: Birthday field
     Then I should see "Birthday" field with calendar icon
     When I click the birthday field
     Then a date picker should appear
   
   Scenario: Bio field validation
     When I enter text in the "Bio" field
     Then the character count should show "X/250"
     And I should be able to enter multiple lines
   
   Scenario: Bio exceeds max length
     When I enter a string longer than 250 characters
     Then the field should prevent additional input
     Or show validation error
   
   Scenario: Save profile changes
     Given I have made changes to my profile
     When I click the "Save" button
     Then the button should show loading state
     And I should see success message "Profile updated successfully"
     And my changes should be persisted
   
   Scenario: Save without changes
     Given I have not made any changes
     When I click the "Save" button
     Then nothing should happen
     Or I should see message "No changes to save"
   
   Scenario: Social Accounts section displays
     Then I should see "Social Accounts" section
     And I should see "X (Twitter)" with "Connect" button
     And I should see "Telegram" with "Connect" button
   
   Scenario: Connect Twitter account
     When I click "Connect" button for X (Twitter)
     Then I should be redirected to Twitter OAuth
     Or see a connection modal
   
   Scenario: Connect Telegram account
     When I click "Connect" button for Telegram
     Then I should see Telegram connection instructions
     Or be redirected to Telegram
   
   Scenario: Disconnect social account
     Given I have connected a social account
     When I click "Disconnect" button
     Then I should see confirmation dialog
     And when I confirm, the account should be disconnected
   ```

3. **Manual test execution**
   
   Create file: `test-evidence/task4-profile-settings/manual-test-results.md`
   
   Execute each scenario with detailed steps and screenshots.

4. **Form validation testing**
   
   Create file: `test-evidence/task4-profile-settings/form-validation.md`
   
   Test matrix:
   
   ```markdown
   # Form Validation Test Matrix
   
   ## Display Name Field
   | Test Case | Input | Expected Result | Actual Result | Status |
   |-----------|-------|-----------------|---------------|--------|
   | Valid name | "TestUser" | Accepted | | |
   | With emoji | "User 🔥" | Accepted | | |
   | Empty | "" | Error or disabled save | | |
   | Max length | 30 chars | Accepted | | |
   | Over max | 31+ chars | Prevented/Error | | |
   | Special chars | "User@#$" | Accepted/Rejected | | |
   
   ## Username Field
   | Test Case | Input | Expected Result | Actual Result | Status |
   |-----------|-------|-----------------|---------------|--------|
   | Valid username | "user123" | Accepted | | |
   | With spaces | "user 123" | Rejected | | |
   | Special chars | "user@#$" | Rejected | | |
   | Empty | "" | Error | | |
   | Max length | 30 chars | Accepted | | |
   
   ## Email Field
   | Test Case | Input | Expected Result | Actual Result | Status |
   |-----------|-------|-----------------|---------------|--------|
   | Valid email | "test@example.com" | Accepted | | |
   | Missing @ | "testexample.com" | Error | | |
   | Missing domain | "test@" | Error | | |
   | Invalid format | "test@.com" | Error | | |
   | Empty | "" | Error | | |
   
   ## Bio Field
   | Test Case | Input | Expected Result | Actual Result | Status |
   |-----------|-------|-----------------|---------------|--------|
   | Valid text | "Crypto enthusiast" | Accepted | | |
   | Multi-line | "Line 1\nLine 2" | Accepted | | |
   | Max length | 250 chars | Accepted | | |
   | Over max | 251+ chars | Prevented/Error | | |
   | HTML tags | "<script>alert()</script>" | Sanitized | | |
   ```

5. **Set up Postman API tests**
   
   Create collection: "Task 4 - User Profile APIs"
   
   **Test 1: Get user profile**
   ```
   GET http://localhost:3000/noodle/user/profile
   Headers: Authorization: Bearer {{token}}
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response has user data", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('displayName');
       pm.expect(jsonData).to.have.property('username');
       pm.expect(jsonData).to.have.property('email');
   });
   ```
   
   **Test 2: Update user profile**
   ```
   PUT http://localhost:3000/noodle/user/profile
   Headers: 
     Authorization: Bearer {{token}}
     Content-Type: application/json
   
   Body:
   {
     "displayName": "Updated Name",
     "username": "updateduser",
     "bio": "Updated bio text"
   }
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Profile updated successfully", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData.displayName).to.equal("Updated Name");
   });
   ```
   
   **Test 3: Update profile with invalid data**
   ```
   PUT http://localhost:3000/noodle/user/profile
   Headers: 
     Authorization: Bearer {{token}}
     Content-Type: application/json
   
   Body:
   {
     "displayName": "",
     "email": "invalid-email"
   }
   
   Tests:
   pm.test("Status code is 400", function () {
       pm.response.to.have.status(400);
   });
   
   pm.test("Response has validation errors", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('errors');
   });
   ```
   
   **Test 4: Upload avatar**
   ```
   POST http://localhost:3000/noodle/user/avatar
   Headers: Authorization: Bearer {{token}}
   Body: form-data
     file: [select image file]
   
   Tests:
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Avatar URL returned", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('avatarUrl');
   });
   ```
   
   **Test 5: Connect social account**
   ```
   POST http://localhost:3000/noodle/user/social/connect
   Headers: 
     Authorization: Bearer {{token}}
     Content-Type: application/json
   
   Body:
   {
     "platform": "twitter",
     "authCode": "mock-auth-code"
   }
   
   Tests:
   pm.test("Status code is 200 or 201", function () {
       pm.expect(pm.response.code).to.be.oneOf([200, 201]);
   });
   ```

6. **Test data persistence**
   
   Create file: `test-evidence/task4-profile-settings/data-persistence.md`
   
   Test scenarios:
   - [ ] Update profile → Reload page → Verify changes persist
   - [ ] Update profile → Logout → Login → Verify changes persist
   - [ ] Update profile → Close browser → Reopen → Verify changes persist
   - [ ] Partial update (only some fields) → Verify other fields unchanged

7. **Test error handling**
   
   Test and document:
   - [ ] Network error during save
   - [ ] API returns 500 error
   - [ ] Session expired during save
   - [ ] Concurrent updates (open in 2 tabs, update in both)
   - [ ] File upload too large
   - [ ] Invalid file type for avatar

8. **Test security aspects**
   
   Create file: `test-evidence/task4-profile-settings/security-tests.md`
   
   Test:
   - [ ] XSS in display name: `<script>alert('xss')</script>`
   - [ ] XSS in bio: `<img src=x onerror=alert('xss')>`
   - [ ] SQL injection in username: `' OR '1'='1`
   - [ ] HTML injection in bio: `<h1>Big Text</h1>`
   - [ ] Email header injection: `test@example.com\nBcc:attacker@evil.com`

9. **Accessibility testing**
   
   Test:
   - [ ] All form fields have labels
   - [ ] Error messages are associated with fields
   - [ ] Keyboard navigation works
   - [ ] Focus indicators visible
   - [ ] Form can be submitted with Enter key
   - [ ] Screen reader announces errors

10. **Create comprehensive test report**
    
    Create file: `test-evidence/task4-profile-settings/test-report.md`

### Repo Paths
- `app/settings/page.tsx`
- `app/settings/[section]/page.tsx`
- `features/settings/ProfileSettings.tsx`
- `hooks/useUser.tsx`
- `app/api/user/profile/route.ts` (if exists)

### Deliverables
- [ ] BDD scenarios file (Gherkin format)
- [ ] Manual test execution results
- [ ] Form validation test matrix (completed)
- [ ] Postman collection with 5+ API tests
- [ ] Data persistence test results
- [ ] Error handling test results
- [ ] Security test results
- [ ] Accessibility notes
- [ ] Screenshots for each section
- [ ] Test summary report

### Acceptance Criteria
- All BDD scenarios executed and documented
- Form validation tested for all fields
- API tests verify CRUD operations
- Data persistence verified across sessions
- Error states tested and documented
- Security tests completed (XSS, injection)
- Accessibility smoke test completed
- Test report includes pass/fail summary with evidence

### Estimated Time
10-12 hours

