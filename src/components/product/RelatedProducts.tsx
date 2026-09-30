import type { Product } from '@/data/types';
import { ui } from '@/data/site';
import { ProductGrid } from './ProductGrid';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="related-heading" className="container-site py-20 lg:py-28">
      <h2 id="related-heading" className="mb-12 text-h2">
        {ui.product.related}
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
