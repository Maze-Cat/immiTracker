'use client';
import { useTranslations } from 'next-intl';
import type { CategoryTable } from '@/types/visa-bulletin';

interface PriorityDateTableProps {
  data?: CategoryTable;
  type?: 'finalAction' | 'datesForFiling';
}

export default function PriorityDateTable({ data, type = 'finalAction' }: PriorityDateTableProps) {
  const t = useTranslations('tracker');

  if (!data) {
    return <p className="text-gray-500">{t('lastUpdated')}: —</p>;
  }

  return (
    <div className="overflow-x-auto mb-8">
      <h2 className="text-xl font-semibold mb-3">
        {type === 'finalAction' ? t('finalAction') : t('datesForFiling')}
      </h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-blue-700 px-3 py-2 text-left">{t('category')}</th>
            <th className="border border-blue-700 px-3 py-2">{t('allChargeability')}</th>
            <th className="border border-blue-700 px-3 py-2">{t('china')}</th>
            <th className="border border-blue-700 px-3 py-2">{t('india')}</th>
            <th className="border border-blue-700 px-3 py-2">{t('mexico')}</th>
            <th className="border border-blue-700 px-3 py-2">{t('philippines')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([category, row], i) => (
            <tr key={category} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
              <td className="border border-gray-200 px-3 py-2 font-medium">{category}</td>
              <td className="border border-gray-200 px-3 py-2 text-center">{row.allChargeability}</td>
              <td className="border border-gray-200 px-3 py-2 text-center">{row.china}</td>
              <td className="border border-gray-200 px-3 py-2 text-center">{row.india}</td>
              <td className="border border-gray-200 px-3 py-2 text-center">{row.mexico}</td>
              <td className="border border-gray-200 px-3 py-2 text-center">{row.philippines}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
