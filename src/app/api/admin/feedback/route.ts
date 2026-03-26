import { NextRequest, NextResponse } from 'next/server';
import { getAllFeedback, getFeedbackCount } from '@/lib/feedback/store';

// ---------------------------------------------------------------------------
// GET /api/admin/feedback?key=<ADMIN_SECRET>
// Returns all feedback entries + summary stats
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');
  const secret = process.env.ADMIN_SECRET;

  // In dev mode (no secret set), allow access
  if (secret && key !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [entries, count] = await Promise.all([
      getAllFeedback(),
      getFeedbackCount(),
    ]);

    // Compute stats
    const distribution = [0, 0, 0, 0, 0]; // index 0 = 1-star, index 4 = 5-star
    let totalRating = 0;

    for (const entry of entries) {
      if (entry.rating >= 1 && entry.rating <= 5) {
        distribution[entry.rating - 1]++;
        totalRating += entry.rating;
      }
    }

    const avgRating = count > 0 ? totalRating / count : 0;

    return NextResponse.json({
      stats: {
        total: count,
        avgRating: Math.round(avgRating * 100) / 100,
        distribution: {
          1: distribution[0],
          2: distribution[1],
          3: distribution[2],
          4: distribution[3],
          5: distribution[4],
        },
      },
      entries,
    });
  } catch (error) {
    console.error('[api/admin/feedback] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
