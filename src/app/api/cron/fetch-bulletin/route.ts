import { NextRequest, NextResponse } from 'next/server';
import { fetchAndStoreBulletin } from '@/lib/visa-bulletin/fetcher';

function isAuthorized(request: NextRequest): boolean {
  // Vercel Cron sets this header automatically
  if (request.headers.get('x-vercel-cron')) return true;

  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  return !!cronSecret && authHeader === `Bearer ${cronSecret}`;
}

async function handleCronRequest(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await fetchAndStoreBulletin();
    return NextResponse.json({ success: true, bulletinMonth: result.bulletinMonth, message: 'Bulletin fetched and stored successfully' });
  } catch (error) {
    console.error('[cron/fetch-bulletin] Failed to fetch or store bulletin:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch bulletin' }, { status: 500 });
  }
}

// Vercel Cron sends GET requests
export async function GET(request: NextRequest) {
  return handleCronRequest(request);
}

// Keep POST for manual triggers
export async function POST(request: NextRequest) {
  return handleCronRequest(request);
}
