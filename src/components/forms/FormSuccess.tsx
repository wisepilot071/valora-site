'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Mark } from '@/components/ui/Icons';

export function FormSuccess({ heading, body, children }: { heading: string; body: string; children?: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div role="status" className="border border-stone bg-linen/50 p-8 lg:p-12">
      <Mark size={28} className="mb-6 text-clay" />
      <h3 ref={ref} tabIndex={-1} className="text-h3 focus:outline-none">
        {heading}
      </h3>
      <p className="mt-3 max-w-md text-taupe">{body}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
