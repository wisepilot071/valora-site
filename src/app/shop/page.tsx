import type { Metadata } from 'next';
import { seo } from '@/data/seo';
import { ui } from '@/data/site';
import { getVisibleProducts } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { SEOHead } from '@/components/ui/SEOHead';
import { ShopView } from '@/components/product/ShopView';

const p = seo.pages.shop;
export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: p.path, keywords: p.keywords });

export default function ShopPage() {
  const products = getVisibleProducts();
  return (
    <>
      <ShopView products={products} />
      <SEOHead
        schema={[
          breadcrumbSchema([
            { name: ui.breadcrumb.home, path: '/' },
            { name: ui.breadcrumb.shop, path: '/shop' },
          ]),
          itemListSchema(products, '/shop'),
        ]}
      />
    </>
  );
}
