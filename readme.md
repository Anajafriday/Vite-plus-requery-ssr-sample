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

## 🚀 Features

- ✅ Server-side rendering with streaming (renderToPipeableStream)

- ✅ Code-splitting using @loadable/component

- ✅ Dynamic data preloading with React Query hydration

- ✅ SEO-friendly metadata via Helmet

- ✅ Full routing support via React Router

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server (with SSR)

```bash
npm run dev
```

This uses Vite's SSR middleware with hot reload. 3. Build for production

```bash
npm run build
```

This generates both client and SSR bundles. 4. Preview production build

npm run preview

Runs the Express SSR server with compiled output.

## 💡 Helmet Setup

- App is wrapped with <HelmetProvider> on both server and client

- During SSR, head tags (title/meta/link) are extracted from helmetContext and injected into the HTML template

- Use <Helmet> anywhere in your components:

```bash
<Helmet>
  <title>My Page</title>
  <link rel="preload" as="image" href="/menu/image.jpg" />
</Helmet>
```

## 🧪 React Query Hydration

- Server prefetches queries using queryClient.prefetchQuery(...)

- dehydrate serializes data into the HTML

- Client rehydrates with <Hydrate state={...}> and continues fetching from cache

## 🛣️ Routing

Routes are defined using React Router v6. Dynamic route-based code splitting is supported via @loadable/component.

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start Vite dev server with SSR |
| `npm run build`   | Build client + server bundles  |
| `npm run preview` | Run production SSR server      |
