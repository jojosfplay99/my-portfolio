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
            {projects.map((p) => {
              // Condition checking for the unbuilt items
              const isComingSoon = p.id === 'ai-auto-reply' || p.id === 'smart-notification';

              // The core layout wrapper logic for the card content
              const CardContent = (
                <Card accent={p.accent} className={`flex h-full flex-col relative transition-all duration-300 ${isComingSoon ? 'select-none' : ''}`}>
                  
                  {/* THUMBNAIL LAYOUT */}
                  <div className="relative mb-5 overflow-hidden rounded-lg border border-ink-700 bg-ink-950 bg-grid">
                    <div
                      className={`absolute inset-0 ${
                        p.accent === 'emerald' ? 'bg-emerald-500/5' : 'bg-cyan-500/5'
                      }`}
                    />
                    
                    {/* INTERACTIVE BLUR INSIDE THE ACCENT CONTAINER */}
                    {isComingSoon && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/80 backdrop-blur-[2px] border border-dashed border-ink-700 rounded-lg">
                        <span className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md border bg-ink-900 ${
                          p.accent === 'emerald' ? 'border-emerald-500/30 text-emerald-400' : 'border-cyan-500/30 text-cyan-400'
                        }`}>
                          System Deploying Soon
                        </span>
                      </div>
                    )}

                    <div className={`relative flex items-center justify-between gap-1.5 px-3 py-6 ${isComingSoon ? 'opacity-20' : ''}`}>
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

                  {/* DETAILS */}
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

                  {/* FOOTER BUTTON CHANGES */}
                  <div
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                      isComingSoon 
                        ? 'text-ink-600 cursor-not-allowed' 
                        : p.accent === 'emerald' ? 'text-emerald-300' : 'text-cyan-300'
                    }`}
                  >
                    {isComingSoon ? 'Architecture Private' : 'View Case Study'}
                    {!isComingSoon && (
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </div>
                </Card>
              );

              // CONDITIONAL LINK OVERRIDE — Drops Link to prevent access
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
    </div>
  );
}
