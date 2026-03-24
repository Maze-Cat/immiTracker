import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';

/**
 * Recursively collect all leaf keys from a nested object.
 * Returns paths like "nav.home", "tracker.title", etc.
 */
function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...collectKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe('i18n translation keys', () => {
  const enKeys = collectKeys(enMessages);
  const zhKeys = collectKeys(zhMessages);

  it('en.json and zh.json have the same set of keys', () => {
    const enSet = new Set(enKeys);
    const zhSet = new Set(zhKeys);

    const missingInZh = enKeys.filter((k) => !zhSet.has(k));
    const missingInEn = zhKeys.filter((k) => !enSet.has(k));

    if (missingInZh.length > 0) {
      console.warn('Keys in en.json but missing in zh.json:', missingInZh);
    }
    if (missingInEn.length > 0) {
      console.warn('Keys in zh.json but missing in en.json:', missingInEn);
    }

    expect(missingInZh).toEqual([]);
    expect(missingInEn).toEqual([]);
  });

  it('both locale files have required nav keys', () => {
    const required = ['nav.home', 'nav.tracker', 'nav.visa', 'nav.tagline', 'nav.trackDates'];
    for (const key of required) {
      expect(enKeys).toContain(key);
      expect(zhKeys).toContain(key);
    }
  });

  it('both locale files have required tracker keys', () => {
    const required = [
      'tracker.title', 'tracker.subtitle', 'tracker.finalAction', 'tracker.datesForFiling',
      'tracker.loading', 'tracker.error', 'tracker.noData', 'tracker.current',
      'tracker.unavailable', 'tracker.eb2India', 'tracker.eb3India',
      'tracker.chartComingSoon', 'tracker.autoUpdated',
    ];
    for (const key of required) {
      expect(enKeys).toContain(key);
      expect(zhKeys).toContain(key);
    }
  });

  it('both locale files have required footer keys', () => {
    const required = [
      'footer.tagline', 'footer.disclaimer', 'footer.visaTypes',
      'footer.resources', 'footer.priorityTracker', 'footer.dataSource',
      'footer.notAffiliated',
    ];
    for (const key of required) {
      expect(enKeys).toContain(key);
      expect(zhKeys).toContain(key);
    }
  });

  it('both locale files have required visa keys', () => {
    const required = [
      'visa.overview', 'visa.eligibility', 'visa.processSteps',
      'visa.keyStats', 'visa.home', 'visa.visaInfoBadge',
      'visa.relatedVisas', 'visa.trackYourDate', 'visa.viewPriorityDates',
    ];
    for (const key of required) {
      expect(enKeys).toContain(key);
      expect(zhKeys).toContain(key);
    }
  });

  it('both locale files have required home keys', () => {
    const required = [
      'home.announcementBar', 'home.announcementBadge',
      'home.hero.title', 'home.hero.titleAccent', 'home.hero.subtitle',
      'home.hero.ctaPrimary', 'home.hero.ctaSecondary',
      'home.visaSection.eyebrow', 'home.visaSection.title',
      'home.features.eyebrow', 'home.features.title',
      'home.cta.title', 'home.cta.primary', 'home.cta.secondary',
    ];
    for (const key of required) {
      expect(enKeys).toContain(key);
      expect(zhKeys).toContain(key);
    }
  });

  it('both locale files have meta keys', () => {
    expect(enKeys).toContain('meta.title');
    expect(enKeys).toContain('meta.description');
    expect(zhKeys).toContain('meta.title');
    expect(zhKeys).toContain('meta.description');
  });

  it('no translation values are empty strings', () => {
    function checkValues(obj: Record<string, unknown>, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          checkValues(value as Record<string, unknown>, fullKey);
        } else if (typeof value === 'string') {
          expect({ key: fullKey, value }).not.toEqual({ key: fullKey, value: '' });
        }
      }
    }
    checkValues(enMessages);
    checkValues(zhMessages);
  });
});
