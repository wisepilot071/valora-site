import type { Product } from '@/data/types';
import { effectivePrice } from '@/lib/pricing';
import { formatINR } from '@/lib/format';

export function Price({ product, className = '' }: { product: Product; className?: string }) {
  const price = effectivePrice(product);
  const onSale = price < product.price;
  return (
    <span className={`inline-flex items-baseline gap-2 tabular-nums ${className}`}>
      <span>{formatINR(price)}</span>
      {onSale && (
        <s className="text-[0.85em] text-taupe" aria-label={`was ${formatINR(product.price)}`}>
          {formatINR(product.price)}
        </s>
      )}
    </span>
  );
}
