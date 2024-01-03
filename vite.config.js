import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//ORIGINAL TARGET: "http://localhost:3000/"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://146.190.41.182',
        changeOrigin: true
      }
    }
  }
})
