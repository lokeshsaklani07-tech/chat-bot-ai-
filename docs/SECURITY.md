# Security & Compliance Documentation (GEU/GEHU AI Chatbot)

## 1. DPDP Act 2023 Alignment
This project is designed to comply with the **Digital Personal Data Protection Act (DPDP) 2023** of India:
- **Data Minimization**: Only necessary student details (ID, Marks) are processed.
- **Purpose Limitation**: Data is used solely for student academic assistance.
- **Security Safeguards**: All student data is protected via RLS and JWT.
- **Accountability**: Access logs are maintained securely to track data processing events.

## 2. Technical Security Measures

### Database Security (Supabase)
- **Row Level Security (RLS)**: Enforced on all tables. A student can only access rows where `student_id` matches their own identity (verified via Supabase Auth JWT).
- **Encryption at Rest**: Supabase provides AES-256 encryption for all data on disk.
- **No Direct Access**: The frontend never communicates with the DB using the service_role key; it uses the `anon` key with RLS filters.

### Orchestration Security (n8n)
- **JWT Verification**: Every request to the n8n webhook must include a valid JWT in the Authorization header.
- **Credential Management**: Supabase and GitHub API keys are stored in n8n's encrypted credential store.
- **Secure Webhooks**: n8n endpoints should be hidden behind a reverse proxy (e.g., Nginx/Cloudflare) for production.

### Logging (GitHub)
- **Separation of Concerns**: Logs are written to a **private** GitHub repository.
- **No PII in Logs**: Logs contain `student_id` and `timestamp`, but **never** actual marks, passwords, or OTPs.
- **Fine-grained Access**: The n8n GitHub node uses a Personal Access Token (PAT) with limited write permissions only to the log repo.

## 3. Data Flow
1. **Request**: Student sends message + JWT.
2. **Verification**: n8n verifies JWT and identifies the `student_id`.
3. **Retrieval**: n8n fetches ONLY the marks for that `student_id` from Supabase.
4. **AI Generation**: Gemma AI processes the query using retrieved marks and predefined university context.
5. **Logging**: A success/event log is pushed to the private GitHub repo.
6. **Response**: Final response is sent back to the student.
