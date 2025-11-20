## Task 4 – SSIS: Transform Staging to Star Schema

### Focus
Build SSIS packages to load dimensions and facts from staging tables.

### Getting started

1. **Load DimCurrency (Simple Version)**
   - Create package: `04_Load_DimCurrency.dtsx`
   - Use SQL-based approach (Execute SQL Task):
   ```sql
   -- Insert new currencies only (no SCD Type 2 for now)
   INSERT INTO DW.DimCurrency (
       CurrencySymbol, CurrencyName, BaseCurrency, MaxSupply, 
       CirculatingSupply, WebsiteURL, IsCurrent
   )
   SELECT DISTINCT
       symbol,
       base_currency_desc,
       base_currency,
       TRY_CAST(NULLIF(max_supply, 'Unlimited') AS DECIMAL(28,8)),
       TRY_CAST(circulating_supply AS DECIMAL(28,8)),
       website,
       1 AS IsCurrent
   FROM Staging.Currency
   WHERE symbol NOT IN (SELECT CurrencySymbol FROM DW.DimCurrency WHERE IsCurrent = 1);
   ```
   - Test: Run package → Verify new currencies inserted

2. **Load FactCurrencyDailySnapshot**
   - Create package: `05_Load_FactCurrencyDailySnapshot.dtsx`
   - Execute SQL Task:
   ```sql
   -- Merge staging data into fact table
   MERGE DW.FactCurrencyDailySnapshot AS Target
   USING (
       SELECT 
           dc.CurrencyKey,
           dd.DateKey,
           TRY_CAST(so.market_open AS DECIMAL(28,8)) AS OpenPrice,
           TRY_CAST(so.market_close AS DECIMAL(28,8)) AS ClosePrice,
           TRY_CAST(so.market_high AS DECIMAL(28,8)) AS HighPrice,
           TRY_CAST(so.market_low AS DECIMAL(28,8)) AS LowPrice,
           TRY_CAST(so.market_24h_vol_cmc AS DECIMAL(28,2)) AS Volume24h,
           TRY_CAST(so.market_cap_calc AS DECIMAL(28,2)) AS MarketCap
       FROM Staging.CurrencyOverview so
       INNER JOIN DW.DimCurrency dc ON so.symbol = dc.CurrencySymbol AND dc.IsCurrent = 1
       INNER JOIN DW.DimDate dd ON dd.FullDate = CAST(so.LoadTimestamp AS DATE)
   ) AS Source
   ON Target.CurrencyKey = Source.CurrencyKey AND Target.DateKey = Source.DateKey
   WHEN MATCHED THEN
       UPDATE SET 
           OpenPrice = Source.OpenPrice,
           ClosePrice = Source.ClosePrice,
           HighPrice = Source.HighPrice,
           LowPrice = Source.LowPrice,
           Volume24h = Source.Volume24h,
           MarketCap = Source.MarketCap
   WHEN NOT MATCHED THEN
       INSERT (CurrencyKey, DateKey, OpenPrice, ClosePrice, HighPrice, LowPrice, Volume24h, MarketCap)
       VALUES (Source.CurrencyKey, Source.DateKey, Source.OpenPrice, Source.ClosePrice, 
               Source.HighPrice, Source.LowPrice, Source.Volume24h, Source.MarketCap);
   ```

3. **Load FactSocialEngagement**
   - Create package: `06_Load_FactSocialEngagement.dtsx`
   - Execute SQL Task:
   ```sql
   INSERT INTO DW.FactSocialEngagement (
       CurrencyKey, DateKey, PlatformKey, EngagementType, EngagementId,
       LikeCount, RetweetCount, CommentCount, EngagementTimestamp
   )
   SELECT 
       ISNULL(dc.CurrencyKey, -1), -- Use -1 for unknown currencies
       dd.DateKey,
       dsp.PlatformKey,
       se.platform,
       se.engagement_id,
       ISNULL(se.like_count, 0),
       ISNULL(se.retweet_count, 0),
       ISNULL(se.comment_count, 0),
       TRY_CAST(se.engagement_timestamp AS DATETIME2)
   FROM Staging.SocialEngagement se
   LEFT JOIN DW.DimCurrency dc ON se.token_symbol = dc.CurrencySymbol AND dc.IsCurrent = 1
   LEFT JOIN DW.DimDate dd ON dd.FullDate = CAST(TRY_CAST(se.engagement_timestamp AS DATETIME2) AS DATE)
   LEFT JOIN DW.DimSocialPlatform dsp ON se.platform = dsp.PlatformName
   WHERE NOT EXISTS (
       SELECT 1 FROM DW.FactSocialEngagement f
       WHERE f.EngagementId = se.engagement_id
   );
   ```

4. **Create Master Star Load Package**
   - Create `07_Master_Star_Load.dtsx`
   - Execute Package Tasks in order:
     - 04_Load_DimCurrency.dtsx
     - 05_Load_FactCurrencyDailySnapshot.dtsx
     - 06_Load_FactSocialEngagement.dtsx

5. **Test Complete Pipeline**
   - Execute `00_Master_Staging_Load.dtsx` (from Task 3)
   - Execute `07_Master_Star_Load.dtsx`
   - Verify:
     - DimCurrency has currencies from staging
     - FactCurrencyDailySnapshot has daily snapshots
     - FactSocialEngagement has social data
     - Row counts reasonable

6. **Validate Data Quality**
   - Run validation queries:
   ```sql
   -- Check for orphaned facts
   SELECT COUNT(*) FROM DW.FactCurrencyDailySnapshot 
   WHERE CurrencyKey NOT IN (SELECT CurrencyKey FROM DW.DimCurrency);
   
   -- Check date coverage
   SELECT MIN(dd.FullDate), MAX(dd.FullDate), COUNT(DISTINCT f.CurrencyKey)
   FROM DW.FactCurrencyDailySnapshot f
   INNER JOIN DW.DimDate dd ON f.DateKey = dd.DateKey;
   
   -- Check social engagement by platform
   SELECT dsp.PlatformName, COUNT(*) AS EngagementCount
   FROM DW.FactSocialEngagement f
   INNER JOIN DW.DimSocialPlatform dsp ON f.PlatformKey = dsp.PlatformKey
   GROUP BY dsp.PlatformName;
   ```

7. **Update Runbook**
   - Add to `bi-artifacts/ssis/RUNBOOK.md`:
     - How to run star load packages
     - Expected row counts in star schema
     - Validation queries to check data quality

### Repo Paths
- `bi-artifacts/ssis/04_Load_DimCurrency.dtsx`
- `bi-artifacts/ssis/05_Load_FactCurrencyDailySnapshot.dtsx`
- `bi-artifacts/ssis/06_Load_FactSocialEngagement.dtsx`
- `bi-artifacts/ssis/07_Master_Star_Load.dtsx`
- `bi-artifacts/ssis/RUNBOOK.md` (updated)

### Deliverables
- 4 SSIS packages (3 star loads + 1 master)
- Star schema tables populated
- Validation query results
- Updated RUNBOOK.md

### Acceptance Criteria
- All packages execute successfully
- Star schema tables have data
- No orphaned facts (validation queries pass)
- RUNBOOK.md updated with star load instructions

