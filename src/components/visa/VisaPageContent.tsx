import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import visaDataMap from '@/data/visa-info';
import FAQAccordion from './FAQAccordion';

interface VisaPageContentProps {
  locale: string;
  slug: string;
}

// Key stats per visa type for the header card
const visaStats: Record<string, { label: string; value: string }[]> = {
  opt: [
    { label: 'Duration', value: '12 months' },
    { label: 'Extension', value: '+24 mo STEM' },
    { label: 'Form', value: 'I-765' },
  ],
  'stem-opt': [
    { label: 'Duration', value: '24 months' },
    { label: 'Base OPT', value: '12 months' },
    { label: 'Form', value: 'I-765' },
  ],
  h1b: [
    { label: 'Initial', value: '3 years' },
    { label: 'Max', value: '6+ years' },
    { label: 'Cap', value: '65,000 + 20,000' },
  ],
  h4: [
    { label: 'Tied to', value: 'H-1B holder' },
    { label: 'EAD', value: 'I-140 approved' },
    { label: 'Form', value: 'I-539' },
  ],
  perm: [
    { label: 'Processing', value: '6–18 months' },
    { label: 'Agency', value: 'DOL' },
    { label: 'Form', value: 'ETA-9089' },
  ],
  'green-card': [
    { label: 'Valid', value: '10 years' },
    { label: 'Categories', value: 'EB-1 to EB-5' },
    { label: 'Form', value: 'I-485 / DS-260' },
  ],
};

const visaStatsZh: Record<string, { label: string; value: string }[]> = {
  opt: [
    { label: '有效期', value: '12个月' },
    { label: 'STEM延期', value: '+24个月' },
    { label: '表格', value: 'I-765' },
  ],
  'stem-opt': [
    { label: '有效期', value: '24个月' },
    { label: '基础OPT', value: '12个月' },
    { label: '表格', value: 'I-765' },
  ],
  h1b: [
    { label: '初始期', value: '3年' },
    { label: '最长', value: '6年以上' },
    { label: '名额上限', value: '65,000 + 20,000' },
  ],
  h4: [
    { label: '依附于', value: 'H-1B持有人' },
    { label: 'EAD条件', value: 'I-140已批' },
    { label: '表格', value: 'I-539' },
  ],
  perm: [
    { label: '审理周期', value: '6–18个月' },
    { label: '主管机构', value: '劳工部' },
    { label: '表格', value: 'ETA-9089' },
  ],
  'green-card': [
    { label: '有效期', value: '10年' },
    { label: '类别', value: 'EB-1至EB-5' },
    { label: '表格', value: 'I-485 / DS-260' },
  ],
};

