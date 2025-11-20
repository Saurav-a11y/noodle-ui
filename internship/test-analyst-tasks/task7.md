## Task 7 – Test Automation with Selenium C# (BDD Style)

### Focus
Create automated UI tests using Selenium WebDriver with C# and BDD-style scenarios, focusing on critical user journeys and watchlist functionality.

### Getting started

1. **Prerequisites**
   - Visual Studio 2022 or Visual Studio Code with C# extension
   - .NET SDK 8.0+
   - Chrome/Firefox browsers installed
   - Docker running with Noodle app on `http://localhost:3001`

2. **Create Selenium C# project**
   
   ```bash
   # Create new directory for automation
   mkdir NoodleSeleniumTests
   cd NoodleSeleniumTests
   
   # Create NUnit test project
   dotnet new nunit -n NoodleSeleniumTests
   cd NoodleSeleniumTests
   
   # Add Selenium and related packages
   dotnet add package Selenium.WebDriver
   dotnet add package Selenium.WebDriver.ChromeDriver
   dotnet add package Selenium.WebDriver.GeckoDriver
   dotnet add package Selenium.Support
   dotnet add package NUnit
   dotnet add package NUnit3TestAdapter
   dotnet add package FluentAssertions
   dotnet add package ExtentReports
   ```

3. **Project structure**
   
   ```
   NoodleSeleniumTests/
   ├── PageObjects/
   │   ├── BasePage.cs
   │   ├── HomePage.cs
   │   ├── StablecoinsPage.cs
   │   ├── DetailPage.cs
   │   └── ProfilePage.cs
   ├── Tests/
   │   ├── BaseTest.cs
   │   ├── SearchFilterTests.cs
   │   ├── WatchlistTests.cs
   │   ├── DetailPageTests.cs
   │   └── ProfileTests.cs
   ├── Helpers/
   │   ├── WebDriverFactory.cs
   │   ├── TestDataHelper.cs
   │   └── ScreenshotHelper.cs
   ├── TestData/
   │   └── test-data.json
   ├── Reports/
   └── Screenshots/
   ```

4. **Create WebDriver Factory**
   
   Create file: `Helpers/WebDriverFactory.cs`
   
   ```csharp
   using OpenQA.Selenium;
   using OpenQA.Selenium.Chrome;
   using OpenQA.Selenium.Firefox;
   
   namespace NoodleSeleniumTests.Helpers
   {
       public class WebDriverFactory
       {
           public static IWebDriver CreateDriver(string browserType = "chrome")
           {
               IWebDriver driver;
               
               switch (browserType.ToLower())
               {
                   case "chrome":
                       var chromeOptions = new ChromeOptions();
                       chromeOptions.AddArgument("--start-maximized");
                       chromeOptions.AddArgument("--disable-notifications");
                       driver = new ChromeDriver(chromeOptions);
                       break;
                       
                   case "firefox":
                       var firefoxOptions = new FirefoxOptions();
                       driver = new FirefoxDriver(firefoxOptions);
                       driver.Manage().Window.Maximize();
                       break;
                       
                   case "headless":
                       var headlessOptions = new ChromeOptions();
                       headlessOptions.AddArgument("--headless");
                       headlessOptions.AddArgument("--disable-gpu");
                       headlessOptions.AddArgument("--window-size=1920,1080");
                       driver = new ChromeDriver(headlessOptions);
                       break;
                       
                   default:
                       throw new ArgumentException($"Browser type '{browserType}' is not supported");
               }
               
               driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
               driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
               
               return driver;
           }
       }
   }
   ```

5. **Create Base Page Object**
   
   Create file: `PageObjects/BasePage.cs`
   
   ```csharp
   using OpenQA.Selenium;
   using OpenQA.Selenium.Support.UI;
   using SeleniumExtras.WaitHelpers;
   
   namespace NoodleSeleniumTests.PageObjects
   {
       public class BasePage
       {
           protected IWebDriver Driver;
           protected WebDriverWait Wait;
           protected string BaseUrl = "http://localhost:3001";
           
           public BasePage(IWebDriver driver)
           {
               Driver = driver;
               Wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
           }
           
           protected IWebElement FindElement(By locator)
           {
               return Wait.Until(ExpectedConditions.ElementIsVisible(locator));
           }
           
           protected IList<IWebElement> FindElements(By locator)
           {
               return Driver.FindElements(locator);
           }
           
           protected void Click(By locator)
           {
               FindElement(locator).Click();
           }
           
           protected void Type(By locator, string text)
           {
               var element = FindElement(locator);
               element.Clear();
               element.SendKeys(text);
           }
           
           protected string GetText(By locator)
           {
               return FindElement(locator).Text;
           }
           
           protected bool IsElementDisplayed(By locator)
           {
               try
               {
                   return FindElement(locator).Displayed;
               }
               catch (NoSuchElementException)
               {
                   return false;
               }
           }
           
           protected void WaitForPageLoad()
           {
               Wait.Until(driver => 
                   ((IJavaScriptExecutor)driver).ExecuteScript("return document.readyState").Equals("complete"));
           }
           
           protected void WaitForSeconds(int seconds)
           {
               Thread.Sleep(TimeSpan.FromSeconds(seconds));
           }
       }
   }
   ```

