## Task 5 – .NET Microservice Scaffold + SQL Logging

### Focus
Create a minimal C#/.NET API that proxies one endpoint and logs requests to SQL Server.

### Getting started

1. **Prerequisites**
   - Install .NET SDK 8.0+ ([download](https://dotnet.microsoft.com/download))
   - Install SQL Server (LocalDB, Express, or Docker)
   - Install SQL Server Management Studio (SSMS) or Azure Data Studio

2. **Create .NET Web API project**
   - In repo root, create `server-dotnet/` folder:
     ```bash
     mkdir server-dotnet
     cd server-dotnet
     dotnet new webapi -n NoodlesApi
     cd NoodlesApi
     ```
   - Verify it runs:
     ```bash
     dotnet run
     ```
   - Test default endpoint: `http://localhost:5000/weatherforecast`

3. **Add SQL Server packages**
   - Install Entity Framework Core and SQL Server provider:
     ```bash
     dotnet add package Microsoft.EntityFrameworkCore.SqlServer
     dotnet add package Microsoft.EntityFrameworkCore.Tools
     ```

4. **Create SQL Server database**
   - Open SSMS and connect to your local SQL Server
   - Create database:
     ```sql
     CREATE DATABASE NoodlesDb;
     ```

5. **Create ApiRequestLog table**
   - Create folder: `server-dotnet/NoodlesApi/Database/SqlServer/`
   - Create file: `001_create_api_request_log.sql`:
     ```sql
     USE NoodlesDb;
     GO
     
     CREATE TABLE ApiRequestLog (
         LogId BIGINT IDENTITY(1,1) PRIMARY KEY,
         Endpoint NVARCHAR(500) NOT NULL,
         Method NVARCHAR(10) NOT NULL,
         StatusCode INT NOT NULL,
         DurationMs INT NOT NULL,
         RequestTimestamp DATETIME2 DEFAULT GETDATE(),
         ErrorMessage NVARCHAR(MAX) NULL
     );
     
     CREATE INDEX IX_ApiRequestLog_Timestamp 
         ON ApiRequestLog(RequestTimestamp DESC);
     ```
   - Run this script in SSMS to create the table

6. **Create Entity Framework DbContext**
   - Create folder: `server-dotnet/NoodlesApi/Data/`
   - Create file: `NoodlesDbContext.cs`:
     ```csharp
     using Microsoft.EntityFrameworkCore;
     
     namespace NoodlesApi.Data
     {
         public class ApiRequestLog
         {
             public long LogId { get; set; }
             public string Endpoint { get; set; } = string.Empty;
             public string Method { get; set; } = string.Empty;
             public int StatusCode { get; set; }
             public int DurationMs { get; set; }
             public DateTime RequestTimestamp { get; set; } = DateTime.UtcNow;
             public string? ErrorMessage { get; set; }
         }
         
         public class NoodlesDbContext : DbContext
         {
             public NoodlesDbContext(DbContextOptions<NoodlesDbContext> options)
                 : base(options)
             {
             }
             
             public DbSet<ApiRequestLog> ApiRequestLogs { get; set; }
         }
     }
     ```

7. **Configure connection string**
   - Update `appsettings.json`:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Server=localhost;Database=NoodlesDb;Trusted_Connection=True;TrustServerCertificate=True;"
       },
       "Logging": {
         "LogLevel": {
           "Default": "Information"
         }
       }
     }
     ```

8. **Register DbContext in Program.cs**
   - Update `Program.cs`:
     ```csharp
     using Microsoft.EntityFrameworkCore;
     using NoodlesApi.Data;
     
     var builder = WebApplication.CreateBuilder(args);
     
     // Add services
     builder.Services.AddControllers();
     builder.Services.AddEndpointsApiExplorer();
     builder.Services.AddSwaggerGen();
     
     // Add DbContext
     builder.Services.AddDbContext<NoodlesDbContext>(options =>
         options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
     
     // Add HttpClient for proxying
     builder.Services.AddHttpClient();
     
     var app = builder.Build();
     
     // Configure middleware
     if (app.Environment.IsDevelopment())
     {
         app.UseSwagger();
         app.UseSwaggerUI();
     }
     
     app.UseHttpsRedirection();
     app.UseAuthorization();
     app.MapControllers();
     
     app.Run();
     ```

9. **Create Stablecoins proxy controller**
   - Create folder: `server-dotnet/NoodlesApi/Controllers/`
   - Create file: `StablecoinsController.cs`:
     ```csharp
     using Microsoft.AspNetCore.Mvc;
     using System.Diagnostics;
     using NoodlesApi.Data;
     
     namespace NoodlesApi.Controllers
     {
         [ApiController]
         [Route("api/[controller]")]
         public class StablecoinsController : ControllerBase
         {
             private readonly IHttpClientFactory _httpClientFactory;
             private readonly NoodlesDbContext _dbContext;
             private readonly ILogger<StablecoinsController> _logger;
             
             public StablecoinsController(
                 IHttpClientFactory httpClientFactory,
                 NoodlesDbContext dbContext,
                 ILogger<StablecoinsController> logger)
             {
                 _httpClientFactory = httpClientFactory;
                 _dbContext = dbContext;
                 _logger = logger;
             }
             
             [HttpGet("list")]
             public async Task<IActionResult> GetList(
                 [FromQuery] string? q,
                 [FromQuery] int limit = 20,
                 [FromQuery] int page = 1)
             {
                 var stopwatch = Stopwatch.StartNew();
                 var endpoint = $"/api/stablecoins/list?q={q}&limit={limit}&page={page}";
                 
                 try
                 {
                     // Proxy request to upstream API
                     var client = _httpClientFactory.CreateClient();
                     var upstreamUrl = $"https://data-api.agentos.cloud/noodle/stablecoins?q={q}&limit={limit}&page={page}";
                     
                     var response = await client.GetAsync(upstreamUrl);
                     stopwatch.Stop();
                     
                     // Log request
                     await LogRequest(endpoint, "GET", (int)response.StatusCode, (int)stopwatch.ElapsedMilliseconds, null);
                     
                     if (!response.IsSuccessStatusCode)
                     {
                         return StatusCode((int)response.StatusCode, new { error = "Upstream API error" });
                     }
                     
                     var content = await response.Content.ReadAsStringAsync();
                     return Content(content, "application/json");
                 }
                 catch (Exception ex)
                 {
                     stopwatch.Stop();
                     _logger.LogError(ex, "Error proxying stablecoins request");
                     
                     await LogRequest(endpoint, "GET", 500, (int)stopwatch.ElapsedMilliseconds, ex.Message);
                     
                     return StatusCode(500, new { error = "Internal server error" });
                 }
             }
             
             private async Task LogRequest(string endpoint, string method, int statusCode, int durationMs, string? errorMessage)
             {
                 try
                 {
                     var log = new ApiRequestLog
                     {
                         Endpoint = endpoint,
                         Method = method,
                         StatusCode = statusCode,
                         DurationMs = durationMs,
                         ErrorMessage = errorMessage
                     };
                     
                     _dbContext.ApiRequestLogs.Add(log);
                     await _dbContext.SaveChangesAsync();
                 }
                 catch (Exception ex)
                 {
                     _logger.LogError(ex, "Failed to log API request");
                 }
             }
         }
     }
     ```

10. **Test the service**
    - Run the .NET API:
      ```bash
      cd server-dotnet/NoodlesApi
      dotnet run
      ```
    - Test endpoint: `http://localhost:5000/api/stablecoins/list?limit=10`
    - Verify SQL logs:
      ```sql
      SELECT * FROM ApiRequestLog ORDER BY RequestTimestamp DESC;
      ```

11. **Create README**
    - Create `server-dotnet/README.md`:
      - Setup instructions
      - How to run the service
      - API endpoints available
      - Database connection setup

### Repo Paths
- `server-dotnet/NoodlesApi/` (new project)
- `server-dotnet/NoodlesApi/Controllers/StablecoinsController.cs`
- `server-dotnet/NoodlesApi/Data/NoodlesDbContext.cs`
- `server-dotnet/NoodlesApi/Database/SqlServer/001_create_api_request_log.sql`
- `server-dotnet/README.md`

### Deliverables
- Running .NET API service
- SQL Server database with ApiRequestLog table
- Proxy endpoint that logs requests
- README with setup instructions

### Acceptance Criteria
- .NET service runs without errors (`dotnet run`)
- GET `/api/stablecoins/list` returns data from upstream API
- Each request logged to SQL Server with status code and duration
- SQL query shows request logs with timestamps
- README explains setup and usage

