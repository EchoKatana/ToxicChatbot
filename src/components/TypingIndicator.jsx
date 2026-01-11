import './TypingIndicator.css';

export default function TypingIndicator() {
    return (
        <div className="typing-indicator-wrapper">
            <div className="bot-avatar-small">
                <span>💀</span>
            </div>
            <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
            </div>
        </div>
    );
}
