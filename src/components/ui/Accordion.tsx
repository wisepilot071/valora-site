import type { ReactNode } from 'react';
import { PlusIcon } from './Icons';

/** Native <details> accordion — accessible and works without JavaScript. */
export function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-stone" open={defaultOpen}>
      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-small font-medium uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon size={18} className="shrink-0 transition-transform duration-base ease-brand group-open:rotate-45" />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}
