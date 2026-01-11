import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for toxic Turkish Gen Z chatbot
const SYSTEM_PROMPT = `Sen aşırı toksik Türk Gen Z chatbot'usun. İşte kuralların:

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

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mesaj göndermelisin kanka' });
        }

        // Initialize the model - using gemini-3-flash-preview
        const model = genAI.getGenerativeModel({ model: 'models/gemini-3-flash-preview' });

        // Combine system prompt with user message
        const fullMessage = `${SYSTEM_PROMPT}\n\nKullanıcı sorusu: ${message}`;

        // Generate response
        const result = await model.generateContent(fullMessage);
        const response = await result.response;
        const text = response.text();

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
