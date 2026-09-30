'use client';

import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { brand, isConfigured } from '@/config/brand';
import { footerLinks, getNavigation } from '@/config/navigation';
import { ui } from '@/data/site';
import { useDialog } from '@/lib/useDialog';
import { generalEnquiryUrl, externalLinkProps } from '@/lib/whatsapp';
import { Logo } from '@/components/ui/Logo';
import { CloseIcon } from '@/components/ui/Icons';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useDialog(open, close, ref);
  const nav = getNavigation();

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={ui.nav.menu}
      hidden={!open}
      className={`fixed inset-0 z-50 h-[100dvh] flex-col bg-paper lg:hidden ${open ? 'flex' : 'hidden'}`}
    >
      <div className="container-site flex h-16 items-center justify-between border-b border-stone">
        <Logo onClick={close} variant="full" height={40} />
        <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-linen" aria-label={ui.nav.close} data-autofocus>
          <CloseIcon />
        </button>
      </div>
      <nav aria-label={ui.nav.primary} className="container-site flex-1 overflow-y-auto py-10">
        <ul className="space-y-2">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-stone/70">
              <Link
                href={item.href}
                onClick={close}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="flex min-h-[64px] items-baseline justify-between py-3 font-display text-[2.5rem] leading-none aria-[current=page]:text-clay"
              >
                {item.label}
                <span className="font-sans text-eyebrow text-taupe">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={footerLinks.corporate.href} onClick={close} className="mt-8 inline-flex min-h-[44px] items-center text-small underline decoration-stone underline-offset-[6px]">
          {footerLinks.corporate.label}
        </Link>
      </nav>
      <div className="container-site space-y-3 border-t border-stone py-6 text-small">
        <a href={generalEnquiryUrl()} {...externalLinkProps} className="flex min-h-[44px] items-center gap-3">
          <WhatsAppIcon /> {brand.whatsapp.display}
        </a>
        {isConfigured(brand.email) && (
          <a href={`mailto:${brand.email}`} className="flex min-h-[44px] items-center">
            {brand.email}
          </a>
        )}
      </div>
    </div>
  );
}
