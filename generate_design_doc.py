from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, Preformatted
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfgen import canvas as pdfcanvas
from datetime import date

OUTPUT = "/Users/yuchenyang/myProjects/immiTracker/ImmiTracker_Design_Doc.pdf"

# ── Custom page template with header/footer ──────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    # Header
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(colors.HexColor("#4F46E5"))
    canvas.drawString(inch, letter[1] - 0.55 * inch, "ImmiTracker — Project Design Document")
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.grey)
    canvas.drawRightString(letter[0] - inch, letter[1] - 0.55 * inch, f"Page {doc.page}")
    canvas.setStrokeColor(colors.HexColor("#E5E7EB"))
    canvas.line(inch, letter[1] - 0.65 * inch, letter[0] - inch, letter[1] - 0.65 * inch)
    # Footer
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.grey)
    canvas.drawString(inch, 0.45 * inch, f"Prepared: {date.today().strftime('%B %d, %Y')}  |  Confidential — Internal Use")
    canvas.line(inch, 0.6 * inch, letter[0] - inch, 0.6 * inch)
    canvas.restoreState()

# ── Styles ────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()
INDIGO = colors.HexColor("#4F46E5")
LIGHT_BG = colors.HexColor("#F3F4F6")
CODE_BG = colors.HexColor("#1E1E2E")
CODE_FG = colors.HexColor("#CDD6F4")

title_style = ParagraphStyle("DocTitle", parent=styles["Title"],
    fontSize=26, textColor=INDIGO, spaceAfter=4, leading=32)
subtitle_style = ParagraphStyle("DocSubtitle", parent=styles["Normal"],
    fontSize=12, textColor=colors.HexColor("#6B7280"), spaceAfter=20)
h1_style = ParagraphStyle("H1", parent=styles["Heading1"],
    fontSize=16, textColor=INDIGO, spaceBefore=18, spaceAfter=6,
    borderPad=4, leading=20)
h2_style = ParagraphStyle("H2", parent=styles["Heading2"],
    fontSize=13, textColor=colors.HexColor("#1F2937"), spaceBefore=12, spaceAfter=4)
body_style = ParagraphStyle("Body", parent=styles["Normal"],
    fontSize=10, leading=15, textColor=colors.HexColor("#374151"))
bullet_style = ParagraphStyle("Bullet", parent=body_style,
    leftIndent=16, bulletIndent=6, spaceAfter=2)
code_style = ParagraphStyle("Code", parent=styles["Code"],
    fontSize=8, fontName="Courier", leading=11,
    backColor=CODE_BG, textColor=CODE_FG,
    leftIndent=8, rightIndent=8, spaceBefore=4, spaceAfter=4,
    borderPad=6)
note_style = ParagraphStyle("Note", parent=body_style,
    backColor=colors.HexColor("#EEF2FF"), leftIndent=10, rightIndent=10,
    borderPad=6, spaceBefore=4, spaceAfter=4, textColor=colors.HexColor("#3730A3"))

def h1(text): return Paragraph(text, h1_style)
def h2(text): return Paragraph(text, h2_style)
def body(text): return Paragraph(text, body_style)
def bullet(text): return Paragraph(f"• {text}", bullet_style)
def note(text): return Paragraph(f"<b>Note:</b> {text}", note_style)
def code(text): return Preformatted(text, code_style)
def sp(n=6): return Spacer(1, n)
def hr(): return HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E7EB"), spaceAfter=6)

def make_table(headers, rows, col_widths=None):
    data = [headers] + rows
    style = TableStyle([
        ("BACKGROUND", (0,0), (-1,0), INDIGO),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,0), 9),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ("FONTNAME", (0,1), (-1,-1), "Helvetica"),
        ("FONTSIZE", (0,1), (-1,-1), 9),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("GRID", (0,0), (-1,-1), 0.4, colors.HexColor("#D1D5DB")),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("TOPPADDING", (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ])
    t = Table(data, colWidths=col_widths, style=style, hAlign="LEFT")
    return t

# ── Build story ───────────────────────────────────────────────────────────────
story = []

# Cover
story += [
    sp(60),
    Paragraph("ImmiTracker", title_style),
    Paragraph("Project Design Document", subtitle_style),
    sp(8),
    Paragraph(f"Version 1.0 &nbsp;&nbsp;|&nbsp;&nbsp; {date.today().strftime('%B %d, %Y')}", body_style),
    sp(4),
    Paragraph("Status: <b>Awaiting Team Lead Approval</b>", note_style),
    sp(20),
    hr(),
    sp(8),
    body("This document describes the full technical architecture, folder structure, API design, cron job strategy, data models, and i18n approach for the ImmiTracker web application — a bilingual (EN/ZH) resource for US immigrants and non-immigrants covering visa types and a live Green Card Priority Date Tracker."),
    PageBreak(),
]

