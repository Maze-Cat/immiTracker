import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { addFeedback } from '@/lib/feedback/store';

// ---------------------------------------------------------------------------
// Rate limiting (IP-based) — 3 submissions per 10 minutes per IP
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;

const hasRedis = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
const redis = hasRedis
  ? new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })
  : null;

// In-memory rate limit fallback for dev
const memRateLimit = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate:feedback:${ip}`;

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
// Strip HTML tags to prevent stored XSS
// ---------------------------------------------------------------------------

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

// ---------------------------------------------------------------------------
// POST /api/feedback — submit feedback
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    );
  }

  let body: { rating?: number; message?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Validate rating
  const rating = body.rating;
  if (
    rating === undefined ||
    typeof rating !== 'number' ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return NextResponse.json(
      { error: 'Rating must be an integer between 1 and 5.' },
      { status: 400 },
    );
  }

  // Validate message (optional, max 500 chars)
  let message = '';
  if (body.message !== undefined) {
    if (typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Message must be a string.' },
        { status: 400 },
      );
    }
    message = stripHtml(body.message.trim()).slice(0, 500);
  }

  const locale = body.locale === 'zh' ? 'zh' : 'en';

  try {
    await addFeedback({
      id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      rating,
      message,
      locale,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[api/feedback] POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
