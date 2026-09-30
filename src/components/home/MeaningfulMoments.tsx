import Link from 'next/link';
import { homepage } from '@/data/homepage';
import { moments } from '@/data/moments';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SafeImage } from '@/components/ui/SafeImage';
import { MomentsScroller } from './MomentsScroller';

export function MeaningfulMoments() {
  const m = homepage.moments;
  if (!moments.length) return null;
  return (
    <section aria-labelledby="moments-heading" className="py-20 lg:py-28">
      <div className="container-site mb-12">
        <SectionHeading id="moments-heading" eyebrow={m.eyebrow} title={m.heading} className="max-w-2xl" />
      </div>
      <MomentsScroller label={m.eyebrow}>
        {moments.map((moment) => (
          <li key={moment.title} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[26vw] lg:max-w-[380px]">
            <Link href={moment.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                <SafeImage src={moment.image} alt={moment.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 44vw, 78vw" className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04]" />
              </div>
              <h3 className="mt-5 font-display text-[1.75rem] leading-none group-hover:text-clay">{moment.title}</h3>
              <p className="mt-2 text-small text-taupe">{moment.caption}</p>
            </Link>
          </li>
        ))}
      </MomentsScroller>
    </section>
  );
}
