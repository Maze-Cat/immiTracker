import { NextRequest } from 'next/server';

// ---------------------------------------------------------------------------
// Mock the subscribers module so tests don't touch real storage
// ---------------------------------------------------------------------------
const mockSubscribers = new Map<string, boolean>();

jest.mock('@/lib/email/subscribers', () => ({
  isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  addSubscriber: jest.fn(async (email: string) => {
    mockSubscribers.set(email.toLowerCase(), true);
  }),
  removeSubscriber: jest.fn(async (email: string) => {
    mockSubscribers.delete(email.toLowerCase());
  }),
  isSubscribed: jest.fn(async (email: string) => {
    return mockSubscribers.has(email.toLowerCase());
  }),
  getSubscriberCount: jest.fn(async () => mockSubscribers.size),
}));

// Must import AFTER jest.mock so the mocked module is used
import { GET, POST, DELETE } from '@/app/api/subscribe/route';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(
  method: string,
  opts?: { body?: unknown; searchParams?: Record<string, string> },
): NextRequest {
  const url = new URL('http://localhost/api/subscribe');
  if (opts?.searchParams) {
    for (const [k, v] of Object.entries(opts.searchParams)) {
      url.searchParams.set(k, v);
    }
  }

  const init: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: {
      'x-forwarded-for': '127.0.0.1',
    },
  };

  if (opts?.body !== undefined) {
    init.body = JSON.stringify(opts.body);
    init.headers['content-type'] = 'application/json';
  }

  return new NextRequest(url, init);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('/api/subscribe', () => {
  beforeEach(() => {
    mockSubscribers.clear();
  });

  // POST -----------------------------------------------------------------
  describe('POST', () => {
    it('returns 200 with valid email', async () => {
      const res = await POST(makeRequest('POST', { body: { email: 'new@example.com' } }));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
    });

    it('returns 400 with invalid email', async () => {
      const res = await POST(makeRequest('POST', { body: { email: 'bad-email' } }));
      expect(res.status).toBe(400);
    });

    it('returns 409 when email is already subscribed', async () => {
      mockSubscribers.set('dup@example.com', true);
      const res = await POST(makeRequest('POST', { body: { email: 'dup@example.com' } }));
      expect(res.status).toBe(409);
      const json = await res.json();
      expect(json.error).toMatch(/already/i);
    });

    it('returns 400 for invalid JSON body', async () => {
      const url = new URL('http://localhost/api/subscribe');
      const req = new NextRequest(url, {
        method: 'POST',
        headers: {
          'x-forwarded-for': '127.0.0.1',
          'content-type': 'application/json',
        },
        body: '{{not json',
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toMatch(/invalid json/i);
    });

    it('returns 400 when email field is missing', async () => {
      const res = await POST(makeRequest('POST', { body: {} }));
      expect(res.status).toBe(400);
    });
  });

  // GET ------------------------------------------------------------------
  describe('GET', () => {
    it('returns subscription status true for subscribed email', async () => {
      mockSubscribers.set('found@example.com', true);
      const res = await GET(makeRequest('GET', { searchParams: { email: 'found@example.com' } }));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.subscribed).toBe(true);
    });

    it('returns subscription status false for unsubscribed email', async () => {
      const res = await GET(makeRequest('GET', { searchParams: { email: 'nope@example.com' } }));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.subscribed).toBe(false);
    });

    it('returns 400 when email param is missing', async () => {
      const res = await GET(makeRequest('GET'));
      expect(res.status).toBe(400);
    });
  });

  // DELETE ----------------------------------------------------------------
  describe('DELETE', () => {
    it('removes a subscriber and returns success', async () => {
      mockSubscribers.set('bye@example.com', true);
      const res = await DELETE(makeRequest('DELETE', { body: { email: 'bye@example.com' } }));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
    });

    it('returns 400 with invalid email', async () => {
      const res = await DELETE(makeRequest('DELETE', { body: { email: 'nope' } }));
      expect(res.status).toBe(400);
    });
  });
});
