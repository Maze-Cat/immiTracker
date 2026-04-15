import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSend = vi.fn().mockResolvedValue({ id: 'mock-alert-id' });

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

import { sendAlert } from '@/lib/email/alert';

describe('sendAlert', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('ALERT_EMAIL', 'admin@example.com');
    vi.stubEnv('RESEND_FROM_ADDRESS', 'Test <test@example.com>');
  });

  it('sends alert email when env vars are configured', async () => {
    await sendAlert('Test failure', 'Something went wrong');

    expect(mockSend).toHaveBeenCalledOnce();
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'admin@example.com',
        subject: expect.stringContaining('Test failure'),
      }),
    );
  });

  it('skips when ALERT_EMAIL is missing', async () => {
    vi.stubEnv('ALERT_EMAIL', '');

    await sendAlert('Test', 'details');

    expect(mockSend).not.toHaveBeenCalled();
  });

  it('skips when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');

    await sendAlert('Test', 'details');

    expect(mockSend).not.toHaveBeenCalled();
  });

  it('never throws even if Resend fails', async () => {
    mockSend.mockRejectedValueOnce(new Error('API down'));

    await expect(sendAlert('Test', 'details')).resolves.toBeUndefined();
  });

  it('uses default from address when RESEND_FROM_ADDRESS is not set', async () => {
    vi.stubEnv('RESEND_FROM_ADDRESS', '');

    await sendAlert('Test', 'details');

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'ImmiTracker <onboarding@resend.dev>',
      }),
    );
  });
});
