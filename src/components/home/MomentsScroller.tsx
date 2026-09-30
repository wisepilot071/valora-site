'use client';

import { useRef, type ReactNode } from 'react';
import { ChevronIcon } from '@/components/ui/Icons';

export function MomentsScroller({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };
  const btn = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone transition-colors hover:border-espresso';
  return (
    <>
      <div className="container-site -mt-4 mb-6 hidden justify-end gap-2 lg:flex">
        <button type="button" className={btn} data-scroll-prev onClick={() => scroll(-1)} aria-label="Scroll moments left">
          <ChevronIcon className="rotate-180" />
        </button>
        <button type="button" className={btn} data-scroll-next onClick={() => scroll(1)} aria-label="Scroll moments right">
          <ChevronIcon />
        </button>
      </div>
      <ul
        ref={ref}
        data-scroll-track
        aria-label={label}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pl-[var(--gutter)] pr-[var(--gutter)] [scroll-padding-inline:var(--gutter)] lg:gap-8 2xl:pl-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))]"
      >
        {children}
      </ul>
    </>
  );
}
