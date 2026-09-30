import { homepage } from '@/data/homepage';
import { ButtonLink } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export function FinalCTA() {
  const f = homepage.finalCta;
  return (
    <section aria-labelledby="final-heading" className="pt-24 lg:pt-36">
      <div className="container-site text-center" data-reveal>
        <h2 id="final-heading" className="mx-auto max-w-4xl text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.02] tracking-[-0.02em]">
          {f.heading}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={f.primaryCta.href} size="lg">
            {f.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={f.secondaryCta.href} size="lg" variant="secondary">
            {f.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
      <div className="relative mt-20 aspect-[16/9] overflow-hidden bg-linen sm:aspect-[21/9] lg:mt-28 lg:aspect-[3/1]">
        <SafeImage src={f.image.src} alt={f.image.alt} fill sizes="100vw" className="object-cover object-[55%_50%]" />
      </div>
    </section>
  );
}
