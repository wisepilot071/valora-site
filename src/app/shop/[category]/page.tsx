import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategory, getVisibleCategories } from '@/data/categories';
import { ui } from '@/data/site';
import { getProductsByCategory } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { SEOHead } from '@/components/ui/SEOHead';
import { ShopView } from '@/components/product/ShopView';

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return buildMetadata({ title: c.seoTitle, description: c.seoDescription, path: `/shop/${c.slug}`, keywords: c.keywords, image: c.image });
}

export default async function CategoryPage({ params }: Params) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const products = getProductsByCategory(category.slug);
  return (
    <>
      <ShopView products={products} active={category} />
      <SEOHead
        schema={[
          breadcrumbSchema([
            { name: ui.breadcrumb.home, path: '/' },
            { name: ui.breadcrumb.shop, path: '/shop' },
            { name: category.name, path: `/shop/${category.slug}` },
          ]),
          itemListSchema(products, `/shop/${category.slug}`),
        ]}
      />
    </>
  );
}
