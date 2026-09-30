import { homepage } from '@/data/homepage';
import { ButtonLink } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export function BrandStory() {
  const s = homepage.brandStory;
  return (
    <section aria-labelledby="story-heading" className="container-site py-20 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7" data-reveal>
          <div className="relative aspect-[3/2] overflow-hidden bg-linen">
            <SafeImage src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-10 right-6 hidden w-[34%] border-[10px] border-paper bg-paper sm:block lg:-right-16">
            <div className="relative aspect-square overflow-hidden bg-linen">
              <SafeImage src={s.secondaryImage.src} alt={s.secondaryImage.alt} fill sizes="260px" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9" data-reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-clay" aria-hidden />
            {s.eyebrow}
          </p>
          <h2 id="story-heading" className="text-h2">
            {s.heading}
          </h2>
          {s.paragraphs.map((p) => (
            <p key={p} className="mt-6 text-taupe">
              {p}
            </p>
          ))}
          <div className="mt-10">
            <ButtonLink href={s.ctaHref} variant="ghost">
              {s.ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
