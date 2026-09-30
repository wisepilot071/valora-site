import type { Category } from './types';

/**
 * Shop categories. Adding an entry here creates a filter chip, a crawlable
 * /shop/<slug> page with its own metadata, and a sitemap entry.
 * Link products to a category by adding its slug to the product's `category` array.
 */
export const categories: Category[] = [
  {
    name: 'Corporate Gifting',
    slug: 'corporate-gifting',
    description: 'For teams, clients and partners — gifts that carry the tone of your business.',
    image: '/images/home/corporate.jpg',
    seoTitle: 'Corporate Gift Hampers',
    seoDescription:
      'Corporate gift hampers from VALORA for employees, clients and partners — chosen with care and handled end-to-end.',
    keywords: ['corporate gift hampers', 'employee gifts', 'client gifts'],
    sortOrder: 1,
    visible: true,
  },
  {
    name: 'Gift Hampers',
    slug: 'gift-hampers',
    description: 'Boxed collections, assembled by hand and ready to give.',
    image: '/images/home/moment-friends.jpg',
    seoTitle: 'Gift Hampers',
    seoDescription: 'Gift hampers from VALORA, each assembled by hand and presented to be remembered.',
    keywords: ['gift hampers', 'gift boxes'],
    sortOrder: 2,
    visible: true,
  },
  {
    name: 'Festive Gifts',
    slug: 'festive-gifts',
    description: 'For the season of lamps, visits and full tables.',
    image: '/images/home/moment-celebrations.jpg',
    seoTitle: 'Festive Gift Hampers',
    seoDescription: 'Festive gift hampers from VALORA — warm, considered and beautifully boxed.',
    keywords: ['festive gift hampers', 'festive gifts'],
    sortOrder: 3,
    visible: true,
  },
  {
    name: 'Celebration Gifts',
    slug: 'celebration-gifts',
    description: 'Birthdays, homecomings, new beginnings.',
    image: '/images/home/moment-gratitude.jpg',
    seoTitle: 'Celebration Gifts',
    seoDescription: 'Celebration gifts from VALORA for birthdays, milestones and new beginnings.',
    keywords: ['celebration gifts', 'birthday gift box'],
    sortOrder: 4,
    visible: true,
  },
  {
    name: 'Premium Gifts',
    slug: 'premium-gifts',
    description: 'Our most complete boxes, for the gifts that need to say the most.',
    image: '/images/home/moment-milestones.jpg',
    seoTitle: 'Premium Gifts',
    seoDescription: 'Premium gift boxes from VALORA — leather, brass, stoneware and handwoven textiles.',
    keywords: ['premium gifts', 'luxury gift box'],
    sortOrder: 5,
    visible: true,
  },
];

export const getVisibleCategories = () =>
  categories.filter((c) => c.visible).sort((a, b) => a.sortOrder - b.sortOrder);

export const getCategory = (slug: string) => getVisibleCategories().find((c) => c.slug === slug);
