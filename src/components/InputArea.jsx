import { useState } from 'react';
import './InputArea.css';

export default function InputArea({ onSendMessage, isTyping }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isTyping) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className="input-area" onSubmit={handleSubmit}>
            <div className="input-container">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Sor bakalım... (risk senin)"
                    disabled={isTyping}
                    rows="1"
                />
                <button
                    type="submit"
                    className="btn-send"
                    disabled={!input.trim() || isTyping}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </form>
    );
}
