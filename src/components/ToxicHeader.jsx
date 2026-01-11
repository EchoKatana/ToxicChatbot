import './ToxicHeader.css';

export default function ToxicHeader({ mode, setMode }) {
    const toggleMode = () => {
        // Cycle through modes: toxic → family → enes → toxic
        if (mode === 'toxic') {
            setMode('family');
        } else if (mode === 'family') {
            setMode('enes');
        } else {
            setMode('toxic');
        }
    };

    // Determine header class and content based on mode
    const getModeClass = () => {
        if (mode === 'family') return 'family-mode';
        if (mode === 'enes') return 'enes-mode';
        return '';
    };

    const getModeEmoji = () => {
        if (mode === 'family') return '😊';
        if (mode === 'enes') return '🔥';
        return '💀';
    };

    const getModeName = () => {
        if (mode === 'family') return 'FriendlyBot';
        if (mode === 'enes') return 'EnesBot';
        return 'ToxicBot';
    };

    const getModeSubtitle = () => {
        if (mode === 'family') return "Türkiye'nin En Kibar Gen Z Asistanı";
        if (mode === 'enes') return "Ultra Toxic Enes Edition";
        return "Türkiye'nin En Toxic Chatbot'u";
    };

    const getModeLabel = () => {
        if (mode === 'family') return 'FAMILY FRIENDLY';
        if (mode === 'enes') return 'ENES MODE';
        return 'TOXIC AF';
    };

    const getModeTextClass = () => {
        if (mode === 'family') return 'family-text';
        if (mode === 'enes') return 'enes-text';
        return 'toxic-text';
    };

    return (
        <header className={`toxic-header ${getModeClass()}`}>
            <div className="header-content">
                <div className="header-left">
                    <div className="logo-container">
                        <div className="logo-glow"></div>
                        <span className="logo-emoji">{getModeEmoji()}</span>
                    </div>
                    <div className="header-text">
                        <h1 className="header-title glitch" data-text={getModeName()}>
                            {getModeName()}
                        </h1>
                        <p className="header-subtitle">
                            {getModeSubtitle()}
                        </p>
                    </div>
                </div>

                <div className="mood-indicator" onClick={toggleMode} style={{ cursor: 'pointer' }}>
                    <span className="mood-label">Mode:</span>
                    <span className={`mood-value ${getModeTextClass()}`}>
                        {getModeLabel()}
                    </span>
                    <div className="mood-bar">
                        <div className="mood-fill"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}
