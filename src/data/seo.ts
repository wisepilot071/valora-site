/**
 * Page-level SEO. Product SEO lives on each product in products.ts,
 * category SEO on each category in categories.ts.
 */
export const seo = {
  titleTemplate: '%s | VALORA',
  defaultOgImage: '/images/og/valora-og.jpg',
  pages: {
    home: {
      title: 'VALORA — Curated for Moments That Matter',
      description:
        'Premium corporate gifting and considered gift boxes, curated and handled end-to-end. Stoneware, leather, handwoven textiles and small-batch pantry, packed by hand.',
      path: '/',
      keywords: ['corporate gifting', 'gift hampers', 'premium gift boxes', 'Bengaluru corporate gifts'],
    },
    shop: {
      title: 'Premium Gifts',
      description: 'Thoughtfully curated gift boxes and hampers for teams, clients, family and friends.',
      path: '/shop',
      keywords: ['gift boxes', 'gift hampers', 'corporate gift hampers'],
    },
    about: {
      title: 'About',
      description:
        'VALORA is a contemporary gifting studio: thoughtful curation, beautiful presentation and gifts made to matter.',
      path: '/about',
      keywords: ['about VALORA', 'gifting studio'],
    },
    contact: {
      title: 'Corporate Gift Hampers & Contact',
      description:
        'Enquire about corporate gift hampers for employees, clients and partners, or reach VALORA on WhatsApp for personal gifting.',
      path: '/contact',
      keywords: ['corporate gift hampers', 'corporate gifting enquiry', 'Bengaluru corporate gifting'],
    },
    notFound: {
      title: 'Page not found',
      description: 'This page took a different turn.',
    },
  },
};
