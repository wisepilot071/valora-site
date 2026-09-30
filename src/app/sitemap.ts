import type { MetadataRoute } from 'next';
import { getNavigation } from '@/config/navigation';
import { getVisibleCategories } from '@/data/categories';
import { getProductSeo, getVisibleProducts } from '@/lib/catalog';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = getNavigation()
    .filter((n) => n.href.startsWith('/') && !n.href.includes('#'))
    .map((n) => ({ url: absoluteUrl(n.href), lastModified: now, changeFrequency: 'weekly' as const, priority: n.href === '/' ? 1 : 0.8 }));
  const categories = getVisibleCategories().map((c) => ({ url: absoluteUrl(`/shop/${c.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 }));
  const products = getVisibleProducts().map((p) => ({
    url: absoluteUrl(getProductSeo(p).canonical),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    images: p.images.map((i) => absoluteUrl(i.src)),
  }));
  return [...pages, ...categories, ...products];
}
