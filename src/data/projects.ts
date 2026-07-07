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
    tech: ['n8n', 'LLM (OpenAI/Groq/Ollama)', 'JavaScript', 'Google Sheets'],
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
        'An n8n workflow orchestrates the full pipeline: IMAP polling → Custom JS data hygiene → Model-agnostic AI classification → Defensive deduplication → Google Sheets routing.',
        'A custom JavaScript data-hygiene node runs before the AI call, stripping URLs, tracking pixels, and text noise to neutralize prompt-injection vectors and reduce token weight.',
        'An OpenAI-compatible LLM connector performs zero-shot classification into a fixed label set (Lead, Newsletter, Alert, Invoice, Other) with a strict, structured JSON schema response.',
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
    id: 'ai-auto-reply',
    title: 'Context-Aware AI Communication & Auto-Response Engine',
    teaser:
      'An intelligent communication pipeline that references historical transaction logs to generate personalized, context-aware email responses—eliminating standard template replies.',
    tech: ['n8n', 'LLM Gateway', 'Google Sheets / DB', 'IMAP/SMTP'],
    accent: 'cyan',
    category: 'Workflow Automation',
    year: '2026',
    caseStudy: {
      executiveSummary:
        'Standard auto-responders feel cold and generic, often failing to address specific customer history. This pipeline intercepts incoming business emails, queries historical client communication and status logs from a database or spreadsheet, and uses an LLM to draft a highly tailored response. It ensures every customer receives an instant, intelligent, and contextually accurate reply while logging the entire conversation automatically.',
      challenge: [
        'Standard "we received your email" templates left clients waiting and failed to answer immediate, basic account questions.',
        'Support agents spent hours copy-pasting answers and manually verifying a customer’s previous interactions across fragmented history logs.',
        'Drafting unique, personalized responses manually during peak hours created massive operational bottlenecks and slowed down response times.',
      ],
      architecture: [
        'An n8n workflow polls incoming messages and extracts the sender profile, immediately triggering a historical data lookup.',
        'A database or Google Sheets search node pulls the last 5 conversation logs, purchase records, or client status details associated with that email.',
        'An AI model references this historical log to dynamically generate a highly relevant, highly personalized draft response tailored to that specific client.',
        'The pipeline automatically dispatches the response or saves it as a pending draft, simultaneously appending the new message to the centralized conversation log.',
      ],
      dataResiliency: [
        'If no historical data or log match is found for the email address, the system falls back to a professional, general conversational draft rather than failing.',
        'A verification filter checks for blank fields or looping message threads, completely preventing automated infinite loops or malformed text deliveries.',
      ],
      outcome: [
        'First-Response Latency', value: '<2m' },
        { label: 'Contextual Accuracy', value: '98%' },
        { label: 'Manual Drafting Saved', value: '20+ hrs/wk' },
      ],
    },
  },
  {
    id: 'smart-notification',
    title: 'Intelligent Email Alerting & Enterprise Escalation Pipeline',
    teaser:
      'A real-time AI classification system that instantly analyzes inbound business emails, alerts the team, and automatically escalates critical client inquiries to specialized departments.',
    tech: ['n8n', 'LLM Gateway', 'Slack / Teams', 'Google Sheets'],
    accent: 'emerald',
    category: 'Incident Management',
    year: '2026',
    caseStudy: {
      executiveSummary:
        'Critical business requests and urgent operational issues are frequently buried in generic mailboxes, leading to costly delays. This intelligent notification engine analyzes incoming email intent, extracts key urgency signals, and routes structured alerts directly to internal communication channels (like Slack or Teams). High-priority crises are instantly escalated to specified leadership teams, ensuring zero operational downtime.',
      challenge: [
        'Urgent client requests or technical issues sat unnoticed in unmonitored inboxes for hours, risking customer churn and missed deadlines.',
        'Manually forwarding emails to the correct departments (billing, technical support, sales) wasted operational hours and introduced human error.',
        'Teams lacked immediate visibility into incoming message volume, resulting in reactive troubleshooting instead of proactive management.',
      ],
      architecture: [
        'An n8n webhook or polling node ingests raw inbound emails, passing the metadata into a light text pre-processor.',
        'An AI categorization engine analyzes the email text for urgency, intent, and department matching based on a fixed organizational routing rubric.',
        'The workflow formats a clean, scannable internal alert (including a summary, sentiment score, and direct deep-link to the email).',
        'The alert is instantly delivered to specific department channels, while a priority routing node uses secondary escalation channels if a critical flag is triggered.',
      ],
      dataResiliency: [
        'If internal chat APIs experience a temporary outage, the pipeline safely cascades notifications to a backup spreadsheet and SMS alert system.',
        'All raw categorization data is backed up to an immutable audit sheet, giving operations teams complete visibility into daily routing accuracy.',
      ],
      outcome: [
        'Critical Alert Delivery', value: '<30s' },
        { label: 'Misrouted Communications', value: '0%' },
        { label: 'Team Response Velocity', value: '-75%' },
      ],
    },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
