import { useState, useRef, useEffect } from 'react';
import ToxicHeader from './components/ToxicHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import InputArea from './components/InputArea';
// import { shouldSendMeme } from './chatEngine'; // Disabled - no random memes
import './App.css';

// Import meme image
import turkishMeme from './assets/turkish_meme_1.png';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Merhaba! Ben FriendlyBot 😊 Size nasıl yardımcı olabilirim?",
      isBot: true,
      timestamp: Date.now(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('family'); // Default to family mode for presentation // 'toxic' or 'family'
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call real backend API (production)
      const response = await fetch('https://toxicchatbot.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, mode: mode }),
      });

      if (!response.ok) {
        throw new Error('Bağlantı sorunu oluştu, lütfen tekrar deneyin 🙏');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isBot: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMessage]);

      // Randomly send meme after response - DISABLED
      // if (shouldSendMeme()) {
      //   setTimeout(() => {
      //     const memeMessage = {
      //       id: Date.now() + 1,
      //       image: turkishMeme,
      //       isBot: true,
      //       timestamp: Date.now(),
      //     };
      //     setMessages(prev => [...prev, memeMessage]);
      //   }, 1000);
      // }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen biraz sonra tekrar dener misiniz? 😔",
        isBot: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`app ${mode === 'family' ? 'family-theme' : ''}`}>
      <ToxicHeader mode={mode} setMode={setMode} />

      <main className="chat-container">
        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
              <div className="message-avatar">
                {msg.isBot ? (mode === 'family' ? '😊' : '💀') : '👤'}
              </div>
              <div className="message-bubble">
                {msg.image && (
                  <img src={msg.image} alt="Meme" className="message-image" />
                )}
                <p>{msg.text}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-avatar">{mode === 'family' ? '😊' : '💀'}</div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <InputArea onSendMessage={handleSendMessage} placeholder="Nazikçe bir şeyler sorabilirsiniz..." />
    </div>
  );
}

export default App;
