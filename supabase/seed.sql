-- Seed Data for GEU/GEHU Secure AI Chatbot

-- Insert Sample Faculty
INSERT INTO faculty (name, university, department, designation, linkedin_url, courses_taught) VALUES
('Dr. Kamal Ghanshala', 'GEU', 'Computer Science', 'President', 'https://www.linkedin.com/in/kamalghanshala/', ARRAY['Computer Graphics', 'Software Engineering']),
('Dr. Sanjay Jasola', 'GEHU', 'Administration', 'Vice Chancellor', 'https://www.linkedin.com/in/sanjay-jasola-847254b/', ARRAY['Leadership', 'E-Learning']),
('Dr. Devesh Pratap Singh', 'GEHU', 'Computer Science', 'HOD CS', 'https://www.linkedin.com/in/devesh-pratap-singh-0a1b2c3d/', ARRAY['Data Structures', 'Algorithms']),
('Mr. Vikram Singh', 'GEHU', 'Computer Science', 'Assistant Professor', 'https://www.linkedin.com/in/vikram-singh-gehu/', ARRAY['Web Technologies', 'Java']),
('Ms. Neha Sharma', 'GEHU', 'Electronics', 'Assistant Professor', 'https://www.linkedin.com/in/neha-sharma-gehu/', ARRAY['VLSI', 'Digital Signal Processing']),
('Prof. (Dr.) R.C. Joshi', 'GEU', 'Electronics', 'Chancellor', 'https://www.linkedin.com/in/rc-joshi-7b1a2c3d/', ARRAY['Embedded Systems', 'Digital Electronics']);

-- Insert University Info
INSERT INTO university_info (university, category, content) VALUES
('GEHU', 'ERP', 'The official student ERP for GEHU Dehradun is available at https://student.gehu.ac.in/'),
('GEHU', 'Dehradun Campus', 'The Dehradun campus of GEHU is situated in Clement Town, Dehradun, surrounded by the beautiful Shivalik hills.'),
('GEU', 'Overview', 'Graphic Era Deemed to be University (GEU) is located in Dehradun, Uttarakhand. It is accredited with NAAC A+ grade.'),
('GEHU', 'Overview', 'Graphic Era Hill University (GEHU) has campuses in Dehradun, Bhimtal, and Haldwani. It is known for its industry-oriented curriculum.'),
('GEU', 'Placements', 'GEU has a strong placement record with top companies like Amazon, Adobe, and Microsoft visiting every year.'),
('GEHU', 'Placements', 'GEHU Bhimtal and Dehradun campuses offer excellent placement opportunities in the IT and core sectors.');

-- Insert Sample Student (Lokesh - for testing)
INSERT INTO students (student_id, name, email, course, university) VALUES
('20011001', 'Lokesh Saklani', 'lokesh@example.com', 'B.Tech CSE', 'GEHU');

-- Insert Sample Marks for Lokesh
INSERT INTO marks (student_id, subject, score, total, semester, feedback) VALUES
('20011001', 'Data Structures', 85, 100, 4, 'Excellent performance. Focus on Graph algorithms.'),
('20011001', 'Operating Systems', 72, 100, 4, 'Good. Need to improve in Process Synchronization.'),
('20011001', 'Discrete Mathematics', 90, 100, 4, 'Outstanding. Keep it up.');
