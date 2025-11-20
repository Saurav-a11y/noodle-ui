## Task 8 – Service Hardening & Docker Deployment

### Focus
Add health check endpoint, retry logic, and Dockerize the .NET service.

### Getting started

1. **Add health check endpoint**
   - Create file: `Controllers/HealthController.cs`:
     ```csharp
     using Microsoft.AspNetCore.Mvc;
     using Microsoft.EntityFrameworkCore;
     using NoodlesApi.Data;
     using NoodlesApi.Services;
     
     namespace NoodlesApi.Controllers
     {
         [ApiController]
         [Route("api/[controller]")]
         public class HealthController : ControllerBase
         {
             private readonly NoodlesDbContext _dbContext;
             private readonly MongoService _mongoService;
             private readonly ILogger<HealthController> _logger;
             
             public HealthController(
                 NoodlesDbContext dbContext,
                 MongoService mongoService,
                 ILogger<HealthController> logger)
             {
                 _dbContext = dbContext;
                 _mongoService = mongoService;
                 _logger = logger;
             }
             
             [HttpGet]
             public async Task<IActionResult> Get()
             {
                 var health = new HealthStatus
                 {
                     Status = "Healthy",
                     Timestamp = DateTime.UtcNow,
                     Checks = new Dictionary<string, string>()
                 };
                 
                 try
                 {
                     // Check SQL Server
                     await _dbContext.Database.CanConnectAsync();
                     health.Checks["SqlServer"] = "OK";
                 }
                 catch (Exception ex)
                 {
                     health.Status = "Unhealthy";
                     health.Checks["SqlServer"] = $"Error: {ex.Message}";
                     _logger.LogError(ex, "SQL Server health check failed");
                 }
                 
                 try
                 {
                     // Check MongoDB (simple ping)
                     await _mongoService.LogActivity(new Data.Mongo.UserActivityLog
                     {
                         UserId = "health-check",
                         Activity = "HealthCheck",
                         AssetType = "system",
                         AssetId = "health",
                         Content = "Health check ping"
                     });
                     health.Checks["MongoDB"] = "OK";
                 }
                 catch (Exception ex)
                 {
                     health.Status = "Unhealthy";
                     health.Checks["MongoDB"] = $"Error: {ex.Message}";
                     _logger.LogError(ex, "MongoDB health check failed");
                 }
                 
                 var statusCode = health.Status == "Healthy" ? 200 : 503;
                 return StatusCode(statusCode, health);
             }
         }
         
         public class HealthStatus
         {
             public string Status { get; set; } = "Unknown";
             public DateTime Timestamp { get; set; }
             public Dictionary<string, string> Checks { get; set; } = new();
         }
     }
     ```

2. **Add retry policy with Polly**
   - Install Polly package:
     ```bash
     dotnet add package Polly
     dotnet add package Microsoft.Extensions.Http.Polly
     ```
   - Update `Program.cs`:
     ```csharp
     using Polly;
     using Polly.Extensions.Http;
     
     // Add retry policy for HttpClient
     var retryPolicy = HttpPolicyExtensions
         .HandleTransientHttpError()
         .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
         .WaitAndRetryAsync(3, retryAttempt => 
             TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
     
     builder.Services.AddHttpClient("RetryClient")
         .AddPolicyHandler(retryPolicy);
     ```

3. **Update controller to use retry client**
   - Update `StablecoinsController.cs`:
     ```csharp
     // Change constructor to use named client:
     private readonly IHttpClientFactory _httpClientFactory;
     
     // In GetList method:
     var client = _httpClientFactory.CreateClient("RetryClient");
     ```

4. **Add request timeout**
   - Update `Program.cs`:
     ```csharp
     builder.Services.AddHttpClient("RetryClient")
         .ConfigureHttpClient(client => {
             client.Timeout = TimeSpan.FromSeconds(30);
         })
         .AddPolicyHandler(retryPolicy);
     ```

5. **Create Dockerfile**
   - Create `server-dotnet/Dockerfile`:
     ```dockerfile
     # Build stage
     FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
     WORKDIR /app
     
     # Copy csproj and restore dependencies
     COPY NoodlesApi/*.csproj ./NoodlesApi/
     RUN dotnet restore ./NoodlesApi/NoodlesApi.csproj
     
     # Copy everything else and build
     COPY NoodlesApi/. ./NoodlesApi/
     WORKDIR /app/NoodlesApi
     RUN dotnet publish -c Release -o out
     
     # Runtime stage
     FROM mcr.microsoft.com/dotnet/aspnet:8.0
     WORKDIR /app
     COPY --from=build /app/NoodlesApi/out .
     
     # Expose port
     EXPOSE 5000
     
     # Set environment variables
     ENV ASPNETCORE_URLS=http://+:5000
     ENV ASPNETCORE_ENVIRONMENT=Production
     
     # Run the app
     ENTRYPOINT ["dotnet", "NoodlesApi.dll"]
     ```

