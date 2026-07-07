import { Github, Linkedin, FileText, Zap, Mail } from 'lucide-react';
import { Link } from './router';

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/" className="group flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                <Zap size={16} strokeWidth={2.5} />
              </span>
              <span className="font-mono text-base font-semibold text-ink-100">
                Jobelle
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
              Architecting intelligent AI automations that turn messy real-world data into structured, scalable business operations.
            </p>
          </div>

          
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-800 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Jobelle. Built by Jobelle.</p>
          <p className="font-mono">Built by Jobelle.</p>
        </div>
      </div>
    </footer>
  );
}
