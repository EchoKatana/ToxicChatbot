import './ToxicHeader.css';

export default function ToxicHeader({ mode, setMode }) {
    const toggleMode = () => {
        setMode(mode === 'toxic' ? 'family' : 'toxic');
    };

    return (
        <header className={`toxic-header ${mode === 'family' ? 'family-mode' : ''}`}>
            <div className="header-content">
                <div className="header-left">
                    <div className="logo-container">
                        <div className="logo-glow"></div>
                        <span className="logo-emoji">{mode === 'toxic' ? '💀' : '😊'}</span>
                    </div>
                    <div className="header-text">
                        <h1 className="header-title glitch" data-text="ToxicBot">
                            {mode === 'toxic' ? 'ToxicBot' : 'FriendlyBot'}
                        </h1>
                        <p className="header-subtitle">
                            {mode === 'toxic' ? "Türkiye'nin En Toxic Chatbot'u" : "Türkiye'nin En Kibar Gen Z Asistanı"}
                        </p>
                    </div>
                </div>

                <div className="mood-indicator" onClick={toggleMode} style={{ cursor: 'pointer' }}>
                    <span className="mood-label">Mode:</span>
                    <span className={`mood-value ${mode === 'toxic' ? 'toxic-text' : 'family-text'}`}>
                        {mode === 'toxic' ? 'TOXIC AF' : 'FAMILY FRIENDLY'}
                    </span>
                    <div className="mood-bar">
                        <div className="mood-fill"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}
