'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProductImage } from '@/data/types';
import { ui } from '@/data/site';
import { SafeImage } from '@/components/ui/SafeImage';
import { ChevronIcon } from '@/components/ui/Icons';

/**
 * Swipeable (scroll-snap) gallery with thumbnails and keyboard support.
 * Driven entirely by the product's images[] array.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const multiple = images.length > 1;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = Math.max(0, Math.min(images.length - 1, i));
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
      setIndex(next);
    },
    [images.length],
  );

  useEffect(() => {
    const el = track.current;
    if (!el || !multiple) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [multiple]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(images.length - 1);
    }
  };

  return (
    <div aria-roledescription={multiple ? 'carousel' : undefined} aria-label={`${ui.product.galleryLabel}: ${name}`} role="region">
      <div className="relative">
        <div
          ref={track}
          data-gallery-track
          tabIndex={multiple ? 0 : -1}
          onKeyDown={multiple ? onKeyDown : undefined}
          className="no-scrollbar flex aspect-[5/4] snap-x snap-mandatory overflow-x-auto bg-linen"
          aria-live="polite"
        >
          {images.map((img, i) => (
            <figure
              key={img.src}
              className="relative h-full w-full shrink-0 snap-center"
              role={multiple ? 'group' : undefined}
              aria-roledescription={multiple ? 'slide' : undefined}
              aria-label={multiple ? `${i + 1} / ${images.length}` : undefined}
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                label={name}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? 'high' : undefined}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={{ objectPosition: img.focus }}
              />
              {img.caption && <figcaption className="absolute bottom-3 left-3 bg-paper/90 px-2 py-1 text-[0.75rem]">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
        {multiple && (
          <div className="pointer-events-none absolute inset-x-3 top-1/2 hidden -translate-y-1/2 justify-between lg:flex">
            <button type="button" data-gallery-prev onClick={() => go(index - 1)} disabled={index === 0} className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-espresso transition-opacity disabled:opacity-0" aria-label={ui.product.previousImage}>
              <ChevronIcon className="rotate-180" />
            </button>
            <button type="button" data-gallery-next onClick={() => go(index + 1)} disabled={index === images.length - 1} className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-espresso transition-opacity disabled:opacity-0" aria-label={ui.product.nextImage}>
              <ChevronIcon />
            </button>
          </div>
        )}
      </div>

      {multiple && (
        <ul className="mt-4 flex gap-3" aria-label={ui.product.galleryLabel}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                data-gallery-thumb={i}
                onClick={() => go(i)}
                aria-current={i === index ? 'true' : undefined}
                aria-label={`${ui.product.showImage} ${i + 1}: ${img.alt}`}
                className={`relative block h-16 w-20 overflow-hidden bg-linen outline-offset-2 transition-opacity sm:h-20 sm:w-24 ${i === index ? 'opacity-100 ring-1 ring-espresso ring-offset-2 ring-offset-paper' : 'opacity-60 hover:opacity-100'}`}
              >
                <SafeImage src={img.src} alt="" fill sizes="96px" className="object-cover" style={{ objectPosition: img.focus }} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
