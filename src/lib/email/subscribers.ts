import { Redis } from '@upstash/redis';

// ---------------------------------------------------------------------------
// Storage backend: Upstash Redis in production, in-memory Set in dev
// ---------------------------------------------------------------------------

const SUBSCRIBERS_KEY = 'subscribers:emails';

const hasRedis = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = hasRedis
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// ---------------------------------------------------------------------------
// In-memory fallback (dev mode)
// ---------------------------------------------------------------------------

const globalStore = globalThis as unknown as {
  __subscriberStore?: Set<string>;
};
if (!globalStore.__subscriberStore) {
  globalStore.__subscriberStore = new Set<string>();
}
const memStore = globalStore.__subscriberStore;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function addSubscriber(email: string): Promise<void> {
  const normalised = email.toLowerCase().trim();
  if (!isValidEmail(normalised)) {
    throw new Error(`Invalid email address: ${email}`);
  }

  if (redis) {
    await redis.sadd(SUBSCRIBERS_KEY, normalised);
    return;
  }

  memStore.add(normalised);
}

export async function removeSubscriber(email: string): Promise<void> {
  const normalised = email.toLowerCase().trim();

  if (redis) {
    await redis.srem(SUBSCRIBERS_KEY, normalised);
    return;
  }

  memStore.delete(normalised);
}

export async function getAllSubscribers(): Promise<string[]> {
  if (redis) {
    return await redis.smembers<string[]>(SUBSCRIBERS_KEY);
  }

  return Array.from(memStore);
}

export async function isSubscribed(email: string): Promise<boolean> {
  const normalised = email.toLowerCase().trim();

  if (redis) {
    return (await redis.sismember(SUBSCRIBERS_KEY, normalised)) === 1;
  }

  return memStore.has(normalised);
}

export async function getSubscriberCount(): Promise<number> {
  if (redis) {
    return await redis.scard(SUBSCRIBERS_KEY);
  }

  return memStore.size;
}
