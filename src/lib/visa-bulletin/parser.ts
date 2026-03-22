import * as cheerio from 'cheerio';
import type { VisaBulletin, CategoryTable, ChargeabilityRow } from '@/types/visa-bulletin';

const MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04',
  may: '05', june: '06', july: '07', august: '08',
  september: '09', october: '10', november: '11', december: '12',
};

/**
 * Normalise a raw cell value from the DOS Visa Bulletin table into one of:
 *   "C"           — Current
 *   "U"           — Unavailable
 *   "YYYY-MM-DD"  — specific priority date cut-off
 */
function normaliseDateValue(raw: string): string {
  const val = raw.trim().toUpperCase();
  if (!val || val === 'C' || val === 'CURRENT') return 'C';
  if (val === 'U' || val === 'UNAVAILABLE' || val === 'UNAV.') return 'U';

  // Formats seen on the DOS site: "01JAN20", "01 JAN 2020", "01-JAN-2020",
  // "January 1, 2020", "1-Jan-20", etc.
  const monthAbbr: Record<string, string> = {
    JAN: '01', FEB: '02', MAR: '03', APR: '04',
    MAY: '05', JUN: '06', JUL: '07', AUG: '08',
    SEP: '09', OCT: '10', NOV: '11', DEC: '12',
  };

  // "01JAN20" or "01JAN2020" (no separator)
  const compact = val.match(/^(\d{1,2})([A-Z]{3})(\d{2,4})$/);
  if (compact) {
    const [, d, m, y] = compact;
    const mon = monthAbbr[m];
    if (mon) {
      const year = y.length === 2 ? `20${y}` : y;
      return `${year}-${mon}-${d.padStart(2, '0')}`;
    }
  }

  // "01-JAN-2020" or "01 JAN 2020"
  const spaced = val.match(/^(\d{1,2})[\s\-]([A-Z]{3})[\s\-](\d{2,4})$/);
  if (spaced) {
    const [, d, m, y] = spaced;
    const mon = monthAbbr[m];
    if (mon) {
      const year = y.length === 2 ? `20${y}` : y;
      return `${year}-${mon}-${d.padStart(2, '0')}`;
    }
  }

  // "January 1, 2020"
  const longForm = val.match(/^([A-Z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (longForm) {
    const [, mName, d, year] = longForm;
    const mon = monthAbbr[mName.slice(0, 3)];
    if (mon) return `${year}-${mon}-${d.padStart(2, '0')}`;
  }

  // Already ISO "YYYY-MM-DD"
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;

  // Fallback — return as-is
  return raw.trim();
}

/**
 * Map the row header text from the DOS bulletin tables to canonical keys.
 * Employment-based keys: EB1, EB2, EB3, EB3_OW, EB4, EB4_CRW, EB5
 * Family-based keys:    F1, F2A, F2B, F3, F4
 */
function canonicaliseRowKey(raw: string): string | null {
  const t = raw.replace(/\s+/g, ' ').trim().toUpperCase();

  // Employment-based
  if (/^1ST/.test(t)) return 'EB1';
  if (/^2ND/.test(t)) return 'EB2';
  if (/^3RD/.test(t) && !/OTHER/.test(t) && !/WORKER/.test(t)) return 'EB3';
  if (/OTHER WORKERS/.test(t)) return 'EB3_OW';
  if (/CERTAIN RELIGIOUS/.test(t)) return 'EB4_CRW';
  if (/^4TH/.test(t)) return 'EB4';
  if (/^5TH/.test(t)) return 'EB5';

  // Family-based
  if (/^F1\b|^1ST.*UNMARRIED/.test(t)) return 'F1';
  if (/F2A|2A\b|SPOUSES.*CHILDREN.*LPR|^2ND.*SPOUSES/.test(t)) return 'F2A';
  if (/F2B|2B\b|UNMARRIED.*SONS.*LPR|^2ND.*UNMARRIED/.test(t)) return 'F2B';
  if (/^F3\b|^3RD.*MARRIED/.test(t)) return 'F3';
  if (/^F4\b|^4TH.*BROTHERS/.test(t)) return 'F4';

  return null;
}

/**
 * Parse a single <table> element that represents a bulletin category table.
 * Returns null if the table doesn't look like a bulletin date table.
 */
function parseTable($: cheerio.CheerioAPI, tableEl: cheerio.Element): CategoryTable | null {
  const rows = $('tr', tableEl).toArray();
  if (rows.length < 2) return null;

  // Determine column order from header row
  const headerCells = $('td, th', rows[0]).toArray().map(c => $(c).text().trim().toUpperCase());
  if (headerCells.length < 2) return null;

  // Expect columns to include chargeability labels
  const colMap: Record<string, number> = {};
  headerCells.forEach((h, i) => {
    if (/ALL\s+CHARG|ALL AREA/.test(h)) colMap.allChargeability = i;
    else if (/CHINA/.test(h)) colMap.china = i;
    else if (/INDIA/.test(h)) colMap.india = i;
    else if (/MEXICO/.test(h)) colMap.mexico = i;
    else if (/PHILIP/.test(h)) colMap.philippines = i;
  });

  // Must have at least the "all chargeability" column to be a valid table
  if (colMap.allChargeability === undefined) return null;

  const table: CategoryTable = {};

  for (let r = 1; r < rows.length; r++) {
    const cells = $('td, th', rows[r]).toArray().map(c => $(c).text().trim());
    if (cells.length < 2) continue;

    const key = canonicaliseRowKey(cells[0]);
    if (!key) continue;

    const row: ChargeabilityRow = {
      allChargeability: normaliseDateValue(cells[colMap.allChargeability] ?? ''),
      china:            normaliseDateValue(cells[colMap.china            ?? colMap.allChargeability] ?? ''),
      india:            normaliseDateValue(cells[colMap.india            ?? colMap.allChargeability] ?? ''),
      mexico:           normaliseDateValue(cells[colMap.mexico           ?? colMap.allChargeability] ?? ''),
      philippines:      normaliseDateValue(cells[colMap.philippines      ?? colMap.allChargeability] ?? ''),
    };
    table[key] = row;
  }

  return Object.keys(table).length > 0 ? table : null;
}

/**
 * Heuristic: decide whether a table heading / caption describes an
 * employment-based final-action, employment-based filing, family-based
 * final-action, or family-based filing table.
 */
type TableKind =
  | 'eb-final'
  | 'eb-filing'
  | 'fb-final'
  | 'fb-filing'
  | null;

function classifyHeading(text: string): TableKind {
  const t = text.toUpperCase();
  const isEB = /EMPLOYMENT.BASED/.test(t) || /EMPLOYMENT PREFERENCE/.test(t);
  const isFB = /FAMILY.BASED/.test(t) || /FAMILY PREFERENCE/.test(t) || /FAMILY-SPONSORED/.test(t);
  const isFinal = /FINAL ACTION/.test(t);
  const isFiling = /DATE.*FILING|FOR FILING/.test(t);

  if (isEB && isFinal) return 'eb-final';
  if (isEB && isFiling) return 'eb-filing';
  if (isFB && isFinal) return 'fb-final';
  if (isFB && isFiling) return 'fb-filing';
  return null;
}

/**
 * Walk the DOM, collecting tables preceded by a classifiable heading.
 * We look at <h2>, <h3>, <h4>, <p><strong>, and <caption> elements.
 */
function collectTables($: cheerio.CheerioAPI): {
  kind: TableKind;
  table: cheerio.Element;
}[] {
  const results: { kind: TableKind; table: cheerio.Element }[] = [];
  let pendingKind: TableKind = null;

  $('h2, h3, h4, table, p').each((_i, el) => {
    const tag = (el as cheerio.Element).tagName?.toLowerCase();

    if (tag !== 'table') {
      // Extract text for classification
      const text = $(el).text();
      const kind = classifyHeading(text);
      if (kind) pendingKind = kind;
      return;
    }

    // It's a <table>. Check its own <caption> first.
    const caption = $('caption', el).first().text();
    const captionKind = classifyHeading(caption);
    const kind = captionKind ?? pendingKind;

    if (kind) {
      results.push({ kind, table: el as cheerio.Element });
      pendingKind = null;
    }
  });

  return results;
}

/**
 * Extract the bulletin month string from the HTML page.
 * Returns a human-readable string like "March 2026".
 */
function extractBulletinMonth(html: string): string {
  // Try the <title> or heading first, e.g. "Visa Bulletin for March 2026"
  const match = html.match(/Visa Bulletin for\s+([A-Za-z]+\s+\d{4})/i);
  if (match) return match[1];

  // Fallback: look for a bare "Month YYYY" in the first 4 kB
  const snippet = html.slice(0, 4096);
  const bare = snippet.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})\b/i);
  if (bare) return `${bare[1]} ${bare[2]}`;

  return 'Unknown';
}

