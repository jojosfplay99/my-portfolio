import { ArrowLeft, ArrowRight, AlertTriangle, Cpu, ShieldCheck, TrendingUp, FileText, Check } from 'lucide-react';
import { Badge, Button, type Accent } from '../components/ui';
import { Link } from '../components/router';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { getProject, projects } from '../data/projects';

const accentText: Record<Accent, string> = {
  emerald: 'text-emerald-300',
  cyan: 'text-cyan-300',
};
const accentBorder: Record<Accent, string> = {
  emerald: 'border-emerald-500/30',
  cyan: 'border-cyan-500/30',
};
const accentBg: Record<Accent, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
};

function CaseStudySection({
  icon: Icon,
  label,
  title,
  accent,
  children,
}: {
  icon: typeof AlertTriangle;
  label: string;
  title: string;
  accent: Accent;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentBorder[accent]} ${accentBg[accent]}`}
          >
            <Icon size={18} strokeWidth={2} />
          </div>
          <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText[accent]}`}>
            {label}
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-ink-100 sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-4">{children}</div>
      </div>
    </section>
  );
}

export function ProjectPage({ id }: { id: string }) {
  const project = getProject(id);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <p className="font-mono text-sm text-ink-500">404 — project not found</p>
        <Link to="/projects" className="mt-4">
          <Button variant="outline">
            <ArrowLeft size={16} /> Back to projects
          </Button>
        </Link>
      </div>
    );
  }

  const cs = project.caseStudy;
  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative overflow-hidden bg-radial-fade pt-20 pb-12 sm:pt-24">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
          <Link
            to="/projects"
            className="group mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-ink-400 hover:text-ink-200"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
            <span>{project.category}</span>
            <span className="text-ink-700">·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink-100 sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-400">{project.teaser}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} accent={project.accent}>
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="border-t border-ink-800 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentBorder[project.accent]} ${accentBg[project.accent]}`}
            >
              <FileText size={18} strokeWidth={2} />
            </div>
            <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText[project.accent]}`}>
              Executive Summary
            </span>
          </div>
          <p className="text-lg leading-relaxed text-ink-200">{cs.executiveSummary}</p>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="border-t border-ink-800 bg-ink-950/40">
        <CaseStudySection
          icon={AlertTriangle}
          label="The Challenge"
          title="The problem before the pipeline"
          accent={project.accent}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-6 -mt-2">
            <ul className="space-y-3">
              {cs.challenge.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-lg border border-ink-700 bg-ink-850/50 p-4"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${accentBorder[project.accent]} font-mono text-[10px] ${accentText[project.accent]}`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-300">{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </CaseStudySection>
      </section>

      {/* ARCHITECTURE */}
      <section className="border-t border-ink-800 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentBorder[project.accent]} ${accentBg[project.accent]}`}
            >
              <Cpu size={18} strokeWidth={2} />
            </div>
            <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText[project.accent]}`}>
              The Architecture
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-ink-100 sm:text-3xl">
            How the pipeline is wired
          </h2>

          {/* n8n canvas screenshot placeholder */}
          {/* Interactive Workflow Canvas Implementation */}
          <div className="my-10 h-[220px] w-full">
            {/* Interactive Workflow Canvas */}
{/* Interactive Workflow Canvas */}
<div className="my-10">
  <WorkflowCanvas
    accent={project.accent}
    nodes={
      project.id === 'email-triage' || project.id === 'email-sorting'
        ? [
            { id: 'ingest', label: '1. Gmail Ingestion', sub: 'Fetch 5 Unread', gridX: 0, gridY: 1, connections: ['loop'] },
            { id: 'loop', label: '2. Loop Engine', sub: 'Split in Batches', gridX: 1, gridY: 1, connections: ['cleaner'] },
            { id: 'cleaner', label: '3. JS Clean Room', sub: 'Regex Text Hygiene', gridX: 2, gridY: 1, connections: ['llm'] },
            { id: 'llm', label: '4. Groq LLM Chain', sub: 'GPT-OSS Parse', gridX: 3, gridY: 1, connections: ['lookup'] },
            { id: 'lookup', label: '5. Label Lookup', sub: 'Match Internal IDs', gridX: 4, gridY: 1, connections: ['set'] },
            { id: 'set', label: '6. Edit Fields', sub: 'Stage Metadata Set', gridX: 5, gridY: 1, connections: ['gmail_label'] },
            { id: 'gmail_label', label: '7. Gmail Router', sub: 'Apply Label API', gridX: 6, gridY: 1, connections: ['if_business'] },
            
            // Split 1: Business Check Node
            { 
              id: 'if_business', 
              label: '8. IF Router', 
              sub: 'Check Business Tag', 
              gridX: 7, 
              gridY: 1,
              isConditional: true,
              connections: [
                { targetId: 'sheet_lookup', label: 'True', sourceHandle: 'true-out' },
                { targetId: 'delay', label: 'False', isMuted: true, sourceHandle: 'false-out' }
              ] 
            },
            
            { id: 'sheet_lookup', label: '9. Sheet Lookup', sub: 'Query Email Record', gridX: 8, gridY: 1, connections: ['if_exists'] },
            
            // Split 2: Lead Exist Check Node
            { 
              id: 'if_exists', 
              label: '10. IF Record Check', 
              sub: 'New or Existing?', 
              gridX: 9, 
              gridY: 1,
              isConditional: true,
              connections: [
                { targetId: 'master_add', label: 'New', sourceHandle: 'true-out' },
                { targetId: 'crm_conv', label: 'Exists', sourceHandle: 'false-out' }
              ] 
            },
            
            // Branch Destinations
            { id: 'master_add', label: '11. Master Update', sub: 'Log New Contact', gridX: 10, gridY: 0, connections: ['crm_conv'] },
            { id: 'crm_conv', label: '12. CRM Sync', sub: 'Log Conversation', gridX: 11, gridY: 1, connections: ['delay'] },
            
            // Convergence Node
            { id: 'delay', label: '13. Delay Guard', sub: '15s Limit Buffer', gridX: 12, gridY: 1 }
          ]
        : [
            { id: 'n1', label: 'Data Ingestion', sub: 'Webhook Trigger', gridX: 0, gridY: 1, connections: ['n2'] },
            { id: 'n2', label: 'Core Pipeline', sub: 'Data Transformer', gridX: 1, gridY: 1, connections: ['n3'] },
            { id: 'n3', label: 'Destination Sync', sub: 'External API Export', gridX: 2, gridY: 1 }
          ]
    }
  />
</div>
          </div>

          <div className="mt-8 space-y-4">
            {cs.architecture.map((a, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-ink-700 bg-ink-850/50 p-4"
              >
                <Check size={16} className={`mt-0.5 shrink-0 ${accentText[project.accent]}`} />
                <p className="text-sm leading-relaxed text-ink-300">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA RESILIENCY */}
      <section className="border-t border-ink-800 bg-ink-950/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentBorder[project.accent]} ${accentBg[project.accent]}`}
            >
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText[project.accent]}`}>
              Data Resiliency Layer
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-ink-100 sm:text-3xl">
            Defensive logic that prevents garbage data
          </h2>
          <div className="mt-6 space-y-4">
            {cs.dataResiliency.map((d, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-ink-700 bg-ink-850/50 p-4"
              >
                <ShieldCheck size={16} className={`mt-0.5 shrink-0 ${accentText[project.accent]}`} />
                <p className="text-sm leading-relaxed text-ink-300">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS OUTCOME */}
      <section className="border-t border-ink-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="mb-8 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentBorder[project.accent]} ${accentBg[project.accent]}`}
            >
              <TrendingUp size={18} strokeWidth={2} />
            </div>
            <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText[project.accent]}`}>
              The Business Outcome
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-ink-100 sm:text-3xl">
            Measured impact, in production
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cs.outcome.map((o) => (
              <div
                key={o.label}
                className={`group relative overflow-hidden rounded-2xl border ${accentBorder[project.accent]} bg-ink-850/60 p-6 text-center transition-all duration-300 hover:bg-ink-800/80`}
              >
                <div
                  className={`pointer-events-none absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full blur-2xl ${
                    project.accent === 'emerald' ? 'bg-emerald-500/20' : 'bg-cyan-500/20'
                  }`}
                />
                <p
                  className={`relative font-mono text-4xl font-bold sm:text-5xl ${accentText[project.accent]}`}
                >
                  {o.value}
                </p>
                <p className="relative mt-2 text-sm font-medium text-ink-300">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT PROJECTS */}
      <section className="border-t border-ink-800 bg-ink-950/50 py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
            More case studies
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="block">
                <div
                  className={`group rounded-xl border border-ink-700 bg-ink-850/50 p-5 transition-all duration-300 hover:border-ink-600 hover:bg-ink-800/80 ${
                    p.accent === 'emerald' ? 'hover:shadow-glow-emerald' : 'hover:shadow-glow-cyan'
                  }`}
                >
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                    {p.category}
                  </div>
                  <h4 className="text-base font-semibold text-ink-100">{p.title}</h4>
                  <div
                    className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium ${
                      p.accent === 'emerald' ? 'text-emerald-300' : 'text-cyan-300'
                    }`}
                  >
                    Read case study
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink-100">
            Want a pipeline like this for your operation?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-400">
            Let's map your bottleneck and architect the automation that removes it.
          </p>
          <Link to="/contact" className="mt-7 inline-block">
            <Button size="lg">
              Email Me
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
