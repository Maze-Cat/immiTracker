import { NextRequest, NextResponse } from 'next/server';
import { fetchAndStoreBulletin } from '@/lib/visa-bulletin/fetcher';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
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