6. **Create Page Object Models**
   
   Create file: `PageObjects/StablecoinsPage.cs`
   
   ```csharp
   using OpenQA.Selenium;
   
   namespace NoodleSeleniumTests.PageObjects
   {
       public class StablecoinsPage : BasePage
       {
           // Locators
           private By SearchInput = By.CssSelector("input[placeholder*='Search']");
           private By StablecoinsTable = By.CssSelector("table");
           private By TableRows = By.CssSelector("table tbody tr");
           private By LoadingSpinner = By.CssSelector("[data-testid='loading-spinner']");
           private By EmptyState = By.XPath("//*[contains(text(), 'No results found')]");
           private By FirstStablecoinLink = By.CssSelector("table tbody tr:first-child a");
           
           public StablecoinsPage(IWebDriver driver) : base(driver) { }
           
           public void Navigate()
           {
               Driver.Navigate().GoToUrl($"{BaseUrl}/stablecoins");
               WaitForPageLoad();
           }
           
           public void Search(string query)
           {
               Type(SearchInput, query);
               WaitForSeconds(1); // Wait for debounce
           }
           
           public void ClearSearch()
           {
               var element = FindElement(SearchInput);
               element.Clear();
               WaitForSeconds(1);
           }
           
           public int GetRowCount()
           {
               return FindElements(TableRows).Count;
           }
           
           public bool IsTableDisplayed()
           {
               return IsElementDisplayed(StablecoinsTable);
           }
           
           public bool IsEmptyStateDisplayed()
           {
               return IsElementDisplayed(EmptyState);
           }
           
           public void ClickFirstStablecoin()
           {
               Click(FirstStablecoinLink);
           }
           
           public string GetCurrentUrl()
           {
               return Driver.Url;
           }
       }
   }
   ```
   
   Create file: `PageObjects/DetailPage.cs`
   
   ```csharp
   using OpenQA.Selenium;
   
   namespace NoodleSeleniumTests.PageObjects
   {
       public class DetailPage : BasePage
       {
           // Locators
           private By CommunityHealthScore = By.XPath("//*[contains(text(), 'Community Health Score')]");
           private By AddToWatchlistButton = By.XPath("//button[contains(text(), 'Add to Watchlist')]");
           private By MarketMetrics = By.XPath("//*[contains(text(), 'Market Metrics')]");
           private By CorrelationChart = By.CssSelector("[data-testid='correlation-chart']");
           private By TimeRangeButton(string range) => By.XPath($"//button[text()='{range}']");
           private By SuccessMessage = By.XPath("//*[contains(text(), 'added') or contains(text(), 'success')]");
           
           public DetailPage(IWebDriver driver) : base(driver) { }
           
           public bool IsCommunityHealthScoreDisplayed()
           {
               return IsElementDisplayed(CommunityHealthScore);
           }
           
           public string GetWatchlistButtonText()
           {
               return GetText(AddToWatchlistButton);
           }
           
           public void ClickAddToWatchlist()
           {
               Click(AddToWatchlistButton);
           }
           
           public bool IsSuccessMessageDisplayed()
           {
               return IsElementDisplayed(SuccessMessage);
           }
           
           public void SelectTimeRange(string range)
           {
               Click(TimeRangeButton(range));
               WaitForPageLoad();
           }
           
           public bool IsTimeRangeButtonHighlighted(string range)
           {
               var element = FindElement(TimeRangeButton(range));
               var classAttribute = element.GetAttribute("class");
               return classAttribute.Contains("active") || 
                      classAttribute.Contains("selected") || 
                      classAttribute.Contains("highlighted");
           }
       }
   }
   ```

7. **Create Base Test Class**
   
   Create file: `Tests/BaseTest.cs`
   
   ```csharp
   using NUnit.Framework;
   using OpenQA.Selenium;
   using NoodleSeleniumTests.Helpers;
   
   namespace NoodleSeleniumTests.Tests
   {
       [TestFixture]
       public class BaseTest
       {
           protected IWebDriver Driver;
           protected string BrowserType = "chrome"; // Can be overridden
           
           [SetUp]
           public void Setup()
           {
               Driver = WebDriverFactory.CreateDriver(BrowserType);
           }
           
           [TearDown]
           public void Teardown()
           {
               if (TestContext.CurrentContext.Result.Outcome.Status == NUnit.Framework.Interfaces.TestStatus.Failed)
               {
                   TakeScreenshot();
               }
               
               Driver?.Quit();
               Driver?.Dispose();
           }
           
           protected void TakeScreenshot()
           {
               var screenshot = ((ITakesScreenshot)Driver).GetScreenshot();
               var fileName = $"{TestContext.CurrentContext.Test.Name}_{DateTime.Now:yyyyMMdd_HHmmss}.png";
               var filePath = Path.Combine("Screenshots", fileName);
               
               Directory.CreateDirectory("Screenshots");
               screenshot.SaveAsFile(filePath);
               
               TestContext.WriteLine($"Screenshot saved: {filePath}");
           }
       }
   }
   ```

