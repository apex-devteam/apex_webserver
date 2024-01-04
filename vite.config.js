import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//ORIGINAL TARGET: "http://localhost:3000/"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://146.190.41.182:3000',
        changeOrigin: true,
        secure: false,
        onProxyReq(proxyReq) {
          // Log a message when the proxy request is made
          console.log('Proxy request made:', proxyReq.method, proxyReq.path);
        },
        onProxyRes(proxyRes) {
          // Log a message when the proxy response is received
          console.log('Proxy response received:', proxyRes.statusCode);
        },
      }
    }
  }
})