# 1. Folder Structure
story += [
    h1("1. Folder / File Structure"),
    hr(),
    body("The project follows the Next.js 14 App Router convention with a locale-aware routing segment powered by next-intl."),
    sp(8),
    code("""\
immitracker/
├── public/
│   └── locales/                  # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── [locale]/             # next-intl locale segment (en | zh)
│   │   │   ├── layout.tsx        # Root layout with locale provider
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── visa/
│   │   │   │   ├── opt/page.tsx
│   │   │   │   ├── stem-opt/page.tsx
│   │   │   │   ├── h1b/page.tsx
│   │   │   │   ├── h4/page.tsx
│   │   │   │   ├── perm/page.tsx
│   │   │   │   └── green-card/page.tsx
│   │   │   └── tracker/
│   │   │       └── page.tsx      # Green Card Priority Date Tracker
│   │   └── api/
│   │       ├── visa-bulletin/
│   │       │   ├── current/route.ts
│   │       │   └── history/route.ts
│   │       └── cron/fetch-bulletin/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── visa/
│   │   │   ├── VisaInfoSection.tsx
│   │   │   ├── ProcessSteps.tsx
│   │   │   ├── EligibilityTable.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── FAQ.tsx
│   │   └── tracker/
│   │       ├── PriorityDateTable.tsx
│   │       ├── HistoricalChart.tsx
│   │       └── BulletinDateDisplay.tsx
│   ├── lib/
│   │   ├── visa-bulletin/
│   │   │   ├── fetcher.ts
│   │   │   ├── parser.ts
│   │   │   └── store.ts
│   │   └── utils.ts
│   ├── data/
│   │   ├── visa-info/
│   │   │   ├── opt.ts
│   │   │   ├── stem-opt.ts
│   │   │   ├── h1b.ts
│   │   │   ├── h4.ts
│   │   │   ├── perm.ts
│   │   │   └── green-card.ts
│   │   └── bulletin-history/
│   │       └── history.json
│   ├── messages/
│   │   ├── en.json
│   │   └── zh.json
│   └── types/
│       ├── visa-bulletin.ts
│       └── visa-info.ts
├── vercel.json
├── next.config.ts
├── tailwind.config.ts
└── middleware.ts"""),
    sp(10),
]

# 2. Architecture
story += [
    h1("2. Architecture Decisions"),
    hr(),
    h2("2.1 Rendering Strategy"),
    sp(4),
    make_table(
        ["Page", "Strategy", "Rationale"],
        [
            ["Visa info pages (OPT, H-1B, etc.)", "SSG", "Static content; build-time generation gives best performance and SEO"],
            ["Green Card Tracker", "ISR (revalidate: 3600)", "Data changes monthly; ISR avoids full rebuild while keeping data fresh"],
            ["API routes", "Edge / Node runtime", "Lightweight data serving; no DB needed"],
        ],
        col_widths=[2.2*inch, 1.4*inch, 3.2*inch]
    ),
    sp(12),
    h2("2.2 Historical Data Storage"),
    sp(4),
    body("No database in Phase 1. Historical Visa Bulletin data is persisted in <b>Vercel KV (Redis)</b> — free tier, zero config, native Next.js support."),
    sp(4),
    bullet("Each month's bulletin stored as key <b>bulletin:YYYY-MM</b>"),
    bullet("Latest bulletin always available at key <b>bulletin:latest</b>"),
    bullet("No schema migrations needed; JSON values stored directly"),
    sp(12),
    h2("2.3 i18n Approach"),
    sp(4),
    body("next-intl with the App Router [locale] dynamic segment. Supported locales: en, zh."),
    sp(4),
    make_table(
        ["URL (EN)", "URL (ZH)"],
        [
            ["/en", "/zh"],
            ["/en/visa/h1b", "/zh/visa/h1b"],
            ["/en/visa/green-card", "/zh/visa/green-card"],
            ["/en/tracker", "/zh/tracker"],
        ],
        col_widths=[3.35*inch, 3.35*inch]
    ),
    sp(10),
    note("Middleware (middleware.ts) auto-detects browser language and redirects / to /en or /zh."),
    sp(10),
]

# 3. API Routes
story += [
    h1("3. API Route Design"),
    hr(),
    h2("GET /api/visa-bulletin/current"),
    body("Returns the most recently cached Visa Bulletin priority dates."),
    sp(6),
    code("""\
Response: {
  fetchedAt: string;          // ISO timestamp
  bulletinMonth: string;      // e.g. "March 2026"
  finalActionDates: CategoryTable;
  datesForFiling: CategoryTable;
}"""),
    sp(10),
    h2("GET /api/visa-bulletin/history"),
    body("Returns historical priority date trend data for charting."),
    sp(4),
    body("<b>Query params:</b> category (EB1|EB2|EB3|EB4|EB5), chargeability (CHINA|INDIA|MEXICO|PHILIPPINES|ALL_OTHER), months (default 12, max 36)"),
    sp(6),
    code("""\
Response: {
  category: string;
  chargeability: string;
  history: Array<{
    bulletinMonth: string;      // "2026-03"
    finalActionDate: string;    // "2021-01-01" | "C" | "U"
    datesForFilingDate: string;
  }>;
}"""),
    sp(10),
    h2("POST /api/cron/fetch-bulletin"),
    body("Called by Vercel cron job. Fetches latest USCIS Visa Bulletin, parses it, stores result."),
    sp(4),
    note("Secured via Authorization: Bearer <CRON_SECRET> header (Vercel standard pattern)."),
    sp(6),
    code("""\
Response: {
  success: boolean;
  bulletinMonth: string;
  message: string;
}"""),
    sp(10),
]

