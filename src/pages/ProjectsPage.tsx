import { ArrowUpRight } from 'lucide-react';
import { Card, Badge, SectionHeading } from '../components/ui';
import { Link } from '../components/router';
import { projects } from '../data/projects';

export function ProjectsPage() {
  return (
    <div className="pt-28">
      <section className="relative overflow-hidden bg-radial-fade py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Case Studies"
            title="Automations in production"
            description="Each project below is a real operational problem solved with a pipeline that runs itself. Click through for the full Problem → Solution → Impact breakdown."
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="block h-full">
                <Card accent={p.accent} className="flex h-full flex-col">
                  <div className="relative mb-5 overflow-hidden rounded-lg border border-ink-700 bg-ink-950 bg-grid">
                    <div
                      className={`absolute inset-0 ${
                        p.accent === 'emerald' ? 'bg-emerald-500/5' : 'bg-cyan-500/5'
                      }`}
                    />
                    <div className="relative flex items-center justify-between gap-1.5 px-3 py-6">
                      {p.tech.slice(0, 4).map((t, i) => (
                        <div key={i} className="flex flex-1 items-center">
                          <div
                            className={`flex h-9 w-full max-w-[80px] items-center justify-center rounded-md border bg-ink-850 px-1 text-[9px] font-medium ${
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
                  <h3 className="text-xl font-semibold leading-snug text-ink-100">{p.title}</h3>
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
                      p.accent === 'emerald' ? 'text-emerald-300' : 'text-cyan-300'
                    }`}
                  >
                    View Case Study
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
