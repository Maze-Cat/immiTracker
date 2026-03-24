# Deployment Guide

ImmiTracker is designed to deploy on [Vercel](https://vercel.com) with zero configuration beyond environment variables.

## Prerequisites

- A [Vercel](https://vercel.com) account
- The [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for CLI deploys)
- A GitHub repository connected to Vercel

## Step 1: Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `immiTracker` GitHub repository
3. Vercel auto-detects Next.js — no build settings changes needed
4. Click **Deploy**

## Step 2: Environment Variables

Set these in **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable | Value | Notes |
|----------|-------|-------|
| `CRON_SECRET` | A strong random string (e.g., `openssl rand -hex 32`) | Used to authenticate the cron endpoint |
| `KV_REST_API_URL` | Auto-set when you add Vercel KV | Redis connection URL |
| `KV_REST_API_TOKEN` | Auto-set when you add Vercel KV | Redis auth token |

## Step 3: Set Up Vercel KV

The in-memory store works for development but **data is lost between serverless invocations** in production. Set up Vercel KV for persistence:

1. Go to **Vercel Dashboard → Project → Storage**
2. Click **Create Database → KV (Redis)**
3. Name it (e.g., `immitracker-kv`)
4. Vercel automatically sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`
5. Redeploy the project

> **Note**: The store module (`src/lib/visa-bulletin/store.ts`) currently uses an in-memory Map. To use Vercel KV, replace the TODO comments with `@vercel/kv` calls. The function signatures are already designed for this swap.

## Step 4: Cron Job

The cron configuration is already in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-bulletin",
      "schedule": "0 10 1-7 * *"
    }
  ]
}
```

This runs at **10:00 UTC on the 1st through 7th of each month**, which covers when the DOS typically publishes the new Visa Bulletin.

### How it works:

1. Vercel sends a `GET` request to `/api/cron/fetch-bulletin`
2. The endpoint verifies the request (checks `x-vercel-cron` header or `Authorization: Bearer` token)
3. The fetcher downloads the DOS Visa Bulletin index page
4. It finds the latest bulletin URL via regex pattern matching
5. The parser (cheerio) extracts all EB/FB final action + filing date tables
6. Data is stored via `storeBulletin()` (in-memory or KV)

### Manual trigger:

```bash
curl -X POST https://your-domain.vercel.app/api/cron/fetch-bulletin \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Monitoring:

Check cron execution logs in **Vercel Dashboard → Project → Logs** or **Functions** tab.

## Step 5: Custom Domain (Optional)

1. Go to **Vercel Dashboard → Project → Settings → Domains**
2. Add your domain (e.g., `immitracker.com`)
3. Update DNS records as instructed by Vercel
4. SSL is provisioned automatically

## Troubleshooting

### Cron job not firing
- Verify `vercel.json` is at the project root
- Check that the cron route exports a `GET` handler (Vercel Cron sends GET, not POST)
- Verify `CRON_SECRET` is set in environment variables
- Check **Vercel Dashboard → Cron Jobs** for execution history

### Data not persisting
- In development: data resets on server restart (expected — uses in-memory Map)
- In production: ensure Vercel KV is connected and the store uses `@vercel/kv`
- Check for the warning log: `[store] WARNING: Running in production without Vercel KV configured`

### i18n routes not working
- Ensure `middleware.ts` is at `src/middleware.ts`
- Check that `next.config.ts` has the `createNextIntlPlugin` wrapper
- Default locale is `en`; supported locales are `['en', 'zh']`

### Build failures
- Run `npm run build` locally first to catch errors
- Check that all translation keys used in components exist in both `en.json` and `zh.json`
- Run `npx jest` to validate i18n key completeness
