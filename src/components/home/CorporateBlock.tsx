import { homepage } from '@/data/homepage';
import { ButtonLink } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export function CorporateBlock() {
  const c = homepage.corporate;
  return (
    <section aria-labelledby="corporate-heading" className="on-dark bg-olive text-paper">
      <div className="container-site grid gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="relative lg:col-span-7" data-reveal>
          <div className="relative aspect-[16/10] overflow-hidden">
            <SafeImage src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5 lg:pl-8" data-reveal>
          <p className="mb-5 flex items-center gap-3 text-eyebrow font-medium uppercase text-sage">
            <span className="h-px w-8 bg-sage" aria-hidden />
            {c.eyebrow}
          </p>
          <h2 id="corporate-heading" className="text-h2">
            {c.heading}
          </h2>
          <p className="mt-6 text-paper/85">{c.supporting}</p>
          <ul className="mt-8 divide-y divide-paper/15 border-y border-paper/15">
            {c.points.map((p) => (
              <li key={p} className="py-3 text-small text-paper/90">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href={c.cta.href} variant="light" size="lg">
              {c.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
