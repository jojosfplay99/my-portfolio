import { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, type Route } from './router';

const navLinks: { label: string; to: string; route: string }[] = [
  { label: 'Home', to: '/', route: 'home' },
  { label: 'Projects', to: '/projects', route: 'projects' },
  { label: 'Contact', to: '/contact', route: 'contact' },
];

export function Navbar({ route }: { route: Route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (r: string) => {
    if (r === 'home') return route.name === 'home';
    if (r === 'projects') return route.name === 'projects' || route.name === 'project';
    return route.name === r;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-800 bg-ink-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:shadow-glow-emerald">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span className="font-mono text-base font-semibold tracking-tight text-ink-100">
            Jobelle
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(l.route)
                  ? 'text-emerald-300'
                  : 'text-ink-300 hover:text-ink-100'
              }`}
            >
              {l.label}
              {isActive(l.route) && (
                <span className="absolute inset-x-4 -bottom-px h-px bg-emerald-400" />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-3 inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-emerald-400 hover:shadow-glow-emerald"
          >
            Email Me
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 text-ink-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-ink-800 bg-ink-900/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(l.route)
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : 'text-ink-300 hover:bg-ink-800 hover:text-ink-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
