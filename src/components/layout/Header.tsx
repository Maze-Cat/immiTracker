'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ImmiTracker
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/tracker" className="hover:text-blue-200 transition">{t('tracker')}</Link>
          <div className="relative group">
            <span className="cursor-pointer hover:text-blue-200 transition">{t('visa')}</span>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-lg py-2 w-40 z-10">
              {['opt', 'stem-opt', 'h1b', 'h4', 'perm', 'green-card'].map((visa) => (
                <Link key={visa} href={`/visa/${visa}`} className="block px-4 py-2 hover:bg-blue-50">
                  {visa.toUpperCase().replace('-', ' ')}
                </Link>
              ))}
            </div>
          </div>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
