/**
 * JSON-LD builders. Only real data is emitted — no ratings, reviews or awards.
 */
import { brand, isConfigured } from '@/config/brand';
import { about } from '@/data/about';
import type { Product } from '@/data/types';
import { effectivePrice, getGalleryImages, getProductSeo } from './catalog';
import { absoluteUrl, siteUrl } from './seo';

type Json = Record<string, unknown>;

const availabilityUrl: Record<Product['availability'], string | null> = {
  available: 'https://schema.org/InStock',
  outOfStock: 'https://schema.org/OutOfStock',
  comingSoon: null,
  hidden: null,
};

export function organizationSchema(): Json {
  const sameAs = [
    brand.instagram,
    ...about.founders.people.map((p) => p.linkedin),
  ].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: brand.brandName,
    slogan: brand.tagline,
    description: brand.positioning,
    url: siteUrl,
    logo: absoluteUrl(brand.logo),
    ...(isConfigured(brand.email) ? { email: brand.email } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${brand.whatsapp.countryCode}${brand.whatsapp.number}`,
      ...(isConfigured(brand.email) ? { email: brand.email } : {}),
      availableLanguage: ['en'],
    },
    ...(brand.serviceArea.show
      ? { areaServed: { '@type': 'City', name: brand.serviceArea.city } }
      : {}),
    founder: about.founders.people.map((p) => ({
      '@type': 'Person',
      name: p.name,
      jobTitle: p.role,
      ...(p.linkedin ? { sameAs: p.linkedin } : {}),
    })),
    ...(brand.instagram ? { sameAs } : {}),
  };
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: brand.brandName,
    url: siteUrl,
    inLanguage: brand.locale,
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(p: Product): Json {
  const availability = availabilityUrl[p.availability];
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(`/product/${p.slug}`)}#product`,
    name: p.name,
    description: p.shortDescription,
    sku: p.id,
    url: absoluteUrl(getProductSeo(p).canonical),
    image: getGalleryImages(p).map((i) => absoluteUrl(i.src)),
    brand: { '@type': 'Brand', name: brand.brandName },
    category: p.category.join(', '),
    ...(p.weight ? { weight: p.weight } : {}),
    ...(availability
      ? {
          offers: {
            '@type': 'Offer',
            url: absoluteUrl(`/product/${p.slug}`),
            priceCurrency: p.currency,
            price: effectivePrice(p).toFixed(2),
            availability,
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': `${siteUrl}/#organization` },
          },
        }
      : {}),
  };
}

export function itemListSchema(list: Product[], path: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: absoluteUrl(path),
    itemListElement: list.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/product/${p.slug}`),
      name: p.name,
    })),
  };
}