# 4. Cron Job
story += [
    h1("4. Cron Job Setup"),
    hr(),
    h2("4.1 Vercel Cron Configuration (vercel.json)"),
    sp(4),
    code("""\
{
  "crons": [
    {
      "path": "/api/cron/fetch-bulletin",
      "schedule": "0 10 1-7 * *"
    }
  ]
}"""),
    sp(6),
    body("Runs at <b>10:00 UTC on days 1–7 of each month</b> — catches the Visa Bulletin which is typically released in the first week of the month."),
    sp(10),
    h2("4.2 Fetch + Parse Flow"),
    sp(4),
    make_table(
        ["Step", "File", "Action"],
        [
            ["1", "fetcher.ts", "HTTP GET to USCIS Visa Bulletin page; finds latest bulletin URL and fetches HTML"],
            ["2", "parser.ts", "Parses HTML tables for Final Action Dates and Dates for Filing (EB + FB)"],
            ["3", "store.ts", "Writes parsed data to Vercel KV as bulletin:latest and bulletin:YYYY-MM"],
            ["4", "route.ts", "Triggers ISR revalidation via revalidatePath('/tracker')"],
        ],
        col_widths=[0.5*inch, 1.1*inch, 5.1*inch]
    ),
    sp(10),
]

# 5. Data Models
story += [
    h1("5. Data Models (TypeScript)"),
    hr(),
    h2("5.1 visa-bulletin.ts"),
    sp(4),
    code("""\
export type DateValue = string; // ISO "YYYY-MM-DD" | "C" (Current) | "U" (Unavailable)

export interface ChargeabilityRow {
  allChargeability: DateValue;
  china: DateValue;
  india: DateValue;
  mexico: DateValue;
  philippines: DateValue;
}

export type CategoryTable = {
  [category: string]: ChargeabilityRow;
};

export interface VisaBulletin {
  fetchedAt: string;
  bulletinMonth: string;
  bulletinYear: number;
  employmentBased: {
    finalActionDates: CategoryTable;
    datesForFiling: CategoryTable;
  };
  familyBased: {
    finalActionDates: CategoryTable;
    datesForFiling: CategoryTable;
  };
}"""),
    sp(10),
    h2("5.2 visa-info.ts"),
    sp(4),
    code("""\
export interface VisaInfoContent {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  eligibility: { requirement: string; details: string }[];
  processSteps: { stepNumber: number; title: string; description: string; estimatedTime?: string }[];
  timeline: string;
  faqs: { question: string; answer: string }[];
}

export interface BilingualVisaInfo {
  en: VisaInfoContent;
  zh: VisaInfoContent;
}"""),
    sp(10),
]

# 6. i18n Content Strategy
story += [
    h1("6. i18n Content Strategy"),
    hr(),
    body("Two-tier architecture to handle both short UI strings and long-form visa content efficiently."),
    sp(8),
    make_table(
        ["Tier", "What it covers", "Storage", "Example"],
        [
            ["1 — UI Chrome", "Nav, buttons, labels, page titles", "messages/en.json & zh.json", '"tracker.title": "Green Card Priority Date Tracker"'],
            ["2 — Visa Content", "Eligibility, steps, FAQs, overviews", "src/data/visa-info/*.ts", "h1bInfo.zh.title = \"H-1B 签证\""],
        ],
        col_widths=[1.1*inch, 1.5*inch, 1.8*inch, 2.3*inch]
    ),
    sp(10),
]

# 7. Branch Strategy
story += [
    h1("7. Branch Strategy"),
    hr(),
    make_table(
        ["Branch", "Purpose"],
        [
            ["feat/project-setup", "Next.js 14 init, Tailwind CSS, next-intl, folder scaffold"],
            ["feat/visa-info-pages", "All 6 visa info pages with bilingual EN/ZH content"],
            ["feat/green-card-tracker", "Tracker UI, API routes, ISR revalidation"],
            ["feat/visa-bulletin-cron", "Cron job, Vercel KV storage, HTML parser"],
            ["feat/i18n-bilingual", "i18n wiring, locale switcher, message files"],
        ],
        col_widths=[2.4*inch, 4.3*inch]
    ),
    sp(16),
    hr(),
    sp(8),
    Paragraph("End of Design Document", ParagraphStyle("end", parent=body_style,
        alignment=TA_CENTER, textColor=colors.grey, fontSize=9)),
]

# ── Generate PDF ──────────────────────────────────────────────────────────────
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    leftMargin=inch,
    rightMargin=inch,
    topMargin=inch,
    bottomMargin=0.8*inch,
    title="ImmiTracker — Project Design Document",
    author="ImmiTracker Team",
)
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f"PDF written to: {OUTPUT}")
