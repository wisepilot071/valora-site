/**
 * Primary navigation. Rename, reorder, hide or re-point links here —
 * the navbar, mobile menu and footer all render from this list.
 */
export interface NavItem {
  label: string;
  href: string;
  visible: boolean;
  order: number;
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/', visible: true, order: 1 },
  { label: 'Shop', href: '/shop', visible: true, order: 2 },
  { label: 'About', href: '/about', visible: true, order: 3 },
  { label: 'Contact', href: '/contact', visible: true, order: 4 },
];

/** Secondary links shown in the footer. */
export const footerLinks = {
  corporate: { label: 'Corporate Gifting', href: '/contact#corporate' },
};

export const getNavigation = () =>
  navigation.filter((item) => item.visible).sort((a, b) => a.order - b.order);
