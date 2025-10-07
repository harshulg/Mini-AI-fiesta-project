import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.static('dist')); // Serve static files from dist directory (React build)

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model: requestedModel } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // requested model or default to gemini-2.5-flash
    const modelName = requestedModel || "gemini-2.5-flash";
    
    let text;
    
    // Check if it's a Hugging Face model
    if (modelName.includes('moonshotai') || modelName.includes('groq')) {
      // Use Hugging Face API
      const hfResponse = await fetch("https://router.huggingface.co/v1/chat/completions", {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          model: modelName,
        }),
      });
      
      const hfResult = await hfResponse.json();
      console.log(hfResult);
      text = hfResult.choices?.[0]?.message?.content || hfResult.error?.message || "No response from Hugging Face API";
    } else {
      // Use Google Gemini API
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(message);
      const response = await result.response;
      text = response.text();
    }

    res.json({ 
      success: true, 
      response: text,
      model: modelName,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate AI response',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'AI Fiesta Server is running!' 
  });
});

// Get available models endpoint
app.get('/api/models', (req, res) => {
  const availableModels = [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and versatile' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Most capable model' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Latest generation' },
    { id: 'gemini-2.0-flash-001', name: 'Gemini 2.0 Flash 001', description: 'Stable version' },
    { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', description: 'Always latest' },
    { id: 'gemini-pro-latest', name: 'Gemini Pro Latest', description: 'Latest Pro model' },
    { id: 'moonshotai/Kimi-K2-Instruct-0905:groq', name: 'Kimi K2 Instruct', description: 'Hugging Face model' }
  ];
  
  res.json({ 
    success: true,
    models: availableModels,
    timestamp: new Date().toISOString()
  });
});

// Serve the main HTML file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

