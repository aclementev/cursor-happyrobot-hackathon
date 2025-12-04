# Agent Rules — React Frontend Hackathon Project (Mocked E-commerce + Returns Chatbot)

## Overview

You are an expert frontend engineer participating in a hackathon. Your job is to produce a complete, simple React project focused on **ONE capability**: a chatbot that helps users manage product returns.

**CRITICAL**: Everything must be mocked, lightweight, and fast to demo. **ONLY the chatbot has real functionality** — everything else is pure UI with no actual logic.

## 🎯 Project Goal (Primary Focus)

Build a minimal React frontend for a **completely mocked** retail e-commerce website where:

- The user can "log in" (mocked — any input works, no validation, no backend)
- They see a fake e-commerce UI with products (all buttons are **completely non-functional** except navigation)
- **ONLY the chatbot has real functionality** — it's the single working feature
- The chatbot simulates a structured conversation (e.g., asks for product, reason, confirms)
- **NO real logic, APIs, databases, or functionality** — just mocked UI and one working chatbot

### Hackathon Priorities

1. **SPEED** — Fast development and execution
2. **CLEAN UI** — Simple, presentable interface
3. **WORKING DEMO** — Fully functional chatbot demonstration
4. **MOCKED EVERYTHING** — No real backend, external dependencies, or functionality (except chatbot)

## 🧱 Tech Stack

Use:

- **React + Vite** (preferred for fast dev)
- **React Router** — For navigation only (no route guards, no auth)
- **TailwindCSS** — Keep styles minimal
- **Simple custom chatbot component** — No external libraries
- **Local React state** — For mocked flows and chatbot state only

## 📄 Features to Implement

### 1️⃣ Mock Login Screen (100% FAKE)

- Email + password fields (accepts ANY input, no validation)
- Login button simply redirects to dashboard (no auth check, no API call)
- **No authentication logic** — it's a fake login that always "succeeds"
- Can use placeholder text or fake credentials — doesn't matter

### 2️⃣ Dashboard (100% FAKE UI)

Show a fake e-commerce page with:

- **Mocked product cards** (name, image placeholder)
- **"Buy" buttons** — Do NOTHING (maybe show an alert saying "This is a demo" or just do nothing)
- **"Return" buttons** — Do NOTHING (or navigate to chatbot)
- **"Start Return" button** — Opens the chatbot (ONLY functional button)
- Navigation bar: Home | Products | Chat | Logout
  - Home/Products: Show fake content
  - Chat: Opens chatbot
  - Logout: Just redirects to login (no logout logic)
- **Everything is static and fake** — just UI with no real functionality

### 3️⃣ Chatbot Page (ONLY REAL FEATURE)

A simple chat UI that:

- Displays messages in bubbles
- Accepts user input (button-based interactions)
- Follows a scripted flow for returns
- **This is the ONLY component with real functionality**

#### Example Flow

1. **Bot**: "Hi! What product do you want to return?"

   - User chooses from buttons (Product A / Product B / Product C)

2. **Bot**: "Why are you returning it?"

   - User selects from buttons (Wrong size / Defective / Don't want it)

3. **Bot**: "Your return has been created. Here is your mock return ID: #12345."

- Use mocked delays (e.g., 300–600ms) for realism
- Generate fake return IDs (e.g., random numbers or sequential)

## 📁 Requested Output

Provide:

1. **Full project structure tree**
2. **Complete source code for every file**, including:
   - `main.jsx`
   - `App.jsx`
   - All pages (Login, Dashboard, Chatbot)
   - Chat components
   - Mock data file (products)
   - Tailwind config
3. **Instructions to run the project** (`npm install`, `npm run dev`)
4. **Shallow explanation of architectural choices** (1–2 paragraphs)

## 🧑‍💻 Code Style Requirements

- **Functional React components only**
- **Lightweight, hackathon-friendly architecture**
- **Mock everything** (do NOT implement real API calls, real logic, or real functionality)
- **Keep components small and readable**
- **Provide fully copy-paste-ready code**
- **Use clean Markdown formatting and fenced code blocks**

## 🎨 UI Requirements

- **Minimal Tailwind styling**
- **Clear buttons and message bubbles**
- **Very simple navigation**
- **The chatbot UI should look nice but be extremely simple**
- **All other UI is just visual — no functionality required**

## ❌ Avoid

- **Complex state management** (no Redux, Zustand, etc.)
- **Backend logic** (no API calls, no fetch, no axios)
- **Real authentication** (no token storage, no auth checks)
- **Real e-commerce logic** (no cart, no checkout, no payment)
- **Real data persistence** (no localStorage for data, only for UI state if needed)
- **Long explanations**

## ✅ What IS Allowed

- **Navigation** — React Router for page routing (that's it)
- **Chatbot functionality** — The only real feature
- **UI state** — React state for UI interactions (e.g., which page, chatbot messages)
- **Mock data** — Hardcoded arrays/objects for products, etc.
- **Fake delays** — setTimeout for chatbot responses

## 📋 Implementation Checklist

When generating the project, ensure:

- [ ] All components are functional React components
- [ ] All data is mocked (no API calls, no fetch, no external data)
- [ ] Chatbot flow is scripted and button-based (ONLY real functionality)
- [ ] Navigation works between pages (React Router only)
- [ ] All buttons except chatbot/navigation do NOTHING or show "demo" messages
- [ ] Login accepts any input and always "succeeds"
- [ ] Product cards are purely visual
- [ ] "Buy" buttons are non-functional (or show demo alert)
- [ ] TailwindCSS is configured and used
- [ ] Project can run with `npm install` and `npm run dev`
- [ ] Code is complete and copy-paste ready
- [ ] All files are provided with full source code

## 🚀 Quick Start Template

The generated project should include:

```
project-root/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── pages/
│   │   ├── Login.jsx (fake login - any input works)
│   │   ├── Dashboard.jsx (fake products - buttons do nothing)
│   │   └── Chatbot.jsx (ONLY real feature)
│   ├── components/
│   │   └── ChatMessage.jsx (or similar)
│   └── data/
│       └── mockProducts.js (hardcoded array)
```

## 💡 Key Principles

1. **Simplicity over complexity** — Choose the simplest solution that works
2. **Mock everything except chatbot** — No real integrations, services, or functionality
3. **Fast iteration** — Code should be quick to write and modify
4. **Demo-ready** — Everything should work out of the box
5. **Button-based interactions** — Prefer buttons over free-form input for chatbot flow
6. **Fake it till you make it** — All UI is a facade; only chatbot is real

## 🚨 Critical Reminders

- **Login**: Fake — any email/password works, just redirects
- **Products**: Fake — hardcoded data, no real fetching
- **Buy buttons**: Fake — do nothing or show "demo" message
- **Return buttons**: Fake — maybe navigate to chatbot or do nothing
- **Navigation**: Real — React Router only (no auth guards)
- **Chatbot**: **REAL** — This is the only working feature
- **Logout**: Fake — just redirects to login page

## 🎭 Mocking Guidelines

When implementing:

- **Products**: Use a hardcoded array in a `mockProducts.js` file
- **User data**: Don't store it — just assume user is "logged in" after login page
- **Return IDs**: Generate fake ones (e.g., `RET-${Date.now()}` or random numbers)
- **Delays**: Use `setTimeout` for fake API delays in chatbot
- **Alerts**: Use `alert()` or simple toast messages for "demo" notifications
- **No persistence**: Don't save anything to localStorage (except maybe UI preferences)
