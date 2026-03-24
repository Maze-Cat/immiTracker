/**
 * DEV-ONLY: Seeds a mock "March 2026" bulletin so we can test
 * the PD change tracking and historical trends features.
 * This route is a no-op in production.
 */
import { NextResponse } from 'next/server';
import { storeBulletin } from '@/lib/visa-bulletin/store';
import type { VisaBulletin } from '@/types/visa-bulletin';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const marchBulletin: VisaBulletin = {
    fetchedAt: '2026-02-15T00:00:00Z',
    bulletinMonth: 'March 2026',
    bulletinYear: 2026,
    employmentBased: {
      finalActionDates: {
        EB1: { allChargeability: 'C', china: '2022-07-01', india: '2022-04-01', mexico: 'C', philippines: 'C' },
        EB2: { allChargeability: 'C', china: '2019-05-01', india: '2012-01-15', mexico: 'C', philippines: 'C' },
        EB3: { allChargeability: '2021-03-01', china: '2019-04-01', india: '2012-07-01', mexico: '2021-03-01', philippines: '2021-03-01' },
        EB4: { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
        EB5: { allChargeability: 'C', china: '2017-01-01', india: 'C', mexico: 'C', philippines: 'C' },
      },
      datesForFiling: {
        EB1: { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
        EB2: { allChargeability: 'C', china: '2020-01-01', india: '2013-01-01', mexico: 'C', philippines: 'C' },
        EB3: { allChargeability: '2022-04-01', china: '2020-09-01', india: '2013-07-01', mexico: '2022-04-01', philippines: '2022-04-01' },
        EB4: { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
        EB5: { allChargeability: 'C', china: '2018-01-01', india: 'C', mexico: 'C', philippines: 'C' },
      },
    },
    familyBased: {
      finalActionDates: {
        F1: { allChargeability: '2015-02-15', china: '2015-02-15', india: '2015-02-15', mexico: '2002-04-01', philippines: '2012-04-01' },
        F2A: { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
        F2B: { allChargeability: '2016-01-15', china: '2016-01-15', india: '2016-01-15', mexico: '2005-01-01', philippines: '2012-04-01' },
        F3: { allChargeability: '2010-04-01', china: '2010-04-01', india: '2010-04-01', mexico: '2001-04-01', philippines: '2003-01-01' },
        F4: { allChargeability: '2008-01-01', china: '2008-01-01', india: '2007-09-01', mexico: '2002-01-01', philippines: '2004-01-01' },
      },
      datesForFiling: {
        F1: { allChargeability: '2017-01-01', china: '2017-01-01', india: '2017-01-01', mexico: '2005-01-01', philippines: '2015-01-01' },
        F2A: { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
        F2B: { allChargeability: '2018-01-01', china: '2018-01-01', india: '2018-01-01', mexico: '2008-01-01', philippines: '2015-01-01' },
        F3: { allChargeability: '2012-01-01', china: '2012-01-01', india: '2012-01-01', mexico: '2003-01-01', philippines: '2006-01-01' },
        F4: { allChargeability: '2009-01-01', china: '2009-01-01', india: '2009-01-01', mexico: '2003-01-01', philippines: '2007-01-01' },
      },
    },
  };

  await storeBulletin(marchBulletin);
  return NextResponse.json({ success: true, message: 'March 2026 mock bulletin seeded' });
}
