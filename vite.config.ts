import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite-react-ssg prerenders every route to real HTML at build time,
// so each page ships with its own title, description and link preview.
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
  },
})
