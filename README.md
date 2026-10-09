# 🔰Hashnode Clone — Client

> A developer-first blogging platform where developers write, format, and share technical content. This repository contains the **React frontend**. The Express/MongoDB API lives in the sibling `/server` folder.

**Live demo:** [Hashnode](https://hashnode-client.vercel.app/)
**Backend repo/folder:** [`/server`](https://github.com/Shikha246/Hashnode_Server.git)

---

## 💻Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [How Authentication Works](#how-authentication-works)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)

---

## Features

**Core**
- User registration and login with JWT-based sessions (persisted across page refreshes)
- Protected routes — guests are redirected to `/login` when trying to access private pages
- Full post lifecycle: create, edit, delete, save as draft, or publish
- Markdown editor with a **live side-by-side preview**
- Code blocks rendered with language-aware **syntax highlighting**
- Tagging system — attach tags to posts, browse by tag, see post counts per tag
- Public developer feed with **keyword search**, newest-first ordering
- Public author profiles showing bio, avatar, and their published posts
- Private dashboard listing your own drafts + published posts with edit/delete actions
- Editable account settings (name, bio, avatar)

**Extras**
- 🌓 Dark mode toggle, preference saved in `localStorage`
- ⏱️ Estimated reading time shown on post cards and post pages
- 📱 Responsive layout — tested down to ~375px width

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI library |
| [Vite](https://vitejs.dev) | Dev server & build tool |
| [React Router DOM](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP requests to the API |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Markdown → HTML rendering |
| [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) | Code block highlighting |
| React Context API | Global state (auth session, theme) — no Redux used |

---

## Prerequisites

- **Node.js** (LTS) and npm
- The **backend API running** — either locally (see `/server/README.md`) or deployed. This app is a pure client; it has no functionality without an API to call.

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/hashnode-clone.git
cd hashnode-clone/client

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env   # or create .env manually

# 4. Start the dev server
npm run dev
```

The app will be running at **http://localhost:5173**.

---

## Environment Variables

Create a `.env` file in the `client/` root:

```env
VITE_API_URL=http://localhost:5000/api
```

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API, **including `/api`** | `http://localhost:5000/api` or `https://your-api.onrender.com/api` |

> ⚠️ Vite only exposes env vars prefixed with `VITE_`, and it reads them **at build time**. If you change this value after building/deploying, you must rebuild (locally: restart `npm run dev`; on Vercel: trigger a redeploy).

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot module reload |
| `npm run build` | Builds an optimized production bundle into `dist/` |
| `npm run preview` | Serves the production build locally, to sanity-check before deploying |

---

## Project Structure
src/
├── api/
│ └── axios.js # Axios instance — auto-attaches JWT to every request
├── components/
│ ├── layout/ # Navbar, ProtectedRoute, AuthForm, LoadingSpinner, ErrorMessage
│ ├── post/ # PostCard, PostList, TagPill
│ └── editor/ # MarkdownEditor, MarkdownPreview, TagInput
├── context/
│ ├── AuthContext.jsx # Current user, token, auth status
│ └── ThemeContext.jsx # Light/dark theme state
├── hooks/
│ ├── useAuth.js
│ └── useTheme.js
├── pages/ # One component per route
│ ├── Feed.jsx
│ ├── PostDetail.jsx
│ ├── Tags.jsx / TagPage.jsx
│ ├── Login.jsx / Register.jsx
│ ├── Dashboard.jsx
│ ├── PostEditor.jsx
│ ├── Profile.jsx / Settings.jsx
│ └── NotFound.jsx
├── styles/
│ └── responsive.css # Media queries, theme CSS variables
├── utils/
│ └── readingTime.js
├── App.jsx # Route definitions
└── main.jsx # Entry point — wraps App in Router + Context providers



---

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Developer feed — published posts, newest first, searchable |
| `/post/:slug` | Public | Full post with Markdown + syntax-highlighted code |
| `/tags` | Public | All tags with post counts |
| `/tag/:slug` | Public | Posts filtered to one tag |
| `/profile/:id` | Public | Author's public profile and published posts |
| `/login` | Public | Login form |
| `/register` | Public | Registration form |
| `/dashboard` | 🔒 Protected | Your own drafts + published posts, with edit/delete |
| `/editor/new` | 🔒 Protected | Create a new post |
| `/editor/:id` | 🔒 Protected | Edit a post you authored |
| `/settings` | 🔒 Protected | Edit your profile (name, bio, avatar) |
| `*` | — | 404 page |

---

## How Authentication Works

1. On login/register, the API returns a JWT, which is saved to `localStorage`.
2. Every subsequent API request automatically attaches `Authorization: Bearer <token>` via an Axios interceptor (`src/api/axios.js`).
3. On app load, `AuthContext` calls `GET /api/auth/me` to validate the saved token against the server. If it's expired or invalid, the user is silently logged out and treated as a guest — no error is shown.
4. `ProtectedRoute` wraps any route that requires login and redirects guests to `/login`.
5. Ownership checks (e.g., "can I edit this post?") are **enforced server-side**, not just hidden in the UI — the client never assumes permission.

---

## Troubleshooting

**"Not found: /auth/register" or similar 404 from the API**
`VITE_API_URL` is likely missing the `/api` suffix, or wasn't rebuilt after being changed. See [Environment Variables](#environment-variables).

**CORS error in the browser console**
The backend's allowed origins list doesn't include this app's URL. Check `CLIENT_URL` in the backend's environment variables.

**Logged out immediately after logging in / on every refresh**
Usually means `GET /api/auth/me` is failing — check that `JWT_SECRET` matches between how the token was signed and how it's being verified, and that the backend is reachable.

**Styles look unstyled / plain**
Confirm both `index.css` and `styles/responsive.css` are imported in `main.jsx`.

---

## Deployment

Deployed on **Vercel**:
- Root directory: `client`
- Framework preset: Vite (auto-detected)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL` set to the production API URL

See the root-level project README for the full deployment flow connecting this to the backend on Render and the database on MongoDB Atlas.

---

## Known Limitations

This is a solo capstone project built for the Full Stack Development program as a learning exercise. It is not affiliated with or endorsed by Hashnode. A few things intentionally out of scope for the MVP:

- No image upload — cover images and avatars are pasted as URLs
- No comments or likes on posts
- No pagination — the feed currently loads all published posts at once
- No follow/unfollow between authors
