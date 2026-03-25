/**
 * Tests that the visa-bulletin API routes return correct Cache-Control headers.
 *
 * We mock the store module so we don't need real data, and import the route
 * handlers directly.
 */

// ---------------------------------------------------------------------------
// Mock store before importing route handlers.
// The factory is self-contained so jest hoisting works correctly.
// ---------------------------------------------------------------------------

jest.mock('@/lib/visa-bulletin/store', () => {
  const bulletin = {
    fetchedAt: '2026-03-01T00:00:00.000Z',
    bulletinMonth: 'March 2026',
    bulletinYear: 2026,
    employmentBased: {
      finalActionDates: {
        EB1: { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
      },
      datesForFiling: {},
    },
    familyBased: { finalActionDates: {}, datesForFiling: {} },
  };

  return {
    getLatestBulletin: jest.fn().mockResolvedValue(bulletin),
    getPreviousBulletin: jest.fn().mockResolvedValue(null),
    getHistoricalData: jest.fn().mockResolvedValue({
      category: 'EB2',
      chargeability: 'china',
      entries: [],
    }),
    getAllBulletins: jest.fn().mockResolvedValue([bulletin]),
  };
});

// Import handlers after mock is in place
import { GET as currentGET } from '@/app/api/visa-bulletin/current/route';
import { GET as historyGET } from '@/app/api/visa-bulletin/history/route';
import { NextRequest } from 'next/server';

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('API cache headers', () => {
  const EXPECTED_CACHE = 'public, s-maxage=3600, stale-while-revalidate=86400';

  it('/api/visa-bulletin/current returns Cache-Control header', async () => {
    const response = await currentGET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe(EXPECTED_CACHE);
  });

  it('/api/visa-bulletin/history (default params) returns Cache-Control header', async () => {
    const request = new NextRequest('http://localhost/api/visa-bulletin/history?category=EB2&chargeability=china');
    const response = await historyGET(request);
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe(EXPECTED_CACHE);
  });

  it('/api/visa-bulletin/history?mode=all returns Cache-Control header', async () => {
    const request = new NextRequest('http://localhost/api/visa-bulletin/history?mode=all');
    const response = await historyGET(request);
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe(EXPECTED_CACHE);
  });
});
