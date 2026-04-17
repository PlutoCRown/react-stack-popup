import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/react-stack-popup/",
  plugins: [react()],
  build: {
    outDir: "dist-demo",
  },
})
