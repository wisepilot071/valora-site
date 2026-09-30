/**
 * VALORA design tokens — the single source for colour, type, spacing and motion.
 * tailwind.config.ts reads from this file, so changing a value here restyles the whole site.
 */
export const colors = {
  paper: '#F5F0E8', // warm off-white — page background
  linen: '#ECE4D6', // quiet alternate surface
  stone: '#D8CCBA', // warm stone — hairlines, borders, placeholders
  espresso: '#231B16', // primary text, dark UI
  taupe: '#5B4E44', // secondary text (7:1 on paper)
  clay: '#9A5A3A', // restrained accent — rules, hovers, focus, key CTAs
  olive: '#3A4332', // deep olive — dark sections (echoes the gift boxes)
  sage: '#8C9577', // soft olive — small details on dark
  mulberry: '#5A2632', // secondary accent — badges, selected states
  brass: '#C7A27A', // tiny decorative details only (ribbon lines, illustration)
  white: '#FFFFFF',
  transparent: 'transparent',
  current: 'currentColor',
} as const;

export const fonts = {
  display: 'var(--font-display)',
  sans: 'var(--font-sans)',
} as const;

export const fontSize = {
  // Fluid editorial scale
  display: ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
  h2: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
  h3: ['clamp(1.5rem, 2.2vw, 2rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
  lead: ['clamp(1.0625rem, 1.3vw, 1.25rem)', { lineHeight: '1.6' }],
  body: ['1rem', { lineHeight: '1.65' }],
  small: ['0.875rem', { lineHeight: '1.5' }],
  eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
} as const;

export const layout = {
  maxWidth: '1440px',
  gutter: { mobile: '24px', tablet: '40px', desktop: '64px' },
  measure: '68ch',
} as const;

export const breakpoints = {
  sm: '640px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

export const motion = {
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  fast: '160ms',
  base: '280ms',
  slow: '640ms',
} as const;

export const radius = {
  none: '0',
  sm: '2px',
  DEFAULT: '3px',
  full: '9999px',
} as const;
