export type Availability = 'available' | 'outOfStock' | 'comingSoon' | 'hidden';

export interface ProductImage {
  src: string;
  alt: string;
  role: 'thumbnail' | 'main' | 'closed' | 'contents' | 'detail' | 'lifestyle' | 'additional';
  width: number;
  height: number;
  caption?: string;
  /** Optional CSS object-position for cropped frames, e.g. '70% 50%'. */
  focus?: string;
}

export interface ProductSEO {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  /** Path or absolute URL. Leave '' to use /product/<slug>. */
  canonicalUrl: string;
  keywords: string[];
  /** Leave '' to use "<seoTitle> | VALORA". */
  ogTitle: string;
  /** Leave '' to use metaDescription. */
  ogDescription: string;
  /** Leave '' to use the product's main image. */
  ogImage: string;
  /** Leave '' to use the product name. */
  h1: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Category slugs from categories.ts */
  category: string[];
  price: number;
  salePrice?: number | null;
  currency: 'INR';
  shortDescription: string;
  fullDescription: string[];
  contents: string[];
  perfectFor: string[];
  weight?: string;
  dimensions?: string;
  /** Optional delivery note shown in Product Details when set. */
  delivery?: string;
  images: ProductImage[];
  availability: Availability;
  featured: boolean;
  sortOrder: number;
  seo: ProductSEO;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  sortOrder: number;
  visible: boolean;
}
