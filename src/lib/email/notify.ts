import { Resend } from 'resend';
import { getAllSubscribers } from './subscribers';
import type { VisaBulletin } from '@/types/visa-bulletin';

// ---------------------------------------------------------------------------
// Email notification service using Resend
// ---------------------------------------------------------------------------

// Use RESEND_FROM_ADDRESS env var if set (for verified domain), otherwise fall back to Resend's test domain
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || 'ImmiTracker <onboarding@resend.dev>';
const SITE_URL = 'https://immitracker.mazebigcat.com';
const TRACKER_URL = `${SITE_URL}/tracker`;

/** HTML-escape external strings to prevent XSS in email templates. */
function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let _resendClient: Resend | null | undefined;

function getResendClient(): Resend | null {
  if (_resendClient !== undefined) return _resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      '[notify] RESEND_API_KEY is not set. Email notifications are disabled.',
    );
    _resendClient = null;
    return null;
  }
  _resendClient = new Resend(apiKey);
  return _resendClient;
}

// ---------------------------------------------------------------------------
// Priority date diff calculation
// ---------------------------------------------------------------------------

interface DateDiff {
  label: string;       // e.g. "EB-2 China / EB-2 中国"
  currentDate: string; // formatted date or "Current" / "Unavailable"
  diffDays: number | null; // positive = forward, negative = backward, null = can't compute
}

const TRACKED_CATEGORIES: Array<{
  category: string;
  country: keyof VisaBulletin['employmentBased']['finalActionDates'][string] & string;
  labelEn: string;
  labelZh: string;
}> = [
  { category: 'EB2', country: 'china', labelEn: 'EB-2 China', labelZh: 'EB-2 中国' },
  { category: 'EB3', country: 'china', labelEn: 'EB-3 China', labelZh: 'EB-3 中国' },
  { category: 'EB2', country: 'india', labelEn: 'EB-2 India', labelZh: 'EB-2 印度' },
];

function formatDateForEmail(isoDate: string): string {
  if (isoDate === 'C') return 'Current';
  if (isoDate === 'U') return 'Unavailable';
  try {
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return isoDate;
  }
}

