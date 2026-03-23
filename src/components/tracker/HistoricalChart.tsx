'use client';
import { useTranslations } from 'next-intl';

export default function HistoricalChart() {
  const t = useTranslations('tracker');

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">{t('historicalTrends')}</h2>
      <div className="border rounded-lg p-8 text-center text-gray-400 bg-gray-50">
        {/* TODO: Integrate charting library (e.g. Recharts) with historical KV data */}
        <p>Historical trend chart coming soon</p>
      </div>
    </div>
  );
}
