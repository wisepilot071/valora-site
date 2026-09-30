'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getNavigation } from '@/config/navigation';
import { ui } from '@/data/site';
import { useCart } from '@/lib/cart';
import { generalEnquiryUrl, externalLinkProps } from '@/lib/whatsapp';
import { Logo } from '@/components/ui/Logo';
import { BagIcon, MenuIcon } from '@/components/ui/Icons';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { MobileMenu } from './MobileMenu';

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href.split('#')[0]}/`);

const iconBtn =
  'relative inline-flex h-11 w-11 items-center justify-center rounded-full text-espresso transition-colors duration-base hover:bg-linen';

export function Navbar() {
  const pathname = usePathname();
  const nav = getNavigation();
  const { count, open: openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const shop = nav.find((n) => n.href === '/shop');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cartLabel = `${ui.nav.cart}${hydrated && count ? `, ${ui.cart.items(count)}` : ''}`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-base ease-brand ${
        scrolled ? 'border-stone bg-paper' : 'border-transparent bg-paper/0'
      }`}
    >
      <div className="container-site grid h-16 grid-cols-[1fr_auto] items-center lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
        <Logo priority height={28} className="lg:[&_img]:!h-[32px] lg:[&_img]:!w-auto" />

        <nav aria-label={ui.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className="link-underline inline-flex min-h-[44px] items-center text-small tracking-[0.04em] aria-[current=page]:text-clay"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2 flex items-center justify-end sm:mr-0 sm:gap-2">
          {shop && (
            <Link href={shop.href} className="inline-flex min-h-[44px] items-center px-1.5 text-small sm:px-2 lg:hidden">
              {shop.label}
            </Link>
          )}
          <a href={generalEnquiryUrl()} {...externalLinkProps} className={iconBtn} aria-label={`${ui.nav.whatsapp} (opens in a new tab)`}>
            <WhatsAppIcon />
          </a>
          <button type="button" onClick={openCart} data-cart-open className={iconBtn} aria-label={cartLabel} aria-haspopup="dialog">
            <BagIcon />
            {hydrated && count > 0 && (
              <span className="absolute right-1 top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay px-1 text-[0.625rem] font-medium tabular-nums text-paper" aria-hidden>
                {count}
              </span>
            )}
          </button>
          <button
            ref={menuButton}
            type="button"
            className={`${iconBtn} lg:hidden`}
            aria-label={ui.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
