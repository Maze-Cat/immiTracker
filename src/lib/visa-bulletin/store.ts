import { Redis } from '@upstash/redis';
import type { VisaBulletin, BulletinHistory, BulletinHistoryEntry, ChargeabilityRow } from '@/types/visa-bulletin';

// ---------------------------------------------------------------------------
// Storage backend: Upstash Redis in production, in-memory Map in dev
// ---------------------------------------------------------------------------

const LATEST_KEY = 'bulletin:latest';
const INDEX_KEY = 'bulletin:index'; // sorted set of all bulletin keys

const hasRedis = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = hasRedis
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

if (process.env.NODE_ENV === 'production' && !redis) {
  console.warn(
    '[store] WARNING: Running in production without Upstash Redis configured. ' +
    'Bulletin data will not persist across serverless invocations. ' +
    'Set KV_REST_API_URL and KV_REST_API_TOKEN environment variables.',
  );
}

// ---------------------------------------------------------------------------
// In-memory fallback (dev mode)
// ---------------------------------------------------------------------------

const globalStore = globalThis as unknown as {
  __bulletinStore?: Map<string, VisaBulletin>;
};
if (!globalStore.__bulletinStore) {
  globalStore.__bulletinStore = new Map<string, VisaBulletin>();
}
const memStore = globalStore.__bulletinStore;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function bulletinKey(bulletin: VisaBulletin): string {
  const date = new Date(`1 ${bulletin.bulletinMonth}`);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `bulletin:${year}-${month}`;
  }
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
  const key = bulletinKey(bulletin);

  if (redis) {
    const pipe = redis.pipeline();
    pipe.set(key, JSON.stringify(bulletin));
    pipe.zadd(INDEX_KEY, { score: 0, member: key }); // lexicographic sorted set

    // Only update latest if this is newer
    const currentLatest = await redis.get<VisaBulletin>(LATEST_KEY);
    if (!currentLatest || key >= bulletinKey(currentLatest)) {
      pipe.set(LATEST_KEY, JSON.stringify(bulletin));
    }
    await pipe.exec();
    return;
  }

  // In-memory fallback
  memStore.set(key, bulletin);
  const currentLatest = memStore.get(LATEST_KEY);
  if (!currentLatest || key >= bulletinKey(currentLatest)) {
    memStore.set(LATEST_KEY, bulletin);
  }
}

export async function getLatestBulletin(): Promise<VisaBulletin | null> {
  if (redis) {
    return await redis.get<VisaBulletin>(LATEST_KEY);
  }
  return memStore.get(LATEST_KEY) ?? null;
}

export async function getPreviousBulletin(): Promise<VisaBulletin | null> {
  if (redis) {
    // Get all keys from sorted set in reverse lexicographic order
    const keys = await redis.zrange<string[]>(INDEX_KEY, '+', '-', { byLex: true, rev: true });
    if (keys.length < 2) return null;
    return await redis.get<VisaBulletin>(keys[1]);
  }

  // In-memory fallback
  const datedKeys: string[] = [];
  for (const key of memStore.keys()) {
    if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
      datedKeys.push(key);
    }
  }
  datedKeys.sort((a, b) => b.localeCompare(a));
  if (datedKeys.length < 2) return null;
  return memStore.get(datedKeys[1]) ?? null;
}

export async function getAllBulletins(): Promise<VisaBulletin[]> {
  if (redis) {
    const keys = await redis.zrange<string[]>(INDEX_KEY, '-', '+', { byLex: true });
    if (keys.length === 0) return [];
    const pipe = redis.pipeline();
    for (const key of keys) pipe.get(key);
    const results = await pipe.exec<(VisaBulletin | null)[]>();
    return results.filter((b): b is VisaBulletin => b !== null);
  }

  // In-memory fallback
  const datedKeys: string[] = [];
  for (const key of memStore.keys()) {
    if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
      datedKeys.push(key);
    }
  }
  datedKeys.sort((a, b) => a.localeCompare(b));
  const bulletins: VisaBulletin[] = [];
  for (const key of datedKeys) {
    const b = memStore.get(key);
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

  let bulletins: VisaBulletin[];

  if (redis) {
    // Get most recent N keys (reverse lexicographic)
    const keys = await redis.zrange<string[]>(INDEX_KEY, '+', '-', { byLex: true, rev: true, count: months, offset: 0 });
    if (keys.length === 0) return { category, chargeability: chargeabilityKey, entries: [] };
    const pipe = redis.pipeline();
    for (const key of keys) pipe.get(key);
    const results = await pipe.exec<(VisaBulletin | null)[]>();
    bulletins = results.filter((b): b is VisaBulletin => b !== null);
  } else {
    // In-memory fallback
    const historicalKeys: string[] = [];
    for (const key of memStore.keys()) {
      if (key !== LATEST_KEY && key.startsWith('bulletin:')) {
        historicalKeys.push(key);
      }
    }
    historicalKeys.sort((a, b) => b.localeCompare(a));
    const keysToFetch = historicalKeys.slice(0, months);
    bulletins = keysToFetch.map(k => memStore.get(k)).filter((b): b is VisaBulletin => !!b);
  }

  const entries: BulletinHistoryEntry[] = bulletins.map(bulletin => {
    const key = bulletinKey(bulletin);
    const isEB = category.startsWith('EB');
    const section = isEB ? bulletin.employmentBased : bulletin.familyBased;
    const finalRow = section.finalActionDates[category];
    const filingRow = section.datesForFiling[category];

    return {
      bulletinMonth: key.replace('bulletin:', ''),
      finalActionDate: finalRow?.[chargeabilityKey] ?? 'U',
      datesForFilingDate: filingRow?.[chargeabilityKey] ?? 'U',
    };
  });

  entries.sort((a, b) => a.bulletinMonth.localeCompare(b.bulletinMonth));
  return { category, chargeability: chargeabilityKey, entries };
}
