'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const visaLinks = [
  { label: 'OPT', slug: 'opt' },
  { label: 'STEM OPT', slug: 'stem-opt' },
  { label: 'H-1B', slug: 'h1b' },
  { label: 'H-4', slug: 'h4' },
  { label: 'L-1', slug: 'l1' },
  { label: 'B-1/B-2', slug: 'b1b2' },
  { label: 'Green Card', slug: 'green-card' },
];

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-base">
                IT
              </div>
              <span className="text-white font-extrabold text-lg">ImmiTracker</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              {t('tagline')}
            </p>
            <p className="text-xs mt-4 text-gray-600">
              {t('disclaimer')}
            </p>
          </div>

          {/* Visa links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('visaTypes')}</h4>
            <ul className="space-y-2">
              {visaLinks.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/visa/${slug}`}
                    className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t('resources')}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/tracker`}
                  className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                >
                  {t('priorityTracker')}
                </Link>
              </li>
              <li>
                <a
                  href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                >
                  USCIS Visa Bulletin
                </a>
              </li>
              <li>
                <a
                  href="https://uscis.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                >
                  USCIS.gov
                </a>
              </li>
              <li>
                <a
                  href="https://travel.state.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                >
                  U.S. Dept of State
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} ImmiTracker. {t('dataSource')}
          </p>
          <p className="text-xs text-gray-600">{t('notAffiliated')}</p>
        </div>
      </div>
    </footer>
  );
}
