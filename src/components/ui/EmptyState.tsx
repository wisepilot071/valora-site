import type { ReactNode } from 'react';
import { Mark } from './Icons';

export function EmptyState({ heading, body, action, as: Tag = 'h2' }: { heading: string; body?: string; action?: ReactNode; as?: 'h1' | 'h2' | 'h3' }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Mark size={28} className="mb-6 text-clay" />
      <Tag className="text-h3">{heading}</Tag>
      {body && <p className="mt-3 max-w-sm text-taupe">{body}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
