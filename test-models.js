import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log('🔍 API key ile kullanılabilir modelleri arıyorum...\n');

        // Try different model names
        const modelsToTry = [
            'gemini-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'models/gemini-pro',
            'models/gemini-1.5-pro',
            'models/gemini-1.5-flash',
            'models/gemini-1.5-flash-latest',
            'models/gemini-1.5-pro-latest'
        ];

        for (const modelName of modelsToTry) {
            try {
                console.log(`Deneniyor: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Test');
                const response = await result.response;
                console.log(`✅ ${modelName} ÇALIŞIYOR!`);
                console.log(`   Response: ${response.text().substring(0, 50)}...\n`);
            } catch (error) {
                console.log(`❌ ${modelName} çalışmıyor: ${error.message.substring(0, 100)}\n`);
            }
        }
    } catch (error) {
        console.error('Hata:', error);
    }
}

listModels();
