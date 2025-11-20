# Tech Stack Reference Guide

Quick reference for the technologies used in the Software Developer internship program.

## Frontend Stack

### Next.js 15
**What it is:** React framework with server-side rendering and API routes.

**Key Concepts:**
- **App Router:** File-based routing in `app/` directory
- **Server Components:** Components that render on the server
- **API Routes:** Backend endpoints in `app/api/*/route.ts`

**Common Commands:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Useful Patterns:**
```typescript
// API Route (app/api/example/route.ts)
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const param = searchParams.get('param')
  
  return NextResponse.json({ data: 'example' })
}
```

### React 19
**What it is:** UI library for building component-based interfaces.

**Key Concepts:**
- **Components:** Reusable UI pieces
- **Hooks:** useState, useEffect, useMemo, useCallback
- **Props:** Data passed to components
- **State:** Component-level data

**Common Hooks:**
```typescript
// State management
const [value, setValue] = useState<string>('')

// Side effects
useEffect(() => {
  // Runs after render
  return () => {
    // Cleanup
  }
}, [dependencies])

// Memoization
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b)
}, [a, b])

// Callback memoization
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### React Query (TanStack Query)
**What it is:** Data fetching and state management library.

**Key Concepts:**
- **useQuery:** Fetch data
- **useMutation:** Modify data
- **Query Cache:** Automatic caching
- **Optimistic Updates:** Update UI before server response

**Common Patterns:**
```typescript
// Fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['stablecoins', params],
  queryFn: () => fetchStablecoins(params),
  staleTime: 60000, // 1 minute
})

// Mutating data
const { mutate, isPending } = useMutation({
  mutationFn: (params) => upsertHolding(params),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['holdings'] })
  },
})

// Optimistic update
const { mutate } = useMutation({
  mutationFn: updateData,
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['data'] })
    const previous = queryClient.getQueryData(['data'])
    queryClient.setQueryData(['data'], newData)
    return { previous }
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(['data'], context?.previous)
  },
})
```

### TypeScript
**What it is:** Typed superset of JavaScript.

**Key Concepts:**
- **Types:** Define data shapes
- **Interfaces:** Define object structures
- **Generics:** Reusable type definitions
- **Type Inference:** Automatic type detection

**Common Patterns:**
```typescript
// Type definition
type User = {
  id: string
  name: string
  email?: string // Optional
}

// Interface
interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// Generic function
function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  return fetch(url).then(res => res.json())
}

// Union types
type Status = 'pending' | 'success' | 'error'
```

---

## Backend Stack

### C# / .NET 8
**What it is:** Modern, cross-platform framework for building APIs.

**Key Concepts:**
- **Web API:** RESTful API framework
- **Controllers:** Handle HTTP requests
- **Dependency Injection:** Manage service lifetimes
- **Middleware:** Request/response pipeline

**Common Commands:**
```bash
dotnet new webapi -n MyApi    # Create new Web API project
dotnet add package <name>     # Add NuGet package
dotnet restore                # Restore dependencies
dotnet build                  # Build project
dotnet run                    # Run project
dotnet publish -c Release     # Publish for production
```

**Controller Pattern:**
```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
        private readonly ILogger<ExampleController> _logger;
        
        public ExampleController(ILogger<ExampleController> logger)
        {
            _logger = logger;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(new { message = "Hello" });
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            // Process request
            return CreatedAtAction(nameof(Get), new { id = 1 }, request);
        }
    }
    
    public class CreateRequest
    {
        public string Name { get; set; } = string.Empty;
    }
}
```

### Entity Framework Core
**What it is:** ORM (Object-Relational Mapper) for .NET.

**Key Concepts:**
- **DbContext:** Database connection and configuration
- **DbSet:** Represents a table
- **Migrations:** Version control for database schema
- **LINQ:** Query data with C# syntax

**Common Patterns:**
```csharp
// DbContext
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Holding> Holdings { get; set; }
}

