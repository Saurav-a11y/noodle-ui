## Task 6 – Watchlist Upsert Endpoint (.NET + SQL + MongoDB)

### Focus
Create a POST endpoint in .NET for watchlist holdings; write to SQL Server and log activity to MongoDB.

### Getting started

1. **Add MongoDB packages**
   - In `server-dotnet/NoodlesApi/`:
     ```bash
     dotnet add package MongoDB.Driver
     ```

2. **Create SQL table for Holdings**
   - Create file: `server-dotnet/NoodlesApi/Database/SqlServer/002_create_holdings.sql`:
     ```sql
     USE NoodlesDb;
     GO
     
     CREATE TABLE Holdings (
         HoldingId BIGINT IDENTITY(1,1) PRIMARY KEY,
         UserId NVARCHAR(100) NOT NULL,
         AssetId NVARCHAR(100) NOT NULL,
         AssetType NVARCHAR(50) NOT NULL,
         HoldingsAmount DECIMAL(18,8) NOT NULL,
         CreatedAt DATETIME2 DEFAULT GETDATE(),
         UpdatedAt DATETIME2 DEFAULT GETDATE(),
         CONSTRAINT UQ_Holdings_UserAsset UNIQUE (UserId, AssetId, AssetType)
     );
     
     CREATE INDEX IX_Holdings_UserId ON Holdings(UserId);
     ```
   - Run this script in SSMS

3. **Add Holdings entity to DbContext**
   - Update `Data/NoodlesDbContext.cs`:
     ```csharp
     public class Holding
     {
         public long HoldingId { get; set; }
         public string UserId { get; set; } = string.Empty;
         public string AssetId { get; set; } = string.Empty;
         public string AssetType { get; set; } = string.Empty;
         public decimal HoldingsAmount { get; set; }
         public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
         public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
     }
     
     // In NoodlesDbContext class, add:
     public DbSet<Holding> Holdings { get; set; }
     ```

4. **Create MongoDB activity log model**
   - Create folder: `server-dotnet/NoodlesApi/Data/Mongo/`
   - Create file: `UserActivityLog.cs`:
     ```csharp
     using MongoDB.Bson;
     using MongoDB.Bson.Serialization.Attributes;
     
     namespace NoodlesApi.Data.Mongo
     {
         public class UserActivityLog
         {
             [BsonId]
             [BsonRepresentation(BsonType.ObjectId)]
             public string? Id { get; set; }
             
             public string UserId { get; set; } = string.Empty;
             public string Activity { get; set; } = string.Empty;
             public string AssetType { get; set; } = string.Empty;
             public string AssetId { get; set; } = string.Empty;
             public string Content { get; set; } = string.Empty;
             public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
         }
     }
     ```

