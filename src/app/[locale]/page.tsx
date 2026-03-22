import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-xl mb-8 text-blue-100">{t('hero.subtitle')}</p>
        <Link
          href="/visa/h1b"
          className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          {t('hero.cta')}
        </Link>
      </section>

      {/* Visa Types */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['opt', 'stem-opt', 'h1b', 'h4', 'perm', 'green-card'].map((visa) => (
            <Link
              key={visa}
              href={`/visa/${visa}`}
              className="border rounded-lg p-6 text-center hover:shadow-md hover:border-blue-500 transition"
            >
              <span className="text-lg font-semibold uppercase">{visa.replace('-', ' ')}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
