import type { Metadata } from 'next';
import { seo } from '@/data/seo';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/home/Hero';
import { BrandMoment } from '@/components/home/BrandMoment';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { MeaningfulMoments } from '@/components/home/MeaningfulMoments';
import { BrandStory } from '@/components/home/BrandStory';
import { WhyValora } from '@/components/home/WhyValora';
import { CorporateBlock } from '@/components/home/CorporateBlock';
import { FinalCTA } from '@/components/home/FinalCTA';

const p = seo.pages.home;
export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: p.path, keywords: p.keywords, absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandMoment />
      <MeaningfulMoments />
      <BrandStory />
      <WhyValora />
      <CorporateBlock />
      <FinalCTA />
    </>
  );
}
