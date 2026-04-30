import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [otp, setOtp] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! 🙏 Welcome to the Graphic Era Hill University (GEHU) Dehradun AI Assistant. I am here to help you with your marks, faculty details, and university info. How can I assist you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (studentId && otp) {
      // Logic: Verify OTP via n8n/Supabase
      setIsAuthenticated(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Mocking bot response
    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        text: "I am analyzing your GEHU academic records using Gemma AI... One moment.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-overlay">
        <div className="auth-card">
          <div className="logo" style={{ fontSize: '2rem', marginBottom: '10px' }}>🏔️</div>
          <h2>GEHU Dehradun</h2>
          <p>Secure Student AI Assistant</p>
          <form onSubmit={handleLogin} className="input-group">
            <input 
              type="text" 
              placeholder="Student ID (e.g. 20011001)" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="OTP / Password" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit">Verify & Enter</button>
          </form>
          <div style={{ marginTop: '20px' }}>
            <a href="https://student.gehu.ac.in/" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>
              Go to GEHU ERP Portal →
            </a>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.7rem', opacity: 0.6 }}>
            Compliant with DPDP Act 2023. Data is encrypted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <div>
          <h1 style={{ fontSize: '1.2rem' }}>GEHU Dehradun AI</h1>
          <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>Graphic Era Hill University</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <a href="https://student.gehu.ac.in/" target="_blank" rel="noreferrer" className="erp-btn">ERP</a>
          <div className="user-info" style={{ fontSize: '0.8rem', opacity: 0.8, background: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '8px' }}>
            ID: {studentId}
          </div>
        </div>
      </header>

      <div className="chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form className="input-container" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Ask about marks, faculty, or university..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
