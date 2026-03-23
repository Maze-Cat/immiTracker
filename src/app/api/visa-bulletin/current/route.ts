import { NextResponse } from 'next/server';
import { getLatestBulletin } from '@/lib/visa-bulletin/store';

export async function GET() {
  try {
    const bulletin = await getLatestBulletin();
    if (!bulletin) {
      return NextResponse.json({ error: 'No bulletin data available' }, { status: 404 });
    }
    return NextResponse.json(bulletin);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bulletin data' }, { status: 500 });
  }
}
