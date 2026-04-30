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

## 🌍 Global Deployment (Phones, Laptops, Tablets)

To make this chatbot accessible worldwide on any device, follow these steps:

### 1. Deploy Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flokeshsaklani07-tech%2Fchat-bot-ai-)

1. Click the button above or go to [Vercel](https://vercel.com).
2. Connect your GitHub repository `chat-bot-ai-`.
3. Add the **Environment Variables** from `.env.example`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_N8N_WEBHOOK_URL`
4. Click **Deploy**. Your site will be live at `https://your-project.vercel.app`.

### 2. Host the Backend (n8n)
For the chatbot to work 24/7, your n8n instance must be hosted:
- **Option A (Easy)**: Use [n8n Cloud](https://n8n.io/cloud/).
- **Option B (Free)**: Deploy n8n to **Railway** or **Render** using their one-click templates.

### 3. Mobile Optimization
The UI is built with a **Responsive Design** using CSS Flexbox and Glassmorphism, ensuring it looks premium on:
- 📱 iPhones & Android Phones
- 💻 Laptops (Mac/Windows)
- 🖥️ Desktop Monitors
- 📟 Tablets & iPads

## 📄 License
Open Source - MIT. Created for GEU/GEHU Students.
