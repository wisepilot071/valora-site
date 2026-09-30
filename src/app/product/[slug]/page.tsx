import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategory } from '@/data/categories';
import { ui } from '@/data/site';
import { getGalleryImages, getProductBySlug, getProductSeo, getRelatedProducts, getVisibleProducts } from '@/lib/catalog';
import { warnMissingImages } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, productSchema } from '@/lib/schema';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { SEOHead } from '@/components/ui/SEOHead';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ContentsList } from '@/components/product/ContentsList';
import { EnquireLink } from '@/components/product/EnquireLink';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductStickyBuy } from '@/components/product/ProductStickyBuy';
import { RelatedProducts } from '@/components/product/RelatedProducts';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProductBySlug((await params).slug);
  if (!p) return {};
  const s = getProductSeo(p);
  return buildMetadata({
    title: s.title,
    description: s.description,
    path: s.canonical,
    keywords: s.keywords,
    ogTitle: s.ogTitle,
    ogDescription: s.ogDescription,
    image: s.ogImage,
    imageAlt: p.images[0]?.alt,
  });
}

export default async function ProductPage({ params }: Params) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  const images = getGalleryImages(product);
  warnMissingImages(product.images.map((i) => i.src), product.slug);
  const related = getRelatedProducts(product);
  const primaryCategory = product.category.map(getCategory).find(Boolean);
  const availabilityLabel = { available: ui.product.available, outOfStock: ui.product.outOfStock, comingSoon: ui.product.comingSoon, hidden: '' }[product.availability];

  const details = [
    product.weight && { label: ui.product.weight, value: product.weight },
    product.dimensions && { label: ui.product.dimensions, value: product.dimensions },
    { label: ui.product.availability, value: availabilityLabel },
    product.delivery && { label: ui.product.delivery, value: product.delivery },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <div className="container-site pb-20 pt-8 lg:pb-28 lg:pt-12">
        <nav aria-label={ui.breadcrumb.label} className="mb-8 text-[0.8125rem] text-taupe">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="inline-flex min-h-[44px] items-center hover:text-espresso">{ui.breadcrumb.home}</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/shop" className="inline-flex min-h-[44px] items-center hover:text-espresso">{ui.breadcrumb.shop}</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-espresso">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ProductGallery images={images} name={product.name} />
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <div className="lg:sticky lg:top-28">
              {primaryCategory && (
                <Link href={`/shop/${primaryCategory.slug}`} className="eyebrow mb-5 inline-flex min-h-[44px] items-center gap-3 hover:text-clay">
                  <span className="h-px w-8 bg-clay" aria-hidden />
                  {primaryCategory.name}
                </Link>
              )}
              <h1 className="text-h2 lg:text-[clamp(2.5rem,4vw,3.75rem)]">{getProductSeo(product).h1}</h1>
              <div className="mt-5 flex items-center gap-4">
                <Price product={product} className="text-h3 font-display" />
                {product.availability !== 'available' && <Badge tone="muted">{availabilityLabel}</Badge>}
              </div>
              <p className="mt-6 text-lead text-taupe">{product.shortDescription}</p>

              <div id="buy-actions" className="mt-8 flex flex-wrap gap-3">
                <AddToCartButton product={product} size="lg" className="flex-1 sm:flex-none" />
                <EnquireLink product={product} size="lg" variant={product.availability === 'available' ? 'secondary' : 'primary'} className="flex-1 sm:flex-none" />
              </div>

              <div className="mt-10 space-y-4 text-taupe">
                {product.fullDescription.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              {product.contents.length > 0 && (
                <section aria-labelledby="contents-heading" className="mt-12">
                  <h2 id="contents-heading" className="mb-4 font-sans text-small font-medium uppercase tracking-[0.14em]">{ui.product.whatsInside}</h2>
                  <ContentsList items={product.contents} />
                </section>
              )}

              {product.perfectFor.length > 0 && (
                <section aria-labelledby="perfect-heading" className="mt-10">
                  <h2 id="perfect-heading" className="mb-4 font-sans text-small font-medium uppercase tracking-[0.14em]">{ui.product.perfectFor}</h2>
                  <ul className="flex flex-wrap gap-2">
                    {product.perfectFor.map((x) => (
                      <li key={x} className="rounded-full border border-stone px-4 py-2 text-small">{x}</li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-10 border-t border-stone">
                <Accordion title={ui.product.details}>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-small">
                    {details.map((d) => (
                      <div key={d.label} className="contents">
                        <dt className="text-taupe">{d.label}</dt>
                        <dd>{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />

      <section aria-labelledby="corp-strip" className="on-dark bg-olive text-paper">
        <div className="container-site flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="corp-strip" className="text-h3">{ui.product.corporateStrip.heading}</h2>
            <p className="mt-2 text-paper/85">{ui.product.corporateStrip.body}</p>
          </div>
          <ButtonLink href={ui.product.corporateStrip.href} variant="light">
            {ui.product.corporateStrip.cta}
          </ButtonLink>
        </div>
      </section>

      <ProductStickyBuy product={product} watchId="buy-actions" />
      <SEOHead
        schema={[
          productSchema(product),
          breadcrumbSchema([
            { name: ui.breadcrumb.home, path: '/' },
            { name: ui.breadcrumb.shop, path: '/shop' },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