5. **Configure MongoDB connection**
   - Update `appsettings.json`:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Server=localhost;Database=NoodlesDb;Trusted_Connection=True;TrustServerCertificate=True;",
         "MongoDB": "mongodb://localhost:27017"
       },
       "MongoDatabase": "noodles"
     }
     ```

6. **Create MongoDB service**
   - Create folder: `server-dotnet/NoodlesApi/Services/`
   - Create file: `MongoService.cs`:
     ```csharp
     using MongoDB.Driver;
     using NoodlesApi.Data.Mongo;
     
     namespace NoodlesApi.Services
     {
         public class MongoService
         {
             private readonly IMongoCollection<UserActivityLog> _activityLogs;
             
             public MongoService(IConfiguration config)
             {
                 var connectionString = config.GetConnectionString("MongoDB");
                 var databaseName = config["MongoDatabase"];
                 
                 var client = new MongoClient(connectionString);
                 var database = client.GetDatabase(databaseName);
                 
                 _activityLogs = database.GetCollection<UserActivityLog>("user_activity_logs");
             }
             
             public async Task LogActivity(UserActivityLog log)
             {
                 await _activityLogs.InsertOneAsync(log);
             }
         }
     }
     ```

7. **Register MongoDB service in Program.cs**
   - Update `Program.cs`:
     ```csharp
     using NoodlesApi.Services;
     
     // Add this line after AddDbContext:
     builder.Services.AddSingleton<MongoService>();
     ```

8. **Create Watchlist controller**
   - Create file: `Controllers/WatchlistController.cs`:
     ```csharp
     using Microsoft.AspNetCore.Mvc;
     using Microsoft.EntityFrameworkCore;
     using NoodlesApi.Data;
     using NoodlesApi.Data.Mongo;
     using NoodlesApi.Services;
     
     namespace NoodlesApi.Controllers
     {
         [ApiController]
         [Route("api/[controller]")]
         public class WatchlistController : ControllerBase
         {
             private readonly NoodlesDbContext _dbContext;
             private readonly MongoService _mongoService;
             private readonly ILogger<WatchlistController> _logger;
             
             public WatchlistController(
                 NoodlesDbContext dbContext,
                 MongoService mongoService,
                 ILogger<WatchlistController> logger)
             {
                 _dbContext = dbContext;
                 _mongoService = mongoService;
                 _logger = logger;
             }
             
             [HttpPost("holdings")]
             public async Task<IActionResult> UpsertHolding([FromBody] UpsertHoldingRequest request)
             {
                 // Validate input
                 if (string.IsNullOrWhiteSpace(request.UserId) ||
                     string.IsNullOrWhiteSpace(request.AssetId) ||
                     request.Holdings < 0)
                 {
                     return BadRequest(new { error = "Invalid request data" });
                 }
                 
                 try
                 {
                     // Upsert to SQL Server
                     var existing = await _dbContext.Holdings
                         .FirstOrDefaultAsync(h => 
                             h.UserId == request.UserId && 
                             h.AssetId == request.AssetId &&
                             h.AssetType == request.AssetType);
                     
                     if (existing != null)
                     {
                         // Update
                         existing.HoldingsAmount = request.Holdings;
                         existing.UpdatedAt = DateTime.UtcNow;
                     }
                     else
                     {
                         // Insert
                         var holding = new Holding
                         {
                             UserId = request.UserId,
                             AssetId = request.AssetId,
                             AssetType = request.AssetType,
                             HoldingsAmount = request.Holdings
                         };
                         _dbContext.Holdings.Add(holding);
                     }
                     
                     await _dbContext.SaveChangesAsync();
                     
                     // Log activity to MongoDB
                     var activityLog = new UserActivityLog
                     {
                         UserId = request.UserId,
                         Activity = existing != null ? "Watchlist_Update" : "Watchlist_Add",
                         AssetType = request.AssetType,
                         AssetId = request.AssetId,
                         Content = $"Holdings: {request.Holdings}"
                     };
                     
                     await _mongoService.LogActivity(activityLog);
                     
                     return Ok(new { 
                         success = true,
                         action = existing != null ? "updated" : "created"
                     });
                 }
                 catch (Exception ex)
                 {
                     _logger.LogError(ex, "Error upserting holding");
                     return StatusCode(500, new { error = "Internal server error" });
                 }
             }
             
             [HttpGet("holdings/{userId}")]
             public async Task<IActionResult> GetHoldings(string userId)
             {
                 try
                 {
                     var holdings = await _dbContext.Holdings
                         .Where(h => h.UserId == userId)
                         .ToListAsync();
                     
                     return Ok(holdings);
                 }
                 catch (Exception ex)
                 {
                     _logger.LogError(ex, "Error fetching holdings");
                     return StatusCode(500, new { error = "Internal server error" });
                 }
             }
         }
         
         public class UpsertHoldingRequest
         {
             public string UserId { get; set; } = string.Empty;
             public string AssetId { get; set; } = string.Empty;
             public string AssetType { get; set; } = string.Empty;
             public decimal Holdings { get; set; }
         }
     }
     ```

9. **Update Next.js to use .NET endpoint (dev only)**
   - Update `apis/index.ts`:
     ```typescript
     // Add at top:
     const USE_DOTNET_API = process.env.NEXT_PUBLIC_USE_DOTNET === 'true'
     const DOTNET_API_URL = process.env.NEXT_PUBLIC_DOTNET_API_URL || 'http://localhost:5000'
     
     // Update upsertHoldingsApi function:
     export const upsertHoldingsApi = async (params: {
       userId: string
       assetId: string
       assetType: string
       holdings: number
     }) => {
       const url = USE_DOTNET_API
         ? `${DOTNET_API_URL}/api/watchlist/holdings`
         : `${BASE_URL}/watchlist/upsert`
       
       const res = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(params)
       })
       
       if (!res.ok) throw new Error('Failed to upsert holding')
       return res.json()
     }
     ```

10. **Add environment variable**
    - Create `.env.local`:
      ```
      NEXT_PUBLIC_USE_DOTNET=true
      NEXT_PUBLIC_DOTNET_API_URL=http://localhost:5000
      ```

11. **Test end-to-end**
    - Start MongoDB (Docker or local)
    - Start .NET API: `dotnet run`
    - Start Next.js: `npm run dev`
    - Test watchlist add/update in UI
    - Verify SQL: `SELECT * FROM Holdings`
    - Verify MongoDB: `db.user_activity_logs.find()`

12. **Create documentation**
    - Update `server-dotnet/README.md`:
      - MongoDB setup instructions
      - API endpoints (POST /api/watchlist/holdings)
      - Environment variables for Next.js

### Repo Paths
- `server-dotnet/NoodlesApi/Controllers/WatchlistController.cs`
- `server-dotnet/NoodlesApi/Data/Mongo/UserActivityLog.cs`
- `server-dotnet/NoodlesApi/Services/MongoService.cs`
- `server-dotnet/NoodlesApi/Database/SqlServer/002_create_holdings.sql`
- `apis/index.ts`
- `.env.local`

### Deliverables
- POST endpoint for watchlist upsert
- SQL Server Holdings table with data
- MongoDB activity logs
- Next.js configured to use .NET API in dev
- Updated documentation

### Acceptance Criteria
- POST `/api/watchlist/holdings` creates/updates holdings in SQL
- Activity logged to MongoDB
- Next.js uses .NET endpoint when `NEXT_PUBLIC_USE_DOTNET=true`
- SQL query shows upserted holdings
- MongoDB query shows activity logs
- Idempotent: Same request twice doesn't create duplicates

