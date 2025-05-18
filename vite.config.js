import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-helmet-async'], // Force pre-bundling as ESM
  },
  ssr: {
    noExternal: ["@tanstack/react-query", "react-helmet-async"]
  }
})
