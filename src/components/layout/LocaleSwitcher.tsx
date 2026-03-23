'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className="border border-white/40 px-3 py-1 rounded text-sm hover:bg-white/10 transition"
    >
      {locale === 'en' ? '中文' : 'English'}
    </button>
  );
}
