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
    tech: ['n8n', 'Groq', 'React', 'Google Sheets', 'Supabase'],
    accent: 'emerald',
    category: 'Workflow Automation',
    year: '2025',
    caseStudy: {
      executiveSummary:
        'A high-volume corporate inbox was drowning in newsletter noise, admin alerts, and cold outreach — burying hot sales leads. This automated AI triage pipeline classifies every inbound email, strips prompt-injection vectors, and routes high-intent leads into a structured database in seconds. The result: 100% automated triage, zero lead duplication, and 15+ hours of manual sorting reclaimed every week.',
      challenge: [
        'A single shared corporate inbox received 400+ emails per day across newsletters, system alerts, vendor invoices, and genuine sales inquiries.',
        'Hot leads were getting buried under administrative noise, with first-response times stretching past 24 hours — well past the window where conversion rates hold.',
        'Manual sorting by operations staff was inconsistent, error-prone, and consumed 15+ hours of skilled labor every week.',
        'Naive keyword filters produced false positives, misrouting invoices as leads and leads as spam, eroding trust in any automated rule.',
      ],
      architecture: [
        'An n8n workflow orchestrates the full pipeline: IMAP polling → AI classification → data hygiene → deduplication → routing.',
        'A custom JavaScript data-hygiene node runs before the LLM call, stripping URLs, tracking pixels, and forwarded noise to neutralize prompt-injection vectors and reduce token weight.',
        'Groq-hosted Llama 3 performs zero-shot classification into a fixed label set (lead / newsletter / alert / invoice / other) with a structured JSON schema response.',
        'A React dashboard surfaces the live triage queue and lets humans override any classification, feeding corrections back into the routing rules.',
      ],
      dataResiliency: [
        'A read-before-write lookup queries the leads database by email + source hash before any insert, intercepting empty API states that would otherwise write [Object: {}] placeholders.',
        'When the upstream API returns an empty or malformed payload, the node short-circuits and logs the event instead of persisting garbage data.',
        'A composite unique constraint on (email, source) at the database layer acts as a hard backstop, guaranteeing 0% lead duplication even under concurrent writes.',
        'Every step emits structured logs to a Supabase audit table, giving operations full traceability from raw email to routed lead.',
      ],
      outcome: [
        { label: 'Automated Triage', value: '100%' },
        { label: 'Lead Duplication', value: '0%' },
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
