import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/login': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },
      '/user': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },
      '/callback': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },
      '/playlists/all': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },
      '/playlists': { target: 'http://localhost:3000/', changeOrigin: true, secure: false, rewrite: (path) => path.replace(/^\/api/, '') },
      '/playlists/create': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },
      //'/artists': { target: 'http://localhost:3000/', changeOrigin: true, secure: false, rewrite: (path) => path.replace(/^\/api/, '') },
      '/artists': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },
      '//playlists/create': { target: 'http://localhost:3000/', changeOrigin: true, secure: false },


    },
    cors: false,
  }
})