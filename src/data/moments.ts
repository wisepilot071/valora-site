/** Meaningful Moments cards on the homepage. Add, remove or reorder freely. */
export interface Moment {
  title: string;
  caption: string;
  image: string;
  alt: string;
  href: string;
}

export const moments: Moment[] = [
  {
    title: 'Teams',
    caption: 'A first-day welcome that sets the tone.',
    image: '/images/home/moment-teams.jpg',
    alt: 'An employee welcome box with a notebook, mug and handwritten welcome card on a desk',
    href: '/shop/corporate-gifting',
  },
  {
    title: 'Clients',
    caption: 'Thank you, said with presence.',
    image: '/images/home/moment-clients.jpg',
    alt: 'A client gift box with a bottle of wine, candle and leather folio beside a thank-you card',
    href: '/shop/corporate-gifting',
  },
  {
    title: 'Milestones',
    caption: 'For the years that built something.',
    image: '/images/home/moment-milestones.jpg',
    alt: 'A charcoal milestone box with a journal, bottle, candle and woven stole',
    href: '/shop/premium-gifts',
  },
  {
    title: 'Celebrations',
    caption: 'Lamps lit, doors open, gifts carried in.',
    image: '/images/home/moment-celebrations.jpg',
    alt: 'A mulberry festive box open beside a brass lamp and jasmine',
    href: '/shop/festive-gifts',
  },
  {
    title: 'Family',
    caption: 'For the table everyone gathers around.',
    image: '/images/home/moment-family.jpg',
    alt: 'A mulberry hamper with a botanical tin, nuts and folded cotton',
    href: '/shop/festive-gifts',
  },
  {
    title: 'Gratitude',
    caption: 'A note, a name, a small good thing.',
    image: '/images/home/moment-gratitude.jpg',
    alt: 'An appreciation box with honey, chai, a mug and handwritten notes',
    href: '/shop/celebration-gifts',
  },
  {
    title: 'Friends',
    caption: 'Because you thought of them.',
    image: '/images/home/moment-friends.jpg',
    alt: 'A still life of a stoneware mug, jar, brass tin and folded textile beside gift boxes',
    href: '/shop/gift-hampers',
  },
];
