'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One IntersectionObserver for the whole page. Elements with [data-reveal] fade
 * in; elements with [data-inview-watch] just receive [data-inview] (used to start
 * CSS animations only while visible).
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-inview])'));
    const watch = Array.from(document.querySelectorAll<HTMLElement>('[data-inview-watch]'));
    if (reduce || !('IntersectionObserver' in window)) {
      reveal.forEach((el) => el.setAttribute('data-inview', ''));
      return;
    }
    const once = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-inview', '');
            once.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const toggle = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? e.target.setAttribute('data-inview', '') : e.target.removeAttribute('data-inview')));
    });
    reveal.forEach((el) => once.observe(el));
    watch.forEach((el) => toggle.observe(el));
    return () => {
      once.disconnect();
      toggle.disconnect();
    };
  }, [pathname]);
  return null;
}
