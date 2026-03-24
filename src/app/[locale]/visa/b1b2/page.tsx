import VisaPageContent from '@/components/visa/VisaPageContent';
import type { Metadata } from 'next';
import visaDataMap from '@/data/visa-info';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const data = visaDataMap['b1b2'];
  const content = locale === 'zh' ? data.zh : data.en;
  return { title: `${content.title} — ImmiTracker`, description: content.subtitle };
}

export default async function B1B2Page({ params }: Props) {
  const { locale } = await params;
  return <VisaPageContent locale={locale} slug="b1b2" />;
}
