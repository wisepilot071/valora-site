'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/data/types';
import { Price } from '@/components/ui/Price';
import { AddToCartButton } from './AddToCartButton';
import { EnquireLink } from './EnquireLink';

/** Mobile/tablet bottom bar that appears once the main buy buttons scroll out of view. */
export function ProductStickyBuy({ product, watchId }: { product: Product; watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      data-sticky-buy={watchId}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-paper transition-transform duration-base ease-brand lg:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}
      inert={!show}
      aria-hidden={!show}
    >
      <div className="container-site flex items-center gap-3 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[1.125rem] leading-tight">{product.name}</p>
          <Price product={product} className="text-small text-taupe" />
        </div>
        {product.availability === 'available' ? <AddToCartButton product={product} size="sm" /> : <EnquireLink product={product} size="sm" variant="primary" />}
        {product.availability === 'available' && <EnquireLink product={product} iconOnly />}
      </div>
    </div>
  );
}
