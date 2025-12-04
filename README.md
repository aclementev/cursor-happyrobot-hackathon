# HappyRobot Hackathon Project

A hackathon project featuring a mocked e-commerce website with an AI-powered returns chatbot.

## 📁 Project Structure

```
happyrobot-hackathon/
├── frontend/          # React frontend application
├── frontend_agent.md  # Frontend development guidelines
└── README.md          # This file
```

## 🚀 Getting Started

### Frontend

Navigate to the `frontend` directory and follow the instructions in `frontend/README.md`:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 👥 Collaboration

This project is organized to support multiple contributors:

- **Frontend**: All React/Vite code is in the `frontend/` directory
- **Backend/API**: Can be added at the root level or in a separate directory
- **Documentation**: Project-specific docs at root, component docs in respective directories

## 📝 Notes

- The frontend is a complete, standalone React application
- The chatbot connects to an external agent API (configurable via environment variables)
- All e-commerce functionality is mocked for demo purposes
