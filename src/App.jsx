import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './index.css';

// Production configuration
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! 🙏 I am your GEHU Dehradun Smart Assistant, powered by Gemini. I can talk about your marks, faculty, or anything on the internet. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Voice Assistant Function
  const speak = (text) => {
    if (!isVoiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 1. Fetch relevant data from Supabase (Context Injection)
      let context = "No specific student data found.";
      if (inputValue.toLowerCase().includes('mark') || inputValue.match(/\d{8}/)) {
        const studentId = inputValue.match(/\d{8}/)?.[0];
        if (studentId) {
          const { data: marks } = await supabase.from('marks').select('*').eq('student_id', studentId);
          if (marks) context = `Student Marks: ${JSON.stringify(marks)}`;
        }
      }

      const { data: faculty } = await supabase.from('faculty').select('name, linkedin_url, department');
      const facultyContext = `Faculty Details: ${JSON.stringify(faculty)}`;

      // 2. Call Gemini AI with Google Search enabled (Grounding)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        You are a highly advanced AI Assistant for Graphic Era Hill University (GEHU), Dehradun, similar to Siri, Alexa, or ChatGPT.
        
        GEHU CONTEXT:
        ${context}
        ${facultyContext}
        
        RULES:
        1. Greet warmly (Namaste).
        2. Be conversational, intelligent, and helpful.
        3. If student asks about marks, summarize them and suggest focus areas.
        4. If student asks about anything else (world news, tech, science), use your internal knowledge and act like a general assistant.
        5. Provide Faculty LinkedIn links when requested.
        
        USER QUERY: ${inputValue}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      const botMsg = { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botMsg]);
      speak(responseText);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting to my brain. Please check your Gemini API key.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div>
          <h1 style={{ fontSize: '1.2rem' }}>GEHU Smart AI</h1>
          <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>Powered by Gemini & Supabase</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className="erp-btn"
            style={{ background: isVoiceEnabled ? 'var(--secondary)' : 'rgba(255,255,255,0.1)', color: isVoiceEnabled ? 'black' : 'white' }}
          >
            {isVoiceEnabled ? '🔊 Voice On' : '🔇 Voice Off'}
          </button>
          <a href="https://student.gehu.ac.in/" target="_blank" rel="noreferrer" className="erp-btn">ERP</a>
        </div>
      </header>

      <div className="chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot" style={{ opacity: 0.6 }}>Assistant is processing...</div>}
        <div ref={chatEndRef} />
      </div>

      <form className="input-container" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Ask me anything (Marks, Faculty, or World)..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
};

export default App;
