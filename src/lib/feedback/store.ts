import { Redis } from '@upstash/redis';

// ---------------------------------------------------------------------------
// Storage backend: Upstash Redis in production, in-memory array in dev
// ---------------------------------------------------------------------------

const FEEDBACK_KEY = 'feedback:entries';
const FEEDBACK_MAX = 10_000; // cap entries to prevent unbounded growth

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

export interface FeedbackEntry {
  id: string;
  rating: number;
  message: string;
  locale: string;
  createdAt: string;
}

const globalStore = globalThis as unknown as {
  __feedbackStore?: FeedbackEntry[];
};
if (!globalStore.__feedbackStore) {
  globalStore.__feedbackStore = [];
}
const memStore = globalStore.__feedbackStore;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function addFeedback(entry: FeedbackEntry): Promise<void> {
  if (redis) {
    await redis.lpush(FEEDBACK_KEY, JSON.stringify(entry));
    // Trim to cap
    await redis.ltrim(FEEDBACK_KEY, 0, FEEDBACK_MAX - 1);
    return;
  }

  memStore.unshift(entry);
  if (memStore.length > FEEDBACK_MAX) {
    memStore.length = FEEDBACK_MAX;
  }
}

export async function getFeedbackCount(): Promise<number> {
  if (redis) {
    return await redis.llen(FEEDBACK_KEY);
  }
  return memStore.length;
}

export async function getRecentFeedback(limit = 20): Promise<FeedbackEntry[]> {
  if (redis) {
    const raw = await redis.lrange<string>(FEEDBACK_KEY, 0, limit - 1);
    return raw.map((item) =>
      typeof item === 'string' ? JSON.parse(item) : item,
    );
  }
  return memStore.slice(0, limit);
}

export async function getAllFeedback(): Promise<FeedbackEntry[]> {
  if (redis) {
    const raw = await redis.lrange<string>(FEEDBACK_KEY, 0, -1);
    return raw.map((item) =>
      typeof item === 'string' ? JSON.parse(item) : item,
    );
  }
  return [...memStore];
}
