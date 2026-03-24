import * as cheerio from 'cheerio';
import type { AnyNode, Element } from 'domhandler';
import type { VisaBulletin, CategoryTable, ChargeabilityRow } from '@/types/visa-bulletin';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractYear(bulletinMonth: string): number {
  const m = bulletinMonth.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : new Date().getFullYear();
}

/**
 * Normalise a raw date cell value into one of:
 *   "C"            – Current
 *   "U"            – Unavailable
 *   "YYYY-MM-DD"   – ISO date
 */
function normaliseDateValue(raw: string): string {
  const v = raw.trim().toUpperCase();
  if (!v || v === 'C' || v === 'CURRENT') return 'C';
  if (v === 'U' || v === 'UNAVAILABLE') return 'U';

  // DD-MMM-YYYY  e.g. "01-JAN-2022"
  const dmy = v.match(/^(\d{1,2})[- ]([A-Z]{3})[- ](\d{4})$/);
  if (dmy) return parseMonthDate(dmy[3], dmy[2], dmy[1]);

  // DDMMMYY  e.g. "01JAN22"
  const compact = v.match(/^(\d{1,2})([A-Z]{3})(\d{2})$/);
  if (compact) {
    const year = parseInt(compact[3], 10) + (parseInt(compact[3], 10) >= 50 ? 1900 : 2000);
    return parseMonthDate(String(year), compact[2], compact[1]);
  }

  // DDMMMYYYY  e.g. "01JAN2022"
  const compact4 = v.match(/^(\d{1,2})([A-Z]{3})(\d{4})$/);
  if (compact4) return parseMonthDate(compact4[3], compact4[2], compact4[1]);

  // Already ISO or partial ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

  // Unrecognized format — treat as unavailable
  console.warn(`[parser] Unrecognized date value: "${raw.trim()}"`);
  return 'U';
}

const MONTHS: Record<string, string> = {
  JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
  JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
};

