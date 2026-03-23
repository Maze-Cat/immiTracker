import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalData } from '@/lib/visa-bulletin/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'EB2';
  const chargeability = searchParams.get('chargeability') || 'CHINA';
  const months = parseInt(searchParams.get('months') || '12', 10);

  try {
    const history = await getHistoricalData(category, chargeability, Math.min(months, 36));
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
  }
}
