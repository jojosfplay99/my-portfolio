import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Accent = 'emerald' | 'cyan';

const accentMap: Record<Accent, { btn: string; btnGhost: string; text: string; ring: string; glow: string }> = {
  emerald: {
    btn: 'bg-emerald-500 text-ink-950 hover:bg-emerald-400 shadow-glow-emerald',
    btnGhost: 'text-emerald-300 hover:text-emerald-200 hover:border-emerald-500/60',
    text: 'text-emerald-300',
    ring: 'ring-emerald-500/30',
    glow: 'group-hover:shadow-glow-emerald',
  },
  cyan: {
    btn: 'bg-cyan-500 text-ink-950 hover:bg-cyan-400 shadow-glow-cyan',
    btnGhost: 'text-cyan-300 hover:text-cyan-200 hover:border-cyan-500/60',
    text: 'text-cyan-300',
    ring: 'ring-cyan-500/30',
    glow: 'group-hover:shadow-glow-cyan',
  },
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  accent?: Accent;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  accent = 'emerald',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const a = accentMap[accent];
  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  const variants = {
    primary: a.btn,
    ghost: `bg-transparent border border-transparent ${a.btnGhost}`,
    outline: `bg-transparent border border-ink-700 text-ink-100 hover:border-ink-500 hover:bg-ink-850`,
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, accent = 'emerald' }: { children: ReactNode; accent?: Accent }) {
  const a = accentMap[accent];
  return (
    <span
      className={`inline-flex items-center rounded-md border border-ink-700 bg-ink-850 px-2.5 py-1 font-mono text-xs font-medium ${a.text}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent = 'emerald',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div className="max-w-2xl">
      <div className={`mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] ${a.text}`}>
        <span className={`h-px w-8 ${accent === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-ink-100 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-ink-400">{description}</p>}
    </div>
  );
}

export function Card({
  children,
  className = '',
  accent = 'emerald',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  hover?: boolean;
}) {
  const a = accentMap[accent];
  return (
    <div
      className={`group relative rounded-2xl border border-ink-700 bg-ink-850/60 p-6 backdrop-blur-sm transition-all duration-300 ${
        hover ? `hover:border-ink-600 hover:bg-ink-800/80 ${a.glow}` : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export { accentMap };
export type { Accent };
