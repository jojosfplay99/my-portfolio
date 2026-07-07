import { type Accent } from './ui';

type Node = { label: string; sub?: string; accent?: Accent };

const accentBorder: Record<Accent, string> = {
  emerald: 'border-emerald-500/40 text-emerald-300',
  cyan: 'border-cyan-500/40 text-cyan-300',
};
const accentDot: Record<Accent, string> = {
  emerald: 'bg-emerald-400',
  cyan: 'bg-cyan-400',
};
const accentLine: Record<Accent, string> = {
  emerald: 'stroke-emerald-500/50',
  cyan: 'stroke-cyan-500/50',
};

export function WorkflowCanvas({
  nodes,
  className = '',
  accent = 'emerald',
}: {
  nodes: Node[];
  className?: string;
  accent?: Accent;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-ink-700 bg-ink-950 bg-grid ${className}`}
    >
      {/* glow */}
      <div
        className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full blur-3xl ${
          accent === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10'
        }`}
      />
      <div className="relative flex items-center justify-between gap-2 px-4 py-6 sm:px-6 sm:py-8">
        {nodes.map((n, i) => (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex w-full flex-col items-center text-center">
              <div
                className={`flex h-12 w-full max-w-[120px] items-center justify-center rounded-lg border bg-ink-850 px-2 py-2 text-[10px] font-medium leading-tight shadow-card sm:text-xs ${accentBorder[n.accent ?? accent]}`}
              >
                <span className="truncate">{n.label}</span>
              </div>
              {n.sub && (
                <span className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-500 sm:text-[10px]">
                  {n.sub}
                </span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <svg
                className="mx-1 h-5 w-8 shrink-0 sm:mx-2 sm:h-6 sm:w-12"
                viewBox="0 0 48 24"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 12 H40"
                  className={`${accentLine[accent]} animate-pulse-line`}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle cx="42" cy="12" r="2.5" className={accentDot[accent]} />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-ink-800 px-4 py-2.5 sm:px-6">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">
          n8n workflow canvas
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-500">
          <span className={`h-1.5 w-1.5 rounded-full ${accentDot[accent]} animate-pulse`} />
          live
        </span>
      </div>
    </div>
  );
}
