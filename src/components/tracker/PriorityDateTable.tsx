'use client';
import { useTranslations } from 'next-intl';
import type { CategoryTable } from '@/types/visa-bulletin';

interface PriorityDateTableProps {
  data?: CategoryTable;
  type?: 'finalAction' | 'datesForFiling';
  title?: string;
}

function DateCell({ value }: { value: string }) {
  const t = useTranslations('tracker');
  if (value === 'C') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700">
        ● {t('current')}
      </span>
    );
  }
  if (value === 'U') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700">
        ✕ {t('unavailable')}
      </span>
    );
  }
  return <span className="text-xs whitespace-nowrap text-gray-600">{value}</span>;
}

export default function PriorityDateTable({
  data,
  type = 'finalAction',
  title,
}: PriorityDateTableProps) {
  const t = useTranslations('tracker');

  if (!data) {
    return (
      <div className="text-sm text-gray-400 py-4 text-center">{t('noData')}</div>
    );
  }

  const tableTitle = title ?? (type === 'finalAction' ? t('finalAction') : t('datesForFiling'));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold text-gray-800">{tableTitle}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">
            {type === 'finalAction'
              ? t('finalAction')
              : t('datesForFiling')}
          </p>
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
            {Object.entries(data).map(([category, row], i) => (
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
                <td className="px-4 py-3 text-center">
                  <DateCell value={row.allChargeability} />
                </td>
                <td className="px-4 py-3 text-center">
                  <DateCell value={row.china} />
                </td>
                <td className="px-4 py-3 text-center">
                  <DateCell value={row.india} />
                </td>
                <td className="px-4 py-3 text-center">
                  <DateCell value={row.mexico} />
                </td>
                <td className="px-4 py-3 text-center">
                  <DateCell value={row.philippines} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
