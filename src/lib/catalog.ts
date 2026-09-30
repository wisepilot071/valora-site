/**
 * Read-only helpers over products.ts. Every surface uses these, so the rules
 * (hidden products never render, price = salePrice ?? price) live in one place.
 */
import { products } from '@/data/products';
import type { Product, ProductImage } from '@/data/types';

export const isVisible = (p: Product) => p.availability !== 'hidden';
export const isPurchasable = (p: Product) => p.availability === 'available';

import { effectivePrice } from './pricing';
export { effectivePrice };

export const byOrder = (a: Product, b: Product) =>
  a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);

export const getVisibleProducts = () => products.filter(isVisible).sort(byOrder);

export const getFeaturedProducts = () => getVisibleProducts().filter((p) => p.featured);

export const getProductsByCategory = (slug: string) =>
  getVisibleProducts().filter((p) => p.category.includes(slug));

export const getProductBySlug = (slug: string) =>
  getVisibleProducts().find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, limit = 3) => {
  const others = getVisibleProducts().filter((p) => p.slug !== product.slug);
  const shared = others
    .map((p) => ({ p, score: p.category.filter((c) => product.category.includes(c)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || byOrder(a.p, b.p))
    .map((x) => x.p);
  const fill = others.filter((p) => !shared.includes(p));
  return [...shared, ...fill].slice(0, limit);
};

const rolePriority: ProductImage['role'][] = ['thumbnail', 'main', 'closed', 'contents', 'detail', 'lifestyle', 'additional'];

/** Card / cart image: explicit thumbnail, else main, else the first image. */
export const getPrimaryImage = (p: Product): ProductImage | undefined =>
  [...p.images].sort((a, b) => rolePriority.indexOf(a.role) - rolePriority.indexOf(b.role))[0];

/** Gallery images: everything except a dedicated thumbnail, main first. */
export const getGalleryImages = (p: Product) => {
  const gallery = p.images.filter((i) => i.role !== 'thumbnail');
  const list = gallery.length ? gallery : p.images;
  return [...list].sort((a, b) => rolePriority.indexOf(a.role) - rolePriority.indexOf(b.role));
};

/** Slim catalog for the client-side cart (keeps full product copy out of the JS bundle). */
export const getCartCatalog = () =>
  getVisibleProducts().map((p) => {
    const img = getPrimaryImage(p);
    return {
      slug: p.slug,
      name: p.name,
      price: effectivePrice(p),
      availability: p.availability,
      image: img ? { src: img.src, focus: img.focus } : undefined,
    };
  });

/** Resolved SEO values with sensible fallbacks, so one edit updates every surface. */
export const getProductSeo = (p: Product) => ({
  title: p.seo.seoTitle || p.name,
  description: p.seo.metaDescription || p.shortDescription,
  canonical: p.seo.canonicalUrl || `/product/${p.slug}`,
  ogTitle: p.seo.ogTitle || undefined,
  ogDescription: p.seo.ogDescription || undefined,
  ogImage: p.seo.ogImage || getPrimaryImage(p)?.src,
  h1: p.seo.h1 || p.name,
  keywords: p.seo.keywords,
});
