'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ui } from '@/data/site';
import { useCart } from '@/lib/cart';
import { formatINR } from '@/lib/format';
import { useDialog } from '@/lib/useDialog';
import { cartOrderUrl, externalLinkProps } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { buttonClass } from '@/components/ui/Button';
import { CloseIcon, MinusIcon, PlusIcon } from '@/components/ui/Icons';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { SafeImage } from '@/components/ui/SafeImage';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

const stepBtn = 'inline-flex h-11 w-11 items-center justify-center text-espresso transition-colors hover:bg-linen disabled:opacity-40';

export function CartDrawer() {
  const { lines, subtotal, count, isOpen, close, setQuantity, remove, hydrated } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  useDialog(isOpen, close, panel);

  const checkoutUrl = cartOrderUrl(
    lines.map((l) => ({ name: l.product.name, quantity: l.quantity, unitPrice: formatINR(l.unitPrice), lineTotal: formatINR(l.lineTotal) })),
    subtotal,
  );

  return (
    <div data-cart-root className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-espresso/40 transition-opacity duration-base ease-brand ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
        data-cart-backdrop
        aria-hidden
      />
      <div
        ref={panel}
        data-cart-panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full flex-col bg-paper shadow-[0_0_0_1px_theme(colors.stone)] transition-transform duration-slow ease-out sm:w-[420px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-stone px-6 lg:h-20">
          <h2 id="cart-title" className="font-display text-[1.75rem]">
            {ui.cart.title}
            {count > 0 && <span className="ml-3 font-sans text-small text-taupe">{ui.cart.items(count)}</span>}
          </h2>
          <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-linen" aria-label={ui.cart.close}>
            <CloseIcon />
          </button>
        </div>

        {!hydrated ? (
          <div className="space-y-4 p-6">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              heading={ui.cart.emptyHeading}
              body={ui.cart.emptyBody}
              action={
                <Link href="/shop" onClick={close} className={buttonClass('primary')}>
                  {ui.cart.emptyCta}
                </Link>
              }
            />
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-stone overflow-y-auto px-6">
              {lines.map(({ product, quantity, unitPrice, lineTotal }) => {
                const img = product.image;
                return (
                  <li key={product.slug} className="grid grid-cols-[88px_1fr] gap-4 py-6">
                    <Link href={`/product/${product.slug}`} onClick={close} className="relative block aspect-square overflow-hidden bg-linen" tabIndex={-1} aria-hidden>
                      {img && <SafeImage src={img.src} alt="" fill sizes="88px" className="object-cover" style={{ objectPosition: img.focus }} />}
                    </Link>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link href={`/product/${product.slug}`} onClick={close} className="font-display text-[1.25rem] leading-tight hover:text-clay">
                          {product.name}
                        </Link>
                        <span className="text-small tabular-nums">{formatINR(lineTotal)}</span>
                      </div>
                      <p className="mt-1 text-[0.8125rem] tabular-nums text-taupe">
                        {formatINR(unitPrice)} {ui.cart.each}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center border border-stone" role="group" aria-label={`${ui.product.quantity}, ${product.name}`}>
                          <button type="button" className={stepBtn} onClick={() => setQuantity(product.slug, quantity - 1)} aria-label={`${ui.cart.decrease}, ${product.name}`}>
                            <MinusIcon size={16} />
                          </button>
                          <span className="w-8 text-center text-small tabular-nums" aria-live="polite">
                            {quantity}
                          </span>
                          <button type="button" className={stepBtn} onClick={() => setQuantity(product.slug, quantity + 1)} disabled={quantity >= 99} aria-label={`${ui.cart.increase}, ${product.name}`}>
                            <PlusIcon size={16} />
                          </button>
                        </div>
                        <button type="button" onClick={() => remove(product.slug)} className="min-h-[44px] px-1 text-[0.8125rem] text-taupe underline decoration-stone underline-offset-4 hover:text-clay">
                          {ui.cart.remove}
                          <span className="sr-only"> {product.name}</span>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-stone bg-linen/60 px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-small uppercase tracking-[0.14em]">{ui.cart.subtotal}</span>
                <span className="font-display text-[1.75rem] tabular-nums">{formatINR(subtotal)}</span>
              </div>
              <a
                href={checkoutUrl}
                {...externalLinkProps}
                onClick={() => track('begin_whatsapp_checkout', { value: subtotal, items: count })}
                className={buttonClass('primary', 'lg', 'mt-5 w-full')}
              >
                <WhatsAppIcon /> {ui.cart.checkout}
              </a>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-taupe">{ui.cart.note}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
