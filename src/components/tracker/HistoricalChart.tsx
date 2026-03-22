'use client';
import { useTranslations } from 'next-intl';

export default function HistoricalChart() {
  const t = useTranslations('tracker');

  // Placeholder bar heights (0–100) for visual effect
  const bars = [30, 35, 32, 38, 36, 42, 40, 45, 44, 50, 48, 55];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-start justify-between border-b border-gray-100">
        <div>
          <p className="text-[15px] font-bold text-gray-800">{t('historicalTrends')}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">{t('historicalTrendsDesc')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
            ↑ +2 mo avg
          </span>
        </div>
      </div>

      <div className="px-5 py-5">
        {/* Legend */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-teal-700 to-teal-400" />
            {t('eb2India')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            {t('eb3India')}
          </div>
        </div>

        {/* Bar chart placeholder */}
        <div className="relative h-40 flex items-end gap-1.5 border-b-2 border-gray-100 pb-0">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md transition-opacity ${
                i === bars.length - 1
                  ? 'bg-gradient-to-t from-orange-600 to-orange-400 opacity-100'
                  : 'bg-gradient-to-t from-teal-700 to-teal-400 opacity-70 hover:opacity-100'
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex gap-1.5 mt-2">
          {months.map((m) => (
            <div key={m} className="flex-1 text-[10px] text-gray-400 text-center">
              {m}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          {t('chartComingSoon')}
        </p>
      </div>
    </div>
  );
}
