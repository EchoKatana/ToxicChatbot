import { useState, useRef, useEffect } from 'react';
import ToxicHeader from './components/ToxicHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import InputArea from './components/InputArea';
import { shouldSendMeme } from './chatEngine';
import './App.css';

// Import meme image
import turkishMeme from './assets/turkish_meme_1.png';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Ya selam... Ne istiyorsun? 😤",
      isBot: true,
      timestamp: Date.now(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('toxic'); // 'toxic' or 'family'
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
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
      // Call real backend API (localhost for testing)
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, mode: mode }),
      });

      if (!response.ok) {
        throw new Error('Backend yanıt vermedi moruk 😢');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now(),
        text: data.response,
        isBot: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Randomly send meme after response
      if (shouldSendMeme()) {
        setTimeout(() => {
          const memeMessage = {
            id: Date.now() + 1,
            image: turkishMeme,
            isBot: true,
            timestamp: Date.now(),
          };
          setMessages(prev => [...prev, memeMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now(),
        text: 'Ya backend çalışmıyo galiba kanka 😭 Server açık mı kontrol et!',
        isBot: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  return (
    <div className="app">
      <ToxicHeader mode={mode} setMode={setMode} />

      <div className="chat-container">
        <div className="messages-area">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              isBot={message.isBot}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={chatEndRef} />
        </div>
      </div>

      <InputArea
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
    </div>
  );
}

export default App;
