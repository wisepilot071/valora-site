import type { Metadata } from 'next';
import { about } from '@/data/about';
import { seo } from '@/data/seo';
import { buildMetadata } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { LinkedInIcon, Mark } from '@/components/ui/Icons';
import { SafeImage } from '@/components/ui/SafeImage';

const p = seo.pages.about;
export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: p.path, keywords: p.keywords, image: about.image.src });

export default function AboutPage() {
  return (
    <>
      <header className="container-site grid gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-clay" aria-hidden />
            {about.eyebrow}
          </p>
          <h1 className="text-display">{about.h1}</h1>
          <p className="mt-8 max-w-lg text-lead text-taupe">{about.intro}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-linen lg:col-span-6">
          <SafeImage src={about.image.src} alt={about.image.alt} fill priority fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="container-site">
        {about.sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`about-${i}`} className="grid gap-8 border-t border-stone py-14 lg:grid-cols-12 lg:gap-8 lg:py-20" data-reveal>
            <p className="font-display text-[3rem] leading-none text-clay lg:col-span-1">0{i + 1}</p>
            <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-last lg:col-start-9' : ''}`}>
              <h2 id={`about-${i}`} className="text-h3">{s.title}</h2>
              <p className="mt-4 text-taupe">{s.body}</p>
            </div>
            <div className={`relative aspect-[21/9] overflow-hidden bg-linen lg:col-span-6 ${i % 2 ? 'lg:col-start-2' : 'lg:col-start-7'}`}>
              <SafeImage src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="founders-heading" className="bg-linen py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-clay" aria-hidden />
              {about.founders.eyebrow}
            </p>
            <h2 id="founders-heading" className="text-h2">{about.founders.heading}</h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {about.founders.people.map((person) => (
              <li key={person.name} className="flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone/40">
                  {person.photo ? (
                    <SafeImage src={person.photo} alt={person.photoAlt} fill sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw" className="object-cover object-[50%_25%] grayscale-[0.15]" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Mark size={40} className="text-clay/70" />
                    </div>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[1.75rem] leading-tight">{person.name}</h3>
                <p className="mt-1 text-small text-taupe">{person.role}</p>
                {person.linkedin && (
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-2 self-start text-small hover:text-clay">
                    <LinkedInIcon size={18} /> LinkedIn<span className="sr-only"> — {person.name} (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-cta" className="container-site py-24 text-center lg:py-32">
        <h2 id="about-cta" className="text-h2">{about.cta.heading}</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={about.cta.primary.href} size="lg">{about.cta.primary.label}</ButtonLink>
          <ButtonLink href={about.cta.secondary.href} size="lg" variant="secondary">{about.cta.secondary.label}</ButtonLink>
        </div>
      </section>
    </>
  );
}
