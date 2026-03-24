import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import visaDataMap from '@/data/visa-info';
import VisaPageContent from '@/components/visa/VisaPageContent';

interface VisaPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = ['opt', 'stem-opt', 'h1b', 'h4', 'perm', 'green-card', 'l1', 'b1b2', 'niw'];
  const locales = ['en', 'zh'];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: VisaPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = visaDataMap[slug];
  if (!data) return {};
  const content = locale === 'zh' ? data.zh : data.en;
  return {
    title: `${content.title} — ImmiTracker`,
    description: content.subtitle,
  };
}

export default async function VisaPage({ params }: VisaPageProps) {
  const { locale, slug } = await params;
  if (!visaDataMap[slug]) notFound();
  return <VisaPageContent locale={locale} slug={slug} />;
}
