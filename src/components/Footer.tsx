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

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">Connect</span>
            <div className="flex items-center gap-3">
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
              <a
                href="mailto:jobelle.automation@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ink-300 transition-all duration-200 hover:border-emerald-500/50 hover:text-emerald-300 hover:shadow-glow-emerald"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-10 items-center gap-2 rounded-lg border border-ink-700 bg-ink-850 px-4 text-sm font-medium text-ink-300 transition-all duration-200 hover:border-emerald-500/50 hover:text-emerald-300"
                aria-label="Download resume"
              >
                <FileText size={16} />
                Resume
              </a>
            </div>
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
