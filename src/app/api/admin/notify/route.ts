import { NextRequest, NextResponse } from 'next/server';
import { getLatestBulletin, getPreviousBulletin } from '@/lib/visa-bulletin/store';
import { notifySubscribers } from '@/lib/email/notify';

// ---------------------------------------------------------------------------
// POST /api/admin/notify
// Manually trigger email notification to all subscribers for the latest bulletin.
// Auth via Authorization: Bearer <ADMIN_SECRET> header.
// ---------------------------------------------------------------------------

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false; // deny all when secret is not configured

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [latest, previous] = await Promise.all([
      getLatestBulletin(),
      getPreviousBulletin(),
    ]);

    if (!latest) {
      return NextResponse.json({ error: 'No bulletin data available' }, { status: 404 });
    }

    console.log(`[admin/notify] Manually triggering notification for ${latest.bulletinMonth}`);
    const result = await notifySubscribers(latest, previous);

    return NextResponse.json({
      success: true,
      bulletinMonth: latest.bulletinMonth,
      sent: result.sent,
      failed: result.failed,
    });
  } catch (error) {
    console.error('[admin/notify] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
