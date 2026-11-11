// Writes dist/sitemap.xml from the prerendered pages, skipping any page marked noindex.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const SITE = 'https://sarahmreilly.com'
const root = 'dist'
const urls = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (name === 'index.html') {
      const html = readFileSync(full, 'utf8')
      if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue
      const rel = relative(root, dir).split(sep).join('/')
      if (rel === '404') continue
      urls.push(rel ? `${SITE}/${rel}` : `${SITE}/`)
    }
  }
}
walk(root)
urls.sort((a, b) => (a === `${SITE}/` ? -1 : b === `${SITE}/` ? 1 : a.localeCompare(b)))
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`
writeFileSync(join(root, 'sitemap.xml'), xml)
console.log(`Wrote dist/sitemap.xml with ${urls.length} pages`)
