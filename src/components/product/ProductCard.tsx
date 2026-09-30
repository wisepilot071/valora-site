import Link from 'next/link';
import type { Product } from '@/data/types';
import { ui } from '@/data/site';
import { getPrimaryImage } from '@/lib/catalog';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { SafeImage } from '@/components/ui/SafeImage';
import { AddToCartButton } from './AddToCartButton';
import { EnquireLink } from './EnquireLink';

export function ProductCard({ product, priority = false, headingLevel = 'h3' }: { product: Product; priority?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const img = getPrimaryImage(product);
  const href = `/product/${product.slug}`;
  const Heading = headingLevel;
  const muted = product.availability === 'outOfStock';

  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-linen" tabIndex={-1} aria-hidden>
        {img && (
          <SafeImage
            src={img.src}
            alt=""
            label={product.name}
            fill
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
            sizes="(min-width: 1440px) 440px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            style={{ objectPosition: img.focus }}
            className={`object-cover transition-[transform,filter] duration-slow ease-out group-hover:scale-[1.03] ${muted ? 'grayscale-[0.85] opacity-80' : ''}`}
          />
        )}
        <span className="absolute left-3 top-3 flex gap-2">
          {product.availability === 'outOfStock' && <Badge tone="muted">{ui.product.outOfStock}</Badge>}
          {product.availability === 'comingSoon' && <Badge>{ui.product.comingSoon}</Badge>}
          {product.salePrice != null && product.salePrice < product.price && product.availability === 'available' && <Badge tone="accent">{ui.product.sale}</Badge>}
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <Heading className="font-display text-[1.625rem] leading-tight">
            <Link href={href} className="-my-1.5 inline-block py-1.5 hover:text-clay">
              {product.name}
            </Link>
          </Heading>
          <Price product={product} className="shrink-0 text-small" />
        </div>
        <p className="mt-2 text-small text-taupe">{product.shortDescription}</p>

        <div className="card-actions mt-5 flex flex-wrap items-center gap-2">
          <Link href={href} className="inline-flex min-h-[44px] items-center border-b border-espresso pr-3 text-small font-medium hover:border-clay hover:text-clay">
            {ui.product.viewDetails}
            <span className="sr-only">: {product.name}</span>
          </Link>
          <span className="ml-auto flex gap-2">
            <AddToCartButton product={product} size="sm" variant="secondary" />
            <EnquireLink product={product} iconOnly />
          </span>
        </div>
      </div>
    </article>
  );
}