8. **Write BDD-style automated tests**
   
   Create file: `Tests/SearchFilterTests.cs`
   
   ```csharp
   using NUnit.Framework;
   using FluentAssertions;
   using NoodleSeleniumTests.PageObjects;
   
   namespace NoodleSeleniumTests.Tests
   {
       [TestFixture]
       [Category("Search")]
       public class SearchFilterTests : BaseTest
       {
           private StablecoinsPage _stablecoinsPage;
           
           [SetUp]
           public void TestSetup()
           {
               _stablecoinsPage = new StablecoinsPage(Driver);
           }
           
           [Test]
           [Description("Given I am on the Stablecoins page, When I search for 'USDT', Then I should see matching results")]
           public void SearchForSpecificStablecoin()
           {
               // Given I am on the Stablecoins page
               _stablecoinsPage.Navigate();
               _stablecoinsPage.IsTableDisplayed().Should().BeTrue();
               
               // When I enter "USDT" in the search box
               _stablecoinsPage.Search("USDT");
               
               // Then I should see only stablecoins matching "USDT"
               var rowCount = _stablecoinsPage.GetRowCount();
               rowCount.Should().BeGreaterThan(0);
               
               // And the URL should include "q=USDT" parameter
               _stablecoinsPage.GetCurrentUrl().Should().Contain("q=USDT");
           }
           
           [Test]
           [Description("Given I am on the Stablecoins page, When I search for non-existent coin, Then I should see empty state")]
           public void SearchWithNoResults()
           {
               // Given I am on the Stablecoins page
               _stablecoinsPage.Navigate();
               
               // When I enter a non-existent coin name
               _stablecoinsPage.Search("NONEXISTENTCOIN123");
               
               // Then I should see "No results found" message
               _stablecoinsPage.IsEmptyStateDisplayed().Should().BeTrue();
           }
           
           [Test]
           [Description("Given I have searched for a coin, When I clear the search, Then I should see full list")]
           public void ClearSearchShowsFullList()
           {
               // Given I have searched for "USDT"
               _stablecoinsPage.Navigate();
               _stablecoinsPage.Search("USDT");
               _stablecoinsPage.GetCurrentUrl().Should().Contain("q=USDT");
               
               // When I clear the search box
               _stablecoinsPage.ClearSearch();
               
               // Then I should see the full list of stablecoins
               var rowCount = _stablecoinsPage.GetRowCount();
               rowCount.Should().BeGreaterThan(10);
               
               // And the URL should not include "q=" parameter
               _stablecoinsPage.GetCurrentUrl().Should().NotContain("q=");
           }
       }
   }
   ```
   
   Create file: `Tests/WatchlistTests.cs`
   
   ```csharp
   using NUnit.Framework;
   using FluentAssertions;
   using NoodleSeleniumTests.PageObjects;
   
   namespace NoodleSeleniumTests.Tests
   {
       [TestFixture]
       [Category("Watchlist")]
       public class WatchlistTests : BaseTest
       {
           private StablecoinsPage _stablecoinsPage;
           private DetailPage _detailPage;
           
           [SetUp]
           public void TestSetup()
           {
               _stablecoinsPage = new StablecoinsPage(Driver);
               _detailPage = new DetailPage(Driver);
           }
           
           [Test]
           [Description("Given I am on a currency detail page, When I add to watchlist, Then I should see success")]
           public void AddCurrencyToWatchlist()
           {
               // Given I am on a currency detail page
               _stablecoinsPage.Navigate();
               _stablecoinsPage.ClickFirstStablecoin();
               _detailPage.IsCommunityHealthScoreDisplayed().Should().BeTrue();
               
               // When I click "Add to Watchlist"
               var buttonTextBefore = _detailPage.GetWatchlistButtonText();
               _detailPage.ClickAddToWatchlist();
               
               // Then the button should change (optimistic update)
               Thread.Sleep(500); // Wait for UI update
               var buttonTextAfter = _detailPage.GetWatchlistButtonText();
               buttonTextAfter.Should().NotBe(buttonTextBefore);
               
               // And I should see success indication
               _detailPage.IsSuccessMessageDisplayed().Should().BeTrue();
           }
       }
   }
   ```
   
   Create file: `Tests/DetailPageTests.cs`
   
   ```csharp
   using NUnit.Framework;
   using FluentAssertions;
   using NoodleSeleniumTests.PageObjects;
   
   namespace NoodleSeleniumTests.Tests
   {
       [TestFixture]
       [Category("DetailPage")]
       public class DetailPageTests : BaseTest
       {
           private DetailPage _detailPage;
           
           [SetUp]
           public void TestSetup()
           {
               _detailPage = new DetailPage(Driver);
               Driver.Navigate().GoToUrl("http://localhost:3001/cryptocurrencies/tether-usdt");
           }
           
           [Test]
           [Description("Given I am on detail page, When I change time range, Then chart should update")]
           public void ChangeChartTimeRange()
           {
               // Given I am on the detail page
               _detailPage.IsCommunityHealthScoreDisplayed().Should().BeTrue();
               
               // When I click on "7D" button
               _detailPage.SelectTimeRange("7D");
               
               // Then the "7D" button should be highlighted
               _detailPage.IsTimeRangeButtonHighlighted("7D").Should().BeTrue();
           }
       }
   }
   ```

