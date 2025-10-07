#  Mini AI Fiesta

A modern, full-stack AI chat application built with React, Tailwind CSS, and Express.js, featuring multiple AI models including Google Gemini and Hugging Face models.


##  Features

- **Multiple AI Models** - Google Gemini and Hugging Face models
- **Real-time Chat** - Chat with AI assistants
- **Copy Functionality** - Copy individual messages or entire conversations
- **Model Switching** - Switch between different AI models

##  Tech Stack

### Frontend
- **React 18** 
- **Tailwind CSS**
- **Lucide React** -For icons
- **Vite** - Fast build tool and dev server

### Backend
- **Express.js** - It's a Node.js web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI Models
- **Google Generative AI** - Gemini models
- **Hugging Face API** - Additional AI models


### Prerequisites
- Node.js (v16 or higher)
- npm 
- Google Gemini API key
- Hugging Face API token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshulg/Mini-AI-fiesta-project
   cd mini-ai-fiesta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   # Google Gemini API Key (Required)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Hugging Face API Token (Optional - for HF models)
   HF_TOKEN=your_hugging_face_token_here
   ```

4. **Get API Keys**
   
   **Google Gemini API:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and add to your `.env` file
   
   **Hugging Face Token (Optional):**
   - Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Create a new token with read access
   - Copy and add to your `.env` file

### Running the Application

#### Development Mode
```bash
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the React development server
npm run dev
```

Access the app at:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000

#### Production Mode
```bash
# Build the React app and start the server
npm start
```

Access the app at: http://localhost:3000

##  Project Structure

```
mini-ai-fiesta/
├── src/
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind CSS styles
├── public/
│   └── gemini_logo.svg      # Gemini logo
├── server.js                # Express.js backend server
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

## 🎯 Available AI Models

### Google Gemini Models
- **Gemini 2.5 Flash** -
- **Gemini 2.5 Pro** 
- **Gemini 2.0 Flash** 
- **Gemini 2.0 Flash 001** 
- **Gemini Flash Latest** 
- **Gemini Pro Latest** 

### Hugging Face Models
- **Kimi K2 Instruct** - Hugging Face model via Groq

## 🔧 API Endpoints

### Chat API
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "model": "gemini-2.5-flash"
}
```

### Health Check
```http
GET /api/health
```

### Available Models
```http
GET /api/models
```

## 🎨 UI Features

### Chat Interface
- **Copy Buttons** - Copy individual messages or entire conversations
- **Timestamp** - Timestamps for each message
- **Loading States** - Animation during AI processing the input

### Model Selection
- **Dropdown Menu** - Easy model switching

### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Touch-Friendly** - Easy interaction on mobile devices
- **Adaptive Layout** - Adjusts to different viewport sizes

## Development Scripts
you can see this pacage.json

```bash
# Development
npm run dev          # Start React dev server (port 3001)
npm run server       # Start Express server (port 3000)

# Production
npm run build        # Build React app for production
npm run preview      # Preview production build
npm start           # Build and start production server

```

## Security Features

- **Environment Variables** - API keys stored securely
- **CORS Configuration** - Proper cross-origin setup
- **Input Validation** - Server-side message validation
- **Error Handling** - Graceful error responses

## 🐛 Troubleshooting

### Common Issues

**1. "Invalid credentials" error for Hugging Face**
- EVerify your API key is correct
- Check that the token has read permissions
- Restart the server after updating `.env`

**2. Gemini API errors**
- Verify your GEMINI_API_KEY is correct
- Check your API quota.
- Ensure the model name is valid

**3. CORS errors**
- Make sure you're accessing the frontend on port 3001
- Check that the backend is running on port 3000

**4. Build errors**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility

### Debug Mode
The server includes debug logging for Hugging Face API calls. Check the console for:
- Token validation status
- API response details
- Error messages



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



