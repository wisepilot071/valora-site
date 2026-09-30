import type { Product } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VALORA PRODUCT CATALOGUE — the single source of truth.
 *
 *  Every price, name, image and description on the site (home, shop, product
 *  pages, cart, WhatsApp messages, JSON-LD, sitemap) is read from this list.
 *
 *  • Change a price  → edit `price` (and optional `salePrice`) below. Nowhere else.
 *  • Add a product   → copy one block, change the fields, drop images into
 *                      /public/images/products/<slug>/
 *  • Hide a product  → set availability: 'hidden'
 *
 *  ⚠ DRAFT DATA: names, prices and contents were drafted from the product
 *  photography. Items marked "CONFIRM" must be checked before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const products: Product[] = [
  {
    id: 'vl-001',
    name: 'The Garden Table Box',
    slug: 'the-garden-table-box',
    category: ['gift-hampers', 'celebration-gifts', 'corporate-gifting'],
    price: 3450, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'A slow morning, boxed — stoneware, chai and a soft handwoven towel.',
    fullDescription: [
      'Built around the small rituals that make a day feel unhurried: a speckled stoneware mug, a box of masala chai and a striped handwoven towel, tucked in with dried flowers.',
      'It arrives in our deep olive VALORA box, lined and packed by hand, with a botanical-print wrapped companion box alongside.',
    ],
    contents: [
      // CONFIRM contents
      'Speckled stoneware mug',
      'Masala chai, boxed',
      'Amber glass pantry jar',
      'Striped handwoven cotton towel',
      'Small olive keepsake box',
      'Dried flower posy',
    ],
    perfectFor: ['Housewarmings', 'Thank-yous', 'New beginnings', 'Clients who appreciate the details'],
    images: [
      {
        src: '/images/products/the-garden-table-box/the-garden-table-box-main.jpg',
        alt: 'Open olive VALORA gift box holding a stoneware mug, amber jar, striped towel and a boxed masala chai, beside a botanical-wrapped box',
        role: 'main',
        width: 1800,
        height: 720,
        focus: '74% 50%',
      },
    ],
    availability: 'available',
    featured: true,
    sortOrder: 1,
    seo: {
      seoTitle: 'The Garden Table Box — Stoneware & Chai Gift Hamper',
      metaDescription:
        'A stoneware mug, masala chai and a handwoven towel, packed by hand in an olive VALORA box. A gift for slow mornings.',
      slug: 'the-garden-table-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['chai gift hamper', 'stoneware mug gift box', 'housewarming gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-002',
    name: 'The Mulberry Hamper',
    slug: 'the-mulberry-hamper',
    category: ['festive-gifts', 'gift-hampers'],
    price: 4250, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'Deep mulberry, warm brass and a tea light — for evenings that gather people.',
    fullDescription: [
      'A hamper in our mulberry VALORA box, made for the season of visits and full tables. A botanical-print tin, a jar of roasted nuts and a handwoven cotton textile sit beside a small brass tea light.',
      'Every piece is placed by hand, finished with printed keepsake boxes and a muslin pouch.',
    ],
    contents: [
      // CONFIRM contents
      'Botanical-print tin canister',
      'Glass jar of roasted nuts',
      'Handwoven cotton textile',
      'Tea light in a brass holder',
      'Printed keepsake boxes',
      'Muslin drawstring pouch',
    ],
    perfectFor: ['Festive visits', 'Family', 'Hosts', 'Season’s greetings for clients'],
    images: [
      {
        src: '/images/products/the-mulberry-hamper/the-mulberry-hamper-main.jpg',
        alt: 'Mulberry VALORA hamper with a botanical tin, jar of nuts, folded cotton textile and small printed boxes',
        role: 'main',
        width: 1037,
        height: 748,
      },
      {
        src: '/images/products/the-mulberry-hamper/the-mulberry-hamper-lifestyle.jpg',
        alt: 'The Mulberry Hamper open on a stone ledge beside its closed box, jasmine and a brass cup',
        role: 'lifestyle',
        width: 1800,
        height: 640,
        focus: '55% 50%',
      },
    ],
    availability: 'available',
    featured: true,
    sortOrder: 2,
    seo: {
      seoTitle: 'The Mulberry Hamper — Festive Gift Hamper',
      metaDescription:
        'A festive hamper in a mulberry VALORA box: botanical tin, roasted nuts, handwoven textile and a brass tea light.',
      slug: 'the-mulberry-hamper',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['festive gift hamper', 'festive hamper for family'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-003',
    name: 'The Appreciation Box',
    slug: 'the-appreciation-box',
    category: ['corporate-gifting', 'celebration-gifts'],
    price: 3250, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'A name tag, a note, and things they’ll use every day.',
    fullDescription: [
      'Designed for the people who make the work good. A hardcover notebook tied with twine and a name tag, wildflower honey, masala chai and a stoneware mug.',
      'Finished with a small note of appreciation and a handwritten card — so it reads as personal, even when you’re sending forty.',
    ],
    contents: [
      // CONFIRM contents
      'Hardcover notebook with personalised name tag',
      'Himalayan wildflower honey',
      'Masala chai, boxed',
      'Speckled stoneware mug',
      'Embossed brass tin',
      'Striped cotton towel',
      'Appreciation note and handwritten card',
    ],
    perfectFor: ['Employee recognition', 'Work anniversaries', 'Year-end thank-yous'],
    images: [
      {
        src: '/images/products/the-appreciation-box/the-appreciation-box-main.jpg',
        alt: 'Olive gift box with a name-tagged green notebook, wildflower honey, masala chai, stoneware mug and handwritten notes',
        role: 'main',
        width: 1536,
        height: 1024,
      },
    ],
    availability: 'available',
    featured: true,
    sortOrder: 3,
    seo: {
      seoTitle: 'The Appreciation Box — Personalised Employee Gift Hamper',
      metaDescription:
        'A personalised employee gift: name-tagged notebook, wildflower honey, masala chai and a stoneware mug, with a note of thanks.',
      slug: 'the-appreciation-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['employee appreciation gift', 'personalised corporate gift', 'work anniversary gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-004',
    name: 'The Milestone Box',
    slug: 'the-milestone-box',
    category: ['corporate-gifting', 'premium-gifts'],
    price: 6400, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'For leadership moments — leather, brass and a woven stole.',
    fullDescription: [
      'Our most complete corporate box, built for promotions, retirements and the moments that deserve a proper gesture.',
      'A leather journal and brass pen, an insulated bottle, a sandalwood candle and a patterned woven stole, each in its own fitted compartment.',
    ],
    contents: [
      // CONFIRM contents
      'Leather-bound journal',
      'Brass pen',
      'Matte black insulated bottle',
      'Sandalwood scented candle',
      'Glass jar with marble lid',
      'Patterned woven stole',
      'Printed appreciation card',
    ],
    perfectFor: ['Promotions', 'Leadership milestones', 'Retirements', 'Board and investor gifts'],
    images: [
      {
        src: '/images/products/the-milestone-box/the-milestone-box-main.jpg',
        alt: 'Charcoal compartment box with a leather journal, insulated bottle, brass pen, sandalwood candle and woven stole',
        role: 'main',
        width: 1066,
        height: 1024,
      },
    ],
    availability: 'available',
    featured: true,
    sortOrder: 4,
    seo: {
      seoTitle: 'The Milestone Box — Leadership & Milestone Corporate Gift',
      metaDescription:
        'A leadership gift box with a leather journal, brass pen, insulated bottle, sandalwood candle and woven stole.',
      slug: 'the-milestone-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['leadership gift', 'retirement gift box', 'executive corporate gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-005',
    name: 'The Executive Desk Set',
    slug: 'the-executive-desk-set',
    category: ['corporate-gifting', 'premium-gifts'],
    price: 4900, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'A leather journal and pens, set out for the first day at a new desk.',
    fullDescription: [
      'A tray of desk essentials in tan leather and brass, presented beside a gift box wrapped in a hand-printed floral band.',
      'Made for new roles, onboarding leaders and partners you plan to work with for a long time.',
    ],
    contents: [
      // CONFIRM contents
      'Tan leather journal',
      'Pen set in a presentation case',
      'Insulated tumbler',
      'Small keepsake boxes',
      'Gift box with hand-printed floral band',
    ],
    perfectFor: ['New roles', 'Leadership onboarding', 'Partner gifts'],
    images: [
      {
        src: '/images/products/the-executive-desk-set/the-executive-desk-set-main.jpg',
        alt: 'Tan leather journal, pen case and insulated tumbler on an olive tray, beside a gift box with a floral band',
        role: 'main',
        width: 1672,
        height: 940,
      },
    ],
    availability: 'available',
    featured: true,
    sortOrder: 5,
    seo: {
      seoTitle: 'The Executive Desk Set — Leather Journal & Pen Gift',
      metaDescription:
        'A leather journal, pen set and insulated tumbler presented with a hand-printed gift box. A considered gift for a new role.',
      slug: 'the-executive-desk-set',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['executive gift set', 'leather journal gift', 'new job gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-006',
    name: 'The Olive Grove Box',
    slug: 'the-olive-grove-box',
    category: ['gift-hampers', 'celebration-gifts'],
    price: 3950, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'Block-printed cotton, a candle and a notebook, in our olive box.',
    fullDescription: [
      'A generous box for someone who notices texture — block-printed cotton, a stoneware mug, a notebook and a candle in glass.',
      'Presented in the olive VALORA box, with a matching closed box banded in hand-printed paper and a wax seal.',
    ],
    contents: [
      // CONFIRM contents
      'Block-printed cotton napkin',
      'Stoneware mug',
      'Scented candle in glass',
      'Glass jar with brass lid',
      'Hardcover notebook',
      'Muslin drawstring pouch',
      'Note cards',
    ],
    perfectFor: ['Birthdays', 'Friends', 'Housewarmings'],
    images: [
      {
        src: '/images/products/the-olive-grove-box/the-olive-grove-box-main.jpg',
        alt: 'Olive VALORA box open with block-printed cotton, a candle, jar, mug and notebook, beside a banded closed box',
        role: 'main',
        width: 1800,
        height: 720,
        focus: '45% 50%',
      },
      {
        src: '/images/products/the-olive-grove-box/the-olive-grove-box-closed.jpg',
        alt: 'The Olive Grove Box closed, banded in botanical paper with a wax seal and gift tag',
        role: 'closed',
        width: 1037,
        height: 748,
      },
    ],
    availability: 'available',
    featured: true,
    sortOrder: 6,
    seo: {
      seoTitle: 'The Olive Grove Box — Block-Print & Candle Gift Hamper',
      metaDescription:
        'Block-printed cotton, a candle, stoneware mug and notebook in an olive VALORA box, sealed with wax.',
      slug: 'the-olive-grove-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['birthday gift hamper', 'block print gift', 'candle gift box'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-007',
    name: 'The Lamplight Box',
    slug: 'the-lamplight-box',
    category: ['festive-gifts', 'premium-gifts', 'gift-hampers'],
    price: 4600, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'Cream cotton with a gold border, almonds and printed keepsakes.',
    fullDescription: [
      'A mulberry box banded in hand-printed paper, made for the gifts you carry to someone’s home.',
      'Inside: a cream cotton cloth with a woven gold border, a tin canister, a jar of almonds and two printed keepsake boxes.',
    ],
    contents: [
      // CONFIRM contents
      'Cream cotton cloth with woven gold border',
      'Tin canister',
      'Glass jar of almonds',
      'Two printed keepsake boxes',
    ],
    perfectFor: ['Festive visits', 'Elders', 'Family occasions'],
    images: [
      {
        src: '/images/products/the-lamplight-box/the-lamplight-box-main.jpg',
        alt: 'Mulberry VALORA box open with a cream gold-bordered cloth, tin, jar of almonds and printed boxes, beside a brass lamp',
        role: 'main',
        width: 1536,
        height: 1024,
      },
      {
        src: '/images/products/the-lamplight-box/the-lamplight-box-closed.jpg',
        alt: 'The Lamplight Box closed, wrapped in a floral paper band with a wax seal',
        role: 'closed',
        width: 726,
        height: 724,
      },
    ],
    availability: 'available',
    featured: false,
    sortOrder: 7,
    seo: {
      seoTitle: 'The Lamplight Box — Festive Gift Box',
      metaDescription:
        'A festive gift box with a gold-bordered cotton cloth, almonds and printed keepsakes, in a banded mulberry box.',
      slug: 'the-lamplight-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['festive gift box', 'gift for elders', 'dry fruit gift box'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-008',
    name: 'The Evergreen Welcome Box',
    slug: 'evergreen-welcome-box',
    category: ['corporate-gifting'],
    price: 2650, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'The first-day box. A mug, a notebook and a note that says welcome.',
    fullDescription: [
      'Onboarding, done warmly. A linen-bound notebook and pen, a stoneware mug, masala black tea and a striped towel, in the olive VALORA box.',
      'A welcome card is included; tell us what it should say.',
    ],
    contents: [
      // CONFIRM contents
      'Linen-bound notebook',
      'Gold-finish pen',
      'Speckled stoneware mug',
      'Masala black tea, tinned',
      'Striped cotton towel',
      'Welcome card',
    ],
    perfectFor: ['New joiners', 'Team welcomes', 'Internships and graduate cohorts'],
    images: [
      {
        src: '/images/products/evergreen-welcome-box/evergreen-welcome-box-main.jpg',
        alt: 'Olive welcome box with a linen notebook, stoneware mug, tea tin and striped towel, with a handwritten welcome card',
        role: 'main',
        width: 1136,
        height: 1024,
      },
    ],
    availability: 'available',
    featured: false,
    sortOrder: 8,
    seo: {
      seoTitle: 'The Evergreen Welcome Box — Employee Onboarding Gift',
      metaDescription:
        'An employee welcome kit with a linen notebook, stoneware mug, masala tea and a welcome card, packed in an olive box.',
      slug: 'evergreen-welcome-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['employee welcome kit', 'onboarding gift box', 'new joiner gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-009',
    name: 'The Partnership Box',
    slug: 'the-partnership-box',
    category: ['corporate-gifting', 'premium-gifts'],
    price: 5800, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'For partners you plan to keep — wine, sandalwood and leather.',
    fullDescription: [
      'A client gift with presence. A bottle of red wine, an Indian sandalwood candle, a marble-lidded jar and a leather folio with a brass pen, in fitted compartments.',
      'Finished with a standing card for your message of thanks.',
    ],
    contents: [
      // CONFIRM contents — alcohol availability depends on delivery location and licensing
      'Bottle of red wine',
      'Indian sandalwood scented candle',
      'Glass jar with marble lid',
      'Leather folio',
      'Brass pen',
      'Standing message card',
    ],
    perfectFor: ['Client appreciation', 'Deal closings', 'Partner anniversaries'],
    images: [
      {
        src: '/images/products/the-partnership-box/the-partnership-box-main.jpg',
        alt: 'Olive compartment box with a bottle of red wine, sandalwood candle, marble-lidded jar and leather folio, with a thank-you card',
        role: 'main',
        width: 1156,
        height: 1024,
      },
    ],
    availability: 'available',
    featured: false,
    sortOrder: 9,
    seo: {
      seoTitle: 'The Partnership Box — Client Gift Hamper',
      metaDescription:
        'A client gift box with red wine, a sandalwood candle, marble-lidded jar and leather folio, in fitted compartments.',
      slug: 'the-partnership-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['client gift hamper', 'corporate wine hamper', 'partner gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-010',
    name: 'The Keepsake Box',
    slug: 'the-keepsake-box',
    category: ['celebration-gifts', 'gift-hampers'],
    price: 2850, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'Wrapped in handmade paper, tied with twine, sealed in wax.',
    fullDescription: [
      'A quieter gift, where the unwrapping is half the point. A handwoven textile bundle tied with twine, a handmade paper note sealed in brass-coloured wax, and dried flowers, in the mulberry box.',
    ],
    contents: [
      // CONFIRM contents
      'Handwoven textile, wrapped and tied with twine',
      'Handmade paper note with wax seal',
      'Dried flowers',
    ],
    perfectFor: ['Anniversaries', 'Someone far away', 'Just because'],
    images: [
      {
        src: '/images/products/the-keepsake-box/the-keepsake-box-main.jpg',
        alt: 'Mulberry box with a twine-tied textile bundle and a handmade paper note sealed with wax',
        role: 'main',
        width: 723,
        height: 723,
      },
    ],
    availability: 'available',
    featured: false,
    sortOrder: 10,
    seo: {
      seoTitle: 'The Keepsake Box — Handwrapped Gift Box',
      metaDescription:
        'A handwoven textile wrapped in handmade paper with a wax-sealed note and dried flowers, in a mulberry VALORA box.',
      slug: 'the-keepsake-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['anniversary gift box', 'handwrapped gift', 'textile gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
  {
    id: 'vl-011',
    name: 'The Considered Box',
    slug: 'the-considered-box',
    category: ['celebration-gifts'],
    price: 2200, // CONFIRM price
    salePrice: null,
    currency: 'INR',
    shortDescription: 'A single keepsake, tissue-wrapped and sealed — chosen for them.',
    fullDescription: [
      'For when one thing, chosen well, says enough. A single keepsake wrapped in printed tissue, sealed with wax and tied with olive satin ribbon.',
      'Tell us who it’s for and we’ll help you choose what goes inside.',
    ],
    contents: [
      // CONFIRM contents
      'A keepsake of your choosing, tissue-wrapped and wax-sealed',
      'Note card',
      'Olive satin ribbon',
    ],
    perfectFor: ['Birthdays', 'Thank-yous', 'A first gift'],
    images: [
      {
        src: '/images/products/the-considered-box/the-considered-box-main.jpg',
        alt: 'Open olive box with a tissue-wrapped keepsake sealed in wax, a note card and olive satin ribbon',
        role: 'main',
        width: 1536,
        height: 1024,
      },
    ],
    availability: 'available',
    featured: false,
    sortOrder: 11,
    seo: {
      seoTitle: 'The Considered Box — Wrapped Keepsake Gift',
      metaDescription:
        'A single keepsake, tissue-wrapped, wax-sealed and tied with olive satin ribbon. A simple, thoughtful gift from VALORA.',
      slug: 'the-considered-box',
      canonicalUrl: '', // empty = /product/<slug>
      keywords: ['thoughtful gift box', 'keepsake gift'],
      ogTitle: '', // empty = seoTitle + ' | VALORA'
      ogDescription: '', // empty = metaDescription
      ogImage: '', // empty = the product's main image
      h1: '', // empty = product name
    },
  },
];
