/**
 * Brand & contact information. Every component reads from here —
 * change a value once and it updates across the site, metadata and JSON-LD.
 */
export const brand = {
  brandName: 'VALORA',

  tagline: 'Curated for Moments That Matter',

  /** One-line positioning used in the footer, metadata and Organization schema. */
  positioning: 'Premium corporate gifting, curated and handled end-to-end.',

  /** Logo files. Replace these PNGs (transparent background) to change the logo everywhere. */
  logo: '/images/brand/valora-logo.png', // full lockup with tagline, dark ink
  logoLight: '/images/brand/valora-logo-light.png', // full lockup, for dark backgrounds
  logoSize: { width: 1009, height: 362 },
  wordmark: '/images/brand/valora-wordmark.png', // name only, used in the header
  wordmarkLight: '/images/brand/valora-wordmark-light.png',
  wordmarkSize: { width: 1009, height: 254 },
  logoAlt: 'VALORA — Curated for Moments That Matter',

  email: 'sagarchoudharyok@gmail.com',

  whatsapp: {
    countryCode: '91',
    /** Primary number used for every WhatsApp link on the site. Digits only. */
    number: '7830104700',
    display: '+91 78301 04700',
  },

  /**
   * Other numbers on file. Not shown on the site — swap one into `whatsapp` above
   * when you decide which is primary.
   */
  alternateNumbers: ['7742977620', '6351417202'],

  /** Leave empty to hide the Instagram link everywhere. */
  instagram: '',

  /** Where VALORA delivers. Set `show` to false to remove it from the site. */
  serviceArea: {
    show: true,
    label: 'Bengaluru, India',
    city: 'Bengaluru',
    country: 'IN',
  },

  currency: 'INR',
  locale: 'en-IN',

  /**
   * Fallback public URL. NEXT_PUBLIC_SITE_URL (or Vercel's production domain)
   * takes priority — see src/lib/seo.ts.
   */
  siteUrl: 'https://REPLACE_ME',
} as const;

export const isConfigured = (value: string) => Boolean(value) && !value.includes('REPLACE_ME');
