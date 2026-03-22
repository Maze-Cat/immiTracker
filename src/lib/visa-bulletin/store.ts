import type { VisaBulletin } from '@/types/visa-bulletin';

// Storage abstraction — uses Vercel KV in production, in-memory cache in development
let inMemoryCache: VisaBulletin | null = null;

export async function storeBulletin(bulletin: VisaBulletin): Promise<void> {
  // TODO: Replace with Vercel KV in production
  // await kv.set('bulletin:latest', bulletin);
  // await kv.set(`bulletin:${bulletin.bulletinYear}-${String(new Date(bulletin.fetchedAt).getMonth() + 1).padStart(2, '0')}`, bulletin);
  inMemoryCache = bulletin;
}

export async function getLatestBulletin(): Promise<VisaBulletin | null> {
  // TODO: Replace with Vercel KV in production
  // return await kv.get<VisaBulletin>('bulletin:latest');
  return inMemoryCache;
}

export async function getHistoricalData(
  category: string,
  chargeability: string,
  months: number
): Promise<{ category: string; chargeability: string; history: Array<{ bulletinMonth: string; finalActionDate: string; datesForFilingDate: string }> }> {
  // TODO: Fetch from Vercel KV historical keys
  return {
    category,
    chargeability,
    history: [],
  };
}
