# HappyRobot E-commerce Hackathon Project

A minimal React frontend for a mocked e-commerce website with a functional chatbot that connects to an external agent for managing product returns.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your external agent API URL:
   ```
   VITE_AGENT_API_URL=http://localhost:8000/api/chat
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── pages/
│   │   ├── Login.jsx          # Mock login (any credentials work)
│   │   ├── Dashboard.jsx      # Mock e-commerce products page
│   │   └── Chatbot.jsx        # Chatbot with external agent integration
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation component
│   │   └── ChatMessage.jsx    # Chat message bubble component
│   └── data/
│       └── mockProducts.js   # Hardcoded product data
```

## 🎯 Features

### 1. Mock Login Screen
- Accepts any email/password combination
- No validation or authentication
- Redirects to dashboard on submit

### 2. Dashboard (Mocked E-commerce)
- Displays product cards with images, names, prices
- "Buy" buttons show demo alerts (non-functional)
- "Return" buttons navigate to chatbot
- Navigation bar with Home, Products, Chat, Logout links

### 3. Chatbot (Real Functionality)
- Connects to external agent API
- Sends user messages and conversation history
- Receives, formats, and displays agent responses
- Real-time message bubbles with timestamps
- Loading indicators during API calls
- Error handling for API failures

## 🔌 External Agent API Integration

The chatbot expects an API endpoint that accepts POST requests with the following format:

**Request:**
```json
{
  "message": "User's message text",
  "conversation_history": [
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant",
      "content": "Previous bot response"
    }
  ]
}
```

**Expected Response:**
```json
{
  "response": "Agent's response text"
}
```
or
```json
{
  "message": "Agent's response text"
}
```

The API URL can be configured via the `VITE_AGENT_API_URL` environment variable.

## 🎨 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework

## 📝 Notes

- All e-commerce functionality is mocked (products, buying, etc.)
- Only the chatbot has real functionality (external API integration)
- No data persistence (no localStorage, no backend)
- Designed for fast hackathon development and demo

## 🏗️ Architecture

The project follows a simple, hackathon-friendly architecture:

- **Functional React components** - No classes, hooks-based
- **Local state management** - React useState for UI state
- **Mock data** - Hardcoded arrays in `src/data/`
- **Minimal dependencies** - Only essential packages
- **Component-based structure** - Reusable UI components

The chatbot component (`Chatbot.jsx`) is the only component with real external integration. It handles:
- Message state management
- API communication with the external agent
- Response formatting and display
- Error handling and fallback messages
