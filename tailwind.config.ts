import type { Config } from 'tailwindcss';
import { colors, fonts, fontSize, layout, breakpoints, motion, radius } from './src/config/design-tokens';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: breakpoints,
    colors,
    borderRadius: radius,
    extend: {
      fontFamily: {
        display: [fonts.display, 'Georgia', 'serif'],
        sans: [fonts.sans, 'system-ui', 'sans-serif'],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontSize: fontSize as any,
      maxWidth: { site: layout.maxWidth, measure: layout.measure },
      transitionTimingFunction: { brand: motion.ease, out: motion.easeOut },
      transitionDuration: { fast: motion.fast, base: motion.base, slow: motion.slow },
      spacing: { gutter: 'var(--gutter)' },
    },
  },
  plugins: [],
};

export default config;