6. **Create .dockerignore**
   - Create `server-dotnet/.dockerignore`:
     ```
     bin/
     obj/
     *.user
     *.suo
     .vs/
     ```

7. **Create docker-compose for full stack**
   - Create `server-dotnet/docker-compose.yml`:
     ```yaml
     version: '3.8'
     
     services:
       sqlserver:
         image: mcr.microsoft.com/mssql/server:2022-latest
         environment:
           - ACCEPT_EULA=Y
           - SA_PASSWORD=YourStrong@Passw0rd
           - MSSQL_PID=Developer
         ports:
           - "1433:1433"
         volumes:
           - sqldata:/var/opt/mssql
       
       mongodb:
         image: mongo:7
         ports:
           - "27017:27017"
         volumes:
           - mongodata:/data/db
       
       api:
         build:
           context: .
           dockerfile: Dockerfile
         ports:
           - "5000:5000"
         environment:
           - ConnectionStrings__DefaultConnection=Server=sqlserver;Database=NoodlesDb;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;
           - ConnectionStrings__MongoDB=mongodb://mongodb:27017
           - MongoDatabase=noodles
         depends_on:
           - sqlserver
           - mongodb
     
     volumes:
       sqldata:
       mongodata:
     ```

8. **Build and test Docker image**
   - Build the image:
     ```bash
     cd server-dotnet
     docker build -t noodles-api:latest .
     ```
   - Run with docker-compose:
     ```bash
     docker-compose up -d
     ```
   - Test health endpoint:
     ```bash
     curl http://localhost:5000/api/health
     ```
   - Test API endpoint:
     ```bash
     curl http://localhost:5000/api/stablecoins/list?limit=10
     ```

9. **Add logging configuration**
   - Update `appsettings.json`:
     ```json
     {
       "Logging": {
         "LogLevel": {
           "Default": "Information",
           "Microsoft.AspNetCore": "Warning",
           "Microsoft.EntityFrameworkCore": "Warning"
         }
       },
       "AllowedHosts": "*"
     }
     ```

10. **Create deployment documentation**
    - Update `server-dotnet/README.md`:
      - Docker build instructions
      - docker-compose usage
      - Environment variables reference
      - Health check endpoint documentation
      - Troubleshooting guide

11. **Add startup script**
    - Create `server-dotnet/scripts/start.sh`:
      ```bash
      #!/bin/bash
      
      echo "Starting Noodles API services..."
      
      # Start services
      docker-compose up -d
      
      # Wait for services to be healthy
      echo "Waiting for services to start..."
      sleep 10
      
      # Check health
      echo "Checking API health..."
      curl -f http://localhost:5000/api/health || exit 1
      
      echo "Services started successfully!"
      echo "API: http://localhost:5000"
      echo "Health: http://localhost:5000/api/health"
      ```
    - Make executable: `chmod +x scripts/start.sh`

12. **Test complete deployment**
    - Stop all services: `docker-compose down`
    - Remove volumes: `docker-compose down -v`
    - Start fresh: `./scripts/start.sh`
    - Verify health check returns 200
    - Verify API endpoints work
    - Check SQL Server connection
    - Check MongoDB connection

### Repo Paths
- `server-dotnet/Controllers/HealthController.cs`
- `server-dotnet/Dockerfile`
- `server-dotnet/docker-compose.yml`
- `server-dotnet/scripts/start.sh`
- `server-dotnet/README.md` (updated)

### Deliverables
- Health check endpoint (`/api/health`)
- Retry policy implemented
- Dockerfile for .NET API
- docker-compose for full stack (SQL + Mongo + API)
- Deployment documentation
- Startup script

### Acceptance Criteria
- GET `/api/health` returns 200 with status of all dependencies
- Retry policy handles transient failures (test with flaky network)
- Docker image builds successfully
- docker-compose starts all services
- Health check passes after docker-compose up
- API endpoints work in Docker environment
- Documentation explains deployment process
- Startup script automates deployment

