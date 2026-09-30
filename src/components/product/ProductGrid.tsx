import type { Product } from '@/data/types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, priorityCount = 0, headingLevel = 'h3' }: { products: Product[]; priorityCount?: number; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
      {products.map((p, i) => (
        <li key={p.slug} data-reveal={i < priorityCount * 3 ? undefined : ''} style={{ ['--reveal-delay' as string]: `${(i % 3) * 80}ms` }}>
          <ProductCard product={p} priority={i < priorityCount} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
