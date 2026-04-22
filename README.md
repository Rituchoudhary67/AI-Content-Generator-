# ⚡ ContentForge AI — AI-Powered Content Generator

> A production-ready, full-stack AI content generation platform built from scratch using React, Node.js, MongoDB and Groq LLaMA 3.3-70B. Not just another ChatGPT wrapper — this project is built around real engineering concepts like structured prompt engineering, version control for writing, and a multi-turn AI critique system.

🔗 **Live Demo:** [Click here to try ContentForge AI](https://ai-content-generator-4336dcxz8-rituchoudhary67s-projects.vercel.app)  
📦 **Repository:** [github.com/Rituchoudhary67/AI-Content-Generator-](https://github.com/Rituchoudhary67/AI-Content-Generator-)  
👩‍💻 **Built by:** Ritu Choudhary

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F55036?style=flat)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat&logo=express)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat)

---

## 📌 Project Overview

ContentForge AI is a full-stack web application that allows users to generate high-quality AI content for 8 different platforms — LinkedIn, Twitter, blogs, emails, YouTube, Instagram, and more. Users can customize the tone, target audience, language, and length. Every piece of content is saved with full version history, and users can request AI-powered improvement suggestions on any generation.

The project was built entirely from scratch — backend API, database models, authentication system, frontend UI, and AI integration — with zero paid services.

---

## 🎯 What Makes This Different From Other AI Tools

If an interviewer asks *"There are already tools like Jasper, Copy.ai — why build this?"* — here's the answer:

### 1. 🧠 Structured Prompt Engineering (Not a Text Box)
Most tools just forward your input to the AI. ContentForge has a `buildPrompt()` function in `controllers/gemini.js` that dynamically constructs a surgical prompt based on:
- Content type (blog post vs tweet thread = completely different prompt structure)
- Tone (witty vs formal = different language instructions)
- Target audience (developers vs startup founders = different vocabulary)
- Word count (short/medium/long = different structural instructions)

This is what companies mean when they say "prompt engineering skills" in job descriptions.

### 2. 🔁 Version Control for Writing (Like Git for Content)
When a user clicks "Regenerate", the old version is NOT overwritten. It's pushed into a MongoDB `versions[]` array with a `currentVersion` pointer — exactly like Git commits. Users can switch between versions and compare v1 vs v3 side by side. No other free tool does this well.

### 3. 💡 Multi-Turn AI Critique Engine
After generating content, a second independent AI call analyzes the output and returns:
- A quality score out of 10
- One-sentence overall assessment
- 3 specific, actionable improvement suggestions

This demonstrates understanding of multi-turn AI workflows — not just single API calls.

### 4. 📊 Token Usage Analytics
Every generation tracks tokens used and stores it per user. The analytics dashboard shows total tokens, average tokens per generation, content type breakdown, and tone usage — all using MongoDB aggregation pipelines. This shows you understand how LLMs work under the hood.

### 5. 💯 100% Free Stack
Jasper costs $49/month. Copy.ai costs $36/month. ContentForge costs $0/month to run and is fully open source. That's a legitimate product differentiator.

---

## ✨ Full Feature List

- 🤖 AI content generation powered by Groq LLaMA 3.3-70B (fastest free LLM available)
- 📝 8 content types — Blog post, LinkedIn post, Tweet thread, Email, Product description, YouTube script, Instagram caption, Cold outreach
- 🎨 6 tones — Professional, Casual, Witty, Inspirational, Formal, Conversational
- 🌐 Multi-language support — English, Hindi, Spanish, French, German, Marathi
- 🔁 Full version history — every regeneration is saved and switchable
- 🔀 Side-by-side version comparison — compare any two versions like a Git diff
- 💡 AI improvement engine — score out of 10 + 3 specific suggestions per generation
- 📊 Token analytics dashboard — usage graphs, breakdowns by content type and tone
- 💾 Export as Markdown (.md) or plain text (.txt)
- ⭐ Favorites system — star your best content and filter by favorites
- 🔍 Search and filter history by content type, tone, and keyword
- 🔐 JWT authentication — secure register and login with bcrypt password hashing
- 🛡️ Rate limiting — 20 AI generations per hour, 100 requests per 15 minutes globally
- 📱 Responsive design — works on mobile and desktop
- 🌙 Dark mode UI — clean, modern dark theme throughout

---

## 🛠️ Tech Stack

| Layer | Technology | Why This Choice |
|-------|-----------|-----------------|
| Frontend | React 18 + Vite | Fast HMR, modern React with hooks |
| Styling | Inline CSS + CSS variables | No extra dependencies, full control |
| Routing | React Router v6 | Industry standard for React SPAs |
| HTTP Client | Axios | Interceptors for auto token attachment |
| Backend | Node.js + Express | Fast, minimal, JavaScript full-stack |
| Database | MongoDB + Mongoose | Flexible schema, great for content storage |
| AI | Groq SDK + LLaMA 3.3-70B | 100% free, fastest inference available |
| Auth | JWT + bcryptjs | Stateless, scalable authentication |
| Rate Limiting | express-rate-limit | Protect AI endpoint from abuse |
| Frontend Deploy | Vercel | Free, instant deploys from GitHub |
| Backend Deploy | Render.com | Free Node.js hosting with auto-deploy |
| Database Host | MongoDB Atlas | 512MB free forever |

**Total monthly cost: $0.00**

---

## 📁 Project Structure

```
