# Turkish Gen Z Toxic Chatbot - Backend Setup

Backend server for the Turkish Gen Z toxic chatbot using Express and Google Gemini API.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Get your Google Gemini API key from: https://makersuite.google.com/app/apikey
3. Add your API key to the `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Run the Server
```bash
npm run server
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/api/chat`
Send a message to the toxic Gen Z chatbot.

**Request:**
```json
{
  "message": "Merhaba, yapay zeka nedir?"
}
```

**Response:**
```json
{
  "response": "ya bi sus aq, yapay zeka dediğin şey şu işte moruk... 💀",
  "timestamp": "2026-01-11T12:47:00.000Z"
}
```

### GET `/api/health`
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server çalışıyor kanka 🔥",
  "timestamp": "2026-01-11T12:47:00.000Z"
}
```

## Features

- ✅ Express.js backend server
- ✅ Google Gemini AI integration
- ✅ Toxic Turkish Gen Z personality
- ✅ Turkish slang and memes
- ✅ CORS enabled for frontend integration
- ✅ Environment variable configuration

## Architecture

- `server.js` - Main Express server with chat endpoint
- `.env` - Environment variables (not committed)
- `.env.example` - Template for environment setup
