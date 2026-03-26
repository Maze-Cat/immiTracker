'use client';

import { useState, useEffect, useCallback } from 'react';

interface FeedbackEntry {
  id: string;
  rating: number;
  message: string;
  locale: string;
  createdAt: string;
}

interface FeedbackStats {
  total: number;
  avgRating: number;
  distribution: Record<number, number>;
}

interface FeedbackData {
  stats: FeedbackStats;
  entries: FeedbackEntry[];
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function RatingBar({ star, count, max }: { star: number; count: number; max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-12 text-right text-gray-500">{star} star</span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-amber-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-gray-600">{count}</span>
    </div>
  );
}

export default function AdminFeedbackPage() {
  const [data, setData] = useState<FeedbackData | null>(null);
  const [error, setError] = useState('');
  const [key, setKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (secret: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/feedback?key=${encodeURIComponent(secret)}`);
      if (res.status === 401) {
        setError('Invalid admin key.');
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError('Failed to load feedback.');
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check URL param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlKey = params.get('key');
    if (urlKey) {
      setKey(urlKey);
      fetchData(urlKey);
    }
  }, [fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) fetchData(key.trim());
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Enter admin key to view feedback.</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin secret key"
            className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || !key.trim()}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  if (!data) return null;

  const { stats, entries } = data;
  const maxDistCount = Math.max(...Object.values(stats.distribution), 1);

  return (
    <div className="p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Feedback Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor user feedback and ratings
          </p>
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Feedback</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Average Rating</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{stats.avgRating}</span>
              <span className="text-sm text-gray-400">/ 5</span>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">5-Star Rate</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.total > 0
                ? Math.round((stats.distribution[5] / stats.total) * 100)
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Rating distribution */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Rating Distribution</h2>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <RatingBar
                key={star}
                star={star}
                count={stats.distribution[star] ?? 0}
                max={maxDistCount}
              />
            ))}
          </div>
        </div>

        {/* All feedback */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            All Feedback ({entries.length})
          </h2>
          {entries.length === 0 ? (
            <p className="text-sm text-gray-400">No feedback yet.</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl border border-gray-50 bg-gray-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <StarDisplay rating={entry.rating} />
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                        {entry.locale.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  {entry.message && (
                    <p className="mt-2 text-sm text-gray-700">{entry.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <div className="mt-6 text-center">
          <button
            onClick={() => fetchData(key)}
            className="text-sm text-teal-600 hover:underline"
          >
            Refresh data
          </button>
        </div>
      </div>
    </div>
  );
}
