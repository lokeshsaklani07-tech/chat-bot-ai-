# GEU/GEHU Secure AI Chatbot Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a secure, open-source AI chatbot for GEU/GEHU students to query marks, faculty, and university info using Gemma AI, n8n, and Supabase.

**Architecture:**
- **Frontend:** Vite + React + Vanilla CSS (Aesthetics prioritized).
- **Backend Orchestration:** n8n (handling logic, OTP, and AI).
- **Database:** Supabase (PostgreSQL) with Row Level Security (RLS).
- **AI Brain:** Gemma 2b/7b (via Ollama or Groq/Google API) integrated into n8n.
- **Security:** JWT session tokens, OTP verification, DPDP Act 2023 compliance.

**Tech Stack:** React, Supabase, n8n, Gemma AI, GitHub (Secure Logging).

---

### Task 1: Supabase Schema & RLS Setup
**Files:**
- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`

**Step 1: Define the schema with RLS**
```sql
-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  otp_code TEXT,
  otp_expiry TIMESTAMPTZ
);

-- Marks table
CREATE TABLE marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT REFERENCES students(student_id),
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  feedback TEXT
);

-- Faculty table
CREATE TABLE faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  linkedin_url TEXT,
  courses TEXT[]
);

-- Enable RLS
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;

-- Policy: Students can only see their own marks
CREATE POLICY "Students see own marks" ON marks
  FOR SELECT USING (auth.uid() IN (SELECT id FROM students WHERE student_id = marks.student_id));
```

**Step 2: Commit schema**
Run: `git add supabase/`
Expected: Schema files added.

---

### Task 2: n8n Workflow Design (Auth & AI)
**Files:**
- Create: `n8n/workflow_auth.json`
- Create: `n8n/workflow_chat.json`

**Step 1: Auth Workflow (OTP)**
1. Webhook (Student ID) -> IF Node (Check Supabase) -> HTTP Request (Send OTP via Email/SMS) -> Update Supabase.

**Step 2: Chat Workflow (AI)**
1. Webhook (Message + JWT) -> Verify JWT -> Supabase Node (Fetch Student Data) -> Gemma AI Node (Context: University Info + Student Marks) -> Output Response.

**Step 3: Secure Logging Node**
1. Post-Response -> GitHub Node (Write to private repo) -> [2026-04-30] User XXX logged in.

---

### Task 3: Frontend - Modern Chat Interface
**Files:**
- Create: `src/App.jsx`
- Create: `src/index.css`
- Create: `src/components/Chat.jsx`

**Step 1: Initialize Vite app**
Run: `npx -y create-vite ./ --template react`

**Step 2: Implement UI with Rich Aesthetics**
- Glassmorphism for chat bubbles.
- Dynamic gradients (GEU Colors: Purple/Gold/White).
- Loading states with micro-animations.

---

### Task 4: Integration & Security Validation
**Files:**
- Create: `docs/SECURITY.md`

**Step 1: Verify JWT/RLS**
- Ensure `supabase-js` uses the JWT for queries.
- Test that student A cannot query student B's marks.

**Step 2: DPDP 2023 Compliance Checklist**
- Data minimization.
- Explicit consent for marks processing.
- Secure logging (no PII in logs).
