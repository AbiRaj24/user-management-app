# User Management App

This project is a simple React-based CRUD application built to manage user data through a REST API. The application allows users to create, view, update, and delete user records with a clean UI and structured architecture designed for future extensibility.

The main objective was to build a maintainable and scalable structure where adding new form fields or extending functionality can be done with minimal code changes.

---

##  Live Demo

Name:
Abinaya G

Frontend:
https://user-management-app-1-03tc.onrender.com/

Git Repo:
https://github.com/AbiRaj24/user-management-app

---

## 🛠 Tech Stack

- React + TypeScript
- Vite
- Axios
- React Query
- React Hook Form
- Zod (validation)
- Tailwind CSS
- JSON Server (mock backend API)
- Render (deployment)

---

## ✨ Features

- Create new users
- View list of users
- Update user details
- Delete users
- Form validation with error handling
- Async API integration
- Loading and error states
- Clean and responsive UI
- Extensible architecture

---

## 📂 Project Structure

The project follows a modular structure to separate responsibilities:

src/
components/
hooks/
services/
types/
utils/


- API logic is separated from UI components.
- Custom hooks manage data fetching and mutations.
- Types ensure strong typing and maintainability.

---

## 🧩 Extensibility Approach

The application is designed so that new fields can be added easily without major rewrites.

To add a new field:

1. Update the user type definition.
2. Extend the validation schema.
3. Add the field configuration to the form.

Because the form uses reusable components and structured configuration, future changes remain simple and maintainable.

---

## ⚙️ Setup Instructions

1.Clone the repository
2.Install dependencies
3.Run the application locally:npm run dev:all


---

## 🌍 Environment Variables

Create a `.env` file:
VITE_API_BASE_URL=http://localhost:3001

For production deployment, configure:
VITE_API_BASE_URL=https://user-management-app-vx71.onrender.com 



---

## 📦 Deployment

The project is deployed using Render:

- Static Site → React frontend
- Web Service → JSON Server API

---

## 🤔 Design Decisions

- React Query simplifies async state management and caching.
- Axios instance centralizes API configuration.
- Zod provides schema-based validation for better type safety.
- API interceptors allow future authentication integration.

---

## 👩‍💻 Author

Abinaya G











