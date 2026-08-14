#!/usr/bin/env node
// Renders the site's print view (index.blade.php with ?print=1) to a single
// continuous-page PDF, matching the live design instead of a hand-maintained
// static file. Requires `php artisan serve` (or an equivalent server) running
// locally, since it screenshots real server-rendered HTML.
//
// Usage: node scripts/generate-cv-pdf.cjs <url> <output-path>
// Example: node scripts/generate-cv-pdf.cjs http://127.0.0.1:8000 public/cv/CV_AlessandroBonatti.pdf

const { chromium } = require("playwright");
const path = require("path");

const [, , baseUrl, outputPath] = process.argv;

if (!baseUrl || !outputPath) {
    console.error("Usage: node scripts/generate-cv-pdf.cjs <url> <output-path>");
    process.exit(1);
}

const VIEWPORT = { width: 1600, height: 1200 };

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: VIEWPORT });

    await page.goto(`${baseUrl}/?print=1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    const height = await page.evaluate(() => document.documentElement.scrollHeight);

    await page.pdf({
        path: path.resolve(outputPath),
        width: `${VIEWPORT.width}px`,
        height: `${height}px`,
        printBackground: true,
        pageRanges: "1",
    });

    await browser.close();

    console.log(`Saved CV PDF -> ${outputPath}`);
})();
