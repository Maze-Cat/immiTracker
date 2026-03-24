import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getLatestBulletin } from '@/lib/visa-bulletin/store';
import { ensureBulletinData } from '@/lib/visa-bulletin/auto-fetch';

export const revalidate = 3600;

/** Format an ISO date like "2019-06-08" into a locale-aware display string */
function formatPriorityDate(isoDate: string, locale: string, currentLabel: string, unavailableLabel: string): string {
  if (isoDate === 'C') return currentLabel;
  if (isoDate === 'U') return unavailableLabel;
  try {
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

interface VisaCardConfig {
  slug: string;
  tKey: 'opt' | 'stemOpt' | 'h1b' | 'h4' | 'l1' | 'b1b2' | 'greenCard' | 'niw' | 'perm';
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
    slug: 'l1',
    tKey: 'l1',
    emoji: '🏢',
    code: 'L-1',
    tagClass: 'bg-indigo-50 text-indigo-700',
    topBar: 'from-indigo-600 to-indigo-400',
  },
  {
    slug: 'b1b2',
    tKey: 'b1b2',
    emoji: '✈️',
    code: 'B-1/B-2',
    tagClass: 'bg-rose-50 text-rose-700',
    topBar: 'from-rose-500 to-rose-400',
  },
  {
    slug: 'green-card',
    tKey: 'greenCard',
    emoji: '🇺🇸',
    code: 'Green Card',
    tagClass: 'bg-purple-50 text-purple-700',
    topBar: 'from-purple-600 to-purple-400',
  },
  {
    slug: 'niw',
    tKey: 'niw',
    emoji: '🎯',
    code: 'NIW',
    tagClass: 'bg-amber-50 text-amber-700',
    topBar: 'from-amber-500 to-amber-400',
  },
  {
    slug: 'perm',
    tKey: 'perm',
    emoji: '📋',
    code: 'PERM',
    tagClass: 'bg-emerald-50 text-emerald-700',
    topBar: 'from-emerald-600 to-emerald-400',
  },
];

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  // In dev mode, auto-fetch bulletin if store is empty (avoids manual curl after restart)
  await ensureBulletinData();
  const bulletin = await getLatestBulletin();
  const eb = bulletin?.employmentBased?.finalActionDates;

  const currentLabel = commonT('current');
  const unavailableLabel = commonT('unavailable');

  const eb2ChinaDate = eb?.['EB2']?.china ?? 'U';
  const eb3ChinaDate = eb?.['EB3']?.china ?? 'U';
  const eb2IndiaDate = eb?.['EB2']?.india ?? 'U';

  // bulletinMonth is already like "April 2026", no need to append year
  const bulletinLabel = bulletin?.bulletinMonth ?? '';

  // Dynamic announcement text
  const announcementText = bulletin
    ? t('hero.announcementTemplate', { month: bulletinLabel, date: formatPriorityDate(eb2ChinaDate, locale, currentLabel, unavailableLabel) })
    : t('hero.loadingAnnouncement');

  const livePillText = bulletin
    ? t('hero.livePillTemplate', { month: bulletinLabel })
    : commonT('loading');

  // Build live data cards config
  const liveCards = [
    {
      emoji: '🇨🇳',
      iconBg: 'bg-teal-50',
      badgeBg: 'bg-teal-50 text-teal-700',
      label: t('hero.eb2China'),
      date: formatPriorityDate(eb2ChinaDate, locale, currentLabel, unavailableLabel),
      subLabel: t('hero.chartA'),
    },
    {
      emoji: '🇨🇳',
      iconBg: 'bg-orange-50',
      badgeBg: 'bg-orange-50 text-orange-700',
      label: t('hero.eb3China'),
      date: formatPriorityDate(eb3ChinaDate, locale, currentLabel, unavailableLabel),
      subLabel: t('hero.chartA'),
    },
    {
      emoji: '🇮🇳',
      iconBg: 'bg-purple-50',
      badgeBg: 'bg-purple-50 text-purple-700',
      label: t('hero.eb2Label'),
      date: formatPriorityDate(eb2IndiaDate, locale, currentLabel, unavailableLabel),
      subLabel: t('hero.chartA'),
    },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-[13px] py-2 px-4 flex items-center justify-center gap-2.5">
        <span className="bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0">
          {t('announcementBadge')}
        </span>
        <span>{announcementText}</span>
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
              {livePillText}
            </div>

            <h1 className="text-[46px] leading-[1.15] font-extrabold tracking-tight text-gray-800 mb-5">
              {t('hero.title')}{' '}
              <span className="text-teal-600">{t('hero.titleAccent')}</span>
            </h1>
            <p className="text-[17px] text-gray-500 leading-relaxed max-w-[520px] mb-9">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#visa-types"
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold text-[15px] px-7 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(13,148,136,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(13,148,136,0.5)] transition-all no-underline"
              >
                {t('hero.ctaPrimary')}
              </a>
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
            {bulletin ? (
              liveCards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-md flex gap-3.5 items-start hover:-translate-y-0.5 transition-transform">
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {card.emoji}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      {t('hero.liveDataLabel')}
                    </p>
                    <p className="text-[15px] font-bold text-gray-800 mt-0.5">{card.label}</p>
                    <p className="text-[13px] text-gray-500">{card.date} · {card.subLabel}</p>
                    <span className={`inline-flex items-center gap-1 mt-1.5 ${card.badgeBg} text-[11px] font-bold px-2.5 py-0.5 rounded-full`}>
                      {bulletinLabel}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-md text-center text-gray-400 text-sm">
                {t('hero.loadingBulletin')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visa Cards Grid */}
      <section id="visa-types" className="bg-white py-[72px] px-4 scroll-mt-16">
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
            ].map((f, idx) => (
              <div
                key={idx}
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
            <a
              href="#visa-types"
              className="bg-transparent text-white font-semibold text-[15px] px-7 py-3 rounded-xl border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all no-underline"
            >
              {t('cta.secondary')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
