import {
  isValidEmail,
  addSubscriber,
  removeSubscriber,
  isSubscribed,
  getSubscriberCount,
} from '@/lib/email/subscribers';

describe('subscribers', () => {
  // Clear the in-memory store between tests
  beforeEach(async () => {
    // Remove any leftover subscribers from previous tests
    const globalStore = globalThis as unknown as { __subscriberStore?: Set<string> };
    if (globalStore.__subscriberStore) {
      globalStore.__subscriberStore.clear();
    }
  });

  describe('isValidEmail', () => {
    it('accepts valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('foo.bar@baz.co')).toBe(true);
      expect(isValidEmail('a+b@domain.org')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('no-at-sign')).toBe(false);
      expect(isValidEmail('@missing-local.com')).toBe(false);
      expect(isValidEmail('missing-domain@')).toBe(false);
      expect(isValidEmail('spaces in@email.com')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
    });
  });

  describe('addSubscriber + isSubscribed + removeSubscriber', () => {
    it('adds a subscriber and confirms they are subscribed', async () => {
      await addSubscriber('test@example.com');
      expect(await isSubscribed('test@example.com')).toBe(true);
    });

    it('removes a subscriber', async () => {
      await addSubscriber('remove-me@example.com');
      expect(await isSubscribed('remove-me@example.com')).toBe(true);

      await removeSubscriber('remove-me@example.com');
      expect(await isSubscribed('remove-me@example.com')).toBe(false);
    });

    it('returns false for non-existent subscriber', async () => {
      expect(await isSubscribed('nobody@example.com')).toBe(false);
    });

    it('throws on invalid email', async () => {
      await expect(addSubscriber('not-an-email')).rejects.toThrow('Invalid email');
    });
  });

  describe('email normalisation', () => {
    it('normalises uppercase emails to lowercase', async () => {
      await addSubscriber('USER@EXAMPLE.COM');
      expect(await isSubscribed('user@example.com')).toBe(true);
      expect(await isSubscribed('USER@EXAMPLE.COM')).toBe(true);
    });

    it('trims whitespace', async () => {
      await addSubscriber('  trimmed@example.com  ');
      expect(await isSubscribed('trimmed@example.com')).toBe(true);
    });
  });

  describe('getSubscriberCount', () => {
    it('returns 0 when empty', async () => {
      expect(await getSubscriberCount()).toBe(0);
    });

    it('returns correct count after adding subscribers', async () => {
      await addSubscriber('a@example.com');
      await addSubscriber('b@example.com');
      await addSubscriber('c@example.com');
      expect(await getSubscriberCount()).toBe(3);
    });

    it('does not double-count duplicate emails', async () => {
      await addSubscriber('dup@example.com');
      await addSubscriber('dup@example.com');
      expect(await getSubscriberCount()).toBe(1);
    });
  });
});
