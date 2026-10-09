# Hashnode Clone — Client

> A developer-first blogging platform where developers write, format, and share technical content. This repository contains the **React frontend**. The Express/MongoDB API lives in the sibling `/server` folder.

**Live demo:**[ https://your-app.vercel.app](https://hashnode-client.vercel.app/)
**Backend repo/folder:** [`/server`](https://github.com/Shikha246/Hashnode_Server.git)

---

## Table of Contents

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
