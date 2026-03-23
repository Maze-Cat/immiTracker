import { getTranslations } from 'next-intl/server';
import TrackerClient from '@/components/tracker/TrackerClient';

export const revalidate = 3600; // ISR: revalidate every hour

interface TrackerPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TrackerPage({ params }: TrackerPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tracker' });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            {t('autoUpdated')}
          </div>
          <h1 className="text-[36px] font-extrabold tracking-tight mb-2">{t('title')}</h1>
          <p className="text-white/80 text-[16px] max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <TrackerClient />
      </div>
    </div>
  );
}