/**
 * Derive a numeric year from the bulletin month string.
 */
function extractYear(bulletinMonth: string): number {
  const m = bulletinMonth.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : new Date().getFullYear();
}

/**
 * Parse a DOS Visa Bulletin HTML page into a typed VisaBulletin object.
 */
export function parseVisaBulletin(html: string): VisaBulletin {
  const $ = cheerio.load(html);

  const bulletinMonth = extractBulletinMonth(html);
  const bulletinYear  = extractYear(bulletinMonth);

  const collected = collectTables($);

  let ebFinal: CategoryTable  = {};
  let ebFiling: CategoryTable = {};
  let fbFinal: CategoryTable  = {};
  let fbFiling: CategoryTable = {};

  for (const { kind, table } of collected) {
    if (!kind) continue;
    const parsed = parseTable($, table);
    if (!parsed) continue;

    if (kind === 'eb-final'  && Object.keys(ebFinal).length  === 0) ebFinal  = parsed;
    if (kind === 'eb-filing' && Object.keys(ebFiling).length === 0) ebFiling = parsed;
    if (kind === 'fb-final'  && Object.keys(fbFinal).length  === 0) fbFinal  = parsed;
    if (kind === 'fb-filing' && Object.keys(fbFiling).length === 0) fbFiling = parsed;
  }

  // If we still have an empty EB filing table, fall back to the EB final table
  // (some months the DOS site omits one of the tables when dates are the same)
  if (Object.keys(ebFiling).length === 0 && Object.keys(ebFinal).length > 0) {
    ebFiling = ebFinal;
  }
  if (Object.keys(fbFiling).length === 0 && Object.keys(fbFinal).length > 0) {
    fbFiling = fbFinal;
  }

  return {
    fetchedAt: new Date().toISOString(),
    bulletinMonth,
    bulletinYear,
    employmentBased: {
      finalActionDates: ebFinal,
      datesForFiling:   ebFiling,
    },
    familyBased: {
      finalActionDates: fbFinal,
      datesForFiling:   fbFiling,
    },
  };
}
