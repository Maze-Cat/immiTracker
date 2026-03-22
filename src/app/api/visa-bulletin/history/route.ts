import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalData } from '@/lib/visa-bulletin/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'EB2';
  const chargeability = searchParams.get('chargeability') || 'CHINA';

  const VALID_CATEGORIES = ['EB1', 'EB2', 'EB3', 'EB4', 'EB5', 'F1', 'F2A', 'F2B', 'F3', 'F4'];
  const VALID_CHARGEABILITIES = ['allChargeability', 'china', 'india', 'mexico', 'philippines'];

  if (!VALID_CATEGORIES.includes(category.toUpperCase())) {
    return NextResponse.json(
      { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` },
      { status: 400 },
    );
  }
  if (!VALID_CHARGEABILITIES.includes(chargeability.toLowerCase())) {
    return NextResponse.json(
      { error: `Invalid chargeability. Must be one of: ${VALID_CHARGEABILITIES.join(', ')}` },
      { status: 400 },
    );
  }

  const rawMonths = parseInt(searchParams.get('months') || '12', 10);
  const months = isNaN(rawMonths) ? 12 : Math.max(1, Math.min(rawMonths, 36));

  try {
    const history = await getHistoricalData(category, chargeability, months);
    return NextResponse.json(history);
  } catch (error) {
    console.error('[visa-bulletin/history] Failed to fetch historical data:', error);
    return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
  }
}
