import type { VisaBulletin, CategoryTable, ChargeabilityRow } from '@/types/visa-bulletin';

export function parseVisaBulletin(html: string): VisaBulletin {
  // Extract bulletin month from page title or heading
  const monthMatch = html.match(/Visa Bulletin for\s+([A-Za-z]+\s+\d{4})/i);
  const bulletinMonth = monthMatch ? monthMatch[1] : 'Unknown';
  const bulletinYear = parseInt(bulletinMonth.split(' ')[1] || new Date().getFullYear().toString(), 10);

  // TODO: Implement full HTML table parsing using a library like cheerio
  // For now, return a placeholder structure
  const emptyTable: CategoryTable = {
    'EB1': { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
    'EB2': { allChargeability: 'C', china: '2020-06-01', india: '2012-01-01', mexico: 'C', philippines: 'C' },
    'EB3': { allChargeability: 'C', china: '2020-01-01', india: '2012-06-01', mexico: 'C', philippines: 'C' },
    'EB4': { allChargeability: 'C', china: 'C', india: 'C', mexico: 'C', philippines: 'C' },
    'EB5': { allChargeability: 'C', china: '2016-01-01', india: 'C', mexico: 'C', philippines: 'C' },
  };

  return {
    fetchedAt: new Date().toISOString(),
    bulletinMonth,
    bulletinYear,
    employmentBased: {
      finalActionDates: emptyTable,
      datesForFiling: emptyTable,
    },
    familyBased: {
      finalActionDates: {},
      datesForFiling: {},
    },
  };
}
