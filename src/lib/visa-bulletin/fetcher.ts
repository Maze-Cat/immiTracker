import { parseVisaBulletin } from './parser';
import { getLatestBulletin, storeBulletin } from './store';
import { notifySubscribers } from '@/lib/email/notify';
import type { VisaBulletin } from '@/types/visa-bulletin';

const DOS_INDEX_URL =
  'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html';

const DOS_BASE_URL = 'https://travel.state.gov';

/**
 * Patterns that identify a bulletin detail-page URL on the DOS site.
 * The DOS site uses URLs like:
 *   /content/travel/en/legal/visa-law0/visa-bulletin/2026/visa-bulletin-for-march-2026.html
 */
const BULLETIN_HREF_PATTERNS = [
  /\/content\/travel\/en\/legal\/visa-law0\/visa-bulletin\/\d{4}\/visa-bulletin-for[^"'\s]+/i,
  /\/content\/travel\/en\/legal\/visa-law0\/visa-bulletin\/\d{4}\/visa-bulletin-[^"'\s]+/i,
];

const MONTH_ORDER: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};


/**
 * Extract ALL bulletin URLs from the index page, sorted by date descending.
 * Deduplicates by year+month so each month appears only once (prefers .html URLs).
 */
function extractAllBulletinUrls(indexHtml: string): Array<{ href: string; year: number; month: number }> {
  const byMonthKey = new Map<string, { href: string; year: number; month: number }>();

  for (const pattern of BULLETIN_HREF_PATTERNS) {
    const globalPattern = new RegExp(pattern.source, 'gi');
    let match;
    while ((match = globalPattern.exec(indexHtml)) !== null) {
      const href = match[0];
      const parts = href.match(/visa-bulletin-for-(\w+)-(\d{4})/i);
      if (parts) {
        const monthNum = MONTH_ORDER[parts[1].toLowerCase()] ?? 0;
        const year = parseInt(parts[2], 10);
        const fullHref = href.startsWith('http') ? href : `${DOS_BASE_URL}${href}`;
        const key = `${year}-${monthNum}`;
        if (monthNum > 0) {
          const existing = byMonthKey.get(key);
          // Prefer URLs ending in .html
          if (!existing || (fullHref.endsWith('.html') && !existing.href.endsWith('.html'))) {
            byMonthKey.set(key, { href: fullHref, year, month: monthNum });
          }
        }
      }
    }
  }

  const allMatches = Array.from(byMonthKey.values());
  // Sort by year desc, then month desc
  allMatches.sort((a, b) => b.year - a.year || b.month - a.month);
  return allMatches;
}

/**
 * Fetch a single bulletin page by URL, parse it, and store it.
 */
async function fetchAndStoreSingleBulletin(url: string): Promise<VisaBulletin> {
  console.log(`[fetcher] Fetching bulletin: ${url}`);
  const response = await fetch(url, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch bulletin page (HTTP ${response.status}): ${url}`);
  }
  const html = await response.text();
  console.log(`[fetcher] Received HTML (${html.length} chars) from ${url}`);
  const bulletin = parseVisaBulletin(html);
  await storeBulletin(bulletin);
  return bulletin;
}

/**
 * Fetch the latest DOS Visa Bulletin, parse it, store it, and return the
 * bulletin month string along with whether the bulletin changed.
 *
 * Throws on network errors or if the bulletin URL cannot be located.
 */
export async function fetchAndStoreBulletin(): Promise<{ bulletinMonth: string; changed: boolean }> {
  // Get the currently stored latest bulletin for change detection + email diff
  let previousBulletin: Awaited<ReturnType<typeof getLatestBulletin>> = null;
  try {
    previousBulletin = await getLatestBulletin();
  } catch (err) {
    console.warn('[fetcher] Could not read current latest bulletin for change detection:', err);
  }
  const previousLatestMonth = previousBulletin?.bulletinMonth ?? null;

  const indexHtml = await fetchIndexPage();
  const urls = extractAllBulletinUrls(indexHtml);

  if (urls.length === 0) {
    throw new Error(
      'Could not locate any Visa Bulletin URL in the DOS index page. ' +
      'The site structure may have changed.',
    );
  }

  // Fetch up to 12 months of bulletins for historical tracking
  const maxMonths = Math.min(urls.length, 12);
  let latestBulletin: VisaBulletin | null = null;

  for (let i = 0; i < maxMonths; i++) {
    try {
      const bulletin = await fetchAndStoreSingleBulletin(urls[i].href);
      if (i === 0) latestBulletin = bulletin;
      console.log(`[fetcher] Stored bulletin ${i + 1}/${maxMonths}: ${bulletin.bulletinMonth}`);
    } catch (err) {
      console.warn(`[fetcher] Failed to fetch bulletin ${i + 1} (${urls[i].href}):`, err instanceof Error ? err.message : err);
    }
  }

  if (!latestBulletin) {
    throw new Error('Failed to fetch any bulletin');
  }

  // Detect whether this is a new bulletin month
  const changed = previousLatestMonth !== null && latestBulletin.bulletinMonth !== previousLatestMonth;

  if (changed) {
    console.log(
      `[fetcher] New bulletin detected: ${previousLatestMonth} -> ${latestBulletin.bulletinMonth}. Notifying subscribers.`,
    );
    // Fire-and-forget: don't let notification failures break the cron
    notifySubscribers(latestBulletin, previousBulletin)
      .then((r) => {
        console.log(`[fetcher] Notification result: ${r.sent} sent, ${r.failed} failed`);
      })
      .catch((err) => {
        console.error('[fetcher] Failed to notify subscribers:', err);
      });
  } else {
    console.log(`[fetcher] No change in bulletin month (${latestBulletin.bulletinMonth}).`);
  }

  return { bulletinMonth: latestBulletin.bulletinMonth, changed };
}

async function fetchIndexPage(): Promise<string> {
  const response = await fetch(DOS_INDEX_URL, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Visa Bulletin index (HTTP ${response.status}): ${DOS_INDEX_URL}`,
    );
  }
  return response.text();
}
