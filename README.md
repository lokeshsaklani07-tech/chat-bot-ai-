# GEU/GEHU Secure AI Chatbot 🎓

A secure, AI-powered assistant for students of **Graphic Era Deemed to be University (GEU)** and **Graphic Era Hill University (GEHU)**. Built with **Gemma AI**, **n8n**, and **Supabase**.

## 🚀 Features
- **Secure Authentication**: OTP-based login verified via student records.
- **Smart Academic Insights**: Tells you about your marks and areas needing focus.
- **Faculty Directory**: Integrated LinkedIn links for all department faculty.
- **24/7 Knowledge Base**: Built-in context for university policies, courses, and placements.
- **DPDP 2023 Compliant**: Secure data handling following Indian privacy laws.

## 🛠️ Tech Stack
- **AI Brain**: Gemma (Local via Ollama or Cloud via Groq).
- **Backend Orchestration**: n8n.
- **Database**: Supabase (PostgreSQL with RLS).
- **Frontend**: React + Vite (Premium Glassmorphism UI).
- **Logging**: Secure GitHub Private Logs.

## 📦 Setup Instructions

### 1. Database (Supabase)
- Create a new project in [Supabase](https://supabase.com).
- Run the SQL found in `supabase/schema.sql` in the SQL Editor.
- Run `supabase/seed.sql` to populate initial faculty and sample student data.

### 2. Orchestration (n8n)
- Import `n8n/chat_workflow.json` into your n8n instance.
- Configure credentials for:
  - **Supabase**: URL and API Key.
  - **GitHub**: Fine-grained PAT for your private logs repository.
  - **Ollama/Groq**: For Gemma AI integration.

### 3. Frontend (React)
```bash
# Install dependencies
npm install

# Run locally
npm run dev
```

## 🔒 Security Measures
- **Row Level Security**: Students can never see each other's marks.
- **Secure Logging**: Logs events to a private GitHub repo without storing sensitive data.
- **JWT Protection**: All communication with the backend is session-authenticated.

## 📄 License
Open Source - MIT. Created for GEU/GEHU Students.
