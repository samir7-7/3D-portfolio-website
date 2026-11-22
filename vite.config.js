import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexHtml = path.resolve(distDir, 'index.html')
      if (!fs.existsSync(indexHtml)) return

      const htmlContent = fs.readFileSync(indexHtml, 'utf-8')

      // Routes that should have physical index.html files in dist
      const routes = [
        'blogs',
        'blogs/SNB-00',
        'blogs/snb-00',
        'blog',
        'blog/SNB-00',
        'blog/snb-00'
      ]

      for (const route of routes) {
        const routeDir = path.resolve(distDir, route)
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true })
        }
        fs.writeFileSync(path.resolve(routeDir, 'index.html'), htmlContent)
      }

      // Also ensure 404.html is present in dist for GitHub Pages and other static hosts
      fs.writeFileSync(path.resolve(distDir, '404.html'), htmlContent)
    }
  }
}

export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  assetsInclude: ['**/*.glb'],
})