function parseMonthDate(year: string, mon: string, day: string): string {
  const mm = MONTHS[mon.toUpperCase()] ?? '01';
  const dd = day.padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

/**
 * Canonicalise a row-header like "1st", "2nd", "F1", "F2A" etc. to a clean key.
 * For EB tables: "1st" → "EB1", "2nd" → "EB2", …
 * For FB tables: keep as-is after minor cleanup (e.g. "1st" → "F1", or just "F1").
 */
function canonicaliseRowKey(raw: string, isEB: boolean): string {
  const v = raw.trim();
  if (isEB) {
    const ordinal = v.match(/^(\d+)(st|nd|rd|th)$/i);
    if (ordinal) return `EB${ordinal[1]}`;
    // Already like "EB1", "EB-1", "E1", etc.
    const eb = v.match(/^E[B-]?(\d)/i);
    if (eb) return `EB${eb[1]}`;
  } else {
    const fbNum = v.match(/^F?(\d[A-Z]?)$/i);
    if (fbNum) return `F${fbNum[1].toUpperCase()}`;
    const ordinal = v.match(/^(\d+)(st|nd|rd|th)$/i);
    if (ordinal) return `F${ordinal[1]}`;
  }
  return v.toUpperCase();
}

// Column header fragments → ChargeabilityRow keys
const COL_MAP: Array<[RegExp, keyof ChargeabilityRow]> = [
  [/all\s*charg/i, 'allChargeability'],
  [/china/i, 'china'],
  [/india/i, 'india'],
  [/mexico/i, 'mexico'],
  [/philip/i, 'philippines'],
];

function mapColumnIndex(headerText: string): keyof ChargeabilityRow | null {
  for (const [re, key] of COL_MAP) {
    if (re.test(headerText)) return key;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Table parsing
// ---------------------------------------------------------------------------

function parseTable($: cheerio.CheerioAPI, tableEl: Element, isEB: boolean): CategoryTable {
  const result: CategoryTable = {};

  const rows = $(tableEl).find('tr').toArray();
  if (rows.length === 0) return result;

  // First row = header — map column indices to chargeability keys
  const headerCells = $(rows[0]).find('th, td').toArray();
  const colMap: Array<keyof ChargeabilityRow | null> = headerCells.map(
    (cell) => mapColumnIndex($(cell).text()),
  );

  // Remaining rows = data rows
  for (const row of rows.slice(1)) {
    const cells = $(row).find('td').toArray();
    if (cells.length < 2) continue;

    const rowKey = canonicaliseRowKey($(cells[0]).text(), isEB);
    if (!rowKey) continue;

    const entry: Partial<ChargeabilityRow> = {};
    for (let i = 1; i < cells.length; i++) {
      const colKey = colMap[i];
      if (!colKey) continue;
      entry[colKey] = normaliseDateValue($(cells[i]).text());
    }

    // Fill any missing columns with "U"
    const full: ChargeabilityRow = {
      allChargeability: entry.allChargeability ?? 'U',
      china: entry.china ?? 'U',
      india: entry.india ?? 'U',
      mexico: entry.mexico ?? 'U',
      philippines: entry.philippines ?? 'U',
    };

    result[rowKey] = full;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Section classification
// ---------------------------------------------------------------------------

type TableKind = 'eb-final' | 'eb-filing' | 'fb-final' | 'fb-filing' | null;

function classifyHeading(text: string): TableKind {
  const t = text.toLowerCase();
  // Match on keywords only — "A." / "B." section letters don't indicate EB vs FB
  const isEB = /employment/i.test(t) || /\beb\b/.test(t);
  const isFB = /family/i.test(t) || /\bfb\b/.test(t);
  const isFinal = /final action/i.test(t);
  const isFiling = /filing|dates for filing/i.test(t);

  // Check FB first — if both match (shouldn't happen), family takes priority
  if (isFB && isFinal) return 'fb-final';
  if (isFB && isFiling) return 'fb-filing';
  if (isEB && isFinal) return 'eb-final';
  if (isEB && isFiling) return 'eb-filing';
  return null;
}

// ---------------------------------------------------------------------------
// Main parser
// ---------------------------------------------------------------------------

export function parseVisaBulletin(html: string): VisaBulletin {
  const $ = cheerio.load(html);

  // Extract bulletin month from page title / heading
  let bulletinMonth = 'Unknown';
  $('h1, h2, title').each((_, el) => {
    const text = $(el).text();
    const m = text.match(/Visa Bulletin[^,]*for\s+([A-Za-z]+\s+\d{4})/i);
    if (m && bulletinMonth === 'Unknown') bulletinMonth = m[1];
  });
  if (bulletinMonth === 'Unknown') {
    const m = html.match(/Visa Bulletin[^,]*for\s+([A-Za-z]+\s+\d{4})/i);
    if (m) bulletinMonth = m[1];
  }

  const bulletinYear = extractYear(bulletinMonth);

  // Walk through headings + tables to classify sections
  const ebFinal: CategoryTable = {};
  const ebFiling: CategoryTable = {};
  const fbFinal: CategoryTable = {};
  const fbFiling: CategoryTable = {};

  let currentKind: TableKind = null;
  let isEB = false;

  // Collect all relevant elements in document order
  $('h2, h3, h4, p, table').each((_, el) => {
    const tagName = el.type === 'tag' ? (el as Element).name.toLowerCase() : '';

    if (['h2', 'h3', 'h4', 'p'].includes(tagName)) {
      const text = $(el).text().trim();
      const kind = classifyHeading(text);
      if (kind) {
        currentKind = kind;
        isEB = kind.startsWith('eb');
      }
      return;
    }

    if (tagName === 'table' && currentKind) {
      const parsed = parseTable($, el, isEB);

      switch (currentKind) {
        case 'eb-final':
          Object.assign(ebFinal, parsed);
          break;
        case 'eb-filing':
          Object.assign(ebFiling, parsed);
          break;
        case 'fb-final':
          Object.assign(fbFinal, parsed);
          break;
        case 'fb-filing':
          Object.assign(fbFiling, parsed);
          break;
      }
      // Don't reset currentKind — allows multi-table sections to be captured
    }
  });

  // Validate that we actually parsed some data
  const hasData = [ebFinal, ebFiling, fbFinal, fbFiling].some(
    (t) => Object.keys(t).length > 0,
  );
  if (!hasData) {
    throw new Error(
      'Parser produced no category data — the DOS HTML structure may have changed',
    );
  }

  return {
    fetchedAt: new Date().toISOString(),
    bulletinMonth,
    bulletinYear,
    employmentBased: {
      finalActionDates: ebFinal,
      datesForFiling: ebFiling,
    },
    familyBased: {
      finalActionDates: fbFinal,
      datesForFiling: fbFiling,
    },
  };
}
