import { NextResponse } from 'next/server';
import { getLatestBulletin, getPreviousBulletin } from '@/lib/visa-bulletin/store';
import { fetchAndStoreBulletin } from '@/lib/visa-bulletin/fetcher';

export async function GET() {
  try {
    let bulletin = await getLatestBulletin();

    // Auto-seed: if KV is empty, fetch bulletin data on first request
    if (!bulletin) {
      console.log('[visa-bulletin/current] No data in store, auto-seeding...');
      try {
        await fetchAndStoreBulletin();
        bulletin = await getLatestBulletin();
      } catch (seedError) {
        console.error('[visa-bulletin/current] Auto-seed failed:', seedError);
      }
    }

    if (!bulletin) {
      return NextResponse.json({ error: 'No bulletin data available' }, { status: 404 });
    }
    const previous = await getPreviousBulletin();
    return NextResponse.json({ current: bulletin, previous });
  } catch (error) {
    console.error('[visa-bulletin/current] Failed to fetch bulletin data:', error);
    return NextResponse.json({ error: 'Failed to fetch bulletin data' }, { status: 500 });
  }
}
