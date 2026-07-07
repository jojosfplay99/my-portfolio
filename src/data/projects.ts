export type Project = {
  id: string;
  title: string;
  teaser: string;
  tech: string[];
  accent: 'emerald' | 'cyan';
  category: string;
  year: string;
  caseStudy: {
    executiveSummary: string;
    challenge: string[];
    architecture: string[];
    dataResiliency: string[];
    outcome: { label: string; value: string }[];
  };
};

export const projects: Project[] = [
  {
  id: 'email-triage',
  title: 'Enterprise AI Email Ingestion & Sorting Engine',
  teaser:
    'An automated AI triage pipeline that classifies, cleans, and routes inbound emails — saving operations 15+ hours a week of manual inbox sorting.',
  tech: ['n8n', 'Groq', 'JavaScript', 'Google Sheets'],
  accent: 'emerald',
  category: 'Workflow Automation',
  year: '2026',
  caseStudy: {
    executiveSummary:
      'A high-volume corporate inbox was drowning in newsletter noise, admin alerts, and cold outreach — burying hot sales leads. This automated AI triage pipeline classifies every inbound email, strips prompt-injection vectors using custom JavaScript, and routes high-intent leads into structured Google Sheets tracking logs in seconds. The result: 100% automated triage, zero sheet duplication, and 15+ hours of manual sorting reclaimed every week.',
    challenge: [
      'A single shared corporate inbox received hundreds of emails per day across newsletters, system alerts, vendor invoices, and genuine sales inquiries.',
      'Hot leads were getting buried under administrative noise, with first-response times stretching past 24 hours — well past the window where conversion rates hold.',
      'Manual sorting by operations staff was inconsistent, error-prone, and consumed 15+ hours of skilled labor every week.',
      'Naive keyword filters produced false positives, misrouting invoices as leads and leads as spam, eroding trust in any automated rule.',
    ],
    architecture: [
      'An n8n workflow orchestrates the full pipeline: IMAP polling → Custom JS data hygiene → Groq AI classification → Defensive deduplication → Google Sheets routing.',
      'A custom JavaScript data-hygiene node runs before the LLM call, stripping URLs, tracking pixels, and text noise to neutralize prompt-injection vectors and reduce token weight.',
      'Groq-hosted Llama models perform zero-shot classification into a fixed label set (Lead, Newsletter, Alert, Invoice, Other) with a strict, structured JSON schema response.',
      'The clean, verified outputs are instantly dispatched directly to dedicated operations and lead tracking spreadsheets via secure n8n integration nodes.',
    ],
    dataResiliency: [
      'A defensive read-before-write lookup node queries the existing Google Sheet records by email before any append operation, intercepting empty or double-submitted entries.',
      'When the upstream email payload is missing data or malformed, the node short-circuits to prevent writing [Object: {}] placeholders or blank rows into the business spreadsheet.',
      'A custom validation rule acts as a hard backstop within the data mapping block, guaranteeing 0% lead duplication even during peak email influx hours.',
      'The pipeline maintains a secondary historical tab inside Google Sheets acting as a transparent audit log, giving operations full traceability from raw email to categorized entry.',
    ],
    outcome: [
      { label: 'Automated Triage', value: '100%' },
      { label: 'Sheet Duplication', value: '0%' },
      { label: 'Hours Saved / Week', value: '15+' },
    ],
  },
},
  {
    id: 'lead-enrichment',
    title: 'Real-Time Lead Enrichment & CRM Sync',
    teaser:
      'A webhook-driven enrichment pipeline that augments inbound form submissions with firmographic data and syncs them to the CRM in under 3 seconds.',
    tech: ['n8n', 'Clearbit', 'Postgres', 'Slack', 'Webhooks'],
    accent: 'cyan',
    category: 'Data Enrichment',
    year: '2025',
    caseStudy: {
      executiveSummary:
        'Inbound form submissions were landing in the CRM with nothing but a name and email. This pipeline enriches every lead with company size, industry, and revenue in real time, scores them, and alerts sales in Slack — all before a human ever touches the record.',
      challenge: [
        'Sales reps were spending the first 10 minutes of every call researching the prospect on LinkedIn.',
        'Leads with incomplete data were deprioritized, even when they represented high-value accounts.',
        'Manual enrichment was inconsistent and rarely kept pace with inbound volume.',
      ],
      architecture: [
        'A webhook triggers the n8n workflow on every form submission, passing the raw payload to an enrichment node.',
        'Clearbit and a custom scraping node pull firmographic data, normalized into a single schema.',
        'A scoring node weights industry, company size, and engagement signals into a 0–100 priority score.',
        'The enriched record upserts into Postgres and fires a formatted Slack alert to the right rep channel.',
      ],
      dataResiliency: [
        'Enrichment failures fall back to a partial-record write with a flag, never silently dropping the lead.',
        'A retry queue with exponential backoff handles transient API timeouts from third-party providers.',
      ],
      outcome: [
        { label: 'Enrichment Latency', value: '<3s' },
        { label: 'Sales Research Time', value: '-90%' },
        { label: 'Enriched Fields / Lead', value: '12' },
      ],
    },
  },
  {
    id: 'ops-dashboard',
    title: 'Operations Command Dashboard',
    teaser:
      'A real-time React dashboard unifying pipeline health, lead velocity, and automation uptime into a single pane of glass for operations teams.',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Recharts'],
    accent: 'emerald',
    category: 'Internal Tooling',
    year: '2024',
    caseStudy: {
      executiveSummary:
        'Operations had no visibility into the automations running underneath them — failures surfaced only when a customer complained. This dashboard gives a live, single-pane view of every pipeline, its health, and the leads flowing through it.',
      challenge: [
        'Automation failures were discovered reactively, often days after they broke.',
        'Lead velocity metrics lived in three different spreadsheets with conflicting definitions.',
        'No single source of truth for operations health existed.',
      ],
      architecture: [
        'A React + TypeScript frontend subscribes to Supabase realtime channels for live pipeline events.',
        'A normalized metrics layer computes lead velocity, conversion, and uptime from the audit log.',
        'Role-based access lets ops, sales, and engineering each see their relevant slice.',
      ],
      dataResiliency: [
        'The dashboard degrades gracefully — if a realtime channel drops, it falls back to polling.',
        'All metrics are computed from the immutable audit log, so historical values never drift.',
      ],
      outcome: [
        { label: 'Mean Time to Detect', value: '-85%' },
        { label: 'Pipelines Monitored', value: '24' },
        { label: 'Uptime Visibility', value: '100%' },
      ],
    },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