9. **Run tests and generate reports**
   
   ```bash
   # Run all tests
   dotnet test
   
   # Run specific category
   dotnet test --filter "Category=Search"
   
   # Run with detailed output
   dotnet test --logger "console;verbosity=detailed"
   
   # Run and generate TRX report
   dotnet test --logger "trx;LogFileName=TestResults.trx"
   ```

10. **Create test data file**
    
    Create file: `TestData/test-data.json`
    
    ```json
    {
      "testUser": {
        "email": "test@example.com",
        "password": "Test123!@#",
        "userId": "test-user-123"
      },
      "stablecoins": [
        {
          "id": "tether-usdt",
          "name": "Tether USDt",
          "symbol": "USDT"
        },
        {
          "id": "usd-coin",
          "name": "USDC",
          "symbol": "USDC"
        }
      ],
      "searchQueries": {
        "valid": ["USDT", "USD", "Tether"],
        "invalid": ["NONEXISTENT", "12345"]
      }
    }
    ```

11. **Document test automation setup**
    
    Create file: `test-evidence/task7-automation/automation-setup.md`
    
    ```markdown
    # Test Automation Setup Guide - Selenium C#
    
    ## Prerequisites
    - .NET SDK 8.0+
    - Visual Studio 2022 or VS Code
    - Chrome/Firefox browsers
    - Docker running with Noodle app on localhost:3001
    
    ## Installation
    ```bash
    # Create project
    dotnet new nunit -n NoodleSeleniumTests
    cd NoodleSeleniumTests
    
    # Install packages
    dotnet add package Selenium.WebDriver
    dotnet add package Selenium.WebDriver.ChromeDriver
    dotnet add package Selenium.Support
    dotnet add package NUnit
    dotnet add package FluentAssertions
    ```
    
    ## Running Tests
    ```bash
    # All tests
    dotnet test
    
    # Specific category
    dotnet test --filter "Category=Search"
    
    # With detailed output
    dotnet test --logger "console;verbosity=detailed"
    
    # Generate report
    dotnet test --logger "trx"
    ```
    
    ## Test Structure
    - Page Object Models in `PageObjects/`
    - Test classes in `Tests/`
    - Test data in `TestData/`
    - Screenshots in `Screenshots/`
    
    ## Reports
    - TRX report: `TestResults/TestResults.trx`
    - Screenshots: `Screenshots/` (on failure)
    ```

12. **Create automation test report**
    
    Create file: `test-evidence/task7-automation/automation-report.md`
    
    Include:
    - Total tests created
    - Test execution results
    - Screenshots of failures
    - Coverage summary
    - Recommendations for additional tests

### Repo Paths
- `NoodleSeleniumTests/` (new automation project)
- `NoodleSeleniumTests/PageObjects/` (Page Object Models)
- `NoodleSeleniumTests/Tests/` (Test classes)

### Deliverables
- [ ] Selenium C# project created
- [ ] Page Object Models (3+ pages)
- [ ] Automated test classes (5+ test files)
- [ ] Test data file
- [ ] Test execution results (TRX report)
- [ ] Screenshots of test runs
- [ ] Automation setup documentation
- [ ] Automation test report

### Acceptance Criteria
- Selenium C# project set up correctly
- At least 15 automated tests created
- Tests use Page Object Model pattern
- Tests follow BDD-style naming (Given/When/Then comments)
- All tests pass successfully
- TRX report generated
- Tests run in at least 2 browsers (Chrome, Firefox)
- Documentation explains how to run tests
- Screenshots captured on test failures

### Estimated Time
16-18 hours

