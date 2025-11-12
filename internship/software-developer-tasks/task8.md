## Task 8 – Add Health Check, Retries, and a Dockerfile

### What you will do
Expose a simple health endpoint, add a retry policy, and containerize the .NET service.

### Steps
1. Health endpoint
   - In `server-dotnet/Program.cs`, add `GET /health` that returns 200 and a short JSON.
2. Retry policy
   - Add a retry/backoff policy for outbound HTTP calls (e.g., Polly).
   - Log failures and retries.
3. Dockerfile
   - Create `server-dotnet/Dockerfile`.
   - Add instructions in `server-dotnet/README.md` to build and run.
4. Test
   - `curl /health` → expect 200 JSON.
   - Simulate a temporary upstream error → observe retry logs.
   - Build and run the Docker image locally.
5. Commit and PR
   - Branch: `intern/<your-name>/task8-health-docker`
   - Include terminal outputs/screenshots.

### Deliverables
- Pull Request link (branch `intern/<your-name>/task8-health-docker`)
- Screenshot of `/health` 200 response
- Logs showing retry/backoff
- Docker build and run outputs (commands + terminal captures)

### Done when
- Health returns 200.
-.NET logs show retry behavior on transient errors.
- Docker image builds and runs with documented commands.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Software Developer on Task 8 – Hardening + Docker.  
Code Files Referenced: `server-dotnet/Program.cs`, `server-dotnet/Dockerfile`, `server-dotnet/README.md`.  
Expected Functionality: Health check; resilience; containerization.  
Acceptance Criteria: Health passes; retry works; Docker build succeeds; docs clear.  
Evidence Provided: PR link; logs; docker build/run outputs; demo.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


