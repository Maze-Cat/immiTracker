import { useTranslations } from 'next-intl';
import PriorityDateTable from '@/components/tracker/PriorityDateTable';
import HistoricalChart from '@/components/tracker/HistoricalChart';

export const revalidate = 3600; // ISR: revalidate every hour

export default function TrackerPage() {
  const t = useTranslations('tracker');

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-600 mb-8">{t('subtitle')}</p>
      <PriorityDateTable />
      <HistoricalChart />
    </main>
  );
}
