import type { VisaBulletin, BulletinHistory, BulletinHistoryEntry } from '@/types/visa-bulletin';

// ---------------------------------------------------------------------------
// Storage abstraction
//
// In local development we use a simple in-memory Map so the app works without
// any external services.
//
// TODO: Replace both the Map operations and the key helpers with Vercel KV
// calls when deploying to production, e.g.:
//
//   import { kv } from '@vercel/kv';
//   await kv.set(LATEST_KEY, bulletin);
//   await kv.set(monthKey(bulletin), bulletin);
//   const latest = await kv.get<VisaBulletin>(LATEST_KEY);
//   const entry  = await kv.get<VisaBulletin>(key);
// ---------------------------------------------------------------------------

const LATEST_KEY = 'bulletin:latest';

/** Build the storage key used for a historical (month-scoped) entry. */
function monthKey(bulletin: VisaBulletin): string {
  // bulletinMonth is e.g. "March 2026" — convert to "2026-03"
  const parts = bulletin.bulletinMonth.split(' ');
  const monthNames: Record<string, string> = {
    January: '01', February: '02', March: '03', April: '04',
    May: '05', June: '06', July: '07', August: '08',
    September: '09', October: '10', November: '11', December: '12',
  };
  const mon = monthNames[parts[0]] ?? '01';
  const yr  = parts[1] ?? String(bulletin.bulletinYear);
  return `bulletin:${yr}-${mon}`;
}

/** Parse a month key back to a "YYYY-MM" string for history entries. */
function keyToYYYYMM(key: string): string {
  return key.replace('bulletin:', '');
}

// In-memory store (Map used as a simple key-value cache)
const store = new Map<string, VisaBulletin>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Persist a bulletin as the "latest" entry and under its month key.
 */
export async function storeBulletin(bulletin: VisaBulletin): Promise<void> {
  // TODO (Vercel KV): await kv.set(LATEST_KEY, bulletin);
  store.set(LATEST_KEY, bulletin);

  // TODO (Vercel KV): await kv.set(monthKey(bulletin), bulletin);
  store.set(monthKey(bulletin), bulletin);
}

/**
 * Retrieve the most recently stored bulletin, or null if none is available.
 */
export async function getLatestBulletin(): Promise<VisaBulletin | null> {
  // TODO (Vercel KV): return await kv.get<VisaBulletin>(LATEST_KEY);
  return store.get(LATEST_KEY) ?? null;
}

/**
 * Retrieve historical priority-date data for a given category and country
 * of chargeability over the last `months` bulletins.
 *
 * `category`      — e.g. "EB2", "EB3", "F1"
 * `chargeability` — e.g. "CHINA", "INDIA", "allChargeability"
 * `months`        — how many past months to return (max 36 enforced by caller)
 */
export async function getHistoricalData(
  category: string,
  chargeability: string,
  months: number,
): Promise<BulletinHistory> {
  // Normalise chargeability key
  const chargeabilityKey = normaliseChargeabilityKey(chargeability);

  // Collect all historical keys (every key that is NOT "bulletin:latest")
  // TODO (Vercel KV): use kv.keys('bulletin:????-??') to list historical keys,
  //   then fetch each one individually.
  const historicalKeys: string[] = [];
  for (const key of store.keys()) {
    if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
      historicalKeys.push(key);
    }
  }

  // Sort descending (newest first) and take up to `months` entries
  historicalKeys.sort((a, b) => b.localeCompare(a));
  const keysToFetch = historicalKeys.slice(0, months);

  const entries: BulletinHistoryEntry[] = [];

  for (const key of keysToFetch) {
    // TODO (Vercel KV): const bulletin = await kv.get<VisaBulletin>(key);
    const bulletin = store.get(key);
    if (!bulletin) continue;

    const isEB = category.startsWith('EB');
    const section = isEB ? bulletin.employmentBased : bulletin.familyBased;

    const finalRow = section.finalActionDates[category];
    const filingRow = section.datesForFiling[category];

    entries.push({
      bulletinMonth:      keyToYYYYMM(key),
      finalActionDate:    finalRow  ? (finalRow[chargeabilityKey as keyof typeof finalRow]  ?? 'U') : 'U',
      datesForFilingDate: filingRow ? (filingRow[chargeabilityKey as keyof typeof filingRow] ?? 'U') : 'U',
    });
  }

  // Return in ascending chronological order so charts render correctly
  entries.sort((a, b) => a.bulletinMonth.localeCompare(b.bulletinMonth));

  return { category, chargeability: chargeabilityKey, entries };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Map user-supplied chargeability strings to the camelCase keys used
 * in ChargeabilityRow, e.g. "CHINA" → "china", "ALL" → "allChargeability".
 */
function normaliseChargeabilityKey(raw: string): string {
  const upper = raw.toUpperCase().trim();
  if (upper === 'ALL' || upper === 'ALL_CHARGEABILITY' || upper === 'ALLCHARGEABILITY') {
    return 'allChargeability';
  }
  return upper.charAt(0).toUpperCase() + upper.slice(1).toLowerCase() as
    'china' | 'india' | 'mexico' | 'philippines';
}
