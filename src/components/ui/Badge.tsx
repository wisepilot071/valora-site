import type { ReactNode } from 'react';

const tones = {
  neutral: 'bg-paper/95 text-espresso border border-stone',
  muted: 'bg-linen text-taupe border border-stone',
  accent: 'bg-mulberry text-paper',
} as const;

export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: keyof typeof tones; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
