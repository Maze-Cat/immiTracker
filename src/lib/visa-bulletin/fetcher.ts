import { parseVisaBulletin } from './parser';
import { storeBulletin } from './store';

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

/**
 * Extract the first matching bulletin URL from the index page HTML.
 * Returns the full absolute URL, or null if nothing matched.
 */
function extractLatestBulletinUrl(indexHtml: string): string | null {
  // Try each pattern in order of specificity
  for (const pattern of BULLETIN_HREF_PATTERNS) {
    const match = indexHtml.match(pattern);
    if (match) {
      const href = match[0];
      return href.startsWith('http') ? href : `${DOS_BASE_URL}${href}`;
    }
  }

  // Broader fallback: any href inside a visa-bulletin year directory
  const fallback = indexHtml.match(
    /href="(\/content\/travel\/en\/legal\/visa-law0\/visa-bulletin\/\d{4}\/[^"]+\.html)"/i,
  );
  if (fallback) return `${DOS_BASE_URL}${fallback[1]}`;

  return null;
}

/**
 * Fetch the latest DOS Visa Bulletin, parse it, store it, and return the
 * bulletin month string.
 *
 * Throws on network errors or if the bulletin URL cannot be located.
 */
export async function fetchAndStoreBulletin(): Promise<{ bulletinMonth: string }> {
  // Step 1: Fetch the index page
  const indexResponse = await fetch(DOS_INDEX_URL, { next: { revalidate: 0 } });
  if (!indexResponse.ok) {
    throw new Error(
      `Failed to fetch Visa Bulletin index (HTTP ${indexResponse.status}): ${DOS_INDEX_URL}`,
    );
  }
  const indexHtml = await indexResponse.text();

  // Step 2: Find the latest bulletin URL
  const bulletinUrl = extractLatestBulletinUrl(indexHtml);
  if (!bulletinUrl) {
    throw new Error(
      'Could not locate the latest Visa Bulletin URL in the DOS index page. ' +
      'The site structure may have changed.',
    );
  }

  // Step 3: Fetch the bulletin page
  const bulletinResponse = await fetch(bulletinUrl, { next: { revalidate: 0 } });
  if (!bulletinResponse.ok) {
    throw new Error(
      `Failed to fetch bulletin page (HTTP ${bulletinResponse.status}): ${bulletinUrl}`,
    );
  }
  const bulletinHtml = await bulletinResponse.text();

  // Step 4: Parse and store
  const bulletin = parseVisaBulletin(bulletinHtml);
  await storeBulletin(bulletin);

  return { bulletinMonth: bulletin.bulletinMonth };
}
