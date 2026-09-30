import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight';
type Size = 'md' | 'lg' | 'sm';

const variants: Record<Variant, string> = {
  primary: 'bg-espresso text-paper hover:bg-clay disabled:bg-stone disabled:text-taupe',
  secondary: 'border border-espresso text-espresso hover:bg-espresso hover:text-paper disabled:border-stone disabled:text-taupe',
  ghost: 'text-espresso underline decoration-stone underline-offset-[6px] hover:decoration-clay px-0',
  light: 'bg-paper text-espresso hover:bg-linen',
  outlineLight: 'border border-paper/70 text-paper hover:bg-paper hover:text-olive',
};
const sizes: Record<Size, string> = {
  sm: 'min-h-[44px] px-4 text-small',
  md: 'min-h-[48px] px-6 text-small',
  lg: 'min-h-[56px] px-8 text-body',
};

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm font-medium tracking-[0.02em] transition-colors duration-base ease-brand disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${extra}`;

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & { href: string; external?: boolean; 'aria-label'?: string; onClick?: () => void };

/** A link styled as a button. External links open in a new tab safely. */
export function ButtonLink({ href, external, variant, size, className, children, ...rest }: LinkButtonProps) {
  const cls = buttonClass(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, type = 'button', ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
