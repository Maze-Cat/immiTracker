# Architecture

## Overview

ImmiTracker is a Next.js 14 application using the App Router with bilingual (EN/ZH) support via `next-intl`. It combines static visa information pages with a dynamic Priority Date Tracker that fetches live data from the U.S. Department of State (DOS).

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
│                     /en/* or /zh/* routes                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    Next.js App Router                            │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │  [locale]/   │  │  [locale]/   │  │  [locale]/visa/    │     │
│  │  page.tsx    │  │  tracker/    │  │  [slug]/page.tsx   │     │
│  │  (Homepage)  │  │  page.tsx    │  │  (6 visa types)    │     │
│  └──────────────┘  └──────┬───────┘  └────────────────────┘     │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │                    API Routes                              │   │
│  │  /api/visa-bulletin/current    → GET latest bulletin       │   │
│  │  /api/visa-bulletin/history    → GET historical data       │   │
│  │  /api/cron/fetch-bulletin      → GET/POST trigger fetch    │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │                    Data Layer                              │   │
│  │  fetcher.ts → parser.ts (cheerio) → store.ts (Map/KV)     │   │
│  └────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│              U.S. Department of State                            │
│         travel.state.gov/visa-bulletin                           │
└─────────────────────────────────────────────────────────────────┘
```

## Routing & i18n

### Locale Routing

All user-facing pages are under `src/app/[locale]/`, where `locale` is `en` or `zh`. The `middleware.ts` file uses `next-intl` to:

1. Detect the user's preferred locale from the `Accept-Language` header
2. Redirect `/` to `/en` or `/zh`
3. Validate that the locale segment is one of `['en', 'zh']`

### Translation Files

- `src/messages/en.json` — English translations
- `src/messages/zh.json` — Chinese translations

Both files must have **identical key structures**. The i18n test suite (`src/__tests__/i18n.test.ts`) enforces this.

### How Components Use Translations

```tsx
// Server components
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('tracker');
  return <h1>{t('title')}</h1>;
}
```

## Data Flow: Visa Bulletin Pipeline

```
DOS Website → fetcher.ts → parser.ts → store.ts → API Routes → UI
```

### 1. Fetcher (`src/lib/visa-bulletin/fetcher.ts`)

- Fetches the DOS Visa Bulletin index page
- Uses regex to find the latest bulletin URL (tries specific `visa-bulletin-for-*` first, then generic `visa-bulletin-*`)
- Fetches the full bulletin HTML
- Both fetch calls have `AbortSignal.timeout(10_000)` to prevent hangs
- Passes HTML to the parser, then stores the result

### 2. Parser (`src/lib/visa-bulletin/parser.ts`)

- Uses `cheerio.load(html)` to parse the DOS HTML
- Extracts `bulletinMonth` from `<h1>`, `<h2>`, or `<title>` tags
- Walks elements in document order (`h2, h3, h4, p, table`)
- Classifies headings into sections: `eb-final`, `eb-filing`, `fb-final`, `fb-filing`
- Parses each `<table>` under its classified heading
- Maps column headers to chargeability areas (All, China, India, Mexico, Philippines)
- Canonicalizes row keys: `"1st"` → `EB1`, `"2nd"` → `EB2`, etc.
- Normalizes date values: `"C"`, `"U"`, `"01JAN22"` → `"2022-01-01"`, etc.
- Validates output — throws if all four tables are empty

### 3. Store (`src/lib/visa-bulletin/store.ts`)

- **Dev**: In-memory `Map<string, VisaBulletin>` keyed by `bulletin:YYYY-MM`
- **Production**: Designed for Vercel KV swap (TODO comments in place)
- `storeBulletin()` — stores at both a dated key and a `bulletin:latest` sentinel
- `getLatestBulletin()` — retrieves the latest stored bulletin
- `getHistoricalData(category, chargeability, months)` — queries the Map for historical entries, returns sorted ascending

### 4. API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/visa-bulletin/current` | GET | None | Returns latest bulletin or 404 |
| `/api/visa-bulletin/history` | GET | None | Returns historical data; validates `category` and `chargeability` against allowlists |
| `/api/cron/fetch-bulletin` | GET | Vercel Cron (`x-vercel-cron`) | Triggers bulletin fetch |
| `/api/cron/fetch-bulletin` | POST | Bearer token (`CRON_SECRET`) | Manual trigger for bulletin fetch |

## Component Hierarchy

```
layout.tsx (root)
└── [locale]/layout.tsx (NextIntlClientProvider, Header, Footer)
    ├── page.tsx (Homepage)
    │   ├── Announcement bar
    │   ├── Hero with live data preview cards
    │   ├── Visa card grid (6 types)
    │   ├── Features section
    │   └── CTA banner
    ├── tracker/page.tsx
    │   └── TrackerClient (client component)
    │       ├── PriorityDateTable (EB + FB final/filing)
    │       └── HistoricalChart
    └── visa/[slug]/page.tsx
        └── VisaPageContent
            ├── Breadcrumb
            ├── Key Stats cards
            ├── Overview section
            ├── Eligibility requirements
            ├── Process steps
            ├── FAQAccordion
            ├── Related visas
            └── Tracker CTA
```

## Rendering Strategy

| Page | Strategy | Revalidation |
|------|----------|-------------|
| Homepage | ISR | `revalidate = 3600` (1 hour) |
| Visa info pages | SSG | `generateStaticParams` for all 6 slugs |
| Tracker page | Client-side | Fetches from API on mount |
| API routes | Dynamic | On-demand |

## Type System

All types are in `src/types/`:

- **`visa-bulletin.ts`** — `VisaBulletin`, `CategoryTable`, `ChargeabilityRow`, `BulletinHistory`, `BulletinHistoryEntry`
- **`visa-info.ts`** — `BilingualVisaInfo`, `VisaInfoContent`, `ProcessStep`, `FAQItem`, `EligibilityRequirement`

## Testing

```bash
npx jest --verbose
```

| Suite | What it tests |
|-------|--------------|
| `parser.test.ts` | Cheerio parsing, date normalization, error handling |
| `store.test.ts` | Store/retrieve, historical queries, type shape |
| `i18n.test.ts` | EN/ZH key parity, required keys, no empty values |