function daysBetween(dateA: string, dateB: string): number | null {
  if (dateA === 'C' || dateA === 'U' || dateB === 'C' || dateB === 'U') return null;
  try {
    const a = new Date(dateA + 'T00:00:00').getTime();
    const b = new Date(dateB + 'T00:00:00').getTime();
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}

function computeDiffs(current: VisaBulletin, previous: VisaBulletin): DateDiff[] {
  return TRACKED_CATEGORIES.map(({ category, country, labelEn, labelZh }) => {
    const curDate = current.employmentBased?.finalActionDates?.[category]?.[country] ?? 'U';
    const prevDate = previous.employmentBased?.finalActionDates?.[category]?.[country] ?? 'U';
    const diff = daysBetween(prevDate, curDate);

    return {
      label: `${labelEn} / ${labelZh}`,
      currentDate: formatDateForEmail(curDate),
      diffDays: diff,
    };
  });
}

// ---------------------------------------------------------------------------
// Email HTML template
// ---------------------------------------------------------------------------

function buildEmailHtml(bulletinMonth: string, diffs: DateDiff[]): string {
  const esc = escapeHtml;
  const diffRows = diffs.map((d) => {
    let diffText = '';
    let diffColor = '#6b7280'; // gray
    if (d.diffDays !== null) {
      if (d.diffDays > 0) {
        diffText = `▲ +${d.diffDays} days / 前进 ${d.diffDays} 天`;
        diffColor = '#059669'; // green
      } else if (d.diffDays < 0) {
        diffText = `▼ ${d.diffDays} days / 后退 ${Math.abs(d.diffDays)} 天`;
        diffColor = '#dc2626'; // red
      } else {
        diffText = '— No change / 无变化';
        diffColor = '#6b7280';
      }
    } else {
      diffText = '—';
    }

    return `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #374151; font-weight: 600;">
          ${esc(d.label)}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 700; text-align: right;">
          ${esc(d.currentDate)}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: ${diffColor}; font-weight: 600; text-align: right;">
          ${diffText}
        </td>
      </tr>`;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #0d9488, #0891b2); padding: 24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 8px; padding: 6px 10px; font-size: 16px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">IT</span>
                  <span style="margin-left: 10px; font-size: 20px; font-weight: 700; color: #ffffff;">ImmiTracker</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding: 32px 32px 8px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #111827;">
              📢 New Visa Bulletin: ${esc(bulletinMonth)}
            </h1>
            <p style="margin: 6px 0 0; font-size: 16px; color: #6b7280;">
              新签证公告：${esc(bulletinMonth)}
            </p>
          </td>
        </tr>

        <!-- Priority Dates Table -->
        <tr>
          <td style="padding: 16px 32px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #6b7280; text-align: left; text-transform: uppercase; letter-spacing: 0.5px;">
                    Category / 类别
                  </th>
                  <th style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #6b7280; text-align: right; text-transform: uppercase; letter-spacing: 0.5px;">
                    Date / 日期
                  </th>
                  <th style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #6b7280; text-align: right; text-transform: uppercase; letter-spacing: 0.5px;">
                    Change / 变化
                  </th>
                </tr>
              </thead>
              <tbody>
                ${diffRows}
              </tbody>
            </table>
            <p style="margin: 8px 0 0; font-size: 11px; color: #9ca3af; text-align: right;">
              Chart A (Final Action Dates) / 表A（最终行动日期）
            </p>
          </td>
        </tr>

        <!-- CTA Button -->
        <tr>
          <td style="padding: 0 32px 32px; text-align: center;">
            <a href="${TRACKER_URL}" style="display: inline-block; background: linear-gradient(135deg, #0d9488, #0891b2); color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 12px;">
              View Full Details / 查看完整排期 →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #9ca3af; line-height: 1.5;">
              You received this email because you subscribed to visa bulletin updates on ImmiTracker.<br/>
              您收到此邮件是因为您在 ImmiTracker 订阅了签证公告更新。
            </p>
            <p style="margin: 0; font-size: 12px;">
              <a href="${TRACKER_URL}" style="color: #6b7280; text-decoration: underline;">Unsubscribe / 取消订阅</a>
            </p>
            <p style="margin: 12px 0 0; font-size: 11px; color: #d1d5db;">
              © 2026 ImmiTracker · Data sourced from U.S. Department of State
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Notify all subscribers that a new visa bulletin has been published.
 *
 * This function is designed to be fault-tolerant: it will never throw.
 * Individual send failures are logged but do not stop other emails from
 * being sent.
 */
export async function notifySubscribers(
  current: VisaBulletin,
  previous: VisaBulletin | null,
): Promise<{ sent: number; failed: number }> {
  const resend = getResendClient();
  if (!resend) {
    return { sent: 0, failed: 0 };
  }

  let subscribers: string[];
  try {
    subscribers = await getAllSubscribers();
  } catch (err) {
    console.error('[notify] Failed to fetch subscribers:', err);
    return { sent: 0, failed: 0 };
  }

  if (subscribers.length === 0) {
    console.log('[notify] No subscribers to notify.');
    return { sent: 0, failed: 0 };
  }

  const bulletinMonth = current.bulletinMonth;
  const diffs = previous ? computeDiffs(current, previous) : [];
  const html = buildEmailHtml(bulletinMonth, diffs);

  console.log(
    `[notify] Sending bulletin notification for ${bulletinMonth} to ${subscribers.length} subscriber(s).`,
  );

  let sent = 0;
  let failed = 0;

  const BATCH_SIZE = 10;
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((email) =>
        resend.emails.send({
          from: FROM_ADDRESS,
          to: email,
          subject: `📢 Visa Bulletin ${escapeHtml(bulletinMonth)} — Priority Date Updates / 排期更新`,
          html,
        }),
      ),
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        sent++;
      } else {
        failed++;
        console.error('[notify] Failed to send email:', result.reason);
      }
    }
  }

  console.log(
    `[notify] Notification complete: ${sent} sent, ${failed} failed.`,
  );

  return { sent, failed };
}
