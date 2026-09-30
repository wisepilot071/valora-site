import type { Product } from '@/data/types';

/** The price a customer actually pays: salePrice when it is set and lower, otherwise price. */
export const effectivePrice = (p: Pick<Product, 'price' | 'salePrice'>) =>
  p.salePrice != null && p.salePrice > 0 && p.salePrice < p.price ? p.salePrice : p.price;
