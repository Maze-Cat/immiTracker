import type { VisaBulletin, BulletinHistory, BulletinHistoryEntry, ChargeabilityRow } from '@/types/visa-bulletin';

// ---------------------------------------------------------------------------
// Production / KV guard
// ---------------------------------------------------------------------------

const isProduction = process.env.NODE_ENV === 'production';
const hasKV = !!process.env.KV_REST_API_URL; // Vercel KV env var

if (isProduction && !hasKV) {
  console.warn(
    '[store] WARNING: Running in production without Vercel KV configured. ' +
    'Bulletin data will not persist across serverless invocations. ' +
    'Set KV_REST_API_URL and KV_REST_API_TOKEN environment variables.',
  );
}

// ---------------------------------------------------------------------------
// In-memory store (dev) — keyed by "bulletin:YYYY-MM" + a sentinel latest key
// ---------------------------------------------------------------------------

const LATEST_KEY = 'bulletin:latest';

// Use globalThis to share the Map across module reloads in Next.js dev mode.
// Without this, server components and API routes may get separate Map instances.
const globalStore = globalThis as unknown as {
  __bulletinStore?: Map<string, VisaBulletin>;
};
if (!globalStore.__bulletinStore) {
  globalStore.__bulletinStore = new Map<string, VisaBulletin>();
}
const store = globalStore.__bulletinStore;

function bulletinKey(bulletin: VisaBulletin): string {
  // Derive a sortable key from the bulletin's month string, e.g. "March 2026" → "bulletin:2026-03"
  const date = new Date(`1 ${bulletin.bulletinMonth}`);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `bulletin:${year}-${month}`;
  }
  // Fallback: use fetchedAt
  const fetched = new Date(bulletin.fetchedAt);
  const year = fetched.getFullYear();
  const month = String(fetched.getMonth() + 1).padStart(2, '0');
  return `bulletin:${year}-${month}`;
}

function normaliseChargeabilityKey(chargeability: string): keyof ChargeabilityRow {
  const map: Record<string, keyof ChargeabilityRow> = {
    ALL: 'allChargeability',
    ALLCHARGEABILITY: 'allChargeability',
    CHINA: 'china',
    INDIA: 'india',
    MEXICO: 'mexico',
    PHILIPPINES: 'philippines',
  };
  return map[chargeability.toUpperCase()] ?? 'allChargeability';
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function storeBulletin(bulletin: VisaBulletin): Promise<void> {
  // TODO: Replace with Vercel KV in production
  const key = bulletinKey(bulletin);
  store.set(key, bulletin);

  // Only update the "latest" pointer if this bulletin is newer than what's currently stored
  const currentLatest = store.get(LATEST_KEY);
  if (!currentLatest) {
    store.set(LATEST_KEY, bulletin);
  } else {
    const currentKey = bulletinKey(currentLatest);
    if (key >= currentKey) {
      store.set(LATEST_KEY, bulletin);
    }
  }
}

export async function getLatestBulletin(): Promise<VisaBulletin | null> {
  // TODO: Replace with Vercel KV in production
  // return await kv.get<VisaBulletin>(LATEST_KEY);
  return store.get(LATEST_KEY) ?? null;
}

export async function getPreviousBulletin(): Promise<VisaBulletin | null> {
  // Get all dated bulletin keys (exclude sentinel), sort descending, return second one
  const datedKeys: string[] = [];
  for (const key of store.keys()) {
    if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
      datedKeys.push(key);
    }
  }
  datedKeys.sort((a, b) => b.localeCompare(a));
  if (datedKeys.length < 2) return null;
  return store.get(datedKeys[1]) ?? null;
}

export async function getAllBulletins(): Promise<VisaBulletin[]> {
  // Return all stored bulletins in ascending chronological order
  const datedKeys: string[] = [];
  for (const key of store.keys()) {
    if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
      datedKeys.push(key);
    }
  }
  datedKeys.sort((a, b) => a.localeCompare(b));
  const bulletins: VisaBulletin[] = [];
  for (const key of datedKeys) {
    const b = store.get(key);
    if (b) bulletins.push(b);
  }
  return bulletins;
}

export async function getHistoricalData(
  category: string,
  chargeability: string,
  months: number,
): Promise<BulletinHistory> {
  const chargeabilityKey = normaliseChargeabilityKey(chargeability);

  // Collect all dated bulletin keys (exclude the sentinel "bulletin:latest")
  const historicalKeys: string[] = [];
  for (const key of store.keys()) {
    if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
      historicalKeys.push(key);
    }
  }

  // Sort descending (most recent first) then take the requested slice
  historicalKeys.sort((a, b) => b.localeCompare(a));
  const keysToFetch = historicalKeys.slice(0, months);

  const entries: BulletinHistoryEntry[] = [];

  for (const key of keysToFetch) {
    const bulletin = store.get(key);
    if (!bulletin) continue;

    const isEB = category.startsWith('EB');
    const section = isEB ? bulletin.employmentBased : bulletin.familyBased;
    const finalRow = section.finalActionDates[category];
    const filingRow = section.datesForFiling[category];

    entries.push({
      bulletinMonth: key.replace('bulletin:', ''),
      finalActionDate: finalRow?.[chargeabilityKey] ?? 'U',
      datesForFilingDate: filingRow?.[chargeabilityKey] ?? 'U',
    });
  }

  // Return in ascending chronological order
  entries.sort((a, b) => a.bulletinMonth.localeCompare(b.bulletinMonth));

  return { category, chargeability: chargeabilityKey, entries };
}
