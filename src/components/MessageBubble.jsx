export default function MessageBubble({ message, isBot }) {
    const bubbleRef = useRef(null);

    return (
        <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
            <div className="message-avatar">
                {isBot ? '😊' : '👤'}
            </div>

            <div
                ref={bubbleRef}
                className="message-bubble"
            >
                {message.text && (
                    <p className="message-text">{message.text}</p>
                )}

                {message.image && (
                    <div className="message-image">
                        <img src={message.image} alt="meme" />
                    </div>
                )}

                <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </div>
        </div>
    );
}
