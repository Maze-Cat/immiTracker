import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock store and notify
vi.mock('@/lib/visa-bulletin/store', () => ({
  getLatestBulletin: vi.fn(),
  getPreviousBulletin: vi.fn(),
}));

vi.mock('@/lib/email/notify', () => ({
  notifySubscribers: vi.fn(),
}));

import { getLatestBulletin, getPreviousBulletin } from '@/lib/visa-bulletin/store';
import { notifySubscribers } from '@/lib/email/notify';
import { POST } from '@/app/api/admin/notify/route';

function makeRequest(bearer?: string): NextRequest {
  const headers: Record<string, string> = {};
  if (bearer) {
    headers['authorization'] = `Bearer ${bearer}`;
  }
  return new NextRequest('http://localhost/api/admin/notify', {
    method: 'POST',
    headers,
  });
}

describe('POST /api/admin/notify', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('ADMIN_SECRET', 'test-secret');
  });

  // --- Auth ---

  it('returns 401 when no auth header', async () => {
    const res = await POST(makeRequest());
    expect(res.status).toBe(401);
  });

  it('returns 401 when wrong secret', async () => {
    const res = await POST(makeRequest('wrong'));
    expect(res.status).toBe(401);
  });

  it('returns 401 when ADMIN_SECRET env is not set', async () => {
    vi.stubEnv('ADMIN_SECRET', '');
    const res = await POST(makeRequest('any-key'));
    expect(res.status).toBe(401);
  });

  // --- No data ---

  it('returns 404 when no bulletin data', async () => {
    (getLatestBulletin as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (getPreviousBulletin as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await POST(makeRequest('test-secret'));
    expect(res.status).toBe(404);
  });

  // --- Success ---

  it('triggers notification and returns sent/failed counts', async () => {
    const mockBulletin = { bulletinMonth: 'May 2026', employmentBased: {}, familyBased: {} };
    (getLatestBulletin as ReturnType<typeof vi.fn>).mockResolvedValue(mockBulletin);
    (getPreviousBulletin as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (notifySubscribers as ReturnType<typeof vi.fn>).mockResolvedValue({ sent: 2, failed: 0 });

    const res = await POST(makeRequest('test-secret'));
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual({
      success: true,
      bulletinMonth: 'May 2026',
      sent: 2,
      failed: 0,
    });
    expect(notifySubscribers).toHaveBeenCalledWith(mockBulletin, null);
  });

  // --- Error ---

  it('returns 500 when notifySubscribers throws', async () => {
    const mockBulletin = { bulletinMonth: 'May 2026', employmentBased: {}, familyBased: {} };
    (getLatestBulletin as ReturnType<typeof vi.fn>).mockResolvedValue(mockBulletin);
    (getPreviousBulletin as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (notifySubscribers as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Resend down'));

    const res = await POST(makeRequest('test-secret'));
    expect(res.status).toBe(500);
  });
});
