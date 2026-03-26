'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// ---------------------------------------------------------------------------
// Star icon (inline SVG to avoid extra dependencies)
// ---------------------------------------------------------------------------

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main widget
// ---------------------------------------------------------------------------

type Status = 'idle' | 'loading' | 'success' | 'error' | 'rateLimit';

export default function FeedbackWidget() {
  const t = useTranslations('feedback');
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const resetForm = useCallback(() => {
    setRating(0);
    setHoveredStar(0);
    setMessage('');
    setStatus('idle');
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    // Reset after animation
    setTimeout(resetForm, 200);
  }, [resetForm]);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, message, locale }),
      });

      if (res.status === 429) {
        setStatus('rateLimit');
        return;
      }

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      // Auto-close after 2s
      setTimeout(handleClose, 2000);
    } catch {
      setStatus('error');
    }
  };

  const displayStar = (index: number) => {
    if (hoveredStar > 0) return index <= hoveredStar;
    return index <= rating;
  };

  const isLoading = status === 'loading';

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          aria-label={t('button')}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4.5 w-4.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {t('button')}
        </button>
      )}

      {/* Backdrop + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
        >
          <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {status === 'success' ? (
              /* ---------- Success state ---------- */
              <div className="flex flex-col items-center py-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-600" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t('successTitle')}</h3>
                <p className="mt-1 text-sm text-gray-500">{t('successMessage')}</p>
              </div>
            ) : (
              /* ---------- Form state ---------- */
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t('title')}</h2>
                <p className="mt-1 text-sm text-gray-400">{t('subtitle')}</p>

                {/* Star rating */}
                <div className="mt-6">
                  <label className="text-sm font-semibold text-gray-700">
                    {t('ratingLabel')}
                  </label>
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                        className={`transition-transform hover:scale-110 ${
                          displayStar(star) ? 'text-amber-400' : 'text-gray-300'
                        }`}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      >
                        <StarIcon filled={displayStar(star)} className="h-9 w-9" />
                      </button>
                    ))}
                  </div>
                  {status !== 'idle' && status !== 'loading' && rating === 0 && (
                    <p className="mt-1 text-xs text-red-500">{t('ratingRequired')}</p>
                  )}
                </div>

                {/* Textarea */}
                <div className="mt-5">
                  <label className="text-sm font-semibold text-gray-700">
                    {t('messageLabel')}
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                      placeholder={t('messagePlaceholder')}
                      maxLength={500}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-500"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {message.length}/500
                    </span>
                  </div>
                </div>

                {/* Error / rate limit messages */}
                {status === 'error' && (
                  <p className="mt-3 text-sm text-red-500">{t('error')}</p>
                )}
                {status === 'rateLimit' && (
                  <p className="mt-3 text-sm text-amber-600">{t('rateLimit')}</p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isLoading}
                  className="mt-5 w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? t('submitting') : t('submit')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
