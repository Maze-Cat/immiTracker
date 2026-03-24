# ImmiTracker

Comprehensive, bilingual (English / 中文) US immigration information website with a real-time Green Card Priority Date Tracker.

## Features

- **6 Visa Guides** — In-depth bilingual pages covering OPT, STEM OPT, H-1B, H-4, PERM, and Green Card (eligibility, process steps, timelines, FAQs)
- **Priority Date Tracker** — Live data from the monthly USCIS Visa Bulletin with historical trend tracking
- **Bilingual Support** — Full English and Simplified Chinese (`/en/*` and `/zh/*` routes)
- **Auto-Updating Data** — Cron job fetches and parses the latest DOS Visa Bulletin automatically
- **Accessible** — WCAG 2.1 compliant with proper ARIA attributes, keyboard navigation, and semantic HTML

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) |
| HTML Parsing | [cheerio](https://cheerio.js.org/) |
| Data Store | In-memory Map (dev) / Vercel KV (production) |
| Deployment | Vercel |
| Testing | Jest + ts-jest |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Maze-Cat/immiTracker.git
cd immiTracker
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/zh` based on your browser locale.

### Build

```bash
npm run build
npm start
```

### Testing

```bash
npx jest          # Run all tests
npx jest --verbose  # Verbose output
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-aware routes (/en/*, /zh/*)
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Locale layout with dynamic <html lang>
│   │   ├── tracker/        # Priority Date Tracker page
│   │   └── visa/
│   │       └── [slug]/     # Dynamic visa info pages
│   ├── api/
│   │   ├── visa-bulletin/
│   │   │   ├── current/    # GET latest bulletin data
│   │   │   └── history/    # GET historical trend data
│   │   └── cron/
│   │       └── fetch-bulletin/  # Cron endpoint (Vercel)
│   └── layout.tsx          # Root layout
├── components/
│   ├── layout/             # Header, Footer, LocaleSwitcher
│   ├── tracker/            # TrackerClient, PriorityDateTable, HistoricalChart
│   └── visa/               # VisaPageContent, FAQAccordion
├── data/
│   └── visa-info/          # Bilingual visa content (6 types)
├── lib/
│   └── visa-bulletin/      # fetcher, parser (cheerio), store
├── messages/
│   ├── en.json             # English translations
│   └── zh.json             # Chinese translations
├── types/                  # TypeScript interfaces
└── __tests__/              # Jest test suites
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CRON_SECRET` | Yes (prod) | Bearer token to authenticate cron requests |
| `KV_REST_API_URL` | Yes (prod) | Vercel KV Redis URL |
| `KV_REST_API_TOKEN` | Yes (prod) | Vercel KV auth token |

## Cron Job

The Visa Bulletin fetcher runs automatically via Vercel Cron:

- **Schedule**: `0 10 1-7 * *` (10:00 UTC on the 1st–7th of each month)
- **Endpoint**: `GET /api/cron/fetch-bulletin`
- **Auth**: Requires `Authorization: Bearer <CRON_SECRET>` or Vercel's `x-vercel-cron` header

See [`vercel.json`](./vercel.json) for configuration.

## Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for the full Vercel deployment guide.

## Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for technical architecture details.

## License

MIT