// Entity
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// Querying
var users = await _context.Users
    .Where(u => u.Name.Contains("John"))
    .OrderBy(u => u.CreatedAt)
    .Take(10)
    .ToListAsync();

// Insert
var user = new User { Name = "John" };
_context.Users.Add(user);
await _context.SaveChangesAsync();

// Update
var user = await _context.Users.FindAsync(id);
user.Name = "Jane";
await _context.SaveChangesAsync();

// Delete
_context.Users.Remove(user);
await _context.SaveChangesAsync();
```

### Polly (Resilience)
**What it is:** Library for handling transient failures.

**Key Concepts:**
- **Retry:** Retry failed operations
- **Circuit Breaker:** Stop calling failing services
- **Timeout:** Limit operation duration
- **Fallback:** Provide alternative response

**Common Patterns:**
```csharp
using Polly;
using Polly.Extensions.Http;

// Retry policy
var retryPolicy = HttpPolicyExtensions
    .HandleTransientHttpError()
    .WaitAndRetryAsync(3, retryAttempt => 
        TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

// Circuit breaker
var circuitBreakerPolicy = HttpPolicyExtensions
    .HandleTransientHttpError()
    .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));

// Timeout
var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(10);

// Combine policies
var combinedPolicy = Policy.WrapAsync(retryPolicy, circuitBreakerPolicy, timeoutPolicy);
```

---

## Database Stack

### SQL Server
**What it is:** Relational database management system.

**Key Concepts:**
- **Tables:** Store structured data
- **Indexes:** Speed up queries
- **Constraints:** Enforce data integrity
- **Transactions:** Atomic operations

**Common Queries:**
```sql
-- Create table
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Insert
INSERT INTO Users (Name, Email) 
VALUES ('John', 'john@example.com');

-- Select
SELECT * FROM Users 
WHERE Name LIKE '%John%' 
ORDER BY CreatedAt DESC;

-- Update
UPDATE Users 
SET Email = 'newemail@example.com' 
WHERE UserId = 1;

-- Delete
DELETE FROM Users WHERE UserId = 1;

-- Join
SELECT u.Name, h.HoldingsAmount
FROM Users u
INNER JOIN Holdings h ON u.UserId = h.UserId;

-- Upsert (MERGE)
MERGE INTO Holdings AS target
USING (SELECT @UserId, @AssetId, @Amount) AS source (UserId, AssetId, Amount)
ON target.UserId = source.UserId AND target.AssetId = source.AssetId
WHEN MATCHED THEN
    UPDATE SET Amount = source.Amount, UpdatedAt = GETDATE()
WHEN NOT MATCHED THEN
    INSERT (UserId, AssetId, Amount) 
    VALUES (source.UserId, source.AssetId, source.Amount);
```

### MongoDB
**What it is:** NoSQL document database.

**Key Concepts:**
- **Collections:** Like tables in SQL
- **Documents:** JSON-like objects
- **Flexible Schema:** No fixed structure
- **Embedded Documents:** Nested data

**C# Driver Patterns:**
```csharp
using MongoDB.Driver;
using MongoDB.Bson;

// Connect
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("mydb");
var collection = database.GetCollection<User>("users");

// Insert
var user = new User { Name = "John", Email = "john@example.com" };
await collection.InsertOneAsync(user);

// Find
var users = await collection
    .Find(u => u.Name == "John")
    .ToListAsync();

// Update
var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
var update = Builders<User>.Update.Set(u => u.Name, "Jane");
await collection.UpdateOneAsync(filter, update);

// Delete
await collection.DeleteOneAsync(u => u.Id == userId);
```

**MongoDB Shell Queries:**
```javascript
// Insert
db.users.insertOne({ name: "John", email: "john@example.com" })

// Find
db.users.find({ name: "John" })

// Update
db.users.updateOne(
  { name: "John" },
  { $set: { email: "newemail@example.com" } }
)

// Delete
db.users.deleteOne({ name: "John" })