export default async function VisaPageContent({ locale, slug }: VisaPageContentProps) {
  const data = visaDataMap[slug];
  if (!data) notFound();

  const content = locale === 'zh' ? data.zh : data.en;
  const t = await getTranslations({ locale, namespace: 'visa' });
  const stats = locale === 'zh' ? (visaStatsZh[slug] ?? []) : (visaStats[slug] ?? []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href={`/${locale}`} className="hover:text-teal-600 transition-colors">
            {locale === 'zh' ? '首页' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{content.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main column */}
          <div>
            {/* Gradient header card */}
            <div className="relative bg-gradient-to-br from-teal-700 to-teal-600 text-white rounded-2xl p-8 mb-6 overflow-hidden shadow-lg">
              <div className="absolute right-0 top-0 text-[100px] font-black text-white/[0.06] leading-none pointer-events-none select-none uppercase">
                {slug.replace('-', '')}
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs font-semibold mb-3">
                <span className="w-[7px] h-[7px] rounded-full bg-emerald-300" />
                {locale === 'zh' ? '非移民/移民签证' : 'Visa Information'}
              </div>
              <h1 className="text-[36px] font-extrabold tracking-tight leading-tight mb-2">
                {content.title}
              </h1>
              <p className="text-[15px] text-white/85 mb-5">{content.subtitle}</p>
              {stats.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white/12 rounded-xl px-4 py-2.5">
                      <p className="text-[11px] text-white/70 font-semibold uppercase tracking-wide">
                        {s.label}
                      </p>
                      <p className="text-[16px] font-bold mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-base">
                  📖
                </div>
                <h2 className="text-[15px] font-bold text-gray-800">{t('overview')}</h2>
              </div>
              <div className="px-5 py-5">
                <p className="text-sm text-gray-600 leading-relaxed">{content.overview}</p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-base">
                  ✅
                </div>
                <h2 className="text-[15px] font-bold text-gray-800">{t('eligibility')}</h2>
              </div>
              <div className="px-5 py-2">
                {content.eligibility.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start py-3 border-b border-gray-50 last:border-0 last:pb-3"
                  >
                    <div className="w-[22px] h-[22px] rounded-full bg-green-50 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-0.5">
                        {item.requirement}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-base">
                  🗂️
                </div>
                <h2 className="text-[15px] font-bold text-gray-800">{t('processSteps')}</h2>
              </div>
              <div className="px-5 py-5">
                <div className="relative pl-7">
                  <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal-600 to-teal-100 rounded-full" />
                  {content.processSteps.map((step, i) => (
                    <div
                      key={i}
                      className={`relative pb-6 ${i === content.processSteps.length - 1 ? 'pb-0' : ''}`}
                    >
                      <div className="absolute -left-7 top-0.5 w-[22px] h-[22px] rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_4px_#ccfbf1]">
                        {step.stepNumber}
                      </div>
                      <div className="flex items-baseline justify-between mb-1 gap-3">
                        <p className="text-sm font-bold text-gray-800">{step.title}</p>
                        {step.estimatedTime && (
                          <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                            {step.estimatedTime}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-base">
                  🕐
                </div>
                <h2 className="text-[15px] font-bold text-gray-800">{t('timeline')}</h2>
              </div>
              <div className="px-5 py-5">
                <p className="text-sm text-gray-600 leading-relaxed">{content.timeline}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('faqs')}</h2>
              <FAQAccordion items={content.faqs} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 border-b border-gray-100 flex items-center gap-2 text-sm font-bold text-gray-700">
                <span>⚡</span>
                {locale === 'zh' ? '关键数据' : 'Key Stats'}
              </div>
              <div className="px-4 py-1">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0 text-sm"
                  >
                    <span className="text-gray-400">{s.label}</span>
                    <span className="text-teal-600 font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 border-b border-gray-100 flex items-center gap-2 text-sm font-bold text-gray-700">
                <span>🔗</span>
                {locale === 'zh' ? '相关签证' : 'Related Visas'}
              </div>
              <div className="px-4 py-3 flex flex-col gap-1">
                {Object.keys(visaDataMap)
                  .filter((s) => s !== slug)
                  .slice(0, 4)
                  .map((s) => {
                    const label =
                      locale === 'zh'
                        ? visaDataMap[s].zh.title
                        : visaDataMap[s].en.title;
                    return (
                      <Link
                        key={s}
                        href={`/${locale}/visa/${s}`}
                        className="text-sm text-gray-500 hover:text-teal-600 transition-colors py-1.5 border-b border-gray-50 last:border-0 flex items-center justify-between group"
                      >
                        <span>{label}</span>
                        <span className="text-gray-300 group-hover:text-teal-500 transition-colors">→</span>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {(slug === 'perm' || slug === 'green-card') && (
              <Link
                href={`/${locale}/tracker`}
                className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl p-5 no-underline block hover:-translate-y-0.5 transition-transform shadow-md"
              >
                <p className="text-[13px] font-bold text-white/80 uppercase tracking-wide mb-1">
                  {locale === 'zh' ? '追踪您的排期' : 'Track Your Date'}
                </p>
                <p className="text-base font-bold">
                  {locale === 'zh' ? '查看最新优先排期日期 →' : 'View Latest Priority Dates →'}
                </p>
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
