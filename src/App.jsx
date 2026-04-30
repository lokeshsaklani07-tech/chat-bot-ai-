import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// Production configuration via environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

const App = () => {
  const [studentId, setStudentId] = useState('GUEST'); 
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! 🙏 Welcome to the Graphic Era Hill University (GEHU) Dehradun AI Assistant. I am ready to help you. To see your marks or specific records, just mention your Student ID!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${N8N_WEBHOOK_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue, student_id: studentId })
      });

      const data = await response.json();
      
      const botMsg = { 
        id: Date.now() + 1, 
        text: data.output || "I've received your query and I am processing it for GEHU records...", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now(), text: "Connection error. Please ensure your n8n backend is running.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

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
            Status: Live
          </div>
        </div>
      </header>

      <div className="chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot" style={{ opacity: 0.6 }}>Gemma is thinking...</div>}
        <div ref={chatEndRef} />
      </div>

      <form className="input-container" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Type your message here..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
