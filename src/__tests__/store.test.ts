import { storeBulletin, getLatestBulletin, getHistoricalData } from '@/lib/visa-bulletin/store';
import type { VisaBulletin } from '@/types/visa-bulletin';

function makeBulletin(month: string, year: number, eb2IndiaDate: string): VisaBulletin {
  const row = (date: string) => ({
    allChargeability: 'C',
    china: 'C',
    india: date,
    mexico: 'C',
    philippines: 'C',
  });

  return {
    fetchedAt: new Date().toISOString(),
    bulletinMonth: month,
    bulletinYear: year,
    employmentBased: {
      finalActionDates: { EB1: row('C'), EB2: row(eb2IndiaDate), EB3: row('2012-01-01') },
      datesForFiling: { EB1: row('C'), EB2: row('C'), EB3: row('C') },
    },
    familyBased: {
      finalActionDates: { F1: row('2015-01-01'), F2A: row('C') },
      datesForFiling: { F1: row('C'), F2A: row('C') },
    },
  };
}

describe('store', () => {
  it('stores and retrieves latest bulletin', async () => {
    const bulletin = makeBulletin('March 2026', 2026, '2013-01-01');
    await storeBulletin(bulletin);

    const latest = await getLatestBulletin();
    expect(latest).not.toBeNull();
    expect(latest!.bulletinMonth).toBe('March 2026');
    expect(latest!.bulletinYear).toBe(2026);
  });

  it('overwrites latest when new bulletin is stored', async () => {
    const b1 = makeBulletin('January 2026', 2026, '2012-10-01');
    const b2 = makeBulletin('February 2026', 2026, '2012-12-01');
    await storeBulletin(b1);
    await storeBulletin(b2);

    const latest = await getLatestBulletin();
    expect(latest!.bulletinMonth).toBe('February 2026');
  });

  it('returns historical data for EB2 India', async () => {
    const b1 = makeBulletin('January 2026', 2026, '2012-10-01');
    const b2 = makeBulletin('February 2026', 2026, '2012-12-01');
    const b3 = makeBulletin('March 2026', 2026, '2013-01-01');

    await storeBulletin(b1);
    await storeBulletin(b2);
    await storeBulletin(b3);

    const history = await getHistoricalData('EB2', 'INDIA', 12);

    expect(history.category).toBe('EB2');
    expect(history.chargeability).toBe('india');
    expect(history.entries.length).toBeGreaterThanOrEqual(3);

    // Entries should be in ascending order
    const months = history.entries.map((e) => e.bulletinMonth);
    const sorted = [...months].sort();
    expect(months).toEqual(sorted);

    // Check we got the right dates
    const marchEntry = history.entries.find((e) => e.bulletinMonth === '2026-03');
    expect(marchEntry?.finalActionDate).toBe('2013-01-01');
  });

  it('returns BulletinHistory shape with entries array', async () => {
    const history = await getHistoricalData('EB2', 'ALL', 6);
    expect(history).toHaveProperty('category');
    expect(history).toHaveProperty('chargeability');
    expect(history).toHaveProperty('entries');
    expect(Array.isArray(history.entries)).toBe(true);
  });

  it('returns "U" for missing category data', async () => {
    const history = await getHistoricalData('EB5', 'INDIA', 6);
    history.entries.forEach((entry) => {
      expect(entry.finalActionDate).toBe('U');
      expect(entry.datesForFilingDate).toBe('U');
    });
  });

  it('limits results to requested months', async () => {
    const history = await getHistoricalData('EB2', 'INDIA', 1);
    expect(history.entries.length).toBeLessThanOrEqual(1);
  });
});
