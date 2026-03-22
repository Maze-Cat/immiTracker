import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

interface VisaCardConfig {
  slug: string;
  tKey: 'opt' | 'stemOpt' | 'h1b' | 'h4' | 'perm' | 'greenCard';
  emoji: string;
  code: string;
  tagClass: string;
  topBar: string;
}

const visaCardData: VisaCardConfig[] = [
  {
    slug: 'opt',
    tKey: 'opt',
    emoji: '🎓',
    code: 'OPT',
    tagClass: 'bg-blue-50 text-blue-700',
    topBar: 'from-blue-500 to-blue-400',
  },
  {
    slug: 'stem-opt',
    tKey: 'stemOpt',
    emoji: '🔬',
    code: 'STEM OPT',
    tagClass: 'bg-blue-50 text-blue-700',
    topBar: 'from-blue-500 to-blue-400',
  },
  {
    slug: 'h1b',
    tKey: 'h1b',
    emoji: '💼',
    code: 'H-1B',
    tagClass: 'bg-teal-50 text-teal-700',
    topBar: 'from-teal-600 to-teal-400',
  },
  {
    slug: 'h4',
    tKey: 'h4',
    emoji: '👨‍👩‍👧',
    code: 'H-4',
    tagClass: 'bg-orange-50 text-orange-700',
    topBar: 'from-orange-500 to-yellow-400',
  },
  {
    slug: 'perm',
    tKey: 'perm',
    emoji: '📋',
    code: 'PERM',
    tagClass: 'bg-purple-50 text-purple-700',
    topBar: 'from-purple-600 to-purple-400',
  },
  {
    slug: 'green-card',
    tKey: 'greenCard',
    emoji: '🇺🇸',
    code: 'Green Card',
    tagClass: 'bg-purple-50 text-purple-700',
    topBar: 'from-purple-600 to-purple-400',
  },
];

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-[13px] py-2 px-4 flex items-center justify-center gap-2.5">
        <span className="bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0">
          {t('announcementBadge')}
        </span>
        <span>{t('announcementBar')}</span>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-50 via-teal-50 to-orange-50 overflow-hidden py-20 px-4">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-20 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-28 -left-14 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 items-center">
          {/* Left */}
          <div>
            {/* Live pill */}
            <div className="inline-flex items-center gap-2 bg-white border border-teal-100 rounded-full px-3.5 py-1.5 text-xs font-semibold text-teal-700 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              {t('hero.livePill')}
            </div>

            <h1 className="text-[46px] leading-[1.15] font-extrabold tracking-tight text-gray-800 mb-5">
              {t('hero.title')}{' '}
              <span className="text-teal-600">{t('hero.titleAccent')}</span>
            </h1>
            <p className="text-[17px] text-gray-500 leading-relaxed max-w-[520px] mb-9">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href={`/${locale}/visa/h1b`}
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold text-[15px] px-7 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(13,148,136,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(13,148,136,0.5)] transition-all no-underline"
              >
                {t('hero.ctaPrimary')}
              </Link>
              <Link
                href={`/${locale}/tracker`}
                className="bg-white text-gray-700 font-semibold text-[15px] px-7 py-3.5 rounded-xl border border-gray-200 shadow-sm hover:border-teal-500 hover:text-teal-600 hover:-translate-y-px transition-all no-underline"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex">
                {[
                  { bg: 'bg-purple-600', label: 'A' },
                  { bg: 'bg-teal-600', label: 'B' },
                  { bg: 'bg-orange-500', label: 'C' },
                  { bg: 'bg-green-600', label: 'D' },
                ].map((av, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${av.bg} border-2 border-white flex items-center justify-center text-white text-[11px] font-bold ${i > 0 ? '-ml-2' : ''}`}
                  >
                    {av.label}
                  </div>
                ))}
              </div>
              <span className="text-[13px] text-gray-500">
                <strong className="text-gray-700">5,000+</strong> {t('hero.socialProof')}
              </span>
            </div>
          </div>

          {/* Right — live data preview cards */}
          <div className="flex flex-col gap-3.5">
            {/* Card 1: EB-2 India */}
            <div className="bg-white rounded-2xl p-4 shadow-md flex gap-3.5 items-start hover:-translate-y-0.5 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-2xl flex-shrink-0">
                📅
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                  {t('hero.liveDataLabel')}
                </p>
                <p className="text-[15px] font-bold text-gray-800 mt-0.5">{t('hero.eb2Label')}</p>
                <p className="text-[13px] text-gray-500">Jan 1, 2013 · Final Action</p>
                <span className="inline-flex items-center gap-1 mt-1.5 bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  ↑ +2 months vs last bulletin
                </span>
              </div>
            </div>

            {/* Card 2: EB-3 India */}
            <div className="bg-white rounded-2xl p-4 shadow-md flex gap-3.5 items-start hover:-translate-y-0.5 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0">
                📊
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                  {t('hero.liveDataLabel')}
                </p>
                <p className="text-[15px] font-bold text-gray-800 mt-0.5">{t('hero.eb3Label')}</p>
                <p className="text-[13px] text-gray-500">Jan 1, 2012 · Final Action</p>
                <span className="inline-flex items-center gap-1 mt-1.5 bg-orange-50 text-orange-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  ↑ +1 month vs last bulletin
                </span>
              </div>
            </div>

            {/* Card 3: EB-2 China */}
            <div className="bg-white rounded-2xl p-4 shadow-md flex gap-3.5 items-start hover:-translate-y-0.5 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-2xl flex-shrink-0">
                🌐
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                  {t('hero.liveDataLabel')}
                </p>
                <p className="text-[15px] font-bold text-gray-800 mt-0.5">{t('hero.eb2China')}</p>
                <p className="text-[13px] text-gray-500">Jun 8, 2019 · Final Action</p>
                <span className="inline-flex items-center gap-1 mt-1.5 bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {t('hero.asOfLabel')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Cards Grid */}
      <section className="bg-white py-[72px] px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-teal-600 mb-2">
            {t('visaSection.eyebrow')}
          </p>
          <h2 className="text-[32px] font-extrabold tracking-tight text-gray-800 mb-2">
            {t('visaSection.title')}
          </h2>
          <p className="text-[16px] text-gray-500 mb-10 max-w-[520px]">
            {t('visaSection.subtitle')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {visaCardData.map(({ slug, tKey, emoji, code, tagClass, topBar }) => (
              <Link
                key={slug}
                href={`/${locale}/visa/${slug}`}
                className="group relative bg-white border border-gray-200 rounded-2xl p-5 overflow-hidden hover:border-teal-500 hover:shadow-md hover:-translate-y-0.5 transition-all no-underline"
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${topBar}`} />
                <div className="text-[26px] mb-3">{emoji}</div>
                <p className="text-[18px] font-extrabold text-gray-800 mb-1 tracking-tight">
                  {code}
                </p>
                <p className="text-[12px] text-gray-500 mb-3 leading-snug line-clamp-2">
                  {t(`visaCards.${tKey}.name`)}
                </p>
                <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full ${tagClass}`}>
                  {t(`visaCards.${tKey}.tag`)}
                </span>
                <span className="absolute bottom-3.5 right-4 text-gray-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all text-[16px]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-[72px] px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-teal-600 mb-2">
            {t('features.eyebrow')}
          </p>
          <h2 className="text-[32px] font-extrabold tracking-tight text-gray-800 mb-12">
            {t('features.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📚',
                iconBg: 'bg-teal-50',
                title: t('features.visaInfo'),
                desc: t('features.visaInfoDesc'),
              },
              {
                icon: '📈',
                iconBg: 'bg-orange-50',
                title: t('features.tracker'),
                desc: t('features.trackerDesc'),
              },
              {
                icon: '🌐',
                iconBg: 'bg-purple-50',
                title: t('features.bilingual'),
                desc: t('features.bilingualDesc'),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {f.icon}
                </div>
                <h3 className="text-[16px] font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 py-16 px-4 text-center overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-[32px] font-extrabold text-white mb-3 tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-[16px] text-white/80 mb-7">{t('cta.subtitle')}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href={`/${locale}/tracker`}
              className="bg-white text-teal-700 font-bold text-[15px] px-7 py-3 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all no-underline"
            >
              {t('cta.primary')}
            </Link>
            <Link
              href={`/${locale}/visa/h1b`}
              className="bg-transparent text-white font-semibold text-[15px] px-7 py-3 rounded-xl border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all no-underline"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
