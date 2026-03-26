import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import {
  addSubscriber,
  removeSubscriber,
  isSubscribed,
  isValidEmail,
  getSubscriberCount,
} from '@/lib/email/subscribers';

// ---------------------------------------------------------------------------
// Rate limiting (IP-based, stored in Redis or in-memory)
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP

const hasRedis = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
const redis = hasRedis
  ? new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })
  : null;

// In-memory rate limit fallback for dev
const memRateLimit = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate:subscribe:${ip}`;

  if (redis) {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.pexpire(key, RATE_LIMIT_WINDOW_MS);
    }
    return count <= RATE_LIMIT_MAX;
  }

  // In-memory fallback
  const now = Date.now();
  const entry = memRateLimit.get(key);
  if (!entry || now > entry.resetAt) {
    memRateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX;
}

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

// ---------------------------------------------------------------------------
// GET /api/subscribe?email=xxx — check subscription status
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const email = request.nextUrl.searchParams.get('email');

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'A valid email query parameter is required.' },
      { status: 400 },
    );
  }

  try {
    const subscribed = await isSubscribed(email);
    return NextResponse.json({ subscribed });
  } catch (error) {
    console.error('[api/subscribe] GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/subscribe — add a subscriber
// ---------------------------------------------------------------------------

const MAX_SUBSCRIBERS = 10_000; // cap to prevent abuse

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const email = body.email;
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'A valid email address is required.' },
      { status: 400 },
    );
  }

  try {
    // Check if already subscribed
    if (await isSubscribed(email)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
    }

    // Check subscriber cap
    const count = await getSubscriberCount();
    if (count >= MAX_SUBSCRIBERS) {
      return NextResponse.json(
        { error: 'Subscription list is full. Please try again later.' },
        { status: 503 },
      );
    }

    await addSubscriber(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[api/subscribe] POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/subscribe — remove a subscriber
// ---------------------------------------------------------------------------

export async function DELETE(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const email = body.email;
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'A valid email address is required.' },
      { status: 400 },
    );
  }

  try {
    await removeSubscriber(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[api/subscribe] DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
