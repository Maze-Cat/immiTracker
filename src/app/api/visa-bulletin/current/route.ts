import { NextResponse } from 'next/server';
import { getLatestBulletin, getPreviousBulletin } from '@/lib/visa-bulletin/store';

export async function GET() {
  try {
    const bulletin = await getLatestBulletin();
    if (!bulletin) {
      return NextResponse.json({ error: 'No bulletin data available' }, { status: 404 });
    }
    const previous = await getPreviousBulletin();
    return NextResponse.json({ current: bulletin, previous }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('[visa-bulletin/current] Failed to fetch bulletin data:', error);
    return NextResponse.json({ error: 'Failed to fetch bulletin data' }, { status: 500 });
  }
}
