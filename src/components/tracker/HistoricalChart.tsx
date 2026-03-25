'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type { VisaBulletin, CategoryTable, ChargeabilityRow } from '@/types/visa-bulletin';

type ChartCategory = 'EB1' | 'EB2' | 'EB3' | 'EB4' | 'EB5';
type ChartCountry = keyof ChargeabilityRow;

const COUNTRIES: { key: ChartCountry; color: string; dotClass: string }[] = [
  { key: 'china', color: '#0d9488', dotClass: 'bg-teal-600' },
  { key: 'india', color: '#ea580c', dotClass: 'bg-orange-500' },
  { key: 'allChargeability', color: '#2563eb', dotClass: 'bg-blue-500' },
  { key: 'mexico', color: '#9333ea', dotClass: 'bg-purple-500' },
  { key: 'philippines', color: '#db2777', dotClass: 'bg-pink-500' },
];

const CATEGORIES: ChartCategory[] = ['EB1', 'EB2', 'EB3', 'EB4', 'EB5'];

const CHART_HEIGHT = 280;
const Y_AXIS_WIDTH = 50;
const ZERO_LINE_PCT = 50; // zero line at 50% from bottom by default

interface ChangeRow {
  bulletinMonth: string;
  shortLabel: string;
  changes: Record<ChartCountry, number | null>; // days moved, null if C/U
}

function getCountryLabel(key: ChartCountry, locale: string): string {
  const labels: Record<ChartCountry, { en: string; zh: string }> = {
    china: { en: 'China', zh: '中国' },
    india: { en: 'India', zh: '印度' },
    allChargeability: { en: 'All', zh: '所有' },
    mexico: { en: 'Mexico', zh: '墨西哥' },
    philippines: { en: 'Philippines', zh: '菲律宾' },
  };
  return locale === 'zh' ? labels[key].zh : labels[key].en;
}

function parseDate(value: string): number | null {
  if (value === 'C' || value === 'U') return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d.getTime();
}

function shortMonth(bulletinMonth: string): string {
  const parts = bulletinMonth.split(' ');
  if (parts.length === 2) {
    return `${parts[0].slice(0, 3)} '${parts[1].slice(2)}`;
  }
  return bulletinMonth;
}

