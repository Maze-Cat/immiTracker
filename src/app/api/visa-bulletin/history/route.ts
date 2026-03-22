import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalData } from '@/lib/visa-bulletin/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'EB2';
  const chargeability = searchParams.get('chargeability') || 'CHINA';
  const months = Math.max(1, Math.min(parseInt(searchParams.get('months') || '12', 10), 36));

  try {
    const history = await getHistoricalData(category, chargeability, months);
    return NextResponse.json(history);
  } catch (error) {
    console.error('[visa-bulletin/history] Failed to fetch historical data:', error);
    return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
  }
}
