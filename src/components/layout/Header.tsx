'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const visaLinks = [
  { key: 'opt', slug: 'opt' },
  { key: 'stemOpt', slug: 'stem-opt' },
  { key: 'h1b', slug: 'h1b' },
  { key: 'h4', slug: 'h4' },
  { key: 'perm', slug: 'perm' },
  { key: 'greenCard', slug: 'green-card' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center gap-8">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 flex-shrink-0 no-underline">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-lg shadow-[0_2px_8px_rgba(13,148,136,0.3)]">
            IT
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              ImmiTracker
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-0.5">
              {t('tagline')}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          <Link
            href={`/${locale}/tracker`}
            className="text-sm font-medium text-gray-500 px-3.5 py-1.5 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
          >
            {t('tracker')}
          </Link>

          {/* Visa dropdown */}
          <div className="relative group">
            <button
              className="text-sm font-medium text-gray-500 px-3.5 py-1.5 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-1 cursor-pointer border-none bg-transparent"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setDropdownOpen(false);
                }
              }}
            >
              {t('visa')}
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-44 z-50 ${dropdownOpen ? 'block' : 'hidden group-hover:block group-focus-within:block'}`}>
              {visaLinks.map(({ key, slug }) => (
                <Link
                  key={slug}
                  href={`/${locale}/visa/${slug}`}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.parentElement?.parentElement?.contains(e.relatedTarget)) {
                      setDropdownOpen(false);
                    }
                  }}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2.5">
          {/* Language toggle */}
          <div className="flex bg-gray-100 rounded-lg p-[3px] gap-0.5">
            <button
              onClick={toggleLocale}
              className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
                locale === 'en'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={toggleLocale}
              className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
                locale === 'zh'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              中文
            </button>
          </div>

          {/* CTA */}
          <Link
            href={`/${locale}/tracker`}
            className="hidden sm:inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-4 py-2 rounded-[9px] shadow-[0_2px_8px_rgba(249,115,22,0.35)] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all no-underline"
          >
            {t('trackDates')}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-teal-600 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          <Link
            href={`/${locale}/tracker`}
            className="text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700"
            onClick={() => setMobileOpen(false)}
          >
            {t('tracker')}
          </Link>
          {visaLinks.map(({ key, slug }) => (
            <Link
              key={slug}
              href={`/${locale}/visa/${slug}`}
              className="text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setMobileOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
