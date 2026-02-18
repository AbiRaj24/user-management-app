# User Management App

A React + TypeScript CRUD application for managing users.

**Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app)
**Repo**:      [https://github.com/yourname/user-management-app](https://github.com/yourname/user-management-app)

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS (dark, glassmorphism design)
- React Hook Form + Zod (validation)
- TanStack Query (data fetching & caching)
- Axios (HTTP)
- JSON Server (mock API)

## Setup Instructions

### 1. Clone & install
\`\`\`bash
git clone https://github.com/yourname/user-management-app.git
cd user-management-app
npm install
\`\`\`

### 2. Start dev servers (in two terminals)
\`\`\`bash
# Terminal 1 – JSON Server (mock API)
npm run dev:api

# Terminal 2 – React app
npm run dev
\`\`\`

Or use the combined command:
\`\`\`bash
npm run dev:all
\`\`\`

Open **http://localhost:5173**

---

## ⭐ How to Add New Fields

This app uses a **configuration-driven architecture**. To add a new field:

### Step 1 — Add it to `src/config/formFields.ts`
\`\`\`ts
{
  name:        'dateOfBirth',
  label:       'Date of Birth',
  type:        'date',
  placeholder: '',
  required:    false,
  colSpan:     1,
}
\`\`\`

### Step 2 — Add it to the Zod schema in `src/utils/validation.ts`
\`\`\`ts
dateOfBirth: z.string().optional(),
\`\`\`

That's it! The form, table columns, and type inference all update automatically.

---

## Assumptions & Design Decisions

- **JSON Server** is used as a mock REST API (easily swappable for a real backend via `src/api/userApi.ts`).
- **Schema-driven forms**: The `FORM_FIELDS` config drives both the form UI and table columns, making the app trivially extensible.
- **Single source of truth**: Zod schema serves as both runtime validation and TypeScript type inference.
- **TanStack Query** handles caching, loading states, and background refetching automatically.
- Dark theme was chosen for a modern, professional look.
\`\`\`

---

## STEP 17 — Run the Application
```bash
# Start both servers
npm run dev:all

# App: http://localhost:5173
# API: http://localhost:3001/users
```

---

## STEP 18 — Git Setup & First Commit
```bash
git init
git add .
git commit -m "feat: initial CRUD user management app

- Schema-driven form with React Hook Form + Zod
- Full CRUD via JSON Server mock API
- TanStack Query for data fetching
- Tailwind CSS dark glassmorphism design
- TypeScript throughout"

git remote add origin https://github.com/YOUR_USERNAME/user-management-app.git
git push -u origin main
```

---

## STEP 19 — Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Production deploy
vercel --prod
```

> **Important for Vercel**: For the live demo, you can use `https://my-json-server.typicode.com`
> or deploy JSON Server separately to Railway/Render.
> Update `VITE_API_BASE_URL` in Vercel's environment variables settings.

---

## 📋 Summary — How Everything Connects

| File                        | Purpose                                             |
|-----------------------------|-----------------------------------------------------|
| `config/formFields.ts`      | ⭐ Single place to add/remove fields                |
| `utils/validation.ts`       | Zod schema for validation + TypeScript types        |
| `types/user.ts`             | TypeScript interfaces (inferred from Zod)           |
| `api/userApi.ts`            | All API calls (swap backend here)                   |
| `hooks/useUsers.ts`         | Data fetching, mutations, toast notifications       |
| `components/UserForm.tsx`   | Config-driven form renderer                         |
| `components/UserTable.tsx`  | Config-driven table renderer                        |
| `components/ui/*`           | Reusable, typed UI primitives                       |
| `App.tsx`                   | State orchestration + modal management              |