# Portfolio

A UX/UI design portfolio built with React, TypeScript and Vite. Design direction: **Warm Studio**. Colors, type, spacing and components come from the brand guide and live in `src/styles/tokens.css`.

## Stack
- Vite + React 19 + TypeScript
- React Router, prerendered to static HTML at build time (`vite-react-ssg`), so every page has its own title, description and link preview
- Plain CSS with custom properties (design tokens) and CSS Modules
- Self-hosted fonts via Fontsource: Young Serif, DM Sans, JetBrains Mono

## Develop
```bash
npm install
npm run dev        # local dev server
npm run typecheck  # TypeScript check
npm run build      # typecheck + prerendered production build in dist/
npm run preview    # serve the built site locally
```
Requires Node 22 (see `.nvmrc`).

## Deploy (Cloudflare Pages, free)
1. In Cloudflare: Workers & Pages, then Create, then Pages, then Connect to Git, and pick this repo.
2. Build settings:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
3. Save and deploy. Every push to `main` redeploys automatically; other branches get preview URLs.
4. Custom domain: Pages project, then Custom domains. See the domain notes in the build plan.

## Structure
```
public/            favicon, social images, resume.pdf
src/styles/        tokens.css (design tokens), base.css
src/components/    layout/, ui/, project/
src/pages/         Home, CaseStudy, Process, About, NotFound
src/content/       case study content
src/routes.tsx     route table (prerendered)
```
