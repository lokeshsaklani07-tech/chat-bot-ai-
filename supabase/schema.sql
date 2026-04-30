-- Supabase Schema for GEU/GEHU Secure AI Chatbot

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT UNIQUE NOT NULL, -- e.g., 2001xxxx
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  course TEXT NOT NULL,
  university TEXT CHECK (university IN ('GEU', 'GEHU')),
  otp_code TEXT,
  otp_expiry TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marks Table
CREATE TABLE IF NOT EXISTS marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT REFERENCES students(student_id),
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL DEFAULT 100,
  semester INTEGER NOT NULL,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  university TEXT CHECK (university IN ('GEU', 'GEHU')),
  department TEXT NOT NULL,
  designation TEXT,
  linkedin_url TEXT,
  courses_taught TEXT[], -- Array of course names
  research_interests TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- University Info Table (for RAG/Context)
CREATE TABLE IF NOT EXISTS university_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university TEXT CHECK (university IN ('GEU', 'GEHU')),
  category TEXT NOT NULL, -- e.g., 'Admission', 'Placement', 'Hostel'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SECURITY: Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_info ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Students can only see their own profile
CREATE POLICY "Students see own profile" ON students
  FOR SELECT USING (auth.uid() = id);

-- 2. Students can only see their own marks
CREATE POLICY "Students see own marks" ON marks
  FOR SELECT USING (auth.uid() IN (SELECT id FROM students WHERE student_id = marks.student_id));

-- 3. Faculty info is public (to authenticated students)
CREATE POLICY "Faculty info visible to students" ON faculty
  FOR SELECT USING (auth.role() = 'authenticated');

-- 4. University info is public (to authenticated students)
CREATE POLICY "University info visible to students" ON university_info
  FOR SELECT USING (auth.role() = 'authenticated');
