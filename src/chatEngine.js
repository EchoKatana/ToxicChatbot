// Toxic Turkish Gen Z Chat Engine
// Frontend-only mock - simulates a sassy, toxic bot

const toxicResponses = {
    greetings: [
        "Aha, bak kim gelmiş. Yine mi sen?",
        "Ya ne istiyorsun ya... Söyle çabuk.",
        "E tamam işte geldim, ne var?",
        "Hoş geldin falan ama direkt konuya gir.",
    ],

    insults: [
        "Ya sen gerçekten kafayı yemişsin galiba 💀",
        "Bunu sormak için mi geldin cidden? KWKDKWKDKW",
        "Ya abi sen nasıl bir malısın yaa",
        "Sen git bi 31 çek kendine gel",
        "Beyin yoksunu seni, bak söylüyorum",
        "Bilerek mi bu kadar malmısın yoksa doğuştan mı?",
    ],

    acknowledgments: [
        "Tamam lan tamam anladık",
        "Eyvallah işte ne dırlıyorsun",
        "Peki moruk peki",
        "Ok boomer 🙄",
        "Anladım abi çekil şimdi",
    ],

    confusion: [
        "Ne diyorsun sen ya? Türkçe konuş.",
        "Aga bak anlamadım bi daha anlat ama mal gibi değil",
        "??? ne alaka şimdi bu",
        "Bak yemin ederim kafayı yiycem senle",
    ],

    smartResponses: [
        "Aga bak açıklıyorum, {answer} işte. Anladın mı lan?",
        "Ya {answer}, bilmiyor musun bunu gerçekten? 🤦",
        "Ulan {answer} işte. Google'a mı yazsana?",
        "Tamam dinle: {answer}. Kolay gelsin 😏",
    ],
};

const memeTemplates = [
    "Bana mantığı anlat ama kısa olsun",
    "Siber-Börek?",
    "Sen ne alaka şimdi?",
];

// Simulated knowledge base (very basic)
const knowledgeBase = {
    "merhaba": "Selam işte, napıyorsun?",
    "nasılsın": "İdare eder, sen nasılsın ki?",
    "naber": "İyi abi senden?",
    "python": "Python mi? Aga o yılan değil mi ya? Şaka şaka, programlama dili işte. Kolay, basit, herkes kullanıyor.",
    "javascript": "JavaScript yani JS, web için falan kullanılıyo. React, Node falan hep bunla.",
    "react": "React bi JavaScript kütüphanesi moruk. Facebook yapmış. UI component'leri falan yapıyorsun.",
    "türkiye": "Türkiye'de her şey çok pahalı abi. Ekonomi gg.",
    "istanbul": "İstanbul kalabalık, trафik var ama güzel şehir ya",
    "ankara": "Ankara soğuk abi, ama başkent işte ne yapalım",
    "oyun": "Oyun mu? LOL, Valorant, CS falan mı oynuyorsun sen?",
    "lol": "League of Legends'ı mı diyorsun? Çok toxic bi oyun ama bağımlılık yapıyor.",
    "valorant": "Valorant'ta rank ne? Iron'san konuşma benimle 😂",
};

export function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Check for greetings
    if (lowerMessage.match(/merhaba|selam|hey|naber|napiyon/)) {
        return {
            text: randomFrom(toxicResponses.greetings),
            hasInsult: false,
        };
    }

    // Try to match knowledge base
    let answer = null;
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerMessage.includes(key)) {
            answer = value;
            break;
        }
    }

    if (answer) {
        // Sometimes add insult before answer
        const shouldInsult = Math.random() > 0.5;
        const insult = shouldInsult ? randomFrom(toxicResponses.insults) + "\n\n" : "";

        return {
            text: insult + answer,
            hasInsult: shouldInsult,
        };
    }

    // If no match, be toxic and confused
    return {
        text: randomFrom(toxicResponses.confusion),
        hasInsult: true,
    };
}

export function shouldSendMeme() {
    // 30% chance to send meme
    return Math.random() > 0.7;
}

export function getRandomMeme() {
    // In a real app, this would fetch from a meme API
    // For now, return placeholder
    return null; // We'll handle this in the app
}

function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Simulate typing delay
export function getTypingDelay(messageLength) {
    const baseDelay = 800;
    const perCharDelay = 20;
    return baseDelay + (messageLength * perCharDelay);
}
