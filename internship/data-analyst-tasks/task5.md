## Task 5 – SSAS Tabular Model Basics

### Focus
Create an SSAS Tabular model from star schema; build 5-10 basic DAX measures.

### Getting started

1. **Create Tabular Project**
   - Visual Studio → New Project → Analysis Services Tabular Project
   - Name: `NoodlesCryptoTabular`
   - Location: `bi-artifacts/ssas/`
   - Compatibility Level: 1500 (SQL Server 2019) or 1200 (SQL Server 2017)

2. **Import Tables from SQL Server**
   - Model Designer → Import from Data Source
   - Connection: SQL Server (`localhost`, `NoodlesDW`)
   - Select tables:
     - DW.DimCurrency
     - DW.DimDate
     - DW.DimSocialPlatform
     - DW.FactCurrencyDailySnapshot
     - DW.FactSocialEngagement
   - Import mode: **Import** (in-memory)

3. **Configure Relationships**
   - Verify auto-detected relationships (should match FK constraints):
     - FactCurrencyDailySnapshot[CurrencyKey] → DimCurrency[CurrencyKey]
     - FactCurrencyDailySnapshot[DateKey] → DimDate[DateKey]
     - FactSocialEngagement[CurrencyKey] → DimCurrency[CurrencyKey]
     - FactSocialEngagement[DateKey] → DimDate[DateKey]
     - FactSocialEngagement[PlatformKey] → DimSocialPlatform[PlatformKey]
   - Mark DimDate as Date Table: Right-click → Mark as Date Table (select FullDate column)

4. **Hide Technical Columns**
   - Hide surrogate keys from client tools:
     - CurrencyKey, DateKey, PlatformKey (in all tables)
   - Set friendly names:
     - `DimCurrency` → `Currency`
     - `FactCurrencyDailySnapshot` → `Currency Daily Metrics`
     - `FactSocialEngagement` → `Social Engagement`

5. **Create Basic DAX Measures**
   - Create a Measures table: Right-click Model → New Table
     ```dax
     Measures = ROW("Measures", 1)
     ```
   - Add measures (right-click Measures table → New Measure):

   **Price Measures:**
   ```dax
   Current Price = 
   CALCULATE(
       MAX('Currency Daily Metrics'[ClosePrice]),
       LASTDATE('Date'[FullDate])
   )
   
   Avg Price = AVERAGE('Currency Daily Metrics'[ClosePrice])
   
   Total Volume 24h = SUM('Currency Daily Metrics'[Volume24h])
   ```

   **Market Measures:**
   ```dax
   Total Market Cap = SUM('Currency Daily Metrics'[MarketCap])
   
   Currency Count = DISTINCTCOUNT('Currency'[CurrencySymbol])
   ```

   **Social Measures:**
   ```dax
   Total Engagements = COUNTROWS('Social Engagement')
   
   Total Likes = SUM('Social Engagement'[LikeCount])
   
   Engagement Rate = 
   DIVIDE(
       [Total Likes] + SUM('Social Engagement'[RetweetCount]) + SUM('Social Engagement'[CommentCount]),
       [Total Engagements],
       0
   )
   ```

   **Time Intelligence:**
   ```dax
   Price 7D Avg = 
   CALCULATE(
       [Avg Price],
       DATESINPERIOD('Date'[FullDate], LASTDATE('Date'[FullDate]), -7, DAY)
   )
   ```

6. **Test Measures in Excel**
   - Build → Deploy (deploys to local SSAS instance)
   - Open Excel → Data → Get Data → From Analysis Services
   - Server: `localhost`, Database: `NoodlesCryptoTabular`
   - Create PivotTable:
     - Rows: Currency[CurrencySymbol]
     - Values: [Current Price], [Total Volume 24h], [Total Engagements]
   - Verify measures calculate correctly

7. **Document Measures**
   - Create `bi-artifacts/ssas/measures-list.md`
   - List each measure with:
     - Name
     - Formula (DAX)
     - Description
     - Example use case

### Repo Paths
- `bi-artifacts/ssas/NoodlesCryptoTabular/` (project folder)
- `bi-artifacts/ssas/NoodlesCryptoTabular/Model.bim` (model definition)
- `bi-artifacts/ssas/measures-list.md`

### Deliverables
- SSAS Tabular project with 5+ tables
- 8-10 DAX measures implemented
- Model deploys and processes successfully
- Excel PivotTable screenshot showing measures working
- measures-list.md documenting all measures

### Acceptance Criteria
- Model deploys without errors
- All relationships configured correctly
- Measures calculate accurate values (spot-check against SQL)
- Excel can connect and display data
- measures-list.md documents all measures

