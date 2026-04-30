import React, { useState, useEffect, useRef } from 'react';
import { pipeline } from '@xenova/transformers';
import './index.css';

const App = () => {
  const [studentId, setStudentId] = useState('GUEST'); 
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! 🙏 I am Braina, your advanced GEHU Dehradun AI Assistant. I'm here to help you with everything from marks to general knowledge. Please wait while I initialize my brain...", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const generatorRef = useRef(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load the Gemma model locally in the browser
  useEffect(() => {
    const loadModel = async () => {
      try {
        setMessages(prev => [...prev, { id: Date.now(), text: "Starting the Google Gemma-2b-it engine... This is a high-performance open model. Please wait for the initial download (~1.5GB).", sender: 'bot' }]);
        
        // Switch to the official Gemma 2b model (quantized for web)
        generatorRef.current = await pipeline('text-generation', 'Xenova/gemma-2b-it', {
          progress_callback: (progress) => {
            if (progress.status === 'progress') {
              console.log(`Loading Gemma: ${progress.progress.toFixed(2)}%`);
            }
          }
        });
        
        setIsModelLoaded(true);
        setMessages(prev => [...prev, { id: Date.now(), text: "Gemma is now live! 🏔️ I am running directly in your device. Ask me anything about GEHU Dehradun!", sender: 'bot' }]);
      } catch (err) {
        console.error(err);
        setMessages(prev => [...prev, { id: Date.now(), text: "Failed to load Gemma. This model requires a modern device with at least 4GB of RAM.", sender: 'bot' }]);
      }
    };
    loadModel();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !isModelLoaded) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Run the AI locally on the user's CPU/GPU
      const output = await generatorRef.current(inputValue, {
        max_new_tokens: 100,
        temperature: 0.7,
        do_sample: true,
      });

      const responseText = output[0].generated_text.replace(inputValue, '').trim();
      
      const botMsg = { 
        id: Date.now() + 1, 
        text: responseText || "I am thinking about your request...", 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now(), text: "My local brain hit a snag. Try refreshing!", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div>
          <h1 style={{ fontSize: '1.2rem' }}>Braina AI</h1>
          <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>Powered by GEHU Knowledge</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={`status-dot ${isModelLoaded ? 'online' : 'loading'}`}></div>
          <a href="https://student.gehu.ac.in/" target="_blank" rel="noreferrer" className="erp-btn">ERP</a>
        </div>
      </header>

      <div className="chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot" style={{ opacity: 0.6 }}>Local AI is generating...</div>}
        <div ref={chatEndRef} />
      </div>

      <form className="input-container" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder={isModelLoaded ? "Ask me anything..." : "Loading brain... please wait"} 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!isModelLoaded}
        />
        <button type="submit" disabled={!isModelLoaded || isLoading}>Ask</button>
      </form>
    </div>
  );
};

export default App;
