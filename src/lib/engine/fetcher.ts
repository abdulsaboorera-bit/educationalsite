import * as crypto from "crypto";
import * as cheerio from "cheerio";

const USER_AGENT = "PakEduBot/1.0 (+https://pakedu.pk) Education Data Crawler";
const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 2;

function computeHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex").substring(0, 32);
}

export async function fetchPage(url: string): Promise<{ html: string; status: number; hash: string }> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
        signal: controller.signal,
        redirect: "follow",
      });

      clearTimeout(timeout);

      if (!response.ok) {
        return { html: "", status: response.status, hash: "" };
      }

      const html = await response.text();
      const hash = computeHash(html);

      return { html, status: response.status, hash };
    } catch {
      if (attempt === MAX_RETRIES) {
        return { html: "", status: 0, hash: "" };
      }
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  return { html: "", status: 0, hash: "" };
}

export async function fetchWithPlaywright(url: string): Promise<{ html: string; status: number; hash: string }> {
  try {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      const response = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: REQUEST_TIMEOUT,
      });

      await page.waitForTimeout(2000);
      const html = await page.content();
      const status = response?.status() || 200;
      const hash = computeHash(html);

      return { html, status, hash };
    } finally {
      await browser.close();
    }
  } catch {
    return { html: "", status: 0, hash: "" };
  }
}

export async function smartFetch(url: string): Promise<{ html: string; status: number; hash: string; method: string }> {
  const httpResult = await fetchPage(url);

  if (httpResult.html && httpResult.status === 200) {
    const $ = cheerio.load(httpResult.html);
    const bodyText = $("body").text().trim();

    if (bodyText.length > 200) {
      return { ...httpResult, method: "http" };
    }
  }

  try {
    const playwrightResult = await fetchWithPlaywright(url);
    if (playwrightResult.html && playwrightResult.status === 200) {
      return { ...playwrightResult, method: "playwright" };
    }
  } catch {
    // Playwright not available, fall through
  }

  return { ...httpResult, method: "http-fallback" };
}

export function extractLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const links: string[] = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    try {
      const absoluteUrl = new URL(href, baseUrl).href;
      if (absoluteUrl.startsWith("http")) {
        links.push(absoluteUrl);
      }
    } catch {
      // invalid URL
    }
  });

  return [...new Set(links)];
}

export function extractPDFLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const pdfs: string[] = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    const lower = href.toLowerCase();
    if (lower.endsWith(".pdf") || lower.includes(".pdf?")) {
      try {
        const absoluteUrl = new URL(href, baseUrl).href;
        pdfs.push(absoluteUrl);
      } catch {
        // invalid URL
      }
    }
  });

  return [...new Set(pdfs)];
}

export function extractPageMetadata(html: string): { title: string; description: string; keywords: string } {
  const $ = cheerio.load(html);

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").text().trim() ||
    $("h1").first().text().trim() ||
    "";

  const description =
    $("meta[property='og:description']").attr("content") ||
    $("meta[name='description']").attr("content") ||
    "";

  const keywords = $("meta[name='keywords']").attr("content") || "";

  return { title, description, keywords };
}

export function extractVisibleText(html: string): string {
  const $ = cheerio.load(html);

  $("script, style, noscript, iframe").remove();

  return $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 10000);
}

export function checkContentChanged(newHash: string, previousHash?: string): boolean {
  if (!previousHash) return true;
  return newHash !== previousHash;
}

export function calculateChangeScore(oldText: string, newText: string): number {
  if (!oldText || !newText) return 100;

  const oldWords = new Set(oldText.toLowerCase().split(/\s+/));
  const newWords = new Set(newText.toLowerCase().split(/\s+/));

  const intersection = new Set([...oldWords].filter((w) => newWords.has(w)));
  const union = new Set([...oldWords, ...newWords]);

  if (union.size === 0) return 0;

  const jaccardSimilarity = intersection.size / union.size;
  return Math.round((1 - jaccardSimilarity) * 100);
}
