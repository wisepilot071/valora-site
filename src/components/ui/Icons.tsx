import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
});

export const BagIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
export const MenuIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const CloseIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ArrowIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ChevronIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const PlusIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const MailIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
    <path d="m4 6.5 8 6 8-6" />
  </svg>
);
export const InstagramIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);
export const LinkedInIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
  </svg>
);

/** The VALORA star, taken from the "o" in the logo. */
export const Mark = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable={false} {...p}>
    <path d="M16 2C16.9 10.4 21.6 15.1 30 16 21.6 16.9 16.9 21.6 16 30 15.1 21.6 10.4 16.9 2 16 10.4 15.1 15.1 10.4 16 2Z" fill="currentColor" />
  </svg>
);
