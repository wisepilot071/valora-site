'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { ArrowIcon, Mark } from '@/components/ui/Icons';
import { SafeImage } from '@/components/ui/SafeImage';

export interface StudioOccasion {
  label: string;
  note: string;
  image: { src: string; alt: string };
  productName: string;
  productHref: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  supporting: string;
  copy: {
    occasionsLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    signatureFallback: string;
    signaturePrefix: string;
    cardLabel: string;
    viewHamper: string;
  };
  occasions: StudioOccasion[];
  cta: { label: string; href: string };
}

/**
 * The corporate "gifting studio": pick an occasion, see the hamper, and watch a
 * note card write itself — signed with the visitor's own company name.
 */
export function CorporateStudio({ eyebrow, heading, supporting, copy, occasions, cta }: Props) {
  const [active, setActive] = useState(0);
  const [company, setCompany] = useState('');
  // How many characters of the note are shown; reset to 0 when the occasion changes.
  const [shown, setShown] = useState<{ key: number; count: number }>({ key: 0, count: Infinity });
  const tabsId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const occ = occasions[active];
  const count = shown.key === active ? shown.count : 0;
  const typed = occ.note.slice(0, count);

  // Type the note out whenever the occasion changes (instant with reduced motion).
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false; // the first note is already rendered in full
      return;
    }
    const len = occasions[active].note.length;
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;
    const t = window.setInterval(() => {
      i = instant ? len : i + 2;
      setShown({ key: active, count: i });
      if (i >= len) window.clearInterval(t);
    }, 24);
    return () => window.clearInterval(t);
  }, [active, occasions]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = occasions.length;
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const signature = company.trim() || copy.signatureFallback;
  const enquireHref = `${cta.href}?hamper=${encodeURIComponent(occ.productName)}#corporate`;

  return (
    <>
      {/* Visual: hamper photo + the note card */}
      <div className="relative self-start pb-0 sm:pb-12 lg:col-span-7 lg:self-center" data-studio-visual>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#2f372a] sm:aspect-[16/11]">
          {occasions.map((o, i) => (
            <div
              key={o.image.src}
              className={`absolute inset-0 transition-[opacity,transform] duration-slow ease-out ${i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`}
              aria-hidden={i !== active}
              data-studio-image={i}
            >
              <SafeImage src={o.image.src} alt={i === active ? o.image.alt : ''} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-olive/60 to-transparent" aria-hidden />
        </div>

        <figure
          className="relative -mt-10 ml-4 w-[min(86%,340px)] -rotate-2 bg-paper p-5 sm:p-6 text-espresso shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] sm:absolute sm:bottom-0 sm:left-8 sm:mt-0 sm:ml-0 lg:-left-6"
          aria-live="polite"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <Mark size={16} className="text-clay" />
            <span className="text-[0.5625rem] uppercase tracking-[0.14em] text-taupe sm:text-[0.625rem] sm:tracking-[0.18em]">{copy.cardLabel}</span>
          </div>
          <blockquote className="min-h-[4.5rem] font-display text-[1.25rem] sm:min-h-[5.5rem] sm:text-[1.375rem] italic leading-snug" data-studio-note>
            {typed}
            <span className="ml-0.5 inline-block h-5 w-px translate-y-1 animate-pulse bg-clay align-baseline" aria-hidden />
          </blockquote>
          <figcaption className="mt-5 border-t border-stone pt-3 text-small text-taupe">
            {copy.signaturePrefix}
            <br />
            <span className="font-display text-[1.25rem] not-italic text-espresso" data-studio-signature>
              {signature}
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Controls */}
      <div className="flex flex-col justify-center lg:col-span-5 lg:pl-8">
        <p className="mb-5 flex items-center gap-3 text-eyebrow font-medium uppercase text-sage">
          <span className="h-px w-8 bg-sage" aria-hidden />
          {eyebrow}
        </p>
        <h2 id="corporate-heading" className="text-h2">
          {heading}
        </h2>
        <p className="mt-6 text-paper/85">{supporting}</p>

        <p id={`${tabsId}-label`} className="mt-10 text-eyebrow font-medium uppercase text-sage">
          {copy.occasionsLabel}
        </p>
        <div role="tablist" aria-labelledby={`${tabsId}-label`} aria-orientation="vertical" className="mt-3 divide-y divide-paper/15 border-y border-paper/15">
          {occasions.map((o, i) => (
            <button
              key={o.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              data-studio-tab={i}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex min-h-[52px] w-full items-center gap-4 py-3 text-left transition-colors duration-base ${i === active ? 'text-paper' : 'text-paper/65 hover:text-paper'}`}
            >
              <span className={`text-[0.75rem] tabular-nums ${i === active ? 'text-brass' : 'text-sage'}`}>0{i + 1}</span>
              <span className="flex-1 text-small">{o.label}</span>
              <span className={`h-px bg-brass transition-all duration-slow ease-out ${i === active ? 'w-10' : 'w-0 group-hover:w-4'}`} aria-hidden />
            </button>
          ))}
        </div>

        <label htmlFor={`${tabsId}-company`} className="mt-8 block text-eyebrow font-medium uppercase text-sage">
          {copy.nameLabel}
        </label>
        <input
          id={`${tabsId}-company`}
          data-studio-input
          type="text"
          maxLength={40}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={copy.namePlaceholder}
          autoComplete="organization"
          className="mt-3 min-h-[48px] w-full border-b border-paper/30 bg-transparent py-2 font-display text-[1.375rem] text-paper placeholder:text-paper/35 focus:border-brass focus:outline-none"
        />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href={enquireHref} className={buttonClass('light', 'lg')} data-studio-cta>
            {cta.label}
          </Link>
          <Link href={occ.productHref} className="inline-flex min-h-[44px] items-center gap-2 text-small text-paper/85 underline decoration-paper/30 underline-offset-[6px] hover:text-paper hover:decoration-brass" data-studio-product>
            {copy.viewHamper}: {occ.productName} <ArrowIcon size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
