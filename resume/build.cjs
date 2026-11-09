// Regenerates public/resume.pdf from resume/resume.html.
// Needs Playwright (npm i -D playwright, then npx playwright install chromium), or ask Claude to run it.
const { chromium } = require('playwright')
const path = require('node:path')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('file://' + path.resolve(__dirname, 'resume.html'))
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: path.resolve(__dirname, '../public/resume.pdf'), preferCSSPageSize: true, printBackground: true })
  await browser.close()
})()
