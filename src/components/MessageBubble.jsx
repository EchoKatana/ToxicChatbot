import { useState, useRef, useEffect } from 'react';
import './MessageBubble.css';

export default function MessageBubble({ message, isBot }) {
    const [isShaking, setIsShaking] = useState(false);
    const bubbleRef = useRef(null);

    useEffect(() => {
        // If bot message contains yelling indicators, trigger shake
        if (isBot && message.text && (
            message.text.includes('!') &&
            message.text === message.text.toUpperCase()
        )) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    }, [message, isBot]);

    return (
        <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
            {isBot && (
                <div className="bot-avatar">
                    <div className="avatar-glow"></div>
                    <span>💀</span>
                </div>
            )}

            <div
                ref={bubbleRef}
                className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'} ${isShaking ? 'shake' : ''}`}
            >
                {message.text && (
                    <p className="message-text">{message.text}</p>
                )}

                {message.image && (
                    <div className="message-image">
                        <img src={message.image} alt="meme" />
                    </div>
                )}

                <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </div>

            {!isBot && (
                <div className="user-avatar">
                    <span>👤</span>
                </div>
            )}
        </div>
    );
}
