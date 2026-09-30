import Link from 'next/link';
import { homepage } from '@/data/homepage';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import { HeroImage } from './HeroImage';

export function Hero() {
  const h = homepage.hero;
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="container-site grid items-center gap-10 pb-16 pt-8 lg:min-h-[calc(100svh-120px)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-12">
        <div className="lg:col-span-5 lg:pr-4">
          <p className="eyebrow mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-clay" aria-hidden />
            {h.eyebrow}
          </p>
          <h1 id="hero-heading" className="text-display">
            {h.headline}
          </h1>
          <p className="mt-7 max-w-[34rem] text-lead text-taupe">{h.supporting}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={h.primaryCta.href} size="lg">
              {h.primaryCta.label}
              <ArrowIcon size={18} />
            </ButtonLink>
            <ButtonLink href={h.secondaryCta.href} size="lg" variant="secondary">
              {h.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <figure className="relative lg:col-span-7 lg:-mr-[var(--gutter)] xl:mr-0">
          <div className="relative aspect-[4/3] overflow-hidden bg-linen lg:aspect-[5/4]">
            <HeroImage {...h.image} />
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-[0.8125rem] text-taupe">
            <Link href={h.captionHref} className="link-underline inline-flex min-h-[44px] items-center">
              {h.caption}
            </Link>
            <span aria-hidden className="h-px w-16 bg-stone" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
