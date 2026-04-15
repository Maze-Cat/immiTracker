import { Resend } from 'resend';

// ---------------------------------------------------------------------------
// Admin alert emails — sent when something goes wrong with cron/notifications
// Designed to never throw — alerts are side-effects that must not break callers.
// ---------------------------------------------------------------------------

export async function sendAlert(subject: string, details: string): Promise<void> {
  const alertTo = process.env.ALERT_EMAIL;
  if (!alertTo) {
    console.warn('[alert] ALERT_EMAIL not set, skipping alert:', subject);
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[alert] Resend not configured, skipping alert:', subject);
    return;
  }

  const fromAddress = process.env.RESEND_FROM_ADDRESS || 'ImmiTracker <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromAddress,
      to: alertTo,
      subject: `⚠️ ImmiTracker Alert: ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #fecaca;">
        <tr>
          <td style="background:#dc2626;padding:16px 24px;">
            <span style="font-size:16px;font-weight:700;color:#fff;">⚠️ ImmiTracker Alert</span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <h2 style="margin:0 0 12px;font-size:18px;color:#111827;">${subject}</h2>
            <pre style="margin:0;padding:16px;background:#f3f4f6;border-radius:8px;font-size:13px;color:#374151;white-space:pre-wrap;word-break:break-word;overflow:auto;">${details}</pre>
            <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">
              Sent at ${new Date().toISOString()}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
    console.log(`[alert] Alert sent: ${subject}`);
  } catch (err) {
    // Last resort — if even the alert fails, just log it
    console.error(`[alert] Failed to send alert "${subject}":`, err);
  }
}
