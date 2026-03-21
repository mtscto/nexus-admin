# 🚀 Nexus Admin

A modern SaaS dashboard built with a multi-tenant architecture, dynamic branding system, and scalable front-end structure.

## ✨ Overview

Nexus Admin is a production-ready dashboard designed to simulate real-world SaaS applications.

It includes multi-organization support, role-based access control, and dynamic UI branding based on subscription plans.

---

## 🧠 Core Concepts

- Multi-tenant architecture
- Organization switching (real-time UI update)
- Plan-based feature gating
- Dynamic branding system (Free / Pro / Enterprise)
- Persistent user session
- Scalable front-end architecture (feature-based)

---

## 🧩 Features

### 🔐 Authentication (Mocked)
- Async login simulation
- Error handling structure
- Session persistence via localStorage

### 🏢 Multi-Tenant System
- Users can belong to multiple organizations
- Switch organizations instantly
- Each organization has its own:
  - Plan
  - Branding
  - Limits

### 🎨 Dynamic Branding
- Full UI changes based on plan:
  - Free → Gray
  - Pro → Blue / Indigo
  - Enterprise → Emerald
- Applied to:
  - Sidebar indicator
  - Icons
  - Badges
  - Highlights

### 📊 Dashboard Structure
- Modular layout (Sidebar + Header + Content)
- Animated sidebar (collapse / expand)
- Active route indicator with smooth transitions

### 🧭 UX & UI
- Micro-interactions across UI
- Smooth transitions (no layout shift)
- Premium dark SaaS design
- Reusable Empty State system with CTA

---

## 🏗️ Architecture

```txt
src/
│
├── features/
│   ├── auth/                # authentication logic (login, session)
│   ├── dashboard/           # core layout and dashboard structure
│   ├── products/            # product management module
│   ├── team/                # team management module
│   └── plans/               # plan & feature gating logic
│
├── shared/
│   ├── components/          # reusable UI components (UserMenu, EmptyState, etc)
│   ├── context/             # global contexts (Organization, Theme, etc)
│   ├── services/            # API layer (axios setup, future integration)
│   ├── utils/               # helpers and utilities
│   └── styles/              # global styles
│
├── routes/                  # application routing (protected routes)
├── assets/                  # static files (icons, images)
└── main.tsx                 # application entry point
└──App.tsx                   # root component

📐 Architectural Principles

- Feature-based modular structure
- Separation of concerns (UI / state / services)
- Scalable context architecture
- Ready for backend integration
- Consistent UI system with dynamic branding
```

---

## ⚙️ Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Context API
- Axios

---

## 🚧 Roadmap

- [ ] Backend integration (API)
- [ ] Real authentication (JWT)
- [ ] Role-based permissions (RBAC)
- [ ] Plan upgrade flow
- [ ] Billing simulation
- [ ] Data visualization (Recharts)

---

## 🎯 Goal

This project was built to demonstrate real-world SaaS architecture and front-end engineering practices focused on scalability, UX, and maintainability.

---

## 📸 Preview

(coming soon)

---

## 🧑‍💻 Author

Matheus Tavares
[GitHub](https://github.com/mtscto)
