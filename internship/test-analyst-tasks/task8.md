## Task 8 – Health, Retry, and Docker Smoke

### What you will do
Prove health endpoint works, retries happen on failures, and the Docker image runs.

### Steps
1. `GET /health` → expect 200 JSON (save screenshot)
2. Trigger a temporary upstream error → observe retry logs (save logs)
3. Build and run Docker image → call `/health` inside container (save output)

### Deliverables
- Screenshot of `/health` 200
- Retry logs showing backoff
- Docker build + run outputs (commands + logs)

### Done when
- You have 3 pieces of evidence: health OK, retry logs, Docker health OK.

### AI Verification Prompt
You are an AI Reviewer for MVP Studio.  
Review the intern’s submission for Test Analyst on Task 8 – Resilience & Health.  
Code Files Referenced: `server-dotnet/Program.cs`, `server-dotnet/Dockerfile`, `server-dotnet/README.md`.  
Expected Functionality: Health endpoint; retry policy; Docker run.  
Acceptance Criteria: Evidence attached; report complete; issues filed if any.  
Evidence Provided: Logs/screens; docker outputs; report.  
Evaluate then return verdict: Pass ✅ | Revise 🔁 | Escalate 🚨