export default function HistoricalChart() {
  const t = useTranslations('tracker');
  const locale = useLocale();
  const [bulletins, setBulletins] = useState<VisaBulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<ChartCategory>('EB2');
  const [tableType, setTableType] = useState<'finalAction' | 'datesForFiling'>('finalAction');
  const [selectedCountries, setSelectedCountries] = useState<Set<ChartCountry>>(
    new Set(['china', 'india'])
  );
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; content: string;
  } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/visa-bulletin/history?mode=all')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { bulletins: VisaBulletin[] }) => {
        setBulletins(data.bulletins);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleCountry = (c: ChartCountry) => {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(c)) {
        if (next.size > 1) next.delete(c);
      } else {
        next.add(c);
      }
      return next;
    });
  };

  // Build change rows: compute days moved vs previous month
  const changeRows: ChangeRow[] = useMemo(() => {
    const rows: ChangeRow[] = [];
    for (let i = 1; i < bulletins.length; i++) {
      const cur = bulletins[i];
      const prev = bulletins[i - 1];
      const curTable: CategoryTable =
        tableType === 'finalAction'
          ? cur.employmentBased.finalActionDates
          : cur.employmentBased.datesForFiling;
      const prevTable: CategoryTable =
        tableType === 'finalAction'
          ? prev.employmentBased.finalActionDates
          : prev.employmentBased.datesForFiling;
      const curRow = curTable[category];
      const prevRow = prevTable[category];

      const changes: Record<ChartCountry, number | null> = {
        allChargeability: null, china: null, india: null, mexico: null, philippines: null,
      };

      for (const key of Object.keys(changes) as ChartCountry[]) {
        const curTs = parseDate(curRow?.[key] ?? 'U');
        const prevTs = parseDate(prevRow?.[key] ?? 'U');
        if (curTs !== null && prevTs !== null) {
          changes[key] = Math.round((curTs - prevTs) / (1000 * 60 * 60 * 24));
        }
      }

      rows.push({
        bulletinMonth: cur.bulletinMonth,
        shortLabel: shortMonth(cur.bulletinMonth),
        changes,
      });
    }
    return rows;
  }, [bulletins, category, tableType]);

  const activeCountries = useMemo(
    () => COUNTRIES.filter((c) => selectedCountries.has(c.key)),
    [selectedCountries],
  );

  const avgAnnotation = useMemo(() => {
    const avgs: { key: ChartCountry; label: string; avg: number }[] = [];
    for (const c of activeCountries) {
      const values = changeRows
        .map((r) => r.changes[c.key])
        .filter((d): d is number => d !== null);
      if (values.length === 0) continue;
      const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      avgs.push({ key: c.key, label: getCountryLabel(c.key, locale), avg });
    }
    return avgs;
  }, [changeRows, activeCountries, locale]);

  // Compute min/max days for y-axis scaling
  const { minDays, maxDays } = useMemo(() => {
    let min = 0;
    let max = 0;
    for (const row of changeRows) {
      for (const c of activeCountries) {
        const d = row.changes[c.key];
        if (d !== null) {
          if (d < min) min = d;
          if (d > max) max = d;
        }
      }
    }
    // Add padding
    const range = max - min || 1;
    const pad = Math.max(Math.ceil(range * 0.15), 10);
    return { minDays: min - pad, maxDays: max + pad };
  }, [changeRows, activeCountries]);

  const totalRange = maxDays - minDays || 1;

  // Zero line position as percentage from bottom
  const zeroPct = ((0 - minDays) / totalRange) * 100;

  // Convert days to y percentage from bottom
  const yPct = (days: number): number => {
    return ((days - minDays) / totalRange) * 100;
  };

  // Y-axis ticks
  const yTicks = useMemo(() => {
    const step = Math.max(Math.ceil(totalRange / 6 / 10) * 10, 10);
    const ticks: { days: number; pct: number }[] = [];
    // Go from minDays rounded down to maxDays rounded up
    const start = Math.floor(minDays / step) * step;
    const end = Math.ceil(maxDays / step) * step;
    for (let d = start; d <= end; d += step) {
      const pct = yPct(d);
      if (pct >= -2 && pct <= 102) {
        ticks.push({ days: d, pct });
      }
    }
    // Always include 0
    if (!ticks.find((t) => t.days === 0)) {
      ticks.push({ days: 0, pct: yPct(0) });
      ticks.sort((a, b) => a.days - b.days);
    }
    return ticks;
  }, [minDays, maxDays, totalRange]);

  const numMonths = changeRows.length;
  const barWidth = activeCountries.length <= 2 ? 16 : 10;
  const groupGap = 2;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-start justify-between border-b border-gray-100">
        <div>
          <p className="text-[15px] font-bold text-gray-800">{t('historicalTrends')}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">{t('historicalTrendsDesc')}</p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">
              {locale === 'zh' ? '类别' : 'Category'}:
            </span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    category === cat
                      ? 'bg-white text-teal-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">
              {locale === 'zh' ? '类型' : 'Type'}:
            </span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
              <button
                onClick={() => setTableType('finalAction')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  tableType === 'finalAction'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t('finalAction')}
              </button>
              <button
                onClick={() => setTableType('datesForFiling')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  tableType === 'datesForFiling'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t('datesForFiling')}
              </button>
            </div>
          </div>
        </div>

        {/* Country toggles */}
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map(({ key, dotClass }) => (
            <button
              key={key}
              onClick={() => toggleCountry(key)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                selectedCountries.has(key)
                  ? 'border-gray-300 bg-gray-50 text-gray-700 font-semibold'
                  : 'border-gray-200 bg-white text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dotClass} ${
                selectedCountries.has(key) ? 'opacity-100' : 'opacity-30'
              }`} />
              {getCountryLabel(key, locale)}
            </button>
          ))}
        </div>

        {/* Bar chart */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : changeRows.length === 0 ? (
          <div className="text-sm text-gray-400 py-8 text-center">
            {locale === 'zh' ? '暂无历史数据。' : 'No historical data yet.'}
          </div>
        ) : (
          <div
            ref={chartRef}
            className="relative select-none"
            onMouseLeave={() => setTooltip(null)}
          >
            <div className="flex">
              {/* Y-axis */}
              <div
                className="flex-shrink-0 relative"
                style={{ width: `${Y_AXIS_WIDTH}px`, height: `${CHART_HEIGHT}px` }}
              >
                {yTicks.map((tick) => (
                  <div
                    key={tick.days}
                    className="absolute right-0 pr-2 text-[10px] text-gray-400 whitespace-nowrap"
                    style={{
                      bottom: `${tick.pct}%`,
                      transform: 'translateY(50%)',
                    }}
                  >
                    {tick.days > 0 ? `+${tick.days}` : tick.days === 0 ? '0' : `${tick.days}`}
                  </div>
                ))}
                {/* Y-axis title */}
                <div
                  className="absolute text-[10px] text-gray-400 font-semibold"
                  style={{
                    top: '50%',
                    left: '-2px',
                    transform: 'rotate(-90deg) translateX(-50%)',
                    transformOrigin: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {locale === 'zh' ? '天数' : 'Days'}
                </div>
              </div>

              {/* Chart area */}
              <div
                className="flex-1 relative border-l border-gray-200"
                style={{ height: `${CHART_HEIGHT}px` }}
              >
                {/* Horizontal grid lines */}
                {yTicks.map((tick) => (
                  <div
                    key={tick.days}
                    className={`absolute left-0 right-0 ${
                      tick.days === 0
                        ? 'border-t-2 border-gray-400'
                        : 'border-t border-gray-100'
                    }`}
                    style={{ bottom: `${tick.pct}%` }}
                  />
                ))}

                {/* Bar groups */}
                {changeRows.map((row, idx) => {
                  const groupWidth = activeCountries.length * (barWidth + groupGap);
                  const xCenter = ((idx + 0.5) / numMonths) * 100;

                  return (
                    <div
                      key={row.bulletinMonth}
                      className="absolute"
                      style={{
                        left: `${xCenter}%`,
                        transform: 'translateX(-50%)',
                        width: `${groupWidth}px`,
                        height: '100%',
                        bottom: 0,
                      }}
                    >
                      {activeCountries.map((country, ci) => {
                        const days = row.changes[country.key];
                        if (days === null) return null;

                        const barPct = Math.abs(days) / totalRange * 100;
                        const isPositive = days >= 0;

                        const tooltipText = `${getCountryLabel(country.key, locale)}: ${
                          days > 0 ? '+' : ''
                        }${days}${locale === 'zh' ? '天' : 'd'}`;

                        return (
                          <div
                            key={country.key}
                            className="absolute cursor-pointer transition-all duration-300 hover:opacity-100"
                            style={{
                              left: `${ci * (barWidth + groupGap)}px`,
                              width: `${barWidth}px`,
                              // For positive: bottom at zero line, grows up
                              // For negative: top at zero line, grows down
                              ...(isPositive
                                ? {
                                    bottom: `${zeroPct}%`,
                                    height: `${barPct}%`,
                                    borderRadius: '3px 3px 0 0',
                                  }
                                : {
                                    bottom: `${zeroPct - barPct}%`,
                                    height: `${barPct}%`,
                                    borderRadius: '0 0 3px 3px',
                                  }),
                              backgroundColor: country.color,
                              opacity: 0.8,
                              minHeight: days !== 0 ? '2px' : '0px',
                            }}
                            onMouseEnter={(e) => {
                              const rect = chartRef.current?.getBoundingClientRect();
                              if (rect) {
                                setTooltip({
                                  x: e.clientX - rect.left,
                                  y: e.clientY - rect.top - 10,
                                  content: `${row.shortLabel} · ${tooltipText}`,
                                });
                              }
                            }}
                            onMouseMove={(e) => {
                              const rect = chartRef.current?.getBoundingClientRect();
                              if (rect) {
                                setTooltip({
                                  x: e.clientX - rect.left,
                                  y: e.clientY - rect.top - 10,
                                  content: `${row.shortLabel} · ${tooltipText}`,
                                });
                              }
                            }}
                            onMouseLeave={() => setTooltip(null)}
                          />
                        );
                      })}
                    </div>
                  );
                })}

                {/* Tooltip */}
                {tooltip && (
                  <div
                    className="absolute z-10 bg-gray-800 text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
                    style={{
                      left: `${tooltip.x}px`,
                      top: `${tooltip.y}px`,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    {tooltip.content}
                  </div>
                )}
              </div>
            </div>

            {/* X-axis labels */}
            <div
              className="flex justify-between mt-2 pt-1"
              style={{ paddingLeft: `${Y_AXIS_WIDTH}px` }}
            >
              {changeRows.map((row) => (
                <div
                  key={row.bulletinMonth}
                  className="text-[10px] text-gray-500 font-medium text-center flex-1"
                  style={{ minWidth: 0 }}
                >
                  <span className="inline-block -rotate-45 origin-top whitespace-nowrap">
                    {row.shortLabel}
                  </span>
                </div>
              ))}
            </div>

            {/* Average annotation */}
            {avgAnnotation.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mt-3 px-2">
                {avgAnnotation.map(({ key, label, avg }) => {
                  const color = COUNTRIES.find((c) => c.key === key)?.color ?? '#666';
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500"
                    >
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: color }}
                      />
                      {label}: {t('avgDaysPerMonth', { days: `${avg > 0 ? '+' : ''}${avg}` })}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="h-6" />
          </div>
        )}

        <p className="text-[11px] text-gray-400 text-center">
          {t('autoUpdated')}
        </p>
      </div>
    </div>
  );
}
