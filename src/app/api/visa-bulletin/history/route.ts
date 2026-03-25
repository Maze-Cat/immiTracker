import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalData, getAllBulletins } from '@/lib/visa-bulletin/store';

const VALID_CATEGORIES = ['EB1', 'EB2', 'EB3', 'EB4', 'EB5', 'F1', 'F2A', 'F2B', 'F3', 'F4'];
const VALID_CHARGEABILITIES = ['allChargeability', 'china', 'india', 'mexico', 'philippines'];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // If mode=all, return all bulletins for the chart component
  if (searchParams.get('mode') === 'all') {
    try {
      const bulletins = await getAllBulletins();
      return NextResponse.json({ bulletins }, {
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
      });
    } catch (error) {
      console.error('[visa-bulletin/history] Failed to fetch all bulletins:', error);
      return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
    }
  }

  const category = searchParams.get('category') || 'EB2';
  const chargeability = searchParams.get('chargeability') || 'CHINA';

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
    return NextResponse.json(history, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('[visa-bulletin/history] Failed to fetch historical data:', error);
    return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
  }
}
