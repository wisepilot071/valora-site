import Link from 'next/link';
import type { Category, Product } from '@/data/types';
import { getVisibleCategories } from '@/data/categories';
import { ui } from '@/data/site';
import { buttonClass } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductGrid } from './ProductGrid';

const chip =
  'inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full border px-5 text-small transition-colors duration-base';

export function ShopView({ products, active }: { products: Product[]; active?: Category }) {
  const categories = getVisibleCategories();
  return (
    <>
      <header className="container-site pb-12 pt-10 lg:pb-16 lg:pt-16">
        <nav aria-label={ui.breadcrumb.label} className="mb-10 text-[0.8125rem] text-taupe">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-espresso">{ui.breadcrumb.home}</Link>
            </li>
            <li aria-hidden>/</li>
            {active ? (
              <>
                <li>
                  <Link href="/shop" className="inline-flex min-h-[44px] items-center hover:text-espresso">{ui.breadcrumb.shop}</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-espresso">{active.name}</li>
              </>
            ) : (
              <li aria-current="page" className="text-espresso">{ui.breadcrumb.shop}</li>
            )}
          </ol>
        </nav>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-clay" aria-hidden />
              {active ? ui.shop.h1 : ui.shop.eyebrow}
            </p>
            <h1 className="text-display">{active ? active.name : ui.shop.h1}</h1>
          </div>
          <p className="text-lead text-taupe lg:col-span-4">{active ? active.description : ui.shop.supporting}</p>
        </div>
      </header>

      <div className="container-site sticky top-16 z-20 border-y border-stone bg-paper lg:top-20">
        <nav aria-label={ui.shop.filterLabel} className="no-scrollbar -mx-[var(--gutter)] flex items-center gap-2 overflow-x-auto px-[var(--gutter)] py-3">
          <Link href="/shop" aria-current={!active ? 'page' : undefined} className={`${chip} ${!active ? 'border-espresso bg-espresso text-paper' : 'border-stone hover:border-espresso'}`}>
            {ui.shop.all}
          </Link>
          {categories.map((c) => {
            const isActive = active?.slug === c.slug;
            return (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={`${chip} ${isActive ? 'border-espresso bg-espresso text-paper' : 'border-stone hover:border-espresso'}`}
              >
                {c.name}
              </Link>
            );
          })}
          <span className="ml-auto hidden shrink-0 pl-4 text-[0.8125rem] text-taupe sm:inline" aria-live="polite">
            {ui.shop.count(products.length)}
          </span>
        </nav>
      </div>

      <section aria-label={active ? active.name : ui.shop.h1} className="container-site py-14 lg:py-20">
        {products.length ? (
          <ProductGrid products={products} priorityCount={1} headingLevel="h2" />
        ) : (
          <EmptyState
            heading={ui.shop.emptyHeading}
            body={ui.shop.emptyBody}
            action={
              <Link href="/shop" className={buttonClass('primary')}>
                {ui.shop.reset}
              </Link>
            }
          />
        )}
      </section>
    </>
  );
}
