# Chaitanya Mohare — Interactive 3D Portfolio & Admin Suite

A modern, interactive 3D Personal Portfolio and Admin Suite designed for **Chaitanya Mohare** (Full-Stack Developer & Systems Architect, B.Tech in Electronics & Computer Engineering at MIT, Chhatrapati Sambhaginagar, CGPA: 8.15 / 10).

Synthesizes high-contrast brutalist aesthetics, vibrant color blocking (`Electric Lime #C6F906`, `Sky Blue #0088FF`, `Moss Green #768948`, `Soft Pastel Pink #FFB8F6`, and `Off-white #F8F9FA`), procedural 3D WebGL scenes using Three.js & React Three Fiber, an interactive floating Chatbot with an Unbeatable Minimax Tic-Tac-Toe mini-game, and a protected CRUD Admin Dashboard backed by Express.js & MongoDB.

---

## 🚀 Quick Start

### 1. Install All Dependencies
From the root project directory:
```bash
npm run install:all
```
*(Or install separately with `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

### 2. Seed Database (Optional - Server also auto-seeds on startup)
```bash
npm run seed
```

### 3. Run Both Server & Client Concurrently
```bash
npm run dev
```

- **Frontend Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🔐 Admin Dashboard Credentials

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Username**: `admin`
- **Password**: `admin123`
*(Auto-seeded into MongoDB on initial boot. Credentials are customizable in `server/.env`)*

---

## 🏗️ Architecture & Tech Stack

```
├── /client                     # Next.js 14 App Router Frontend
│   ├── app/
│   │   ├── layout.jsx          # Fonts (Anton, Instrument Serif, Plus Jakarta Sans) + Chatbot
│   │   ├── page.jsx            # Main interactive portfolio page
│   │   ├── admin/page.jsx      # Protected CRUD Admin Panel
│   │   └── admin/login/page.jsx# Brutalist JWT Login Screen
│   ├── components/
│   │   ├── Navbar.jsx          # Brand navigation & status indicator
│   │   ├── 3d/                 # Three.js / React Three Fiber procedural island & monolith
│   │   ├── sections/           # Hero (3-layer parallax), About (split color-block), Experience, Events, Achievements
│   │   └── chatbot/            # Floating Chatbot & Minimax Unbeatable Tic-Tac-Toe game
│   └── lib/
│       ├── api.js              # Full-featured API client with transparent fallback
│       └── fallbackData.js     # High-fidelity mock dataset with Chaitanya's real portfolio data
│
├── /server                     # Express.js & MongoDB Backend
│   ├── models/                 # Event, Achievement, Experience, Admin
│   ├── routes/                 # Auth, Events, Achievements, Experience, Stats, Upload
│   ├── middleware/             # JWT auth middleware
│   ├── uploads/                # Local Multer file storage
│   ├── seed.js                 # Seeder with Chaitanya Mohare's real data & default admin
│   └── server.js               # Express entrypoint & auto-seed coordination
│
└── package.json                # Root concurrent scripts
```

---

## 🎮 Features Highlights

1. **True Parallax 3D Depth**:
   - `Layer 1 (z-1)`: Giant oversized display typography (`Anton`)
   - `Layer 2 (z-2)`: Interactive procedural 3D low-poly island & cyber monolith rotating with mouse movement and gentle float physics
   - `Layer 3 (z-3)`: Live counter stats fetched from MongoDB (`Pravesh Mitra` 1,200+ users, `Build for Bharat` 12+ events)
2. **About Me Split Color-Block**:
   - Left Sky Blue panel with 3D-angled card and bobbing badges (`"Full-Stack Dev ↖"`, `"Embedded IoT ↖"`)
   - Right Electric Lime panel with stacked display typography & editorial serif subhead
   - Bottom Pastel Pink panel with biography and interactive tech pills
3. **Floating Chatbot & Tic-Tac-Toe Game**:
   - Bottom-right launcher opening a dual-mode glassmorphic/brutalist widget
   - **Ask Bot Mode**: Answers questions about Chaitanya's background, hackathons, and architecture
   - **Play Tic-Tac-Toe Mode**: 3x3 interactive grid with Casual mode vs. **Unbeatable Minimax AI**, live score tracking, playful bot trash talk, and confetti celebration on player victory
4. **Full CRUD Admin Panel**:
   - Add, edit, and delete Events Hosted, Achievements, and Projects
   - Drag-and-drop / file upload preview saving locally to `/uploads`
   - Real-time updates reflecting on public pages
