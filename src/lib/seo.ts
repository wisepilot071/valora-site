import type { Metadata } from 'next';
import { brand, isConfigured } from '@/config/brand';
import { seo } from '@/data/seo';

/**
 * Public site URL, in priority order:
 * 1. NEXT_PUBLIC_SITE_URL (set this in Vercel → Settings → Environment Variables)
 * 2. Vercel's production domain (automatic on Vercel)
 * 3. brand.siteUrl, if it has been filled in
 * 4. http://localhost:3000 for local development
 */
export const siteUrl = (() => {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  const url = fromEnv || (isConfigured(brand.siteUrl) ? brand.siteUrl : 'http://localhost:3000');
  return url.replace(/\/+$/, '');
})();

export const absoluteUrl = (pathOrUrl: string) =>
  /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${siteUrl}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  imageAlt?: string;
  /** Use the title as-is, without the " | VALORA" suffix. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const image = input.image ?? seo.defaultOgImage;
  const fullTitle = input.absoluteTitle ? input.title : seo.titleTemplate.replace('%s', input.title);
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    keywords: input.keywords?.length ? [...input.keywords] : undefined,
    alternates: { canonical: absoluteUrl(input.path) },
    openGraph: {
      type: input.type ?? 'website',
      siteName: brand.brandName,
      locale: brand.locale.replace('-', '_'),
      url: absoluteUrl(input.path),
      title: input.ogTitle ?? fullTitle,
      description: input.ogDescription ?? input.description,
      images: [{ url: absoluteUrl(image), alt: input.imageAlt ?? brand.logoAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.ogTitle ?? fullTitle,
      description: input.ogDescription ?? input.description,
      images: [absoluteUrl(image)],
    },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
  };
}