// Aggregation
db.users.aggregate([
  { $match: { name: "John" } },
  { $group: { _id: "$email", count: { $sum: 1 } } }
])
```

---

## DevOps Stack

### Docker
**What it is:** Containerization platform.

**Key Concepts:**
- **Image:** Blueprint for container
- **Container:** Running instance of image
- **Dockerfile:** Instructions to build image
- **docker-compose:** Multi-container orchestration

**Common Commands:**
```bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -p 5000:5000 myapp:latest

# List containers
docker ps

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# View logs
docker logs <container-id>

# Execute command in container
docker exec -it <container-id> bash

# docker-compose
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs -f        # View logs
docker-compose ps             # List services
```

**Dockerfile Example:**
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY ./out .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

**docker-compose.yml Example:**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - ConnectionStrings__DefaultConnection=Server=db;Database=mydb;
    depends_on:
      - db
  
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourPassword123!
    ports:
      - "1433:1433"
```

---

## Development Tools

### Git
**Common Commands:**
```bash
# Clone repository
git clone <url>

# Create branch
git checkout -b feature/my-feature

# Stage changes
git add .
git add <file>

# Commit
git commit -m "Description of changes"

# Push
git push origin feature/my-feature

# Pull latest
git pull origin main

# View status
git status

# View history
git log --oneline

# Undo changes
git checkout -- <file>
git reset HEAD <file>
```

### npm
**Common Commands:**
```bash
# Install dependencies
npm install

# Install specific package
npm install <package-name>
npm install -D <package-name>  # Dev dependency

# Update packages
npm update

# Run scripts
npm run dev
npm run build
npm run start
npm run lint

# View installed packages
npm list --depth=0
```

---

## Debugging Tips

### Frontend (Next.js)
- Use browser DevTools (F12)
- Check Console for errors
- Use Network tab to inspect API calls
- Use React DevTools extension
- Add `console.log()` for debugging
- Use `debugger` statement for breakpoints

### Backend (.NET)
- Use `dotnet run` with `--launch-profile Development`
- Check terminal for logs
- Use `_logger.LogInformation()` for logging
- Use VS Code debugger (F5)
- Check Swagger UI at `/swagger`

### Database (SQL Server)
- Use SSMS or Azure Data Studio
- Check connection string
- Verify table exists: `SELECT * FROM INFORMATION_SCHEMA.TABLES`
- Check data: `SELECT TOP 10 * FROM TableName`
- View execution plan for slow queries

### Database (MongoDB)
- Use MongoDB Compass
- Check connection string
- View collections: `show collections`
- Check data: `db.collection.find().limit(10)`
- Use `.pretty()` for formatted output

---

## Best Practices

### Code Quality
- ✅ Use meaningful variable/function names
- ✅ Keep functions small and focused
- ✅ Add comments for complex logic
- ✅ Handle errors gracefully
- ✅ Validate inputs
- ✅ Use TypeScript types

### Performance
- ✅ Use indexes on database queries
- ✅ Implement caching where appropriate
- ✅ Debounce user input
- ✅ Use pagination for large datasets
- ✅ Optimize images and assets
- ✅ Use connection pooling

### Security
- ✅ Validate and sanitize inputs
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Store secrets in environment variables
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Keep dependencies updated

### Documentation
- ✅ Write clear README files
- ✅ Document API endpoints
- ✅ Add code comments for complex logic
- ✅ Include setup instructions
- ✅ Provide examples
- ✅ Keep docs up to date

---

## Quick Reference Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [React Query Docs](https://tanstack.com/query/latest)
- [.NET Docs](https://learn.microsoft.com/en-us/dotnet/)
- [Entity Framework Docs](https://learn.microsoft.com/en-us/ef/core/)
- [SQL Server Docs](https://learn.microsoft.com/en-us/sql/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Docker Docs](https://docs.docker.com/)

---

**Keep this reference handy throughout your internship!** 📚

