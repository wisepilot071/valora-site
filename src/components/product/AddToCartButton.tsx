'use client';

import { useState } from 'react';
import type { Product } from '@/data/types';
import { ui } from '@/data/site';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';

type Props = { product: Product; size?: 'sm' | 'md' | 'lg'; variant?: 'primary' | 'secondary'; className?: string; compact?: boolean };

export function AddToCartButton({ product, size = 'md', variant = 'primary', className = '' }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (product.availability === 'comingSoon') return null;
  const disabled = product.availability !== 'available';

  return (
    <Button
      data-add-slug={product.slug}
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={() => {
        add(product.slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {disabled ? ui.product.outOfStock : added ? ui.product.added : ui.product.addToCart}
      {!disabled && <span className="sr-only">: {product.name}</span>}
    </Button>
  );
}
