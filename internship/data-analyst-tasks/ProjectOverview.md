## Welcome to Project Noodles - Data Analyst Track

You're joining a high-impact Financial Intelligence Platform that processes millions of data points daily to deliver actionable insights on currencies, commodities, and market trends. Your mission: architect and deliver a production-grade Microsoft BI solution that transforms raw data into intelligence.

### What You're Building

A complete end-to-end BI pipeline handling **~1 million rows** of real-world financial data:
- **ETL Pipeline** (SSIS) - Automated data ingestion and transformation
- **Data Warehouse** (SQL Server) - Dimensional model with star schema
- **Analytical Engine** (SSAS Tabular) - In-memory analytics with DAX measures
- **Operational Reports** (SSRS) - Parameterized, exportable reports
- **Executive Dashboard** (Power BI) - Interactive visualizations with drill-through

This isn't a tutorial project—it's a production-ready BI solution that demonstrates enterprise-grade data engineering skills.

### Your Role

As **Data Analyst**, you own the entire BI stack. You'll make architectural decisions, design dimensional models, implement ETL processes, and deliver dashboards that stakeholders will actually use. You're not following a template—you're solving real data challenges.

**Your Responsibilities:**
- Design dimensional models (star schema) optimized for analytical queries
- Build robust ETL pipelines with error handling and audit logging
- Create SSAS Tabular models with business-friendly measures
- Develop parameterized reports for operational teams
- Deliver interactive Power BI dashboards for executives
- Optimize performance for million-row datasets
- Document refresh strategies and data quality processes

### The Data

You'll work with cryptocurrency market data including:
- **Currency Metadata** - Names, symbols, market caps, supply metrics
- **Market Data** - Prices, volumes, volatility, daily snapshots
- **Social Metrics** - Community engagement, sentiment, growth rates
- **Platform Activity** - GitHub commits, Twitter mentions, Reddit posts
- **User Behavior** - Watchlists, holdings, activity logs

**Data Volume:** ~1M rows across multiple CSV files  
**Schema Documentation:** `noodles-crypto-schema.md`  
**Update Frequency:** Daily incremental loads

### Technology Stack

**Microsoft BI Stack:**
- **SSIS** (SQL Server Integration Services) - ETL orchestration
- **SQL Server** - Data warehouse with staging and star schema
- **SSAS Tabular** - In-memory analytical model
- **SSRS** (SQL Server Reporting Services) - Operational reports
- **Power BI Desktop** - Interactive dashboards

**Skills You'll Master:**
- Dimensional modeling (Kimball methodology)
- ETL design patterns (staging, SCD Type 1/2, surrogate keys)
- DAX (Data Analysis Expressions) for measures
- SQL optimization (indexes, partitions, query tuning)
- Report design (parameters, drill-through, conditional formatting)
- Dashboard UX (slicers, cross-filtering, visual hierarchy)

### Your 8-Week Journey

**Weeks 1-2: Foundation**
- Profile source data and design star schema
- Build SSIS packages for staging layer
- Implement data quality checks and logging

**Weeks 3-4: Transformation**
- Load dimensional model (dimensions + facts)
- Implement surrogate keys and SCD logic
- Create indexes and partitions for performance

**Weeks 5-6: Analytics & Reporting**
- Build SSAS Tabular model with DAX measures
- Create parameterized SSRS reports
- Develop interactive Power BI dashboard

**Weeks 7-8: Production Readiness**
- Automate refresh with SQL Agent jobs
- Optimize performance for 1M+ rows
- Validate data quality and reconcile with source
- Document end-to-end solution

### Key Deliverables

**Week 2:** Star schema design + SSIS staging packages  
**Week 4:** Dimensional model loaded + SSAS Tabular model  
**Week 6:** SSRS reports + Power BI dashboard  
**Week 8:** Automated refresh + performance optimization + documentation

### Success Criteria

Your solution will be evaluated on:
- **Data Model Quality** - Proper dimensional design, clear relationships
- **ETL Robustness** - Error handling, logging, idempotency
- **Performance** - Sub-second query response on 1M+ rows
- **Usability** - Business-friendly measures, intuitive reports/dashboards
- **Documentation** - Clear runbooks, refresh strategies, troubleshooting guides

### What Makes This Different

This isn't a classroom exercise. You're building a real BI solution with:
- **Production data volumes** (1M+ rows)
- **Real business questions** (What are top gainers? Which currencies have highest engagement?)
- **Performance constraints** (Reports must load in <3 seconds)
- **Automation requirements** (Daily refresh without manual intervention)
- **Stakeholder deliverables** (Dashboards executives will actually use)

### Portfolio Impact

By completion, you'll have:
- **Production-grade BI solution** across the full Microsoft stack
- **Dimensional model** demonstrating data warehousing expertise
- **ETL packages** showing automation and error handling skills
- **SSAS model** with complex DAX measures
- **Power BI dashboard** showcasing visualization skills
- **Performance benchmarks** proving scalability
- **Complete documentation** demonstrating professionalism

**This is portfolio material that gets you hired.**

### Getting Started

1. Review the data schema: `noodles-crypto-schema.md`
2. Set up your environment (SQL Server, SSIS, SSAS, Power BI)
3. Start with Task 1: Data Profiling & Star Schema Design
4. Build iteratively, test thoroughly, document everything

**Let's build something remarkable.** 🚀
