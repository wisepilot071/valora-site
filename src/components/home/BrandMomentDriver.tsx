'use client';

import { useEffect } from 'react';
import { initBrandMoment } from '@/lib/brandMoment';

export function BrandMomentDriver({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    return el ? initBrandMoment(el) : undefined;
  }, [targetId]);
  return null;
}
