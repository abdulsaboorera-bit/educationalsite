import type { CrawlSourceConfig, CrawlJob } from "./types";

const FREQUENCY_MS: Record<string, number> = {
  hourly: 60 * 60 * 1000,
  "6h": 6 * 60 * 60 * 1000,
  "12h": 12 * 60 * 60 * 1000,
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
};

export function shouldCrawl(source: CrawlSourceConfig): boolean {
  if (source.status !== "active") return false;
  if (!source.last_checked) return true;

  const interval = FREQUENCY_MS[source.crawl_frequency] || FREQUENCY_MS.daily;
  const elapsed = Date.now() - new Date(source.last_checked).getTime();

  return elapsed >= interval;
}

export function buildCrawlQueue(sources: CrawlSourceConfig[]): CrawlJob[] {
  const dueSources = sources.filter(shouldCrawl);

  return dueSources
    .map((source) => ({
      source_id: source._id?.toString() || "",
      source_name: source.name,
      url: source.official_website,
      crawl_frequency: source.crawl_frequency,
      last_checked: source.last_checked,
      priority: getPriority(source),
    }))
    .sort((a, b) => b.priority - a.priority);
}

function getPriority(source: CrawlSourceConfig): number {
  let priority = 50;

  if (source.category === "board") priority += 30;
  else if (source.category === "university") priority += 20;
  else if (source.category === "government") priority += 15;

  if (source.error_count > 5) priority -= 20;
  if (source.error_count > 10) priority -= 30;

  if (source.crawl_frequency === "hourly") priority += 10;
  else if (source.crawl_frequency === "6h") priority += 5;

  return Math.max(0, Math.min(100, priority));
}

export function getFrequencyMs(frequency: string): number {
  return FREQUENCY_MS[frequency] || FREQUENCY_MS.daily;
}

export function getNextCrawlTime(source: CrawlSourceConfig): Date {
  const interval = getFrequencyMs(source.crawl_frequency);
  const lastChecked = source.last_checked ? new Date(source.last_checked).getTime() : 0;
  return new Date(lastChecked + interval);
}
