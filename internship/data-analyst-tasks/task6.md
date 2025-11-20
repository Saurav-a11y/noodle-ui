## Task 6 – SSRS Report: Top Gainers

### Focus
Build one parameterized SSRS report showing top currencies by price change.

### Getting started

1. **Create SSRS Project**
   - Visual Studio → New Project → Report Server Project
   - Name: `NoodlesCryptoReports`
   - Location: `bi-artifacts/ssrs/`

2. **Create Shared Data Source**
   - Right-click Shared Data Sources → Add New Data Source
   - Name: `DS_NoodlesDW`
   - Type: Microsoft SQL Server
   - Connection string: `Data Source=localhost;Initial Catalog=NoodlesDW`
   - Test Connection → OK

3. **Create Report: Top Gainers**
   - Right-click Reports → Add New Report
   - Name: `TopGainersReport.rdl`
   - Use Report Wizard or blank report

4. **Create Dataset**
   - Data Source: `DS_NoodlesDW`
   - Query:
   ```sql
   SELECT TOP (@TopN)
       dc.CurrencySymbol,
       dc.CurrencyName,
       f.ClosePrice AS CurrentPrice,
       f.PriceChange1d AS PriceChange,
       f.Volume24h,
       f.MarketCap
   FROM DW.FactCurrencyDailySnapshot f
   INNER JOIN DW.DimCurrency dc ON f.CurrencyKey = dc.CurrencyKey AND dc.IsCurrent = 1
   INNER JOIN DW.DimDate dd ON f.DateKey = dd.DateKey
   WHERE dd.FullDate = @SelectedDate
   ORDER BY f.PriceChange1d DESC;
   ```
   - Add Parameters:
     - `@SelectedDate` (DateTime, default: `=Today()`)
     - `@TopN` (Integer, default: 10, available values: 5, 10, 20, 50)

5. **Design Report Layout**
   - **Header**:
     - Title: "Top Gainers - [Date]" (use expression: `="Top Gainers - " & Parameters!SelectedDate.Value`)
     - Add logo or company name
   
   - **Parameters Section**:
     - Date picker for `@SelectedDate`
     - Dropdown for `@TopN`
   
   - **Table**:
     - Columns: Currency Symbol, Currency Name, Current Price, Price Change %, Volume 24h, Market Cap
     - Format numbers:
       - Current Price: `$#,##0.00`
       - Price Change: `#,##0.00%` with conditional formatting (green if >0, red if <0)
       - Volume/Market Cap: `$#,##0,,.0M` (millions)
     - Sort: Price Change descending
   
   - **Footer**:
     - "Report generated: [Timestamp]" (use `=Now()`)

6. **Add Conditional Formatting**
   - Price Change % cell:
     - Background Color expression: `=IIF(Fields!PriceChange.Value > 0, "LightGreen", "LightCoral")`
     - Font Color: `=IIF(Fields!PriceChange.Value > 0, "DarkGreen", "DarkRed")`

7. **Test Report**
   - Preview tab → Select different dates and TopN values
   - Verify:
     - Data displays correctly
     - Conditional formatting works
     - Parameters filter data
   - Export to PDF → Verify formatting preserved

8. **Deploy Report (Optional)**
   - If Report Server configured:
     - Right-click project → Properties
     - TargetServerURL: `http://localhost/ReportServer`
     - Deploy
   - Otherwise: Save .rdl file and provide screenshots

9. **Document Report**
   - Create `bi-artifacts/ssrs/report-documentation.md`
   - Include:
     - Report name and purpose
     - Parameters and defaults
     - How to use the report
     - Screenshot of sample output

### Repo Paths
- `bi-artifacts/ssrs/NoodlesCryptoReports.rptproj`
- `bi-artifacts/ssrs/DS_NoodlesDW.rds`
- `bi-artifacts/ssrs/TopGainersReport.rdl`
- `bi-artifacts/ssrs/report-documentation.md`

### Deliverables
- SSRS report (.rdl file)
- Report renders correctly with parameters
- PDF export of sample report
- report-documentation.md

### Acceptance Criteria
- Report executes without errors
- Parameters work (date and TopN)
- Conditional formatting displays correctly
- Export to PDF successful
- Documentation explains report usage

