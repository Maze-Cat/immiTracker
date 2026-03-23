'use client';
import { useTranslations } from 'next-intl';

interface BulletinDateDisplayProps {
  bulletinMonth?: string;
  fetchedAt?: string;
}

export default function BulletinDateDisplay({ bulletinMonth, fetchedAt }: BulletinDateDisplayProps) {
  const t = useTranslations('tracker');

  return (
    <div className="text-sm text-gray-500 mb-6">
      {bulletinMonth && <span className="font-medium text-gray-700">{bulletinMonth}</span>}
      {fetchedAt && (
        <span className="ml-4">
          {t('lastUpdated')}: {new Date(fetchedAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}
