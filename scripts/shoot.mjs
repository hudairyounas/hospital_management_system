/**
 * Screenshot + QA harness using locally installed Chrome (puppeteer-core, no browser download).
 *
 * Usage:
 *   node scripts/shoot.mjs <outDir> <url>[|label] [<url>[|label] ...] [--widths=1440,375] [--full] [--rtl]
 *
 * For each URL x width it saves a PNG and prints:
 *   - document scrollWidth vs viewport width (horizontal overflow check)
 *   - console errors / page errors / failed requests
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const args = process.argv.slice(2);
const outDir = args.shift();
const flags = args.filter((a) => a.startsWith('--'));
const targets = args.filter((a) => !a.startsWith('--'));
const widthsFlag = flags.find((f) => f.startsWith('--widths='));
const widths = widthsFlag ? widthsFlag.split('=')[1].split(',').map(Number) : [1440, 375];
const full = flags.includes('--full');
const rtl = flags.includes('--rtl');
const maxH = Number((flags.find((f) => f.startsWith('--maxh=')) || '--maxh=0').split('=')[1]);

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--lang=en-US'],
});

const report = [];
for (const t of targets) {
  const [url, labelRaw] = t.split('|');
  const label = labelRaw || url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 60);
  for (const w of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()));
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url() + ' ' + (r.failure()?.errorText || '')));
    const h = w < 700 ? 844 : w < 1100 ? 1024 : 900;
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    if (rtl) {
      await page.evaluateOnNewDocument(() => localStorage.setItem('nmc_demo_lang_v1', 'ur'));
    }
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    } catch (e) {
      errors.push('goto: ' + e.message);
    }
    await new Promise((r) => setTimeout(r, 900));
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      height: document.documentElement.scrollHeight,
      title: document.title,
    }));
    const file = path.join(outDir, `${label}_${w}${rtl ? '_ur' : ''}.png`);
    if (full && maxH) {
      await page.setViewport({ width: w, height: Math.min(metrics.height, maxH), deviceScaleFactor: 1 });
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({ path: file });
    } else {
      await page.screenshot({ path: file, fullPage: full });
    }
    report.push({
      label,
      width: w,
      overflow: metrics.scrollWidth > metrics.innerWidth ? `YES (${metrics.scrollWidth}px)` : 'no',
      height: metrics.height,
      title: metrics.title,
      errors: errors.filter((e) => !/favicon|fonts\.g/.test(e)).slice(0, 8),
      file,
    });
    await page.close();
  }
}
await browser.close();
console.log(JSON.stringify(report, null, 2));
