import type { Metadata } from 'next';
import { seo } from '@/data/seo';
import { ui } from '@/data/site';
import { ButtonLink } from '@/components/ui/Button';
import { Mark } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: seo.pages.notFound.title,
  description: seo.pages.notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const n = ui.notFound;
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Mark size={36} className="mb-8 text-clay" />
      <p className="eyebrow mb-6">{n.eyebrow}</p>
      <h1 className="max-w-3xl text-display">{n.heading}</h1>
      <p className="mt-6 max-w-md text-lead text-taupe">{n.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href={n.primary.href} size="lg">{n.primary.label}</ButtonLink>
        <ButtonLink href={n.secondary.href} size="lg" variant="secondary">{n.secondary.label}</ButtonLink>
      </div>
    </section>
  );
}
