/**
 * Scroll driver for the homepage "passing of a gift" sequence.
 * It only writes one number (--p, 0 → 1) and the active step onto the section;
 * every movement is CSS reading that number. Plain DOM code, so the static
 * preview can run exactly the same logic.
 */
export function initBrandMoment(section: HTMLElement): () => void {
  const art = section.querySelector<HTMLElement>('[data-moment-art]');
  if (!art) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) {
    section.style.setProperty('--p', '1');
    section.dataset.step = '3';
    return () => {};
  }

  let target = 0;
  let current = 0;
  let raf = 0;
  let visible = false;

  const measure = () => {
    const rect = section.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    target = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
  };

  const tick = () => {
    current += (target - current) * 0.14;
    if (Math.abs(target - current) < 0.0005) current = target;
    section.style.setProperty('--p', current.toFixed(4));
    section.dataset.step = current < 0.36 ? '1' : current < 0.68 ? '2' : '3';
    raf = current !== target ? requestAnimationFrame(tick) : 0;
  };

  const onScroll = () => {
    measure();
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) onScroll();
  });
  io.observe(section);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  measure();
  current = target;
  tick();

  return () => {
    io.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    cancelAnimationFrame(raf);
  };
}
