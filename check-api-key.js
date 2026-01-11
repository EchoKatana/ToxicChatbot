import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

console.log('🔬 API Key test ediliyor...\n');
console.log(`API Key uzunluğu: ${process.env.GEMINI_API_KEY?.length || 0} karakter`);
console.log(`API Key başlangıcı: ${process.env.GEMINI_API_KEY?.substring(0, 20)}...`);
console.log(`\nAPI Key format kontrolü:`);
console.log(`- AIza ile başlıyor mu? ${process.env.GEMINI_API_KEY?.startsWith('AIza') ? '✅' : '❌'}`);
console.log(`\nÖneriler:`);
console.log(`1. API key'i Google AI Studio'dan tekrar kontrol et: https://makersuite.google.com/app/apikey`);
console.log(`2. API key'i kopyalarken boşluk ya da satır sonu kalmamış mı?`);
console.log(`3. API key aktif mi? Yeni oluşturulduysa birkaç dakika bekle`);
console.log(`4. Gemini API access'in var mı kontrol et`);
