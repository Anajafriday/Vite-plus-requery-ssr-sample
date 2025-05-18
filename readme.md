# ⚡ SSR React App with Vite, React Query, React Router & Helmet Async

This project is a server-side rendered (SSR) React application built with:

- ⚡ [Vite](https://vitejs.dev/) — blazing-fast dev & build tool
- ⚛️ [React](https://reactjs.org/) — UI library
- 🌐 [React Router v6](https://reactrouter.com/) — routing
- 🔁 [React Query](https://tanstack.com/query) — data fetching & caching
- 🧠 [React Helmet Async](https://github.com/staylor/react-helmet-async) — SSR-friendly `<head>` management

- [Tailwindcss](https://tailwindcss.com) — Basic Styling

---

## 📁 Folder Structure

```bash
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images & static media
│   ├── features/               # App features/components
│   ├── Layouts/                # Reusable layout components
│   ├── lib/                    # Shared utilities (e.g. API clients)
│   ├── pages/                  # Route components
│   ├── routes/                 # React Router route configs
│   ├── App.jsx                 # Root component
│   ├── entry-client.jsx        # Client-side hydration entry point
│   ├── entry-server.jsx        # Server-side rendering entry point
│   └── index.css               # Global styles
├── index.html                  # HTML shell for Vite
├── server.js                   # Express/Vite SSR server
├── vite.config.js              # Vite configuration
```
