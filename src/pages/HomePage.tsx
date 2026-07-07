import { ArrowRight, Zap, Database, ShieldCheck, Gauge, ArrowUpRight } from 'lucide-react';
import { Button, Card, SectionHeading, Badge, type Accent } from '../components/ui';
import { Link } from '../components/router';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { projects } from '../data/projects';

const valueProps: { icon: typeof Zap; title: string; body: string; accent: Accent }[] = [
  {
    icon: Zap,
    title: 'Instant Lead Triage',
    body: 'Shortening response times by routing high-intent leads the moment they arrive — before competitors even open their inbox.',
    accent: 'emerald',
  },
  {
    icon: ShieldCheck,
    title: '100% Data Integrity',
    body: 'Eliminating duplicate data entries with robust read-before-write validation layers that intercept empty states before they persist.',
    accent: 'cyan',
  },
  {
    icon: Gauge,
    title: 'Operational Efficiency',
    body: 'Silently filtering administrative background noise to reclaim manual overhead hours and let your team focus on revenue work.',
    accent: 'emerald',
  },
];

export function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-radial-fade pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-850/80 px-4 py-1.5 font-mono text-xs text-ink-300 backdrop-blur-sm animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Automation Engineer · Operations Developer
            </div>
            <h1 className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-ink-100 sm:text-5xl md:text-6xl">
  I turn chaotic business tasks into{' '}
  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
    organized, automated systems.
  </span>
</h1>
<p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-400 [animation-delay:100ms]">
  Stop wasting hours manually reading emails, updating spreadsheets, and copying data between apps. 
  I build smart AI pipelines that handle the busywork for you, ensuring your information is always 
  clean, organized, and right where it needs to go.
</p>
            <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:200ms] sm:flex-row">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Start a Conversation
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero workflow preview */}
          <div className="mx-auto mt-16 max-w-4xl animate-fade-up [animation-delay:300ms]">
            <WorkflowCanvas
              accent="emerald"
              nodes={[
                { label: 'IMAP Inbox', sub: 'trigger' },
                { label: 'Data Hygiene', sub: 'JS node', accent: 'cyan' },
                { label: 'AI Classify', sub: 'Groq LLM' },
                { label: 'Dedupe', sub: 'read-before-write', accent: 'cyan' },
                { label: 'CRM Route', sub: 'output' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="border-t border-ink-800 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Why It Matters"
            title="Technical depth, translated to business ROI"
            description="Every automation I build is measured by the hours it returns and the errors it prevents — not just the code behind it."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {valueProps.map((v) => (
              <Card key={v.title} accent={v.accent} className="flex flex-col">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${
                    v.accent === 'emerald'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  }`}
                >
                  <v.icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-ink-100">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{v.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-t border-ink-800 bg-ink-950/50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Featured Work"
              title="Selected case studies"
              description="A look at the automations quietly running underneath real businesses."
            />
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-sm font-medium text-emerald-300 hover:text-emerald-200"
            >
              All projects
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const isComingSoon = p.id === 'ai-auto-reply' || p.id === 'smart-notification';

              const CardContent = (
                <Card accent={p.accent} className="flex h-full flex-col relative">
                  {/* Canvas screenshot placeholder */}
                  <div className="relative mb-5 overflow-hidden rounded-lg border border-ink-700 bg-ink-950 bg-grid">
                    
                    {/* COMING SOON OVERLAY GRAPHIC */}
                    {isComingSoon && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/80 backdrop-blur-[2px] border border-dashed border-ink-700 rounded-lg">
                        <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border bg-ink-900 ${
                          p.accent === 'emerald' ? 'border-emerald-500/30 text-emerald-400' : 'border-cyan-500/30 text-cyan-400'
                        }`}>
                          In Development
                        </span>
                      </div>
                    )}

                    <div className={`absolute inset-0 ${p.accent === 'emerald' ? 'bg-emerald-500/5' : 'bg-cyan-500/5'}`} />
                    <div className={`relative flex items-center justify-between gap-1.5 px-3 py-5 ${isComingSoon ? 'opacity-20' : ''}`}>
                      {p.tech.slice(0, 4).map((t, i) => (
                        <div key={i} className="flex flex-1 items-center">
                          <div
                            className={`flex h-9 w-full max-w-[70px] items-center justify-center rounded-md border bg-ink-850 px-1 text-[9px] font-medium ${
                              p.accent === 'emerald'
                                ? 'border-emerald-500/30 text-emerald-300'
                                : 'border-cyan-500/30 text-cyan-300'
                            }`}
                          >
                            <span className="truncate">{t}</span>
                          </div>
                          {i < p.tech.slice(0, 4).length - 1 && (
                            <div
                              className={`mx-0.5 h-px w-3 ${
                                p.accent === 'emerald' ? 'bg-emerald-500/40' : 'bg-cyan-500/40'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                    <span>{p.category}</span>
                    <span className="text-ink-700">·</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-ink-100">{p.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-400">{p.teaser}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t} accent={p.accent}>
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                      isComingSoon 
                        ? 'text-ink-600 cursor-not-allowed' 
                        : p.accent === 'emerald' ? 'text-emerald-300' : 'text-cyan-300'
                    }`}
                  >
                    {isComingSoon ? 'Pipeline Launching Soon' : 'View Case Study'}
                    {!isComingSoon && (
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </div>
                </Card>
              );

              if (isComingSoon) {
                return (
                  <div key={p.id} className="block h-full cursor-not-allowed group">
                    {CardContent}
                  </div>
                );
              }

              return (
                <Link key={p.id} to={`/projects/${p.id}`} className="block h-full group">
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-ink-800 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-850/60 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative">
              <Database className="mx-auto mb-4 text-emerald-400" size={28} />
              <h2 className="text-2xl font-bold tracking-tight text-ink-100 sm:text-3xl">
                Have a manual bottleneck that should run itself?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-ink-400">
                Let's map the messy part of your operation and turn it into a pipeline that never sleeps.
              </p>
              <Link to="/contact" className="mt-7 inline-block">
                <Button size="lg">
                  Email Me
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
