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
      'A busy inbox was getting buried — newsletters, automated alerts, and cold outreach were burying the emails that actually mattered: real customer leads. This automation checks unread emails in small batches, cleans up the text (removing junk links and anything suspicious), and uses AI to sort each one into the right category. It then automatically identifies genuine business leads and adds them straight to a Google Sheet — with no duplicates — so your team can follow up in seconds instead of digging through a cluttered inbox.',
    challenge: [
      'The shared team inbox was getting hundreds of emails a day, and staff were spending too much time just sorting through them.',
      'Real sales inquiries and customer questions kept getting buried under system alerts, newsletters, and vendor invoices.',
      'Important leads often didn\'t get a reply within 24 hours, which hurt the chances of turning them into paying customers.',
      'Manual sorting was inconsistent — emails got miscategorized, follow-ups were missed, and the team lost 15+ hours a week just organizing messages.',
      'Basic keyword filters didn\'t work well either — they often mislabeled real leads as spam, or flagged routine alerts as urgent.',
    ],
    architecture: [
      'Every so often, the system automatically checks for new work to do — no one has to click a button to start it.',
      'It logs into your Gmail and grabs the 5 (or more) newest unread emails, so it never gets overwhelmed by a huge inbox all at once.',
      "It handles each email one at a time. This way, if one email causes a hiccup, it won't stop the rest from going through.",
      'Before the AI reads an email, the system cleans it up — removing tracking junk, formatting clutter, and long links — so the AI can focus on what actually matters (and it keeps costs down too).',
      "The cleaned-up email is sent to a fast AI model that reads it and pulls out the key info: what category it belongs to, who it's from, a short summary, and how confident it is in that read.",
      "The system then matches the AI's labels to the actual folder/tag names already set up in your email account.",
      'All the extracted details get tidied up and put into a consistent, organized format.',
      "Finally, the system goes back into Gmail and applies the right label to the email automatically — so it's sorted and ready for you without you lifting a finger.",
    ],
    dataResiliency: [
      'The system checks what category each email was sorted into. Stuff like newsletters, alerts, and invoices gets quietly set aside — it skips extra processing since it\'s not something you need to act on.',
      "Emails that look like real business leads get checked against your master client list, using the sender's email address to see if this person has contacted you before.",
      'The system looks at that check and decides: is this a brand new contact, or someone already in the system?',
      "If it's a new contact, their info gets added to your master list — safely, without duplicating or overwriting anyone already there.",
      "Whether they're new or returning, every contact's message gets logged in your CRM, so you always have a full history of the conversation in one place.",
      "Lastly, the system pauses for about 15 seconds between cycles. This isn't a flaw — it's a safety buffer that keeps everything running smoothly and stops the email service from cutting you off for going too fast.",
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
