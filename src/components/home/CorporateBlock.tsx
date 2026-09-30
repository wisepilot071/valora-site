import { homepage } from '@/data/homepage';
import { getProductBySlug } from '@/lib/catalog';
import { CorporateStudio, type StudioOccasion } from './CorporateStudio';

export function CorporateBlock() {
  const c = homepage.corporate;
  const occasions: StudioOccasion[] = c.occasions.map((o) => {
    const product = getProductBySlug(o.product);
    return {
      label: o.label,
      note: o.note,
      image: o.image,
      productName: product?.name ?? '',
      productHref: product ? `/product/${product.slug}` : '/shop',
    };
  });
  return (
    <section aria-labelledby="corporate-heading" className="on-dark overflow-hidden bg-olive text-paper">
      <div className="container-site grid gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <CorporateStudio
          eyebrow={c.eyebrow}
          heading={c.heading}
          supporting={c.supporting}
          copy={c.studio}
          occasions={occasions}
          cta={c.cta}
        />
      </div>
    </section>
  );
}
