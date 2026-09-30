import Link from 'next/link';
import { homepage } from '@/data/homepage';
import { getFeaturedProducts } from '@/lib/catalog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowIcon } from '@/components/ui/Icons';
import { ProductGrid } from '@/components/product/ProductGrid';

export function FeaturedProducts() {
  const f = homepage.featured;
  const products = getFeaturedProducts();
  if (!products.length) return null;
  return (
    <section aria-labelledby="featured-heading" className="container-site py-20 lg:py-32">
      <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="featured-heading" eyebrow={f.eyebrow} title={f.heading} className="max-w-2xl" />
        <Link href={f.ctaHref} className="link-underline inline-flex min-h-[44px] items-center gap-2 self-start text-small font-medium lg:self-auto">
          {f.ctaLabel} <ArrowIcon size={16} />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
