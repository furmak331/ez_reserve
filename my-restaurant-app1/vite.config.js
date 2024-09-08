import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-scroll-parallax': 'react-scroll-parallax/dist/react-scroll-parallax.min.js',
    },
  },
})