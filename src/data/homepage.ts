/**
 * All homepage copy. Edit words here — components only lay them out.
 */
export const homepage = {
  announcement: {
    enabled: true,
    text: 'Corporate gifting, handled end-to-end.',
    linkLabel: 'Start an enquiry',
    href: '/contact#corporate',
  },

  hero: {
    eyebrow: 'Curated for Moments That Matter',
    headline: 'Gifts Made Meaningful.',
    supporting:
      'Considered gift boxes for the people you work with and the people you love — chosen with care, packed by hand, delivered as a moment.',
    primaryCta: { label: 'Shop Gifts', href: '/shop' },
    secondaryCta: { label: 'Corporate Gifting', href: '/contact#corporate' },
    image: {
      src: '/images/home/hero.jpg',
      alt: 'An open olive VALORA gift box with a stoneware mug, amber jar and striped towel on a sunlit stone table',
      width: 1800,
      height: 720,
    },
    caption: 'The Garden Table Box',
    captionHref: '/product/the-garden-table-box',
  },

  brandMoment: {
    eyebrow: 'The passing of a gift',
    steps: [
      { word: 'Chosen.', line: 'Every piece is picked for a person, not a price point.' },
      { word: 'Wrapped.', line: 'By hand, in paper, ribbon and wax — the first thing they see.' },
      { word: 'Given.', line: 'The part that lasts. We just make sure it arrives right.' },
    ],
    closing: 'A gift is a sentence you don’t have to say out loud.',
    tag: 'For you',
    scrollHint: 'Scroll to wrap it',
  },

  featured: {
    eyebrow: 'The Collection',
    heading: 'Thoughtfully Chosen. Beautifully Given.',
    ctaLabel: 'View all gifts',
    ctaHref: '/shop',
  },

  moments: {
    eyebrow: 'Meaningful Moments',
    heading: 'For every kind of thank you.',
    hint: 'Scroll to see more',
  },

  brandStory: {
    eyebrow: 'Our approach',
    heading: 'The gift begins long before it’s opened.',
    paragraphs: [
      'Too many gifts look the same, say very little, and are forgotten by the end of the week.',
      'So we slow it down. We choose objects people will keep using — stoneware, leather, handwoven cotton, small-batch pantry things — and we present them with the kind of care that makes someone pause before they open the lid.',
    ],
    image: {
      src: '/images/home/story-craft.jpg',
      alt: 'Hands pressing a carved wooden block onto cotton, printing a botanical pattern',
      width: 1536,
      height: 1024,
    },
    secondaryImage: {
      src: '/images/brand/closed-box.jpg',
      alt: 'A closed mulberry VALORA box wrapped in a floral paper band with a wax seal',
      width: 726,
      height: 724,
    },
    ctaLabel: 'About VALORA',
    ctaHref: '/about',
  },

  whyValora: {
    eyebrow: 'Why VALORA',
    heading: 'Why VALORA',
  },

  corporate: {
    eyebrow: 'For businesses',
    heading: 'Corporate Gifting, Thoughtfully Done.',
    supporting:
      'Thoughtful gifting for teams, clients, partners and important business moments. Tell us the occasion — we handle selection, personalisation, packing and delivery.',
    points: ['Onboarding and welcome kits', 'Client and partner appreciation', 'Festive and year-end gifting', 'Leadership milestones'],
    cta: { label: 'Enquire for Corporate Gifting', href: '/contact#corporate' },
    image: {
      src: '/images/home/corporate.jpg',
      alt: 'A leather journal, pen case and tumbler on an olive tray beside a gift box banded in floral paper, on an office desk',
      width: 1672,
      height: 940,
    },
  },

  finalCta: {
    heading: 'Some moments deserve more than a message.',
    primaryCta: { label: 'Shop Gifts', href: '/shop' },
    secondaryCta: { label: 'Corporate Gifting', href: '/contact#corporate' },
    image: {
      src: '/images/home/final-cta.jpg',
      alt: 'A mulberry VALORA hamper open on a stone ledge in warm afternoon light',
      width: 1800,
      height: 640,
    },
  },
};
