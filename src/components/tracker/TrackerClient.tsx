'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import PriorityDateTable from './PriorityDateTable';
import HistoricalChart from './HistoricalChart';
import type { VisaBulletin } from '@/types/visa-bulletin';

type TableMode = 'finalAction' | 'datesForFiling';
type SectionMode = 'employment' | 'family';

export default function TrackerClient() {
  const t = useTranslations('tracker');
  const [bulletin, setBulletin] = useState<VisaBulletin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tableMode, setTableMode] = useState<TableMode>('finalAction');
  const [section, setSection] = useState<SectionMode>('employment');

  useEffect(() => {
    fetch('/api/visa-bulletin/current')
      .then((r) => {
        if (!r.ok) throw new Error('non-ok');
        return r.json();
      })
      .then((data: VisaBulletin) => {
        setBulletin(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !bulletin) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
        <p className="text-red-600 font-semibold">{t('error')}</p>
      </div>
    );
  }

  const ebData =
    tableMode === 'finalAction'
      ? bulletin.employmentBased.finalActionDates
      : bulletin.employmentBased.datesForFiling;

  const fbData =
    tableMode === 'finalAction'
      ? bulletin.familyBased.finalActionDates
      : bulletin.familyBased.datesForFiling;

  return (
    <div>
      {/* Bulletin badge + meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full">
          {t('bulletinMonth')}: {bulletin.bulletinMonth} {bulletin.bulletinYear}
        </span>
        <span className="text-xs text-gray-400">
          {t('lastUpdated')}: {new Date(bulletin.fetchedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Tab switcher — table mode */}
      <div className="flex bg-gray-100 rounded-xl p-1 w-fit mb-6 gap-0.5">
        {(['finalAction', 'datesForFiling'] as TableMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setTableMode(mode)}
            className={`px-4 py-2 rounded-[9px] text-[13px] font-semibold transition-all ${
              tableMode === mode
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {mode === 'finalAction' ? t('finalAction') : t('datesForFiling')}
          </button>
        ))}
      </div>

      {/* Section switcher — EB vs FB */}
      <div className="flex gap-2 mb-5">
        {(['employment', 'family'] as SectionMode[]).map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border-[1.5px] transition-all ${
              section === s
                ? 'border-teal-600 text-teal-600 bg-teal-50'
                : 'border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600'
            }`}
          >
            {s === 'employment' ? t('employmentBased') : t('familyBased')}
          </button>
        ))}
      </div>

      {/* Tables */}
      {section === 'employment' && (
        <PriorityDateTable
          data={ebData}
          type={tableMode}
          title={t('employmentBased')}
        />
      )}
      {section === 'family' && (
        <PriorityDateTable
          data={fbData}
          type={tableMode}
          title={t('familyBased')}
        />
      )}

      {/* Historical chart */}
      <div className="mt-8">
        <HistoricalChart />
      </div>
    </div>
  );
}
