## Task 7 – Power BI Dashboard: Executive Overview

### Focus

Build one interactive Power BI dashboard with 3-5 visuals and basic interactivity.

### Getting started

1. **Connect to Data Source**

   - Open Power BI Desktop
   - Get Data → SQL Server
   - Server: `localhost`, Database: `NoodlesDW`
   - Select tables:
     - DW.DimCurrency
     - DW.DimDate
     - DW.FactCurrencyDailySnapshot
   - Load (Import mode)

2. **Configure Model**

   - Verify relationships auto-created:
     - FactCurrencyDailySnapshot[CurrencyKey] → DimCurrency[CurrencyKey]
     - FactCurrencyDailySnapshot[DateKey] → DimDate[DateKey]
   - Mark DimDate as date table: Table tools → Mark as date table
   - Hide technical columns: CurrencyKey, DateKey

3. **Create Basic Measures**

   - Create measure table: Enter Data → Name it "Measures"
   - Add measures:

   ```dax
   Total Market Cap = SUM(FactCurrencyDailySnapshot[MarketCap])

   Total Volume = SUM(FactCurrencyDailySnapshot[Volume24h])

   Avg Price = AVERAGE(FactCurrencyDailySnapshot[ClosePrice])

   Currency Count = DISTINCTCOUNT(DimCurrency[CurrencySymbol])
   ```

4. **Build Dashboard Page**

   - Page name: "Executive Overview"
   - Canvas size: 1920x1080 (16:9)

5. **Add Visuals**

   **Visual 1: KPI Cards (Top Row)**

   - Add 4 Card visuals:
     - Total Market Cap (format as $B)
     - Total Volume (format as $M)
     - Currency Count
     - Avg Price (format as $)
   - Arrange horizontally across top

   **Visual 2: Price Trend Line Chart (Middle Left)**

   - Visual: Line chart
   - X-axis: DimDate[FullDate] (last 30 days)
   - Y-axis: [Avg Price]
   - Legend: DimCurrency[CurrencySymbol] (filter to top 5 by market cap)
   - Title: "Price Trends (Top 5 Currencies)"

   **Visual 3: Volume Bar Chart (Middle Right)**

   - Visual: Clustered bar chart
   - Y-axis: DimCurrency[CurrencySymbol] (top 10)
   - X-axis: [Total Volume]
   - Data labels: On
   - Title: "Volume by Currency (Top 10)"
   - Sort: Descending by volume

   **Visual 4: Top Gainers Table (Bottom Left)**

   - Visual: Table
   - Columns: CurrencySymbol, [Avg Price], FactCurrencyDailySnapshot[PriceChange1d]
   - Filter: Top 10 by PriceChange1d
   - Conditional formatting: Data bars on PriceChange1d (green)
   - Title: "Top Gainers"

   **Visual 5: Market Cap Pie Chart (Bottom Right)**

   - Visual: Pie chart
   - Legend: DimCurrency[CurrencySymbol] (top 5)
   - Values: [Total Market Cap]
   - Data labels: Percentage
   - Title: "Market Cap Distribution"

6. **Add Slicers**

   - Date Range Slicer (left sidebar):
     - Field: DimDate[FullDate]
     - Style: Between
     - Default: Last 30 days
   - Currency Category Slicer (optional, if category exists):
     - Field: DimCurrency[Category]
     - Style: Dropdown

7. **Test Interactivity**

   - Click currency in bar chart → Verify other visuals filter
   - Adjust date slicer → Verify all visuals update
   - Click pie chart slice → Verify cross-filtering works

8. **Format Dashboard**

   - Apply consistent theme: View → Themes → Choose professional theme
   - Align visuals: Format → Align → Distribute horizontally/vertically
   - Add background color (light gray) for better contrast
   - Ensure all titles visible and descriptive

9. **Publish to Power BI Service (Optional)**

   - Sign in to Power BI Service
   - Home → Publish
   - Select workspace
   - Note: Requires Power BI Pro license or trial

10. **Document Dashboard**
    - Create `bi-artifacts/powerbi/dashboard-guide.md`
    - Include:
      - Dashboard purpose
      - Visual descriptions
      - How to use slicers
      - Screenshot of dashboard

### Repo Paths

- `bi-artifacts/powerbi/NoodlesCrypto.pbix`
- `bi-artifacts/powerbi/dashboard-guide.md`
- `bi-artifacts/powerbi/screenshots/executive-dashboard.png`

### Deliverables

- Power BI Desktop file (.pbix)
- Dashboard with 5+ visuals
- Interactive cross-filtering working
- dashboard-guide.md with screenshot

### Acceptance Criteria

- Dashboard loads without errors
- All visuals display data correctly
- Cross-filtering works (click visual → others filter)
- Slicers update all visuals
- Professional formatting applied
- Documentation includes screenshot and usage guide

