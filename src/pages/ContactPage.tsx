import { useState, type FormEvent } from 'react';
import { Check, Clock, Loader2, Mail, MessageSquare, Send, Github, Linkedin, Inbox } from 'lucide-react';
import { Button } from '../components/ui';

type Status = 'idle' | 'submitting' | 'success';

export function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulated submission — in production this would POST to an edge function.
    setTimeout(() => setStatus('success'), 1200);
  };

  const reset = () => {
    setStatus('idle');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative overflow-hidden bg-radial-fade pt-24 pb-12 sm:pt-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
            <span className="h-px w-8 bg-emerald-500" />
            Let's Talk
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink-100 sm:text-4xl md:text-5xl">
            Fix the manual bottleneck running underneath your business.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-400">
            If a spreadsheet, a shared inbox, or a copy-paste workflow is quietly costing you hours
            every week — let's turn it into a pipeline that runs itself.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="border-t border-ink-800 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — pitch + socials */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-ink-100">
              What happens when you reach out
            </h2>
            <div className="mt-5 space-y-4 text-ink-400">
              <p className="leading-relaxed">
                Send a note describing the messy part of your operation — the inbox, the spreadsheet,
                the manual handoff — and I'll reply with a sketch of the automation that replaces it.
              </p>
              <p className="leading-relaxed">
                You get a clear architecture, even if we never work together. If we do, I handle the
                build end-to-end: pipeline, data layer, dashboard, and the defensive logic that keeps
                it honest.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                { icon: Mail, text: 'Direct email — no forms, no gatekeepers' },
                { icon: MessageSquare, text: 'Plain-English reply, no jargon dump' },
                { icon: Clock, text: 'Architecture sketch within 48 hours' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-ink-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <item.icon size={15} />
                  </span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-ink-800 pt-8">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
                Find me on
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ink-300 transition-all duration-200 hover:border-emerald-500/50 hover:text-emerald-300 hover:shadow-glow-emerald"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ink-300 transition-all duration-200 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-glow-cyan"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — direct email + form */}
          <div className="flex flex-col gap-6">
            {/* Direct Gmail card */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-ink-850/60 p-6 shadow-glow-emerald">
              <div className="pointer-events-none absolute -top-16 right-0 h-32 w-32 rounded-full bg-emerald-500/15 blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <Mail size={17} />
                  </span>
                  <h3 className="font-semibold text-ink-100">Email me directly</h3>
                </div>

                <a
                  href="mailto:jojosfplay@gmail.com"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-ink-700 bg-ink-950/60 p-4 transition-all duration-200 hover:border-emerald-500/50 hover:bg-ink-900"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-300">
                      <Inbox size={18} />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-mono text-sm font-semibold text-ink-100 group-hover:text-emerald-300">
                        jojosfplay@gmail.com
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">
                        Gmail · replies within 1 business day
                      </span>
                    </span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                    open →
                  </span>
                </a>

                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  Prefer email over forms? Click the address above and your mail client opens ready
                  to go. Tell me what's broken, what's manual, and what you'd automate first.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-850/60 p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  <Send size={17} />
                </span>
                <h3 className="font-semibold text-ink-100">Or send a message here</h3>
              </div>

              {status === 'success' ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                    <Check size={26} />
                  </span>
                  <p className="mt-4 text-lg font-semibold text-ink-100">Message sent.</p>
                  <p className="mt-1 text-sm text-ink-400">
                    I'll get back to you within one business day.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-5 text-sm font-medium text-emerald-300 hover:text-emerald-200"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Jane Doe"
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      placeholder="jane@company.com"
                      required
                    />
                  </div>
                  <Field
                    label="Company"
                    value={form.company}
                    onChange={(v) => setForm({ ...form, company: v })}
                    placeholder="Acme Inc."
                  />
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-500">
                      What's the bottleneck?
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={4}
                      placeholder="We spend 10 hours a week manually sorting leads from our shared inbox..."
                      className="w-full resize-none rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-600 transition-colors focus:border-emerald-500/50 focus:outline-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-600 transition-colors focus:border-emerald-500/50 focus:outline-none"
      />
    </div>
  );
}
