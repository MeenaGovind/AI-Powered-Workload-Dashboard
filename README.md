
# 🚀 AI Powered Workload Dashboard

An AI-driven workload intelligence dashboard that helps Project Managers identify:

✔️ Who is overworked  
✔️ Who is underutilized  
✔️ Burnout risk  
✔️ Smart AI workload balancing suggestions  
✔️ Charts to visualize workload capacity and risk  

Built with:
- React + Tailwind (Frontend)
- Firebase Auth + Firestore
- Node.js + Express (Backend)
- OpenAI LLM Intelligence Engine
- Chart.js for graphs

---

## 🔥 Features

### 🧠 AI Workload Intelligence
- Sends team workload to LLM
- Analyses complexity vs capacity
- Returns:
  - Burnout Risk (1–10)
  - Rebalancing Suggestions
  - Reason & Impact

---

### 📊 Charts & Insights
- Capacity vs Load Comparison (Bar Chart)
- Burnout Risk (Donut Chart)

---

### 👥 Team Management
- Add Team Members
- Add Tasks
- Assign tasks via dropdown
- Store in Firestore

---

### 🔐 Authentication
- Google Sign-In
- Only logged-in PM can access dashboard

---

## 🏗️ Setup Guide

### 1️⃣ Clone & Install

```
cd backend
npm install
cd ../frontend
npm install
```

---

## ⚙️ Firebase Setup

1️⃣ Go to Firebase Console  
2️⃣ Enable:

- Authentication (Google)
- Firestore Database

---

### 🔥 Frontend Firebase Env

Create:  
`frontend/.env`

```
REACT_APP_FIREBASE_KEY=YourKey
REACT_APP_AUTH=yourapp.firebaseapp.com
REACT_APP_PROJECT=your_project_id
```

---

### 🔐 Backend Firebase

Go to Firebase → Service Accounts → Generate Key  
Save as:

```
backend/serviceAccount.json
```

---

## 🤖 OpenAI Setup

Create:

```
backend/.env
```

```
OPENAI_API_KEY=YOUR_KEY
```

---

## ▶️ Run Locally

### Backend
```
cd backend
node server.js
```

### Frontend
```
cd frontend
npm start
```

---

# 🚀 Deployment Guide (FREE Hosting)

## 🌍 Deploy Backend → Render

1️⃣ Push project to GitHub  
2️⃣ Go to https://render.com  
3️⃣ New Web Service  
4️⃣ Select backend folder repo  
5️⃣ Set:
```
Build: npm install
Start: node server.js
```

6️⃣ Add Environment Variable:
```
OPENAI_API_KEY=your_key
```

7️⃣ Deploy  
Copy backend URL

---

## 🌍 Deploy Frontend → Vercel

1️⃣ Go to https://vercel.com  
2️⃣ Import Repo  
3️⃣ Select frontend folder  

4️⃣ Add ENV
```
REACT_APP_FIREBASE_KEY=
REACT_APP_AUTH=
REACT_APP_PROJECT=
```

5️⃣ ALSO ADD backend API URL inside `Dashboard.js`

```
https://YOUR-RENDER-URL/api/analyze-workload
```

6️⃣ Deploy 🎉

---

# 🧠 Assignment Q&A

## 📌 Q1:
### “If you had another 3 days, how would you use AI to automate assigning new tickets using historical performance?”

### ✅ Answer:
Given 3 more days, I would build **AI Auto Assignment Engine** using:

### 1️⃣ Historical Developer Performance Data
- Average task completion time
- Task success rate
- Reopened / bug count
- Skill match accuracy
- Past burnout & overtime
- Context switching efficiency

### 2️⃣ Predictive AI Model
AI would predict:
- Who is best suited for task
- Estimated completion confidence
- Quality probability
- Burnout impact
- Delivery risk level

### 3️⃣ Automation Workflow
- New ticket arrives
- AI evaluates best developer
- AI assigns automatically
- Provides explanation + confidence score
- PM can approve / override

### 4️⃣ Continuous Learning
- After completion, results stored
- AI improves future assignment accuracy

---

## 📌 Q2:
### “What edge cases did you consider while prompting AI for workload rebalancing?”

### ✅ Answer:
Edge cases handled:

- Senior dev overloaded with complex tasks
- Junior dev assigned critical tasks → prevent failure
- Users with free time but wrong skillset → no forced assignment
- Developer capacity + sprint limit considered
- High task count but low complexity handled correctly
- Avoid unnecessary over-shuffling
- Handle missing or incomplete task data
- Prevent assigning everything to best performer
- Consider PTO or partial availability
- AI always returns valid JSON

---

# 🎯 Final Outcome

You get:

✔️ Live Dashboard  
✔️ AI Intelligence  
✔️ Firestore Persistence  
✔️ Secure Login  
✔️ Charts & Visuals  
✔️ Assignment Ready Project  

---

If you want:
⭐ I can add Dark Mode  
⭐ Admin Role Based Access  
⭐ Export Reports  
⭐ Real-time updates

Just tell me 😊

