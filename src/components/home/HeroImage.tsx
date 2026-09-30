'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/** Hero image with a gentle desktop-only parallax (disabled for reduced motion). */
export function HeroImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 900) * 0.06;
      el.style.transform = `translate3d(0, ${y}px, 0) scale(1.06)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const attach = () => {
      window.removeEventListener('scroll', onScroll);
      if (mq.matches) {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else {
        el.style.transform = '';
      }
    };
    attach();
    mq.addEventListener('change', attach);
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', attach);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 will-change-transform">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={70}
        sizes="(min-width: 1440px) 820px, (min-width: 1024px) 58vw, 100vw"
        className="object-cover object-[74%_50%]"
        data-w={width}
        data-h={height}
      />
    </div>
  );
}
