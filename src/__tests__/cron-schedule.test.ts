import * as fs from 'fs';
import * as path from 'path';

describe('vercel.json cron schedule', () => {
  it('runs the fetch-bulletin cron every 6 hours', () => {
    const vercelJsonPath = path.resolve(__dirname, '../../vercel.json');
    const content = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));

    expect(content.crons).toBeDefined();
    expect(Array.isArray(content.crons)).toBe(true);

    const fetchBulletinCron = content.crons.find(
      (c: { path: string }) => c.path === '/api/cron/fetch-bulletin',
    );

    expect(fetchBulletinCron).toBeDefined();
    expect(fetchBulletinCron.schedule).toBe('0 */6 * * *');
  });
});
