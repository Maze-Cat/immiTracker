'use client';
import { useTranslations, useLocale } from 'next-intl';
import type { CategoryTable } from '@/types/visa-bulletin';

interface PriorityDateTableProps {
  data?: CategoryTable;
  previousData?: CategoryTable;
  type?: 'finalAction' | 'datesForFiling';
  title?: string;
}

/**
 * Calculate the number of days between two ISO date strings.
 * Positive = moved forward, negative = moved backward.
 * Returns null if either value is not a valid date (e.g. "C" or "U").
 */
function daysDiff(current: string, previous: string): number | null {
  if (!current || !previous) return null;
  // Skip special values
  if (current === 'C' || current === 'U' || previous === 'C' || previous === 'U') return null;
  const cur = new Date(current);
  const prev = new Date(previous);
  if (isNaN(cur.getTime()) || isNaN(prev.getTime())) return null;
  return Math.round((cur.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
}

function ChangeBadge({ days, locale }: { days: number | null; locale: string }) {
  if (days === null || days === 0) return null;

  const isForward = days > 0;
  const absDays = Math.abs(days);

  const label = locale === 'zh'
    ? `${isForward ? '+' : '-'}${absDays}天`
    : `${isForward ? '+' : '-'}${absDays}d`;

  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1.5 ${
        isForward
          ? 'bg-green-50 text-green-700'
          : 'bg-red-50 text-red-700'
      }`}
    >
      {isForward ? '↑' : '↓'} {label}
    </span>
  );
}

function DateCell({
  value,
  previousValue,
  locale,
}: {
  value: string;
  previousValue?: string;
  locale: string;
}) {
  const t = useTranslations('tracker');
  const change = previousValue ? daysDiff(value, previousValue) : null;

  if (value === 'C') {
    return (
      <div className="flex items-center justify-center flex-wrap gap-0.5">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700">
          ● {t('current')}
        </span>
      </div>
    );
  }
  if (value === 'U') {
    return (
      <div className="flex items-center justify-center flex-wrap gap-0.5">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700">
          ✕ {t('unavailable')}
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center flex-wrap gap-0.5">
      <span className="text-xs whitespace-nowrap text-gray-600">{value}</span>
      <ChangeBadge days={change} locale={locale} />
    </div>
  );
}

export default function PriorityDateTable({
  data,
  previousData,
  type = 'finalAction',
  title,
}: PriorityDateTableProps) {
  const t = useTranslations('tracker');
  const locale = useLocale();

  if (!data) {
    return (
      <div className="text-sm text-gray-400 py-4 text-center">{t('noData')}</div>
    );
  }

  const tableTitle = title ?? (type === 'finalAction' ? t('finalAction') : t('datesForFiling'));

  const chargeabilityKeys = ['allChargeability', 'china', 'india', 'mexico', 'philippines'] as const;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold text-gray-800">{tableTitle}</p>
          {previousData && (
            <p className="text-[11px] text-teal-600 font-medium mt-0.5">
              {locale === 'zh' ? '• 含变动对比' : '• with changes vs previous month'}
            </p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm" aria-label={tableTitle}>
          <caption className="sr-only">{tableTitle}</caption>
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 border-b border-gray-100 whitespace-nowrap">
                {t('category')}
              </th>
              <th className="text-center px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 border-b border-gray-100 whitespace-nowrap">
                {t('allChargeability')}
              </th>
              <th className="text-center px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 border-b border-gray-100">
                {t('china')}
              </th>
              <th className="text-center px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 border-b border-gray-100">
                {t('india')}
              </th>
              <th className="text-center px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 border-b border-gray-100">
                {t('mexico')}
              </th>
              <th className="text-center px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 border-b border-gray-100">
                {t('philippines')}
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([category, row]) => {
              const prevRow = previousData?.[category];
              return (
                <tr
                  key={category}
                  className="border-b border-gray-50 last:border-0 hover:bg-teal-50 transition-colors"
                >
                  <td className="px-4 py-3 font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                      {category}
                    </div>
                  </td>
                  {chargeabilityKeys.map((key) => (
                    <td key={key} className="px-4 py-3 text-center">
                      <DateCell
                        value={row[key]}
                        previousValue={prevRow?.[key]}
                        locale={locale}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
