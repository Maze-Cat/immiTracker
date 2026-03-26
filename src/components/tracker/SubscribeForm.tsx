'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormStatus = 'idle' | 'loading' | 'success' | 'alreadySubscribed' | 'unsubscribeSuccess' | 'error';
type Variant = 'default' | 'dark';

export default function SubscribeForm({ variant = 'default' }: { variant?: Variant; compact?: boolean }) {
  const t = useTranslations('tracker.subscribe');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isDark = variant === 'dark';

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.status === 409) {
        setStatus('alreadySubscribed');
      } else if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  async function handleUnsubscribe() {
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('unsubscribeSuccess');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const isLoading = status === 'loading';
  const showForm = status === 'idle' || status === 'error' || status === 'alreadySubscribed';

  // Dark variant — designed to sit inside a teal gradient CTA section
  if (isDark) {
    return (
      <div>
        <h3 className="text-[18px] font-bold text-white mb-1.5 flex items-center justify-center gap-2">
          <span>🔔</span> {t('title')}
        </h3>
        <p className="text-[14px] text-white/70 mb-4 text-center">
          {t('description')}
        </p>
        {showForm ? (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error' || status === 'alreadySubscribed') setStatus('idle');
              }}
              placeholder={t('emailPlaceholder')}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-white text-teal-700 text-sm font-bold hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(0,0,0,0.12)] whitespace-nowrap"
            >
              {isLoading ? '...' : t('subscribeButton')}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm font-medium text-white">
              {status === 'success' && t('success')}
              {status === 'unsubscribeSuccess' && t('unsubscribeSuccess')}
            </p>
            <button
              onClick={() => { setStatus('idle'); setEmail(''); }}
              className="text-xs text-white/60 hover:text-white underline transition-colors"
            >
              &larr;
            </button>
          </div>
        )}
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-300 text-center">
            {!isValidEmail(email) ? t('invalidEmail') : t('error')}
          </p>
        )}
        {status === 'alreadySubscribed' && (
          <p className="mt-2 text-xs text-amber-300 text-center">{t('alreadySubscribed')}</p>
        )}
      </div>
    );
  }

  // Default variant — card style for tracker page
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-1">
        <span role="img" aria-label="bell">🔔</span> {t('title')}
      </h3>
      <p className="text-sm text-gray-500 mb-5">{t('description')}</p>

      {showForm ? (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error' || status === 'alreadySubscribed') setStatus('idle');
            }}
            placeholder={t('emailPlaceholder')}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '...' : t('subscribeButton')}
            </button>
            <button
              type="button"
              onClick={handleUnsubscribe}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:border-red-300 hover:text-red-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('unsubscribeButton')}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-3">
          <p
            className={`text-sm font-medium ${
              status === 'unsubscribeSuccess' ? 'text-gray-600' : 'text-teal-600'
            }`}
          >
            {status === 'success' && t('success')}
            {status === 'unsubscribeSuccess' && t('unsubscribeSuccess')}
          </p>
          <button
            onClick={() => { setStatus('idle'); setEmail(''); }}
            className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            &larr;
          </button>
        </div>
      )}

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">
          {!isValidEmail(email) ? t('invalidEmail') : t('error')}
        </p>
      )}
      {status === 'alreadySubscribed' && (
        <p className="mt-2 text-xs text-amber-600">{t('alreadySubscribed')}</p>
      )}
    </div>
  );
}
