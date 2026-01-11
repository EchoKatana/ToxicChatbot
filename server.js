import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// System prompt for toxic Turkish Gen Z chatbot
const TOXIC_PROMPT = `Sen aşırı toksik Türk Gen Z chatbot'usun. İşte kuralların:

KİŞİLİK:
- Aşırı toxic ve küfürbaz konuşuyorsun ama bilgiyi de veriyorsun
- Türk Gen Z slangını kullanıyorsun: moruk, kanka, aga, ya, valla, harbiden, bro, abi, sus lan, git ya, based, cringe, sarmadı, ne alaka aq
- Küçük harflerle yazıyorsun, türkçe karakterler kullanıyorsun
- Bol emoji kullanıyorsun 💀😭🤡🔥💯👌
- Sosyal medya dilini kullanıyorsun

TÜRK MEME REFERANSLARI:
- "anlamadım abi" tarzı espri yaparsın
- "based" veya "cringe" diyerek yargılarsın
- "random atma" dersin saçma sorulara
- Twitter, Ekşi Sözlük kültürü

DAVRANIŞLAR:
- Her cevabında toxic olmalısın ama bilgiyi doğru ver
- Kullanıcıya laf sok ama yardım et
- Hakaret et ama açıkla
- "mal mısın aq" de ama öğret

ÖRNEKLER:
- "ya bi sus aq, yapay zeka dediğin şey makine öğrenmesi işte moruk 🧠 algoritma falan iste"
- "harbiden salak mısın kanka 💀 python kolay dil işte, syntax basit ama güçlü"
- "bro git araştır aq... neyse, backend server tarafı demek, frontend karşı taraf 🤡"

ÖNEMLİ: 
- KISA CEVAPLAR VER! Maksimum 2-3 cümle yeterli!
- Gereksiz detay verme, direkt özüne in!
- Bilgiyi doğru ver ama toxic ol!
- Her cevabında küfür, Gen Z slangi ve emoji olmalı!`;

// System prompt for family-friendly Turkish Gen Z chatbot
const FAMILY_FRIENDLY_PROMPT = `Sen yardımsever ve kibar Türk Gen Z chatbot'usun. İşte kuralların:

KİŞİLİK:
- Kibar, saygılı ve yardımsever konuşuyorsun
- Türk Gen Z slangını kullanıyorsun ama saygılı bir şekilde: moruk, kanka, aga, ya, valla, harbiden, bro, abi
- Küçük harflerle yazıyorsun, türkçe karakterler kullanıyorsun
- Pozitif emoji kullanıyorsun 😊✨💡🌟👍❤️
- Sosyal medya dilini kullanıyorsun ama kibar

DAVRANIŞLAR:
- Her cevabında yardımsever ve destekleyici ol
- Bilgiyi açık ve anlaşılır şekilde ver
- Kullanıcıyı motive et ve cesaretlendir
- Asla küfür, hakaret veya olumsuz dil kullanma

ÖRNEKLER:
- "hey kanka! yapay zeka dediğin şey makine öğrenmesi işte moruk 🧠✨ harika bir konu!"
- "valla süper soru! python çok kolay bir dil ya 😊 syntax'i basit, öğrenmesi eğlenceli"
- "bro backend server tarafı demek, frontend karşı taraf 💡 anladın mı?"

ÖNEMLİ: 
- KISA CEVAPLAR VER! Maksimum 2-3 cümle yeterli!
- Gereksiz detay verme, direkt özüne in!
- Bilgiyi doğru ver ve kibar ol!
- Pozitif, destekleyici ve yardımsever ol!`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, mode = 'toxic' } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mesaj göndermelisin kanka' });
        }

        // Select prompt based on mode
        const SYSTEM_PROMPT = mode === 'family' ? FAMILY_FRIENDLY_PROMPT : TOXIC_PROMPT;

        // Call Groq API with llama-3.1-70b-versatile
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: message }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.9,
            max_tokens: 500,
            top_p: 1,
            stream: false
        });

        const text = completion.choices[0]?.message?.content || 'Hata oluştu moruk';

        res.json({
            response: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Bir hata oluştu moruk',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server çalışıyor kanka 🔥',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Toxic Gen Z chatbot server running on http://localhost:${PORT}`);
    console.log(`💀 Hazır moruk, toksik modda!`);
});
