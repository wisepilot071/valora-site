import type { ElementType, ReactNode } from 'react';

export function Container({ as: Tag = 'div', className = '', children, ...rest }: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <Tag className={`container-site ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
