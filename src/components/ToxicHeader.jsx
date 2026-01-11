import './ToxicHeader.css';

export default function ToxicHeader() {
    return (
        <header className="toxic-header">
            <div className="header-content">
                <div className="header-left">
                    <div className="logo-container">
                        <div className="logo-glow"></div>
                        <span className="logo-emoji">💀</span>
                    </div>
                    <div className="header-text">
                        <h1 className="header-title glitch" data-text="ToxicBot">
                            ToxicBot
                        </h1>
                        <p className="header-subtitle">Türkiye'nin En Toxic Chatbot'u</p>
                    </div>
                </div>

                <div className="mood-indicator">
                    <span className="mood-label">Mood:</span>
                    <span className="mood-value toxic-text">TOXIC AF</span>
                    <div className="mood-bar">
                        <div className="mood-fill"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}
