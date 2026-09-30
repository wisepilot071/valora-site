import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  as: Tag = 'h2',
  align = 'left',
  className = '',
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-clay" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={Tag === 'h1' ? 'text-display' : 'text-h2'}>
        {title}
      </Tag>
      {children}
    </div>
  );
}
