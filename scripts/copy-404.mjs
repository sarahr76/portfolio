// Cloudflare Pages serves /404.html for unknown URLs. The prerender writes it to /404/index.html.
import { copyFileSync, existsSync } from 'node:fs'

if (existsSync('dist/404/index.html')) {
  copyFileSync('dist/404/index.html', 'dist/404.html')
  console.log('Copied dist/404/index.html to dist/404.html')
} else {
  console.warn('No prerendered 404 found; skipping 404.html')
}
