/**
 * Auto-fetch bulletin data on dev server startup.
 *
 * In development, the in-memory store is empty on every restart.
 * This module auto-fetches the latest bulletin so the homepage and
 * tracker page have data immediately without a manual cron trigger.
 *
 * This is a no-op in production (Vercel KV + cron handles it).
 */

import { getLatestBulletin } from './store';
import { fetchAndStoreBulletin } from './fetcher';

const globalAutoFetch = globalThis as unknown as {
  __bulletinAutoFetched?: boolean;
};

export async function ensureBulletinData(): Promise<void> {
  // Only auto-fetch in development
  if (process.env.NODE_ENV === 'production') return;

  // Only fetch once per process lifetime
  if (globalAutoFetch.__bulletinAutoFetched) return;
  globalAutoFetch.__bulletinAutoFetched = true;

  // Skip if data already exists
  const existing = await getLatestBulletin();
  if (existing) return;

  try {
    console.log('[auto-fetch] No bulletin data found — fetching from DOS...');
    const result = await fetchAndStoreBulletin();
    console.log(`[auto-fetch] Successfully loaded ${result.bulletinMonth} bulletin`);
  } catch (error) {
    console.warn('[auto-fetch] Failed to auto-fetch bulletin:', error);
    // Non-fatal — the site still works, just without live data
  }
}
