import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['mvp-production-3211.up.railway.app', 'mvp-production-fc49.up.railway.app', 'amberix.online'],
  },
})