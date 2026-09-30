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
      'Pick the occasion and see how it could arrive. We handle selection, personalisation, packing and delivery.',
    studio: {
      occasionsLabel: 'Choose an occasion',
      nameLabel: 'Your company name',
      namePlaceholder: 'e.g. Acme Studio',
      signatureFallback: 'Your company',
      signaturePrefix: 'With gratitude,',
      cardLabel: 'Printed on handmade paper',
      viewHamper: 'See this hamper',
    },
    /** Each occasion shows a hamper photo and a sample note. `product` is a slug from products.ts. */
    occasions: [
      {
        label: 'Onboarding & welcome kits',
        product: 'evergreen-welcome-box',
        note: 'Welcome to the team. Here’s to new beginnings and brighter tomorrows.',
        image: {
          src: '/images/products/evergreen-welcome-box/evergreen-welcome-box-main.jpg',
          alt: 'An olive welcome box with a linen notebook, stoneware mug, tea tin and striped towel',
        },
      },
      {
        label: 'Client & partner appreciation',
        product: 'the-partnership-box',
        note: 'Thank you for your continued trust. Here’s to what we build next, together.',
        image: {
          src: '/images/products/the-partnership-box/the-partnership-box-main.jpg',
          alt: 'A client gift box with a bottle of wine, sandalwood candle and leather folio',
        },
      },
      {
        label: 'Festive & year-end gifting',
        product: 'the-mulberry-hamper',
        note: 'Warm wishes for the season, and thank you for a wonderful year.',
        image: {
          src: '/images/products/the-mulberry-hamper/the-mulberry-hamper-main.jpg',
          alt: 'A mulberry festive hamper with a botanical tin, nuts and folded cotton',
        },
      },
      {
        label: 'Leadership milestones',
        product: 'the-milestone-box',
        note: 'In appreciation of your leadership and the lasting impact you’ve made.',
        image: {
          src: '/images/products/the-milestone-box/the-milestone-box-main.jpg',
          alt: 'A charcoal milestone box with a leather journal, bottle, candle and woven stole',
        },
      },
    ],
    cta: { label: 'Enquire for Corporate Gifting', href: '/contact' },
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
