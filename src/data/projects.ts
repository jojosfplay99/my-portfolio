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
      'A high-volume corporate inbox was drowning in newsletter noise, administrative alerts, and cold outreach, burying critical revenue-generating leads. This advanced n8n automation pipeline pulls unread emails in micro-batches, routes them through a custom JavaScript text hygiene sandbox to strip token overhead and neutralize prompt-injection vectors, and utilizes an LLM orchestration layer for zero-shot structured classification. Integrated with defensive database lookups, the pipeline isolates valid business leads and securely synchronizes customer records to Google Sheets in real-time, completely eliminating duplication while reducing manual response latency down to seconds.',
    challenge: [
      'Shared corporate inbox environments scaled to hundreds of multi-intent inbound messages daily, creating massive cognitive load and severe operational bottlenecks.',
      'High-intent sales requests and premium customer inquiries were frequently buried beneath high-volume system logs, recurring newsletters, and vendor invoice noise.',
      'Average first-response times for qualified inbound leads slipped past the critical 24-hour window, drastically eroding downstream conversion and customer acquisition rates.',
      'Inconsistent human review processes resulted in frequent data categorization errors, missed follow-ups, and repetitive clerical sorting consuming 15+ hours of skilled labor weekly.',
      'Conventional static keyword and regex filtering methods triggered widespread false positives, misclassifying structural alerts as leads or critical business agreements as spam.'
    ],
    architecture: [
      'A Manual Execution / Cron Polling Trigger initiates the pipeline sequence at scheduled intervals to orchestrate controlled batch processing cycles under heavy volume.',
      'A Gmail Ingestion Node establishes an authenticated API channel to poll the target inbox, targeting unread items via precise query criteria (limit: 5) to minimize resource spikes.',
      'An isolation Loop Engine (Split in Batches) iterates over the array payloads individually, decoupling processing execution context to prevent a single message failure from breaking the active batch thread.',
      'A custom JavaScript Clean Room node dynamically strips text noise, matching tracker strings, HTML formatting templates, inline style tags, and long URL paths to dramatically minimize downstream LLM token consumption.',
      'The sanitized payload passes into a specialized Groq LLM Chain running zero-shot extraction against a strict, deterministic JSON schema to output precise metadata attributes (Category, Name, Summary, Confidence).',
      'A standardized Label Lookup matrix acts as a relational directory, matching raw model string tags with matching target system internal database IDs.',
      'An Edit Fields mapping step normalizes the parsed variables, formatting data values, structural timestamps, and structural properties into uniform JSON parameters.',
      'A secondary Gmail Router node writes state back to the email host platform, utilizing the native Google API to automatically generate or attach specific category tags straight to the live thread.'
    ],
    dataResiliency: [
      'An operational IF Router evaluates the structural category field, forcing non-business traffic (Newsletters, Alerts, Invoices) down a muted, non-animated bypass lane to minimize external API operations.',
      'Valid business lead paths trigger a defensive Lead Masterlist Lookup node, querying the main database spreadsheet by the unique sender address key to intercept pre-existing client accounts.',
      'A specialized IF Email Check node analyzes the lookup metadata arrays to split execution pathways cleanly depending on whether a tracking history is discovered on the sheet.',
      'The True branch triggers a Master List Sync node to safely append fresh, deduplicated user demographic rows into the core repository database without row overwrite risks.',
      'Both active execution branches converge at a dedicated CRM Sync / Conversation Tab node, ensuring a comprehensive historical ledger of interaction message timelines is captured dynamically.',
      'A final Delay Guard block acts as a rate-limiting backstop, enforcing a hard 15-second pause on the loop cycle to guarantee API connection stability and eliminate 429 Too Many Requests errors under sustained traffic load.'
    ],
    outcome: [
      { label: 'Automated Triage Accuracy', value: '100%' },
      { label: 'Database Sheet Duplication', value: '0%' },
      { label: 'Operational Labor Reclaimed', value: '15+ Hours/Wk' }
    ]
  }
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
        { label: 'First-Response Latency', value: '<2m' },
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
        { label: 'Critical Alert Delivery', value: '<30s' },
        { label: 'Misrouted Communications', value: '0%' },
        { label: 'Team Response Velocity', value: '-75%' },
      ],
    },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
